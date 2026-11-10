import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  CTA_CAPTION, EJES, MAX_INTENTOS, MAX_POR_CORRIDA, POR_DIA, captionReal, puntaje, realPendiente, TICS_PUBLICAR, agendar, instanteAR, guionesUsados, publicadasSinId, armarCaptions, clasificarErrorMeta, contarWeb, cupoDisponible, debeProducir, descartarViejas, diaAR, distancia,
  elegirGuion, estadoVacio, fusionarEstado, leerCupo, leerEstado, matrizVariantes, metricasDe, ordenAtomos, porPublicar, resumenVariante, revisarGuion,
  revisarSalida, serializarEstado, unirVoces, ventanaZoom, bordesDeVoz,
} from './lib.mjs'

const MUSICAS = ['acustica-1', 'acustica-2', 'tech-house-1', 'tech-house-2']
const CLIPS = [
  { id: 'papel-comentario', paleta: 'papel', estilo: 'comentario' },
  { id: 'papel-sello', paleta: 'papel', estilo: 'sello' },
  { id: 'noche-comentario', paleta: 'noche', estilo: 'comentario' },
  { id: 'noche-sello', paleta: 'noche', estilo: 'sello' },
]

/** @param {Partial<Record<string, unknown>>} [extra] */
function guion(extra = {}) {
  return {
    version: 1,
    clave: 'sobrino-hace-webs',
    titulo: 'El sobrino que hace webs',
    categoria: 'comedia',
    formato: 'chat',
    paleta: 'papel',
    hooks: ['Tu sobrino te hizo la web', 'Le pediste la web al sobrino', 'La web que te hizo el sobrino'],
    voz: null,
    contenido: { contacto: 'Cliente nuevo', mensajes: [], remate: null },
    captions: ['El sobrino hace lo que puede.', 'Todos tenemos un sobrino que hace webs.', 'Una web no es un favor.'],
    hashtags: ['diseñoweb', 'paginaweb', 'emprendedores', 'pymes', 'negocios', 'marketingdigital', 'webs', 'argentina'],
    fuentes: [{ nombre: 'LCT', url: 'https://servicios.infoleg.gob.ar/lct.htm', consultado: '2026-11-10' }],
    ...extra,
  }
}

/** @param {string} clave @param {string} categoria */
const entrada = (clave, categoria, archivo = `${clave}.json`) => ({ archivo, guion: guion({ clave, categoria }), problemas: [] })

/** @param {Record<string, unknown>[]} variantes @param {Partial<Record<string, unknown>>} [extra] */
function creativo(variantes, extra = {}) {
  return { clave: 'x', fecha: '2026-11-09', titulo: 'x', categoria: 'comedia', formato: 'chat', paleta: 'papel', producido_at: '2026-11-09T08:30:00.000Z', error: null, intentos: 0, variantes, ...extra }
}

/** @param {string} id @param {string} publicar_at @param {Partial<Record<string, unknown>>} [extra] */
const variante = (id, publicar_at, extra = {}) => ({
  id, cambios: {}, resumen: id, video_url: `https://x.public.blob.vercel-storage.com/${id}.mp4`, duracion_s: 20, caption: `caption ${id}`, publicar_at,
  ig_media_id: null, permalink: null, publicado_at: null, error_publicar: null, intentos_publicar: 0, metricas: null, ...extra,
})

test('diaAR usa la fecha de Buenos Aires, no la de UTC', () => {
  assert.equal(diaAR(new Date('2026-11-09T02:30:00Z')), '2026-11-08')
  assert.equal(diaAR(new Date('2026-11-09T03:00:00Z')), '2026-11-09')
})

test('leerEstado: vacío da un estado válido y uno roto tira (perderlo duplicaría publicaciones)', () => {
  const e = leerEstado('')
  assert.equal(e.version, 1)
  assert.deepEqual(e.creativos, {})
  assert.equal(e.pausado, null)
  assert.throws(() => leerEstado('{ esto no es json'))
  assert.throws(() => leerEstado('[]'))
})

test('serializarEstado ordena los creativos y es estable', () => {
  const e = estadoVacio(new Date('2026-11-09T00:00:00Z'))
  e.creativos['2026-11-09-b'] = creativo([])
  e.creativos['2026-11-08-a'] = creativo([])
  const texto = serializarEstado(e)
  assert.ok(texto.indexOf('2026-11-08-a') < texto.indexOf('2026-11-09-b'))
  assert.equal(serializarEstado(leerEstado(texto)), texto)
})

