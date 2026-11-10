// @ts-check
import { createHash } from 'node:crypto'
import { isAbsolute } from 'node:path'

/* ---------------------------------------------------------------------------
   Lo puro del pipeline de reels: la URL de una demo, el estado versionado,
   el guion, la alineación de tiempos, el scroll por paradas, el contrato con
   la plantilla (datos.json) y los fail-safes. Sin IO: lo prueban
   scripts/reel*.test.mjs.
--------------------------------------------------------------------------- */

export const SLUG = /^[a-z0-9][a-z0-9-]{0,60}$/
export const HOST_DEMOS = 'demo.theapexweb.com'
export const HOSTS_PROPIOS = new Set([HOST_DEMOS, 'theapexweb.com', 'www.theapexweb.com', 'apex-demos-ten.vercel.app'])
export const MAX_INTENTOS = 3

export const VIDEO = { ancho: 1080, alto: 1920, fps: 30 }
export const TOPES = { reelMB: 12, previewKB: 700, previewSeg: [4, 10], vozSeg: [17, 30], palabras: [45, 70], lufs: [-15.5, -12.5] }

/** El cierre fijo de la locución y del video, por idioma. */
export const CTA = { es: 'Comentá WEB y te hacemos una demo gratis de tu página', en: "Comment WEB and we'll build you a free website demo" }

/**
 * Sube cuando cambia el cierre: un reel sin publicar grabado con una versión
 * anterior se vuelve a grabar y no sale hasta tener el cierre nuevo. La 2 es
 * "Comentá WEB": el comentario dispara el mensaje privado del panel
 * (apex_manager/src/lib/instagram). La 3 anima ese cierre: la palabra se escribe en
 * una barra de comentario y llega el mensaje. La 4 lleva lo mismo al inglés.
 */
export const CTA_VERSION = 4

/** Algo que no es culpa de la demo (sin cuota, sin plantilla): el reel se reintenta en otra corrida sin contarle un intento. */
export class Aplazar extends Error {}

