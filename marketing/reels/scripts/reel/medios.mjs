// @ts-check
import { spawn } from 'node:child_process'
import { statSync } from 'node:fs'

const FFMPEG = process.env.FFMPEG_PATH ?? 'ffmpeg'
const FFPROBE = process.env.FFPROBE_PATH ?? 'ffprobe'

/**
 * @param {string} bin @param {string[]} args @param {{ cwd?: string }} [opciones]
 * @returns {Promise<{ stdout: string, stderr: string }>}
 */
export function correr(bin, args, { cwd } = {}) {
  return new Promise((ok, mal) => {
    const hijo = spawn(bin, args, { cwd, windowsHide: true })
    let stdout = ''
    let stderr = ''
    hijo.stdout.on('data', (d) => (stdout += d))
    hijo.stderr.on('data', (d) => (stderr += d))
    hijo.on('error', mal)
    hijo.on('close', (codigo) => (codigo === 0 ? ok({ stdout, stderr }) : mal(new Error(`${bin} salió con ${codigo}: ${stderr.slice(-1500)}`))))
  })
}

/** @param {string[]} args @param {{ cwd?: string }} [opciones] */
export const ffmpeg = (args, opciones) => correr(FFMPEG, ['-hide_banner', '-y', ...args], opciones)

/**
 * @param {string} archivo
 * @returns {Promise<{ duracion: number, bytes: number, video: { codec: string, ancho: number, alto: number, fps: number, duracion: number } | null, audio: { codec: string, duracion: number, frecuencia: number } | null }>}
 */
export async function sondear(archivo) {
  const { stdout } = await correr(FFPROBE, ['-v', 'error', '-show_entries', 'format=duration:stream=codec_type,codec_name,width,height,avg_frame_rate,duration,sample_rate', '-of', 'json', archivo])
  const datos = JSON.parse(stdout)
  /** @type {any[]} */
  const streams = datos.streams ?? []
  const v = streams.find((s) => s.codec_type === 'video')
  const a = streams.find((s) => s.codec_type === 'audio')
  const fps = (/** @type {string} */ r) => {
    const [n, d] = String(r ?? '0/1').split('/').map(Number)
    return d ? (n ?? 0) / d : 0
  }
  const total = Number(datos.format?.duration) || 0
  return {
    duracion: total,
    bytes: statSync(archivo).size,
    video: v ? { codec: v.codec_name, ancho: v.width, alto: v.height, fps: fps(v.avg_frame_rate), duracion: Number(v.duration) || total } : null,
    audio: a ? { codec: a.codec_name, duracion: Number(a.duration) || total, frecuencia: Number(a.sample_rate) || 0 } : null,
  }
}

/**
 * Un cuadro del video en gris, chico, como bytes crudos (un byte por píxel).
 * @param {string} video @param {number} t @param {{ ancho?: number, alto?: number }} [op]
 * @returns {Promise<Buffer>}
 */
export function cuadroGris(video, t, { ancho = 108, alto = 192 } = {}) {
  return new Promise((ok, mal) => {
    const hijo = spawn(FFMPEG, ['-hide_banner', '-loglevel', 'error', '-ss', Math.max(0, t).toFixed(3), '-i', video, '-frames:v', '1', '-vf', `scale=${ancho}:${alto},format=gray`, '-f', 'rawvideo', '-'], { windowsHide: true })
    /** @type {Buffer[]} */
    const partes = []
    let stderr = ''
    hijo.stdout.on('data', (d) => partes.push(d))
    hijo.stderr.on('data', (d) => (stderr += d))
    hijo.on('error', mal)
    hijo.on('close', (codigo) => {
      const b = Buffer.concat(partes)
      if (codigo === 0 && b.length >= ancho * alto) ok(b.subarray(0, ancho * alto))
      else mal(new Error(`ffmpeg (cuadro en ${t.toFixed(2)} s) salió con ${codigo}: ${stderr.slice(-300)}`))
    })
  })
}

/** Log de silencedetect sobre un audio. @param {string} archivo */
export async function silencios(archivo) {
  const { stderr } = await correr(FFMPEG, ['-hide_banner', '-i', archivo, '-af', 'silencedetect=noise=-35dB:d=0.25', '-f', 'null', '-'])
  return stderr
}
