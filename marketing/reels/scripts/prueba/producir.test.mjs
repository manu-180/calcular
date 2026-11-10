import assert from 'node:assert/strict'
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import { MAX_INTENTOS, estadoVacio } from './lib.mjs'
import { DIRS, producir } from './producir.mjs'

const BASE = {
  version: 1, paleta: 'papel', voz: null, contenido: { contacto: 'Cliente nuevo', mensajes: [], remate: null },
  hooks: ['Uno dos tres', 'Cuatro cinco seis', 'Siete ocho nueve'],
  captions: ['Primero.', 'Segundo.', 'Tercero.'],
  hashtags: ['uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho'],
  fuentes: [{ nombre: 'LCT', url: 'https://servicios.infoleg.gob.ar/lct.htm', consultado: '2026-11-10' }],
}
const VOZ = Array.from({ length: 30 }, (_, i) => `palabra${i}`).join(' ')

/** Banco y formatos de mentira: explicador no pasa su validar(). */
function banco() {
  const raiz = mkdtempSync(join(tmpdir(), 'prueba-producir-'))
  const guiones = join(raiz, 'guiones')
  const formatos = join(raiz, 'formatos')
  mkdirSync(guiones)
  for (const [f, validar] of [['chat', '[]'], ['explicador', "['contenido roto']"]]) {
    mkdirSync(join(formatos, f), { recursive: true })
    writeFileSync(join(formatos, f, 'armar.mjs'), `export const validar = () => ${validar}\nexport async function armar() { throw new Error('no se llama') }\n`)
  }
  writeFileSync(join(guiones, 'a-explica.json'), JSON.stringify({ ...BASE, clave: 'a-explica', titulo: 'A', categoria: 'tecnico', formato: 'explicador', voz: VOZ, contenido: { bloques: [] } }))
  writeFileSync(join(guiones, 'b-chat.json'), JSON.stringify({ ...BASE, clave: 'b-chat', titulo: 'B', categoria: 'comedia', formato: 'chat' }))
  writeFileSync(join(guiones, 'c-roto.json'), '{ no es json')
  return { ...DIRS, guiones, formatos, cta: join(raiz, 'cta') }
}

const AHORA = new Date('2026-11-09T08:05:00Z')

test('banco vacío: aviso claro, sin creativo y sin error', async () => {
  const dirs = { ...DIRS, guiones: mkdtempSync(join(tmpdir(), 'prueba-vacio-')) }
  const r = await producir({ estado: estadoVacio(), ahora: AHORA, dirs, env: {} })
  assert.equal(r.ok, false)
  assert.equal(r.creativo, null)
  assert.match(r.motivo, /vacío/)
})

test('saltea el guion que su formato rechaza, lo anota y cuenta el intento del elegido', async () => {
  const dirs = banco()
  /** @type {any[]} */
  const guardados = []
  const r = await producir({ estado: estadoVacio(), ahora: AHORA, dirs, env: {}, guardar: (e) => guardados.push(structuredClone(e)) })
  assert.equal(r.creativo, '2026-11-09-b-chat')
  assert.equal(r.ok, false)
  assert.match(r.motivo, /BLOB_READ_WRITE_TOKEN/)
  assert.match(String(r.estado.saltados['a-explica']?.motivo), /contenido roto/)
  assert.match(String(r.estado.saltados['c-roto']?.motivo), /JSON/)
  const c = r.estado.creativos['2026-11-09-b-chat']
  assert.equal(c?.intentos, 1)
  assert.equal(c?.producido_at, null)
  // Sin Blob no es culpa del guion: no lo quema.
  assert.equal(c?.falla, 'general')
  // Antes de gastar nada ya quedó el intento contado: una corrida cortada a la mitad también cuenta.
  assert.match(String(guardados[0].creativos['2026-11-09-b-chat'].error), /produciendo/)

  const r2 = await producir({ estado: r.estado, ahora: new Date('2026-11-09T12:20:00Z'), dirs, env: {} })
  assert.equal(r2.creativo, '2026-11-09-b-chat')
  assert.equal(r2.estado.creativos['2026-11-09-b-chat']?.intentos, 2)

  const agotado = structuredClone(r2.estado)
  const ca = agotado.creativos['2026-11-09-b-chat']
  if (ca) ca.intentos = MAX_INTENTOS
  const r3 = await producir({ estado: agotado, ahora: new Date('2026-11-09T14:20:00Z'), dirs, env: {} })
  assert.equal(r3.creativo, null)
  assert.match(r3.motivo, /falló/)
})

test('REELS_PRUEBA_PAUSADOS=1 no produce salvo pedido a mano', async () => {
  const r = await producir({ estado: estadoVacio(), ahora: AHORA, dirs: banco(), env: { REELS_PRUEBA_PAUSADOS: '1' } })
  assert.match(r.motivo, /REELS_PRUEBA_PAUSADOS/)
})

test('el render no hereda las claves', async () => {
  const { entornoSinSecretos } = await import('./producir.mjs')
  const env = entornoSinSecretos({ PATH: '/bin', HOME: '/h', BLOB_READ_WRITE_TOKEN: 'b', GEMINI_API_KEY: 'g', ELEVENLABS_API_KEY: 'e', IG_ACCESS_TOKEN: 'i', KAIRO_GITHUB_TOKEN: 'k', GITHUB_TOKEN: 't' })
  assert.deepEqual(Object.keys(env).sort(), ['HOME', 'HYPERFRAMES_NO_TELEMETRY', 'PATH'])
})

test('si el formato no puede armar el guion, la falla es del guion (lo quema); si no, es general', async () => {
  const dirs = banco()
  const cta = join(dirs.cta, 'clips')
  mkdirSync(cta, { recursive: true })
  writeFileSync(join(cta, 'x.mp4'), 'no importa: armar() tira antes')
  writeFileSync(join(dirs.cta, 'clips.json'), JSON.stringify([{ id: 'papel-x', paleta: 'papel', estilo: 'x', archivo: 'clips/x.mp4', duracion_s: 4 }]))
  const seco = mkdtempSync(join(tmpdir(), 'prueba-seco-'))
  const r = await producir({ estado: estadoVacio(), ahora: AHORA, dirs, env: {}, seco, guionClave: 'b-chat' })
  assert.equal(r.ok, false)
  assert.match(r.motivo, /no se llama/)
  assert.equal(r.estado.creativos['2026-11-09-b-chat']?.falla, 'guion')
})
