// @ts-check
import { ErrorGraph, crearGraph } from '../reel/graph.mjs'
import { DIAS_MEDIR, contarWeb, metricasDe } from './lib.mjs'

/* ---------------------------------------------------------------------------
   Cómo anda cada variante publicada en los últimos DIAS_MEDIR días. Pocas
   llamadas: likes, comentarios y permalink de 50 medias por llamada (?ids=);
   los insights (vistas, alcance, compartidos, guardados, tiempo visto) en la
   misma llamada si el token los deja leer, lo que se prueba una vez por
   corrida; los comentarios sólo de las que tienen alguno, también de a 50.
   Lo que no se puede leer queda null, nunca 0.
--------------------------------------------------------------------------- */

const LOTE = 50
const CAMPOS = 'like_count,comments_count,permalink'
const CAMPOS_INSIGHTS = 'insights.metric(views,reach,shares,saved,ig_reels_avg_watch_time)'
const PAGINAS_COMENTARIOS = 10

/** @param {number} ms */
const dormir = (ms) => new Promise((r) => setTimeout(r, ms))

/** @template T @param {T[]} lista @param {number} n @returns {T[][]} */
const lotes = (lista, n) => Array.from({ length: Math.ceil(lista.length / n) }, (_, i) => lista.slice(i * n, (i + 1) * n))

/** `insights.data` de una media a { métrica: número }. @param {any} ins */
function leerInsights(ins) {
  if (!Array.isArray(ins?.data)) return null
  /** @type {Record<string, number>} */
  const salida = {}
  for (const m of ins.data) {
    const valor = m?.total_value?.value ?? m?.values?.[0]?.value
    if (typeof m?.name === 'string' && typeof valor === 'number') salida[m.name] = valor
  }
  return salida
}

/**
 * @param {{ estado: import('./lib.mjs').Estado, ahora?: Date, env?: Record<string, string | undefined>, fetch?: typeof fetch,
 *   espera?: (ms: number) => Promise<unknown>, log?: (m: string) => void }} p
 * @returns {Promise<{ estado: import('./lib.mjs').Estado, medidas: number }>}
 */
export async function medir({ estado, ahora = new Date(), env = process.env, fetch: f = fetch, espera = dormir, log = () => {} }) {
  // El token que publica no tiene instagram_manage_insights: si hay uno aparte con ese permiso, se mide con ese.
  const token = env.IG_INSIGHTS_TOKEN?.trim() || env.IG_ACCESS_TOKEN?.trim()
  if (!env.IG_USER_ID?.trim() || !token) return { estado, medidas: 0 }
  const desde = ahora.getTime() - DIAS_MEDIR * 86_400_000
  const refs = Object.entries(estado.creativos).flatMap(([creativo, c]) =>
    (c.variantes ?? []).filter((v) => v.ig_media_id && v.publicado_at && Date.parse(v.publicado_at) >= desde).map((v) => ({ creativo, id: v.id, media: String(v.ig_media_id), publicado_at: String(v.publicado_at) })),
  )
  if (!refs.length) return { estado, medidas: 0 }
  const igUserId = env.IG_USER_ID.trim()
  const graph = crearGraph({ token, igUserId, fetch: f, espera })

  let insights = estado.insights
  const masNueva = [...refs].sort((a, b) => b.publicado_at.localeCompare(a.publicado_at))[0]
  try {
    await graph.llamar('GET', `/${masNueva?.media}/insights`, { metric: 'views' })
    insights = { disponible: true, motivo: null }
  } catch (e) {
    if (!(e instanceof ErrorGraph)) throw e
    if (e.codigo === 10 || (e.codigo !== undefined && e.codigo >= 200 && e.codigo <= 299)) insights = { disponible: false, motivo: `el token no tiene instagram_manage_insights (${e.message.slice(0, 120)})` }
    else if (e.transitorio) insights = { disponible: false, motivo: `no se pudo probar esta vez: ${e.message.slice(0, 120)}` }
    else insights = { disponible: false, motivo: e.message.slice(0, 200) }
  }

  /** @type {Record<string, any>} */
  const datos = {}
  for (const lote of lotes(refs, LOTE)) {
    const ids = lote.map((r) => r.media).join(',')
    try {
      Object.assign(datos, await graph.conReintentos(() => graph.llamar('GET', '/', { ids, fields: insights.disponible ? `${CAMPOS},${CAMPOS_INSIGHTS}` : CAMPOS })))
    } catch (e) {
      if (!(e instanceof ErrorGraph)) throw e
      if (!insights.disponible) {
        log(`no se pudieron leer ${lote.length} medias: ${e.message}`)
        continue
      }
      // Una métrica que Meta no da para alguna de estas medias tumba la llamada entera: sin insights, lo demás sí se lee.
      log(`insights del lote falló (${e.message}): se leen sin insights`)
      try {
        Object.assign(datos, await graph.conReintentos(() => graph.llamar('GET', '/', { ids, fields: CAMPOS })))
      } catch (e2) {
        log(`no se pudieron leer ${lote.length} medias: ${/** @type {Error} */ (e2).message}`)
      }
    }
  }

  const conComentarios = refs.filter((r) => (datos[r.media]?.comments_count ?? 0) > 0)
  /** @type {Record<string, number | null>} */
  const web = {}
  if (conComentarios.length) {
    /** @type {string | null} */
    let propio = null
    try {
      propio = (await graph.llamar('GET', `/${igUserId}`, { fields: 'username' })).username ?? null
    } catch {
      /* sin el usuario propio se cuentan todos */
    }
    for (const lote of lotes(conComentarios, LOTE)) {
      /** @type {Record<string, any>} */
      let r = {}
      try {
        r = await graph.conReintentos(() => graph.llamar('GET', '/', { ids: lote.map((x) => x.media).join(','), fields: `comments.limit(${LOTE}){text,username}` }))
      } catch (e) {
        log(`no se pudieron leer los comentarios: ${/** @type {Error} */ (e).message}`)
      }
      for (const x of lote) {
        const c = r[x.media]?.comments
        if (!c) {
          web[x.media] = null
          continue
        }
        /** @type {any[]} */
        const todos = [...(c.data ?? [])]
        let despues = c.paging?.cursors?.after
        for (let pagina = 1; despues && c.paging?.next && todos.length < (datos[x.media]?.comments_count ?? 0) && pagina < PAGINAS_COMENTARIOS; pagina++) {
          try {
            const mas = await graph.llamar('GET', `/${x.media}/comments`, { fields: 'text,username', limit: String(LOTE), after: despues })
            todos.push(...(mas.data ?? []))
            despues = mas.paging?.next ? mas.paging?.cursors?.after : null
          } catch {
            break
          }
        }
        web[x.media] = contarWeb(todos, propio)
      }
    }
  }

  let medidas = 0
  /** @type {import('./lib.mjs').Estado['creativos']} */
  const creativos = { ...estado.creativos }
  for (const r of refs) {
    const d = datos[r.media]
    if (!d) continue
    const comentariosWeb = d.comments_count === 0 ? 0 : (web[r.media] ?? null)
    const metricas = metricasDe({ media: d, insights: insights.disponible ? leerInsights(d.insights) : null, comentarios_web: comentariosWeb, ahora })
    const c = /** @type {import('./lib.mjs').Creativo} */ (creativos[r.creativo])
    creativos[r.creativo] = { ...c, variantes: c.variantes.map((v) => (v.id === r.id ? { ...v, metricas, permalink: v.permalink ?? d.permalink ?? null } : v)) }
    medidas++
  }
  return { estado: { ...estado, insights, creativos }, medidas }
}
