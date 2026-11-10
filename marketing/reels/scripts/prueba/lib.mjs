// @ts-check
import { basename } from 'node:path'
import { sinEmojis } from '../reel/lib.mjs'

/* ---------------------------------------------------------------------------
   Lo puro de los reels de prueba (contrato: marketing/reels/scripts/prueba/CONTRATO.md):
   el estado que lee Kairo, qué guion toca, la matriz de variaciones, los
   captions, la agenda del día, el cupo de Meta, qué publicar y cómo leer
   lo que vuelve. Sin IO: lo prueba marketing/reels/scripts/prueba/lib.test.mjs.
--------------------------------------------------------------------------- */

export const ZONA = 'America/Argentina/Buenos_Aires'
// En minutos desde la medianoche de Buenos Aires. Termina 2 minutos antes del último tic de publicación.
export const FRANJA = { desde_min: 9 * 60, hasta_min: 22 * 60 + 45 }
// Los tics de publicación de .github/workflows/reels-prueba.yml en minutos de Buenos Aires (lo prueba workflow.test.mjs):
// la agenda no pone en un tramo más de lo que su tic publica, y lo que no entra en el último se descartaría.
export const TICS_PUBLICAR = [9 * 60 + 17, 11 * 60 + 17, 13 * 60 + 17, 15 * 60 + 17, 17 * 60 + 17, 19 * 60 + 17, 21 * 60 + 17, 22 * 60 + 47]
// Después de esto la producción automática espera a mañana: 30 variantes no entran bien en lo que queda del día.
export const ULTIMA_HORA_PRODUCIR = 21
// El cierre de todos los captions. La voz del cierre (cta/generar-voz.mjs) dice lo mismo con "punto ar".
export const CTA_CAPTION = 'Hacé la cuenta con tus números, gratis, en calcular.ar'
// Lo que queda siempre libre del cupo de 100 por 24 h de Meta para lo que se publique a mano en la cuenta.
export const RESERVA_CUENTA = 5
export const MAX_INTENTOS = 3
// El techo real lo pone el antispam de Meta, no el cupo de 100: el 9 y el 10/11 contestó 9/2207078
// ("User is performing too many actions") después de 8 a 11 publicadas en pocas horas, con el cupo en 11.
// 12 por día de a 2 por tic (8 tics) entran sin ráfagas; 30 nunca salieron.
export const POR_DIA = 12
// Tope por corrida: nunca ráfagas (8 seguidas en 6 min el 9/11 dispararon el 2207078 al tic siguiente).
export const MAX_POR_CORRIDA = 2
// El reel real del día: la mejor prueba de un creativo anterior, a la pestaña Reels de los seguidores.
// Desde el tic de las 19:17, la mejor hora de la cuenta, y una sola vez por día.
export const HORA_REAL_MIN = 19 * 60
export const MIN_PUBLICADAS_REAL = 3
export const TOPE_MB = 15
export const DIAS_MEDIR = 14
export const CLAVE = /^[a-z0-9]+(-[a-z0-9]+)*$/
export const PALETAS = ['papel', 'selva', 'noche', 'menta', 'pizarra']
export const CATEGORIAS = ['comedia', 'tecnico', 'negocio', 'mito']
export const FORMATOS = ['chat', 'mito', 'explicador']
export const EJES = {
  hook: [0, 1, 2],
  zoom: [1, 1.03, 1.06, 1.09, 1.12],
  encuadre: ['centro', 'arriba', 'abajo'],
  velocidad: [0.96, 0.98, 1, 1.02, 1.04],
  color: ['neutro', 'calido', 'frio', 'contraste', 'mate'],
  textura: ['nada', 'grano', 'vineta'],
}

/**
 * @typedef {{ hook: number, zoom: number, encuadre: string, velocidad: number, color: string, musica: string, cierre: string, textura: string }} Cambios
 * @typedef {{ medido_at: string, vistas: number | null, alcance: number | null, likes: number | null, comentarios: number | null,
 *   compartidos: number | null, guardados: number | null, comentarios_web: number | null, promedio_visto_s: number | null }} Metricas
 * @typedef {{ id: string, cambios: Cambios, resumen: string, video_url: string | null, duracion_s: number, caption: string, publicar_at: string,
 *   ig_media_id: string | null, permalink: string | null, publicado_at: string | null, error_publicar: string | null, intentos_publicar: number,
 *   metricas: Metricas | null, ig_container_id?: string | null, descartada_at?: string | null }} Variante
 * @typedef {{ variante: string, caption: string, ig_container_id: string | null, ig_media_id: string | null, permalink: string | null,
 *   publicado_at: string | null, error: string | null, intentos: number }} Real
 * @typedef {{ clave: string, fecha: string, titulo: string, categoria: string, formato: string, paleta: string, producido_at: string | null,
 *   error: string | null, falla?: 'guion' | 'general', intentos: number, variantes: Variante[], real?: Real }} Creativo
 * @typedef {{ version: 1, actualizado: string, pausado: string | null, pausado_por?: string | null, fallas_seguidas?: number, insights: { disponible: boolean, motivo: string | null },
 *   saltados: Record<string, { motivo: string, at: string }>, creativos: Record<string, Creativo> }} Estado
 * @typedef {{ archivo: string, guion: any, problemas: string[] }} GuionLeido
 */

/* ── Hora de Buenos Aires ───────────────────────────────────────────────── */

const FORMATO_DIA = new Intl.DateTimeFormat('en-CA', { timeZone: ZONA, year: 'numeric', month: '2-digit', day: '2-digit' })
const FORMATO_PARTES = new Intl.DateTimeFormat('en-US', { timeZone: ZONA, hourCycle: 'h23', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })

/** @param {Date} fecha */
function partes(fecha) {
  const p = Object.fromEntries(FORMATO_PARTES.formatToParts(fecha).map((x) => [x.type, Number(x.value)]))
  return { anio: p.year ?? 0, mes: p.month ?? 0, dia: p.day ?? 0, hora: p.hour ?? 0, minuto: p.minute ?? 0, segundo: p.second ?? 0 }
}

/** YYYY-MM-DD en Buenos Aires. @param {Date | string | number} fecha */
export const diaAR = (fecha) => FORMATO_DIA.format(new Date(fecha))

/** Minutos desde la medianoche de Buenos Aires. @param {Date} fecha */
export function minutoAR(fecha) {
  const p = partes(fecha)
  return p.hora * 60 + p.minuto
}

