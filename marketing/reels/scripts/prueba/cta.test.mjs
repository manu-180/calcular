// @ts-check
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'

const CTA = fileURLToPath(new URL('./cta/', import.meta.url))
const clips = /** @type {{ id: string, archivo: string }[]} */ (JSON.parse(readFileSync(join(CTA, 'clips.json'), 'utf8')))

/** Gris medio de 8 columnas a mitad del clip. @param {string} archivo @param {number} x */
function gris(archivo, x) {
  const crudo = execFileSync('ffmpeg', ['-hide_banner', '-nostdin', '-loglevel', 'error', '-ss', '2.5', '-i', archivo, '-vf', `crop=8:1600:${x}:160,format=gray`, '-frames:v', '1', '-f', 'rawvideo', '-'])
  return crudo.reduce((s, b) => s + b, 0) / crudo.length
}

// Renderizados en Windows salían con 8 columnas negras a la derecha (2026-11-08): cada reel terminaba con una raya.
test('ningún clip del cierre tiene una raya oscura en el borde derecho', () => {
  for (const c of clips) {
    const archivo = join(CTA, c.archivo)
    const adentro = gris(archivo, 1056)
    const borde = gris(archivo, 1072)
    assert.ok(Math.abs(adentro - borde) <= 12, `${c.id}: el borde da ${borde.toFixed(0)} contra ${adentro.toFixed(0)} adentro`)
  }
})
