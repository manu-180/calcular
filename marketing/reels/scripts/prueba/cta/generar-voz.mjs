// @ts-check
import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { generarVoz } from '../../reel/voz.mjs'

/*
  Se corre una sola vez (la voz del cierre es la misma en todos los reels):
  envkit run -p apex_demos --only ELEVENLABS_API_KEY -- node marketing/reels/scripts/prueba/cta/generar-voz.mjs
*/

const AQUI = dirname(fileURLToPath(import.meta.url))
// Lo que se oye. En pantalla el dominio se escribe calcular.ar; "punto ar" se pide así porque
// "calcular.ar" lo lee como una sola palabra rara.
export const FRASE = 'Hacé la cuenta con tus números, gratis, en calcular punto ar.'

const r = await generarVoz({ texto: FRASE, idioma: 'es', log: (m) => process.stderr.write(`[voz] ${m}\n`) })
if (r.proveedor !== 'elevenlabs' || !r.palabras) throw new Error(`la voz salió por ${r.proveedor}: el cierre tiene que ser la voz de ElevenLabs`)

const palabras = r.palabras.map((p) => ({ texto: p.texto, inicio_s: Math.round(p.inicio * 1000) / 1000, fin_s: Math.round(p.fin * 1000) / 1000 }))
const esperadas = FRASE.split(/\s+/)
if (palabras.length !== esperadas.length || palabras.some((p, i) => p.texto !== esperadas[i])) {
  throw new Error(`las palabras no calzan con la frase: ${palabras.map((p) => p.texto).join(' ')}`)
}

writeFileSync(join(AQUI, 'voz.wav'), r.audio)
writeFileSync(join(AQUI, 'voz-palabras.json'), JSON.stringify({ texto: FRASE, voz: r.voz, palabras }, null, 2) + '\n')
console.log(JSON.stringify({ ok: true, palabras: palabras.length, fin_s: palabras[palabras.length - 1]?.fin_s }))