/** @param {string} dia */
export function diaSiguiente(dia) {
  const [anio = 0, mes = 1, numero = 1] = dia.split('-').map(Number)
  return new Date(Date.UTC(anio, mes - 1, numero + 1)).toISOString().slice(0, 10)
}

/** @param {number} instante */
function desfase(instante) {
  const p = partes(new Date(instante))
  return Date.UTC(p.anio, p.mes - 1, p.dia, p.hora, p.minuto, p.segundo) - instante
}

/** El instante de `minutos` después de la medianoche de `dia` en Buenos Aires. @param {string} dia @param {number} minutos */
export function instanteAR(dia, minutos) {
  const [anio = 0, mes = 1, numero = 1] = dia.split('-').map(Number)
  const local = Date.UTC(anio, mes - 1, numero, 0, minutos)
  // Dos pasadas por si algún día Argentina vuelve a tener horario de verano.
  return new Date(local - desfase(local - desfase(local)))
}

/* ── Azar determinístico ────────────────────────────────────────────────── */

/** @param {string} semilla @returns {() => number} en [0, 1) */
export function azar(semilla) {
  let h = 2166136261
  for (const c of semilla) h = Math.imul(h ^ (c.codePointAt(0) ?? 0), 16777619)
  return () => {
    h = (h + 0x6d2b79f5) | 0
    let t = Math.imul(h ^ (h >>> 15), 1 | h)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** @template T @param {T[]} lista @param {() => number} rnd @returns {T[]} */
export function mezclar(lista, rnd) {
  const a = [...lista]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1))
    ;[a[i], a[j]] = [/** @type {T} */ (a[j]), /** @type {T} */ (a[i])]
  }
  return a
}

/** @param {number} x */
const r3 = (x) => Math.round(x * 1000) / 1000

/* ── Estado (marketing/reels/estado.json) ──────────────────────────────────── */

/** @param {Date} [ahora] @returns {Estado} */
export function estadoVacio(ahora = new Date()) {
  return { version: 1, actualizado: ahora.toISOString(), pausado: null, insights: { disponible: false, motivo: 'todavía no se probó' }, saltados: {}, creativos: {} }
}

/**
 * Un estado roto tira en vez de arrancar de cero: con el estado perdido se
 * volverían a publicar variantes que ya salieron.
 * @param {string | null | undefined} texto @returns {Estado}
 */
export function leerEstado(texto) {
  if (!texto || !texto.trim()) return estadoVacio()
  const d = JSON.parse(texto)
  if (!d || typeof d !== 'object' || Array.isArray(d)) throw new Error('marketing/reels/estado.json no es un objeto')
  if (d.version !== 1) throw new Error(`marketing/reels/estado.json tiene version ${d.version}`)
  if (d.creativos !== undefined && (typeof d.creativos !== 'object' || Array.isArray(d.creativos))) throw new Error('creativos no es un objeto')
  const vacio = estadoVacio()
  return {
    ...d,
    version: 1,
    actualizado: typeof d.actualizado === 'string' ? d.actualizado : vacio.actualizado,
    pausado: typeof d.pausado === 'string' && d.pausado.trim() ? d.pausado : null,
    insights: d.insights && typeof d.insights === 'object' ? d.insights : vacio.insights,
    saltados: d.saltados && typeof d.saltados === 'object' ? d.saltados : {},
    creativos: d.creativos ?? {},
  }
}

/** Orden estable: dos corridas con lo mismo escriben el mismo archivo. @param {Estado} e */
export function serializarEstado(e) {
  const { version, actualizado, pausado, pausado_por, insights, saltados, creativos, ...resto } = e
  /** @type {Record<string, unknown>} */
  const salida = { version, actualizado, pausado }
  if (pausado && pausado_por) salida.pausado_por = pausado_por
  salida.insights = insights
  salida.saltados = Object.fromEntries(Object.keys(saltados ?? {}).sort().map((k) => [k, saltados[k]]))
  Object.assign(salida, resto)
  salida.creativos = Object.fromEntries(Object.keys(creativos).sort().map((k) => [k, creativos[k]]))
  return `${JSON.stringify(salida, null, 2)}\n`
}

/** @param {unknown} a @param {unknown} b */
const igual = (a, b) => JSON.stringify(a) === JSON.stringify(b)

/** Tres vías: si esta corrida no lo tocó respecto de su base, vale lo de main. @param {any} base @param {any} remoto @param {any} propio */
const tres = (base, remoto, propio) => (igual(base, propio) ? remoto : propio)

/** @param {Creativo} base @param {Creativo} remoto @param {Creativo} propio @returns {Creativo} */
function fusionarCreativo(base, remoto, propio) {
  /** @type {any} */
  const salida = {}
  for (const k of new Set([...Object.keys(remoto), ...Object.keys(propio)])) {
    if (k !== 'variantes') {
      const v = tres(/** @type {any} */ (base)[k], /** @type {any} */ (remoto)[k], /** @type {any} */ (propio)[k])
      if (v !== undefined) salida[k] = v
    }
  }
  const porId = (/** @type {Variante[]} */ vs) => new Map((vs ?? []).map((v) => [v.id, v]))
  const b = porId(base.variantes)
  const r = porId(remoto.variantes)
  const p = porId(propio.variantes)
  /** @type {Variante[]} */
  const variantes = []
  for (const id of new Set([...p.keys(), ...r.keys()])) {
    const v = tres(b.get(id), r.get(id), p.get(id))
    if (v) variantes.push(v)
  }
  salida.variantes = variantes
  return salida
}

/**
 * Choque de marketing/reels/estado.json en un rebase: por creativo, y adentro
 * por variante, gana lo que esta corrida cambió respecto de su base; el
 * resto viene de main.
 * @param {Estado} base @param {Estado} remoto @param {Estado} propio @returns {Estado}
 */
export function fusionarEstado(base, remoto, propio) {
  /** @type {any} */
  const salida = {}
  for (const k of new Set([...Object.keys(remoto), ...Object.keys(propio)])) {
    if (k === 'creativos' || k === 'actualizado') continue
    const v = tres(/** @type {any} */ (base)[k], /** @type {any} */ (remoto)[k], /** @type {any} */ (propio)[k])
    if (v !== undefined) salida[k] = v
  }
  salida.actualizado = [remoto.actualizado, propio.actualizado].filter(Boolean).sort().pop() ?? new Date().toISOString()
  /** @type {Record<string, Creativo>} */
  const creativos = {}
  const bc = base.creativos ?? {}
  const rc = remoto.creativos ?? {}
  const pc = propio.creativos ?? {}
  for (const k of new Set([...Object.keys(rc), ...Object.keys(pc), ...Object.keys(bc)])) {
    const [b, r, p] = [bc[k], rc[k], pc[k]]
    /** @type {Creativo | undefined} */
    let v
    if (igual(b, p)) v = r
    else if (!p) v = undefined
    else if (!r || !b) v = p
    else v = fusionarCreativo(b, r, p)
    if (v) creativos[k] = v
  }
  salida.creativos = creativos
  return /** @type {Estado} */ (salida)
}

