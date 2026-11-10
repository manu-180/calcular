// @ts-check
import { PALETAS } from './paletas.mjs'
import { contarPalabras } from './tiempos.mjs'

export const ARCHIVO_CLAVE = /^[a-z0-9]+(-[a-z0-9]+)*$/
const CATEGORIAS = ['comedia', 'tecnico', 'negocio', 'mito']
const FORMATOS = ['chat', 'mito', 'explicador']

/** @param {unknown} v @returns {v is string} */
const esTexto = (v) => typeof v === 'string' && v.trim().length > 0

/**
 * Lo que vale para todo guion (CONTRATO.md § El guion). Cada formato suma lo suyo de `contenido`.
 * @param {any} g @param {string} formato  el que se espera en `g.formato`
 * @returns {string[]} problemas; vacío = válido
 */
export function validarBase(g, formato) {
  /** @type {string[]} */
  const p = []
  if (!g || typeof g !== 'object' || Array.isArray(g)) return ['el guion no es un objeto']
  if (g.version !== 1) p.push('version tiene que ser 1')
  if (!esTexto(g.clave) || !ARCHIVO_CLAVE.test(g.clave)) p.push('clave tiene que ser kebab-case: /^[a-z0-9]+(-[a-z0-9]+)*$/')
  if (!esTexto(g.titulo) || g.titulo.length > 60) p.push('titulo: texto de 1 a 60 caracteres')
  if (!CATEGORIAS.includes(g.categoria)) p.push(`categoria tiene que ser ${CATEGORIAS.join(' | ')}`)
  if (!FORMATOS.includes(g.formato)) p.push(`formato tiene que ser ${FORMATOS.join(' | ')}`)
  else if (g.formato !== formato) p.push(`formato es "${g.formato}" y este armador es "${formato}"`)
  if (!(g.paleta in PALETAS)) p.push(`paleta tiene que ser ${Object.keys(PALETAS).join(' | ')}`)
  if (!Array.isArray(g.hooks) || g.hooks.length !== 3) p.push('hooks: exactamente 3')
  else
    g.hooks.forEach((/** @type {unknown} */ h, /** @type {number} */ i) => {
      if (!esTexto(h)) p.push(`hooks[${i}] vacío`)
      else if (contarPalabras(h) > 8) p.push(`hooks[${i}] tiene ${contarPalabras(h)} palabras (máximo 8)`)
    })
  if (formato === 'chat') {
    if (g.voz !== null) p.push('voz tiene que ser null en chat')
  } else if (!esTexto(g.voz)) p.push('voz: falta el texto locutado')
  else {
    const n = contarPalabras(g.voz)
    if (n < 25 || n > 55) p.push(`voz tiene ${n} palabras (25 a 55)`)
    if (/calcular\s*(\.|punto)\s*ar/i.test(g.voz)) p.push('voz no lleva el cierre con calcular.ar: lo pone el pipeline')
  }
  if (!Array.isArray(g.captions) || g.captions.length < 3 || g.captions.length > 5) p.push('captions: de 3 a 5')
  else
    g.captions.forEach((/** @type {unknown} */ c, /** @type {number} */ i) => {
      if (!esTexto(c) || c.length > 300) p.push(`captions[${i}]: texto de 1 a 300 caracteres`)
    })
  if (!Array.isArray(g.hashtags) || g.hashtags.length < 8 || g.hashtags.length > 15) p.push('hashtags: de 8 a 15')
  else
    g.hashtags.forEach((/** @type {unknown} */ h, /** @type {number} */ i) => {
      if (typeof h !== 'string' || !/^[\p{Ll}\p{N}_]+$/u.test(h)) p.push(`hashtags[${i}]: sin #, sin espacios, en minúscula`)
    })
  const todo = JSON.stringify([g.hooks, g.voz, g.contenido])
  if (/\$\s?\d|\d\s?(pesos|usd|dólares|dolares)\b/i.test(todo)) p.push('sin precios: cambian y los reels quedan')
  if (!g.contenido || typeof g.contenido !== 'object' || Array.isArray(g.contenido)) p.push('contenido: falta el objeto del formato')
  return p
}
