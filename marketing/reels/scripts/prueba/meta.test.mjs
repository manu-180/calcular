import assert from 'node:assert/strict'
import { test } from 'node:test'
import { estadoVacio } from './lib.mjs'
import { medir } from './medir.mjs'
import { publicarVencidas } from './publicar.mjs'

/* Una Graph API de mentira: rutas por método y path; registra cada llamada con sus parámetros. */
/** @param {[string, RegExp, (p: Record<string, string>, m: RegExpMatchArray) => any][]} rutas */
function graphFalso(rutas) {
  /** @type {{ metodo: string, ruta: string, params: Record<string, string> }[]} */
  const llamadas = []
  /** @type {typeof fetch} */
  const f = async (entrada, init = {}) => {
    const url = new URL(String(entrada))
    const metodo = init.method ?? 'GET'
    const params = Object.fromEntries(metodo === 'GET' ? url.searchParams : new URLSearchParams(String(init.body ?? '')))
    delete params.access_token
    const ruta = url.pathname.replace(/^\/v\d+\.\d+/, '') || '/'
    llamadas.push({ metodo, ruta, params })
    for (const [m, patron, hacer] of rutas) {
      const coincide = ruta.match(patron)
      if (m === metodo && coincide) {
        const r = hacer(params, coincide)
        return new Response(JSON.stringify(r), { status: r?.__status ?? (r?.error ? 400 : 200), headers: { 'content-type': 'application/json' } })
      }
    }
    return new Response(JSON.stringify({ error: { code: 100, message: `ruta falsa sin definir: ${metodo} ${ruta}` } }), { status: 400 })
  }
  return { fetch: f, llamadas }
}

/** @param {number} code @param {string} message @param {number} [subcode] */
const errorMeta = (code, message, subcode) => ({ error: { code, message, ...(subcode ? { error_subcode: subcode } : {}), type: 'OAuthException' } })

const ENV = { IG_USER_ID: '178', IG_ACCESS_TOKEN: 'EAAtoken' }
const AHORA = new Date('2026-11-09T16:00:00Z')

/** @param {string} id @param {string} publicar_at @param {Record<string, unknown>} [extra] */
const variante = (id, publicar_at, extra = {}) => ({
  id, cambios: {}, resumen: id, video_url: `https://x.public.blob.vercel-storage.com/reels/prueba/${id}.mp4`, duracion_s: 20, caption: `caption ${id}`, publicar_at,
  ig_media_id: null, permalink: null, publicado_at: null, error_publicar: null, intentos_publicar: 0, metricas: null, ...extra,
})

/** @param {any[]} variantes */
function estadoCon(variantes) {
  const e = estadoVacio(new Date('2026-11-09T08:00:00Z'))
  e.creativos['2026-11-09-a'] = { clave: 'a', fecha: '2026-11-09', titulo: 'a', categoria: 'comedia', formato: 'chat', paleta: 'papel', producido_at: '2026-11-09T08:30:00.000Z', error: null, intentos: 0, variantes }
  return e
}

/** @param {any} e @param {string} id */
const v = (e, id) => e.creativos['2026-11-09-a'].variantes.find((/** @type {any} */ x) => x.id === id)

/** @param {{ usado?: number, recientes?: any[] | ((p: Record<string, string>) => any), crear?: (p: Record<string, string>) => any, estado?: (id: string) => any, publicar?: (p: Record<string, string>) => any, cuenta?: () => any, limite?: () => any }} [o] */
function meta({ usado = 5, recientes = [], crear, estado, publicar, cuenta, limite } = {}) {
  let n = 0
  return graphFalso([
    ['GET', /^\/178\/content_publishing_limit$/, () => (limite ? limite() : { data: [{ quota_usage: usado, config: { quota_total: 100, quota_duration: 86400 } }] })],
    ['GET', /^\/178\/media$/, (p) => (typeof recientes === 'function' ? recientes(p) : { data: recientes })],
    ['POST', /^\/178\/media$/, (p) => (crear ? crear(p) : { id: `c-${p.caption.split(' ')[1]}` })],
    ['POST', /^\/178\/media_publish$/, (p) => (publicar ? publicar(p) : { id: `m-${p.creation_id.slice(2)}-${++n}` })],
    ['GET', /^\/178$/, () => (cuenta ? cuenta() : { id: '178' })],
    ['GET', /^\/(c-[\w-]+)$/, (_, m) => (estado ? estado(String(m[1])) : { status_code: 'FINISHED' })],
    ['GET', /^\/(m-[\w-]+)$/, (_, m) => ({ permalink: `https://www.instagram.com/reel/${m[1]}/` })],
  ])
}

