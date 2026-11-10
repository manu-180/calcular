// @ts-check

/* ---------------------------------------------------------------------------
   Cliente mínimo de la Graph API OFICIAL de Instagram (contenedor REELS con
   video_url, esperar FINISHED, media_publish), copiado de apex-demos
   (marketing/reels/scripts/reel/publicar-instagram.mjs). Nunca librerías no oficiales ni
   automatizar el navegador: Instagram bloquea la cuenta.
--------------------------------------------------------------------------- */

const VERSION = process.env.IG_GRAPH_VERSION || 'v24.0'
const TRANSITORIOS = new Set([1, 2, 4, 17, 32, 341, 613])
const DE_TOKEN = new Set([102, 190])

export class ErrorGraph extends Error {
  /** @param {string} mensaje @param {{ http?: number, codigo?: number, subcodigo?: number, transitorio?: boolean }} info */
  constructor(mensaje, { http = 0, codigo, subcodigo, transitorio = false } = {}) {
    super(mensaje)
    this.http = http
    this.codigo = codigo
    this.subcodigo = subcodigo
    this.transitorio = transitorio || http >= 500 || (codigo !== undefined && TRANSITORIOS.has(codigo))
    this.token = codigo !== undefined && DE_TOKEN.has(codigo)
  }
}

/** @param {number} ms */
const dormir = (ms) => new Promise((r) => setTimeout(r, ms))

/**
 * @param {{ token: string, igUserId: string, fetch?: typeof fetch, espera?: (ms: number) => Promise<unknown> }} p
 */
export function crearGraph({ token, igUserId, fetch: f = fetch, espera = dormir }) {
  // Un token de "Instagram Login" (IGAA…) va contra graph.instagram.com; uno de página, contra graph.facebook.com.
  const base = `https://${token.startsWith('IG') ? 'graph.instagram.com' : 'graph.facebook.com'}/${VERSION}`

  /** @param {'GET' | 'POST'} metodo @param {string} ruta @param {Record<string, string>} params */
  async function llamar(metodo, ruta, params) {
    const url = new URL(`${base}${ruta}`)
    /** @type {RequestInit} */
    const init = { method: metodo, signal: AbortSignal.timeout(60_000) }
    if (metodo === 'GET') for (const [k, v] of Object.entries({ ...params, access_token: token })) url.searchParams.set(k, v)
    else init.body = new URLSearchParams({ ...params, access_token: token })
    /** @type {Response} */
    let r
    try {
      r = await f(url, init)
    } catch (e) {
      throw new ErrorGraph(`sin respuesta de Meta: ${String(/** @type {Error} */ (e).message).slice(0, 120)}`, { transitorio: true })
    }
    const texto = await r.text()
    /** @type {any} */
    let datos = {}
    try {
      datos = texto ? JSON.parse(texto) : {}
    } catch {
      throw new ErrorGraph(`respuesta no JSON (HTTP ${r.status})`, { http: r.status })
    }
    if (!r.ok || datos.error) {
      const e = datos.error ?? {}
      throw new ErrorGraph(`Meta ${e.code ?? r.status}${e.error_subcode ? `/${e.error_subcode}` : ''}: ${String(e.message ?? 'error').slice(0, 200)}`, {
        http: r.status,
        codigo: e.code,
        subcodigo: e.error_subcode,
        transitorio: e.is_transient === true,
      })
    }
    return datos
  }

  /** Reintenta solo lo transitorio, con espera creciente. @template T @param {() => Promise<T>} hacer */
  async function conReintentos(hacer, veces = 3) {
    for (let k = 0; ; k++) {
      try {
        return await hacer()
      } catch (e) {
        if (!(e instanceof ErrorGraph) || !e.transitorio || k >= veces - 1) throw e
        await espera(5000 * (k + 1))
      }
    }
  }

  return {
    llamar,
    conReintentos,
    /** ¿Ya hay un post con este caption? Evita publicar dos veces si la corrida anterior publicó y no llegó a guardar el estado. @param {string} caption */
    async yaPublicado(caption) {
      const d = await conReintentos(() => llamar('GET', `/${igUserId}/media`, { fields: 'id,caption,permalink', limit: '15' }))
      const previo = (d.data ?? []).find((/** @type {any} */ m) => String(m.caption ?? '').trim() === caption.trim())
      return previo ? { ig_media_id: String(previo.id), permalink: previo.permalink ?? null } : null
    },
    /** @param {{ videoUrl: string, caption: string, coverUrl?: string | null, maxEspera?: number }} p */
    async publicarReel({ videoUrl, caption, coverUrl = null, maxEspera = 5 * 60_000 }) {
      if (caption.length > 2200) throw new ErrorGraph(`caption de ${caption.length} caracteres`)
      const params = { media_type: 'REELS', video_url: videoUrl, caption, share_to_feed: 'true' }
      /** @type {any} */
      let contenedor
      try {
        contenedor = await conReintentos(() => llamar('POST', `/${igUserId}/media`, coverUrl ? { ...params, cover_url: coverUrl } : params))
      } catch (e) {
        // Una portada que Meta rechaza no frena el reel: sale con el cuadro que elige Instagram.
        if (!coverUrl || !(e instanceof ErrorGraph) || e.transitorio || e.token) throw e
        contenedor = await conReintentos(() => llamar('POST', `/${igUserId}/media`, params))
      }
      const id = String(contenedor.id)
      const limite = Date.now() + maxEspera
      let estado = 'IN_PROGRESS'
      while (estado !== 'FINISHED') {
        if (Date.now() > limite) throw new ErrorGraph(`el contenedor quedó en ${estado} después de ${Math.round(maxEspera / 1000)} s`, { transitorio: true })
        await espera(5000)
        try {
          const d = await llamar('GET', `/${id}`, { fields: 'status_code,status' })
          estado = d.status_code
          if (estado === 'ERROR' || estado === 'EXPIRED') throw new ErrorGraph(`Meta no pudo procesar el video: ${String(d.status ?? estado).slice(0, 200)}`)
        } catch (e) {
          // Regresión de Meta (2026-05-22, ver vhirus/instagram-graph.ts): el GET del
          // status_code devuelve 100/GraphMethodException con un token válido. El
          // contenedor está bien: se espera un rato fijo y se intenta publicar.
          if (e instanceof ErrorGraph && e.codigo === 100 && /GraphMethodException|Authorization/i.test(e.message)) {
            await espera(60_000)
            break
          }
          if (e instanceof ErrorGraph && e.transitorio) continue
          throw e
        }
      }
      /** @type {any} */
      let publicado
      try {
        publicado = await llamar('POST', `/${igUserId}/media_publish`, { creation_id: id })
      } catch (e) {
        if (!(e instanceof ErrorGraph) || !e.transitorio) throw e
        await espera(10_000)
        const previo = await this.yaPublicado(caption)
        if (previo) return previo
        publicado = await llamar('POST', `/${igUserId}/media_publish`, { creation_id: id })
      }
      const mediaId = String(publicado.id)
      let permalink = null
      try {
        permalink = (await llamar('GET', `/${mediaId}`, { fields: 'permalink' })).permalink ?? null
      } catch {
        /* el permalink es un extra */
      }
      return { ig_media_id: mediaId, permalink }
    },
  }
}

