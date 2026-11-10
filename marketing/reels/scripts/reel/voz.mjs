// @ts-check
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { crearGemini, pcmAWav } from './gemini.mjs'
import { ffmpeg } from './medios.mjs'
import { palabrasDeCaracteres } from './tiempos.mjs'

/* ---------------------------------------------------------------------------
   La locución. Principal: ElevenLabs, siempre la misma voz por idioma (es la
   identidad de la cuenta), con tiempos por carácter que dan los tiempos por
   palabra sin transcribir. Respaldo: Gemini TTS si falta la key o ElevenLabs
   no tiene crédito; ahí los tiempos los pone la transcripción local.

   ElevenLabs se pide oración por oración (con previous_text/next_text para
   que la entonación siga siendo una sola lectura) y se une con silencios
   medidos: multilingual v2 ignora <break> con varias voces y, de corrido,
   las oraciones quedan pegadas y el cierre suena colgado.
--------------------------------------------------------------------------- */

export const BASE_ELEVEN = 'https://api.elevenlabs.io'
export const MODELO_ELEVEN = 'eleven_multilingual_v2'
// es: Malena (biblioteca compartida, acento argentino). en: Zara (americana, cálida y segura; social media).
export const VOCES_ELEVEN = { es: 'p7AwDmKvTdoHTBuueGvP', en: 'jqcCZkN6Knx8BJ5TBdYR' }
// Los de la v1 (el tono que eligió Manuel), iguales para todo el guion, CTA incluido.
export const AJUSTES_ELEVEN = { stability: 0.45, similarity_boost: 0.8, style: 0.3 }
export const FRECUENCIA = 44_100
// Silencio de voz a voz. Con ~0,5 s Manuel la sintió sin respirar (2026-10-07): entre oraciones va 0,8-0,9 s y en las comas una micro-pausa.
export const PAUSAS = { tras_hook: 0.85, entre: 0.8, pregunta: 0.85, antes_cta: 0.9, coma: 0.25, cola: 0.5 }
// Una inhalación real de Malena (eleven_v3, "[breathing heavily]"), 18 dB por debajo de la voz.
export const RESPIRACION = { archivo: new URL('./assets/respiracion-es.wav', import.meta.url), ganancia: 0.5 }
export const VOCES_GEMINI = { es: process.env.REEL_VOZ_GEMINI_ES || 'Kore', en: process.env.REEL_VOZ_GEMINI_EN || 'Aoede' }
export const ESTILO_GEMINI = {
  es: 'Leé esto en español con acento rioplatense de Argentina, cálido, con energía y ritmo ágil, como quien le muestra algo bueno a un amigo',
  en: 'Read this in warm, upbeat American English, with energy and a quick, natural pace, like showing a friend something great',
}

/** @param {number} ms */
const dormir = (ms) => new Promise((r) => setTimeout(r, ms))

/** @param {'es' | 'en'} idioma @param {Record<string, string | undefined>} env */
export function vozElegida(idioma, env) {
  if (env.ELEVENLABS_API_KEY?.trim()) {
    const propia = (idioma === 'es' ? env.ELEVENLABS_VOICE_ID_ES : env.ELEVENLABS_VOICE_ID_EN)?.trim()
    return { proveedor: /** @type {const} */ ('elevenlabs'), voz: propia || VOCES_ELEVEN[idioma] }
  }
  return { proveedor: /** @type {const} */ ('gemini'), voz: VOCES_GEMINI[idioma] }
}

/** ElevenLabs no puede (sin crédito, sin permiso, saturado o caído): se usa el respaldo. */
class SinEleven extends Error {}

/**
 * @param {{ texto: string, voz: string, clave: string, fetch: typeof fetch, espera: (ms: number) => Promise<unknown>, previo?: string, siguiente?: string, ajustes?: Record<string, number> }} p
 * @returns {Promise<{ audio: Buffer, palabras: import('./lib.mjs').Palabra[] }>}
 */