/** @type {number[]} */
let esperas = []
const espera = async (/** @type {number} */ ms) => {
  esperas.push(ms)
}

test('publica lo vencido como reel de prueba MANUAL, de a uno y con aire entre uno y otro', async () => {
  esperas = []
  const g = meta()
  const e = estadoCon([variante('v01', '2026-11-09T13:00:00.000Z'), variante('v02', '2026-11-09T14:00:00.000Z'), variante('v03', '2026-11-09T20:00:00.000Z')])
  let guardados = 0
  const r = await publicarVencidas({ estado: e, ahora: AHORA, env: ENV, fetch: g.fetch, espera, guardar: () => guardados++, reloj: () => AHORA })
  assert.deepEqual(r.publicadas, ['v01', 'v02'])
  const creados = g.llamadas.filter((l) => l.metodo === 'POST' && l.ruta === '/178/media')
  assert.equal(creados.length, 2)
  for (const c of creados) {
    assert.equal(c.params.media_type, 'REELS')
    assert.deepEqual(JSON.parse(c.params.trial_params ?? '{}'), { graduation_strategy: 'MANUAL' })
    assert.match(c.params.video_url ?? '', /^https:\/\/.+\.mp4$/)
  }
  assert.equal(v(r.estado, 'v01').ig_media_id, 'm-v01-1')
  assert.equal(v(r.estado, 'v01').permalink, 'https://www.instagram.com/reel/m-v01-1/')
  assert.equal(v(r.estado, 'v01').publicado_at, AHORA.toISOString())
  assert.equal(v(r.estado, 'v03').ig_media_id, null)
  assert.ok(guardados >= 2)
  const entre = esperas.filter((ms) => ms >= 20_000 && ms <= 60_000)
  assert.equal(entre.length, 1)
})

test('no publica dos veces: si el caption ya está en la media reciente, lo toma de ahí', async () => {
  const g = meta({ recientes: [{ id: '999', caption: 'caption v01', permalink: 'https://www.instagram.com/reel/X/', timestamp: '2026-11-09T13:01:00+0000' }] })
  const e = estadoCon([variante('v01', '2026-11-09T13:00:00.000Z')])
  const r = await publicarVencidas({ estado: e, ahora: AHORA, env: ENV, fetch: g.fetch, espera })
  assert.equal(v(r.estado, 'v01').ig_media_id, '999')
  assert.equal(g.llamadas.filter((l) => l.metodo === 'POST').length, 0)
})

test('REELS_PRUEBA_PAUSADOS=1 frena todo sin llamar a Meta', async () => {
  const g = meta()
  const r = await publicarVencidas({ estado: estadoCon([variante('v01', '2026-11-09T13:00:00.000Z')]), ahora: AHORA, env: { ...ENV, REELS_PRUEBA_PAUSADOS: '1' }, fetch: g.fetch, espera })
  assert.equal(g.llamadas.length, 0)
  assert.deepEqual(r.publicadas, [])
  assert.match(r.motivo, /REELS_PRUEBA_PAUSADOS/)
})

test('deja la reserva de 5 para lo que se publique a mano', async () => {
  const g = meta({ usado: 94 })
  const e = estadoCon([variante('v01', '2026-11-09T13:00:00.000Z'), variante('v02', '2026-11-09T14:00:00.000Z')])
  const r = await publicarVencidas({ estado: e, ahora: AHORA, env: ENV, fetch: g.fetch, espera })
  assert.deepEqual(r.publicadas, ['v01'])
  const sin = await publicarVencidas({ estado: e, ahora: AHORA, env: ENV, fetch: meta({ usado: 95 }).fetch, espera })
  assert.deepEqual(sin.publicadas, [])
  assert.match(sin.motivo, /cupo/)
})

