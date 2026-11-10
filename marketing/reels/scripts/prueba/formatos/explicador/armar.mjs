// @ts-check
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  FPS, buscarFrase, contraste, copiarAssets, copiarVoz, cssComun, escribirDatos, fondoHtml, gruposDeVoz, paleta,
  palabrasDe, palabrasDelHook, rellenar, sfxHtml, tokens, validarBase, vozHtml,
} from '../_comun/index.mjs'

const AQUI = dirname(fileURLToPath(import.meta.url))
const PLANTILLA = join(AQUI, 'plantilla.html')
const EMPUJE = 0.72
const QUIETO_FINAL = 0.3
/** Mínimo de palabras dichas entre el arranque de una frase y el de la siguiente. */
const PALABRAS_ENTRE = 6
/** Lo mínimo que un visual queda en pantalla, aunque entre un poco después de que la voz lo nombre. */
const MIN_EN_PANTALLA = 1.8
export const TIPOS = ['titulo', 'navegador', 'busqueda', 'celular-vs-compu', 'comparacion', 'codigo', 'cuenta']

/** @param {unknown} v @returns {v is string} */
const esTexto = (v) => typeof v === 'string' && v.trim().length > 0
/** @param {unknown} v @param {number} max */
const textoHasta = (v, max) => esTexto(v) && v.trim().length <= max
const r3 = (/** @type {number} */ x) => Math.round(x * 1000) / 1000

/**
 * ¿Las palabras de `frase` están seguidas, tal cual, en `voz` (desde la palabra `desde`)?
 * @param {string[]} voz @param {string[]} frase @param {number} desde
 * @returns {number} índice de la primera palabra, o -1
 */
function seguidas(voz, frase, desde) {
  for (let i = desde; i + frase.length <= voz.length; i++) if (frase.every((t, k) => voz[i + k] === t)) return i
  return -1
}

/** @param {any} v @param {string} donde @param {string[]} p */
function validarVisual(v, donde, p) {
  if (!v || typeof v !== 'object') return p.push(`${donde}: falta el visual`)
  switch (v.tipo) {
    case 'titulo':
      if (!textoHasta(v.texto, 40)) p.push(`${donde}.texto: de 1 a 40 caracteres`)
      break
    case 'navegador':
      if (!textoHasta(v.url, 32) || !/^[a-z0-9-]+(\.[a-z0-9-]+)+$/i.test(v.url.trim())) p.push(`${donde}.url: un dominio ficticio, p. ej. tunegocio.com (≤ 32)`)
      if (v.estado !== 'lento' && v.estado !== 'rapido') p.push(`${donde}.estado: "lento" o "rapido"`)
      break
    case 'busqueda':
      if (!textoHasta(v.consulta, 40)) p.push(`${donde}.consulta: de 1 a 40 caracteres`)
      if (!Array.isArray(v.resultados) || v.resultados.length !== 3) p.push(`${donde}.resultados: exactamente 3`)
      else v.resultados.forEach((/** @type {unknown} */ r, /** @type {number} */ i) => { if (!textoHasta(r, 40)) p.push(`${donde}.resultados[${i}]: de 1 a 40 caracteres`) })
      if (!Number.isInteger(v.destacado) || v.destacado < 0 || v.destacado > 2) p.push(`${donde}.destacado: 0, 1 o 2`)
      break
    case 'celular-vs-compu':
      if (!textoHasta(v.celular, 40)) p.push(`${donde}.celular: de 1 a 40 caracteres`)
      if (!textoHasta(v.compu, 40)) p.push(`${donde}.compu: de 1 a 40 caracteres`)
      break
    case 'comparacion':
      for (const lado of ['izq', 'der']) {
        const c = v[lado]
        if (!c || typeof c !== 'object') { p.push(`${donde}.${lado}: falta`); continue }
        if (!textoHasta(c.titulo, 24)) p.push(`${donde}.${lado}.titulo: de 1 a 24 caracteres`)
        if (!Array.isArray(c.items) || c.items.length < 2 || c.items.length > 3) p.push(`${donde}.${lado}.items: 2 a 3`)
        else c.items.forEach((/** @type {unknown} */ it, /** @type {number} */ i) => { if (!textoHasta(it, 32)) p.push(`${donde}.${lado}.items[${i}]: de 1 a 32 caracteres`) })
      }
      break
    case 'codigo':
      if (!Array.isArray(v.lineas) || v.lineas.length < 2 || v.lineas.length > 5) p.push(`${donde}.lineas: 2 a 5`)
      else v.lineas.forEach((/** @type {unknown} */ l, /** @type {number} */ i) => {
        if (typeof l !== 'string' || !l.trim() || l.length > 36) p.push(`${donde}.lineas[${i}]: de 1 a 36 caracteres`)
        else if (/\t/.test(l)) p.push(`${donde}.lineas[${i}]: sangría con espacios, no tabs`)
      })
      break
    case 'cuenta': {
      // La operación de calcular, paso a paso. Nunca montos en pesos: cambian con cada aumento y el reel queda.
      const fila = (/** @type {any} */ f, /** @type {string} */ d) => {
        if (!f || typeof f !== 'object') return p.push(`${d}: falta`)
        if (!textoHasta(f.concepto, 30)) p.push(`${d}.concepto: de 1 a 30 caracteres`)
        if (!textoHasta(f.valor, 12)) p.push(`${d}.valor: de 1 a 12 caracteres`)
        else if (/\$|pesos/i.test(f.valor)) p.push(`${d}.valor: sin montos en pesos (cambian y el reel queda)`)
      }
      if (!Array.isArray(v.filas) || v.filas.length < 2 || v.filas.length > 4) p.push(`${donde}.filas: 2 a 4`)
      else v.filas.forEach((/** @type {any} */ f, /** @type {number} */ i) => fila(f, `${donde}.filas[${i}]`))
      fila(v.total, `${donde}.total`)
      break
    }
    default:
      p.push(`${donde}.tipo tiene que ser ${TIPOS.join(' | ')}`)
  }
}