/* ── El guion del día ───────────────────────────────────────────────────── */

/** @param {string} t */
const contarPalabras = (t) => t.split(/\s+/).filter((p) => /[\p{L}\p{N}]/u.test(p)).length

/**
 * Lo que el pipeline necesita del guion (el formato revisa además su `contenido` con su `validar()`).
 * @param {any} g @param {string} archivo @returns {string[]}
 */
export function revisarGuion(g, archivo) {
  if (!g || typeof g !== 'object' || Array.isArray(g)) return ['no es un objeto']
  /** @type {string[]} */
  const p = []
  if (g.version !== 1) p.push('version tiene que ser 1')
  if (typeof g.clave !== 'string' || !CLAVE.test(g.clave)) p.push('clave inválida')
  else if (basename(archivo) !== `${g.clave}.json`) p.push(`el archivo se tiene que llamar ${g.clave}.json`)
  if (typeof g.titulo !== 'string' || !g.titulo.trim() || g.titulo.length > 60) p.push('titulo vacío o de más de 60')
  if (!CATEGORIAS.includes(g.categoria)) p.push(`categoria tiene que ser ${CATEGORIAS.join(' | ')}`)
  if (!FORMATOS.includes(g.formato)) p.push(`formato tiene que ser ${FORMATOS.join(' | ')}`)
  if (!PALETAS.includes(g.paleta)) p.push(`paleta tiene que ser ${PALETAS.join(' | ')}`)
  if (!Array.isArray(g.hooks) || g.hooks.length !== 3 || g.hooks.some((/** @type {unknown} */ h) => typeof h !== 'string' || !h.trim() || contarPalabras(h) > 8)) p.push('hooks: exactamente 3, de 8 palabras o menos')
  if (g.formato === 'chat') {
    if (g.voz !== null) p.push('voz tiene que ser null en chat')
  } else if (typeof g.voz !== 'string' || contarPalabras(g.voz) < 25 || contarPalabras(g.voz) > 55) p.push('voz: de 25 a 55 palabras')
  if (!g.contenido || typeof g.contenido !== 'object') p.push('falta contenido')
  const caps = g.captions
  if (!Array.isArray(caps) || caps.length < 3 || caps.length > 5 || caps.some((/** @type {unknown} */ c) => typeof c !== 'string' || !c.trim() || c.length > 300) || new Set(caps).size !== caps.length)
    p.push('captions: de 3 a 5 distintos, de 300 caracteres o menos')
  const tags = g.hashtags
  if (!Array.isArray(tags) || tags.length < 8 || tags.length > 15 || tags.some((/** @type {unknown} */ t) => typeof t !== 'string' || !/^[\p{Ll}\p{N}_]+$/u.test(t)) || new Set(tags).size !== tags.length)
    p.push('hashtags: de 8 a 15 distintos, en minúscula, sin # ni espacios')
  // Rigor YMYL de calcular: todo dato laboral o fiscal sale de una norma o un organismo oficial,
  // con la fecha en que se leyó. Un guion sin fuente no se publica.
  const fuentes = g.fuentes
  if (!Array.isArray(fuentes) || fuentes.length < 1 || fuentes.length > 4) p.push('fuentes: de 1 a 4, cada una { nombre, url, consultado }')
  else
    fuentes.forEach((/** @type {any} */ f, /** @type {number} */ i) => {
      if (!f || typeof f.nombre !== 'string' || !f.nombre.trim()) p.push(`fuentes[${i}].nombre vacío`)
      let host = ''
      try {
        host = new URL(String(f?.url)).hostname
      } catch {
        /* queda vacío */
      }
      if (!/(^|\.)gob\.ar$/.test(host)) p.push(`fuentes[${i}].url tiene que ser de un sitio oficial (.gob.ar)`)
      if (typeof f?.consultado !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(f.consultado)) p.push(`fuentes[${i}].consultado: AAAA-MM-DD`)
    })
  return p
}

/** La categoría del último creativo producido antes de hoy. @param {Estado} estado @param {string} hoy */
function categoriaAnterior(estado, hoy) {
  const previos = Object.values(estado.creativos)
    .filter((c) => c.producido_at && c.fecha < hoy)
    .sort((a, b) => (a.fecha === b.fecha ? String(a.producido_at).localeCompare(String(b.producido_at)) : a.fecha.localeCompare(b.fecha)))
  return previos.at(-1)?.categoria ?? null
}

/**
 * Los guiones que ya no vuelven: los producidos y los que fallaron por el guion
 * (su formato no lo pudo armar). Lo que falló por algo general (Blob, la voz, un
 * render colgado) no quema el guion.
 * @param {Estado} estado
 */
export function guionesUsados(estado) {
  return new Set(Object.values(estado.creativos).filter((c) => c.producido_at || c.falla === 'guion').map((c) => c.clave))
}

/** Días en que el guion falló sin producirse. @param {Estado} estado @param {string} clave */
const diasFallidos = (estado, clave) => new Set(Object.values(estado.creativos).filter((c) => c.clave === clave && !c.producido_at && c.error).map((c) => c.fecha)).size

/**
 * El próximo guion disponible, por nombre de archivo, sin repetir la categoría
 * del día anterior si hay otra. Lo inválido se saltea y se anota. Uno que ya
 * falló dos días por algo general va al final: si en realidad es él el que
 * rompe, no traba el banco; si no queda otro, vuelve igual.
 * @param {{ guiones: GuionLeido[], estado: Estado, hoy: string, excluir?: Set<string> }} p
 * @returns {{ elegido: GuionLeido | null, saltados: { clave: string, motivo: string }[] }}
 */
