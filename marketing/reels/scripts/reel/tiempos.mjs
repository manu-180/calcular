// @ts-check
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { palabrasDeSegmentos, palabrasPorSilencios, tramosConVoz } from './lib.mjs'
import { correr } from './medios.mjs'

/* ---------------------------------------------------------------------------
   Tiempos por palabra de la locución, del mejor al peor: la alineación por
   carácter de ElevenLabs; faster-whisper local (voz de respaldo); segmentos
   de whisper repartidos por largo; frases sobre los silencios de ffmpeg.
--------------------------------------------------------------------------- */

const AQUI = dirname(fileURLToPath(import.meta.url))
const PYTHON = process.env.REEL_PYTHON || (process.platform === 'win32' ? 'python' : 'python3')
const MODELO_WHISPER = process.env.REEL_WHISPER_MODELO || 'small'

/**
 * Palabras desde la alineación por carácter de ElevenLabs: cortan los
 * espacios y saltos; la puntuación queda pegada a su palabra.
 * @param {any} alineacion @returns {import('./lib.mjs').Palabra[]}
 */
export function palabrasDeCaracteres(alineacion) {
  const letras = Array.isArray(alineacion?.characters) ? alineacion.characters : []
  const inicios = alineacion?.character_start_times_seconds ?? []
  const fines = alineacion?.character_end_times_seconds ?? []
  /** @type {import('./lib.mjs').Palabra[]} */
  const salida = []
  /** @type {import('./lib.mjs').Palabra | null} */
  let actual = null
  letras.forEach((/** @type {string} */ c, /** @type {number} */ k) => {
    if (/\s/.test(c)) {
      actual = null
      return
    }
    const ini = Number(inicios[k]) || 0
    const fin = Number(fines[k]) || ini
    if (!actual) {
      actual = { texto: c, inicio: ini, fin }
      salida.push(actual)
    } else {
      actual.texto += c
      actual.fin = fin
    }
  })
  return salida
}

/** @param {{ wav: string, idioma: 'es' | 'en', guia: string }} p @returns {Promise<{ words?: { word: string, start: number, end: number }[], segments?: { start: number, end: number, text: string }[] }>} */
export async function transcribirLocal({ wav, idioma, guia }) {
  const { stdout } = await correr(PYTHON, [join(AQUI, 'transcribir.py'), '--audio', wav, '--idioma', idioma, '--modelo', MODELO_WHISPER, '--guia', guia])
  const linea = stdout.trim().split('\n').pop() ?? ''
  return JSON.parse(linea)
}

/**
 * @param {{ guion: string, wav: string, durVoz: number, idioma: 'es' | 'en', palabrasVoz: import('./lib.mjs').Palabra[] | null, factor?: number,
 *   transcribir?: typeof transcribirLocal, silencios: (wav: string) => Promise<string>, log?: (m: string) => void }} p
 * @returns {Promise<{ fuente: 'elevenlabs' | 'whisper' | 'segmentos' | 'silencios', palabras: import('./lib.mjs').Palabra[] }>}
 */
export async function tiemposDeVoz({ guion, wav, durVoz, idioma, palabrasVoz, factor = 1, transcribir = transcribirLocal, silencios, log = () => {} }) {
  if (palabrasVoz?.length) return { fuente: 'elevenlabs', palabras: palabrasVoz.map((p) => ({ texto: p.texto, inicio: p.inicio / factor, fin: p.fin / factor })) }
  try {
    const t = await transcribir({ wav, idioma, guia: guion })
    if (Array.isArray(t.words) && t.words.length) return { fuente: 'whisper', palabras: t.words.map((w) => ({ texto: w.word, inicio: w.start, fin: w.end })) }
    if (Array.isArray(t.segments) && t.segments.length) return { fuente: 'segmentos', palabras: palabrasDeSegmentos(t.segments) }
  } catch (e) {
    log(`transcripción local falló (${String(/** @type {Error} */ (e).message).split('\n')[0]?.slice(0, 160)}): tiempos por silencios`)
  }
  return { fuente: 'silencios', palabras: palabrasPorSilencios(guion, tramosConVoz(await silencios(wav), durVoz)) }
}
