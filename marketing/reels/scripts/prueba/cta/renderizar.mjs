// @ts-check
import { spawn } from 'node:child_process'
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { CLAVES_PALETA, audioHtml, copiarAssets, cssComun, escribirDatos, fondoHtml, paleta, rellenar, sfxHtml } from '../formatos/_comun/index.mjs'
import { CAPTURAS, HYPERFRAMES } from '../../reel/render.mjs'

/*
  El cierre "Hacé la cuenta ... en calcular.ar" que va al final de todos los reels de prueba: un clip por paleta y por
  estilo, renderizado una vez y commiteado en clips/. Se regenera con
    node marketing/reels/scripts/prueba/cta/renderizar.mjs [--paleta crema] [--estilo comentario] [--conservar]
  (la voz ya está en voz.wav; si cambia la frase: generar-voz.mjs).
*/

const AQUI = dirname(fileURLToPath(import.meta.url))
export const ESTILOS = /** @type {const} */ (['buscador', 'tipografico'])
export const DURACION = 4.9
// La voz entra 0,15 s después del corte: el primer cuadro ya está compuesto y en movimiento.
export const VOZ_INICIO = 0.15
const TOPE_BYTES = 2 * 1024 * 1024

/** @param {string} a @param {string} b @param {number} t */
function mezclar(a, b, t) {
  const x = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16))
  const y = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16))
  return '#' + x.map((v, i) => Math.round(v + ((y[i] ?? 0) - v) * t).toString(16).padStart(2, '0')).join('')
}

/**
 * @param {string} cmd @param {string[]} args @param {{ shell?: boolean }} [op]
 * @returns {Promise<{ salida: string, errores: string }>}
 */
function correr(cmd, args, { shell = false } = {}) {
  return new Promise((ok, mal) => {
    const hijo = spawn(cmd, args, { shell, stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true, env: { ...process.env, HYPERFRAMES_NO_TELEMETRY: '1' } })
    let salida = ''
    let errores = ''
    hijo.stdout.on('data', (b) => (salida += b))
    hijo.stderr.on('data', (b) => (errores += b))
    hijo.on('error', (e) => mal(new Error(`no se pudo correr ${cmd}: ${e.message}`)))
    hijo.on('close', (c) => (c === 0 ? ok({ salida, errores }) : mal(new Error(`${cmd} ${args.slice(0, 3).join(' ')} salió con ${c}: ${(errores || salida).trim().split('\n').slice(-8).join('\n')}`))))
  })
}

export function palabrasDeVoz() {
  const j = JSON.parse(readFileSync(join(AQUI, 'voz-palabras.json'), 'utf8'))
  return /** @type {{ texto: string, inicio_s: number, fin_s: number }[]} */ (j.palabras).map((p) => ({
    texto: p.texto,
    inicio: Math.round((p.inicio_s + VOZ_INICIO) * 1000) / 1000,
    fin: Math.round((p.fin_s + VOZ_INICIO) * 1000) / 1000,
  }))
}

/**
 * Arma el proyecto HyperFrames de un cierre.
 * @param {{ paleta: string, estilo: typeof ESTILOS[number], salida: string }} p
 */