/** @param {unknown} v @param {number} max */
export function textoLimpio(v, max = 80) {
  if (typeof v !== 'string') return null
  const t = v
    .replace(/[\u0000-\u001f\u007f<>`{}\\]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  if (!t) return null
  return t.length > max ? t.slice(0, max).trimEnd() : t
}

/**
 * Una URL solo vale si apunta a una demo nuestra: https y un host de APEX con
 * /<slug>, o el dominio de un cliente que dominios.json ya mapea a ese slug.
 * @param {string} slug @param {unknown} valor @param {{ dominios?: Record<string, string> }} [opciones]
 * @returns {{ ok: true, url: string } | { ok: false, motivo: string }}
 */
export function validarUrlDemo(slug, valor, { dominios = {} } = {}) {
  /** @type {URL} */
  let url
  try {
    url = new URL(String(valor ?? ''))
  } catch {
    return { ok: false, motivo: `${slug}: url inválida` }
  }
  if (url.protocol !== 'https:') return { ok: false, motivo: `${slug}: la url no es https` }
  if (url.username || url.password || url.port) return { ok: false, motivo: `${slug}: url con credenciales o puerto` }
  const host = url.hostname.toLowerCase()
  const ruta = url.pathname.replace(/\/+$/, '')
  const propio = HOSTS_PROPIOS.has(host) && ruta === `/${slug}`
  const deCliente = dominios[host] === slug && (ruta === '' || ruta === `/${slug}`)
  if (!propio && !deCliente) return { ok: false, motivo: `${slug}: ${host} no es un host de APEX para esta demo` }
  return { ok: true, url: url.toString() }
}

/** La URL que se graba siempre es la del host de demos: nunca la que trae la agenda. @param {string} slug */
export const urlDemo = (slug) => `https://${HOST_DEMOS}/${slug}`
/** @param {string} slug @param {string} archivo */
export const urlPublica = (slug, archivo) => `https://${HOST_DEMOS}/demos/${slug}/${archivo}`

/* ── Estado (reels/estado.json) ─────────────────────────────────────────── */

/**
 * @typedef {{ hecho_at?: string | null, publicado_at?: string | null, ig_media_id?: string | null, permalink?: string | null,
 *   error?: string | null, error_at?: string | null, intentos?: number, reel_url?: string | null, preview_url?: string | null, duracion_s?: number | null,
 *   idioma?: string | null, pendiente_publicar?: boolean, motivo_publicar?: string | null, intentos_publicar?: number,
 *   publicar_error_at?: string | null, publicar_at?: string | null, cancelado_at?: string | null, build_at?: string | null,
 *   error_regrabar?: string | null, error_regrabar_at?: string | null, intentos_regrabar?: number, portada_url?: string | null, cta_v?: number,
 *   reencolado_at?: string | null, reemplaza?: { ig_media_id: string | null, permalink: string | null, publicado_at: string | null, reel_url: string | null, idioma: string | null } | null }} EntradaEstado
 * @typedef {Record<string, EntradaEstado>} Estado
 */

/** @param {string | null | undefined} texto @returns {Estado} */
export function leerEstado(texto) {
  if (!texto || !texto.trim()) return {}
  const datos = JSON.parse(texto)
  if (!datos || typeof datos !== 'object' || Array.isArray(datos)) throw new Error('reels/estado.json no es un objeto por slug')
  /** @type {Estado} */
  const estado = {}
  for (const [slug, e] of Object.entries(datos)) if (SLUG.test(slug) && e && typeof e === 'object') estado[slug] = /** @type {EntradaEstado} */ (e)
  return estado
}

/**
 * Fusión de reels/estado.json cuando el commit de una corrida choca con lo que
 * llegó a main mientras tanto: por slug gana lo que esta corrida cambió
 * respecto de su base; el resto se toma de main.
 * @param {Estado} base @param {Estado} remoto @param {Estado} propio @returns {Estado}
 */
export function fusionarEstado(base, remoto, propio) {
  /** @type {Estado} */
  const salida = { ...remoto }
  for (const slug of new Set([...Object.keys(base), ...Object.keys(propio)])) {
    if (JSON.stringify(base[slug]) === JSON.stringify(propio[slug])) continue
    const e = propio[slug]
    if (e) salida[slug] = e
    else delete salida[slug]
  }
  return salida
}

/** Orden estable por slug: dos corridas con lo mismo escriben el mismo archivo. @param {Estado} estado */
export function serializarEstado(estado) {
  /** @type {Estado} */
  const ordenado = {}
  for (const slug of Object.keys(estado).sort()) ordenado[slug] = estado[slug] ?? {}
  return `${JSON.stringify(ordenado, null, 2)}\n`
}

/** @param {Estado} estado @param {string} slug @param {Partial<EntradaEstado>} datos @param {Date} ahora */
export function marcarHecho(estado, slug, datos, ahora) {
  const previo = estado[slug] ?? {}
  const regrabado = Boolean(previo.publicado_at)
  return {
    ...estado,
    [slug]: {
      ...previo,
      ...datos,
      hecho_at: ahora.toISOString(),
      error: null,
      error_at: null,
      intentos: 0,
      error_regrabar: null,
      intentos_regrabar: 0,
      motivo_publicar: null,
      // Un reel regrabado de una demo que ya salió en Instagram no se vuelve a publicar solo.
      pendiente_publicar: !regrabado,
    },
  }
}

/**
 * Falló regrabar un reel que ya estaba hecho: el reel anterior sigue valiendo
 * y se publica igual, así que no se toca `error` (el panel lo mostraría como
 * roto).
 * @param {Estado} estado @param {string} slug @param {string} motivo @param {{ contar?: boolean, ahora?: Date }} [opciones]
 */
export function marcarErrorRegrabar(estado, slug, motivo, { contar = true, ahora = new Date() } = {}) {
  const previo = estado[slug] ?? {}
  return {
    ...estado,
    [slug]: { ...previo, error_regrabar: motivo.slice(0, 300), error_regrabar_at: ahora.toISOString(), intentos_regrabar: (previo.intentos_regrabar ?? 0) + (contar ? 1 : 0) },
  }
}

/** @param {Estado} estado @param {string} slug @param {string} motivo @param {{ contar?: boolean, ahora?: Date }} [opciones] */
export function marcarError(estado, slug, motivo, { contar = true, ahora = new Date() } = {}) {
  const previo = estado[slug] ?? {}
  return { ...estado, [slug]: { ...previo, error: motivo.slice(0, 300), error_at: ahora.toISOString(), intentos: (previo.intentos ?? 0) + (contar ? 1 : 0) } }
}

/** @param {Estado} estado @param {string} slug @param {{ ig_media_id: string, permalink: string | null }} datos @param {Date} ahora */
export function marcarPublicado(estado, slug, datos, ahora) {
  const previo = estado[slug] ?? {}
  return { ...estado, [slug]: { ...previo, ...datos, publicado_at: ahora.toISOString(), pendiente_publicar: false, motivo_publicar: null } }
}

/** @param {Estado} estado @param {string} slug @param {string} motivo @param {{ contar?: boolean, ahora?: Date }} [opciones] */
export function marcarPendientePublicar(estado, slug, motivo, { contar = false, ahora = new Date() } = {}) {
  const previo = estado[slug] ?? {}
  return {
    ...estado,
    [slug]: {
      ...previo,
      pendiente_publicar: true,
      motivo_publicar: motivo.slice(0, 300),
      ...(contar ? { intentos_publicar: (previo.intentos_publicar ?? 0) + 1, publicar_error_at: ahora.toISOString() } : {}),
    },
  }
}

/** Cuántos Reels más se pueden publicar ahora sin pasar `max` en 24 h (Meta corta en 50). @param {Estado} estado @param {Date} ahora */
export function cupoPublicacion(estado, ahora, max = 25) {
  const desde = ahora.getTime() - 24 * 3600 * 1000
  const hechos = Object.values(estado).filter((e) => e.publicado_at && Date.parse(e.publicado_at) > desde).length
  return Math.max(0, max - hechos)
}

/* ── Qué versión de la demo se graba ───────────────────────────────────── */

/** @typedef {{ build_id: string | null, built_at: string }} Build */

/** @param {unknown} v @returns {Build | null} */
export function leerBuildJson(v) {
  const d = /** @type {any} */ (v)
  if (!d || typeof d !== 'object' || typeof d.built_at !== 'string' || Number.isNaN(Date.parse(d.built_at))) return null
  return { build_id: typeof d.build_id === 'string' ? d.build_id : null, built_at: new Date(d.built_at).toISOString() }
}

export const ESPERA_DEPLOY_H = 2

/**
 * ¿Se puede grabar ya? La demo en línea tiene que ser la del repo (mismo
 * build.json): grabando a mitad de un deploy el reel sale con la versión
 * vieja. Si el deploy no llega en ESPERA_DEPLOY_H se graba lo que está en
 * línea (un deploy trabado no puede dejar a la demo sin reel), guardando el
 * build del repo para no regrabar en bucle.
 * @param {Build | null} repo @param {Build | null} enLinea @param {Date} ahora
 * @returns {{ grabar: true, build_at: string | null } | { grabar: false, motivo: string }}
 */
export function buildParaGrabar(repo, enLinea, ahora) {
  if (!repo) return { grabar: true, build_at: null }
  const igual = enLinea && enLinea.build_id === repo.build_id && enLinea.built_at === repo.built_at
  if (igual || !enLinea) return { grabar: true, build_at: repo.built_at }
  if (ahora.getTime() - Date.parse(repo.built_at) < ESPERA_DEPLOY_H * 3600_000) {
    return { grabar: false, motivo: 'la demo se está desplegando (la versión en línea no es la última): se graba en la próxima corrida' }
  }
  return { grabar: true, build_at: repo.built_at }
}

/* ── Guion y caption ────────────────────────────────────────────────────── */

/* Manuel (2026-10-11): ni un emoji en guion ni caption. Entran los modificadores (FE0F, ZWJ, tonos de piel, keycap, banderas) para que al sacarlos no quede basura invisible. */
const EMOJI = /[\p{Extended_Pictographic}\u{1F1E6}-\u{1F1FF}\u{1F3FB}-\u{1F3FF}⃣️‍]/u

/** @param {string} t */
export const sinEmojis = (t) =>
  t
    .replace(new RegExp(EMOJI.source, 'gu'), '')
    .split('\n')
    .map((l) => l.replace(/[ \t]{2,}/g, ' ').trim())
    .join('\n')
    .trim()

const PROHIBIDO_COMUN = [
  [/\d/, 'tiene cifras (los números van en palabras y sin datos inventados)'],
  [/[$€%]/, 'tiene símbolos de plata o porcentajes'],
  [/\bprecios?\b|\bpesos\b|\bd[oó]lares?\b|\bcuotas?\b|\bdescuentos?\b|\bprices?\b|\bdollars?\b|\bdiscounts?\b/i, 'habla de precios'],
  [/testimoni|rese[ñn]as?\b|\breviews?\b|cinco estrellas|five stars/i, 'menciona testimonios o reseñas'],
  [EMOJI, 'tiene emojis (la voz los lee)'],
]

/** @param {string} texto */
export const contarPalabras = (texto) => texto.split(/\s+/).filter((p) => /[\p{L}\p{N}]/u.test(p)).length

/** @param {string} t */
export const plano = (t) =>
  t
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')

const CASTELLANO = new Set(
  'el los las una unos unas para con del tu tus su sus nuestro nuestra nuestros nuestras que por desde sobre tenemos hacemos somos pagina negocio clientes servicios productos consultanos contactanos escribinos reserva turnos envios todos todas cada mejor calidad hogar armamos'.split(' '),
)

/** ¿Oración en castellano? Hacen falta 4 palabras y 2 delatoras: una dirección o un nombre corto no cuentan. @param {string} texto */
export function pareceCastellano(texto) {
  const palabras = plano(texto).split(/[^a-zñ]+/).filter(Boolean)
  if (palabras.length < 4 || /\d/.test(texto)) return false
  return new Set(palabras.filter((p) => CASTELLANO.has(p))).size >= 2
}

/** @param {string} t */
const escaparRe = (t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/**
 * ¿El texto nombra alguno de `nombres`? Palabra entera, sin importar
 * mayúsculas ni tildes; en los hashtags también pegado (#GottcciTurismo).
 * @param {string} texto @param {string[]} nombres
 */
export function nombraAlNegocio(texto, nombres) {
  const t = plano(texto)
  const tags = (texto.match(/#[\p{L}\p{N}_]+/gu) ?? []).map((h) => plano(h).replace(/[^a-z0-9]/g, ''))
  return nombres.some((n) => {
    const p = plano(n).replace(/[^a-z0-9ñ ]/g, ' ').replace(/\s+/g, ' ').trim()
    if (!p) return false
    if (new RegExp(`(?<![\\p{L}\\p{N}])${escaparRe(p)}(?![\\p{L}\\p{N}])`, 'u').test(t)) return true
    const pegado = p.replace(/ /g, '')
    return pegado.length >= 4 && tags.some((h) => h.includes(pegado))
  })
}

/** @param {string | null | undefined} t */
const palabrasPlanas = (t) =>
  plano(t ?? '')
    .replace(/[^a-z0-9ñ ]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
/** Singular aproximado, para que "concesionarias" y "concesionaria" sean la misma palabra. @param {string} p */
const raiz = (p) => (p.length > 4 ? p.replace(/(?:es|s)$/, '') : p)

const CONECTORES = new Set(['tu', 'tus', 'su', 'sus', 'mi', 'mis', 'el', 'la', 'los', 'las', 'de', 'del', 'y', 'e', 'en', 'nuestro', 'nuestra', 'your', 'my', 'our', 'the', 'of', 'and', 'a', 'an'])
const GENERICAS = new Set(['negocio', 'empresa', 'emprendimiento', 'marca', 'comercio', 'local', 'tienda', 'business', 'company', 'brand', 'shop', 'store', 'demo', 'nombre', 'name'])
// Palabras del oficio de APEX que el prompt pide y el CTA dice ("diseño web", "página", "online"). Si el
// nombre trae una ("Manteña Diseño"), prohibirla sola tumba todo caption: #diseñoweb (3 de 3, 2026-10-27).
const DEL_OFICIO = new Set(['diseno', 'disenos', 'web', 'webs', 'pagina', 'paginas', 'sitio', 'sitios', 'online', 'digital', 'design', 'designs', 'website', 'websites', 'site', 'sites'])

/**
 * El nombre que pone la fábrica cuando el lead no dio uno ("Tu concesionaria",
 * "Your bakery"): solo conectores y palabras del rubro. No hay que esconderlo,
 * y prohibirlo choca con el hook natural ("Así quedaría la web de tu
 * concesionaria"): demo-cfc8 falló 3 de 3 por eso (2026-10-11).
 * @param {string | null | undefined} nombre @param {string | null | undefined} rubro
 */
export function nombreDeRelleno(nombre, rubro) {
  const delRubro = new Set(palabrasPlanas(rubro).map(raiz))
  return palabrasPlanas(nombre)
    .filter((p) => !CONECTORES.has(p))
    .every((p) => GENERICAS.has(raiz(p)) || GENERICAS.has(p) || delRubro.has(raiz(p)))
}

/**
 * Lo que guion, caption y hashtags no pueden decir: el nombre entero y cada
 * palabra propia del nombre (no del rubro ni del lema), porque "Costich" solo
 * también lo nombra.
 * @param {string | null | undefined} nombre @param {{ rubro?: string | null, lema?: string | null }} [contexto] @returns {string[]}
 */
export function terminosDelNombre(nombre, { rubro = null, lema = null } = {}) {
  if (!nombre?.trim() || nombreDeRelleno(nombre, rubro)) return []
  // Del lema solo cuentan las palabras en minúscula o al empezar una oración: "En Costich te financiamos" no vuelve común a "Costich".
  const lemaSinNombre = taparNombre(lema ?? '', [nombre], ' ')
  const delLema = [...lemaSinNombre.matchAll(/[\p{L}\p{N}]+/gu)]
    .filter((m) => m[0] === m[0].toLowerCase() || /(?:^|[.!?¡¿])\s*$/u.test(lemaSinNombre.slice(0, m.index)))
    .flatMap((m) => palabrasPlanas(m[0]))
  const comunes = new Set([...palabrasPlanas(rubro), ...delLema].map(raiz))
  const propias = palabrasPlanas(nombre).filter((p) => p.length >= 4 && !CONECTORES.has(p) && !GENERICAS.has(p) && !DEL_OFICIO.has(p) && !comunes.has(raiz(p)))
  return [nombre, ...new Set(propias)]
}

const VARIANTES = /** @type {Record<string, string>} */ ({ a: 'aáàâä', e: 'eéèêë', i: 'iíìîï', o: 'oóòôö', u: 'uúùûü', n: 'nñ', c: 'cç' })

/**
 * Cambia cada término (palabra entera, sin importar mayúsculas ni tildes) por
 * `reemplazo`. El modelo que no ve el nombre no lo puede escribir.
 * @param {string} texto @param {string[]} terminos @param {string} reemplazo
 */
export function taparNombre(texto, terminos, reemplazo) {
  let salida = texto
  for (const t of [...terminos].sort((x, y) => y.length - x.length)) {
    const palabras = palabrasPlanas(t)
    if (!palabras.length) continue
    const patron = palabras
      .map((p) => [...p].map((c) => (VARIANTES[c] ? `[${VARIANTES[c]}]` : escaparRe(c))).join(''))
      .join('[^\\p{L}\\p{N}]+')
    salida = salida.replace(new RegExp(`(?<![\\p{L}\\p{N}])${patron}(?![\\p{L}\\p{N}])`, 'giu'), reemplazo)
  }
  return salida
}

/** @param {string} guion @param {'es' | 'en'} idioma @param {{ prohibidos?: string[] }} [opciones] @returns {string[]} */
export function validarGuion(guion, idioma, { prohibidos = [] } = {}) {
  /** @type {string[]} */
  const problemas = []
  const palabras = contarPalabras(guion)
  if (palabras < TOPES.palabras[0] || palabras > TOPES.palabras[1]) problemas.push(`tiene ${palabras} palabras (van de ${TOPES.palabras[0]} a ${TOPES.palabras[1]})`)
  for (const [re, motivo] of PROHIBIDO_COMUN) if (/** @type {RegExp} */ (re).test(guion)) problemas.push(/** @type {string} */ (motivo))
  if (idioma === 'es') {
    if (/\bche\b/i.test(guion)) problemas.push('dice "che"')
    if (/(?<!\p{L})(tú|usted|puedes|quieres|tienes|eres)(?!\p{L})/iu.test(guion)) problemas.push('tutea o trata de usted (va con voseo)')
    if (!/comentá web\b/i.test(guion)) problemas.push('no cierra con "Comentá WEB"')
  } else {
    if (!/comment web\b/i.test(guion)) problemas.push('does not close with "Comment WEB"')
    if (pareceCastellano(guion)) problemas.push('is in Spanish, it must be in English')
  }
  if (nombraAlNegocio(guion, prohibidos)) problemas.push('nombra al negocio')
  return problemas
}

/** Hook de ≤ 7 palabras y gancho del medio de ≤ 6 (o ninguno), sin cifras. @param {string} hook @param {string | null} medio */
export function validarHooks(hook, medio) {
  /** @type {string[]} */
  const problemas = []
  const h = String(hook ?? '').trim()
  if (!h) problemas.push('falta el hook')
  else if (contarPalabras(h) > 7) problemas.push(`el hook tiene ${contarPalabras(h)} palabras (máximo 7)`)
  if (/\d/.test(h)) problemas.push('el hook tiene cifras')
  if (medio != null) {
    if (contarPalabras(medio) > 6) problemas.push(`el gancho_medio tiene ${contarPalabras(medio)} palabras (máximo 6)`)
    if (/\d/.test(medio)) problemas.push('el gancho_medio tiene cifras')
  }
  return problemas
}

/**
 * El caption no lleva el nombre del negocio, ni datos de contacto, ni links o
 * cuentas que no sean de APEX: la demo se publica sin pedirle permiso al dueño.
 * @param {string} caption @param {'es' | 'en'} idioma @param {{ prohibidos?: string[] }} [opciones] @returns {string[]}
 */
export function validarCaption(caption, idioma, { prohibidos = [] } = {}) {
  /** @type {string[]} */
  const problemas = []
  if (caption.length > 2200) problemas.push(`el caption tiene ${caption.length} caracteres (máximo 2200)`)
  const hashtags = caption.match(/#[\p{L}\p{N}_]+/gu) ?? []
  if (hashtags.length < 6 || hashtags.length > 10) problemas.push(`tiene ${hashtags.length} hashtags (van de 6 a 10)`)
  if (EMOJI.test(caption)) problemas.push('caption: tiene emojis (no va ninguno)')
  for (const [re, motivo] of PROHIBIDO_COMUN.slice(1, 4)) if (/** @type {RegExp} */ (re).test(caption)) problemas.push(`caption: ${motivo}`)
  if (idioma === 'es' && /\bche\b/i.test(caption)) problemas.push('caption: dice "che"')
  if (idioma === 'en' && pareceCastellano(caption)) problemas.push('caption: is in Spanish, it must be in English')
  if (/[\w.+-]+@[\w-]+\.[\w.]+/.test(caption) || /\+?\d[\d\s().-]{6,}\d/.test(caption)) problemas.push('caption: tiene datos de contacto')
  const links = caption.match(/(?:https?:\/\/|www\.)\S+|\b[a-z0-9-]+(?:\.[a-z0-9-]+)*\.(?:com|ar|net|org|io|app|shop|store|site|online)\b/gi) ?? []
  if (links.some((l) => !/^(?:https?:\/\/)?(?:www\.)?theapexweb\.com/i.test(l))) problemas.push('caption: tiene un link que no es theapexweb.com')
  const cuentas = [...caption.matchAll(/(?:^|\s)@([\w.]+)/g)].map((m) => m[1])
  if (cuentas.some((c) => c !== 'apex.stack')) problemas.push('caption: nombra otra cuenta')
  if (nombraAlNegocio(caption, prohibidos)) problemas.push('caption: nombra al negocio')
  return problemas
}

/** @param {unknown} v */
const hashtag = (v) => {
  const t = String(v ?? '').normalize('NFC').replace(/^#+/, '').replace(/[^\p{L}\p{N}_]/gu, '')
  return t ? `#${t}` : null
}

export const CTA_CAPTION = {
  es: `${CTA.es}.`,
  en: `${CTA.en}.`,
}

/**
 * Gancho + dos líneas + CTA fijo + hashtags. Las líneas las escribe el modelo; el armado,
 * el CTA y los hashtags (sin repetidos, sin espacios) son de código.
 * @param {{ gancho: string, lineas: string[], hashtags: unknown[], idioma?: 'es' | 'en' }} partes
 */
export function armarCaption({ gancho, lineas, hashtags, idioma }) {
  const tags = [...new Set(hashtags.map(hashtag).filter(Boolean))].slice(0, 10)
  const cta = idioma ? ['', CTA_CAPTION[idioma]] : []
  return sinEmojis([gancho.trim(), '', ...lineas.slice(0, 2).map((l) => l.trim()).filter(Boolean), ...cta, '', tags.join(' ')].join('\n'))
}

/** La voz lee el dominio y "WEB" como se dicen (en mayúsculas lo deletrearía); el subtítulo los muestra escritos. @param {string} guion @param {'es' | 'en'} idioma */
export function textoParaVoz(guion, idioma) {
  return guion.replace(/theapexweb\.com/gi, idioma === 'es' ? 'the apex web punto com' : 'the apex web dot com').replace(/\bWEB\b/g, 'web')
}

/* ── Tiempos por palabra ────────────────────────────────────────────────── */

/** @param {string} p */
export const normalizar = (p) =>
  p
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9ñ]/g, '')

/** @typedef {{ texto: string, inicio: number, fin: number }} Palabra */

/** @param {string} a @param {string} b */
function parecidas(a, b) {
  if (!a || !b) return false
  if (a === b || a.startsWith(b) || b.startsWith(a)) return true
  const largo = Math.max(a.length, b.length)
  /** @type {number[]} */
  let fila = Array.from({ length: b.length + 1 }, (_, i) => i)
  for (let i = 1; i <= a.length; i++) {
    const nueva = [i]
    for (let j = 1; j <= b.length; j++) nueva[j] = Math.min((fila[j] ?? 0) + 1, (nueva[j - 1] ?? 0) + 1, (fila[j - 1] ?? 0) + (a[i - 1] === b[j - 1] ? 0 : 1))
    fila = nueva
  }
  return (fila[b.length] ?? largo) / largo <= 0.34
}

/**
 * Pone los tiempos oídos sobre las palabras del guion (que es lo que se
 * muestra: la voz dice "the apex web punto com" donde el guion dice
 * theapexweb.com). Alineación global; lo que no empareja se interpola por
 * largo entre vecinos.
 * @param {string[]} tokens  palabras del guion, con su puntuación
 * @param {Palabra[]} oidas  palabras con tiempo (ElevenLabs, whisper o repartidas)
 * @returns {Palabra[]}
 */
export function alinearPalabras(tokens, oidas) {
  const a = tokens.map(normalizar)
  const b = oidas.map((o) => normalizar(o.texto))
  const n = a.length
  const m = b.length
  const costo = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0))
  for (let i = 0; i <= n; i++) costo[i][0] = i
  for (let j = 0; j <= m; j++) costo[0][j] = j
  for (let i = 1; i <= n; i++)
    for (let j = 1; j <= m; j++)
      costo[i][j] = Math.min(costo[i - 1][j] + 1, costo[i][j - 1] + 1, costo[i - 1][j - 1] + (parecidas(a[i - 1] ?? '', b[j - 1] ?? '') ? 0 : 1.5))
  /** @type {(Palabra | null)[]} */
  const asignadas = new Array(n).fill(null)
  /** @type {number[]} */
  const oidaDe = new Array(n).fill(-1)
  let i = n
  let j = m
  while (i > 0 && j > 0) {
    const diag = costo[i - 1][j - 1] + (parecidas(a[i - 1] ?? '', b[j - 1] ?? '') ? 0 : 1.5)
    if (costo[i][j] === diag) {
      const o = /** @type {Palabra} */ (oidas[j - 1])
      asignadas[i - 1] = { texto: tokens[i - 1] ?? '', inicio: o.inicio, fin: o.fin }
      oidaDe[i - 1] = j - 1
      i--
      j--
    } else if (costo[i][j] === costo[i - 1][j] + 1) i--
    else j--
  }
  // Lo oído que no emparejó con nada (el "apex web punto com" después de "the") es de la palabra anterior.
  for (let k = 0; k < n; k++) {
    const a = asignadas[k]
    if (!a) continue
    const siguiente = k + 1 < n ? oidaDe[k + 1] : m
    if (siguiente === -1) continue
    const ultima = oidas[/** @type {number} */ (siguiente) - 1]
    if (/** @type {number} */ (siguiente) - 1 > (oidaDe[k] ?? 0) && ultima) a.fin = ultima.fin
  }
  const inicio = oidas[0]?.inicio ?? 0
  const fin = oidas[oidas.length - 1]?.fin ?? inicio
  /** @type {Palabra[]} */
  const salida = []
  for (let k = 0; k < n; ) {
    if (asignadas[k]) {
      salida.push(/** @type {Palabra} */ (asignadas[k]))
      k++
      continue
    }
    let hasta = k
    while (hasta < n && !asignadas[hasta]) hasta++
    const desde = salida.length ? /** @type {Palabra} */ (salida[salida.length - 1]).fin : inicio
    const tope = hasta < n ? /** @type {Palabra} */ (asignadas[hasta]).inicio : fin
    const pesos = tokens.slice(k, hasta).map((t) => Math.max(1, normalizar(t).length))
    const total = pesos.reduce((x, y) => x + y, 0)
    let t = desde
    for (let q = k; q < hasta; q++) {
      const dur = (Math.max(0, tope - desde) * (pesos[q - k] ?? 1)) / total
      salida.push({ texto: tokens[q] ?? '', inicio: t, fin: t + dur })
      t += dur
    }
    k = hasta
  }
  for (let q = 1; q < salida.length; q++) {
    const p = /** @type {Palabra} */ (salida[q])
    const prev = /** @type {Palabra} */ (salida[q - 1])
    if (p.inicio < prev.inicio) p.inicio = prev.inicio
    if (p.fin < p.inicio) p.fin = p.inicio
  }
  return salida
}

/** Sin tiempos por palabra: se reparte cada segmento por largo. @param {{ start: number, end: number, text: string }[]} segmentos @returns {Palabra[]} */
export function palabrasDeSegmentos(segmentos) {
  /** @type {Palabra[]} */
  const salida = []
  for (const s of segmentos) {
    const ps = String(s.text ?? '').split(/\s+/).filter(Boolean)
    const pesos = ps.map((p) => Math.max(1, normalizar(p).length))
    const total = pesos.reduce((x, y) => x + y, 0) || 1
    let t = Number(s.start) || 0
    const dur = Math.max(0, (Number(s.end) || t) - t)
    ps.forEach((p, k) => {
      const d = (dur * (pesos[k] ?? 1)) / total
      salida.push({ texto: p, inicio: t, fin: t + d })
      t += d
    })
  }
  return salida
}

/**
 * Último recurso, sin transcripción: las frases del guion sobre los tramos con
 * voz que encontró silencedetect. Si no coinciden en cantidad, todo el guion
 * se reparte por largo entre el primer y el último tramo.
 * @param {string} guion @param {{ inicio: number, fin: number }[]} tramos @returns {Palabra[]}
 */
export function palabrasPorSilencios(guion, tramos) {
  const frases = guion.split(/(?<=[.!?…])\s+/).map((f) => f.trim()).filter(Boolean)
  if (!tramos.length) return []
  if (frases.length === tramos.length) {
    return frases.flatMap((f, k) => palabrasDeSegmentos([{ start: /** @type {any} */ (tramos[k]).inicio, end: /** @type {any} */ (tramos[k]).fin, text: f }]))
  }
  return palabrasDeSegmentos([{ start: /** @type {any} */ (tramos[0]).inicio, end: /** @type {any} */ (tramos[tramos.length - 1]).fin, text: guion }])
}

/** Tramos con voz a partir de la salida de silencedetect. @param {string} log @param {number} duracion */
export function tramosConVoz(log, duracion) {
  const inicios = [...log.matchAll(/silence_start: (-?[\d.]+)/g)].map((m) => Math.max(0, Number(m[1])))
  const fines = [...log.matchAll(/silence_end: ([\d.]+)/g)].map((m) => Number(m[1]))
  /** @type {{ inicio: number, fin: number }[]} */
  const tramos = []
  let cursor = 0
  inicios.forEach((s, k) => {
    if (s - cursor > 0.15) tramos.push({ inicio: cursor, fin: s })
    cursor = fines[k] ?? duracion
  })
  if (duracion - cursor > 0.15) tramos.push({ inicio: cursor, fin: duracion })
  return tramos
}

/** La plantilla muestra estas palabras como subtítulos: tienen que ser el guion entero, en orden y dentro de la voz. @param {Palabra[]} palabras @param {string[]} tokens @param {number} durVoz */
export function revisarPalabras(palabras, tokens, durVoz) {
  /** @type {string[]} */
  const problemas = []
  if (palabras.map((p) => p.texto).join(' ') !== tokens.join(' ')) problemas.push('las palabras con tiempo no son el guion completo')
  for (let k = 0; k < palabras.length; k++) {
    const p = /** @type {Palabra} */ (palabras[k])
    if (p.fin < p.inicio || (k > 0 && p.inicio < /** @type {Palabra} */ (palabras[k - 1]).inicio)) {
      problemas.push(`palabra ${k} fuera de orden`)
      break
    }
  }
  const ultima = palabras[palabras.length - 1]
  if (ultima && ultima.fin > durVoz + 0.3) problemas.push(`la última palabra termina después de la voz (${ultima.fin.toFixed(2)} s de ${durVoz.toFixed(2)} s)`)
  return problemas
}

/* ── Scroll por paradas ─────────────────────────────────────────────────── */

const SOSTEN = { min: 1.2, max: 2.5, ideal: 1.95 }
const VIAJE = { min: 0.5, max: 0.8 }

/** power2.inOut de GSAP. @param {number} u */
const power2InOut = (u) => (u < 0.5 ? 2 * u * u : 1 - ((-2 * u + 2) ** 2) / 2)

/**
 * El recorrido del scroll por paradas (receta de la skill edicion-reels):
 * arranca quieto en el hero, viaja 0,5-0,8 s con power2.inOut, se sostiene
 * 1,2-2,5 s en cada parada y nunca barre más de 2 pantallas por viaje (más
 * lejos, corta hasta una pantalla antes y viaja el resto). Las paradas salen
 * de las secciones; si no alcanzan, se suman puntos intermedios sin título.
 * Muestreado cada `paso` s, en CSS px.
 * `pie`: dónde empieza el footer (CSS px). El scroll no baja tanto como para
 * que el pie ocupe más del 20 % de abajo: el recorrido (y el cierre, que
 * congela el último cuadro dentro del celular) termina en una sección linda.
 * @param {{ duracion: number, alturaScroll: number, viewport: number, secciones: { y: number, titulo: string | null }[], paso?: number, pie?: number | null }} p
 */
export function planParadas({ duracion, alturaScroll, viewport, secciones, paso = 1 / 60, pie = null }) {
  const H = Math.max(0, Math.round(Math.min(alturaScroll, typeof pie === 'number' && pie > viewport ? pie - viewport * 0.8 : Infinity)))
  const hueco = viewport * 0.6
  const ordenadas = [...secciones].filter((s) => Number.isFinite(s.y)).sort((a, b) => a.y - b.y)
  const tituloHero = ordenadas.find((s) => s.y < viewport * 0.5)?.titulo ?? null

  /** @type {{ y: number, titulo: string | null }[]} */
  let candidatas = []
  for (const s of ordenadas) {
    const y = Math.min(H, Math.round(s.y))
    if (y < viewport * 0.5) continue
    const previa = candidatas[candidatas.length - 1]?.y ?? 0
    if (y - previa >= hueco) candidatas.push({ y, titulo: s.titulo ?? null })
  }
  const minimo = Math.ceil((duracion - SOSTEN.max) / (SOSTEN.max + VIAJE.max))
  const maximo = Math.floor((duracion - SOSTEN.min) / (SOSTEN.min + VIAJE.max))
  const objetivo = Math.max(0, Math.min(maximo, Math.max(minimo, Math.round((duracion - SOSTEN.ideal) / (SOSTEN.ideal + 0.65)))))

  if (H > 0) {
    if (candidatas.length > objetivo) {
      const c = candidatas
      candidatas = Array.from({ length: objetivo }, (_, k) => /** @type {{ y: number, titulo: string | null }} */ (c[Math.round(((k + 1) * c.length) / objetivo) - 1]))
    } else {
      if (candidatas.length < objetivo && H - (candidatas[candidatas.length - 1]?.y ?? 0) >= hueco) candidatas.push({ y: H, titulo: null })
      while (candidatas.length < objetivo) {
        let mejor = -1
        let largo = 0
        for (let k = 0; k < candidatas.length; k++) {
          const g = /** @type {any} */ (candidatas[k]).y - (k ? /** @type {any} */ (candidatas[k - 1]).y : 0)
          if (g > largo) {
            largo = g
            mejor = k
          }
        }
        if (mejor < 0 || largo / 2 < hueco) break
        const desde = mejor ? /** @type {any} */ (candidatas[mejor - 1]).y : 0
        candidatas.splice(mejor, 0, { y: Math.round(desde + largo / 2), titulo: null })
      }
    }
  } else candidatas = []

  const puntos = [{ y: 0, titulo: tituloHero }, ...candidatas]
  const viajes = candidatas.map((c, k) => {
    const d = c.y - /** @type {any} */ (puntos[k]).y
    const corte = d > viewport * 2
    const recorrido = corte ? viewport : d
    return { corte, dur: Math.min(VIAJE.max, Math.max(VIAJE.min, VIAJE.min + ((VIAJE.max - VIAJE.min) * recorrido) / (viewport * 2))) }
  })
  const sosten = (duracion - viajes.reduce((a, v) => a + v.dur, 0)) / puntos.length

  /** @type {{ inicio_s: number, fin_s: number, seccion: string | null, y_css: number }[]} */
  const paradas = []
  /** @type {{ t0: number, t1: number, desde: number, hasta: number }[]} */
  const tramos = []
  let t = 0
  puntos.forEach((p, k) => {
    if (k > 0) {
      const v = /** @type {{ corte: boolean, dur: number }} */ (viajes[k - 1])
      const previo = /** @type {any} */ (puntos[k - 1]).y
      tramos.push({ t0: t, t1: t + v.dur, desde: v.corte ? p.y - viewport : previo, hasta: p.y })
      t += v.dur
    }
    const fin = k === puntos.length - 1 ? duracion : t + sosten
    paradas.push({ inicio_s: t, fin_s: fin, seccion: p.titulo, y_css: p.y })
    t = fin
  })

  /** @param {number} s */
  const posicion = (s) => {
    let y = 0
    for (const tr of tramos) {
      if (s <= tr.t0) break
      if (s >= tr.t1) y = tr.hasta
      else y = tr.desde + (tr.hasta - tr.desde) * power2InOut((s - tr.t0) / (tr.t1 - tr.t0))
    }
    return y
  }
  const muestras = []
  for (let k = 0; k * paso <= duracion + 1e-9; k++) muestras.push(Math.round(posicion(k * paso) * 10) / 10)
  const r3 = (/** @type {number} */ x) => Math.round(x * 1000) / 1000
  return { muestras, paso, paradas: paradas.map((p) => ({ ...p, inicio_s: r3(p.inicio_s), fin_s: r3(p.fin_s) })) }
}

/**
 * Cuánto scroll grabar: hasta que la voz empieza el CTA. Después la web se
 * achica dentro del celular y queda quieta, así que lo que se grabe más allá
 * no se ve: mejor que todas las paradas caigan mientras se habla.
 * @param {Palabra[]} palabras @param {string} cta @param {number} total  voz + cola
 */
export function duracionScroll(palabras, cta, total) {
  const primera = normalizar(cta.split(/\s+/)[0] ?? '')
  const desde = palabras.length > 4 ? palabras.length - 12 : 0
  let inicioCta = null
  for (let k = palabras.length - 1; k >= Math.max(0, desde); k--) if (normalizar(palabras[k]?.texto ?? '') === primera) {
    inicioCta = palabras[k]?.inicio ?? null
    break
  }
  if (inicioCta === null) return total
  return Math.round(Math.min(total, Math.max(8, inicioCta + 0.2)) * 1000) / 1000
}

/** Debajo de esta fracción de píxeles con contenido, la parada se ve vacía (calibrado: página real ≥ 0,05; en blanco con sólo el encabezado < 0,005). */
export const TINTA_MINIMA = 0.015

/**
 * Cuánto contenido hay en un cuadro en gris: fracción de píxeles que se
 * apartan más de 18 niveles del tono de fondo (la moda), sin contar el 12 %
 * de arriba, donde queda el encabezado fijo aunque la página no haya pintado.
 * @param {Uint8Array} gris @param {number} ancho @param {number} alto
 */
export function tintaDeCuadro(gris, ancho, alto) {
  const desde = Math.floor(alto * 0.12) * ancho
  const hasta = ancho * alto
  const histo = new Array(256).fill(0)
  for (let i = desde; i < hasta; i++) histo[gris[i] ?? 0]++
  const fondo = histo.indexOf(Math.max(...histo))
  let tinta = 0
  for (let i = desde; i < hasta; i++) if (Math.abs((gris[i] ?? 0) - fondo) > 18) tinta++
  return tinta / Math.max(1, hasta - desde)
}

/**
 * Paradas que salieron vacías (la página no pintó: queda el fondo y el
 * encabezado). Un reel así nunca se publica.
 * @param {{ inicio_s: number, fin_s: number }[]} paradas
 * @param {(t: number) => Promise<Uint8Array>} cuadro  cuadro en gris de 108x192 en el instante t
 * @returns {Promise<{ i: number, tinta: number }[]>}
 */
export async function paradasVacias(paradas, cuadro) {
  /** @type {{ i: number, tinta: number }[]} */
  const vacias = []
  for (const [i, p] of paradas.entries()) {
    const tinta = tintaDeCuadro(await cuadro((p.inicio_s + p.fin_s) / 2), 108, 192)
    if (tinta < TINTA_MINIMA) vacias.push({ i, tinta: Math.round(tinta * 10000) / 10000 })
  }
  return vacias
}

/* ── datos.json: el contrato con la plantilla HyperFrames ──────────────── */

/** @param {unknown} v */
const num = (v) => typeof v === 'number' && Number.isFinite(v)
const HEX = /^#[0-9a-f]{6}$/i

/**
 * Lo que la plantilla (marketing/reels/scripts/reel/render.mjs) espera, campo por campo.
 * @param {any} d @param {{ esAbsoluta?: (ruta: string) => boolean }} [opciones] @returns {string[]}
 */
export function validarDatos(d, { esAbsoluta = isAbsolute } = {}) {
  /** @type {string[]} */
  const p = []
  if (d?.version !== 1) p.push('version tiene que ser 1')
  if (d?.idioma !== 'es' && d?.idioma !== 'en') p.push('idioma es "es" o "en"')
  if (typeof d?.scroll?.video !== 'string' || !esAbsoluta(d.scroll.video)) p.push('scroll.video tiene que ser una ruta absoluta')
  if (!num(d?.scroll?.duracion_s) || d.scroll.duracion_s <= 0) p.push('scroll.duracion_s inválida')
  const paradas = d?.scroll?.paradas
  if (!Array.isArray(paradas) || !paradas.length) p.push('scroll.paradas vacías')
  else if (!paradas.every((x) => num(x?.inicio_s) && num(x?.fin_s) && x.fin_s > x.inicio_s && num(x?.y_css) && (x.seccion === null || typeof x.seccion === 'string')))
    p.push('scroll.paradas con tiempos o campos inválidos')
  if (typeof d?.voz?.wav !== 'string' || !esAbsoluta(d.voz.wav) || !num(d?.voz?.duracion_s) || d.voz.duracion_s <= 0) p.push('voz inválida (wav absoluto y duracion_s > 0)')
  const palabras = d?.palabras
  if (!Array.isArray(palabras) || !palabras.length) p.push('palabras vacías')
  else if (!palabras.every((x, k) => typeof x?.texto === 'string' && x.texto && num(x.inicio_s) && num(x.fin_s) && x.fin_s >= x.inicio_s && (k === 0 || x.inicio_s >= palabras[k - 1].inicio_s)))
    p.push('palabras fuera de orden o con tiempos inválidos')
  const g = d?.guion
  if (!g || typeof g.texto !== 'string' || !g.texto) p.push('guion.texto vacío')
  if (!g || validarHooks(g.hook, g.gancho_medio ?? null).length) p.push(`guion.hook / gancho_medio: ${validarHooks(g?.hook, g?.gancho_medio ?? null).join('; ')}`)
  if (!g || typeof g.cta !== 'string' || !g.cta.trim()) p.push('guion.cta vacío')
  if (!['acento', 'fondo', 'texto'].every((k) => HEX.test(String(d?.marca?.[k] ?? '')))) p.push('marca: acento, fondo y texto en #rrggbb')
  if (d?.musica !== null) p.push('musica va null (la elige la plantilla)')
  return p
}

/* ── Fail-safes ─────────────────────────────────────────────────────────── */

/**
 * @typedef {{ url_status: number, pagina_problema: string | null, guion_problemas: string[], caption_problemas: string[],
 *   voz: number, palabras_problemas: string[], datos_problemas: string[], lufs: number | null,
 *   reel: { bytes: number, ancho: number, alto: number, vcodec: string, acodec: string, fps: number, duracion: number, audio: number, tiene_audio: boolean },
 *   preview: { bytes: number, ancho: number, alto: number, duracion: number, tiene_audio: boolean } }} Medidas
 */

/** Todo lo que tiene que dar bien antes de dar el reel por bueno. @param {Medidas} m @returns {Record<string, string | null>} */
export function revisarReel(m) {
  const mb = m.reel.bytes / 1024 / 1024
  const kb = m.preview.bytes / 1024
  return {
    url: m.url_status === 200 ? (m.pagina_problema ? `la página ${m.pagina_problema}` : null) : `la demo responde ${m.url_status}`,
    guion: m.guion_problemas.length ? m.guion_problemas.join('; ') : null,
    caption: m.caption_problemas.length ? m.caption_problemas.join('; ') : null,
    voz: m.voz >= TOPES.vozSeg[0] && m.voz <= TOPES.vozSeg[1] ? null : `la locución dura ${m.voz.toFixed(1)} s`,
    palabras: m.palabras_problemas.length ? m.palabras_problemas.join('; ') : null,
    datos: m.datos_problemas.length ? m.datos_problemas.join('; ') : null,
    lufs: m.lufs == null || (m.lufs >= TOPES.lufs[0] && m.lufs <= TOPES.lufs[1]) ? null : `el master quedó en ${m.lufs} LUFS (va −14 ± 1,5)`,
    tiene_audio: m.reel.tiene_audio ? null : 'el reel no tiene pista de audio',
    duracion:
      m.reel.duracion < m.voz
        ? `el reel (${m.reel.duracion.toFixed(2)} s) es más corto que la voz (${m.voz.toFixed(2)} s)`
        : Math.abs(m.reel.duracion - m.reel.audio) > 0.5
          ? `video ${m.reel.duracion.toFixed(2)} s y audio ${m.reel.audio.toFixed(2)} s no coinciden`
          : null,
    archivo:
      mb > TOPES.reelMB
        ? `reel.mp4 pesa ${mb.toFixed(1)} MB`
        : m.reel.ancho !== VIDEO.ancho || m.reel.alto !== VIDEO.alto
          ? `reel.mp4 mide ${m.reel.ancho}x${m.reel.alto}`
          : m.reel.vcodec !== 'h264' || m.reel.acodec !== 'aac'
            ? `reel.mp4 es ${m.reel.vcodec}/${m.reel.acodec}`
            : Math.round(m.reel.fps) !== VIDEO.fps
              ? `reel.mp4 va a ${m.reel.fps} fps`
              : null,
    preview:
      kb > TOPES.previewKB
        ? `preview pesa ${Math.round(kb)} KB`
        : !m.preview.alto || Math.abs(m.preview.ancho / m.preview.alto - 9 / 16) > 0.01
          ? `preview mide ${m.preview.ancho}x${m.preview.alto} (va 9:16)`
          : m.preview.duracion < TOPES.previewSeg[0] || m.preview.duracion > TOPES.previewSeg[1]
            ? `preview dura ${m.preview.duracion.toFixed(1)} s`
            : m.preview.tiene_audio
              ? 'preview tiene audio'
              : null,
  }
}

/** @param {Record<string, string | null>} checks */
export const fallas = (checks) => Object.entries(checks).filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`)

/**
 * ¿La página que se iba a grabar o publicar es la demo, o una pantalla de
 * login, un 404 o la de "esta demo expiró"?
 * @param {{ titulo: string, h1: string, password: boolean }} p
 */
export function problemaDePagina({ titulo, h1, password }) {
  if (password) return 'pide contraseña'
  const texto = `${titulo} ${h1}`.toLowerCase()
  if (/\b404\b|not found|no encontrad|no existe|page could not be found/.test(texto)) return 'es un 404'
  if (/expir|ya no est[aá] disponible/.test(texto)) return 'está archivada'
  return null
}

/** @param {string} t */
const textoHtml = (t) =>
  t
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim()

/** Lo que mira problemaDePagina, sacado del HTML del servidor (para publicar sin Chromium). @param {string} html */
export function paginaDesdeHtml(html) {
  const titulo = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(html)?.[1] ?? ''
  const h1 = /<h1[^>]*>([\s\S]*?)<\/h1>/i.exec(html)?.[1] ?? ''
  return { titulo: textoHtml(titulo), h1: textoHtml(h1), password: /<input[^>]*type=["']?password/i.test(html) }
}

/** @param {Buffer | Uint8Array} datos */
export const hash8 = (datos) => createHash('sha256').update(datos).digest('hex').slice(0, 8)
