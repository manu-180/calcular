// @ts-check
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { DIAS_MEDIR, MAX_INTENTOS, debeProducir, descartarViejas, fusionarEstado, guionesUsados, leerEstado, porPublicar, publicadasSinId, realPendiente, serializarEstado } from './lib.mjs'
import { DIRS, cargarFormato, leerGuiones, producir } from './producir.mjs'

/* ---------------------------------------------------------------------------
   Lo que corre el workflow (.github/workflows/reels-prueba.yml):

     node marketing/reels/scripts/prueba/correr.mjs planear     sólo node, sin instalar nada: qué toca en esta corrida
     node marketing/reels/scripts/prueba/correr.mjs producir [--guion <clave>] [--seco <dir>] [--n 30]
     node marketing/reels/scripts/prueba/correr.mjs publicar [--ahora]
     node marketing/reels/scripts/prueba/correr.mjs medir
     node marketing/reels/scripts/prueba/correr.mjs fusionar   choque de marketing/reels/estado.json en medio de un rebase

   --seco hace todo menos Blob, Instagram y el estado del repo: los mp4 y un
   estado.json quedan en <dir>. Para probar con dobles: --guiones, --formatos y
   --cta apuntan a otras carpetas.
--------------------------------------------------------------------------- */

const AQUI = dirname(fileURLToPath(import.meta.url))
const RAIZ = process.env.REELS_PRUEBA_RAIZ ?? join(AQUI, '..', '..')
const RUTA_ESTADO = join(RAIZ, 'estado.json')
const enActions = Boolean(process.env.GITHUB_ACTIONS)

/** @param {string} n */
const arg = (n) => {
  const i = process.argv.indexOf(n)
  const v = i !== -1 ? process.argv[i + 1] : undefined
  return v && !v.startsWith('--') ? v : null
}
/** @param {'notice' | 'warning' | 'error'} tipo @param {string} m */
const anotar = (tipo, m) => console.log(enActions ? `::${tipo}::[reels-prueba] ${m}` : `[reels-prueba] ${tipo}: ${m}`)
const log = (/** @type {string} */ m) => console.log(`[reels-prueba] ${m}`)
/** @param {Record<string, string>} pares */
function salidas(pares) {
  const texto = Object.entries(pares).map(([k, v]) => `${k}=${v}`).join('\n')
  if (process.env.GITHUB_OUTPUT) writeFileSync(process.env.GITHUB_OUTPUT, `${texto}\n`, { flag: 'a' })
  else console.log(texto)
}

/** @param {string} [ruta] */
const leer = (ruta = RUTA_ESTADO) => leerEstado(existsSync(ruta) ? readFileSync(ruta, 'utf8') : '')
/** @param {string} ruta */
const guardarEn = (ruta) => (/** @type {import('./lib.mjs').Estado} */ e) => {
  mkdirSync(dirname(ruta), { recursive: true })
  writeFileSync(ruta, serializarEstado({ ...e, actualizado: new Date().toISOString() }))
}

/**
 * Los guiones que de verdad se pueden producir: no usados (producidos o quemados
 * por una falla del guion), válidos para el pipeline y para el validar() de su
 * formato. Se revalida cada vez, así que un salteado que sigue roto no cuenta y
 * uno que arreglaron vuelve a contar.
 * @param {{ estado: import('./lib.mjs').Estado, dirs?: typeof DIRS }} p
 * @returns {Promise<{ disponibles: string[], total: number }>}
 */
export async function guionesDisponibles({ estado, dirs = DIRS }) {
  const usados = guionesUsados(estado)
  const guiones = leerGuiones(dirs.guiones)
  /** @type {string[]} */
  const disponibles = []
  for (const g of guiones) {
    if (g.problemas.length || usados.has(g.guion.clave)) continue
    try {
      const formato = await cargarFormato(dirs.formatos, g.guion.formato)
      if (!formato.validar(g.guion).length) disponibles.push(g.guion.clave)
    } catch {
      /* formato que no existe o no carga: no está disponible */
    }
  }
  return { disponibles, total: guiones.length }
}