export function elegirGuion({ guiones, estado, hoy, excluir = new Set() }) {
  const usadas = guionesUsados(estado)
  /** @type {{ clave: string, motivo: string }[]} */
  const saltados = []
  /** @type {GuionLeido[]} */
  const frescos = []
  /** @type {GuionLeido[]} */
  const relegados = []
  for (const g of [...guiones].sort((a, b) => (a.archivo < b.archivo ? -1 : a.archivo > b.archivo ? 1 : 0))) {
    const clave = typeof g.guion?.clave === 'string' ? g.guion.clave : basename(g.archivo, '.json')
    if (usadas.has(clave) || excluir.has(clave)) continue
    if (g.problemas.length) {
      saltados.push({ clave, motivo: g.problemas.join('; ') })
      continue
    }
    if (diasFallidos(estado, clave) >= 2) relegados.push(g)
    else frescos.push(g)
  }
  const candidatos = [...frescos, ...relegados]
  const anterior = categoriaAnterior(estado, hoy)
  return { elegido: candidatos.find((g) => g.guion.categoria !== anterior) ?? candidatos[0] ?? null, saltados }
}

/** @param {Variante} v */
const pendiente = (v) => !v.ig_media_id && !v.publicado_at && !v.descartada_at && (v.intentos_publicar ?? 0) < MAX_INTENTOS

/**
 * Un creativo por día. Lo que falló se reintenta (hasta MAX_INTENTOS) en las
 * corridas siguientes del mismo día; después de ULTIMA_HORA_PRODUCIR espera a mañana.
 * @param {Estado} estado @param {Date} ahora @param {{ forzado?: boolean }} [o]
 * @returns {{ producir: boolean, motivo: string, reintentar?: string }}
 */
export function debeProducir(estado, ahora, { forzado = false } = {}) {
  if (forzado) return { producir: true, motivo: 'pedido a mano' }
  // Producir no usa Instagram: con la pausa por token se sigue produciendo, y cuando el token vuelve, sale.
  if (estado.pausado && estado.pausado_por !== 'token') return { producir: false, motivo: `pausado: ${estado.pausado}` }
  const hoy = diaAR(ahora)
  const deHoy = Object.entries(estado.creativos).filter(([, c]) => c.fecha === hoy)
  const hecho = deHoy.find(([, c]) => c.producido_at)
  if (hecho) return { producir: false, motivo: `el creativo de hoy ya está (${hecho[0]})` }
  const sale = Object.entries(estado.creativos).find(([, c]) => c.variantes?.some((v) => pendiente(v) && v.publicar_at && diaAR(v.publicar_at) === hoy))
  if (sale) return { producir: false, motivo: `hoy salen las variantes de ${sale[0]}` }
  if (minutoAR(ahora) >= ULTIMA_HORA_PRODUCIR * 60) return { producir: false, motivo: `después de las ${ULTIMA_HORA_PRODUCIR} se produce mañana` }
  const fallido = deHoy.find(([, c]) => c.error)
  if (fallido) {
    const [k, c] = fallido
    if ((c.intentos ?? 0) >= MAX_INTENTOS) return { producir: false, motivo: `${k} falló ${c.intentos} veces: mañana sigue el banco${c.falla === 'guion' ? ' sin ese guion' : ' (el guion no se quema)'}` }
    return { producir: true, motivo: `reintento ${(c.intentos ?? 0) + 1} de ${MAX_INTENTOS} de ${k}`, reintentar: c.clave }
  }
  return { producir: true, motivo: 'no hay creativo hoy' }
}

/* ── Variaciones ────────────────────────────────────────────────────────── */

/**
 * El tamaño al que se escala el cuerpo y dónde se recorta. El recorte vertical
 * queda siempre adentro de la zona segura de Reels (220 px arriba, 420 abajo):
 * con 1,12 se pierden 230 px en total y el encuadre nunca los saca de un solo lado.
 * @param {number} zoom @param {string} encuadre
 */
export function ventanaZoom(zoom, encuadre) {
  const ancho = Math.round((1080 * zoom) / 2) * 2
  const alto = Math.round((1920 * zoom) / 2) * 2
  const f = encuadre === 'arriba' ? 0.2 : encuadre === 'abajo' ? 0.8 : 0.5
  return { ancho, alto, x: Math.floor((ancho - 1080) / 4) * 2, y: Math.floor(((alto - 1920) * f) / 2) * 2 }
}

const COMPARADOS = /** @type {const} */ (['hook', 'zoom', 'encuadre', 'velocidad', 'color', 'musica', 'cierre', 'textura'])

/** En cuántos ejes difieren dos variantes. @param {Cambios} a @param {Cambios} b */
export const distancia = (a, b) => COMPARADOS.filter((k) => a[k] !== b[k]).length

// Dos variantes que difieren en un solo eje son casi la misma: se separan en al menos dos.
const DISTANCIA_MINIMA = 2

/**
 * N combinaciones distintas entre sí (y a dos ejes o más de cualquier otra),
 * cada eje repartido parejo. El encuadre sólo cuenta con zoom: sin zoom es
 * siempre 'centro'. Depende sólo de la semilla.
 * @param {{ n: number, semilla: string, musicas: string[], clips: { id: string, paleta: string, estilo: string }[], paleta: string }} p
 * @returns {Cambios[]}
 */
export function matrizVariantes({ n, semilla, musicas, clips, paleta }) {
  if (!musicas.length) throw new Error('no hay música')
  const propios = clips.filter((c) => c.paleta === paleta)
  const cierres = (propios.length ? propios : clips).slice().sort((a, b) => a.estilo.localeCompare(b.estilo) || a.id.localeCompare(b.id)).map((c) => c.id)
  if (!cierres.length) throw new Error('no hay clips de cierre')
  const rnd = azar(`variantes:${semilla}`)
  /** @template T @param {readonly T[]} valores @param {number} [largo] */
  const parejo = (valores, largo = n) => mezclar(Array.from({ length: largo }, (_, i) => /** @type {T} */ (valores[i % valores.length])), rnd)
  const hooks = parejo(EJES.hook)
  const zooms = parejo(EJES.zoom)
  const encuadres = parejo(EJES.encuadre, zooms.filter((z) => z > 1).length)
  const velocidades = parejo(EJES.velocidad)
  const colores = parejo(EJES.color)
  const pistas = parejo(musicas)
  const finales = parejo(cierres)
  const texturas = parejo(EJES.textura)
  let k = 0
  /** @type {Cambios[]} */
  const filas = zooms.map((zoom, i) => ({
    hook: /** @type {number} */ (hooks[i]),
    zoom,
    encuadre: zoom > 1 ? /** @type {string} */ (encuadres[k++]) : 'centro',
    velocidad: /** @type {number} */ (velocidades[i]),
    color: /** @type {string} */ (colores[i]),
    musica: /** @type {string} */ (pistas[i]),
    cierre: /** @type {string} */ (finales[i]),
    textura: /** @type {string} */ (texturas[i]),
  }))
  separar(filas, rnd)
  return filas
}

