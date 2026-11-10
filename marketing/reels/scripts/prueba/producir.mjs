// @ts-check
import { appendFileSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { spawn } from 'node:child_process'
import { tmpdir } from 'node:os'
import { basename, dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { alinearPalabras, hash8 } from '../reel/lib.mjs'
import { correr, ffmpeg, silencios, sondear } from '../reel/medios.mjs'
import { CAPTURAS, HYPERFRAMES } from '../reel/render.mjs'
import { tiemposDeVoz } from '../reel/tiempos.mjs'
import { PAUSAS, generarVoz } from '../reel/voz.mjs'
import { POR_DIA, agendar, armarCaptions, bordesDeVoz, debeProducir, diaAR, elegirGuion, matrizVariantes, resumenVariante, revisarGuion, unirVoces } from './lib.mjs'
import { medio, variarTodas } from './variar.mjs'

/* ---------------------------------------------------------------------------
   El creativo del día: elige el guion, locuta (el cuerpo una sola vez y los
   tres hooks aparte), arma y renderiza los tres cuerpos con el formato del
   guion (HyperFrames), saca las variaciones con ffmpeg, las sube a Vercel
   Blob y deja la agenda del día en el estado. Contrato de las piezas:
   marketing/reels/scripts/prueba/CONTRATO.md.
--------------------------------------------------------------------------- */

const AQUI = dirname(fileURLToPath(import.meta.url))
const RAIZ = join(AQUI, '..', '..')
export const DIRS = {
  guiones: join(RAIZ, 'guiones'),
  formatos: join(AQUI, 'formatos'),
  cta: join(AQUI, 'cta'),
  musica: join(RAIZ, 'scripts', 'reel', 'assets', 'musica'),
}
// Con menos de esto el día no vale: mejor reintentar que publicar un puñado.
const MINIMO_VARIANTES = 0.8
// HyperFrames se colgó sin morir en Actions (docs/decisiones/reels.md, "El render trabado"): se lo mata y va la captura siguiente.
const TOPE_RENDER_MS = 15 * 60_000

/** El formato no pudo armar el guion: el guion no vuelve. Todo lo demás (Blob, la voz, el render) no lo quema. */
class FallaDelGuion extends Error {}

/** @typedef {import('./lib.mjs').Estado} Estado @typedef {import('./lib.mjs').GuionLeido} GuionLeido */

/** El banco de guiones, ordenado por archivo, cada uno con lo que le falta. @param {string} dir @returns {GuionLeido[]} */
export function leerGuiones(dir) {
  if (!existsSync(dir)) return []
  return readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .sort()
    .map((archivo) => {
      try {
        const guion = JSON.parse(readFileSync(join(dir, archivo), 'utf8'))
        return { archivo, guion, problemas: revisarGuion(guion, archivo) }
      } catch (e) {
        return { archivo, guion: null, problemas: [`no es JSON válido: ${String(/** @type {Error} */ (e).message).slice(0, 80)}`] }
      }
    })
}

/**
 * Los clips del cierre que existen de verdad (marketing/reels/scripts/prueba/cta/clips.json).
 * @param {string} dir @param {(m: string) => void} [log]
 * @returns {{ id: string, paleta: string, estilo: string, archivo: string }[]}
 */
export function leerClips(dir, log = () => {}) {
  const ruta = join(dir, 'clips.json')
  if (!existsSync(ruta)) return []
  /** @type {any[]} */
  const lista = JSON.parse(readFileSync(ruta, 'utf8'))
  return (Array.isArray(lista) ? lista : []).flatMap((c) => {
    const archivo = typeof c?.archivo === 'string' ? resolve(dir, c.archivo) : ''
    if (typeof c?.id !== 'string' || typeof c?.paleta !== 'string' || typeof c?.estilo !== 'string' || !archivo || !existsSync(archivo)) {
      log(`clip de cierre inválido o sin archivo: ${JSON.stringify(c).slice(0, 120)}`)
      return []
    }
    return [{ id: c.id, paleta: c.paleta, estilo: c.estilo, archivo }]
  })
}

/** @param {string} dir @returns {Map<string, string>} id (nombre sin extensión) → archivo */
export function listarMusicas(dir) {
  if (!existsSync(dir)) return new Map()
  return new Map(readdirSync(dir).filter((f) => /\.(m4a|mp3|wav)$/i.test(f)).sort().map((f) => [f.replace(/\.[^.]+$/, ''), join(dir, f)]))
}

/** @param {string} dir @param {string} formato @returns {Promise<{ armar: (p: any) => Promise<{ duracion_s: number }>, validar: (g: any) => string[] }>} */
export async function cargarFormato(dir, formato) {
  const ruta = join(dir, formato, 'armar.mjs')
  if (!existsSync(ruta)) throw new Error(`no existe marketing/reels/scripts/prueba/formatos/${formato}/armar.mjs`)
  const m = await import(pathToFileURL(ruta).href)
  if (typeof m.armar !== 'function' || typeof m.validar !== 'function') throw new Error(`formatos/${formato}/armar.mjs no exporta armar() y validar()`)
  return m
}

/**
 * Sube una variante a Vercel Blob, igual que marketing/reels/scripts/reel/almacen.mjs: pública,
 * video/mp4, sin sufijo al azar (mismo contenido = misma ruta, volver a subir no es error).
 * @param {{ creativo: string, variante: string, archivo: string, env?: Record<string, string | undefined>, put?: (ruta: string, cuerpo: Buffer, opciones: object) => Promise<{ url: string }> }} p
 */
export async function subirVariante({ creativo, variante, archivo, env = process.env, put }) {
  const token = env.BLOB_READ_WRITE_TOKEN?.trim()
  if (!token) throw new Error('falta BLOB_READ_WRITE_TOKEN: sin Blob no hay URL para Instagram')
  const cuerpo = readFileSync(archivo)
  const ruta = `reels/prueba/${creativo}/${variante}-${hash8(cuerpo)}.mp4`
  const poner = put ?? /** @type {(ruta: string, cuerpo: Buffer, opciones: object) => Promise<{ url: string }>} */ ((await import('@vercel/blob')).put)
  const r = await poner(ruta, cuerpo, { access: 'public', contentType: 'video/mp4', addRandomSuffix: false, allowOverwrite: true, token })
  const url = new URL(String(r?.url ?? ''), 'https://invalido.local')
  if (url.protocol !== 'https:' || !url.hostname.endsWith('.blob.vercel-storage.com')) throw new Error(`Vercel Blob devolvió una URL inesperada: ${url.hostname}`)
  return url.toString()
}

// npx baja las dependencias de hyperframes en cada corrida: el render no tiene por qué ver las claves.
const SECRETOS = /^(BLOB_READ_WRITE_TOKEN|GEMINI_API_KEY|ELEVENLABS_API_KEY|IG_ACCESS_TOKEN|IG_USER_ID|KAIRO_GITHUB_TOKEN|GITHUB_TOKEN|ACTIONS_RUNTIME_TOKEN|ACTIONS_ID_TOKEN_REQUEST_TOKEN)$/

export function entornoSinSecretos(env = process.env) {
  /** @type {NodeJS.ProcessEnv} */
  const limpio = { HYPERFRAMES_NO_TELEMETRY: '1' }
  for (const [k, v] of Object.entries(env)) if (!SECRETOS.test(k)) limpio[k] = v
  return limpio
}

/**
 * @param {string} cmd @param {string[]} args @param {{ shell?: boolean, tope: number, registro?: string }} op
 */
function correrConTope(cmd, args, { shell = false, tope, registro }) {
  return new Promise((ok, mal) => {
    const hijo = spawn(cmd, args, { shell, stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true, env: entornoSinSecretos() })
    let cola = ''
    const anotar = (/** @type {Buffer} */ b) => {
      cola = (cola + b).slice(-4000)
      if (registro) appendFileSync(registro, b)
    }
    hijo.stdout.on('data', anotar)
    hijo.stderr.on('data', anotar)
    const reloj = setTimeout(() => {
      hijo.kill('SIGKILL')
      mal(new Error(`${cmd} no terminó en ${Math.round(tope / 60_000)} min`))
    }, tope)
    hijo.on('error', (e) => {
      clearTimeout(reloj)
      mal(e)
    })
    hijo.on('close', (codigo) => {
      clearTimeout(reloj)
      if (codigo === 0) ok(undefined)
      else mal(new Error(`${cmd} ${args.slice(0, 3).join(' ')} salió con ${codigo}: ${cola.trim().split('\n').slice(-4).join(' | ')}`))
    })
  })
}

/**
 * El proyecto HyperFrames del formato a mp4, con las banderas que no se traban
 * en Actions (CAPTURAS de marketing/reels/scripts/reel/render.mjs); si una falla, la siguiente.
 * @param {{ proyecto: string, salida: string, log?: (m: string) => void, depurar?: string }} p
 */
export async function renderizarCuerpo({ proyecto, salida, log = () => {}, depurar }) {
  const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx'
  if (depurar) mkdirSync(depurar, { recursive: true })
  /** @type {unknown} */
  let ultimo = null
  for (const [n, extra] of CAPTURAS.entries()) {
    rmSync(salida, { force: true })
    try {
      await correrConTope(npx, ['--yes', HYPERFRAMES, 'render', proyecto, '--output', salida, '--fps', '30', '--quality', 'delivery', depurar ? '--debug' : '--quiet', '--experimental-fast-capture=false', ...extra], {
        shell: process.platform === 'win32',
        tope: TOPE_RENDER_MS,
        registro: depurar ? join(depurar, `hyperframes-${basename(proyecto)}-${n + 1}.log`) : undefined,
      })
      if (existsSync(salida)) return
      ultimo = new Error('hyperframes terminó sin escribir el video')
    } catch (e) {
      ultimo = e
    }
    log(`hyperframes falló en ${basename(proyecto)} (intento ${n + 1} de ${CAPTURAS.length}): ${String(/** @type {Error} */ (ultimo).message).split('\n')[0]}`)
  }
  throw ultimo
}

/**
 * Locuta un texto (Malena de ElevenLabs, respaldo Gemini) y le pone tiempos por
 * palabra sobre el texto escrito. Queda cacheado en `dir` por si se reintenta ahí.
 * @param {{ texto: string, nombre: string, dir: string, env: Record<string, string | undefined>, log: (m: string) => void, deps: Deps }} p
 * @returns {Promise<{ wav: string, duracion_s: number, palabras: import('../reel/lib.mjs').Palabra[], proveedor: string, inicio_voz_s: number, fin_voz_s: number }>}
 */
async function locutar({ texto, nombre, dir, env, log, deps }) {
  const h = hash8(texto)
  const wav = join(dir, `${nombre}-${h}.wav`)
  const meta = join(dir, `${nombre}-${h}.json`)
  if (existsSync(wav) && existsSync(meta)) return JSON.parse(readFileSync(meta, 'utf8'))
  const v = await (deps.generarVoz ?? generarVoz)({ texto, idioma: 'es', env, log, respirar: env.REEL_RESPIRAR === '1' })
  const crudo = join(dir, `${nombre}-${h}-original.${v.formato}`)
  writeFileSync(crudo, v.audio)
  await ffmpeg(['-loglevel', 'error', '-i', crudo, '-ac', '1', '-ar', '48000', '-c:a', 'pcm_s16le', wav])
  rmSync(crudo, { force: true })
  const duracion_s = (await sondear(wav)).duracion
  const t = await (deps.tiemposDeVoz ?? tiemposDeVoz)({ guion: texto, wav, durVoz: duracion_s, idioma: 'es', palabrasVoz: v.palabras, silencios, log })
  const { stderr } = await correr(process.env.FFMPEG_PATH ?? 'ffmpeg', ['-hide_banner', '-nostdin', '-i', wav, '-af', 'silencedetect=noise=-40dB:d=0.05', '-f', 'null', '-'])
  const r = { wav, duracion_s, palabras: alinearPalabras(texto.split(/\s+/).filter(Boolean), t.palabras), proveedor: v.proveedor, ...bordesDeVoz(stderr, duracion_s) }
  writeFileSync(meta, JSON.stringify(r))
  return r
}

/**
 * @typedef {{ generarVoz?: typeof generarVoz, tiemposDeVoz?: typeof tiemposDeVoz, renderizar?: typeof renderizarCuerpo, put?: (ruta: string, cuerpo: Buffer, opciones: object) => Promise<{ url: string }> }} Deps
 */

/**
 * Del guion a las variantes subidas y agendadas.
 * @param {{ guion: any, formato: Awaited<ReturnType<typeof cargarFormato>>, clave: string, dir: string, dirs: typeof DIRS, n: number, seco: boolean,
 *   env: Record<string, string | undefined>, deps: Deps, log: (m: string) => void, reloj: () => Date }} p
 * @returns {Promise<import('./lib.mjs').Variante[]>}
 */
export async function producirCreativo({ guion, formato, clave, dir, dirs, n, seco, env, deps, log, reloj }) {
  mkdirSync(dir, { recursive: true })
  const clips = leerClips(dirs.cta, log)
  if (!clips.length) throw new Error('no hay clips de cierre en marketing/reels/scripts/prueba/cta/clips.json')
  const musicas = listarMusicas(dirs.musica)
  if (!musicas.size) throw new Error('no hay música en marketing/reels/scripts/reel/assets/musica')
  const t0 = Date.now()

  /** @type {({ wav: string, duracion_s: number, palabras: { texto: string, inicio_s: number, fin_s: number }[] } | null)[]} */
  let voces = [null, null, null]
  if (guion.voz) {
    const cuerpo = await locutar({ texto: guion.voz, nombre: 'cuerpo', dir, env, log, deps })
    log(`voz del cuerpo: ${cuerpo.duracion_s.toFixed(1)} s (${cuerpo.proveedor})`)
    voces = []
    for (const [h, texto] of /** @type {string[]} */ (guion.hooks).entries()) {
      const hook = await locutar({ texto, nombre: `hook-${h}`, dir, env, log, deps })
      const u = unirVoces({ hook, cuerpo, pausa: PAUSAS.tras_hook })
      const wav = join(dir, `voz-${h}.wav`)
      await ffmpeg([
        '-loglevel', 'error', '-i', hook.wav, '-i', cuerpo.wav,
        '-filter_complex', `[0:a]atrim=${u.inicio_s}:${u.corte_s},asetpts=PTS-STARTPTS,afade=t=in:d=0.008,afade=t=out:st=${Math.max(0, u.corte_s - u.inicio_s - 0.04).toFixed(3)}:d=0.04,apad=whole_dur=${u.desplazamiento_s}[h];[h][1:a]concat=n=2:v=0:a=1[v]`,
        '-map', '[v]', '-ac', '1', '-ar', '48000', '-c:a', 'pcm_s16le', wav,
      ])
      voces.push({ wav, duracion_s: u.duracion_s, palabras: u.palabras })
    }
  }
  const tVoz = Date.now()

  /** @type {Awaited<ReturnType<typeof medio>>[]} */
  const cuerpos = []
  for (let h = 0; h < 3; h++) {
    const proyecto = join(dir, `cuerpo-${h}`)
    rmSync(proyecto, { recursive: true, force: true })
    mkdirSync(proyecto, { recursive: true })
    /** @type {{ duracion_s: number }} */
    let armado
    try {
      armado = await formato.armar({ guion, hook: h, voz: voces[h], salida: proyecto })
    } catch (e) {
      throw new FallaDelGuion(`${guion.formato} no pudo armar el guion: ${String(/** @type {Error} */ (e).message).split('\n')[0]}`)
    }
    const mp4 = join(dir, `cuerpo-${h}.mp4`)
    await (deps.renderizar ?? renderizarCuerpo)({ proyecto, salida: mp4, log, depurar: env.REEL_RENDER_DEBUG })
    const m = await medio(mp4)
    if (Math.abs(m.duracion_s - armado.duracion_s) > 0.5) log(`cuerpo ${h}: dura ${m.duracion_s} s y armar dijo ${armado.duracion_s} s`)
    if (m.duracion_s < 3) throw new Error(`el cuerpo ${h} dura ${m.duracion_s} s`)
    cuerpos.push(m)
    log(`cuerpo ${h + 1} de 3 listo: ${m.duracion_s} s`)
  }
  const tRender = Date.now()

  const cambios = matrizVariantes({ n, semilla: clave, musicas: [...musicas.keys()], clips, paleta: guion.paleta })
  /** @type {Map<string, Awaited<ReturnType<typeof medio>>>} */
  const cierres = new Map()
  for (const c of clips) if (cambios.some((x) => x.cierre === c.id)) cierres.set(c.id, await medio(c.archivo))
  /** @type {Map<string, Awaited<ReturnType<typeof medio>>>} */
  const pistas = new Map()
  for (const id of new Set(cambios.map((x) => x.musica))) pistas.set(id, await medio(/** @type {string} */ (musicas.get(id))))
  const hechas = await variarTodas({ cambios, cuerpos, cierres, musicas: pistas, conVoz: Boolean(guion.voz), dir: join(dir, 'variantes'), log })
  const tVariar = Date.now()
  const ok = hechas.flatMap((h, i) => (h.ok ? [{ ...h, i }] : []))
  if (ok.length < Math.ceil(n * MINIMO_VARIANTES)) throw new Error(`salieron ${ok.length} de ${n} variantes (${hechas.find((h) => !h.ok && 'error' in h)?.error ?? ''})`)

  const captions = armarCaptions({ guion, n })
  const { horarios } = agendar({ n: ok.length, ahora: reloj(), semilla: clave })
  /** @type {import('./lib.mjs').Variante[]} */
  const variantes = []
  for (const [k, h] of ok.entries()) {
    const c = /** @type {import('./lib.mjs').Cambios} */ (cambios[h.i])
    const video_url = seco ? pathToFileURL(h.archivo).href : await subirVariante({ creativo: clave, variante: h.id, archivo: h.archivo, env, put: deps.put })
    variantes.push({
      id: h.id, cambios: c, resumen: resumenVariante(c), video_url, duracion_s: h.duracion_s, caption: /** @type {string} */ (captions[h.i]),
      publicar_at: /** @type {string} */ (horarios[k]), ig_media_id: null, permalink: null, publicado_at: null, error_publicar: null, intentos_publicar: 0, metricas: null,
    })
  }
  const s = (/** @type {number} */ a, /** @type {number} */ b) => Math.round((b - a) / 1000)
  log(`tiempos: voz ${s(t0, tVoz)} s, render ${s(tVoz, tRender)} s, variar ${ok.length} ${s(tRender, tVariar)} s, subir ${s(tVariar, Date.now())} s`)
  return variantes
}

/**
 * Lo que corre una vez por día (o a mano): decide si toca, elige el guion,
 * produce y deja el creativo en el estado (con su error si falló, contando el
 * intento antes de empezar: una corrida cortada a la mitad también cuenta).
 * @param {{ estado: Estado, ahora?: Date, guionClave?: string | null, seco?: string | null, dirs?: typeof DIRS, env?: Record<string, string | undefined>, n?: number,
 *   deps?: Deps, log?: (m: string) => void, guardar?: (e: Estado) => void, reloj?: () => Date, trabajo?: string }} p
 * @returns {Promise<{ estado: Estado, creativo: string | null, ok: boolean, motivo: string }>}
 */
export async function producir({ estado: inicial, ahora = new Date(), guionClave = null, seco = null, dirs = DIRS, env = process.env, n, deps = {}, log = () => {}, guardar = () => {}, reloj = () => new Date(), trabajo }) {
  let estado = inicial
  const cantidad = n ?? (Number(env.REELS_PRUEBA_POR_DIA) || POR_DIA)
  const nada = (/** @type {string} */ motivo) => ({ estado, creativo: null, ok: false, motivo })
  if (env.REELS_PRUEBA_PAUSADOS === '1' && !guionClave && !seco) return nada('REELS_PRUEBA_PAUSADOS=1: no se produce')
  const d = debeProducir(estado, ahora, { forzado: Boolean(guionClave) || Boolean(seco) })
  if (!d.producir) return nada(d.motivo)
  const hoy = diaAR(ahora)
  const guiones = leerGuiones(dirs.guiones)
  const fijo = guionClave ?? d.reintentar ?? null

  /** @param {string} clave @param {string} motivo */
  const saltar = (clave, motivo) => {
    estado = { ...estado, saltados: { ...estado.saltados, [clave]: { motivo: motivo.slice(0, 300), at: reloj().toISOString() } } }
    log(`guion ${clave} salteado: ${motivo}`)
  }

  /** @type {any} */
  let guion = null
  /** @type {Awaited<ReturnType<typeof cargarFormato>> | null} */
  let formato = null
  /** @type {Set<string>} */
  const excluir = new Set()
  while (!guion) {
    /** @type {GuionLeido | null} */
    let elegido
    if (fijo) {
      elegido = guiones.find((g) => g.guion?.clave === fijo || basename(g.archivo, '.json') === fijo) ?? null
      if (!elegido) return nada(`no existe marketing/reels/guiones/${fijo}.json`)
      if (elegido.problemas.length) {
        saltar(fijo, elegido.problemas.join('; '))
        guardar(estado)
        return nada(`el guion ${fijo} no es válido: ${elegido.problemas.join('; ')}`)
      }
    } else {
      const r = elegirGuion({ guiones, estado, hoy, excluir })
      for (const s of r.saltados) if (estado.saltados[s.clave]?.motivo !== s.motivo) saltar(s.clave, s.motivo)
      elegido = r.elegido
      if (!elegido) {
        guardar(estado)
        return nada(guiones.length ? 'no quedan guiones sin usar en marketing/reels/guiones/: hay que sumar más' : 'el banco de guiones (marketing/reels/guiones/) está vacío')
      }
    }
    const g = elegido.guion
    /** @type {string[]} */
    let problemas
    try {
      formato = await cargarFormato(dirs.formatos, g.formato)
      problemas = formato.validar(g)
    } catch (e) {
      problemas = [`formato ${g.formato}: ${String(/** @type {Error} */ (e).message).split('\n')[0]}`]
    }
    if (problemas.length) {
      saltar(g.clave, problemas.join('; '))
      if (fijo) {
        guardar(estado)
        return nada(`el guion ${g.clave} no pasa validar(): ${problemas.join('; ')}`)
      }
      excluir.add(g.clave)
      continue
    }
    guion = g
  }
  if (estado.saltados[guion.clave]) {
    const { [guion.clave]: _, ...resto } = estado.saltados
    estado = { ...estado, saltados: resto }
  }

  const clave = `${hoy}-${guion.clave}`
  const previo = estado.creativos[clave]
  if (previo?.producido_at) return nada(`${clave} ya está producido`)
  /** @type {import('./lib.mjs').Creativo} */
  let entrada = {
    clave: guion.clave, fecha: hoy, titulo: guion.titulo, categoria: guion.categoria, formato: guion.formato, paleta: guion.paleta,
    producido_at: null, error: 'produciendo: si queda así, la corrida se cortó a la mitad', intentos: (previo?.intentos ?? 0) + 1, variantes: [],
  }
  const poner = () => {
    estado = { ...estado, creativos: { ...estado.creativos, [clave]: entrada } }
    guardar(estado)
  }
  poner()
  log(`produciendo ${clave} (${guion.formato}, ${guion.categoria}, intento ${entrada.intentos}), ${cantidad} variantes`)
  const dir = seco ? join(seco, clave) : (trabajo ?? join(process.env.RUNNER_TEMP ?? tmpdir(), 'reels-prueba', clave))
  try {
    if (!seco && !env.BLOB_READ_WRITE_TOKEN?.trim()) throw new Error('falta BLOB_READ_WRITE_TOKEN: sin Blob no hay URL para Instagram')
    const variantes = await producirCreativo({ guion, formato: /** @type {any} */ (formato), clave, dir, dirs, n: cantidad, seco: Boolean(seco), env, deps, log, reloj })
    entrada = { ...entrada, producido_at: reloj().toISOString(), error: null, intentos: entrada.intentos - 1, variantes }
    poner()
    return { estado, creativo: clave, ok: true, motivo: `${clave}: ${variantes.length} variantes agendadas desde ${variantes[0]?.publicar_at}` }
  } catch (e) {
    const msg = String(/** @type {Error} */ (e).message).split('\n').slice(0, 3).join(' ').slice(0, 500)
    entrada = { ...entrada, error: msg, falla: e instanceof FallaDelGuion ? 'guion' : 'general' }
    poner()
    return { estado, creativo: clave, ok: false, motivo: `${clave} falló (intento ${entrada.intentos}): ${msg}` }
  } finally {
    if (!seco) rmSync(dir, { recursive: true, force: true })
  }
}