export function armarCierre({ paleta: clave, estilo, salida }) {
  if (!ESTILOS.includes(estilo)) throw new Error(`estilo desconocido: ${estilo}`)
  const p = paleta(clave)
  const palabras = palabrasDeVoz()
  const de = (/** @type {string} */ t) => {
    const w = palabras.find((x) => x.texto.replace(/[.,]/g, '') === t)
    if (!w) throw new Error(`la voz no dice "${t}"`)
    return w
  }
  // Enter cuando termina de escribirse calcular.ar; la cuenta lista llega un respiro después.
  const envio = Math.round((de('ar').fin + 0.12) * 1000) / 1000
  const aviso = Math.round((envio + 0.32) * 1000) / 1000
  const firma = Math.round((de('ar').fin + 0.2) * 1000) / 1000
  const vars = {
    aviso: p.oscura ? mezclar(p.superficie, p.tinta, 0.06) : p.superficie,
    lupa: mezclar(p.superficie, p.acento, p.oscura ? 0.16 : 0.1),
  }
  mkdirSync(salida, { recursive: true })
  copiarAssets(salida)
  copyFileSync(join(AQUI, 'voz.wav'), join(salida, 'assets', 'voz.wav'))
  escribirDatos(salida, { estilo, palabras, envio, aviso, firma, vars, duracion: DURACION })
  const tc = de('calcular').inicio - 2 / 30
  const paso = (de('ar').fin - 0.1 - tc) / 11
  /** @type {{ tipo: any, t: number, volumen: number }[]} */
  const sfx =
    estilo === 'tipografico'
      ? [{ tipo: 'impact-bass-1', t: de('ar').inicio, volumen: 0.24 }]
      : [
          { tipo: 'click-soft', t: tc, volumen: 0.28 },
          { tipo: 'click-soft', t: tc + 4 * paso, volumen: 0.24 },
          { tipo: 'click-soft', t: tc + 8 * paso, volumen: 0.28 },
          { tipo: 'click-soft', t: envio - 0.07, volumen: 0.9 },
          { tipo: 'notification', t: aviso + 0.12, volumen: 0.32 },
        ]
  const finVoz = (palabras.at(-1)?.fin ?? 3.6) + 0.25 - VOZ_INICIO
  const audio = audioHtml({ id: 'voz', src: 'assets/voz.wav', inicio: VOZ_INICIO, duracion: Math.min(finVoz, DURACION - VOZ_INICIO), volumen: 1, pista: 10 }) + '\n' + sfxHtml(sfx, DURACION)
  // Cada clip lleva sólo el bloque de su estilo (el otro se saca del HTML, no sólo se oculta).
  const otro = estilo === 'buscador' ? 'tipografico' : 'buscador'
  const plantilla = readFileSync(join(AQUI, 'plantilla', 'index.html'), 'utf8').replace(new RegExp(`<div id="${otro}" class="capa">[\\s\\S]*?<!-- /${otro} -->\\r?\\n`), '')
  const html = rellenar(plantilla, {
    css: cssComun(clave),
    fondo: fondoHtml(),
    audio,
    duracion: DURACION.toFixed(3),
  })
  writeFileSync(join(salida, 'index.html'), html)
  return { duracion_s: DURACION }
}

/** @param {string} ruta */
export async function sondear(ruta) {
  const { salida } = await correr('ffprobe', ['-v', 'error', '-show_format', '-show_streams', '-of', 'json', ruta])
  const j = JSON.parse(salida)
  const v = j.streams.find((/** @type {any} */ s) => s.codec_type === 'video')
  const a = j.streams.find((/** @type {any} */ s) => s.codec_type === 'audio')
  return {
    duracion: Number(j.format.duration),
    bytes: statSync(ruta).size,
    video: v ? { codec: v.codec_name, ancho: v.width, alto: v.height, fps: v.r_frame_rate, pix: v.pix_fmt } : null,
    audio: a ? { codec: a.codec_name, hz: Number(a.sample_rate), canales: a.channels } : null,
  }
}

// Los cuerpos salen de HyperFrames cerca de −16 LUFS integrados (voz + sfx, sin música): el cierre
// queda en el mismo nivel para que el corte no salte de volumen.
export const LUFS = -16
const PICO = -1.5

/**
 * Ganancia fija medida con ebur128 + limitador. loudnorm sobre 4,9 s se pasaba 0,7-1,3 LU del objetivo.
 * @param {string} video
 */
async function nivelar(video) {
  const { errores } = await correr('ffmpeg', ['-hide_banner', '-nostdin', '-i', video, '-af', 'ebur128', '-f', 'null', '-'])
  const i = Number(errores.slice(errores.lastIndexOf('Summary:')).match(/I:\s+(-?[\d.]+) LUFS/)?.[1])
  if (!Number.isFinite(i) || i < -50) throw new Error(`el cierre salió mudo (${i} LUFS)`)
  return `aresample=48000,volume=${(LUFS - i).toFixed(2)}dB,alimiter=limit=${(10 ** (PICO / 20)).toFixed(3)}:level=false`
}

/**
 * Renderiza un cierre a `destino` con las especificaciones del contrato.
 * @param {{ paleta: string, estilo: typeof ESTILOS[number], destino: string, conservar?: boolean }} p
 */
