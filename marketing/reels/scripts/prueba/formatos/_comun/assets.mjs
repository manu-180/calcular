// @ts-check
import { spawnSync } from 'node:child_process'
import { copyFileSync, cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const AQUI = dirname(fileURLToPath(import.meta.url))
const ASSETS = join(AQUI, '..', '..', 'assets')
const GSAP = join(AQUI, '..', '..', '..', 'reel', 'plantilla', 'vendor', 'gsap.min.js')

/**
 * Los sfx compartidos: duración del archivo y dónde pega (pico, en s desde el arranque del
 * archivo), medidos sobre `marketing/reels/scripts/prueba/assets/sfx/`. El pico va un cuadro después de la acción
 * que lo causa. `desde`/`largo`: el tramo que se usa (el cinematic trae 1,8 s de aire antes).
 */
export const SFX = {
  'click-soft': { archivo: 'assets/sfx/click-soft.mp3', duracion: 0.365, pico: 0.051 },
  'impact-bass-1': { archivo: 'assets/sfx/impact-bass-1.mp3', duracion: 2.115, pico: 0.073 },
  notification: { archivo: 'assets/sfx/notification.mp3', duracion: 2.455, pico: 0.227 },
  pop: { archivo: 'assets/sfx/pop.mp3', duracion: 0.72, pico: 0.119 },
  'whoosh-cinematic': { archivo: 'assets/sfx/whoosh-cinematic.mp3', duracion: 5.544, pico: 2.502, desde: 1.7, largo: 1.5 },
  'whoosh-short': { archivo: 'assets/sfx/whoosh-short.mp3', duracion: 0.574, pico: 0.161 },
}

/** Rutas dentro del proyecto (relativas a su raíz, como pide HyperFrames). */
export const RUTAS = {
  gsap: 'assets/vendor/gsap.min.js',
  subtitulos: 'assets/comun/subtitulos.js',
  icono: 'assets/calcular-icon.svg',
  voz: 'assets/voz.wav',
  datos: 'assets/datos.js',
}

/**
 * Copia a `salida/assets/` todo lo que una plantilla de formato usa: fuentes, sfx, isotipo de
 * calcular.ar, GSAP local y el runtime de subtítulos. Después del render no hace falta red.
 * @param {string} salida  carpeta del proyecto HyperFrames
 */
export function copiarAssets(salida) {
  const destino = join(salida, 'assets')
  mkdirSync(join(destino, 'vendor'), { recursive: true })
  mkdirSync(join(destino, 'comun'), { recursive: true })
  cpSync(join(ASSETS, 'fuentes'), join(destino, 'fuentes'), { recursive: true })
  cpSync(join(ASSETS, 'sfx'), join(destino, 'sfx'), { recursive: true })
  copyFileSync(join(ASSETS, 'calcular-icon.svg'), join(salida, RUTAS.icono))
  copyFileSync(GSAP, join(salida, RUTAS.gsap))
  copyFileSync(join(AQUI, 'subtitulos.js'), join(salida, RUTAS.subtitulos))
  return RUTAS
}

/** La cadena de la locución de producción (marketing/reels/scripts/reel/render.mjs `CADENA_VOZ`): graves de micrófono, eses y compresión suave. */
export const CADENA_VOZ = 'highpass=f=75,deesser=i=0.35:m=0.5:f=0.5:s=o,acompressor=threshold=-22dB:ratio=2.5:attack=6:release=90:knee=4:makeup=1'
/** El cuerpo queda con la voz a −16 LUFS (estéreo, como sale del render): deja lugar a la música de la variación. */
export const LUFS_VOZ = -16

/** @param {string[]} args */
const ff = (args) => spawnSync('ffmpeg', ['-hide_banner', '-nostdin', '-y', ...args], { encoding: 'utf8', windowsHide: true })

/**
 * Copia la locución al proyecto: con ffmpeg le pasa la cadena de voz y la lleva a −16 LUFS
 * (picos sueltos al limitador, ≤ −1,5 dBFS); sin ffmpeg, o con `procesar: false`, la copia tal cual. No corre los tiempos.
 * @param {string} wav @param {string} salida @param {{ procesar?: boolean }} [op]
 * @returns {string} la ruta dentro del proyecto
 */
export function copiarVoz(wav, salida, { procesar = true } = {}) {
  if (!existsSync(wav)) throw new Error(`no existe la voz ${wav}`)
  mkdirSync(join(salida, 'assets'), { recursive: true })
  const destino = join(salida, RUTAS.voz)
  if (procesar) {
    const tmp = join(salida, 'assets', 'voz-cadena.wav')
    // En estéreo (mono duplicado) antes de medir: medida en mono, el render la sube 3 LU al pasarla a estéreo.
    const a = ff(['-i', wav, '-af', CADENA_VOZ, '-ar', '48000', '-ac', '2', '-c:a', 'pcm_s16le', tmp])
    const m = a.status === 0 ? ff(['-i', tmp, '-af', 'ebur128=peak=true', '-f', 'null', '-']) : null
    const resumen = m?.stderr?.slice(m.stderr.lastIndexOf('Summary:')) ?? ''
    const i = Number(resumen.match(/I:\s+(-?[\d.]+) LUFS/)?.[1])
    const pico = Number(resumen.match(/Peak:\s+(-?[\d.]+) dBFS/)?.[1])
    if (Number.isFinite(i) && i > -60) {
      // Si el pico no deja subir hasta −16, un limitador transparente (sin auto-nivel) se come esos picos sueltos.
      const ganancia = LUFS_VOZ - i
      const limita = Number.isFinite(pico) && pico + ganancia > -1.5 ? ',alimiter=limit=0.84:attack=3:release=60:level=disabled' : ''
      const b = ff(['-i', tmp, '-af', `volume=${ganancia.toFixed(2)}dB${limita}`, '-c:a', 'pcm_s16le', destino])
      rmSync(tmp, { force: true })
      if (b.status === 0) return RUTAS.voz
    }
    rmSync(tmp, { force: true })
  }
  copyFileSync(wav, destino)
  return RUTAS.voz
}

/** Los datos de la composición en `assets/datos.js` (`window.REEL`). @param {string} salida @param {unknown} datos */
export function escribirDatos(salida, datos) {
  mkdirSync(join(salida, 'assets'), { recursive: true })
  writeFileSync(join(salida, RUTAS.datos), `window.REEL = ${JSON.stringify(datos)};\n`)
  return RUTAS.datos
}