/**
 * Qué toca en esta corrida. Sólo lee.
 * @param {{ estado: import('./lib.mjs').Estado, ahora: Date, env: Record<string, string | undefined>, disponibles: number | null }} p
 */
export function planCorrida({ estado, ahora, env, disponibles }) {
  const accion = env.ACCION || 'todo'
  const seco = env.SECO === '1'
  /** @type {string[]} */
  const notas = []
  /** @type {string[]} */
  const avisos = []
  // Apagado hasta que exista la cuenta de Instagram de calcular y su token: sin esto producir
  // gastaría voz y quemaría guiones que nadie publica. dry_run corre igual (no sube ni publica).
  if (env.REELS_PRUEBA_ACTIVOS !== '1' && !seco) {
    notas.push('REELS_PRUEBA_ACTIVOS no es 1: los reels de prueba están apagados (ver docs/decisiones/reels-prueba.md § Prender)')
    return { producir: false, publicar: false, medir: false, notas, avisos }
  }
  let producir = false
  if (accion !== 'publicar') {
    if (env.REELS_PRUEBA_PAUSADOS === '1' && !env.GUION && !seco) notas.push('REELS_PRUEBA_PAUSADOS=1: no se produce')
    else {
      const d = debeProducir(estado, ahora, { forzado: Boolean(env.GUION) || seco })
      producir = d.producir
      notas.push(`producir: ${d.motivo}`)
      if (producir && !env.GUION && !d.reintentar && disponibles !== null) {
        if (disponibles === 0) {
          producir = false
          avisos.push('no quedan guiones disponibles en marketing/reels/guiones/ (usados, rotos o que su formato rechaza): hoy no hay creativo, hay que sumar más')
        } else notas.push(`quedan ${disponibles} guiones disponibles`)
      }
    }
  }
  let publicar = false
  let medir = false
  if (accion !== 'producir' && !seco) {
    publicar =
      porPublicar(estado, ahora, { ya: env.AHORA === 'true' }).length > 0 ||
      descartarViejas(estado, ahora).descartadas > 0 ||
      publicadasSinId(estado, ahora).length > 0 ||
      realPendiente(estado, ahora) !== null ||
      // La pausa por token se prueba en cada tic aunque no haya nada vencido: si no, no se levanta nunca.
      (Boolean(estado.pausado) && estado.pausado_por === 'token')
    const desde = ahora.getTime() - DIAS_MEDIR * 86_400_000
    medir = Object.values(estado.creativos).some((c) => c.variantes?.some((v) => v.ig_media_id && Date.parse(String(v.publicado_at)) >= desde))
    if (estado.pausado) notas.push(`pausado: ${estado.pausado}`)
  }
  return { producir, publicar, medir, notas, avisos }
}

/**
 * Cómo se anuncia lo que pasó al producir. Sólo la falla definitiva rompe la
 * corrida (y avisa por Sentry): las anteriores se reintentan solas.
 * @param {{ ok: boolean, creativo: string | null, motivo: string }} r @param {number} intentos
 * @returns {{ tipo: 'notice' | 'warning' | 'error', mensaje: string, fallar: boolean }}
 */
export function avisoProducir(r, intentos) {
  if (r.ok) return { tipo: 'notice', mensaje: r.motivo, fallar: false }
  if (!r.creativo) return { tipo: 'warning', mensaje: `no hubo creativo: ${r.motivo}`, fallar: false }
  const definitiva = intentos >= MAX_INTENTOS
  return { tipo: definitiva ? 'error' : 'warning', mensaje: r.motivo, fallar: definitiva }
}

async function planear() {
  const estado = leer()
  const env = process.env
  const disponibles = (env.ACCION || 'todo') !== 'publicar' && !env.GUION ? (await guionesDisponibles({ estado })).disponibles.length : null
  const p = planCorrida({ estado, ahora: new Date(), env, disponibles })
  for (const n of p.notas) log(n)
  for (const a of p.avisos) anotar('warning', a)
  salidas({ producir: p.producir ? '1' : '', publicar: p.publicar ? '1' : '', medir: p.medir ? '1' : '' })
}

