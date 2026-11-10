// @ts-check
import { Aplazar } from './lib.mjs'

/* ---------------------------------------------------------------------------
   Cliente mínimo de Gemini (Google AI Studio): guion en JSON y voz de
   respaldo (TTS). `fetch` y `espera` se inyectan para probar sin red.
--------------------------------------------------------------------------- */

export const BASE_GEMINI = 'https://generativelanguage.googleapis.com/v1beta'
// gemini-2.5-flash da 404 a keys nuevas desde 2026-10 ("no longer available to new users"). Ante un
// 404 se prueba el siguiente de la lista: Google retira modelos sin aviso y el pipeline no se frena.
export const MODELOS_TEXTO = [process.env.REEL_MODELO_TEXTO || 'gemini-3.8-flash', 'gemini-flash-latest']
export const MODELOS_TTS = [process.env.REEL_MODELO_TTS || 'gemini-2.5-flash-preview-tts', 'gemini-3.8-flash-tts']
export const MODELO_TEXTO = /** @type {string} */ (MODELOS_TEXTO[0])
const INTENTOS = 4

/** La cuota del plan gratis se agotó (429 que no cede): el reel queda para la próxima corrida. */
export class SinCuota extends Aplazar {}

class SinModelo extends Error {}

/** @param {number} ms */
const dormir = (ms) => new Promise((r) => setTimeout(r, ms))

/** @param {any} cuerpo */
function esperaSugerida(cuerpo) {
  const detalle = (cuerpo?.error?.details ?? []).find((/** @type {any} */ d) => typeof d?.retryDelay === 'string')
  const s = Number.parseFloat(String(detalle?.retryDelay ?? ''))
  return Number.isFinite(s) && s > 0 ? Math.min(60_000, Math.ceil(s * 1000)) : null
}

/** PCM s16le mono → WAV. @param {Buffer} pcm @param {number} frecuencia */
export function pcmAWav(pcm, frecuencia) {
  const cab = Buffer.alloc(44)
  cab.write('RIFF', 0)
  cab.writeUInt32LE(36 + pcm.length, 4)
  cab.write('WAVE', 8)
  cab.write('fmt ', 12)
  cab.writeUInt32LE(16, 16)
  cab.writeUInt16LE(1, 20)
  cab.writeUInt16LE(1, 22)
  cab.writeUInt32LE(frecuencia, 24)
  cab.writeUInt32LE(frecuencia * 2, 28)
  cab.writeUInt16LE(2, 32)
  cab.writeUInt16LE(16, 34)
  cab.write('data', 36)
  cab.writeUInt32LE(pcm.length, 40)
  return Buffer.concat([cab, pcm])
}

/**
 * @param {{ clave: string | undefined, fetch?: typeof fetch, espera?: (ms: number) => Promise<unknown>, base?: string }} opciones
 */
export function crearGemini({ clave, fetch: f = fetch, espera = dormir, base = BASE_GEMINI }) {
  if (!clave) throw new Error('falta GEMINI_API_KEY')

  /** @param {string} modelo @param {unknown} cuerpo @returns {Promise<any>} */
  async function generar(modelo, cuerpo) {
    /** @type {unknown} */
    let ultimo = null
    for (let intento = 0; intento < INTENTOS; intento++) {
      /** @type {Response | null} */
      let r = null
      try {
        r = await f(`${base}/models/${modelo}:generateContent`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-goog-api-key': clave ?? '' },
          body: JSON.stringify(cuerpo),
          signal: AbortSignal.timeout(120_000),
        })
      } catch (e) {
        ultimo = e
      }
      if (r) {
        const texto = await r.text()
        /** @type {any} */
        let datos = {}
        try {
          datos = texto ? JSON.parse(texto) : {}
        } catch {
          datos = {}
        }
        if (r.ok) return datos
        const mensaje = `Gemini ${modelo}: HTTP ${r.status} ${String(datos?.error?.message ?? texto).slice(0, 200)}`
        if (r.status === 429) {
          ultimo = new SinCuota(mensaje)
          await espera(esperaSugerida(datos) ?? 15_000 * (intento + 1))
          continue
        }
        if (r.status === 404) throw new SinModelo(mensaje)
        if (r.status < 500) throw new Error(mensaje)
        ultimo = new Error(mensaje)
      }
      await espera(3000 * (intento + 1))
    }
    throw ultimo instanceof Error ? ultimo : new Error(String(ultimo))
  }

  /** @param {string[]} modelos @param {unknown} cuerpo */
  async function conRespaldo(modelos, cuerpo) {
    /** @type {unknown} */
    let ultimo = null
    for (const modelo of modelos) {
      try {
        return await generar(modelo, cuerpo)
      } catch (e) {
        if (!(e instanceof SinModelo)) throw e
        ultimo = e
      }
    }
    throw ultimo instanceof Error ? ultimo : new Error('sin modelos')
  }

  return {
    /** @param {{ sistema: string, usuario: string, esquema?: unknown, temperatura?: number, imagenes?: { mime: string, datos: Buffer }[] }} p */
    async chat({ sistema, usuario, esquema, temperatura = 0.8, imagenes = [] }) {
      const datos = await conRespaldo(MODELOS_TEXTO, {
        systemInstruction: { parts: [{ text: sistema }] },
        contents: [{ role: 'user', parts: [{ text: usuario }, ...imagenes.map(({ mime, datos }) => ({ inlineData: { mimeType: mime, data: datos.toString('base64') } }))] }],
        generationConfig: {
          temperature: temperatura,
          responseMimeType: 'application/json',
          ...(esquema ? { responseSchema: esquema } : {}),
          // Con el pensamiento prendido gasta tokens y la respuesta llega cortada.
          thinkingConfig: { thinkingBudget: 0 },
        },
      })
      const texto = (datos?.candidates?.[0]?.content?.parts ?? []).map((/** @type {any} */ p) => p?.text ?? '').join('')
      if (!texto) throw new Error(`Gemini no devolvió texto (${datos?.candidates?.[0]?.finishReason ?? 'sin candidato'})`)
      return { texto }
    },

    /** PCM 24 kHz que devuelve el TTS, ya como WAV. @param {{ texto: string, voz: string, estilo: string }} p */
    async tts({ texto, voz, estilo }) {
      const datos = await conRespaldo(MODELOS_TTS, {
        contents: [{ parts: [{ text: `${estilo}:\n${texto}` }] }],
        generationConfig: { responseModalities: ['AUDIO'], speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: voz } } } },
      })
      const b64 = datos?.candidates?.[0]?.content?.parts?.find((/** @type {any} */ p) => p?.inlineData?.data)?.inlineData?.data
      if (!b64) throw new Error('Gemini TTS no devolvió audio')
      return pcmAWav(Buffer.from(b64, 'base64'), 24_000)
    },
  }
}