test('revisarGuion encuentra lo que rompe el contrato', () => {
  assert.deepEqual(revisarGuion(guion(), 'sobrino-hace-webs.json'), [])
  assert.ok(revisarGuion(guion(), 'otro.json').some((p) => /archivo/.test(p)))
  assert.ok(revisarGuion(guion({ hooks: ['a', 'b'] }), 'sobrino-hace-webs.json').some((p) => /hooks/.test(p)))
  assert.ok(revisarGuion(guion({ categoria: 'drama' }), 'sobrino-hace-webs.json').some((p) => /categoria/.test(p)))
  assert.ok(revisarGuion(guion({ paleta: 'rosa' }), 'sobrino-hace-webs.json').some((p) => /paleta/.test(p)))
  assert.ok(revisarGuion(guion({ hashtags: ['#web'] }), 'sobrino-hace-webs.json').some((p) => /hashtag/.test(p)))
  assert.ok(revisarGuion(guion({ formato: 'mito', voz: null }), 'sobrino-hace-webs.json').some((p) => /voz/.test(p)))
  assert.ok(revisarGuion(guion({ captions: ['uno'] }), 'sobrino-hace-webs.json').some((p) => /captions/.test(p)))
  assert.ok(revisarGuion(guion({ fuentes: [] }), 'sobrino-hace-webs.json').some((p) => /fuentes/.test(p)))
  assert.ok(revisarGuion(guion({ fuentes: [{ nombre: 'Un blog', url: 'https://blog.com/x', consultado: '2026-11-10' }] }), 'sobrino-hace-webs.json').some((p) => /oficial/.test(p)))
})

test('elegirGuion: el primero por nombre de archivo que nunca se usó', () => {
  const guiones = [entrada('b-dos', 'tecnico'), entrada('a-uno', 'comedia'), entrada('c-tres', 'negocio')]
  const estado = estadoVacio()
  assert.equal(elegirGuion({ guiones, estado, hoy: '2026-11-09' }).elegido?.guion.clave, 'a-uno')
  estado.creativos['2026-11-08-a-uno'] = creativo([], { clave: 'a-uno', fecha: '2026-11-08', categoria: 'comedia' })
  assert.equal(elegirGuion({ guiones, estado, hoy: '2026-11-09' }).elegido?.guion.clave, 'b-dos')
})

test('elegirGuion no repite la categoría del día anterior si hay otra', () => {
  const guiones = [entrada('a-uno', 'comedia'), entrada('b-dos', 'comedia'), entrada('c-tres', 'mito')]
  const estado = estadoVacio()
  estado.creativos['2026-11-08-a-uno'] = creativo([], { clave: 'a-uno', fecha: '2026-11-08', categoria: 'comedia' })
  assert.equal(elegirGuion({ guiones, estado, hoy: '2026-11-09' }).elegido?.guion.clave, 'c-tres')
  estado.creativos['2026-11-09-c-tres'] = creativo([], { clave: 'c-tres', fecha: '2026-11-09', categoria: 'mito' })
  assert.equal(elegirGuion({ guiones, estado, hoy: '2026-11-10' }).elegido?.guion.clave, 'b-dos')
})

test('elegirGuion saltea y anota los inválidos; banco vacío no es un error', () => {
  const malo = { archivo: 'a-malo.json', guion: null, problemas: ['no es JSON'] }
  const r = elegirGuion({ guiones: [malo, entrada('b-bueno', 'mito')], estado: estadoVacio(), hoy: '2026-11-09' })
  assert.equal(r.elegido?.guion.clave, 'b-bueno')
  assert.deepEqual(r.saltados, [{ clave: 'a-malo', motivo: 'no es JSON' }])
  assert.equal(elegirGuion({ guiones: [], estado: estadoVacio(), hoy: '2026-11-09' }).elegido, null)
  assert.equal(elegirGuion({ guiones: [entrada('b-bueno', 'mito')], estado: estadoVacio(), hoy: '2026-11-09', excluir: new Set(['b-bueno']) }).elegido, null)
})

test('elegirGuion: lo que falló por algo general vuelve al otro día; lo que falló por el guion queda usado', () => {
  const guiones = [entrada('a-uno', 'comedia'), entrada('b-dos', 'mito'), entrada('c-tres', 'tecnico')]
  const e = estadoVacio()
  const fallido = (/** @type {string} */ fecha, /** @type {string} */ falla) => creativo([], { clave: 'a-uno', fecha, producido_at: null, error: 'falta BLOB_READ_WRITE_TOKEN', intentos: MAX_INTENTOS, falla })
  e.creativos['2026-11-08-a-uno'] = fallido('2026-11-08', 'general')
  assert.equal(elegirGuion({ guiones, estado: e, hoy: '2026-11-09' }).elegido?.guion.clave, 'a-uno')
  assert.ok(!guionesUsados(e).has('a-uno'))
  e.creativos['2026-11-08-a-uno'] = fallido('2026-11-08', 'guion')
  assert.equal(elegirGuion({ guiones, estado: e, hoy: '2026-11-09' }).elegido?.guion.clave, 'b-dos')
  assert.ok(guionesUsados(e).has('a-uno'))
  // Dos días seguidos de falla general: pasa al final para no trabar el banco, pero no se quema.
  e.creativos['2026-11-08-a-uno'] = fallido('2026-11-08', 'general')
  e.creativos['2026-11-09-a-uno'] = fallido('2026-11-09', 'general')
  assert.equal(elegirGuion({ guiones, estado: e, hoy: '2026-11-10' }).elegido?.guion.clave, 'b-dos')
  assert.equal(elegirGuion({ guiones, estado: e, hoy: '2026-11-10', excluir: new Set(['b-dos', 'c-tres']) }).elegido?.guion.clave, 'a-uno')
})

