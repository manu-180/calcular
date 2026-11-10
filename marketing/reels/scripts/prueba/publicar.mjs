// @ts-check
import { ErrorGraph, crearGraph } from '../reel/graph.mjs'
import { MAX_INTENTOS, MAX_POR_CORRIDA, RESERVA_CUENTA, captionReal, clasificarErrorMeta, cupoDisponible, descartarViejas, leerCupo, porPublicar, publicadasSinId, realPendiente } from './lib.mjs'

/* ---------------------------------------------------------------------------
   Publica lo vencido como reels de prueba de Instagram (sólo los ven quienes
   no siguen la cuenta), por la Graph API oficial: contenedores REELS con
   trial_params MANUAL creados en paralelo → esperar FINISHED → media_publish
   de a uno, con 20 a 60 s entre uno y otro. MANUAL: que nunca les lleguen a
   los seguidores 30 copias casi iguales (Instagram no los gradúa solo).

   Nunca dos veces la misma variante: el estado se guarda después de cada
   paso, antes de publicar se busca el caption (único por variante) en la
   media de las últimas 48 h, y un contenedor guardado del que no se sabe qué
   pasó no se reemplaza por otro. Token vencido, permiso o bloqueo → pausado
   (y la corrida falla para que avise Sentry); límite → hasta la próxima
   corrida; transitorio → se reintenta sin contar.

   Una vez por día, desde las 19, va primero el reel real: la mejor prueba de
   un creativo anterior, sin trial_params y con share_to_feed=false. Lo ven los
   seguidores y queda sólo en la pestaña Reels del perfil: la grilla es de los
   reels de las demos (reels.yml), que salen con share_to_feed=true.
--------------------------------------------------------------------------- */

const TRIAL = JSON.stringify({ graduation_strategy: 'MANUAL' })
const ENTRE_MS = [20_000, 60_000]
const PARALELO = 4
const SONDEOS = 36
const SONDEO_MS = 10_000
// Con 30 variantes por día más los reels de las demos, 15 medias no alcanzaban para encontrar un caption de ayer.
const RECIENTES_H = 48
const RECIENTES_TOPE = 150
// Tres corridas seguidas con Meta rota (sin ser token, permiso ni bloqueo) ya no es mala suerte: que avise.
const FALLAS_PARA_AVISAR = 3

/** @param {number} ms */
const dormir = (ms) => new Promise((r) => setTimeout(r, ms))

class Frenar extends Error {}

/** @typedef {import('./lib.mjs').Estado} Estado @typedef {{ creativo: string, id: string, publicar_at?: string }} Ref */

/** @param {any} t */
const fechaDe = (t) => {
  const ms = Date.parse(String(t ?? ''))
  return Number.isFinite(ms) ? new Date(ms).toISOString() : null
}

/** Los motivos de pausa, iguales venga de donde venga el error. @param {'token' | 'permiso' | 'bloqueo'} por @param {string} msg */
const MOTIVO_PAUSA = (por, msg) =>
  por === 'token'
    ? `el token de Instagram está vencido o revocado (${msg}): hay que renovar IG_ACCESS_TOKEN`
    : por === 'permiso'
      ? `Meta no deja publicar reels de prueba con este token (${msg})`
      : `Instagram frenó la cuenta (${msg}): revisarla a mano antes de despausar`

/**
 * @param {{ estado: Estado, ahora?: Date, env?: Record<string, string | undefined>, fetch?: typeof fetch, espera?: (ms: number) => Promise<unknown>,
 *   ya?: boolean, max?: number, guardar?: (e: Estado) => void, log?: (m: string) => void, rnd?: () => number, reloj?: () => Date }} p
 * @returns {Promise<{ estado: Estado, publicadas: string[], motivo: string, fallar: boolean }>}
 */