test('token vencido: se pausa con el motivo y no sigue', async () => {
  const g = meta({ crear: () => errorMeta(190, 'Error validating access token: Session has expired') })
  const e = estadoCon([variante('v01', '2026-11-09T13:00:00.000Z'), variante('v02', '2026-11-09T14:00:00.000Z')])
  const r = await publicarVencidas({ estado: e, ahora: AHORA, env: ENV, fetch: g.fetch, espera })
  assert.match(String(r.estado.pausado), /IG_ACCESS_TOKEN/)
  assert.equal(r.estado.pausado_por, 'token')
  assert.equal(g.llamadas.filter((l) => l.ruta === '/178/media_publish').length, 0)
  assert.equal(v(r.estado, 'v01').intentos_publicar, 0)
})

test('pausado por token: si el token volvió a andar, se despausa solo y publica', async () => {
  const g = meta()
  const e = { ...estadoCon([variante('v01', '2026-11-09T13:00:00.000Z')]), pausado: 'el token de Instagram está vencido', pausado_por: 'token' }
  const r = await publicarVencidas({ estado: e, ahora: AHORA, env: ENV, fetch: g.fetch, espera })
  assert.equal(r.estado.pausado, null)
  assert.deepEqual(r.publicadas, ['v01'])
  const bloqueado = { ...e, pausado_por: 'bloqueo', pausado: 'Instagram bloqueó la acción' }
  const r2 = await publicarVencidas({ estado: bloqueado, ahora: AHORA, env: ENV, fetch: meta().fetch, espera })
  assert.deepEqual(r2.publicadas, [])
  assert.equal(r2.estado.pausado, 'Instagram bloqueó la acción')
})

test('límite de Meta: frena hasta la próxima corrida sin contar intento ni pausar', async () => {
  const g = meta({ publicar: () => errorMeta(9, "You've reached the maximum number of posts allowed via API", 2207042) })
  const e = estadoCon([variante('v01', '2026-11-09T13:00:00.000Z'), variante('v02', '2026-11-09T14:00:00.000Z')])
  const r = await publicarVencidas({ estado: e, ahora: AHORA, env: ENV, fetch: g.fetch, espera })
  assert.deepEqual(r.publicadas, [])
  assert.equal(r.estado.pausado, null)
  assert.equal(v(r.estado, 'v01').intentos_publicar, 0)
  assert.match(String(v(r.estado, 'v01').error_publicar), /límite/)
  assert.equal(g.llamadas.filter((l) => l.ruta === '/178/media_publish').length, 1)
  assert.match(r.motivo, /límite/)
})

test('bloqueo o spam: se pausa todo', async () => {
  const g = meta({ publicar: () => errorMeta(9, 'We restrict certain activity to protect our community', 2207051) })
  const r = await publicarVencidas({ estado: estadoCon([variante('v01', '2026-11-09T13:00:00.000Z')]), ahora: AHORA, env: ENV, fetch: g.fetch, espera })
  assert.equal(r.estado.pausado_por, 'bloqueo')
  assert.match(String(r.estado.pausado), /restrict/)
})

test('un video que Meta no procesa cuenta intento en esa variante y las demás siguen', async () => {
  const g = meta({ estado: (id) => (id === 'c-v01' ? { status_code: 'ERROR', status: 'Error: 2207026 unsupported format' } : { status_code: 'FINISHED' }) })
  const e = estadoCon([variante('v01', '2026-11-09T13:00:00.000Z'), variante('v02', '2026-11-09T14:00:00.000Z')])
  const r = await publicarVencidas({ estado: e, ahora: AHORA, env: ENV, fetch: g.fetch, espera })
  assert.deepEqual(r.publicadas, ['v02'])
  assert.equal(v(r.estado, 'v01').intentos_publicar, 1)
  assert.match(String(v(r.estado, 'v01').error_publicar), /2207026/)
})

test('sin secretos no falla: avisa y espera', async () => {
  const g = meta()
  const r = await publicarVencidas({ estado: estadoCon([variante('v01', '2026-11-09T13:00:00.000Z')]), ahora: AHORA, env: {}, fetch: g.fetch, espera })
  assert.equal(g.llamadas.length, 0)
  assert.match(r.motivo, /IG_USER_ID/)
})

test('ya: publica la próxima de hoy aunque no haya vencido', async () => {
  const g = meta()
  const e = estadoCon([variante('v01', '2026-11-09T20:00:00.000Z'), variante('v02', '2026-11-09T21:00:00.000Z')])
  const r = await publicarVencidas({ estado: e, ahora: AHORA, env: ENV, fetch: g.fetch, espera, ya: true })
  assert.deepEqual(r.publicadas, ['v01'])
})

