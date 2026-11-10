// @ts-check
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { SFX, RUTAS } from './assets.mjs'
import { cssPaleta } from './paletas.mjs'

const AQUI = dirname(fileURLToPath(import.meta.url))
export const FPS = 30
const r3 = (/** @type {number} */ x) => (Math.round(x * 1000) / 1000).toFixed(3)

/**
 * CSS de la paleta + fuentes + fondo, para pegar dentro del `<style>` del index.html del formato
 * (inline: el lint de HyperFrames busca el @font-face en el mismo archivo que usa la fuente).
 * @param {string} clavePaleta
 */
export function cssComun(clavePaleta) {
  return [cssPaleta(clavePaleta), readFileSync(join(AQUI, 'fuentes.css'), 'utf8'), readFileSync(join(AQUI, 'fondo.css'), 'utf8')].join('\n')
}

/**
 * El fondo con carácter: luz principal (#fondo-luz, se puede mover con GSAP para seguir al foco),
 * contraluz, grilla (#fondo-grilla, admite parallax), viñeta y grano. Va primero dentro del root.
 */
export function fondoHtml() {
  return [
    '<div id="fondo" data-layout-ignore>',
    '  <div id="fondo-luz"></div>',
    '  <div id="fondo-contraluz"></div>',
    '  <div id="fondo-grilla"></div>',
    '  <div id="fondo-vineta"></div>',
    '  <div id="fondo-grano"></div>',
    '</div>',
  ].join('\n')
}

/** @param {string} s */
export const escaparHtml = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/**
 * @param {{ id: string, src: string, inicio: number, duracion: number, volumen?: number, pista?: number, desde?: number }} a
 */
export function audioHtml({ id, src, inicio, duracion, volumen = 1, pista = 10, desde = 0 }) {
  const recorte = desde > 0 ? ` data-media-start="${r3(desde)}"` : ''
  return `<audio id="${id}" class="clip" src="${src}" data-start="${r3(inicio)}" data-duration="${r3(duracion)}"${recorte} data-volume="${volumen}" data-track-index="${pista}"></audio>`
}

/** La locución entera desde el cuadro 0. @param {number} duracion */
export function vozHtml(duracion) {
  return audioHtml({ id: 'voz', src: RUTAS.voz, inicio: 0, duracion, volumen: 1, pista: 10 })
}

/**
 * Tags de sfx: cada uno pega (su pico) un cuadro después de `t`, el instante de la acción.
 * @param {{ tipo: keyof typeof SFX, t: number, volumen?: number }[]} lista
 * @param {number} tope  duración del video: nada suena después
 */
export function sfxHtml(lista, tope = Infinity) {
  return lista
    .map((s, k) => {
      /** @type {{ archivo: string, duracion: number, pico: number, desde?: number, largo?: number }} */
      const def = SFX[s.tipo]
      if (!def) throw new Error(`sfx desconocido: ${s.tipo}`)
      const desde = def.desde ?? 0
      const inicio = Math.max(0, s.t + 1 / FPS - (def.pico - desde))
      const duracion = Math.min(def.largo ?? def.duracion - desde, def.duracion - desde, tope - inicio)
      if (duracion <= 0.05) return ''
      return audioHtml({ id: `sfx-${k}`, src: def.archivo, inicio, duracion, volumen: s.volumen ?? 0.5, pista: 11 + (k % 4), desde })
    })
    .filter(Boolean)
    .join('\n')
}

/**
 * Reemplaza `{{clave}}` por su valor (sin escapar: el valor ya viene armado).
 * @param {string} plantilla @param {Record<string, string | number>} vars
 */
export function rellenar(plantilla, vars) {
  return plantilla.replace(/\{\{(\w+)\}\}/g, (m, k) => {
    if (!(k in vars)) throw new Error(`falta {{${k}}} en la plantilla`)
    return String(vars[k])
  })
}