test('debeProducir: uno por día, reintenta lo que falló y no arranca tarde', () => {
  const temprano = new Date('2026-11-09T08:05:00Z')
  assert.equal(debeProducir(estadoVacio(), temprano).producir, true)

  const hecho = estadoVacio()
  hecho.creativos['2026-11-09-a'] = creativo([], { fecha: '2026-11-09', clave: 'a' })
  assert.equal(debeProducir(hecho, temprano).producir, false)

  const fallido = estadoVacio()
  fallido.creativos['2026-11-09-a'] = creativo([], { fecha: '2026-11-09', clave: 'a', producido_at: null, error: 'boom', intentos: 1 })
  assert.deepEqual(debeProducir(fallido, temprano), { producir: true, motivo: 'reintento 2 de 3 de 2026-11-09-a', reintentar: 'a' })
  fallido.creativos['2026-11-09-a'] = { ...fallido.creativos['2026-11-09-a'], intentos: MAX_INTENTOS }
  assert.equal(debeProducir(fallido, temprano).producir, false)

  const noche = new Date('2026-11-10T00:30:00Z')
  assert.equal(debeProducir(estadoVacio(), noche).producir, false)
  assert.equal(debeProducir(estadoVacio(), noche, { forzado: true }).producir, true)

  const pausado = { ...estadoVacio(), pausado: 'token vencido' }
  assert.equal(debeProducir(pausado, temprano).producir, false)
  // Producir no usa Instagram: con el token vencido se sigue produciendo y, cuando vuelve, sale.
  assert.equal(debeProducir({ ...pausado, pausado_por: 'token' }, temprano).producir, true)
  assert.equal(debeProducir({ ...pausado, pausado_por: 'bloqueo' }, temprano).producir, false)

  const tarde = estadoVacio()
  tarde.creativos['2026-11-08-b'] = creativo([variante('v01', '2026-11-09T15:00:00.000Z')], { fecha: '2026-11-08', clave: 'b' })
  assert.equal(debeProducir(tarde, temprano).producir, false)
})

test('ventanaZoom nunca corta la zona útil de Reels (220 arriba, 420 abajo)', () => {
  for (const zoom of EJES.zoom) {
    for (const encuadre of EJES.encuadre) {
      const v = ventanaZoom(zoom, encuadre)
      assert.equal(v.ancho % 2, 0)
      assert.equal(v.alto % 2, 0)
      assert.ok(v.ancho >= 1080 && v.alto >= 1920)
      assert.ok(v.x >= 0 && v.x + 1080 <= v.ancho && v.y >= 0 && v.y + 1920 <= v.alto)
      const arriba = v.y / (v.alto / 1920)
      const abajo = (v.y + 1920) / (v.alto / 1920)
      assert.ok(arriba <= 220, `${zoom} ${encuadre}: corta ${arriba} px arriba`)
      assert.ok(abajo >= 1920 - 420, `${zoom} ${encuadre}: corta hasta ${abajo} abajo`)
    }
  }
  assert.deepEqual(ventanaZoom(1, 'arriba'), { ancho: 1080, alto: 1920, x: 0, y: 0 })
})

/** @param {any[]} lista @param {(x: any) => unknown} clave */
function conteo(lista, clave) {
  /** @type {Map<unknown, number>} */
  const m = new Map()
  for (const x of lista) m.set(clave(x), (m.get(clave(x)) ?? 0) + 1)
  return [...m.values()]
}

test('matrizVariantes: 30 combinaciones distintas, parejas por eje y lejos entre sí', () => {
  const m = matrizVariantes({ n: 30, semilla: '2026-11-09-sobrino', musicas: MUSICAS, clips: CLIPS, paleta: 'papel' })
  assert.equal(m.length, 30)
  const claves = new Set(m.map((c) => JSON.stringify(c)))
  assert.equal(claves.size, 30)
  for (const eje of ['hook', 'zoom', 'velocidad', 'color', 'musica', 'cierre', 'textura']) {
    const c = conteo(m, (x) => x[eje])
    assert.ok(Math.max(...c) - Math.min(...c) <= 1, `${eje} desparejo: ${c}`)
  }
  assert.equal(new Set(m.map((c) => c.hook)).size, 3)
  assert.equal(new Set(m.map((c) => c.musica)).size, 4)
  const enc = conteo(m.filter((c) => c.zoom > 1), (x) => x.encuadre)
  assert.ok(Math.max(...enc) - Math.min(...enc) <= 1, `encuadre desparejo: ${enc}`)
  for (const c of m) {
    if (c.zoom === 1) assert.equal(c.encuadre, 'centro')
    assert.ok(c.velocidad >= 0.96 && c.velocidad <= 1.04)
    assert.ok(['papel-comentario', 'papel-sello'].includes(c.cierre), `cierre de otra paleta: ${c.cierre}`)
  }
  for (let i = 0; i < m.length; i++) for (let j = i + 1; j < m.length; j++) assert.ok(distancia(/** @type {any} */ (m[i]), /** @type {any} */ (m[j])) >= 2, `v${i + 1} y v${j + 1} casi iguales`)
})