test('lo de ayer que no salió se descarta antes de publicar', async () => {
  const g = meta()
  const e = estadoCon([variante('v01', '2026-11-08T22:00:00.000Z'), variante('v02', '2026-11-09T13:00:00.000Z')])
  const r = await publicarVencidas({ estado: e, ahora: AHORA, env: ENV, fetch: g.fetch, espera })
  assert.deepEqual(r.publicadas, ['v02'])
  assert.ok(v(r.estado, 'v01').descartada_at)
})

test('pausado por token: el token se prueba aunque no haya nada vencido', async () => {
  const g = meta()
  const e = { ...estadoCon([variante('v01', '2026-11-09T20:00:00.000Z')]), pausado: 'el token de Instagram está vencido', pausado_por: 'token' }
  const r = await publicarVencidas({ estado: e, ahora: AHORA, env: ENV, fetch: g.fetch, espera })
  assert.equal(r.estado.pausado, null)
  assert.equal(r.estado.pausado_por, undefined)
  assert.deepEqual(r.publicadas, [])
  assert.equal(g.llamadas.filter((l) => l.ruta === '/178').length, 1)
  assert.equal(r.fallar, false)
})

for (const [nombre, falla] of [
  ['un 500 transitorio', { __status: 500, error: { code: 1, message: 'An unknown error occurred', is_transient: true } }],
  ['el 100/GraphMethodException', { error: { code: 100, message: 'Unsupported get request (GraphMethodException)' } }],
]) {
  test(`contenedor guardado que no se puede leer (${nombre}): no se crea otro hasta saber qué pasó`, async () => {
    const g = meta({ estado: (id) => (id === 'c-viejo' ? falla : { status_code: 'FINISHED' }) })
    const e = estadoCon([variante('v01', '2026-11-09T13:00:00.000Z', { ig_container_id: 'c-viejo' })])
    const r = await publicarVencidas({ estado: e, ahora: AHORA, env: ENV, fetch: g.fetch, espera })
    assert.deepEqual(r.publicadas, [])
    assert.equal(g.llamadas.filter((l) => l.metodo === 'POST').length, 0)
    assert.equal(v(r.estado, 'v01').intentos_publicar, 0)
    assert.equal(v(r.estado, 'v01').ig_container_id, 'c-viejo')
    assert.match(String(v(r.estado, 'v01').error_publicar), /contenedor/)
  })
}

test('contenedor guardado ya PUBLISHED: no se vuelve a publicar y la media se toma por caption cuando aparece', async () => {
  /** @type {any[]} */
  let lista = []
  const g = meta({ estado: (id) => (id === 'c-viejo' ? { status_code: 'PUBLISHED' } : { status_code: 'FINISHED' }), recientes: () => ({ data: lista }) })
  const e = estadoCon([variante('v01', '2026-11-09T13:00:00.000Z', { ig_container_id: 'c-viejo' })])
  const r = await publicarVencidas({ estado: e, ahora: AHORA, env: ENV, fetch: g.fetch, espera })
  assert.equal(g.llamadas.filter((l) => l.metodo === 'POST').length, 0)
  assert.ok(v(r.estado, 'v01').publicado_at)
  assert.equal(v(r.estado, 'v01').ig_media_id, null)
  lista = [{ id: '555', caption: 'caption v01', permalink: 'https://www.instagram.com/reel/Y/', timestamp: '2026-11-09T13:01:00+0000' }]
  const r2 = await publicarVencidas({ estado: r.estado, ahora: new Date('2026-11-09T18:00:00Z'), env: ENV, fetch: g.fetch, espera })
  assert.equal(v(r2.estado, 'v01').ig_media_id, '555')
  assert.equal(v(r2.estado, 'v01').permalink, 'https://www.instagram.com/reel/Y/')
  assert.equal(g.llamadas.filter((l) => l.metodo === 'POST').length, 0)
})

