// @ts-check

/** @typedef {{ texto: string, inicio: number, fin: number }} Palabra */

/** @param {string} s */
export const normalizar = (s) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]/g, '')

/** @param {string} s */
export const tokens = (s) => s.split(/\s+/).map(normalizar).filter(Boolean)

/** @param {string} s */
export const contarPalabras = (s) => tokens(s).length

/**
 * Palabras del contrato (`inicio_s`/`fin_s`) o de `generarVoz` (`inicio`/`fin`) a una sola forma.
 * @param {{ texto: string, inicio_s?: number, fin_s?: number, inicio?: number, fin?: number }[]} palabras
 * @returns {Palabra[]}
 */
export function palabrasDe(palabras) {
  return (palabras ?? [])
    .map((p) => ({ texto: String(p.texto ?? '').trim(), inicio: Number(p.inicio_s ?? p.inicio), fin: Number(p.fin_s ?? p.fin) }))
    .filter((p) => p.texto && Number.isFinite(p.inicio) && Number.isFinite(p.fin))
}

/**
 * Busca una frase en las palabras dichas, tolerando una palabra de más o de menos
 * (la voz puede decir "punto com" donde el texto dice ".com").
 * @param {Palabra[]} palabras
 * @param {string} frase
 * @param {{ desde_s?: number, hasta_s?: number, desde_i?: number }} [op]
 * @returns {{ i: number, j: number, inicio: number, fin: number } | null}
 */
export function buscarFrase(palabras, frase, { desde_s = 0, hasta_s = Infinity, desde_i = 0 } = {}) {
  const meta = tokens(frase)
  if (!meta.length) return null
  const norm = palabras.map((p) => normalizar(p.texto))
  for (let i = desde_i; i < norm.length; i++) {
    const w = /** @type {Palabra} */ (palabras[i])
    if (w.inicio < desde_s || w.inicio > hasta_s) continue
    if (norm[i] !== meta[0]) continue
    let k = 0
    let j = i
    let aciertos = 0
    while (j < norm.length && k < meta.length && j - i < meta.length + 2) {
      if (norm[j] === meta[k]) {
        aciertos++
        k++
        j++
      } else if (norm[j + 1] === meta[k]) j++
      else {
        k++
        j++
      }
    }
    if (aciertos >= Math.ceil(meta.length * 0.7)) {
      const fin = /** @type {Palabra} */ (palabras[j - 1])
      return { i, j: j - 1, inicio: w.inicio, fin: fin.fin }
    }
  }
  return null
}

/**
 * ¿Cuántas de las primeras palabras dichas son el hook? 0 si la voz no arranca con él.
 * @param {Palabra[]} palabras @param {string} hook
 */
export function palabrasDelHook(palabras, hook) {
  const meta = tokens(hook)
  if (!meta.length) return 0
  const primeras = palabras.slice(0, meta.length).map((p) => normalizar(p.texto))
  const coinciden = meta.filter((t, k) => primeras[k] === t).length
  return primeras[0] === meta[0] && coinciden >= Math.ceil(meta.length * 0.7) ? meta.length : 0
}
