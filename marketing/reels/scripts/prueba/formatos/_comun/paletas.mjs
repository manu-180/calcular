// @ts-check

/** @typedef {'papel' | 'selva' | 'noche' | 'menta' | 'pizarra'} ClavePaleta */
/** @typedef {{ fondo: string, superficie: string, tinta: string, tenue: string, acento: string }} Base */

/** La marca de calcular.ar (esmeralda #059669 a #34D399, verde profundo #022C22, papel #FAFAF9, zinc). Las del contrato (`marketing/reels/scripts/prueba/CONTRATO.md` § Paletas). Mismos nombres en todos los formatos y en el cierre. */
/** @type {Record<ClavePaleta, Base>} */
export const PALETAS = {
  papel: { fondo: '#FAFAF9', superficie: '#FFFFFF', tinta: '#18181B', tenue: '#71717A', acento: '#059669' },
  selva: { fondo: '#022C22', superficie: '#064E3B', tinta: '#ECFDF5', tenue: '#9CC9B6', acento: '#34D399' },
  noche: { fondo: '#0B0F0E', superficie: '#151B19', tinta: '#F4F4F1', tenue: '#9AA39F', acento: '#34D399' },
  menta: { fondo: '#ECFDF5', superficie: '#FFFFFF', tinta: '#052E26', tenue: '#4D6E63', acento: '#047857' },
  pizarra: { fondo: '#18181B', superficie: '#232327', tinta: '#FAFAF9', tenue: '#A1A1AA', acento: '#6EE7B7' },
}

export const CLAVES_PALETA = /** @type {ClavePaleta[]} */ (Object.keys(PALETAS))

const NEGRO = '#0c0c0e'
const BLANCO = '#ffffff'

/** @param {string} hex */
function rgb(hex) {
  const n = Number.parseInt(hex.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

/** Luminancia relativa WCAG. @param {string} hex */
export function luminancia(hex) {
  const [r, g, b] = rgb(hex).map((c) => {
    const v = c / 255
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * /** @type {number} */ (r) + 0.7152 * /** @type {number} */ (g) + 0.0722 * /** @type {number} */ (b)
}

/** @param {string} a @param {string} b */
export function contraste(a, b) {
  const [x, y] = [luminancia(a), luminancia(b)].sort((m, n) => n - m)
  return (/** @type {number} */ (x) + 0.05) / (/** @type {number} */ (y) + 0.05)
}

/** @param {string} hex @param {number} alfa */
export function rgba(hex, alfa) {
  const [r, g, b] = rgb(hex)
  return `rgba(${r},${g},${b},${alfa})`
}

/** La tinta (casi negro o blanco) que más contrasta sobre un color. @param {string} hex */
export function tintaSobre(hex) {
  return contraste(hex, BLANCO) >= contraste(hex, NEGRO) ? BLANCO : NEGRO
}

/**
 * Resaltador de la palabra activa (skill `subtitulos-premium` § 4): el acento si tiene
 * saturación ≥ 0,3, luminosidad 0,22–0,82, ≥ 4,5:1 con su tinta y ≥ 3:1 contra el fondo
 * real; si no, el neutro del tono.
 * @param {Base} p
 */
export function resalteDe(p) {
  const oscura = luminancia(p.fondo) < 0.25
  const neutro = oscura ? { fondo: '#f5f3ee', tinta: NEGRO } : { fondo: '#141210', tinta: BLANCO }
  const [r, g, b] = rgb(p.acento).map((c) => c / 255)
  const max = Math.max(/** @type {number} */ (r), /** @type {number} */ (g), /** @type {number} */ (b))
  const min = Math.min(/** @type {number} */ (r), /** @type {number} */ (g), /** @type {number} */ (b))
  const l = (max + min) / 2
  const s = max === min ? 0 : (max - min) / (1 - Math.abs(2 * l - 1))
  if (s < 0.3 || l < 0.22 || l > 0.82) return neutro
  const tinta = tintaSobre(p.acento)
  if (contraste(p.acento, tinta) < 4.5 || contraste(p.acento, p.fondo) < 3) return neutro
  return { fondo: p.acento.toLowerCase(), tinta }
}

/**
 * La paleta completa, con lo que se deriva de ella.
 * @param {string} clave
 */
export function paleta(clave) {
  const base = PALETAS[/** @type {ClavePaleta} */ (clave)]
  if (!base) throw new Error(`paleta desconocida: ${clave} (hay ${CLAVES_PALETA.join(', ')})`)
  const oscura = luminancia(base.fondo) < 0.25
  return {
    clave,
    ...base,
    oscura,
    /** tono del subtítulo: 'oscuro' = fondo oscuro, tinta clara con trazo; 'claro' = al revés */
    tono: /** @type {'claro' | 'oscuro'} */ (oscura ? 'oscuro' : 'claro'),
    sobreAcento: tintaSobre(base.acento),
    resalte: resalteDe(base),
  }
}

/**
 * Las variables CSS de una paleta, para el `:root` de una plantilla.
 * --fondo --superficie --tinta --tenue --acento: las del contrato.
 * --sobre-acento: texto encima del acento. --resalte / --resalte-tinta: palabra activa del subtítulo.
 * --linea: filetes y grilla. --sombra-1 / --sombra-2: sombras neutras (nunca del acento).
 * --luz: la luz del fondo. --vineta: el borde del fondo.
 * @param {string} clave
 */
export function cssPaleta(clave) {
  const p = paleta(clave)
  const vars = {
    '--fondo': p.fondo,
    '--superficie': p.superficie,
    '--tinta': p.tinta,
    '--tenue': p.tenue,
    '--acento': p.acento,
    '--sobre-acento': p.sobreAcento,
    '--resalte': p.resalte.fondo,
    '--resalte-tinta': p.resalte.tinta,
    '--linea': rgba(p.tinta, p.oscura ? 0.07 : 0.08),
    '--linea-fuerte': rgba(p.tinta, p.oscura ? 0.16 : 0.18),
    '--sombra-1': p.oscura ? 'rgba(0,0,0,0.42)' : 'rgba(20,16,12,0.10)',
    '--sombra-2': p.oscura ? 'rgba(0,0,0,0.28)' : 'rgba(20,16,12,0.07)',
    '--luz': p.oscura ? 'rgba(255,255,255,0.075)' : 'rgba(255,255,255,0.62)',
    '--vineta': p.oscura ? 'rgba(0,0,0,0.55)' : 'rgba(60,44,28,0.16)',
    '--grano': p.oscura ? '0.5' : '0.42',
  }
  return `:root{${Object.entries(vars).map(([k, v]) => `${k}:${v}`).join(';')}}`
}
