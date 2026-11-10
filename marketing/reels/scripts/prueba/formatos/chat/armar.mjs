// @ts-check
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { contraste, copiarAssets, cssComun, escribirDatos, fondoHtml, paleta, rellenar, sfxHtml, validarBase } from '../_comun/index.mjs'

const AQUI = dirname(fileURLToPath(import.meta.url))
const PLANTILLA = join(AQUI, 'plantilla', 'index.html')

// Tiempos de la comedia: lo que tarda en leerse cada mensaje (pedido de Manuel: ≈ 0,9 s + 0,045 s por carácter).
export const LECTURA = { base: 0.9, por_caracter: 0.045 }
export const TOPE_CUERPO_S = 26
const COLA_QUIETA = 0.3

/** @param {string} hex */
const rgb = (hex) => {
  const h = hex.replace('#', '')
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16))
}
/** @param {number[]} c */
const ahex = (c) => '#' + c.map((x) => Math.round(Math.max(0, Math.min(255, x))).toString(16).padStart(2, '0')).join('')
/** @param {string} a @param {string} b @param {number} t */
export const mezclarColor = (a, b, t) => {
  const x = rgb(a)
  const y = rgb(b)
  return ahex(x.map((v, i) => v + ((y[i] ?? 0) - v) * t))
}
/** Los colores del teléfono, derivados de la paleta. @param {string} clave */
export function coloresChat(clave) {
  const p = paleta(clave)
  const oscuro = p.oscura
  const separa = contraste(p.acento, p.superficie) >= 3 && contraste(p.acento, p.fondo) >= 3
  return {
    oscuro,
    acento: p.acento,
    acento_tinta: p.sobreAcento,
    acento_texto: separa ? p.acento : p.tinta,
    pantalla: oscuro ? mezclarColor(p.fondo, '#000000', 0.18) : mezclarColor(p.fondo, p.superficie, 0.2),
    cabecera: oscuro ? p.superficie : p.superficie,
    burbuja: oscuro ? mezclarColor(p.superficie, p.tinta, 0.07) : p.superficie,
    campo: oscuro ? mezclarColor(p.superficie, p.tinta, 0.1) : p.superficie,
    teclado: oscuro ? mezclarColor(p.fondo, p.tinta, 0.04) : mezclarColor(p.fondo, p.tinta, 0.05),
    tecla: oscuro ? mezclarColor(p.superficie, p.tinta, 0.1) : p.superficie,
    avatar: mezclarColor(p.superficie, p.acento, oscuro ? 0.22 : 0.18),
  }
}

/** @param {string} s */
const palabras = (s) => s.trim().split(/\s+/).filter(Boolean)
/** @param {number} x @param {number} a @param {number} b */
const entre = (x, a, b) => Math.min(b, Math.max(a, x))
/** @param {number} x */
const r3 = (x) => Math.round(x * 1000) / 1000

const PRECIO = /\$\s?\d|\d[\d.]*\s?(pesos|lucas|usd|d[oó]lares|mil\b)/i
const CHE = /(^|[^\p{L}])che([^\p{L}]|$)/iu

/**
 * Lo común del guion (todas las piezas lo validan igual) + lo propio de chat.
 * @param {any} guion @returns {string[]}
 */
export function validar(guion) {
  const mal = validarBase(guion, 'chat')
  if (!guion || typeof guion !== 'object') return mal
  if (Array.isArray(guion.captions) && guion.captions.some((/** @type {unknown} */ c) => typeof c === 'string' && /calcular\s*(\.|punto)\s*ar/i.test(c))) mal.push('captions trae el cierre con calcular.ar (lo pone el pipeline)')
  const c = guion.contenido
  if (!c || typeof c !== 'object') return mal
  if (typeof c.contacto !== 'string' || !c.contacto.trim() || c.contacto.length > 24) mal.push('contenido.contacto: 1 a 24 caracteres')
  if (!Array.isArray(c.mensajes) || c.mensajes.length < 5 || c.mensajes.length > 9) mal.push('contenido.mensajes: 5 a 9')
  else {
    c.mensajes.forEach((/** @type {any} */ m, /** @type {number} */ i) => {
      if (!m || !['ellos', 'yo'].includes(m.de)) mal.push(`mensajes[${i}].de: "ellos" o "yo"`)
      if (!m || typeof m.texto !== 'string' || !m.texto.trim() || m.texto.length > 90) mal.push(`mensajes[${i}].texto: 1 a 90 caracteres`)
    })
    const de = new Set(c.mensajes.map((/** @type {any} */ m) => m?.de))
    if (!de.has('ellos') || !de.has('yo')) mal.push('el chat necesita mensajes de los dos lados')
  }
  if (c.remate !== null && (typeof c.remate !== 'string' || !c.remate.trim() || c.remate.length > 60)) mal.push('contenido.remate: 1 a 60 caracteres, o null')

  const textos = [...(guion.hooks ?? []), ...(Array.isArray(c.mensajes) ? c.mensajes.map((/** @type {any} */ m) => m?.texto) : []), c.remate, ...(guion.captions ?? [])].filter((t) => typeof t === 'string')
  if (!mal.some((m) => m.startsWith('sin precios')) && textos.some((t) => PRECIO.test(t))) mal.push('sin precios: cambian y los reels quedan')
  if (textos.some((t) => CHE.test(t))) mal.push('aparece "che": voseo natural, sin "che"')

  if (!mal.length) {
    const d = planificar(guion, 0).duracion
    if (d > TOPE_CUERPO_S) mal.push(`el chat dura ${d.toFixed(1)} s y el tope del cuerpo es ${TOPE_CUERPO_S} s: acortá mensajes o sacá alguno`)
  }
  return mal
}