test('matrizVariantes es determinística y sin clips de la paleta usa todos', () => {
  const p = { n: 30, semilla: 's', musicas: MUSICAS, clips: CLIPS, paleta: 'papel' }
  assert.deepEqual(matrizVariantes(p), matrizVariantes(p))
  assert.notDeepEqual(matrizVariantes(p), matrizVariantes({ ...p, semilla: 'otra' }))
  const sin = matrizVariantes({ ...p, paleta: 'selva' })
  assert.equal(new Set(sin.map((c) => c.cierre)).size, 4)
  const grande = matrizVariantes({ ...p, n: 80 })
  assert.equal(new Set(grande.map((c) => JSON.stringify(c))).size, 80)
})

test('resumenVariante: en criollo y de 60 caracteres o menos', () => {
  const m = matrizVariantes({ n: 60, semilla: 'resumen', musicas: MUSICAS, clips: CLIPS, paleta: 'noche' })
  for (const c of m) {
    const r = resumenVariante(c)
    assert.ok(r.length <= 60, r)
    assert.ok(r.startsWith(`gancho ${c.hook + 1}`), r)
  }
  const r = resumenVariante({ hook: 1, zoom: 1.09, encuadre: 'arriba', velocidad: 0.98, color: 'frio', musica: 'tech-house-1', cierre: 'noche-sello', textura: 'grano' })
  assert.match(r, /^gancho 2 · zoom 9 % arriba · frío · tech house 1/)
  assert.equal(resumenVariante({ hook: 0, zoom: 1, encuadre: 'centro', velocidad: 1, color: 'neutro', musica: 'acustica-2', cierre: 'x', textura: 'nada' }), 'gancho 1 · acústica 2 · cierre x')
})