/**
 * @param {any} guion
 * @returns {string[]} problemas; vacío = válido
 */
export function validar(guion) {
  const p = validarBase(guion, 'explicador')
  const b = guion?.contenido?.bloques
  if (!Array.isArray(b) || b.length < 3 || b.length > 5) {
    p.push('contenido.bloques: 3 a 5')
    return p
  }
  const voz = esTexto(guion.voz) ? tokens(guion.voz) : []
  let desde = 0
  let previa = -Infinity
  b.forEach((x, i) => {
    if (!x || typeof x !== 'object') return p.push(`bloques[${i}] no es un objeto`)
    const f = esTexto(x.frase) ? tokens(x.frase) : []
    if (f.length < 2 || f.length > 6) p.push(`bloques[${i}].frase: 2 a 6 palabras`)
    else if (voz.length) {
      const en = seguidas(voz, f, desde)
      if (en < 0) p.push(`bloques[${i}].frase ("${x.frase}") no está tal cual en la voz, o no va en orden`)
      else {
        // Cada visual necesita ~2 s en pantalla: su frase arranca 6 palabras dichas o más después de la anterior.
        if (en - previa < PALABRAS_ENTRE) p.push(`bloques[${i}].frase arranca ${en - previa} palabras después de la anterior (mínimo ${PALABRAS_ENTRE})`)
        previa = en
        desde = en + f.length
      }
    }
    validarVisual(x.visual, `bloques[${i}].visual`, p)
  })
  return p
}

/** Un color más claro hasta separarse del fondo del editor (≥ 4,5:1). @param {string} hex @param {string} fondo */
function aclararHasta(hex, fondo) {
  const n = Number.parseInt(hex.slice(1), 16)
  let [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255]
  const aHex = () => `#${[r, g, b].map((c) => Math.round(c).toString(16).padStart(2, '0')).join('')}`
  for (let k = 0; k < 12 && contraste(aHex(), fondo) < 4.5; k++) {
    r += (255 - r) * 0.18
    g += (255 - g) * 0.18
    b += (255 - b) * 0.18
  }
  return aHex()
}

/** Tono HSL en grados. @param {string} hex */
function tono(hex) {
  const n = Number.parseInt(hex.slice(1), 16)
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => v / 255)
  const max = Math.max(/** @type {number} */ (r), /** @type {number} */ (g), /** @type {number} */ (b))
  const d = max - Math.min(/** @type {number} */ (r), /** @type {number} */ (g), /** @type {number} */ (b))
  if (d === 0) return 0
  const h = max === r ? ((/** @type {number} */ (g) - /** @type {number} */ (b)) / d) % 6 : max === g ? (/** @type {number} */ (b) - /** @type {number} */ (r)) / d + 2 : (/** @type {number} */ (r) - /** @type {number} */ (g)) / d + 4
  return (h * 60 + 360) % 360
}

/** @param {string} a @param {string} b @param {number} t  0 = a, 1 = b */
function mezclar(a, b, t) {
  const c = (/** @type {string} */ h) => { const n = Number.parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255] }
  const [x, y] = [c(a), c(b)]
  return `#${x.map((v, k) => Math.round(v + (/** @type {number} */ (y[k]) - v) * t).toString(16).padStart(2, '0')).join('')}`
}

/**
 * Los momentos de cada visual, relativos a su entrada, achicados si el bloque dura poco.
 * @param {any} v @param {number} d  lo que dura el bloque en pantalla
 */