/**
 * Los tiempos de la conversación. Cada mensaje se lee ≥ LECTURA desde que cae; mientras, del otro
 * lado ya están escribiendo. El último "ellos" duda (escribe, para, vuelve): es el golpe de la comedia.
 * @param {any} guion @param {number} hook
 */
export function planificar(guion, hook) {
  const c = guion.contenido
  /** @type {any[]} */
  const mensajes = []
  const ultimoEllos = c.mensajes.map((/** @type {any} */ m) => m.de).lastIndexOf('ellos')
  let previo = null
  for (const [i, m] of c.mensajes.entries()) {
    const n = m.texto.length
    const lectura = LECTURA.base + LECTURA.por_caracter * n
    const escribir = m.de === 'ellos' ? entre(0.55 + 0.01 * n, 0.6, 1.2) : entre(0.25 + 0.016 * n, 0.5, 1.4)
    const duda = m.de === 'ellos' && i === ultimoEllos && i >= 2 ? { escribe: 0.85, calla: 0.6 } : null
    const extra = duda ? duda.escribe + duda.calla : 0
    let desde
    if (!previo) desde = 0
    else {
      const solapa = m.de === 'ellos' ? escribir + extra : 0.6 * escribir
      desde = Math.max(previo.llega + 0.45, previo.llega + previo.lectura - solapa)
    }
    const llega = desde + extra + escribir
    const item = {
      de: m.de,
      texto: m.texto.trim(),
      desde: r3(desde),
      escribe: r3(desde + extra),
      llega: r3(llega),
      lectura: r3(lectura),
      duda: duda ? { aparece: r3(desde), calla: r3(desde + duda.escribe), vuelve: r3(desde + extra) } : null,
    }
    mensajes.push(item)
    previo = item
  }
  const ultimo = mensajes[mensajes.length - 1]
  const finChat = ultimo.llega + ultimo.lectura
  let remate = null
  let duracion
  if (c.remate) {
    const t = finChat + 0.2
    const n = palabras(c.remate).length
    const sostiene = Math.max(1.4, 0.5 + 0.25 * n)
    remate = { texto: c.remate.trim(), t: r3(t), golpe: r3(t + 0.38) }
    duracion = t + 0.38 + 0.5 + sostiene + COLA_QUIETA
  } else {
    duracion = finChat + 0.4 + COLA_QUIETA
  }
  return {
    duracion: r3(Math.ceil(duracion * 30) / 30),
    hook: String(guion.hooks[hook]).trim(),
    contacto: c.contacto.trim(),
    mensajes,
    remate,
  }
}

/**
 * Los sfx en el cuadro de su causa: pop cuando cae un mensaje de ellos, teclas suaves mientras
 * escribo (tres como mucho), el envío cuando se manda y un golpe grave con el remate.
 * @param {ReturnType<typeof planificar>} plan
 */
export function eventosDeSonido(plan) {
  /** @type {{ tipo: 'pop' | 'click-soft' | 'whoosh-short' | 'impact-bass-1', t: number, volumen: number }[]} */
  const ev = []
  // Medidos sobre los archivos: pop −24, envío −21, teclas −38 y golpe −17 LUFS momentáneos, debajo de una voz a −16/−14.
  const vol = [1, 0.88, 1.1]
  let k = 0
  for (const m of plan.mensajes) {
    if (m.de === 'ellos') ev.push({ tipo: 'pop', t: m.llega, volumen: 0.7 * (vol[k++ % vol.length] ?? 1) })
    else {
      const ps = palabras(m.texto)
      const paso = (m.llega - m.escribe - 0.1) / ps.length
      const cada = Math.max(1, Math.ceil(ps.length / 3))
      for (let j = 0; j < ps.length; j += cada) ev.push({ tipo: 'click-soft', t: m.escribe + j * paso, volumen: 0.25 })
      ev.push({ tipo: 'whoosh-short', t: m.llega - 0.04, volumen: 0.5 * (vol[k++ % vol.length] ?? 1) })
    }
  }
  if (plan.remate) ev.push({ tipo: 'impact-bass-1', t: plan.remate.golpe, volumen: 0.24 })
  return ev
}

/**
 * @param {{ guion: any, hook: 0|1|2, voz: null, salida: string }} p
 * @returns {Promise<{ duracion_s: number }>}
 */
export async function armar({ guion, hook, salida }) {
  const problemas = validar(guion)
  if (problemas.length) throw new Error(`guion de chat inválido:\n- ${problemas.join('\n- ')}`)
  if (![0, 1, 2].includes(hook)) throw new Error('hook tiene que ser 0, 1 o 2')
  const dir = resolve(salida)
  if (existsSync(dir) && readdirSync(dir).length) throw new Error(`la salida no está vacía: ${dir}`)
  mkdirSync(dir, { recursive: true })

  const plan = planificar(guion, hook)
  copiarAssets(dir)
  escribirDatos(dir, { ...plan, colores: coloresChat(guion.paleta) })
  const html = rellenar(readFileSync(PLANTILLA, 'utf8'), {
    css: cssComun(guion.paleta),
    fondo: fondoHtml(),
    audio: sfxHtml(eventosDeSonido(plan), plan.duracion),
    duracion: plan.duracion.toFixed(3),
  })
  writeFileSync(join(dir, 'index.html'), html)
  return { duracion_s: plan.duracion }
}
