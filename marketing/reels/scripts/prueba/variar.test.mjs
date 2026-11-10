import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import { EJES } from './lib.mjs'
import { subirVariante } from './producir.mjs'
import { duracionVariante, ganancia, grafoAudio, grafoVideo, maxrateDe } from './variar.mjs'

/** @param {Record<string, unknown>} [extra] */
const cambios = (extra = {}) => ({ hook: 0, zoom: 1, encuadre: 'centro', velocidad: 1, color: 'neutro', musica: 'acustica-1', cierre: 'papel-comentario', textura: 'nada', ...extra })

test('duracionVariante: el cuerpo cambia con la velocidad y el cierre no', () => {
  assert.equal(duracionVariante({ cuerpo_s: 20.4, cierre_s: 4.2, velocidad: 1.02 }), 24.2)
  assert.equal(duracionVariante({ cuerpo_s: 20, cierre_s: 4, velocidad: 1 }), 24)
})

test('grafoVideo: zoom con su encuadre, velocidad sólo en el cuerpo, color y textura sobre todo', () => {
  const g = grafoVideo({ cambios: cambios({ zoom: 1.06, encuadre: 'arriba', velocidad: 1.02, color: 'calido', textura: 'grano' }), cuerpo_s: 20.4, cierre_s: 4.2 })
  assert.match(g, /\[0:v\]setpts=PTS\/1\.02,fps=30,scale=1144:2036:flags=lanczos,crop=1080:1920:32:22/)
  assert.match(g, /\[1:v\]fps=30,scale=1080:1920/)
  assert.match(g, /concat=n=2:v=1:a=0,colorbalance=/)
  assert.match(g, /noise=/)
  const neutro = grafoVideo({ cambios: cambios(), cuerpo_s: 20, cierre_s: 4 })
  assert.doesNotMatch(neutro, /colorbalance|eq=|curves|noise|vignette|setpts=PTS\//)
  assert.match(grafoVideo({ cambios: cambios({ textura: 'vineta', color: 'mate' }), cuerpo_s: 20, cierre_s: 4 }), /curves=.*vignette=/)
})

test('grafoVideo vuelve a 4:2:0 antes de la textura: el grano va en la luma', () => {
  // colorbalance deja el cuadro en RGB planar: ahí c0 es el verde y noise pintaba las últimas 8 columnas (franja roja, 2026-11-08).
  for (const color of ['calido', 'frio', 'contraste', 'mate']) {
    for (const textura of ['grano', 'vineta']) {
      const g = grafoVideo({ cambios: cambios({ color, textura }), cuerpo_s: 20, cierre_s: 4 })
      assert.match(g, /format=yuv420p,(noise|vignette)=/, `${color} + ${textura}`)
    }
  }
})

test('ninguna combinación de color, textura y zoom ensucia los bordes (ffmpeg de verdad)', async () => {
  const dir = mkdtempSync(join(tmpdir(), 'prueba-bordes-'))
  const fondo = (/** @type {string} */ nombre, /** @type {number} */ d) =>
    execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-f', 'lavfi', '-i', `color=c=0x15171c:s=1080x1920:r=30:d=${d}`, '-c:v', 'libx264', '-preset', 'ultrafast', '-pix_fmt', 'yuv420p', join(dir, nombre)])
  fondo('cuerpo.mp4', 0.6)
  fondo('cierre.mp4', 0.3)
  for (const color of EJES.color) {
    for (const textura of EJES.textura) {
      for (const zoom of [1, 1.12]) {
        const g = grafoVideo({ cambios: cambios({ color, textura, zoom }), cuerpo_s: 0.6, cierre_s: 0.3 })
        const crudo = execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-i', join(dir, 'cuerpo.mp4'), '-i', join(dir, 'cierre.mp4'), '-filter_complex', `${g};[v]trim=start=0.3,crop=1080:8:0:960,format=rgb24[o]`, '-map', '[o]', '-frames:v', '1', '-f', 'rawvideo', '-'], { maxBuffer: 1e7 })
        // Una fila de 1080 px de un fondo parejo: los bordes no pueden apartarse del centro (la viñeta oscurece, no tiñe).
        const tinte = (/** @type {number} */ x) => {
          const i = x * 3
          return Math.max(Math.abs((crudo[i] ?? 0) - (crudo[i + 2] ?? 0)), Math.abs((crudo[i + 1] ?? 0) - (crudo[i + 2] ?? 0)))
        }
        const centro = tinte(540)
        for (const x of [0, 4, 1075, 1079]) assert.ok(Math.abs(tinte(x) - centro) <= 24, `${color} + ${textura} + zoom ${zoom}: el borde x=${x} se tiñe (${tinte(x)} contra ${centro})`)
      }
    }
  }
})

test('grafoVideo nunca acelera más de 4 %', () => {
  assert.throws(() => grafoVideo({ cambios: cambios({ velocidad: 1.06 }), cuerpo_s: 20, cierre_s: 4 }))
  assert.throws(() => grafoAudio({ cambios: cambios({ velocidad: 0.94 }), cuerpo_s: 20, cierre_s: 4, conVoz: true, cuerpoConAudio: true, g: { cuerpo: 0, cierre: 0, musica: 0 } }))
})

test('grafoAudio: atempo en la voz, ducking por sidechain y música que sigue bajo el cierre', () => {
  const g = grafoAudio({ cambios: cambios({ velocidad: 0.98 }), cuerpo_s: 20, cierre_s: 4, conVoz: true, cuerpoConAudio: true, g: { cuerpo: 1.5, cierre: -2, musica: -11 } })
  assert.match(g, /\[0:a\]atempo=0\.98,/)
  assert.match(g, /volume=1\.50dB/)
  assert.match(g, /sidechaincompress=/)
  assert.match(g, /\[1:a\].*atrim=0:24\.408/)
  assert.match(g, /amix=inputs=2:normalize=0:duration=first/)
})

test('grafoAudio en chat: sin voz la llave del ducking es sólo el cierre y el cuerpo mudo se rellena', () => {
  const g = grafoAudio({ cambios: cambios(), cuerpo_s: 20, cierre_s: 4, conVoz: false, cuerpoConAudio: false, g: { cuerpo: 0, cierre: -2, musica: -4 } })
  assert.match(g, /anullsrc=r=48000:cl=stereo.*\[cu\]/)
  assert.match(g, /\[sil\]\[ci2\]concat=n=2:v=0:a=1\[llave\]/)
})

test('ganancia hacia el objetivo, acotada y sin tocar lo mudo', () => {
  assert.equal(ganancia(-16, -20), 4)
  assert.equal(ganancia(-27, -16), -11)
  assert.equal(ganancia(-16, -Infinity), 0)
  assert.equal(ganancia(-16, -70), 0)
  assert.equal(ganancia(-16, -50), 20)
})

test('maxrateDe: entra en 15 MB con aire y nunca pasa 8 Mbps', () => {
  for (const d of [10, 20, 30, 45]) {
    const m = maxrateDe(d)
    assert.ok(m <= 8_000_000)
    assert.ok(((m + 128_000) * d) / 8 <= 15 * 1048576 * 0.96, `${d} s: ${m}`)
  }
})

test('subirVariante: ruta reels/prueba/<creativo>/<variante>-<hash8>.mp4, pública y video/mp4', async () => {
  const dir = mkdtempSync(join(tmpdir(), 'prueba-blob-'))
  const archivo = join(dir, 'v01.mp4')
  writeFileSync(archivo, 'mp4 de mentira')
  /** @type {any[]} */
  const llamadas = []
  const put = async (/** @type {string} */ ruta, /** @type {Buffer} */ _cuerpo, /** @type {any} */ op) => {
    llamadas.push({ ruta, op })
    return { url: `https://abc.public.blob.vercel-storage.com/${ruta}` }
  }
  const url = await subirVariante({ creativo: '2026-11-09-sobrino', variante: 'v01', archivo, env: { BLOB_READ_WRITE_TOKEN: 'tok' }, put })
  assert.match(llamadas[0].ruta, /^reels\/prueba\/2026-11-09-sobrino\/v01-[0-9a-f]{8}\.mp4$/)
  assert.deepEqual({ ...llamadas[0].op, token: undefined }, { access: 'public', contentType: 'video/mp4', addRandomSuffix: false, allowOverwrite: true, token: undefined })
  assert.equal(url, `https://abc.public.blob.vercel-storage.com/${llamadas[0].ruta}`)
  await assert.rejects(subirVariante({ creativo: 'c', variante: 'v01', archivo, env: {}, put }), /BLOB_READ_WRITE_TOKEN/)
  const malo = async () => ({ url: 'https://otro.com/x.mp4' })
  await assert.rejects(subirVariante({ creativo: 'c', variante: 'v01', archivo, env: { BLOB_READ_WRITE_TOKEN: 'tok' }, put: malo }), /inesperada/)
})
