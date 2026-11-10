// @ts-check
import { normalizar, palabrasDe, palabrasDelHook } from './tiempos.mjs'

/** @typedef {import('./tiempos.mjs').Palabra} Palabra */
/**
 * @typedef {{ hook: boolean, inicio: number, fin: number, palabras: Palabra[],
 *   arriba?: number, izquierda?: number, ancho?: number, tam?: number, piso?: number,
 *   alinear?: 'centro' | 'izq', salida?: 'auto' | 'ninguna' }} Grupo
 */

/** @param {string} t */
export const textoSubtitulo = (t) => t.replace(/[.,;:…—–-]+$/u, '').replace(/^[—–-]+/u, '')

const DEBILES = new Set(
  'y e o u ni que de del a al en con por para sin sobre tu tus su sus mi mis el la los las lo un una unos unas es se te me nos le les como cada'.split(' '),
)

/**
 * Grupos de subtítulo (skill `subtitulos-premium` § 1): corta en la puntuación y en las pausas
 * > 0,35 s, reparte cada frase en tramos parejos de 2-4 palabras (≤ 30 caracteres) y no deja un
 * tramo colgando de un conector. Mismo algoritmo que `agrupar` de marketing/reels/scripts/reel/render.mjs.
 * @param {Palabra[]} palabras
 * @returns {Palabra[][]}
 */
export function agrupar(palabras) {
  /** @type {Palabra[][]} */
  const frases = []
  /** @type {Palabra[]} */
  let actual = []
  for (const p of palabras) {
    const previa = actual[actual.length - 1]
    if (previa && (p.inicio - previa.fin > 0.35 || /[.,;:?!…]$/u.test(previa.texto))) {
      frases.push(actual)
      actual = []
    }
    actual.push(p)
  }
  if (actual.length) frases.push(actual)

  const largo = (/** @type {Palabra[]} */ g) => g.map((p) => textoSubtitulo(p.texto)).join(' ').length
  const cabe = (/** @type {Palabra[]} */ g) => g.length > 0 && (g.length <= 4 || (g.length === 5 && largo(g) <= 22)) && largo(g) <= 30
  const debil = (/** @type {Palabra[]} */ g) => DEBILES.has(normalizar(g[g.length - 1]?.texto ?? ''))

  /** @param {Palabra[]} f @returns {Palabra[][]} */
  const partir = (f) => {
    if (cabe(f)) return [f]
    let k = 2
    while (Math.ceil(f.length / k) > 4 || largo(f) / k > 26) k++
    for (const partes of [k, k + 1]) {
      const base = Math.round(f.length / partes)
      for (const d of [0, -1, 1, -2, 2]) {
        const corte = base + d
        if (corte < 1 || corte >= f.length) continue
        const a = f.slice(0, corte)
        if (cabe(a) && !debil(a)) return [a, ...partir(f.slice(corte))]
      }
    }
    const base = Math.min(4, Math.round(f.length / k))
    return [f.slice(0, base), ...partir(f.slice(base))]
  }
  return frases.flatMap(partir)
}

/**
 * Los grupos de toda la voz: el hook entero (si la voz arranca con él) abre en el cuadro 0 y el
 * resto va en grupos de 2-4 palabras, cada uno visible ≥ 0,5 s y fuera 0,04 s antes del siguiente.
 * @param {{ texto: string, inicio_s?: number, fin_s?: number, inicio?: number, fin?: number }[]} crudas  `voz.palabras` del contrato
 * @param {{ hook?: string, hasta?: number, excluir?: Iterable<number> }} [op]  hasta: ningún grupo pasa de acá (p. ej. duración − 0,3).
 *   excluir: índices de palabras (de `palabrasDe(crudas)`) que no van al subtítulo porque ya se leen en pantalla
 * @returns {{ grupos: Grupo[], hook: Grupo | null, palabras: Palabra[] }}
 */
export function gruposDeVoz(crudas, { hook = '', hasta = Infinity, excluir = [] } = {}) {
  const palabras = palabrasDe(crudas)
  const fuera = new Set(excluir)
  const n = palabrasDelHook(palabras, hook)
  /** @type {Grupo[]} */
  const grupos = []
  let resto = palabras
  /** @type {Grupo | null} */
  let grupoHook = null
  if (n > 0) {
    const delHook = palabras.slice(0, n)
    resto = palabras.slice(n)
    const ultima = /** @type {Palabra} */ (delHook[delHook.length - 1])
    grupoHook = {
      hook: true,
      inicio: 0,
      fin: Math.min(hasta, Math.max(1.5, resto[0] ? Math.min(resto[0].inicio - 0.04, ultima.fin + 0.6) : ultima.fin + 0.4)),
      palabras: delHook.map((p) => ({ ...p, texto: textoSubtitulo(p.texto) })),
    }
    // El hook es la portada: va con la puntuación del guion ("Redes o web: …"), menos el punto final.
    const escritas = hook.trim().split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w))
    if (escritas.length === delHook.length) {
      grupoHook.palabras.forEach((p, k) => { p.texto = /** @type {string} */ (escritas[k]).replace(/[.…]+$/u, '') })
    }
    grupos.push(grupoHook)
  }
  const crudos = agrupar(resto.filter((_, k) => !fuera.has(k + n)))
  crudos.forEach((g, k) => {
    const primera = /** @type {Palabra} */ (g[0])
    const ultima = /** @type {Palabra} */ (g[g.length - 1])
    const sig = crudos[k + 1]?.[0]
    const previo = grupos[grupos.length - 1]
    const inicio = Math.max(primera.inicio - 0.04, previo ? previo.fin : 0)
    let fin = sig && sig.inicio - ultima.fin < 0.8 ? sig.inicio - 0.04 : ultima.fin + 0.35
    fin = Math.min(Math.max(fin, inicio + 0.5, ultima.fin), sig ? sig.inicio - 0.04 : Infinity, hasta)
    if (fin - inicio < 0.15) return
    grupos.push({ hook: false, inicio, fin, palabras: g.map((p) => ({ ...p, texto: textoSubtitulo(p.texto) })) })
  })
  const r = (/** @type {number} */ x) => Math.round(x * 1000) / 1000
  for (const g of grupos) {
    g.inicio = r(g.inicio)
    g.fin = r(g.fin)
    g.palabras = g.palabras.map((p) => ({ texto: p.texto, inicio: r(p.inicio), fin: r(p.fin) }))
  }
  return { grupos, hook: grupoHook, palabras }
}