function momentos(v, d) {
  const tope = (/** @type {number} */ t) => r3(Math.max(0.2, Math.min(t, d - 0.3)))
  switch (v.tipo) {
    case 'titulo':
      return { palabras: 0.12, subraya: tope(0.62) }
    case 'navegador':
      return v.estado === 'rapido'
        ? { barra: tope(0.42), pagina: tope(0.72), punch: tope(1.15) }
        : { barra: tope(0.4), fin: r3(Math.max(0.8, d - 0.15)), ...(d >= 3.2 ? { punch: tope(d * 0.42) } : {}) }
    case 'busqueda': {
      const escribe = tope(0.4)
      const largo = Math.min(0.85, v.consulta.length * 0.032)
      const resultados = tope(escribe + largo + 0.2)
      const sube = tope(Math.max(resultados + 0.75, Math.min(d - 1.0, resultados + 1.3)))
      return { escribe, largo: r3(largo), resultados, sube, punch: tope(sube + 0.5) }
    }
    case 'celular-vs-compu':
      return { compu: 0.5, celular: tope(0.42), textoCelular: tope(0.8) }
    case 'comparacion': {
      const der = tope(Math.max(1.05, Math.min(d * 0.42, 2.2)))
      return { izq: 0.3, der, punch: tope(der + 0.62) }
    }
    case 'codigo': {
      const t0 = tope(0.42)
      let t = t0
      const lineas = v.lineas.map((/** @type {string} */ l) => {
        const dur = Math.min(0.42, Math.max(0.16, l.trim().length * 0.011))
        const x = { t: r3(t), dur: r3(dur) }
        t += dur + 0.08
        return x
      })
      return { lineas, resalta: tope(t + 0.25) }
    }
    case 'cuenta': {
      const filas = v.filas.map((/** @type {unknown} */ _, /** @type {number} */ i) => tope(0.4 + i * 0.32))
      const total = tope(0.4 + v.filas.length * 0.32 + 0.3)
      return { filas, total, punch: tope(total + 0.35) }
    }
    default:
      return {}
  }
}

/**
 * @param {{ guion: any, hook: 0 | 1 | 2, voz: { wav: string, duracion_s: number, palabras: { texto: string, inicio_s: number, fin_s: number }[] } | null, salida: string }} p
 * @returns {Promise<{ duracion_s: number }>}
 */