async function comandoProducir() {
  const seco = arg('--seco') ?? (process.env.SECO === '1' ? join(process.env.RUNNER_TEMP ?? '.', 'reels-prueba') : null)
  const destino = seco ? join(resolve(seco), 'estado.json') : RUTA_ESTADO
  const estado = seco && existsSync(destino) ? leer(destino) : leer()
  const n = arg('--n')
  const r = await producir({
    estado,
    guionClave: arg('--guion') ?? (process.env.GUION || null),
    seco: seco ? resolve(seco) : null,
    dirs: { ...DIRS, guiones: arg('--guiones') ?? DIRS.guiones, formatos: arg('--formatos') ?? DIRS.formatos, cta: arg('--cta') ?? DIRS.cta },
    n: n ? Number(n) : undefined,
    log,
    guardar: guardarEn(destino),
  })
  salidas({ creativo: r.ok && r.creativo ? r.creativo : '' })
  const a = avisoProducir(r, r.creativo ? (r.estado.creativos[r.creativo]?.intentos ?? 0) : 0)
  anotar(a.tipo, a.mensaje)
  if (a.fallar) process.exitCode = 1
}

async function comandoPublicar() {
  const { publicarVencidas } = await import('./publicar.mjs')
  const guardar = guardarEn(RUTA_ESTADO)
  const r = await publicarVencidas({ estado: leer(), ya: process.argv.includes('--ahora') || process.env.AHORA === 'true', guardar, log })
  guardar(r.estado)
  salidas({ publicadas: String(r.publicadas.length) })
  // Una pausa nueva (token, permiso, bloqueo) o tres corridas seguidas con Meta rota: la corrida falla y avisa Sentry.
  if (r.fallar) {
    anotar('error', r.motivo)
    process.exitCode = 1
  } else anotar(r.publicadas.length ? 'notice' : 'warning', r.motivo)
}

async function comandoMedir() {
  const { medir } = await import('./medir.mjs')
  try {
    const r = await medir({ estado: leer(), log })
    if (r.medidas) guardarEn(RUTA_ESTADO)(r.estado)
    log(`${r.medidas} variantes medidas; insights ${r.estado.insights.disponible ? 'disponibles' : `no (${r.estado.insights.motivo})`}`)
  } catch (e) {
    anotar('warning', `medir falló: ${String(/** @type {Error} */ (e).message).split('\n')[0]}`)
  }
}

function fusionar() {
  const ruta = 'marketing/reels/estado.json'
  const etapa = (/** @type {number} */ n) => {
    try {
      return leerEstado(execFileSync('git', ['show', `:${n}:${ruta}`], { cwd: RAIZ, encoding: 'utf8' }))
    } catch {
      return leerEstado('')
    }
  }
  // En un rebase la etapa 2 es main (donde se reaplica) y la 3 el commit de esta corrida.
  guardarEn(RUTA_ESTADO)(fusionarEstado(etapa(1), etapa(2), etapa(3)))
  log('marketing/reels/estado.json fusionado con main')
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  const comando = process.argv[2]
  /** @type {Record<string, () => unknown>} */
  const tareas = { planear, producir: comandoProducir, publicar: comandoPublicar, medir: comandoMedir, fusionar }
  const tarea = comando ? tareas[comando] : undefined
  if (!tarea) {
    console.error('uso: node marketing/reels/scripts/prueba/correr.mjs planear|producir|publicar|medir|fusionar [--guion X] [--seco dir] [--ahora]')
    process.exit(2)
  }
  Promise.resolve()
    .then(tarea)
    .catch((e) => {
      anotar('error', String(/** @type {Error} */ (e).message).split('\n')[0] ?? 'error')
      process.exit(1)
    })
}