export async function renderizarCierre({ paleta: clave, estilo, destino, conservar = false }) {
  const dir = mkdtempSync(join(tmpdir(), `cierre-${clave}-${estilo}-`))
  try {
    const proyecto = join(dir, 'proyecto')
    armarCierre({ paleta: clave, estilo, salida: proyecto })
    const crudo = join(dir, 'crudo.mp4')
    const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx'
    /** @type {unknown} */
    let error = null
    for (const extra of CAPTURAS) {
      rmSync(crudo, { force: true })
      try {
        await correr(npx, ['--yes', HYPERFRAMES, 'render', proyecto, '--output', crudo, '--fps', '30', '--quality', 'delivery', '--strict', '--quiet', '--experimental-fast-capture=false', ...extra], { shell: process.platform === 'win32' })
        error = null
        break
      } catch (e) {
        error = e
      }
    }
    if (error) throw error
    mkdirSync(dirname(destino), { recursive: true })
    const filtro = await nivelar(crudo)
    let r = null
    // HyperFrames en Windows captura las últimas 8 columnas en negro (en Linux salen bien): se rellenan con el borde.
    const borde = process.platform === 'win32' ? ',fillborders=right=8:mode=smear' : ''
    for (const crf of [18, 21, 24, 27]) {
      await correr('ffmpeg', [
        '-hide_banner', '-nostdin', '-y', '-loglevel', 'error', '-i', crudo,
        '-vf', `fps=30,scale=1080:1920,setsar=1${borde},format=yuv420p`,
        '-c:v', 'libx264', '-profile:v', 'high', '-preset', 'slow', '-crf', String(crf), '-g', '60',
        '-af', filtro,
        '-c:a', 'aac', '-b:a', '128k', '-ar', '48000', '-ac', '2',
        '-t', DURACION.toFixed(3), '-movflags', '+faststart', destino,
      ])
      r = await sondear(destino)
      if (r.bytes < TOPE_BYTES) break
    }
    if (!r) throw new Error('no se pudo codificar')
    const mal = []
    if (r.video?.codec !== 'h264' || r.video.ancho !== 1080 || r.video.alto !== 1920 || r.video.fps !== '30/1' || r.video.pix !== 'yuv420p') mal.push(`video ${JSON.stringify(r.video)}`)
    if (r.audio?.codec !== 'aac' || r.audio.hz !== 48000 || r.audio.canales !== 2) mal.push(`audio ${JSON.stringify(r.audio)}`)
    if (Math.abs(r.duracion - DURACION) > 0.05) mal.push(`dura ${r.duracion}`)
    if (r.bytes >= TOPE_BYTES) mal.push(`pesa ${r.bytes}`)
    if (mal.length) throw new Error(`el cierre ${clave}-${estilo} no cumple: ${mal.join('; ')}`)
    return r
  } finally {
    if (!conservar) rmSync(dir, { recursive: true, force: true })
  }
}

async function main() {
  const arg = (/** @type {string} */ n) => {
    const i = process.argv.indexOf(n)
    return i > 0 ? process.argv[i + 1] : undefined
  }
  const paletas = arg('--paleta') ? [/** @type {string} */ (arg('--paleta'))] : CLAVES_PALETA
  const estilos = arg('--estilo') ? [/** @type {typeof ESTILOS[number]} */ (arg('--estilo'))] : [...ESTILOS]
  const archivoLista = join(AQUI, 'clips.json')
  /** @type {{ id: string, paleta: string, estilo: string, archivo: string, duracion_s: number }[]} */
  const lista = existsSync(archivoLista) ? JSON.parse(readFileSync(archivoLista, 'utf8')) : []
  for (const clave of paletas) {
    for (const estilo of estilos) {
      const id = `${clave}-${estilo}`
      const t0 = Date.now()
      const r = await renderizarCierre({ paleta: clave, estilo, destino: join(AQUI, 'clips', `${id}.mp4`), conservar: process.argv.includes('--conservar') })
      const fila = { id, paleta: clave, estilo, archivo: `clips/${id}.mp4`, duracion_s: Math.round(r.duracion * 100) / 100 }
      const k = lista.findIndex((x) => x.id === id)
      if (k >= 0) lista[k] = fila
      else lista.push(fila)
      process.stderr.write(`[cierre] ${id}: ${Math.round(r.bytes / 1024)} KB en ${Math.round((Date.now() - t0) / 1000)} s\n`)
    }
  }
  const orden = (/** @type {{ paleta: string, estilo: string }} */ x) => CLAVES_PALETA.indexOf(/** @type {any} */ (x.paleta)) * 10 + ESTILOS.indexOf(/** @type {any} */ (x.estilo))
  lista.sort((a, b) => orden(a) - orden(b))
  writeFileSync(archivoLista, JSON.stringify(lista, null, 2) + '\n')
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((e) => {
    console.error(`[cierre] ${e?.message ?? e}`)
    process.exit(1)
  })
}