export async function armar({ guion, hook, voz, salida }) {
  const problemas = validar(guion)
  if (problemas.length) throw new Error(`guion inválido para explicador: ${problemas.join('; ')}`)
  if (!voz || !voz.wav) throw new Error('explicador necesita voz')
  const textoHook = String(guion.hooks[hook] ?? guion.hooks[0]).trim()
  const palabras = palabrasDe(voz.palabras)
  if (!palabras.length) throw new Error('voz.palabras vacío')

  mkdirSync(salida, { recursive: true })
  copiarAssets(salida)
  copiarVoz(voz.wav, salida)
  const pal = paleta(guion.paleta)

  const ultima = /** @type {{ fin: number }} */ (palabras[palabras.length - 1])
  const duracion = Math.ceil((ultima.fin + 0.35 + QUIETO_FINAL) * FPS) / FPS
  const nHook = palabrasDelHook(palabras, textoHook)
  const finHook = nHook ? /** @type {{ fin: number }} */ (palabras[nHook - 1]).fin : 1.2
  const cuerpo0 = nHook && palabras[nHook] ? /** @type {{ inicio: number }} */ (palabras[nHook]).inicio : 1.5

  /** @type {{ frase: string, visual: any }[]} */
  const lista = guion.contenido.bloques
  let desde_i = nHook
  const bloques = lista.map((b, k) => {
    const f = buscarFrase(palabras, b.frase, { desde_i })
    if (f) desde_i = f.j + 1
    const dicha = f ? f.inicio : cuerpo0 + ((ultima.fin - cuerpo0) * k) / lista.length
    return { visual: b.visual, dicha: r3(dicha), entra: 0, fin: 0 }
  })
  bloques.forEach((b, k) => {
    const previo = k === 0 ? finHook + 0.05 : /** @type {{ entra: number }} */ (bloques[k - 1]).entra + MIN_EN_PANTALLA
    b.entra = r3(Math.max(previo, b.dicha - EMPUJE * 0.85))
  })
  bloques.forEach((b, k) => { b.fin = r3(k + 1 < bloques.length ? /** @type {{ entra: number }} */ (bloques[k + 1]).entra : duracion - QUIETO_FINAL) })
  const conMomentos = bloques.map((b) => ({ ...b, m: momentos(b.visual, b.fin - b.entra) }))

  // Punch-ins: sólo donde pasa lo que la voz nombra, separados por 5 s o más, 2 como máximo.
  /** @type {{ t: number, bloque: number }[]} */
  const punchs = []
  conMomentos.forEach((b, k) => {
    const t = /** @type {any} */ (b.m).punch
    if (t == null) return
    const abs = b.entra + t
    if (abs + 1.2 > b.fin || abs + 0.6 > duracion - QUIETO_FINAL) return
    if (punchs.length >= 2 || punchs.some((x) => Math.abs(x.t - abs) < 5)) return
    punchs.push({ t: r3(abs), bloque: k })
  })

  const { grupos } = gruposDeVoz(voz.palabras, { hook: textoHook, hasta: duracion - QUIETO_FINAL })
  const hookGrupo = grupos.find((g) => g.hook) ?? {
    hook: true, inicio: 0, fin: bloques[0]?.entra ?? 1.5, resaltar: false,
    palabras: textoHook.split(/\s+/).map((texto) => ({ texto, inicio: 0, fin: 0 })),
  }
  Object.assign(hookGrupo, { salida: 'ninguna', izquierda: 120, ancho: 840, arriba: 700, tam: 136, piso: 92 })
  const subs = grupos.filter((g) => !g.hook)

  /** @type {{ tipo: 'whoosh-short' | 'whoosh-cinematic' | 'pop' | 'click-soft', t: number, volumen: number, prioridad: number }[]} */
  const candidatos = []
  conMomentos.forEach((b, k) => {
    // Dos tomas de whoosh que se alternan; los pops sólo en lo que paga (el resultado que sube, la web que carga).
    candidatos.push({ tipo: k % 2 === 0 ? 'whoosh-cinematic' : 'whoosh-short', t: b.entra + EMPUJE / 2, volumen: k % 2 === 0 ? 0.3 : 0.38, prioridad: k === 0 ? 3 : 2 })
    const m = /** @type {any} */ (b.m)
    const v = b.visual
    if (v.tipo === 'busqueda') candidatos.push({ tipo: 'pop', t: b.entra + m.sube + 0.42, volumen: 0.55, prioridad: 3 })
    if (v.tipo === 'navegador' && v.estado === 'rapido') candidatos.push({ tipo: 'pop', t: b.entra + m.pagina, volumen: 0.55, prioridad: 3 })
    if (v.tipo === 'comparacion') candidatos.push({ tipo: 'pop', t: b.entra + m.der + 0.5, volumen: 0.5, prioridad: 3 })
    if (v.tipo === 'celular-vs-compu') candidatos.push({ tipo: 'pop', t: b.entra + m.celular + 0.5, volumen: 0.45, prioridad: 1 })
    if (v.tipo === 'codigo') candidatos.push({ tipo: 'click-soft', t: b.entra + m.resalta, volumen: 0.5, prioridad: 1 })
    if (v.tipo === 'cuenta') candidatos.push({ tipo: 'pop', t: b.entra + m.total, volumen: 0.55, prioridad: 3 })
  })
  const sfx = candidatos
    .filter((s) => s.t < duracion - QUIETO_FINAL)
    .sort((a, b) => b.prioridad - a.prioridad || a.t - b.t)
    .slice(0, 5)
    .sort((a, b) => a.t - b.t)

  // Editor oscuro siempre: en paletas oscuras, el fondo de la paleta bajado hacia el negro (queda de la misma familia).
  const editor = pal.oscura ? mezclar(pal.fondo, '#050506', 0.5) : pal.tinta
  const sintaxis = {
    fondo: editor,
    texto: '#ECE9E3',
    clave: aclararHasta(pal.acento, editor),
    // Las cadenas van en arena salvo que el acento ya sea cálido (dorado, naranja): ahí en menta, para que no se confundan con las claves.
    cadena: aclararHasta(Math.min(Math.abs(tono(pal.acento) - 36), 360 - Math.abs(tono(pal.acento) - 36)) < 30 ? '#8FD3BE' : '#E2B97A', editor),
    atributo: '#AEB6C2',
    signo: '#7C828C',
    comentario: '#6F7680',
  }

  escribirDatos(salida, {
    duracion,
    tono: pal.tono,
    resalte: pal.resalte,
    tinta: pal.tinta,
    oscura: pal.oscura,
    empuje: EMPUJE,
    sintaxis,
    hook: hookGrupo,
    grupos: subs,
    bloques: conMomentos.map((b) => ({ visual: b.visual, entra: b.entra, fin: b.fin, m: b.m })),
    punchs,
  })
  const html = rellenar(readFileSync(PLANTILLA, 'utf8'), {
    css: cssComun(guion.paleta),
    fondo: fondoHtml(),
    duracion: duracion.toFixed(3),
    audio: [vozHtml(Math.min(voz.duracion_s, duracion)), sfxHtml(sfx, duracion)].join('\n'),
  })
  writeFileSync(join(salida, 'index.html'), html)
  return { duracion_s: r3(duracion) }
}