/**
 * Intercambia valores de un eje entre dos filas (lo que mantiene el reparto
 * parejo) hasta que ningún par quede a menos de DISTANCIA_MINIMA. El zoom no
 * se toca: el encuadre se reparte entre las filas con zoom.
 * @param {Cambios[]} filas @param {() => number} rnd
 */
function separar(filas, rnd) {
  const ejes = /** @type {const} */ (['hook', 'encuadre', 'velocidad', 'color', 'musica', 'cierre', 'textura'])
  const deuda = (/** @type {number} */ i) => {
    let d = 0
    const f = /** @type {Cambios} */ (filas[i])
    for (let j = 0; j < filas.length; j++) if (j !== i) d += Math.max(0, DISTANCIA_MINIMA - distancia(f, /** @type {Cambios} */ (filas[j])))
    return d
  }
  for (let vuelta = 0; vuelta < 40_000; vuelta++) {
    let peor = -1
    for (let i = 0; i < filas.length && peor < 0; i++) if (deuda(i) > 0) peor = i
    if (peor < 0) return
    const eje = /** @type {(typeof ejes)[number]} */ (ejes[Math.floor(rnd() * ejes.length)])
    const a = /** @type {Cambios} */ (filas[peor])
    const otros = filas.map((_, l) => l).filter((l) => {
      const b = /** @type {Cambios} */ (filas[l])
      if (l === peor || b[eje] === a[eje]) return false
      return eje !== 'encuadre' || (a.zoom > 1 && b.zoom > 1)
    })
    if (!otros.length) continue
    const l = /** @type {number} */ (otros[Math.floor(rnd() * otros.length)])
    const b = /** @type {Cambios} */ (filas[l])
    const antes = deuda(peor) + deuda(l)
    ;[/** @type {any} */ (a)[eje], /** @type {any} */ (b)[eje]] = [b[eje], a[eje]]
    if (deuda(peor) + deuda(l) > antes) [/** @type {any} */ (a)[eje], /** @type {any} */ (b)[eje]] = [b[eje], a[eje]]
  }
  const claves = new Set(filas.map((f) => JSON.stringify(f)))
  if (claves.size !== filas.length) throw new Error(`no salieron ${filas.length} variantes distintas`)
}

const NOMBRE_COLOR = /** @type {Record<string, string>} */ ({ calido: 'cálido', frio: 'frío', contraste: 'contraste', mate: 'mate' })
const NOMBRE_TEXTURA = /** @type {Record<string, string>} */ ({ grano: 'grano', vineta: 'viñeta' })

/** @param {string} id */
const nombreMusica = (id) => id.replace(/^acustica/, 'acústica').replace(/^tech-house/, 'tech house').replace(/-(\d+)$/, ' $1')

/** Para Kairo, en criollo, 60 caracteres o menos: lo más visible primero. @param {Cambios} c */
export function resumenVariante(c) {
  const opcionales = [
    c.zoom > 1 ? `zoom ${Math.round((c.zoom - 1) * 100)} %${c.encuadre !== 'centro' ? ` ${c.encuadre}` : ''}` : null,
    NOMBRE_COLOR[c.color] ?? null,
    nombreMusica(c.musica),
    c.velocidad !== 1 ? `vel ${c.velocidad > 1 ? '+' : '−'}${Math.round(Math.abs(c.velocidad - 1) * 100)} %` : null,
    NOMBRE_TEXTURA[c.textura] ?? null,
    `cierre ${c.cierre.replace(new RegExp(`^(${PALETAS.join('|')})-`), '')}`,
  ]
  let texto = `gancho ${c.hook + 1}`
  for (const o of opcionales) if (o && texto.length + 3 + o.length <= 60) texto += ` · ${o}`
  return texto
}

/**
 * Un caption distinto por variante: el cuerpo rota, la ventana de hashtags
 * rota y cambia de largo, y siempre cierra con el llamado. (cuerpo, ventana)
 * no se repite hasta captions × hashtags × 3 variantes.
 * @param {{ guion: { clave?: string, captions: string[], hashtags: string[] }, n: number }} p @returns {string[]}
 */