export async function publicarVencidas({ estado: inicial, ahora = new Date(), env = process.env, fetch: f = fetch, espera = dormir, ya = false, max = MAX_POR_CORRIDA, guardar = () => {}, log = () => {}, rnd = Math.random, reloj = () => new Date() }) {
  let { estado, descartadas } = descartarViejas(inicial, ahora)
  if (descartadas) {
    log(`${descartadas} variantes de días anteriores no salieron: se descartan`)
    guardar(estado)
  }
  /** @type {string[]} */
  const publicadas = []
  let fallar = false
  const fin = (/** @type {string} */ motivo) => ({ estado, publicadas, motivo, fallar })

  if (env.REELS_PRUEBA_PAUSADOS === '1') return fin('REELS_PRUEBA_PAUSADOS=1: no se publica nada')
  if (!env.IG_USER_ID?.trim() || !env.IG_ACCESS_TOKEN?.trim()) return fin('faltan los secretos IG_USER_ID / IG_ACCESS_TOKEN: las variantes esperan')
  if (estado.pausado && estado.pausado_por !== 'token') return fin(`pausado: ${estado.pausado}`)

  const igUserId = env.IG_USER_ID.trim()
  const graph = crearGraph({ token: env.IG_ACCESS_TOKEN.trim(), igUserId, fetch: f, espera })

  /** @param {Ref} ref */
  const variante = (ref) => /** @type {import('./lib.mjs').Variante} */ (estado.creativos[ref.creativo]?.variantes.find((v) => v.id === ref.id))
  /** @param {Ref} ref @param {Partial<import('./lib.mjs').Variante>} cambios */
  const tocar = (ref, cambios) => {
    const c = /** @type {import('./lib.mjs').Creativo} */ (estado.creativos[ref.creativo])
    estado = { ...estado, creativos: { ...estado.creativos, [ref.creativo]: { ...c, variantes: c.variantes.map((v) => (v.id === ref.id ? { ...v, ...cambios } : v)) } } }
  }
  /** @param {'token' | 'permiso' | 'bloqueo'} por @param {string} msg */
  const pausar = (por, msg) => {
    estado = { ...estado, pausado: MOTIVO_PAUSA(por, msg), pausado_por: por }
    fallar = true
    guardar(estado)
    return new Frenar(`pausado: ${estado.pausado}`)
  }

  /**
   * Lo que no es de esta variante frena la corrida (y pausa si hace falta);
   * lo de la variante queda anotado y las demás siguen.
   * @param {unknown} e @param {Ref} ref
   */
  const manejar = (e, ref) => {
    if (!(e instanceof ErrorGraph)) throw e
    const tipo = clasificarErrorMeta(e)
    if (tipo === 'token' || tipo === 'permiso' || tipo === 'bloqueo') throw pausar(tipo, e.message)
    if (tipo === 'limite') {
      tocar(ref, { error_publicar: `límite de Meta (${e.message}): sale en la próxima corrida` })
      guardar(estado)
      throw new Frenar(`límite de Meta: ${e.message}`)
    }
    if (tipo === 'transitorio') tocar(ref, { error_publicar: `Meta falló de forma transitoria (${e.message}): se reintenta` })
    else tocar(ref, { error_publicar: e.message, intentos_publicar: (variante(ref).intentos_publicar ?? 0) + 1 })
  }

  try {
    // La prueba del token va antes de mirar si hay algo vencido: si no, una pausa de un día
    // sin variantes pendientes no se levantaba nunca.
    if (estado.pausado) {
      try {
        await graph.llamar('GET', `/${igUserId}`, { fields: 'id' })
      } catch {
        return fin(`pausado: ${estado.pausado}`)
      }
      const { pausado_por: _, ...resto } = estado
      estado = { ...resto, pausado: null }
      log('el token de Instagram volvió a andar: se despausa')
      guardar(estado)
    }

    const real = ya ? null : realPendiente(estado, ahora)
    if (real) await graduar(real)

    const candidatas = porPublicar(estado, ahora, { max, ya })
    const sinId = publicadasSinId(estado, ahora)
    if (!candidatas.length && !sinId.length) return fin(publicadas.length ? `${publicadas.length} publicadas` : 'no hay nada vencido')

    /** @type {Map<string, any>} */
    let porCaption = new Map()
    if (!candidatas.length) {
      porCaption = await mediaReciente()
      completarIds(sinId, porCaption)
      return fin('no hay nada vencido')
    }

    const cupo = leerCupo(await graph.llamar('GET', `/${igUserId}/content_publishing_limit`, { fields: 'config,quota_usage' }))
    const libres = cupoDisponible(cupo)
    if (!libres) return fin(`sin cupo de Meta (${cupo ? `${cupo.usado} de ${cupo.total} usados` : 'no se pudo leer'}; quedan ${RESERVA_CUENTA} para lo que se publique a mano): hasta la próxima corrida`)
    const tanda = candidatas.slice(0, libres)

    porCaption = await mediaReciente()
    completarIds(sinId, porCaption)
    /** @type {Ref[]} */
    const nuevas = []
    for (const ref of tanda) {
      const previo = porCaption.get(variante(ref).caption.trim())
      if (!previo) {
        nuevas.push(ref)
        continue
      }
      tocar(ref, { ig_media_id: String(previo.id), permalink: previo.permalink ?? null, publicado_at: fechaDe(previo.timestamp) ?? reloj().toISOString(), error_publicar: null })
      log(`${ref.id} ya estaba publicada (${previo.permalink ?? previo.id}): se toma de Instagram`)
    }
    guardar(estado)

    /** @type {{ ref: Ref, contenedor: string }[]} */
    const listos = []
    for (let i = 0; i < nuevas.length; i += PARALELO) {
      const grupo = nuevas.slice(i, i + PARALELO)
      const creados = await Promise.allSettled(grupo.map((ref) => contenedorDe(ref, porCaption)))
      creados.forEach((r, k) => {
        const ref = /** @type {Ref} */ (grupo[k])
        if (r.status === 'fulfilled') {
          if (r.value) listos.push({ ref, contenedor: r.value })
        } else manejar(r.reason, ref)
      })
      guardar(estado)
    }

    const procesados = await Promise.allSettled(listos.map((x) => esperarListo(x.contenedor)))
    /** @type {{ ref: Ref, contenedor: string }[]} */
    const aPublicar = []
    procesados.forEach((r, k) => {
      const x = /** @type {{ ref: Ref, contenedor: string }} */ (listos[k])
      if (r.status === 'fulfilled') aPublicar.push(x)
      else manejar(r.reason, x.ref)
    })
    guardar(estado)

    for (const [i, x] of aPublicar.entries()) {
      if (i > 0) await espera(Math.round(ENTRE_MS[0] + rnd() * (ENTRE_MS[1] - ENTRE_MS[0])))
      /** @type {any} */
      let r
      try {
        r = await graph.llamar('POST', `/${igUserId}/media_publish`, { creation_id: x.contenedor })
      } catch (e) {
        manejar(e, x.ref)
        guardar(estado)
        continue
      }
      const mediaId = String(r.id)
      let permalink = null
      try {
        permalink = (await graph.llamar('GET', `/${mediaId}`, { fields: 'permalink' })).permalink ?? null
      } catch {
        /* el permalink lo completa medir */
      }
      tocar(x.ref, { ig_media_id: mediaId, permalink, publicado_at: reloj().toISOString(), error_publicar: null })
      guardar(estado)
      publicadas.push(x.ref.id)
      log(`${x.ref.creativo} ${x.ref.id} publicada: ${permalink ?? mediaId}`)
    }
  } catch (e) {
    if (e instanceof Frenar) return fin(e.message)
    if (!(e instanceof ErrorGraph)) throw e
    const tipo = clasificarErrorMeta(e)
    if (tipo === 'token' || tipo === 'permiso' || tipo === 'bloqueo') return fin(pausar(tipo, e.message).message)
    if (tipo === 'limite') return fin(`límite de Meta (${e.message}): hasta la próxima corrida`)
    const fallas = (estado.fallas_seguidas ?? 0) + 1
    estado = { ...estado, fallas_seguidas: fallas }
    fallar = fallas >= FALLAS_PARA_AVISAR
    guardar(estado)
    return fin(`Meta no respondió bien (${e.message}): ${fallas} corrida${fallas === 1 ? '' : 's'} seguida${fallas === 1 ? '' : 's'} así`)
  }
  if (estado.fallas_seguidas) {
    estado = { ...estado, fallas_seguidas: 0 }
    guardar(estado)
  }
  return fin(publicadas.length ? `${publicadas.length} publicadas` : 'no salió ninguna')

  /**
   * La media de las últimas RECIENTES_H horas (hasta RECIENTES_TOPE), por caption.
   * @returns {Promise<Map<string, any>>}
   */
  async function mediaReciente() {
    const desde = ahora.getTime() - RECIENTES_H * 3_600_000
    /** @type {any[]} */
    const todas = []
    /** @type {string | undefined} */
    let despues
    while (todas.length < RECIENTES_TOPE) {
      const d = await graph.llamar('GET', `/${igUserId}/media`, { fields: 'id,caption,permalink,timestamp', limit: '50', ...(despues ? { after: despues } : {}) })
      /** @type {any[]} */
      const pagina = d.data ?? []
      todas.push(...pagina)
      const ultima = pagina.at(-1)
      despues = d.paging?.next ? d.paging?.cursors?.after : undefined
      if (!despues || !ultima || !(Date.parse(String(ultima.timestamp)) >= desde)) break
    }
    return new Map(todas.slice(0, RECIENTES_TOPE).map((m) => [String(m.caption ?? '').trim(), m]))
  }

  /** Las que salieron sin que Instagram devolviera su id (una corrida cortada) lo toman de la media. @param {Ref[]} refs @param {Map<string, any>} mapa */
  function completarIds(refs, mapa) {
    let alguna = false
    for (const ref of refs) {
      const m = mapa.get(variante(ref).caption.trim())
      if (!m) continue
      tocar(ref, { ig_media_id: String(m.id), permalink: m.permalink ?? null, publicado_at: fechaDe(m.timestamp) ?? variante(ref).publicado_at, error_publicar: null })
      alguna = true
    }
    if (alguna) guardar(estado)
  }

  /**
   * El contenedor de la variante. Uno guardado de una corrida anterior se reusa
   * si sigue FINISHED o IN_PROGRESS; sólo EXPIRED o ERROR habilitan uno nuevo.
   * Si no se puede saber qué pasó con él, no se crea otro (podría haberse
   * publicado y la respuesta perderse): transitorio, se mira en la próxima.
   * PUBLISHED: ya salió; se toma su media por caption, o queda publicada sin id.
   * @param {Ref} ref @param {Map<string, any>} mapa @returns {Promise<string | null>}
   */
  async function contenedorDe(ref, mapa) {
    const v = variante(ref)
    if (v.ig_container_id) {
      /** @type {any} */
      let d
      try {
        d = await graph.llamar('GET', `/${v.ig_container_id}`, { fields: 'status_code' })
      } catch (e) {
        if (e instanceof ErrorGraph && ['token', 'permiso', 'bloqueo', 'limite'].includes(clasificarErrorMeta(e))) throw e
        throw new ErrorGraph(`no se pudo leer el contenedor ${v.ig_container_id} (${String(/** @type {Error} */ (e).message).slice(0, 120)}): no se crea otro hasta saber qué pasó`, { transitorio: true })
      }
      if (d.status_code === 'FINISHED' || d.status_code === 'IN_PROGRESS') return v.ig_container_id
      if (d.status_code === 'PUBLISHED') {
        const m = mapa.get(v.caption.trim())
        tocar(ref, m
          ? { ig_media_id: String(m.id), permalink: m.permalink ?? null, publicado_at: fechaDe(m.timestamp) ?? reloj().toISOString(), error_publicar: null }
          : { publicado_at: reloj().toISOString(), error_publicar: 'publicada en una corrida que se cortó: el id se toma de Instagram cuando la liste' })
        return null
      }
      if (d.status_code !== 'EXPIRED' && d.status_code !== 'ERROR') throw new ErrorGraph(`el contenedor ${v.ig_container_id} está en ${d.status_code ?? 'un estado desconocido'}: se mira en la próxima`, { transitorio: true })
    }
    if (!v.video_url) throw new ErrorGraph('la variante no tiene video_url')
    const c = await graph.llamar('POST', `/${igUserId}/media`, { media_type: 'REELS', video_url: v.video_url, caption: v.caption, trial_params: TRIAL })
    const id = String(c.id)
    tocar(ref, { ig_container_id: id })
    return id
  }

  /**
   * El reel real del creativo, con la misma regla de nunca dos veces que las pruebas: el
   * contenedor queda guardado y sólo EXPIRED o ERROR habilitan otro. Token, permiso, bloqueo y
   * límite suben y frenan la corrida; lo demás queda anotado y cuenta intento (no el transitorio).
   * @param {{ creativo: string, variante: string }} ref
   */
  async function graduar(ref) {
    const c = /** @type {import('./lib.mjs').Creativo} */ (estado.creativos[ref.creativo])
    const v = c.variantes.find((x) => x.id === ref.variante)
    if (!v?.video_url) return
    /** @type {import('./lib.mjs').Real} */
    let real = c.real ?? { variante: v.id, caption: captionReal(v.caption), ig_container_id: null, ig_media_id: null, permalink: null, publicado_at: null, error: null, intentos: 0 }
    const poner = (/** @type {Partial<import('./lib.mjs').Real>} */ cambios) => {
      real = { ...real, ...cambios }
      estado = { ...estado, creativos: { ...estado.creativos, [ref.creativo]: { .../** @type {import('./lib.mjs').Creativo} */ (estado.creativos[ref.creativo]), real } } }
      guardar(estado)
    }
    const yaSalio = (/** @type {any} */ m) => poner({ ig_media_id: String(m.id), permalink: m.permalink ?? null, publicado_at: fechaDe(m.timestamp) ?? reloj().toISOString(), error: null })
    poner({})
    try {
      let contenedor = real.ig_container_id
      if (contenedor) {
        /** @type {any} */
        let d
        try {
          d = await graph.llamar('GET', `/${contenedor}`, { fields: 'status_code' })
        } catch (e) {
          if (e instanceof ErrorGraph && ['token', 'permiso', 'bloqueo', 'limite'].includes(clasificarErrorMeta(e))) throw e
          log(`reel real de ${ref.creativo}: no se pudo leer su contenedor, se mira en la próxima`)
          return
        }
        if (d.status_code === 'PUBLISHED') {
          const m = (await mediaReciente()).get(real.caption.trim())
          if (m) yaSalio(m)
          else poner({ publicado_at: reloj().toISOString(), error: 'publicado en una corrida que se cortó: falta el id' })
          return
        }
        if (d.status_code === 'EXPIRED' || d.status_code === 'ERROR') contenedor = null
        else if (d.status_code !== 'FINISHED' && d.status_code !== 'IN_PROGRESS') return
      } else {
        const m = (await mediaReciente()).get(real.caption.trim())
        if (m) return yaSalio(m)
      }
      if (!contenedor) {
        const r = await graph.llamar('POST', `/${igUserId}/media`, { media_type: 'REELS', video_url: v.video_url, caption: real.caption, share_to_feed: 'false' })
        contenedor = String(r.id)
        poner({ ig_container_id: contenedor })
      }
      await esperarListo(contenedor)
      const r = await graph.llamar('POST', `/${igUserId}/media_publish`, { creation_id: contenedor })
      const mediaId = String(r.id)
      let permalink = null
      try {
        permalink = (await graph.llamar('GET', `/${mediaId}`, { fields: 'permalink' })).permalink ?? null
      } catch {
        /* el permalink no hace falta para medir */
      }
      poner({ ig_media_id: mediaId, permalink, publicado_at: reloj().toISOString(), error: null })
      publicadas.push(`${v.id} (real)`)
      log(`${ref.creativo} ${v.id} publicada como reel real: ${permalink ?? mediaId}`)
    } catch (e) {
      if (!(e instanceof ErrorGraph)) throw e
      const tipo = clasificarErrorMeta(e)
      if (tipo === 'token' || tipo === 'permiso' || tipo === 'bloqueo' || tipo === 'limite') throw e
      const intentos = tipo === 'transitorio' ? real.intentos : real.intentos + 1
      poner({ error: e.message, intentos })
      log(`reel real de ${ref.creativo}: ${e.message}${intentos >= MAX_INTENTOS ? ' (se deja)' : ''}`)
    }
  }

  /** @param {string} id */
  async function esperarListo(id) {
    for (let k = 0; k < SONDEOS; k++) {
      await espera(k === 0 ? 5000 : SONDEO_MS)
      /** @type {any} */
      let d
      try {
        d = await graph.llamar('GET', `/${id}`, { fields: 'status_code,status' })
      } catch (e) {
        // Regresión de Meta (2026-05-22, ver publicar-instagram.mjs): el GET del status_code da
        // 100/GraphMethodException con un token válido en un contenedor recién creado: se espera y se publica.
        if (e instanceof ErrorGraph && e.codigo === 100 && /GraphMethodException|Authorization/i.test(e.message)) {
          await espera(60_000)
          return
        }
        if (e instanceof ErrorGraph && e.transitorio && !e.token) continue
        throw e
      }
      if (d.status_code === 'FINISHED') return
      if (d.status_code === 'ERROR' || d.status_code === 'EXPIRED') throw new ErrorGraph(`Meta no pudo procesar el video: ${String(d.status ?? d.status_code).slice(0, 200)}`)
    }
    throw new ErrorGraph(`el contenedor ${id} sigue procesando después de ${Math.round((SONDEOS * SONDEO_MS) / 60_000)} min`, { transitorio: true })
  }
}