async function eleven({ texto, voz, clave, fetch: f, espera, previo = '', siguiente = '', ajustes = AJUSTES_ELEVEN }) {
  /** @type {string} */
  let ultimo = ''
  for (let intento = 0; intento < 3; intento++) {
    /** @type {Response} */
    let r
    try {
      r = await f(`${BASE_ELEVEN}/v1/text-to-speech/${encodeURIComponent(voz)}/with-timestamps?output_format=mp3_44100_128`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'xi-api-key': clave },
        body: JSON.stringify({
          text: texto,
          model_id: MODELO_ELEVEN,
          voice_settings: ajustes,
          ...(previo ? { previous_text: previo } : {}),
          ...(siguiente ? { next_text: siguiente } : {}),
        }),
        signal: AbortSignal.timeout(120_000),
      })
    } catch (e) {
      ultimo = `sin respuesta (${String(/** @type {Error} */ (e).message).slice(0, 80)})`
      await espera(3000 * (intento + 1))
      continue
    }
    const cuerpo = await r.text()
    if (r.ok) {
      const d = JSON.parse(cuerpo)
      if (!d?.audio_base64) throw new Error('ElevenLabs no devolvió audio')
      return { audio: Buffer.from(d.audio_base64, 'base64'), palabras: palabrasDeCaracteres(d.alignment) }
    }
    let estado = ''
    try {
      estado = String(JSON.parse(cuerpo)?.detail?.status ?? '')
    } catch {
      /* cuerpo no JSON */
    }
    ultimo = `HTTP ${r.status}${estado ? ` ${estado}` : ''}`
    if (r.status === 401 || r.status === 402 || /quota|credit|payment/i.test(estado)) throw new SinEleven(`ElevenLabs ${ultimo}`)
    if (r.status === 429 || r.status >= 500) {
      await espera(5000 * (intento + 1))
      continue
    }
    throw new Error(`ElevenLabs ${ultimo}`)
  }
  throw new SinEleven(`ElevenLabs ${ultimo}`)
}

/**
 * Oraciones de la locución, con su puntuación. Una oración de menos de 3
 * palabras se pega a la anterior: sola suena cortada.
 * @param {string} texto @returns {string[]}
 */