test('armarCaptions: todos distintos, con el cierre al final y sin emojis', () => {
  const g = guion({ captions: ['El sobrino hace lo que puede 🙃', 'Todos tenemos un sobrino que hace webs.', 'Una web no es un favor.'] })
  const cs = armarCaptions({ guion: g, n: 30 })
  assert.equal(cs.length, 30)
  assert.equal(new Set(cs).size, 30)
  for (const c of cs) {
    assert.ok(c.endsWith(CTA_CAPTION), c)
    assert.ok(c.length <= 2200)
    assert.doesNotMatch(c, /\p{Extended_Pictographic}/u)
    assert.ok(g.captions.some((b) => c.startsWith(b.replace(' 🙃', ''))), c)
    const tags = c.match(/#\S+/g) ?? []
    assert.ok(tags.length >= 4)
    for (const t of tags) assert.ok(g.hashtags.includes(t.slice(1)), t)
  }
  assert.equal(new Set(cs.map((c) => c.split('\n')[0])).size, 3)
})

/** Cuántos horarios vence cada tic de publicación del día (lo que no entra en el último no sale). @param {string} dia @param {number[]} t */
function porTic(dia, t) {
  const tics = TICS_PUBLICAR.map((m) => instanteAR(dia, m).getTime())
  let previo = -Infinity
  const cuenta = tics.map((tic) => {
    const k = t.filter((x) => x > previo && x <= tic).length
    previo = tic
    return k
  })
  return { cuenta, despues: t.filter((x) => x > previo).length }
}

test('los tics de publicación: 9:17 a 21:17 cada 2 h y 22:47', () => {
  assert.deepEqual(TICS_PUBLICAR, [557, 677, 797, 917, 1037, 1157, 1277, 1367])
})

test('agendar reparte entre las 9:00 y las 22:45 y ningún tic vence más de MAX_POR_CORRIDA', () => {
  const ahora = new Date('2026-11-09T08:05:00Z')
  const { dia, horarios } = agendar({ n: POR_DIA, ahora, semilla: '2026-11-09-a' })
  assert.equal(dia, '2026-11-09')
  assert.equal(horarios.length, POR_DIA)
  const t = horarios.map((h) => Date.parse(h))
  const desde = Date.parse('2026-11-09T12:00:00Z')
  const hasta = Date.parse('2026-11-10T01:45:00Z')
  t.forEach((x, i) => {
    assert.ok(x > desde && x <= hasta, `${horarios[i]} fuera de 9:00-22:45`)
    assert.notEqual(new Date(x).getUTCSeconds(), 0)
    if (i) assert.ok(x > (t[i - 1] ?? 0), 'desordenado')
  })
  const { cuenta, despues } = porTic(dia, t)
  assert.equal(despues, 0)
  assert.ok(Math.max(...cuenta) <= MAX_POR_CORRIDA, `${cuenta}`)
  // Parejo: cada tramo de 2 h vence 1 o 2, nunca una ráfaga.
  for (const k of cuenta.slice(1, -1)) assert.ok(k >= 1 && k <= 2, `${cuenta}`)
  assert.deepEqual(agendar({ n: POR_DIA, ahora, semilla: '2026-11-09-a' }), { dia, horarios })
})

test('agendar producido tarde: sólo lo que entra en los tics que quedan, ninguno pasado del tope', () => {
  const ahora = new Date('2026-11-09T23:00:00Z')
  const r = agendar({ n: 30, ahora, semilla: 'x' })
  assert.equal(r.dia, '2026-11-09')
  assert.equal(r.horarios.length, 2 * MAX_POR_CORRIDA)
  const t = r.horarios.map((h) => Date.parse(h))
  assert.ok(t.every((x) => x > ahora.getTime() && x <= Date.parse('2026-11-10T01:45:00Z')))
  const { cuenta, despues } = porTic(r.dia, t)
  assert.equal(despues, 0)
  assert.deepEqual(cuenta.slice(-2), [MAX_POR_CORRIDA, MAX_POR_CORRIDA])
  // A las 15 de Buenos Aires quedan 5 tics.
  const media = agendar({ n: POR_DIA, ahora: new Date('2026-11-09T18:00:00Z'), semilla: 'x' })
  assert.equal(media.horarios.length, Math.min(POR_DIA, 5 * MAX_POR_CORRIDA))
  assert.ok(Math.max(...porTic(media.dia, media.horarios.map((h) => Date.parse(h))).cuenta) <= MAX_POR_CORRIDA)
})

test('agendar con menos de una hora de franja: el día siguiente entero', () => {
  const noche = agendar({ n: POR_DIA, ahora: new Date('2026-11-10T01:00:00Z'), semilla: 'x' })
  assert.equal(noche.dia, '2026-11-10')
  assert.equal(noche.horarios.length, POR_DIA)
  assert.ok(noche.horarios.every((h) => Date.parse(h) > Date.parse('2026-11-10T12:00:00Z')))
})

test('cupo: deja siempre 5 para lo que se publique a mano', () => {
  const c = leerCupo({ data: [{ quota_usage: 5, config: { quota_total: 100, quota_duration: 86400 } }] })
  assert.deepEqual(c, { total: 100, usado: 5 })
  assert.equal(cupoDisponible(c), 90)
  assert.equal(cupoDisponible({ total: 100, usado: 95 }), 0)
  assert.equal(cupoDisponible(null), 0)
  assert.equal(leerCupo({ data: [] }), null)
})

test('clasificarErrorMeta separa token, límite, bloqueo, permiso, transitorio y error de la variante', () => {
  assert.equal(clasificarErrorMeta({ codigo: 190, message: 'Error validating access token' }), 'token')
  assert.equal(clasificarErrorMeta({ codigo: 102 }), 'token')
  assert.equal(clasificarErrorMeta({ codigo: 4, message: 'Application request limit reached' }), 'limite')
  assert.equal(clasificarErrorMeta({ codigo: 9, subcodigo: 2207042, message: 'reached the maximum number of posts' }), 'limite')
  assert.equal(clasificarErrorMeta({ codigo: 32 }), 'limite')
  assert.equal(clasificarErrorMeta({ codigo: 613 }), 'limite')
  assert.equal(clasificarErrorMeta({ codigo: 9, subcodigo: 2207051, message: 'We restrict certain activity to protect our community' }), 'bloqueo')
  assert.equal(clasificarErrorMeta({ codigo: 368, message: 'temporarily blocked for policies violations' }), 'bloqueo')
  assert.equal(clasificarErrorMeta({ codigo: 4, message: 'This action was blocked as spam' }), 'bloqueo')
  assert.equal(clasificarErrorMeta({ codigo: 10, message: 'Application does not have permission for this action' }), 'permiso')
  assert.equal(clasificarErrorMeta({ codigo: 100, message: 'Invalid parameter: trial_params is not supported for this user' }), 'permiso')
  assert.equal(clasificarErrorMeta({ http: 500, transitorio: true }), 'transitorio')
  assert.equal(clasificarErrorMeta({ codigo: 2, transitorio: true }), 'transitorio')
  assert.equal(clasificarErrorMeta({ codigo: 100, subcodigo: 2207026, message: 'unsupported video format' }), 'variante')
  // "Media not ready": el contenedor todavía no terminó; no es culpa de la variante.
  assert.equal(clasificarErrorMeta({ codigo: 9007, subcodigo: 2207027, message: 'Media ID is not available' }), 'transitorio')
  assert.equal(clasificarErrorMeta({ codigo: 100, message: 'The media is not ready for publishing, please wait for a moment' }), 'transitorio')
  assert.equal(clasificarErrorMeta({ codigo: 100, message: 'The video has not finished processing' }), 'transitorio')
})

test('porPublicar: lo vencido de hoy, ordenado, sin repetir ni pasar el tope', () => {
  const e = estadoVacio()
  e.creativos['2026-11-09-a'] = creativo([
    variante('v01', '2026-11-09T12:10:00.000Z', { ig_media_id: '1' }),
    variante('v02', '2026-11-09T13:40:00.000Z'),
    variante('v03', '2026-11-09T12:50:00.000Z'),
    variante('v04', '2026-11-09T14:20:00.000Z', { intentos_publicar: 3 }),
    variante('v05', '2026-11-09T15:00:00.000Z', { descartada_at: '2026-11-09T15:00:00.000Z' }),
    variante('v06', '2026-11-09T20:00:00.000Z'),
  ])
  const ahora = new Date('2026-11-09T16:00:00Z')
  assert.deepEqual(porPublicar(e, ahora).map((x) => x.id), ['v03', 'v02'])
  assert.deepEqual(porPublicar(e, ahora, { max: 1 }).map((x) => x.id), ['v03'])
  assert.deepEqual(porPublicar(e, new Date('2026-11-09T12:00:00Z')).map((x) => x.id), [])
  assert.deepEqual(porPublicar(e, new Date('2026-11-09T12:00:00Z'), { ya: true }).map((x) => x.id), ['v03'])
  assert.deepEqual(porPublicar(e, new Date('2026-11-09T01:00:00Z'), { ya: true }).map((x) => x.id), ['v03'], 'producido tarde: la de mañana sale ya')
  assert.deepEqual(porPublicar(e, new Date('2026-11-10T13:00:00Z'), { ya: true }).map((x) => x.id), [], 'la de un día que ya pasó no sale')
})

test('publicadasSinId: las que salieron en las últimas 48 h sin que Instagram devolviera su id', () => {
  const e = estadoVacio()
  e.creativos['2026-11-09-a'] = creativo([
    variante('v01', '2026-11-09T13:00:00.000Z', { publicado_at: '2026-11-09T13:01:00.000Z' }),
    variante('v02', '2026-11-09T14:00:00.000Z', { publicado_at: '2026-11-09T14:01:00.000Z', ig_media_id: '9' }),
    variante('v03', '2026-11-06T14:00:00.000Z', { publicado_at: '2026-11-06T14:01:00.000Z' }),
    variante('v04', '2026-11-09T15:00:00.000Z'),
  ])
  assert.deepEqual(publicadasSinId(e, new Date('2026-11-09T16:00:00Z')), [{ creativo: '2026-11-09-a', id: 'v01' }])
})

test('descartarViejas: lo de un día anterior que no salió se descarta con motivo', () => {
  const e = estadoVacio()
  e.creativos['2026-11-08-a'] = creativo([variante('v01', '2026-11-09T01:30:00.000Z'), variante('v02', '2026-11-08T20:00:00.000Z', { ig_media_id: '9', publicado_at: '2026-11-08T20:01:00.000Z' })], { fecha: '2026-11-08' })
  const ahora = new Date('2026-11-09T12:20:00Z')
  const r = descartarViejas(e, ahora)
  assert.equal(r.descartadas, 1)
  const [v1, v2] = /** @type {any[]} */ (r.estado.creativos['2026-11-08-a']?.variantes)
  assert.equal(v1.descartada_at, ahora.toISOString())
  assert.match(v1.error_publicar, /2026-11-08/)
  assert.equal(v2.descartada_at, undefined)
  assert.equal(descartarViejas(r.estado, ahora).descartadas, 0)
})

test('contarWeb cuenta WEB como palabra y no la cuenta propia', () => {
  const c = [
    { text: 'WEB', username: 'ana' },
    { text: 'web!', username: 'beto' },
    { text: 'quiero mi Web para la panadería', username: 'caro' },
    { text: 'website', username: 'dani' },
    { text: 'webs', username: 'eli' },
    { text: 'paginaweb', username: 'fer' },
    { text: 'WEB', username: 'apex.stack' },
    { text: 'Web🙌', username: 'gabi' },
  ]
  assert.equal(contarWeb(c, 'apex.stack'), 4)
  assert.equal(contarWeb([], 'apex.stack'), 0)
})

test('metricasDe: lo que no se puede leer queda null, nunca 0', () => {
  const ahora = new Date('2026-11-09T16:00:00Z')
  const sin = metricasDe({ media: { like_count: 3, comments_count: 2 }, insights: null, comentarios_web: 1, ahora })
  assert.deepEqual(sin, { medido_at: ahora.toISOString(), vistas: null, alcance: null, likes: 3, comentarios: 2, compartidos: null, guardados: null, comentarios_web: 1, promedio_visto_s: null })
  const con = metricasDe({ media: {}, insights: { views: 120, reach: 100, shares: 0, saved: 2, ig_reels_avg_watch_time: 4321 }, comentarios_web: null, ahora })
  assert.equal(con.likes, null)
  assert.equal(con.vistas, 120)
  assert.equal(con.compartidos, 0)
  assert.equal(con.promedio_visto_s, 4.32)
})

test('unirVoces pega el hook al cuerpo con la pausa de voz a voz y corre los tiempos', () => {
  const hook = { duracion_s: 2.1, palabras: [{ texto: 'Tu', inicio: 0.03, fin: 0.2 }, { texto: 'web.', inicio: 0.25, fin: 1.6 }] }
  const cuerpo = { duracion_s: 10, palabras: [{ texto: 'Mirá', inicio: 0.04, fin: 0.4 }, { texto: 'esto.', inicio: 0.45, fin: 9.4 }] }
  const u = unirVoces({ hook, cuerpo, pausa: 0.85 })
  assert.equal(u.corte_s, 1.72)
  assert.equal(u.desplazamiento_s, 2.41)
  assert.equal(u.duracion_s, 12.41)
  assert.deepEqual(u.palabras.map((p) => p.texto), ['Tu', 'web.', 'Mirá', 'esto.'])
  assert.deepEqual(u.palabras[2], { texto: 'Mirá', inicio_s: 2.45, fin_s: 2.81 })
  assert.ok(u.desplazamiento_s >= u.corte_s)
})

test('unirVoces usa dónde termina y empieza la voz de verdad si las palabras se estiran (tiempos por silencios)', () => {
  const hook = { duracion_s: 2.57, fin_voz_s: 2.35, palabras: [{ texto: 'Tu', inicio: 0, fin: 0.2 }, { texto: 'cargar', inicio: 2.0, fin: 2.57 }] }
  const cuerpo = { duracion_s: 10, inicio_voz_s: 0.24, palabras: [{ texto: 'Cuando', inicio: 0, fin: 0.4 }] }
  const u = unirVoces({ hook, cuerpo, pausa: 0.85 })
  assert.equal(u.corte_s, 2.47)
  assert.equal(u.desplazamiento_s, 2.96)
})

test('unirVoces arranca el hook donde empieza la voz: el reel no abre con silencio', () => {
  const hook = { duracion_s: 2.9, inicio_voz_s: 0.31, fin_voz_s: 2.62, palabras: [{ texto: 'Tu', inicio: 0.31, fin: 0.5 }, { texto: 'cargar', inicio: 2.1, fin: 2.62 }] }
  const cuerpo = { duracion_s: 10, inicio_voz_s: 0.1, palabras: [{ texto: 'Cuando', inicio: 0.1, fin: 0.4 }] }
  const u = unirVoces({ hook, cuerpo, pausa: 0.85 })
  assert.equal(u.inicio_s, 0.28)
  assert.equal(u.corte_s, 2.74)
  assert.equal(u.desplazamiento_s, 3.09)
  assert.deepEqual(u.palabras[0], { texto: 'Tu', inicio_s: 0.03, fin_s: 0.22 })
  assert.deepEqual(u.palabras[2], { texto: 'Cuando', inicio_s: 3.19, fin_s: 3.49 })
  assert.equal(u.duracion_s, 13.09)
})

test('bordesDeVoz lee el silencio del principio y del final en la salida de silencedetect', () => {
  const log = [
    '[silencedetect] silence_start: 0',
    '[silencedetect] silence_end: 0.24 | silence_duration: 0.24',
    '[silencedetect] silence_start: 1.1',
    '[silencedetect] silence_end: 1.4 | silence_duration: 0.3',
    '[silencedetect] silence_start: 2.351',
  ].join('\n')
  assert.deepEqual(bordesDeVoz(log, 2.57), { inicio_voz_s: 0.24, fin_voz_s: 2.351 })
  const cola = ['[silencedetect] silence_start: 2.3', '[silencedetect] silence_end: 2.57 | silence_duration: 0.27'].join('\n')
  assert.deepEqual(bordesDeVoz(cola, 2.57), { inicio_voz_s: 0, fin_voz_s: 2.3 })
  assert.deepEqual(bordesDeVoz('', 3), { inicio_voz_s: 0, fin_voz_s: 3 })
})

test('ordenAtomos lee los átomos de primer nivel del mp4 (moov antes que mdat = faststart)', () => {
  const atomo = (/** @type {string} */ tipo, /** @type {number} */ largo) => {
    const b = Buffer.alloc(largo)
    b.writeUInt32BE(largo, 0)
    b.write(tipo, 4, 'latin1')
    return b
  }
  assert.deepEqual(ordenAtomos(Buffer.concat([atomo('ftyp', 24), atomo('moov', 40), atomo('mdat', 16)])), ['ftyp', 'moov', 'mdat'])
  assert.deepEqual(ordenAtomos(Buffer.concat([atomo('ftyp', 24), atomo('mdat', 16)])), ['ftyp', 'mdat'])
})

test('revisarSalida pide lo que Meta exige', () => {
  const bien = { duracion: 24.0, bytes: 9e6, formato: 'mov,mp4,m4a,3gp,3g2,mj2', atomos: ['ftyp', 'moov', 'mdat'],
    video: { codec: 'h264', ancho: 1080, alto: 1920, fps: 30, pix_fmt: 'yuv420p', bitrate: 3e6 }, audio: { codec: 'aac', frecuencia: 48000, canales: 2, bitrate: 128000 } }
  assert.deepEqual(revisarSalida(bien, { duracion_s: 24.1 }), [])
  assert.ok(revisarSalida({ ...bien, audio: null }, { duracion_s: 24 }).some((p) => /audio/.test(p)))
  assert.ok(revisarSalida({ ...bien, video: { ...bien.video, ancho: 720 } }, { duracion_s: 24 }).some((p) => /1080/.test(p)))
  assert.ok(revisarSalida({ ...bien, bytes: 16 * 1024 * 1024 }, { duracion_s: 24 }).some((p) => /MB/.test(p)))
  assert.ok(revisarSalida({ ...bien, atomos: ['ftyp', 'mdat', 'moov'] }, { duracion_s: 24 }).some((p) => /faststart/.test(p)))
  assert.ok(revisarSalida(bien, { duracion_s: 26 }).some((p) => /dura/.test(p)))
  assert.ok(revisarSalida({ ...bien, video: { ...bien.video, pix_fmt: 'yuv444p' } }, { duracion_s: 24 }).some((p) => /4:2:0/.test(p)))
})

test('fusionarEstado: por creativo y por variante gana lo que cambió esta corrida', () => {
  const base = estadoVacio(new Date('2026-11-09T00:00:00Z'))
  base.creativos['2026-11-09-a'] = creativo([variante('v01', '2026-11-09T12:10:00.000Z'), variante('v02', '2026-11-09T13:10:00.000Z')])
  const remoto = structuredClone(base)
  remoto.creativos['2026-11-08-z'] = creativo([], { fecha: '2026-11-08' })
  const r0 = /** @type {any} */ (remoto.creativos['2026-11-09-a']?.variantes[0])
  r0.metricas = { likes: 4 }
  remoto.insights = { disponible: true, motivo: null }
  const propio = structuredClone(base)
  const p1 = /** @type {any} */ (propio.creativos['2026-11-09-a']?.variantes[1])
  p1.ig_media_id = '777'
  propio.pausado = 'token vencido'
  propio.actualizado = '2026-11-09T16:00:00.000Z'
  const f = fusionarEstado(base, remoto, propio)
  assert.ok(f.creativos['2026-11-08-z'])
  const vs = /** @type {any[]} */ (f.creativos['2026-11-09-a']?.variantes)
  assert.deepEqual(vs[0].metricas, { likes: 4 })
  assert.equal(vs[1].ig_media_id, '777')
  assert.equal(f.pausado, 'token vencido')
  assert.deepEqual(f.insights, { disponible: true, motivo: null })
  assert.equal(f.actualizado, '2026-11-09T16:00:00.000Z')
})

test('reel real: desde las 19, el creativo más nuevo de un día anterior con su prueba de mejor puntaje', () => {
  /** @type {any} */
  const e = estadoVacio(new Date('2026-11-10T08:00:00Z'))
  const prueba = (/** @type {string} */ id, /** @type {any} */ m) => ({ id, video_url: `https://b/${id}.mp4`, caption: `cuerpo ${id}

#a #b #c #d #e

${CTA_CAPTION}`, ig_media_id: `m-${id}`, publicado_at: '2026-11-09T15:00:00.000Z', metricas: m })
  const metricas = (/** @type {number} */ likes, /** @type {number} */ comentarios_web = 0) => ({ likes, comentarios: comentarios_web, comentarios_web })
  e.creativos['2026-11-08-a'] = { fecha: '2026-11-08', variantes: [prueba('v01', metricas(9)), prueba('v02', metricas(1)), prueba('v03', metricas(1))] }
  e.creativos['2026-11-09-b'] = { fecha: '2026-11-09', variantes: [prueba('v01', metricas(5)), prueba('v02', metricas(0, 1)), prueba('v03', metricas(2))] }
  e.creativos['2026-11-10-c'] = { fecha: '2026-11-10', variantes: [prueba('v01', metricas(50)), prueba('v02', null), prueba('v03', null)] }
  assert.equal(realPendiente(e, new Date('2026-11-10T21:59:00Z')), null, 'antes de las 19')
  // Un comentario WEB pesa más que 5 likes; el de hoy todavía no se gradúa.
  assert.deepEqual(realPendiente(e, new Date('2026-11-10T22:17:00Z')), { creativo: '2026-11-09-b', variante: 'v02' })
  e.creativos['2026-11-09-b'].real = { variante: 'v02', publicado_at: '2026-11-10T22:20:00.000Z', intentos: 0 }
  assert.equal(realPendiente(e, new Date('2026-11-11T00:47:00Z')), null, 'uno por día')
  assert.deepEqual(realPendiente(e, new Date('2026-11-11T22:17:00Z')), { creativo: '2026-11-10-c', variante: 'v01' })
  assert.ok(puntaje(null) === 0)
})

test('reel real: su caption nunca es el de una prueba', () => {
  const de = `cuerpo

#a #b #c #d #e #f

${CTA_CAPTION}`
  assert.equal(captionReal(de), `cuerpo

#a #b #c

${CTA_CAPTION}`)
  assert.notEqual(captionReal('suelto'), 'suelto')
})
