import assert from 'node:assert/strict'
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import { avisoProducir, guionesDisponibles, planCorrida } from './correr.mjs'
import { MAX_INTENTOS, estadoVacio } from './lib.mjs'
import { DIRS } from './producir.mjs'

const AHORA = new Date('2026-11-09T16:00:00Z')
const ACTIVOS = { REELS_PRUEBA_ACTIVOS: '1' }

/** @param {Record<string, unknown>[]} variantes @param {Record<string, unknown>} [extra] */
const creativo = (variantes, extra = {}) => ({ clave: 'a', fecha: '2026-11-09', titulo: 'a', categoria: 'comedia', formato: 'chat', paleta: 'papel', producido_at: '2026-11-09T08:40:00.000Z', error: null, intentos: 0, variantes, ...extra })
/** @param {string} id @param {string} publicar_at @param {Record<string, unknown>} [extra] */
const variante = (id, publicar_at, extra = {}) => ({ id, cambios: {}, resumen: id, video_url: 'https://x.public.blob.vercel-storage.com/a.mp4', duracion_s: 20, caption: `caption ${id}`, publicar_at, ig_media_id: null, permalink: null, publicado_at: null, error_publicar: null, intentos_publicar: 0, metricas: null, ...extra })

test('planCorrida: con la pausa por token se corre publicar aunque no haya nada vencido (para probar el token)', () => {
  const e = { ...estadoVacio(), pausado: 'el token de Instagram está vencido', pausado_por: 'token' }
  e.creativos['2026-11-09-a'] = creativo([variante('v01', '2026-11-09T22:00:00.000Z')])
  assert.equal(planCorrida({ estado: e, ahora: AHORA, env: ACTIVOS, disponibles: 5 }).publicar, true)
  assert.equal(planCorrida({ estado: { ...e, pausado_por: 'bloqueo' }, ahora: AHORA, env: ACTIVOS, disponibles: 5 }).publicar, false)
  assert.equal(planCorrida({ estado: { ...e, pausado: null, pausado_por: undefined }, ahora: AHORA, env: ACTIVOS, disponibles: 5 }).publicar, false)
})

test('planCorrida: una publicada sin id también corre publicar (el id sale de la media reciente)', () => {
  const e = estadoVacio()
  e.creativos['2026-11-09-a'] = creativo([variante('v01', '2026-11-09T13:00:00.000Z', { publicado_at: '2026-11-09T13:01:00.000Z' })])
  assert.equal(planCorrida({ estado: e, ahora: AHORA, env: ACTIVOS, disponibles: 5 }).publicar, true)
})

test('planCorrida: sin guiones disponibles no produce y lo avisa', () => {
  const p = planCorrida({ estado: estadoVacio(), ahora: new Date('2026-11-09T08:05:00Z'), env: ACTIVOS, disponibles: 0 })
  assert.equal(p.producir, false)
  assert.ok(p.avisos.some((a) => /guiones/.test(a)))
  assert.equal(planCorrida({ estado: estadoVacio(), ahora: new Date('2026-11-09T08:05:00Z'), env: ACTIVOS, disponibles: 3 }).producir, true)
})

test('guionesDisponibles: sólo los que pasan el validar() de su formato y no están usados; una falla general no quema', async () => {
  const raiz = mkdtempSync(join(tmpdir(), 'prueba-banco-'))
  const guiones = join(raiz, 'guiones')
  const formatos = join(raiz, 'formatos')
  mkdirSync(guiones)
  for (const [f, validar] of [['chat', '[]'], ['mito', "['las tarjetas no coinciden con la voz']"]]) {
    mkdirSync(join(formatos, f), { recursive: true })
    writeFileSync(join(formatos, f, 'armar.mjs'), `export const validar = () => ${validar}\nexport async function armar() {}\n`)
  }
  const base = { version: 1, fuentes: [{ nombre: 'LCT', url: 'https://servicios.infoleg.gob.ar/lct.htm', consultado: '2026-11-10' }], titulo: 'T', categoria: 'comedia', formato: 'chat', paleta: 'papel', voz: null, contenido: {}, hooks: ['a b', 'c d', 'e f'], captions: ['Uno.', 'Dos.', 'Tres.'], hashtags: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] }
  const VOZ = Array.from({ length: 30 }, (_, i) => `p${i}`).join(' ')
  for (const [clave, extra] of /** @type {[string, Record<string, unknown>][]} */ ([
    ['a-libre', {}],
    ['b-usado', {}],
    ['c-falla-general', {}],
    ['d-falla-guion', {}],
    ['e-mito-roto', { formato: 'mito', categoria: 'mito', voz: VOZ }],
    ['f-sin-formato', { formato: 'explicador', categoria: 'tecnico', voz: VOZ }],
  ])) writeFileSync(join(guiones, `${clave}.json`), JSON.stringify({ ...base, clave, ...extra }))
  writeFileSync(join(guiones, 'g-roto.json'), '{ no')
  const e = estadoVacio()
  e.creativos['2026-11-07-b-usado'] = creativo([], { clave: 'b-usado', fecha: '2026-11-07' })
  e.creativos['2026-11-08-c-falla-general'] = creativo([], { clave: 'c-falla-general', fecha: '2026-11-08', producido_at: null, error: 'falta BLOB', intentos: MAX_INTENTOS, falla: 'general' })
  e.creativos['2026-11-08-d-falla-guion'] = creativo([], { clave: 'd-falla-guion', fecha: '2026-11-08', producido_at: null, error: 'chat no pudo armar el guion', intentos: MAX_INTENTOS, falla: 'guion' })
  const r = await guionesDisponibles({ estado: e, dirs: { ...DIRS, guiones, formatos } })
  assert.deepEqual(r.disponibles.sort(), ['a-libre', 'c-falla-general'])
  assert.equal(r.total, 7)
})

test('avisoProducir: si no hubo creativo es un ::warning::, la falla definitiva rompe la corrida', () => {
  assert.deepEqual(avisoProducir({ ok: false, creativo: null, motivo: 'no quedan guiones sin usar' }, 0), { tipo: 'warning', mensaje: 'no hubo creativo: no quedan guiones sin usar', fallar: false })
  assert.equal(avisoProducir({ ok: true, creativo: 'c', motivo: 'listo' }, 0).tipo, 'notice')
  assert.deepEqual(avisoProducir({ ok: false, creativo: 'c', motivo: 'c falló' }, 1), { tipo: 'warning', mensaje: 'c falló', fallar: false })
  assert.deepEqual(avisoProducir({ ok: false, creativo: 'c', motivo: 'c falló' }, MAX_INTENTOS), { tipo: 'error', mensaje: 'c falló', fallar: true })
})

test('apagado sin REELS_PRUEBA_ACTIVOS=1: no produce, no publica ni mide; dry_run produce igual', () => {
  const e = estadoVacio()
  const ahora = new Date('2026-11-09T08:05:00Z')
  const apagado = planCorrida({ estado: e, ahora, env: {}, disponibles: 3 })
  assert.deepEqual([apagado.producir, apagado.publicar, apagado.medir], [false, false, false])
  assert.match(apagado.notas.join(' '), /apagados/)
  assert.equal(planCorrida({ estado: e, ahora, env: { GUION: 'x' }, disponibles: 3 }).producir, false)
  assert.equal(planCorrida({ estado: e, ahora, env: { SECO: '1' }, disponibles: 3 }).producir, true)
})
