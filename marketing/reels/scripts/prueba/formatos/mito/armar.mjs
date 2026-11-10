// @ts-check
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  FPS, buscarFrase, copiarAssets, copiarVoz, cssComun, escribirDatos, fondoHtml, gruposDeVoz, paleta,
  palabrasDe, palabrasDelHook, rellenar, sfxHtml, tokens, validarBase, vozHtml,
} from '../_comun/index.mjs'

const AQUI = dirname(fileURLToPath(import.meta.url))
const PLANTILLA = join(AQUI, 'plantilla.html')
/** Lo que tarda el empuje de una tarjeta a la siguiente (la cámara corre a la izquierda). */
const EMPUJE = 0.72
const GIRO = 0.62
const QUIETO_FINAL = 0.3

/** @param {unknown} v @returns {v is string} */
const esTexto = (v) => typeof v === 'string' && v.trim().length > 0

/** El texto de la voz como palabras con tiempos falsos (uno por palabra), para buscar frases sin audio. @param {string} voz */
const palabrasDeTexto = (voz) => voz.split(/\s+/).filter(Boolean).map((texto, k) => ({ texto, inicio: k, fin: k + 0.5 }))

/**
 * @param {any} guion
 * @returns {string[]} problemas; vacío = válido
 */
export function validar(guion) {
  const p = validarBase(guion, 'mito')
  const t = guion?.contenido?.tarjetas
  if (!Array.isArray(t) || t.length < 2 || t.length > 3) {
    p.push('contenido.tarjetas: 2 o 3')
    return p
  }
  t.forEach((c, i) => {
    if (!c || typeof c !== 'object') return p.push(`tarjetas[${i}] no es un objeto`)
    if (!esTexto(c.mito) || c.mito.length > 60) p.push(`tarjetas[${i}].mito: texto de 1 a 60 caracteres`)
    if (!esTexto(c.realidad) || c.realidad.length > 80) p.push(`tarjetas[${i}].realidad: texto de 1 a 80 caracteres`)
    if (esTexto(c.mito) && tokens(c.mito).length < 2) p.push(`tarjetas[${i}].mito: al menos 2 palabras`)
  })
  if (p.length || !esTexto(guion.voz)) return p
  // Cada tarjeta entra cuando la voz dice su mito: la voz tiene que decirlos, en orden.
  const dichas = palabrasDeTexto(guion.voz)
  let desde_i = 0
  t.forEach((c, i) => {
    const m = buscarFrase(dichas, c.mito, { desde_i })
    if (!m) p.push(`la voz no dice el mito de tarjetas[${i}] ("${c.mito}") o no va en orden`)
    else desde_i = m.j + 1
  })
  return p
}

/** @param {number} t */
const cuadro = (t) => Math.round(t * FPS) / FPS
const r3 = (/** @type {number} */ x) => Math.round(x * 1000) / 1000

/**
 * Tiempo en que se enciende cada palabra de un texto en pantalla, repartiendo las palabras
 * dichas del tramo [i, j] (pueden no ser exactamente las mismas).
 * @param {string} texto @param {{ inicio: number }[]} palabras @param {{ i: number, j: number }} tramo
 */
function encendidos(texto, palabras, tramo) {
  const enPantalla = texto.split(/\s+/).filter(Boolean)
  const n = tramo.j - tramo.i + 1
  return enPantalla.map((_, k) => r3(/** @type {{ inicio: number }} */ (palabras[tramo.i + Math.min(n - 1, Math.floor((k * n) / enPantalla.length))]).inicio))
}

/**
 * @param {{ guion: any, hook: 0 | 1 | 2, voz: { wav: string, duracion_s: number, palabras: { texto: string, inicio_s: number, fin_s: number }[] } | null, salida: string }} p
 * @returns {Promise<{ duracion_s: number }>}
 */
