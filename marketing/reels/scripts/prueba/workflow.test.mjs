import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import { TICS_PUBLICAR } from './lib.mjs'

/* Lo que el workflow tiene que sostener y que ningún otro test ve. Sin parser de YAML (no hay node_modules
   en el paso Planear): se leen los bloques por su indentación. */
const YML = readFileSync(new URL('../../../../.github/workflows/reels-prueba.yml', import.meta.url), 'utf8')

/** El texto de un paso del job, por su `name:`. @param {string} nombre */
function paso(nombre) {
  const i = YML.indexOf(`- name: ${nombre}`)
  assert.ok(i >= 0, `no está el paso "${nombre}"`)
  const resto = YML.slice(i + 1)
  const fin = resto.search(/\n {6}- /)
  return fin >= 0 ? resto.slice(0, fin) : resto
}

const crons = [...YML.matchAll(/- cron: '([^']+)'/g)].map((m) => String(m[1]))

test('los crons: producción a las 5:05 y publicación en los tics que usa la agenda (sin el de 23:17)', () => {
  // 21:17 de Buenos Aires son las 00:17 UTC: `17 12-22/2` solo termina a las 19:17.
  assert.deepEqual(crons, ['5 8 * * *', '17 0,12-22/2 * * *', '47 1 * * *'])
  /** @type {number[]} */
  const tics = []
  for (const c of crons.slice(1)) {
    const [minuto, horas] = c.split(' ')
    for (const parte of String(horas).split(',')) {
      const [rango, paso_ = '1'] = parte.split('/')
      const [desde, hasta = desde] = String(rango).split('-').map(Number)
      for (let h = Number(desde); h <= Number(hasta); h += Number(paso_)) tics.push((((h - 3 + 24) % 24) * 60) + Number(minuto))
    }
  }
  assert.deepEqual(tics.sort((a, b) => a - b), TICS_PUBLICAR)
})

test('producir (salvo dry_run) y publicar sólo desde main, con aviso claro desde otra rama', () => {
  assert.match(paso('Producir el creativo'), /if: .*github\.ref == 'refs\/heads\/main'/)
  assert.match(paso('Producir el creativo'), /if: .*env\.SECO == '1'/)
  assert.match(paso('Publicar en Instagram'), /if: .*github\.ref == 'refs\/heads\/main'/)
  assert.match(paso('Instalar dependencias y ffmpeg'), /github\.ref == 'refs\/heads\/main'/)
  const aviso = paso('Avisar que no es main')
  assert.match(aviso, /if: .*github\.ref != 'refs\/heads\/main'/)
  assert.match(aviso, /::warning::/)
})

test('el push a main reintenta 8 veces con espera creciente', () => {
  const commit = paso('Commitear a main')
  assert.match(commit, /for intento in 1 2 3 4 5 6 7 8; do/)
  assert.match(commit, /sleep \$\(\(intento \* \d+/)
  assert.match(commit, /if: .*github\.ref == 'refs\/heads\/main'/)
})

test('los secretos de Instagram sólo en Publicar y Medir', () => {
  assert.equal([...YML.matchAll(/secrets\.IG_ACCESS_TOKEN/g)].length, 2)
  assert.match(paso('Publicar en Instagram'), /secrets\.IG_ACCESS_TOKEN/)
  assert.match(paso('Medir'), /secrets\.IG_ACCESS_TOKEN/)
})