export function partirOraciones(texto) {
  const crudas = texto.replace(/\s+/g, ' ').trim().split(/(?<=[.!?…])\s+(?=[¿¡"“]?[\p{Lu}\p{N}])/u)
  /** @type {string[]} */
  const salida = []
  for (const o of crudas) {
    const palabras = o.split(' ').filter(Boolean).length
    if (salida.length && palabras < 3) salida[salida.length - 1] += ` ${o}`
    else salida.push(o)
  }
  return salida.filter(Boolean)
}

/**
 * Frases a sintetizar: cada oración y, adentro, sus comas cuando a los dos
 * lados quedan 3 palabras o más (una frase de 1-2 palabras sola suena cortada).
 * @param {string} texto @returns {{ texto: string, oracion: number, pausa: number }[]}
 */
export function partirFrases(texto) {
  const oraciones = partirOraciones(texto)
  /** @type {{ texto: string, oracion: number, pausa: number }[]} */
  const frases = []
  oraciones.forEach((o, i) => {
    const partes = o.split(/(?<=,)\s+/u)
    /** @type {string[]} */
    const juntas = []
    for (const p of partes) {
      const previa = juntas[juntas.length - 1]
      if (previa !== undefined && (previa.split(' ').length < 3 || p.split(' ').length < 3)) juntas[juntas.length - 1] = `${previa} ${p}`
      else juntas.push(p)
    }
    juntas.forEach((t, k) => frases.push({ texto: t, oracion: i, pausa: k < juntas.length - 1 ? PAUSAS.coma : pausaTras(i, oraciones.length, o) }))
  })
  return frases
}

/** Silencio después de la oración i (de n). @param {number} i @param {number} n @param {string} oracion */
export function pausaTras(i, n, oracion) {
  if (i === n - 1) return PAUSAS.cola
  if (i === n - 2) return PAUSAS.antes_cta
  if (i === 0) return PAUSAS.tras_hook
  return /\?$/.test(oracion.trim()) ? PAUSAS.pregunta : PAUSAS.entre
}

/**
 * Dónde empieza y termina la voz en un tramo PCM mono de 16 bits (ventanas de
 * 10 ms sobre −40 dBFS, el mismo umbral con que se miden las pausas) y dónde
 * cortar: con aire para el ataque y la caída. La alineación de ElevenLabs
 * suele terminar después de la voz real: sólo puede estirar el corte 80 ms.
 * @param {Int16Array} pcm @param {{ inicio: number, fin: number } | null} habla
 */
export function bordesDeVoz(pcm, habla, frecuencia = FRECUENCIA) {
  const ventana = Math.round(frecuencia * 0.01)
  const umbral = 32768 * 10 ** (-40 / 20)
  /** @type {number[]} */
  const fuertes = []
  for (let k = 0; k * ventana < pcm.length; k++) {
    let suma = 0
    const hasta = Math.min(pcm.length, (k + 1) * ventana)
    for (let j = k * ventana; j < hasta; j++) suma += (pcm[j] ?? 0) ** 2
    if (Math.sqrt(suma / Math.max(1, hasta - k * ventana)) > umbral) fuertes.push(k)
  }
  const dur = pcm.length / frecuencia
  const vozIni = fuertes.length ? (fuertes[0] ?? 0) * 0.01 : 0
  const vozFin = fuertes.length ? ((fuertes[fuertes.length - 1] ?? 0) + 1) * 0.01 : dur
  let ini = vozIni
  let fin = vozFin
  if (habla) {
    ini = Math.min(ini, Math.max(habla.inicio, vozIni - 0.08))
    fin = Math.max(fin, Math.min(habla.fin, vozFin + 0.08))
  }
  return { inicio: Math.max(0, ini - 0.03), fin: Math.min(dur, fin + 0.1), vozIni, vozFin }
}

/** @param {number} x */
const round3 = (x) => Math.round(x * 1000) / 1000

/**
 * Une los tramos y corre los tiempos de cada palabra según dónde quedó su
 * tramo. `pausa` es el silencio que se tiene que oír (de voz a voz), así que
 * al silencio insertado se le descuenta el aire que ya traen los cortes.
 * Fundidos cortos en los bordes para que no haya clicks.
 * Si el tramo trae `antes` (una respiración), va al final del silencio que
 * lo precede, pegada a la voz, sin cambiar la duración de la pausa.
 * @param {{ pcm: Int16Array, palabras: import('./lib.mjs').Palabra[], pausa: number, antes?: Int16Array | null }[]} tramos
 * @returns {{ pcm: Int16Array, palabras: import('./lib.mjs').Palabra[] }}
 */
export function unirTramos(tramos, frecuencia = FRECUENCIA) {
  const bordes = tramos.map((tr) => {
    const primera = tr.palabras[0]
    const ultima = tr.palabras[tr.palabras.length - 1]
    return bordesDeVoz(tr.pcm, primera && ultima ? { inicio: primera.inicio, fin: ultima.fin } : null, frecuencia)
  })
  /** @type {Int16Array[]} */
  const partes = []
  /** @type {import('./lib.mjs').Palabra[]} */
  const palabras = []
  let t = 0
  tramos.forEach((tr, i) => {
    const b = /** @type {ReturnType<typeof bordesDeVoz>} */ (bordes[i])
    const sig = bordes[i + 1]
    const recorte = Int16Array.from(tr.pcm.subarray(Math.round(b.inicio * frecuencia), Math.round(b.fin * frecuencia)))
    const entra = Math.min(recorte.length, Math.round(frecuencia * 0.008))
    const sale = Math.min(recorte.length, Math.round(frecuencia * 0.04))
    for (let j = 0; j < entra; j++) recorte[j] = Math.round((recorte[j] ?? 0) * (j / entra))
    for (let j = 0; j < sale; j++) {
      const k = recorte.length - 1 - j
      recorte[k] = Math.round((recorte[k] ?? 0) * (j / sale))
    }
    const largo = recorte.length / frecuencia
    for (const p of tr.palabras) {
      const inicio = Math.min(largo, Math.max(0, p.inicio - b.inicio))
      palabras.push({ texto: p.texto, inicio: round3(t + inicio), fin: round3(t + Math.min(largo, Math.max(inicio, p.fin - b.inicio))) })
    }
    const aire = b.fin - b.vozFin + (sig ? sig.vozIni - sig.inicio : 0)
    const silencio = new Int16Array(Math.round(Math.max(0.04, tr.pausa - aire) * frecuencia))
    const antes = tramos[i + 1]?.antes
    if (antes && silencio.length >= antes.length + Math.round(0.12 * frecuencia)) silencio.set(antes, silencio.length - antes.length - Math.round(0.04 * frecuencia))
    partes.push(recorte, silencio)
    t += (recorte.length + silencio.length) / frecuencia
  })
  const total = new Int16Array(partes.reduce((a, x) => a + x.length, 0))
  let k = 0
  for (const x of partes) {
    total.set(x, k)
    k += x.length
  }
  return { pcm: total, palabras }
}

/**
 * El TTS a veces deja un hueco largo adentro de una oración o entre dos: todo
 * silencio (muestras bajo −40 dBFS, como lo mide silencedetect) de más de
 * `max` s se acorta a `max` sacándole el centro, y se corren las palabras
 * que vienen después. La cola final no se toca.
 * @param {{ pcm: Int16Array, palabras: import('./lib.mjs').Palabra[] }} u
 */
export function acortarSilencios({ pcm, palabras }, max = Math.max(PAUSAS.tras_hook, PAUSAS.entre, PAUSAS.pregunta, PAUSAS.antes_cta) + 0.05, frecuencia = FRECUENCIA) {
  const umbral = 32768 * 10 ** (-40 / 20)
  const largo = Math.round(max * frecuencia)
  /** @type {{ desde: number, cuanto: number }[]} */
  const cortes = []
  let inicio = -1
  for (let k = 0; k < pcm.length; k++) {
    const callado = Math.abs(pcm[k] ?? 0) < umbral
    if (callado && inicio < 0) inicio = k
    if (!callado && inicio >= 0) {
      if (inicio > 0 && k - inicio > largo) cortes.push({ desde: inicio + Math.round(largo / 2), cuanto: k - inicio - largo })
      inicio = -1
    }
  }
  if (!cortes.length) return { pcm, palabras }
  const salida = new Int16Array(pcm.length - cortes.reduce((x, c) => x + c.cuanto, 0))
  let leido = 0
  let escrito = 0
  for (const c of cortes) {
    salida.set(pcm.subarray(leido, c.desde), escrito)
    escrito += c.desde - leido
    leido = c.desde + c.cuanto
  }
  salida.set(pcm.subarray(leido), escrito)
  const corrido = (/** @type {number} */ t) => t - cortes.filter((c) => c.desde / frecuencia < t).reduce((x, c) => x + c.cuanto, 0) / frecuencia
  return { pcm: salida, palabras: palabras.map((w) => ({ texto: w.texto, inicio: round3(corrido(w.inicio)), fin: round3(corrido(w.fin)) })) }
}

/** La respiración del asset (WAV PCM 16 bits mono 44,1 kHz) con su ganancia. */
export function leerRespiracion() {
  const b = readFileSync(RESPIRACION.archivo)
  const datos = b.indexOf('data') + 8
  const pcm = new Int16Array(Math.floor((b.length - datos) / 2))
  for (let k = 0; k < pcm.length; k++) pcm[k] = Math.round(b.readInt16LE(datos + k * 2) * RESPIRACION.ganancia)
  return pcm
}

/** mp3 → PCM mono 16 bits a 44,1 kHz. @param {Buffer} mp3 @returns {Promise<Int16Array>} */
export async function decodificarMp3(mp3) {
  const dir = mkdtempSync(join(tmpdir(), 'voz-'))
  try {
    writeFileSync(join(dir, 'in.mp3'), mp3)
    await ffmpeg(['-loglevel', 'error', '-i', join(dir, 'in.mp3'), '-ac', '1', '-ar', String(FRECUENCIA), '-f', 's16le', join(dir, 'out.raw')])
    const b = readFileSync(join(dir, 'out.raw'))
    const copia = new Uint8Array(b.length - (b.length % 2))
    copia.set(b.subarray(0, copia.length))
    return new Int16Array(copia.buffer)
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}

/**
 * @param {{ texto: string, voz: string, clave: string, fetch: typeof fetch, espera: (ms: number) => Promise<unknown>, decodificar: (mp3: Buffer) => Promise<Int16Array>, respiracion?: Int16Array | null }} p
 */
async function elevenPorOraciones({ texto, voz, clave, fetch: f, espera, decodificar, respiracion = null }) {
  const frases = partirFrases(texto)
  const n = (frases[frases.length - 1]?.oracion ?? 0) + 1
  const tramos = []
  for (let i = 0; i < frases.length; i++) {
    const fr = /** @type {{ texto: string, oracion: number, pausa: number }} */ (frases[i])
    const r = await eleven({
      texto: fr.texto,
      voz,
      clave,
      fetch: f,
      espera,
      previo: frases.slice(Math.max(0, i - 2), i).map((x) => x.texto).join(' '),
      siguiente: frases.slice(i + 1, i + 3).map((x) => x.texto).join(' '),
      ajustes: AJUSTES_ELEVEN,
    })
    const abreOracion = i > 0 && frases[i - 1]?.oracion !== fr.oracion
    const respira = respiracion && abreOracion && (fr.oracion % 2 === 1 || fr.oracion === n - 1)
    tramos.push({ pcm: await decodificar(r.audio), palabras: r.palabras, pausa: fr.pausa, antes: respira ? respiracion : null })
  }
  const u = acortarSilencios(unirTramos(tramos))
  return { audio: pcmAWav(Buffer.from(u.pcm.buffer, u.pcm.byteOffset, u.pcm.byteLength), FRECUENCIA), palabras: u.palabras }
}

/**
 * `respirar`: suma la inhalación de Malena antes de una oración de cada dos y del CTA (sólo con su voz).
 * @param {{ texto: string, idioma: 'es' | 'en', env?: Record<string, string | undefined>, fetch?: typeof fetch, espera?: (ms: number) => Promise<unknown>, log?: (m: string) => void, decodificar?: (mp3: Buffer) => Promise<Int16Array>, respirar?: boolean }} p
 * @returns {Promise<{ audio: Buffer, formato: 'wav', proveedor: 'elevenlabs' | 'gemini', voz: string, palabras: import('./lib.mjs').Palabra[] | null }>}
 */
export async function generarVoz({ texto, idioma, env = process.env, fetch: f = fetch, espera = dormir, log = () => {}, decodificar = decodificarMp3, respirar = false }) {
  const elegida = vozElegida(idioma, env)
  if (elegida.proveedor === 'elevenlabs') {
    try {
      const respiracion = respirar && idioma === 'es' && elegida.voz === VOCES_ELEVEN.es ? leerRespiracion() : null
      const r = await elevenPorOraciones({ texto, voz: elegida.voz, clave: /** @type {string} */ (env.ELEVENLABS_API_KEY).trim(), fetch: f, espera, decodificar, respiracion })
      return { audio: r.audio, formato: 'wav', proveedor: 'elevenlabs', voz: elegida.voz, palabras: r.palabras }
    } catch (e) {
      if (!(e instanceof SinEleven)) throw e
      log(`${e.message}: voz de respaldo con Gemini`)
    }
  }
  const voz = VOCES_GEMINI[idioma]
  const gemini = crearGemini({ clave: env.GEMINI_API_KEY?.trim(), fetch: f, espera })
  return { audio: await gemini.tts({ texto, voz, estilo: ESTILO_GEMINI[idioma] }), formato: 'wav', proveedor: 'gemini', voz, palabras: null }
}