test('contenedor guardado EXPIRED o ERROR: ahí sí va uno nuevo', async () => {
  for (const status of ['EXPIRED', 'ERROR']) {
    const g = meta({ estado: (id) => (id === 'c-viejo' ? { status_code: status } : { status_code: 'FINISHED' }) })
    const e = estadoCon([variante('v01', '2026-11-09T13:00:00.000Z', { ig_container_id: 'c-viejo' })])
    const r = await publicarVencidas({ estado: e, ahora: AHORA, env: ENV, fetch: g.fetch, espera })
    assert.deepEqual(r.publicadas, ['v01'], status)
    assert.equal(g.llamadas.filter((l) => l.metodo === 'POST' && l.ruta === '/178/media').length, 1)
    assert.equal(v(r.estado, 'v01').ig_container_id, 'c-v01')
  }
})

/** Medias falsas: `n` publicadas cada `cada` minutos hacia atrás desde AHORA. @param {number} desde @param {number} n @param {number} cada */
const medias = (desde, n, cada) =>
  Array.from({ length: n }, (_, i) => ({ id: `x${desde + i}`, caption: `otro ${desde + i}`, permalink: 'p', timestamp: new Date(AHORA.getTime() - (desde + i) * cada * 60_000).toISOString().replace(/\.\d+Z$/, '+0000') }))

test('la deduplicación mira las últimas 48 h de media, paginando hasta 150', async () => {
  const paginas = /** @type {Record<string, any>} */ ({
    '': { data: medias(0, 50, 20), paging: { cursors: { after: 'p2' }, next: 'https://graph/p2' } },
    p2: { data: [...medias(50, 49, 20), { id: '777', caption: 'caption v01', permalink: 'https://www.instagram.com/reel/Z/', timestamp: '2026-11-08T20:00:00+0000' }], paging: { cursors: { after: 'p3' }, next: 'https://graph/p3' } },
    p3: { data: medias(100, 50, 20), paging: { cursors: { after: 'p4' }, next: 'https://graph/p4' } },
    p4: { data: medias(150, 50, 20) },
  })
  const g = meta({ recientes: (p) => paginas[p.after ?? ''] })
  const r = await publicarVencidas({ estado: estadoCon([variante('v01', '2026-11-09T13:00:00.000Z')]), ahora: AHORA, env: ENV, fetch: g.fetch, espera })
  assert.equal(v(r.estado, 'v01').ig_media_id, '777')
  assert.equal(g.llamadas.filter((l) => l.metodo === 'POST').length, 0)
  const pedidas = g.llamadas.filter((l) => l.ruta === '/178/media' && l.metodo === 'GET')
  assert.deepEqual(pedidas.map((l) => l.params.after ?? ''), ['', 'p2', 'p3'])
  // Una página que ya pasa las 48 h corta ahí.
  const corta = meta({ recientes: (p) => (p.after ? { data: [] } : { data: medias(0, 50, 60), paging: { cursors: { after: 'p2' }, next: 'https://graph/p2' } }) })
  await publicarVencidas({ estado: estadoCon([variante('v01', '2026-11-09T13:00:00.000Z')]), ahora: AHORA, env: ENV, fetch: corta.fetch, espera })
  assert.equal(corta.llamadas.filter((l) => l.ruta === '/178/media' && l.metodo === 'GET').length, 1)
})

test('errores de Meta fuera de una variante: token, permiso o bloqueo pausan y fallan la corrida', async () => {
  for (const [error, por] of /** @type {const} */ ([
    [{ code: 10, message: 'Application does not have permission for this action' }, 'permiso'],
    [{ code: 190, message: 'Error validating access token' }, 'token'],
    [{ code: 9, error_subcode: 2207051, message: 'We restrict certain activity' }, 'bloqueo'],
  ])) {
    const g = meta({ limite: () => ({ error }) })
    const r = await publicarVencidas({ estado: estadoCon([variante('v01', '2026-11-09T13:00:00.000Z')]), ahora: AHORA, env: ENV, fetch: g.fetch, espera })
    assert.equal(r.estado.pausado_por, por)
    assert.equal(r.fallar, true, por)
  }
})