export function armarCaptions({ guion: g, n }) {
  const cuerpos = g.captions.map((c) => sinEmojis(c).trim())
  const tags = g.hashtags
  const B = cuerpos.length
  const H = tags.length
  const rnd = azar(`captions:${g.clave ?? ''}`)
  /** @type {Set<string>} */
  const vistos = new Set()
  /** @type {string[]} */
  const salida = []
  for (let i = 0; i < n; i++) {
    const j = Math.floor(i / B)
    const s = j % H
    const largo = Math.min(H - 1, 5 + (Math.floor(j / H) % 3))
    let elegidos = Array.from({ length: largo }, (_, k) => /** @type {string} */ (tags[(s + k) % H]))
    const armar = () => sinEmojis(`${cuerpos[i % B]}\n\n${elegidos.map((t) => `#${t}`).join(' ')}\n\n${CTA_CAPTION}`).slice(-2200)
    let texto = armar()
    for (let vuelta = 0; vistos.has(texto) && vuelta < 50; vuelta++) {
      elegidos = mezclar(tags, rnd).slice(0, Math.max(4, largo - (vuelta % 2)))
      texto = armar()
    }
    if (vistos.has(texto)) throw new Error(`no salen ${n} captions distintos`)
    vistos.add(texto)
    salida.push(texto)
  }
  return salida
}

/**
 * Cuántos horarios le tocan a cada tramo: proporcional a su largo (resto mayor)
 * y nunca más de `tope`; lo que sobra va al tramo con más lugar.
 * @param {number} n @param {number[]} largos @param {number} tope
 */
function repartir(n, largos, tope) {
  const total = largos.reduce((a, b) => a + b, 0) || 1
  const exactos = largos.map((l) => (n * l) / total)
  const cuotas = exactos.map(Math.floor)
  const orden = exactos.map((x, i) => ({ resto: x - Math.floor(x), i })).sort((a, b) => b.resto - a.resto || a.i - b.i)
  const faltan = n - cuotas.reduce((a, b) => a + b, 0)
  for (let k = 0; k < faltan; k++) {
    const i = /** @type {{ i: number }} */ (orden[k % orden.length]).i
    cuotas[i] = (cuotas[i] ?? 0) + 1
  }
  for (let i = 0; i < cuotas.length; i++) {
    while ((cuotas[i] ?? 0) > tope) {
      let mejor = -1
      for (let j = 0; j < cuotas.length; j++) {
        if ((cuotas[j] ?? 0) >= tope) continue
        const lugar = (largos[j] ?? 0) / ((cuotas[j] ?? 0) + 1)
        if (mejor < 0 || lugar > (largos[mejor] ?? 0) / ((cuotas[mejor] ?? 0) + 1)) mejor = j
      }
      if (mejor < 0) break
      cuotas[i] = (cuotas[i] ?? 0) - 1
      cuotas[mejor] = (cuotas[mejor] ?? 0) + 1
    }
  }
  return cuotas
}

/**
 * Los horarios de publicación. La franja (desde ahora si ya empezó) se parte en
 * los tramos que vence cada tic de TICS_PUBLICAR: cada tramo recibe lo que le
 * toca por su largo, nunca más de lo que su tic publica (`max`), y en total no
 * más de lo que entra en los tics que quedan (lo que no sale hoy se descarta).
 * Dentro de su tramo, cada horario cae en un punto al azar de su lugar, nunca a
 * horario redondo. Si queda menos de una hora de franja, el día siguiente.
 * @param {{ n: number, ahora: Date, semilla: string, max?: number }} p @returns {{ dia: string, horarios: string[] }}
 */
export function agendar({ n, ahora, semilla, max = MAX_POR_CORRIDA }) {
  const rnd = azar(`agenda:${semilla}`)
  let dia = diaAR(ahora)
  let desde = Math.max(instanteAR(dia, FRANJA.desde_min).getTime(), ahora.getTime() + 10 * 60_000)
  if (instanteAR(dia, FRANJA.hasta_min).getTime() - desde < 60 * 60_000) {
    dia = diaSiguiente(dia)
    desde = instanteAR(dia, FRANJA.desde_min).getTime()
  }
  const hasta = instanteAR(dia, FRANJA.hasta_min).getTime()
  /** @type {[number, number][]} */
  const tramos = []
  let inicio = desde
  for (const m of TICS_PUBLICAR) {
    const fin = Math.min(instanteAR(dia, m).getTime(), hasta)
    if (fin <= inicio) continue
    tramos.push([inicio, fin])
    inicio = fin
  }
  const cuotas = repartir(Math.min(n, tramos.length * max), tramos.map(([a, b]) => b - a), max)
  /** @type {string[]} */
  const horarios = []
  tramos.forEach(([a, b], i) => {
    const k = cuotas[i] ?? 0
    const paso = (b - a) / Math.max(1, k)
    for (let j = 0; j < k; j++) {
      let t = Math.floor((a + paso * (j + 0.15 + 0.7 * rnd())) / 1000) * 1000
      if (new Date(t).getUTCSeconds() === 0) t += 7000
      horarios.push(new Date(t).toISOString())
    }
  })
  return { dia, horarios }
}

/* ── Meta ───────────────────────────────────────────────────────────────── */

/** La respuesta de /content_publishing_limit. @param {any} r @returns {{ total: number, usado: number } | null} */
export function leerCupo(r) {
  const d = r?.data?.[0]
  if (!d || typeof d.quota_usage !== 'number') return null
  return { total: Number(d.config?.quota_total ?? 100), usado: d.quota_usage }
}

/** @param {{ total: number, usado: number } | null} cupo @param {number} [reserva] */
export const cupoDisponible = (cupo, reserva = RESERVA_CUENTA) => (cupo ? Math.max(0, cupo.total - cupo.usado - reserva) : 0)

const DE_TOKEN = new Set([102, 190])
const DE_LIMITE = new Set([4, 9, 17, 32, 341, 613])
const SUB_LIMITE = new Set([2207042])
const SUB_BLOQUEO = new Set([2207050, 2207051])

/**
 * token/permiso/bloqueo → se pausa todo; limite → se frena hasta la próxima
 * corrida; transitorio → se reintenta sin contar; variante → cuenta intento.
 * @param {{ codigo?: number, subcodigo?: number, http?: number, transitorio?: boolean, message?: string }} e
 * @returns {'token' | 'permiso' | 'bloqueo' | 'limite' | 'transitorio' | 'variante'}
 */
export function clasificarErrorMeta(e) {
  const codigo = e.codigo
  const mensaje = String(e.message ?? '')
  if (codigo !== undefined && DE_TOKEN.has(codigo)) return 'token'
  if ((e.subcodigo !== undefined && SUB_BLOQUEO.has(e.subcodigo)) || codigo === 368 || /block|bloque|spam|restrict/i.test(mensaje)) return 'bloqueo'
  // "Media not ready": el contenedor todavía no terminó de procesarse; se reintenta sin culpar a la variante.
  if (codigo === 9007 || e.subcodigo === 2207027 || /not ready|not finished|no est[aá] list/i.test(mensaje)) return 'transitorio'
  if ((codigo !== undefined && DE_LIMITE.has(codigo)) || (e.subcodigo !== undefined && SUB_LIMITE.has(e.subcodigo))) return 'limite'
  // Una cuenta o app sin reels de prueba rechaza trial_params en todas las variantes: no vale gastar los intentos de cada una.
  if (codigo === 10 || (codigo !== undefined && codigo >= 200 && codigo <= 299) || /trial/i.test(mensaje)) return 'permiso'
  if (e.transitorio || (e.http ?? 0) >= 500 || codigo === 1 || codigo === 2) return 'transitorio'
  return 'variante'
}

/**
 * Lo que toca publicar: vencido, de hoy, nunca publicado, sin descartar y con
 * intentos. `ya`: la próxima de hoy aunque no haya vencido.
 * @param {Estado} estado @param {Date} ahora @param {{ max?: number, ya?: boolean }} [o]
 * @returns {{ creativo: string, id: string, publicar_at: string }[]}
 */
export function porPublicar(estado, ahora, { max = MAX_POR_CORRIDA, ya = false } = {}) {
  const hoy = diaAR(ahora)
  /** @type {{ creativo: string, id: string, publicar_at: string }[]} */
  const lista = []
  for (const [k, c] of Object.entries(estado.creativos)) {
    for (const v of c.variantes ?? []) {
      if (!pendiente(v) || !v.video_url || !v.caption || !v.publicar_at) continue
      // "Publicar ya" toma la próxima pendiente aunque esté agendada para mañana (producción tarde).
      if (ya ? diaAR(v.publicar_at) < hoy : diaAR(v.publicar_at) !== hoy) continue
      if (!ya && Date.parse(v.publicar_at) > ahora.getTime()) continue
      lista.push({ creativo: k, id: v.id, publicar_at: v.publicar_at })
    }
  }
  return lista.sort((a, b) => a.publicar_at.localeCompare(b.publicar_at)).slice(0, ya ? 1 : max)
}

/**
 * Cuánto rindió una prueba. comentarios_web queda null en calcular (el cierre lleva a la web, no a comentar); sin insights
 * (el token no tiene instagram_manage_insights) vistas y alcance son null y no suman.
 * @param {Metricas | null} m
 */
export function puntaje(m) {
  if (!m) return 0
  const n = (/** @type {number | null} */ x) => x ?? 0
  return n(m.comentarios_web) * 10 + n(m.comentarios) * 3 + n(m.guardados) * 4 + n(m.compartidos) * 4 + n(m.likes) + n(m.vistas) / 100
}

/**
 * El caption del reel real: el de la prueba con 3 hashtags en vez de 5 a 7. Tiene que ser distinto
 * de todos los de prueba porque la deduplicación busca por caption.
 * @param {string} caption
 */
export function captionReal(caption) {
  const partes = caption.split('\n\n')
  if (partes.length === 3 && /^#/.test(partes[1] ?? '')) return [partes[0], (partes[1] ?? '').split(' ').slice(0, 3).join(' '), partes[2]].join('\n\n')
  return `${caption.trim()}\n\n#calcularar`
}

/**
 * Qué creativo sale hoy como reel real y con qué variante, o null. Uno a medias (contenedor
 * creado, sin publicar) sigue primero; si no, el creativo más nuevo de un día anterior con al
 * menos MIN_PUBLICADAS_REAL pruebas publicadas y sin real, con su prueba de mejor puntaje.
 * @param {Estado} estado @param {Date} ahora @returns {{ creativo: string, variante: string } | null}
 */
export function realPendiente(estado, ahora) {
  if (minutoAR(ahora) < HORA_REAL_MIN) return null
  const hoy = diaAR(ahora)
  const creativos = Object.entries(estado.creativos)
  if (creativos.some(([, c]) => c.real?.publicado_at && diaAR(c.real.publicado_at) === hoy)) return null
  const aMedias = creativos.find(([, c]) => c.real && !c.real.publicado_at && c.real.intentos < MAX_INTENTOS)
  if (aMedias) return { creativo: aMedias[0], variante: /** @type {Real} */ (aMedias[1].real).variante }
  const candidatos = creativos
    .filter(([, c]) => !c.real && c.fecha < hoy && (c.variantes ?? []).filter((v) => v.ig_media_id && v.video_url).length >= MIN_PUBLICADAS_REAL)
    .sort((a, b) => b[1].fecha.localeCompare(a[1].fecha))
  const elegido = candidatos[0]
  if (!elegido) return null
  const mejor = (elegido[1].variantes ?? [])
    .filter((v) => v.ig_media_id && v.video_url)
    .sort((a, b) => puntaje(b.metricas) - puntaje(a.metricas) || String(a.publicado_at).localeCompare(String(b.publicado_at)))[0]
  return mejor ? { creativo: elegido[0], variante: mejor.id } : null
}

/**
 * Las que salieron en las últimas 48 h sin id de media: una corrida se cortó
 * entre media_publish y el estado, o el contenedor apareció PUBLISHED. El id se
 * toma de la media reciente por caption, para poder medirlas.
 * @param {Estado} estado @param {Date} ahora @returns {{ creativo: string, id: string }[]}
 */
export function publicadasSinId(estado, ahora) {
  const desde = ahora.getTime() - 48 * 3_600_000
  return Object.entries(estado.creativos).flatMap(([creativo, c]) =>
    (c.variantes ?? []).filter((v) => v.publicado_at && !v.ig_media_id && Date.parse(v.publicado_at) >= desde).map((v) => ({ creativo, id: v.id })),
  )
}

/**
 * Lo de un día anterior que no salió se descarta (no se acumula para mañana).
 * @param {Estado} estado @param {Date} ahora @returns {{ estado: Estado, descartadas: number }}
 */
export function descartarViejas(estado, ahora) {
  const hoy = diaAR(ahora)
  let descartadas = 0
  /** @type {Record<string, Creativo>} */
  const creativos = {}
  for (const [k, c] of Object.entries(estado.creativos)) {
    creativos[k] = {
      ...c,
      variantes: (c.variantes ?? []).map((v) => {
        if (v.ig_media_id || v.publicado_at || v.descartada_at || !v.publicar_at || diaAR(v.publicar_at) >= hoy) return v
        descartadas++
        return { ...v, descartada_at: ahora.toISOString(), error_publicar: `no salió el ${diaAR(v.publicar_at)}: se descarta` }
      }),
    }
  }
  return { estado: descartadas ? { ...estado, creativos } : estado, descartadas }
}

const WEB = /(?<![\p{L}\p{N}])web(?![\p{L}\p{N}])/iu

/** Comentarios que dicen WEB como palabra, sin los de la cuenta propia. @param {{ text?: string, username?: string }[]} comentarios @param {string | null} propio */
export const contarWeb = (comentarios, propio) =>
  comentarios.filter((c) => WEB.test(String(c.text ?? '')) && String(c.username ?? '').toLowerCase() !== String(propio ?? '').toLowerCase()).length

/** @param {unknown} v */
const numero = (v) => (typeof v === 'number' && Number.isFinite(v) ? v : null)

/**
 * Lo que Instagram no deja leer queda null, nunca 0.
 * @param {{ media: any, insights: Record<string, number> | null, comentarios_web: number | null, ahora: Date }} p @returns {Metricas}
 */
export function metricasDe({ media, insights, comentarios_web, ahora }) {
  const visto = numero(insights?.ig_reels_avg_watch_time)
  return {
    medido_at: ahora.toISOString(),
    vistas: numero(insights?.views),
    alcance: numero(insights?.reach),
    likes: numero(media?.like_count),
    comentarios: numero(media?.comments_count),
    compartidos: numero(insights?.shares),
    guardados: numero(insights?.saved),
    comentarios_web: comentarios_web ?? null,
    promedio_visto_s: visto === null ? null : Math.round(visto / 10) / 100,
  }
}

/* ── Voz y archivos ─────────────────────────────────────────────────────── */

/**
 * Hook + cuerpo locutados por separado (el cuerpo se paga una vez para los
 * tres hooks): dónde cortar el hook, dónde empieza el cuerpo para que entre
 * voz y voz se oiga `pausa`, y las palabras con los tiempos corridos.
 * `fin_voz_s` / `inicio_voz_s` (de silencedetect) mandan sobre las palabras:
 * con la voz de respaldo los tiempos salen de los silencios y se estiran
 * hasta el borde del archivo (el hueco quedaba en 1,3 s en vez de 0,85).
 * El hook arranca donde empieza su voz (`inicio_s` en el archivo del hook):
 * el reel no abre con silencio. `corte_s` también va en el tiempo del hook;
 * `desplazamiento_s` y las palabras, en el de la voz unida.
 * @param {{ hook: { duracion_s: number, inicio_voz_s?: number, fin_voz_s?: number, palabras: { texto: string, inicio: number, fin: number }[] },
 *   cuerpo: { duracion_s: number, inicio_voz_s?: number, palabras: { texto: string, inicio: number, fin: number }[] }, pausa: number }} p
 */
export function unirVoces({ hook, cuerpo, pausa }) {
  const inicio = r3(Math.max(0, Math.max(hook.palabras[0]?.inicio ?? 0, hook.inicio_voz_s ?? 0) - 0.03))
  const finHook = Math.min(hook.palabras.at(-1)?.fin ?? hook.duracion_s, hook.fin_voz_s ?? Infinity)
  const corte = r3(Math.min(hook.duracion_s, finHook + 0.12))
  const inicioCuerpo = Math.max(cuerpo.palabras[0]?.inicio ?? 0, cuerpo.inicio_voz_s ?? 0)
  const desplazamiento = r3(Math.max(corte - inicio + 0.05, finHook - inicio + pausa - inicioCuerpo))
  return {
    inicio_s: inicio,
    corte_s: corte,
    desplazamiento_s: desplazamiento,
    duracion_s: r3(desplazamiento + cuerpo.duracion_s),
    palabras: [
      ...hook.palabras.map((p) => ({ texto: p.texto, inicio_s: r3(Math.max(0, p.inicio - inicio)), fin_s: r3(Math.max(0, Math.min(p.fin, corte) - inicio)) })),
      ...cuerpo.palabras.map((p) => ({ texto: p.texto, inicio_s: r3(p.inicio + desplazamiento), fin_s: r3(p.fin + desplazamiento) })),
    ],
  }
}

/**
 * Dónde empieza y termina la voz según silencedetect: el silencio que arranca
 * en 0 y el que llega al final (o queda abierto).
 * @param {string} log @param {number} duracion
 */
export function bordesDeVoz(log, duracion) {
  const inicios = [...log.matchAll(/silence_start: (-?[\d.]+)/g)].map((m) => Math.max(0, Number(m[1])))
  const fines = [...log.matchAll(/silence_end: ([\d.]+)/g)].map((m) => Number(m[1]))
  const inicio_voz_s = inicios.length && (inicios[0] ?? 1) <= 0.01 && fines.length ? (fines[0] ?? 0) : 0
  const ultimo = inicios.at(-1)
  const abierto = inicios.length > fines.length || (fines.at(-1) ?? 0) >= duracion - 0.02
  const fin_voz_s = ultimo !== undefined && abierto && ultimo > inicio_voz_s ? ultimo : duracion
  return { inicio_voz_s, fin_voz_s }
}

/** Los átomos de primer nivel de un mp4, en orden. @param {Buffer} b @returns {string[]} */
export function ordenAtomos(b) {
  /** @type {string[]} */
  const tipos = []
  let off = 0
  while (off + 8 <= b.length) {
    let largo = b.readUInt32BE(off)
    tipos.push(b.toString('latin1', off + 4, off + 8))
    if (largo === 1 && off + 16 <= b.length) largo = Number(b.readBigUInt64BE(off + 8))
    if (largo < 8) break
    off += largo
  }
  return tipos
}

/**
 * Lo que exige Meta para un Reel (h264 4:2:0 con faststart, 23-60 fps, aac
 * hasta 48 kHz y ~128 kbps, 3 s a 15 min) más lo propio: 1080x1920 y ≤ TOPE_MB.
 * @param {{ duracion: number, bytes: number, atomos: string[], video: { codec: string, ancho: number, alto: number, fps: number, pix_fmt: string, bitrate: number | null } | null,
 *   audio: { codec: string, frecuencia: number, canales: number, bitrate: number | null } | null }} s
 * @param {{ duracion_s: number }} esperado @returns {string[]}
 */
export function revisarSalida(s, { duracion_s }) {
  /** @type {string[]} */
  const p = []
  if (!s.video) p.push('sin pista de video')
  else {
    if (s.video.codec !== 'h264') p.push(`el video es ${s.video.codec}, no h264`)
    if (s.video.ancho !== 1080 || s.video.alto !== 1920) p.push(`el video es ${s.video.ancho}x${s.video.alto}, no 1080x1920`)
    if (!(s.video.fps >= 23 && s.video.fps <= 60)) p.push(`el video va a ${s.video.fps} fps`)
    if (s.video.pix_fmt !== 'yuv420p') p.push(`el video no es 4:2:0 (${s.video.pix_fmt})`)
    if ((s.video.bitrate ?? 0) > 25e6) p.push('el video pasa los 25 Mbps')
  }
  if (!s.audio) p.push('sin pista de audio')
  else {
    if (s.audio.codec !== 'aac') p.push(`el audio es ${s.audio.codec}, no aac`)
    if (s.audio.frecuencia > 48000) p.push(`el audio va a ${s.audio.frecuencia} Hz`)
    if ((s.audio.bitrate ?? 0) > 132_000) p.push(`el audio va a ${Math.round((s.audio.bitrate ?? 0) / 1000)} kbps`)
  }
  if (Math.abs(s.duracion - duracion_s) > 0.35) p.push(`dura ${s.duracion.toFixed(2)} s y tenía que durar ${duracion_s.toFixed(2)} s`)
  if (s.duracion < 3 || s.duracion > 900) p.push(`dura ${s.duracion.toFixed(1)} s (Meta pide de 3 s a 15 min)`)
  if (s.bytes > TOPE_MB * 1024 * 1024) p.push(`pesa ${(s.bytes / 1048576).toFixed(1)} MB (tope ${TOPE_MB} MB)`)
  const moov = s.atomos.indexOf('moov')
  const mdat = s.atomos.indexOf('mdat')
  if (moov < 0 || (mdat >= 0 && moov > mdat)) p.push('sin faststart: moov va después de mdat')
  return p
}
