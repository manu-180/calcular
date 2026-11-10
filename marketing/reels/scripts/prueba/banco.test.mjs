import assert from 'node:assert/strict'
import { test } from 'node:test'
import { cargarFormato, DIRS, leerGuiones } from './producir.mjs'
import { revisarGuion } from './lib.mjs'

// El banco real: un guion que no pasa se saltearía en producción y quemaría un día.
test('cada guion del banco pasa revisarGuion y el validar() de su formato, con fuentes oficiales', async () => {
  const guiones = leerGuiones(DIRS.guiones)
  assert.ok(guiones.length >= 20, `el banco tiene ${guiones.length} guiones`)
  const claves = new Set()
  for (const { guion, archivo } of guiones) {
    const formato = await cargarFormato(DIRS.formatos, guion.formato)
    const problemas = [...revisarGuion(guion, archivo), ...formato.validar(guion)]
    assert.deepEqual(problemas, [], `${guion.clave}: ${problemas.join('; ')}`)
    assert.ok(!claves.has(guion.clave), `${guion.clave} repetido`)
    claves.add(guion.clave)
  }
})

test('ningún guion del banco trae montos en pesos: cambian y el reel queda', () => {
  for (const { guion } of leerGuiones(DIRS.guiones)) {
    const texto = JSON.stringify({ voz: guion.voz, contenido: guion.contenido, captions: guion.captions, hooks: guion.hooks })
    assert.doesNotMatch(texto, /\$\s?\d|\d\s?pesos/i, guion.clave)
  }
})