test('cualquier otro error fuera de una variante cuenta fallas seguidas y falla la corrida a la tercera', async () => {
  const roto = () => meta({ limite: () => ({ error: { code: 100, message: "Unsupported get request. Object with ID '178' does not exist" } }) })
  let e = estadoCon([variante('v01', '2026-11-09T13:00:00.000Z')])
  for (const [vuelta, falla] of [[1, false], [2, false], [3, true]]) {
    const r = await publicarVencidas({ estado: e, ahora: AHORA, env: ENV, fetch: roto().fetch, espera })
    assert.equal(r.estado.fallas_seguidas, vuelta)
    assert.equal(r.fallar, falla)
    assert.equal(r.estado.pausado, null)
    e = r.estado
  }
  const sano = await publicarVencidas({ estado: e, ahora: AHORA, env: ENV, fetch: meta().fetch, espera })
  assert.deepEqual(sano.publicadas, ['v01'])
  assert.equal(sano.estado.fallas_seguidas, 0)
  assert.equal(sano.fallar, false)
})

test('"media not ready" al publicar: se reintenta sin contar intento y el contenedor se reusa', async () => {
  const g = meta({ publicar: () => ({ error: { code: 9007, error_subcode: 2207027, message: 'Media ID is not available' } }) })
  const r = await publicarVencidas({ estado: estadoCon([variante('v01', '2026-11-09T13:00:00.000Z')]), ahora: AHORA, env: ENV, fetch: g.fetch, espera })
  assert.equal(v(r.estado, 'v01').intentos_publicar, 0)
  assert.equal(v(r.estado, 'v01').ig_container_id, 'c-v01')
  const g2 = meta()
  const r2 = await publicarVencidas({ estado: r.estado, ahora: AHORA, env: ENV, fetch: g2.fetch, espera })
  assert.deepEqual(r2.publicadas, ['v01'])
  assert.equal(g2.llamadas.filter((l) => l.metodo === 'POST' && l.ruta === '/178/media').length, 0)
})

/* ── medir ─────────────────────────────────────────────────────────────── */

const publicada = (/** @type {string} */ id, /** @type {string} */ media, /** @type {string} */ cuando) =>
  variante(id, cuando, { ig_media_id: media, publicado_at: cuando, permalink: `https://www.instagram.com/reel/${media}/` })

/** @param {{ insights?: 'sin-permiso' | 'ok' }} [o] */
function metaMedir({ insights = 'sin-permiso' } = {}) {
  return graphFalso([
    ['GET', /^\/178$/, () => ({ id: '178', username: 'apex.stack' })],
    ['GET', /^\/\d+\/insights$/, () => (insights === 'ok' ? { data: [{ name: 'views', values: [{ value: 10 }] }] } : errorMeta(10, 'Application does not have permission for this action'))],
    ['GET', /^\/$/, (p) => {
      const ids = String(p.ids).split(',')
      if (String(p.fields).startsWith('comments')) {
        return Object.fromEntries(ids.map((id) => [id, { id, comments: { data: [{ text: 'WEB', username: 'ana' }, { text: 'web porfa', username: 'beto' }, { text: 'WEB', username: 'apex.stack' }, { text: 'lindo', username: 'caro' }] } }]))
      }
      const conInsights = String(p.fields).includes('insights')
      return Object.fromEntries(ids.map((id) => [id, {
        id, like_count: 2, comments_count: id === '111' ? 4 : 0, permalink: `https://www.instagram.com/reel/${id}/`,
        ...(conInsights ? { insights: { data: [
          { name: 'views', values: [{ value: 150 }] }, { name: 'reach', values: [{ value: 120 }] }, { name: 'shares', values: [{ value: 1 }] },
          { name: 'saved', values: [{ value: 0 }] }, { name: 'ig_reels_avg_watch_time', values: [{ value: 5230 }] },
        ] } } : {}),
      }]))
    }],
  ])
}

test('medir: pocas llamadas, sin insights quedan null y WEB se cuenta sin la cuenta propia', async () => {
  const e = estadoCon([publicada('v01', '111', '2026-11-09T13:00:00.000Z'), publicada('v02', '222', '2026-11-09T14:00:00.000Z'), publicada('v03', '333', '2026-10-20T14:00:00.000Z')])
  const g = metaMedir()
  const r = await medir({ estado: e, ahora: AHORA, env: ENV, fetch: g.fetch, espera })
  assert.equal(r.medidas, 2)
  assert.equal(r.estado.insights.disponible, false)
  assert.match(String(r.estado.insights.motivo), /instagram_manage_insights/)
  const m1 = v(r.estado, 'v01').metricas
  assert.equal(m1.likes, 2)
  assert.equal(m1.comentarios, 4)
  assert.equal(m1.comentarios_web, 2)
  assert.equal(m1.vistas, null)
  assert.equal(m1.alcance, null)
  assert.equal(v(r.estado, 'v02').metricas.comentarios_web, 0)
  assert.equal(v(r.estado, 'v03').metricas, null)
  assert.ok(g.llamadas.length <= 4, `${g.llamadas.length} llamadas`)
  assert.equal(g.llamadas.filter((l) => l.ruta === '/' && String(l.params.fields).startsWith('comments')).length, 1)
})