export async function armar({ guion, hook, voz, salida }) {
  const problemas = validar(guion)
  if (problemas.length) throw new Error(`guion inválido para mito: ${problemas.join('; ')}`)
  if (!voz || !voz.wav) throw new Error('mito necesita voz')
  const textoHook = String(guion.hooks[hook] ?? guion.hooks[0]).trim()
  const palabras = palabrasDe(voz.palabras)
  if (!palabras.length) throw new Error('voz.palabras vacío')

  mkdirSync(salida, { recursive: true })
  copiarAssets(salida)
  copiarVoz(voz.wav, salida)
  const pal = paleta(guion.paleta)

  const ultima = /** @type {{ fin: number }} */ (palabras[palabras.length - 1])
  const duracion = Math.ceil((ultima.fin + 0.35 + QUIETO_FINAL) * FPS) / FPS
  const nHook = palabrasDelHook(palabras, textoHook)
  const finHook = nHook ? /** @type {{ fin: number }} */ (palabras[nHook - 1]).fin : 1.2

  // Dónde dice la voz cada mito y cada realidad. Si no encuentra un mito (no debería: validar lo
  // exige) reparte las tarjetas en partes iguales del cuerpo.
  const cuerpo0 = nHook ? /** @type {{ inicio: number }} */ (palabras[nHook]).inicio : 1.5
  const tramoCuerpo = Math.max(3, ultima.fin - cuerpo0)
  /** @type {Set<number>} */
  const leidas = new Set()
  let desde_i = nHook
  /** @type {{ mito: string, realidad: string }[]} */
  const lista = guion.contenido.tarjetas
  const crudas = lista.map((c, k, todas) => {
    const m = buscarFrase(palabras, c.mito, { desde_i })
    if (m) desde_i = m.j + 1
    const siguiente = todas[k + 1] ? buscarFrase(palabras, todas[k + 1].mito, { desde_i }) : null
    const r = buscarFrase(palabras, c.realidad, { desde_i, hasta_s: siguiente ? siguiente.inicio : Infinity })
    if (r) desde_i = r.j + 1
    return { c, m, r }
  })
  const n = crudas.length
  const tarjetas = crudas.map(({ c, m, r }, k) => {
    const base = cuerpo0 + (tramoCuerpo * k) / n
    const mito = m ?? { i: -1, j: -1, inicio: base + 0.2, fin: base + tramoCuerpo / n * 0.45 }
    if (m) for (let x = m.i; x <= m.j; x++) leidas.add(x)
    if (r) for (let x = r.i; x <= r.j; x++) leidas.add(x)
    const tacha = mito.fin + 0.1
    const gira = r ? Math.max(tacha + 0.42, r.inicio - GIRO * 0.85) : tacha + 0.5
    return {
      mito: c.mito.trim(),
      realidad: c.realidad.trim(),
      inicioMito: mito.inicio,
      lucesMito: m ? encendidos(c.mito, palabras, m) : null,
      tacha: r3(tacha),
      gira: r3(gira),
      lucesRealidad: r ? encendidos(c.realidad, palabras, r) : null,
      finLectura: r ? r.fin : gira + GIRO + 0.6,
      entra: 0,
    }
  })
  tarjetas.forEach((t, k) => {
    const previo = k === 0 ? finHook + 0.05 : /** @type {{ finLectura: number }} */ (tarjetas[k - 1]).finLectura + 0.12
    t.entra = r3(Math.max(previo, t.inicioMito - EMPUJE * 0.85))
  })

  const { grupos } = gruposDeVoz(voz.palabras, { hook: textoHook, hasta: duracion - QUIETO_FINAL, excluir: leidas })
  const hookGrupo = grupos.find((g) => g.hook) ?? {
    hook: true, inicio: 0, fin: tarjetas[0]?.entra ?? 1.5, resaltar: false,
    palabras: textoHook.split(/\s+/).map((texto) => ({ texto, inicio: 0, fin: 0 })),
  }
  const subs = grupos.filter((g) => !g.hook)
  Object.assign(hookGrupo, { salida: 'ninguna', alinear: 'izq', izquierda: 110, ancho: 850, arriba: 700, tam: 136, piso: 92 })

  const ultimaT = /** @type {(typeof tarjetas)[number]} */ (tarjetas[n - 1])
  const tPunch = r3(ultimaT.gira + GIRO + 0.05)
  const punch = tPunch + 0.6 <= duracion - QUIETO_FINAL ? tPunch : null

  /** @type {{ tipo: 'whoosh-short' | 'whoosh-cinematic', t: number, volumen: number, prioridad: number }[]} */
  const candidatos = []
  tarjetas.forEach((t, k) => {
    candidatos.push({ tipo: 'whoosh-cinematic', t: t.entra + EMPUJE / 2, volumen: 0.32, prioridad: k === 0 ? 3 : 1 })
    candidatos.push({ tipo: 'whoosh-short', t: t.gira + GIRO / 2, volumen: 0.42, prioridad: 2 })
  })
  const sfx = candidatos.sort((a, b) => b.prioridad - a.prioridad).slice(0, 5).sort((a, b) => a.t - b.t)

  escribirDatos(salida, {
    duracion,
    tono: pal.tono,
    resalte: pal.resalte,
    tinta: pal.tinta,
    colores: { tinta: pal.tinta, tenue: pal.tenue, acento: pal.acento, sobreAcento: pal.sobreAcento },
    empuje: EMPUJE,
    giro: GIRO,
    hook: hookGrupo,
    grupos: subs,
    tarjetas: tarjetas.map(({ mito, realidad, lucesMito, lucesRealidad, tacha, gira, entra }) => ({ mito, realidad, lucesMito, lucesRealidad, tacha, gira, entra })),
    punch,
  })
  const html = rellenar(readFileSync(PLANTILLA, 'utf8'), {
    css: cssComun(guion.paleta),
    fondo: fondoHtml(),
    duracion: duracion.toFixed(3),
    audio: [vozHtml(Math.min(voz.duracion_s, duracion)), sfxHtml(sfx, duracion)].join('\n'),
  })
  writeFileSync(join(salida, 'index.html'), html)
  return { duracion_s: r3(cuadro(duracion)) }
}