test('medir: con insights llena vistas, alcance, compartidos, guardados y tiempo visto', async () => {
  const e = estadoCon([publicada('v01', '111', '2026-11-09T13:00:00.000Z')])
  const r = await medir({ estado: e, ahora: AHORA, env: ENV, fetch: metaMedir({ insights: 'ok' }).fetch, espera })
  assert.equal(r.estado.insights.disponible, true)
  assert.deepEqual(v(r.estado, 'v01').metricas, {
    medido_at: AHORA.toISOString(), vistas: 150, alcance: 120, likes: 2, comentarios: 4, compartidos: 1, guardados: 0, comentarios_web: 2, promedio_visto_s: 5.23,
  })
})

test('medir: con un token de estadísticas aparte, mide con ese y no con el que publica', async () => {
  const e = estadoCon([publicada('v01', '111', '2026-11-09T13:00:00.000Z')])
  const g = metaMedir({ insights: 'ok' })
  /** @type {string[]} */
  const tokens = []
  /** @type {typeof fetch} */
  const espia = async (entrada, init) => {
    tokens.push(new URL(String(entrada)).searchParams.get('access_token') ?? '')
    return g.fetch(entrada, init)
  }
  const r = await medir({ estado: e, ahora: AHORA, env: { ...ENV, IG_INSIGHTS_TOKEN: 'EAAinsights' }, fetch: espia, espera })
  assert.equal(r.estado.insights.disponible, true)
  assert.ok(tokens.length > 0 && tokens.every((t) => t === 'EAAinsights'), tokens.join(','))
})

test('reel real: a las 19:17 publica la mejor prueba de ayer sin trial_params y fuera del feed, una sola vez', async () => {
  esperas = []
  const g = meta({ crear: (p) => ({ id: p.trial_params ? `c-${p.caption.split(' ')[1]}` : 'c-real' }) })
  const ayer = estadoCon([])
  delete ayer.creativos['2026-11-09-a']
  ayer.creativos['2026-11-08-a'] = {
    clave: 'a', fecha: '2026-11-08', titulo: 'a', categoria: 'comedia', formato: 'chat', paleta: 'papel', producido_at: '2026-11-08T08:30:00.000Z', error: null, intentos: 0,
    variantes: ['v01', 'v02', 'v03'].map((id, i) =>
      variante(id, '2026-11-08T15:00:00.000Z', { caption: `cuerpo ${id}\n\n#a #b #c #d #e\n\nComentá WEB`, ig_media_id: `m-${id}`, publicado_at: '2026-11-08T15:00:00.000Z', metricas: { likes: i === 1 ? 7 : 1 } }),
    ),
  }
  const a = new Date('2026-11-09T22:17:00Z')
  const r = await publicarVencidas({ estado: ayer, ahora: a, env: ENV, fetch: g.fetch, espera, reloj: () => a })
  const creado = g.llamadas.find((l) => l.metodo === 'POST' && l.ruta === '/178/media')
  assert.ok(creado)
  assert.equal(creado.params.share_to_feed, 'false')
  assert.equal(creado.params.trial_params, undefined)
  assert.equal(creado.params.video_url, 'https://x.public.blob.vercel-storage.com/reels/prueba/v02.mp4')
  assert.equal(creado.params.caption, 'cuerpo v02\n\n#a #b #c\n\nComentá WEB')
  assert.deepEqual(r.publicadas, ['v02 (real)'])
  assert.equal(r.estado.creativos['2026-11-08-a'].real.ig_container_id, 'c-real')
  assert.ok(r.estado.creativos['2026-11-08-a'].real.publicado_at)
  const otra = await publicarVencidas({ estado: r.estado, ahora: new Date('2026-11-10T00:17:00Z'), env: ENV, fetch: g.fetch, espera })
  assert.deepEqual(otra.publicadas, [])
})
