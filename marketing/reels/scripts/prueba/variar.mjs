// @ts-check
import { spawn } from 'node:child_process'
import { mkdirSync, readFileSync, rmSync, statSync } from 'node:fs'
import { cpus } from 'node:os'
import { join } from 'node:path'
import { TOPE_MB, ordenAtomos, revisarSalida, ventanaZoom } from './lib.mjs'

/* ---------------------------------------------------------------------------
   Las variaciones, sólo con ffmpeg. Por variante: el cuerpo del hook que le
   toca con su zoom, encuadre y velocidad, el clip del cierre pegado con corte
   limpio, color y textura sobre las dos partes, música por debajo de todo
   (con ducking bajo la voz) y -14 LUFS. Primero el audio (dos pasadas de
   loudnorm sobre un WAV, rápido) y después una sola codificación de video.
   Cada salida se revisa con ffprobe contra lo que exige Meta.
--------------------------------------------------------------------------- */

export const LUFS = -14
const PICO = -1.5
const VOZ_LUFS = -16
// Con voz, la música va 11 dB debajo; en chat no hay voz y la música es la que sostiene.
const MUSICA_LUFS = { voz: -27, chat: -20 }
// veryfast: en 2 núcleos ~25 % menos que medium (medido 2026-11-08) y Meta recodifica igual.
const PRESET = process.env.REELS_PRUEBA_PRESET || 'veryfast'
const MAX_VELOCIDAD = 0.04

/** @param {number} x */
const r3 = (x) => Math.round(x * 1000) / 1000
const FORMATO_AUDIO = 'aresample=48000,aformat=sample_fmts=fltp:channel_layouts=stereo'

/** @param {number} v */
function revisarVelocidad(v) {
  if (!(Math.abs(v - 1) <= MAX_VELOCIDAD + 1e-9)) throw new Error(`velocidad ${v}: nunca más de ${MAX_VELOCIDAD * 100} %`)
}

/** @param {{ cuerpo_s: number, cierre_s: number, velocidad: number }} p */
export const duracionVariante = ({ cuerpo_s, cierre_s, velocidad }) => r3(r3(cuerpo_s / velocidad) + cierre_s)

/** dB para llevar `medido` LUFS a `objetivo`, acotado; lo mudo no se toca. @param {number} objetivo @param {number} medido */
export function ganancia(objetivo, medido) {
  if (!Number.isFinite(medido) || medido < -60) return 0
  return Math.max(-20, Math.min(20, r3(objetivo - medido)))
}

/** Tope de bitrate para que el mp4 entre en TOPE_MB con aire, nunca más de 8 Mbps. @param {number} duracion */
export const maxrateDe = (duracion) => Math.round(Math.max(800_000, Math.min(8_000_000, (TOPE_MB * 1048576 * 0.92 * 8) / duracion - 128_000)))

/** Sutiles: que se note como otra toma, no como un filtro. @param {string} color */
function filtroColor(color) {
  switch (color) {
    case 'calido':
      return 'colorbalance=rs=0.03:gs=0.005:bs=-0.035:rm=0.025:bm=-0.025:rh=0.015:bh=-0.02'
    case 'frio':
      return 'colorbalance=rs=-0.03:bs=0.035:rm=-0.02:bm=0.025:rh=-0.01:bh=0.02'
    case 'contraste':
      return 'eq=contrast=1.07:saturation=1.06'
    case 'mate':
      return "curves=all='0/0.045 0.5/0.5 1/0.96',eq=saturation=0.92"
    default:
      return null
  }
}

/** @param {string} textura */
function filtroTextura(textura) {
  if (textura === 'grano') return 'noise=c0s=6:c0f=t'
  if (textura === 'vineta') return 'vignette=angle=0.36'
  return null
}

/**
 * Entradas: 0 = cuerpo, 1 = clip del cierre. El cuerpo termina quieto 0,3 s
 * (contrato del formato): ahí entra el cierre con un corte limpio.
 * @param {{ cambios: import('./lib.mjs').Cambios, cuerpo_s: number, cierre_s: number }} p
 */
export function grafoVideo({ cambios: c, cuerpo_s, cierre_s }) {
  revisarVelocidad(c.velocidad)
  const v = ventanaZoom(c.zoom, c.encuadre)
  const d1 = r3(cuerpo_s / c.velocidad)
  const cuerpo = [
    c.velocidad !== 1 ? `setpts=PTS/${c.velocidad}` : null,
    'fps=30',
    c.zoom > 1 ? `scale=${v.ancho}:${v.alto}:flags=lanczos,crop=1080:1920:${v.x}:${v.y}` : 'scale=1080:1920:flags=lanczos',
    'setsar=1,format=yuv420p',
    `trim=duration=${d1}`,
    'setpts=PTS-STARTPTS',
  ].filter(Boolean)
  // colorbalance deja el cuadro en RGB planar: ahí el c0 de noise es el verde y pintaba una franja
  // roja en las últimas 8 columnas (2026-11-08). La textura va siempre sobre 4:2:0.
  const despues = [filtroColor(c.color), filtroTextura(c.textura) ? `format=yuv420p,${filtroTextura(c.textura)}` : null, 'format=yuv420p'].filter(Boolean)
  return [
    `[0:v]${cuerpo.join(',')}[vb]`,
    `[1:v]fps=30,scale=1080:1920:flags=lanczos,setsar=1,format=yuv420p,trim=duration=${r3(cierre_s)},setpts=PTS-STARTPTS[vc]`,
    `[vb][vc]concat=n=2:v=1:a=0,${despues.join(',')}[v]`,
  ].join(';')
}

/**
 * Entradas: 0 = cuerpo (voz + sfx), 1 = música (en loop), 2 = clip del cierre.
 * La música sigue por debajo del cierre y se agacha bajo la voz (sidechain);
 * en chat la llave es sólo el cierre, para que los sfx no la hagan bombear.
 * @param {{ cambios: import('./lib.mjs').Cambios, cuerpo_s: number, cierre_s: number, conVoz: boolean, cuerpoConAudio: boolean, g: { cuerpo: number, cierre: number, musica: number } }} p
 */
export function grafoAudio({ cambios: c, cuerpo_s, cierre_s, conVoz, cuerpoConAudio, g }) {
  revisarVelocidad(c.velocidad)
  const d1 = r3(cuerpo_s / c.velocidad)
  const d2 = r3(cierre_s)
  const total = r3(d1 + d2)
  const db = (/** @type {number} */ x) => `volume=${x.toFixed(2)}dB`
  const partes = [
    cuerpoConAudio
      ? `[0:a]${c.velocidad !== 1 ? `atempo=${c.velocidad},` : ''}${FORMATO_AUDIO},${db(g.cuerpo)},apad,atrim=0:${d1},asetpts=N/SR/TB[cu]`
      : `anullsrc=r=48000:cl=stereo,atrim=0:${d1},aformat=sample_fmts=fltp:channel_layouts=stereo[cu]`,
    `[2:a]${FORMATO_AUDIO},${db(g.cierre)},apad,atrim=0:${d2},asetpts=N/SR/TB[ci]`,
  ]
  if (conVoz) partes.push('[cu][ci]concat=n=2:v=0:a=1,asplit=2[voz][llave]')
  else
    partes.push(
      '[ci]asplit=2[ci1][ci2]',
      '[cu][ci1]concat=n=2:v=0:a=1[voz]',
      `anullsrc=r=48000:cl=stereo,atrim=0:${d1},aformat=sample_fmts=fltp:channel_layouts=stereo[sil]`,
      '[sil][ci2]concat=n=2:v=0:a=1[llave]',
    )
  partes.push(
    `[1:a]${FORMATO_AUDIO},atrim=0:${total},asetpts=N/SR/TB,${db(g.musica)},afade=t=in:d=0.4,afade=t=out:st=${r3(Math.max(0, total - 0.8))}:d=0.8[mus]`,
    '[mus][llave]sidechaincompress=threshold=0.035:ratio=4:attack=60:release=700:knee=3[musd]',
    `[voz][musd]amix=inputs=2:normalize=0:duration=first,atrim=0:${total}[mix]`,
  )
  return partes.join(';')
}

/**
 * @param {string} bin @param {string[]} args
 * @returns {Promise<{ stdout: string, stderr: string }>}
 */
function correr(bin, args) {
  return new Promise((ok, mal) => {
    const hijo = spawn(bin, args, { windowsHide: true })
    let stdout = ''
    let stderr = ''
    hijo.stdout.on('data', (d) => (stdout += d))
    hijo.stderr.on('data', (d) => (stderr += d))
    hijo.on('error', mal)
    hijo.on('close', (codigo) => (codigo === 0 ? ok({ stdout, stderr }) : mal(new Error(`${bin} salió con ${codigo}: ${stderr.trim().split('\n').slice(-6).join('\n')}`))))
  })
}

const ffmpeg = (/** @type {string[]} */ args) => correr(process.env.FFMPEG_PATH ?? 'ffmpeg', ['-hide_banner', '-nostdin', '-y', '-loglevel', 'error', ...args])

/** LUFS integrado de la primera pista de audio (−Infinity si es muda). @param {string} archivo */
export async function medirLufs(archivo) {
  const { stderr } = await correr(process.env.FFMPEG_PATH ?? 'ffmpeg', ['-hide_banner', '-nostdin', '-i', archivo, '-map', '0:a:0', '-af', 'ebur128=peak=true', '-f', 'null', '-'])
  const m = stderr.slice(stderr.lastIndexOf('Summary:')).match(/I:\s+(-?[\d.]+|-inf) LUFS/)
  return m && m[1] !== '-inf' ? Number(m[1]) : -Infinity
}

/** Lo que revisarSalida necesita de un mp4. @param {string} archivo */
export async function sondearSalida(archivo) {
  const { stdout } = await correr(process.env.FFPROBE_PATH ?? 'ffprobe', ['-v', 'error', '-show_format', '-show_streams', '-of', 'json', archivo])
  const j = JSON.parse(stdout)
  /** @type {any[]} */
  const streams = j.streams ?? []
  const v = streams.find((s) => s.codec_type === 'video')
  const a = streams.find((s) => s.codec_type === 'audio')
  const [n, d] = String(v?.avg_frame_rate ?? '0/1').split('/').map(Number)
  return {
    duracion: Number(j.format?.duration) || 0,
    bytes: statSync(archivo).size,
    atomos: ordenAtomos(readFileSync(archivo)),
    video: v ? { codec: v.codec_name, ancho: v.width, alto: v.height, fps: d ? (n ?? 0) / d : 0, pix_fmt: v.pix_fmt, bitrate: Number(v.bit_rate) || null, duracion: Number(v.duration) || 0 } : null,
    audio: a ? { codec: a.codec_name, frecuencia: Number(a.sample_rate) || 0, canales: a.channels, bitrate: Number(a.bit_rate) || null } : null,
  }
}

/**
 * Mezcla, normaliza a −14 LUFS en dos pasadas y deja un WAV 48 kHz.
 * @param {{ cuerpo: string, musica: string, cierre: string, grafo: string, salida: string, dir: string }} p
 */
async function armarAudio({ cuerpo, musica, cierre, grafo, salida, dir }) {
  const crudo = join(dir, `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-mezcla.wav`)
  try {
    await ffmpeg(['-i', cuerpo, '-stream_loop', '-1', '-i', musica, '-i', cierre, '-filter_complex', grafo, '-map', '[mix]', '-c:a', 'pcm_s24le', '-ar', '48000', crudo])
    const { stderr } = await correr(process.env.FFMPEG_PATH ?? 'ffmpeg', ['-hide_banner', '-nostdin', '-i', crudo, '-af', `loudnorm=I=${LUFS}:TP=${PICO}:LRA=11:print_format=json`, '-f', 'null', '-'])
    const m = JSON.parse(stderr.slice(stderr.lastIndexOf('{'), stderr.lastIndexOf('}') + 1))
    await ffmpeg([
      '-i', crudo,
      '-af', `loudnorm=I=${LUFS}:TP=${PICO}:LRA=11:measured_I=${m.input_i}:measured_TP=${m.input_tp}:measured_LRA=${m.input_lra}:measured_thresh=${m.input_thresh}:offset=${m.target_offset}:linear=true,aresample=48000`,
      '-c:a', 'pcm_s24le', '-ar', '48000', salida,
    ])
  } finally {
    rmSync(crudo, { force: true })
  }
}

/**
 * @typedef {{ archivo: string, duracion_s: number, conAudio: boolean, lufs: number }} Medio
 * @param {{ cambios: import('./lib.mjs').Cambios, id: string, cuerpo: Medio, cierre: Medio, musica: Medio, conVoz: boolean, dir: string }} p
 * @returns {Promise<{ archivo: string, duracion_s: number, bytes: number, lufs: number, segundos: number }>}
 */
export async function hacerVariante({ cambios: c, id, cuerpo, cierre, musica, conVoz, dir }) {
  const t0 = Date.now()
  const duracion = duracionVariante({ cuerpo_s: cuerpo.duracion_s, cierre_s: cierre.duracion_s, velocidad: c.velocidad })
  const g = {
    cuerpo: conVoz ? ganancia(VOZ_LUFS, cuerpo.lufs) : 0,
    cierre: ganancia(VOZ_LUFS, cierre.lufs),
    musica: ganancia(conVoz ? MUSICA_LUFS.voz : MUSICA_LUFS.chat, musica.lufs),
  }
  const audio = join(dir, `${id}.wav`)
  const salida = join(dir, `${id}.mp4`)
  try {
    await armarAudio({ cuerpo: cuerpo.archivo, musica: musica.archivo, cierre: cierre.archivo, grafo: grafoAudio({ cambios: c, cuerpo_s: cuerpo.duracion_s, cierre_s: cierre.duracion_s, conVoz, cuerpoConAudio: cuerpo.conAudio, g }), salida: audio, dir })
    const video = grafoVideo({ cambios: c, cuerpo_s: cuerpo.duracion_s, cierre_s: cierre.duracion_s })
    let maxrate = maxrateDe(duracion)
    let crf = 21
    for (let vuelta = 0; ; vuelta++) {
      await ffmpeg([
        '-i', cuerpo.archivo, '-i', cierre.archivo, '-i', audio,
        '-filter_complex', video, '-map', '[v]', '-map', '2:a:0',
        '-c:v', 'libx264', '-preset', PRESET, '-profile:v', 'high', '-level:v', '4.1', '-crf', String(crf),
        '-maxrate', String(maxrate), '-bufsize', String(maxrate * 2), '-g', '60', '-keyint_min', '30', '-sc_threshold', '0', '-flags', '+cgop',
        '-pix_fmt', 'yuv420p', '-r', '30',
        // 120k y no 128k: el AAC nativo de ffmpeg se pasa hasta un 4 % en los tramos fuertes, Meta pide ~128k y revisarSalida corta en 132 (2026-11-10: 2 de 3 variantes cayeron a 132-133 kbps).
        '-c:a', 'aac', '-b:a', '120k', '-ar', '48000', '-ac', '2',
        '-t', String(duracion), '-movflags', '+faststart', salida,
      ])
      if (statSync(salida).size <= TOPE_MB * 1048576 || vuelta >= 2) break
      crf += 3
      maxrate = Math.round(maxrate * 0.8)
    }
    const s = await sondearSalida(salida)
    const problemas = revisarSalida(s, { duracion_s: duracion })
    const lufs = await medirLufs(salida)
    if (!(Math.abs(lufs - LUFS) <= 1.5)) problemas.push(`quedó en ${lufs} LUFS (objetivo ${LUFS} ± 1,5)`)
    if (problemas.length) throw new Error(`${id}: ${problemas.join('; ')}`)
    return { archivo: salida, duracion_s: r3(s.duracion), bytes: s.bytes, lufs, segundos: Math.round((Date.now() - t0) / 100) / 10 }
  } finally {
    rmSync(audio, { force: true })
  }
}

/** Mide lo que la mezcla necesita de un medio. @param {string} archivo @returns {Promise<Medio>} */
export async function medio(archivo) {
  const s = await sondearSalida(archivo)
  const conAudio = Boolean(s.audio)
  return { archivo, duracion_s: r3(s.video?.duracion || s.duracion), conAudio, lufs: conAudio ? await medirLufs(archivo) : -Infinity }
}

/**
 * Todas las variantes, de a `paralelo` (en Actions, 2 núcleos: de a una; x264 ya usa los dos).
 * Una que falla no frena a las demás: vuelve con su error.
 * @param {{ cambios: import('./lib.mjs').Cambios[], cuerpos: Medio[], cierres: Map<string, Medio>, musicas: Map<string, Medio>, conVoz: boolean, dir: string, paralelo?: number, log?: (m: string) => void }} p
 * @returns {Promise<({ id: string, ok: true } & Awaited<ReturnType<typeof hacerVariante>> | { id: string, ok: false, error: string })[]>}
 */
export async function variarTodas({ cambios, cuerpos, cierres, musicas, conVoz, dir, paralelo = Number(process.env.REELS_PRUEBA_PARALELO) || Math.max(1, Math.floor(cpus().length / 4)), log = () => {} }) {
  mkdirSync(dir, { recursive: true })
  /** @type {any[]} */
  const salida = new Array(cambios.length)
  let siguiente = 0
  const obrero = async () => {
    while (siguiente < cambios.length) {
      const i = siguiente++
      const c = /** @type {import('./lib.mjs').Cambios} */ (cambios[i])
      const id = `v${String(i + 1).padStart(2, '0')}`
      try {
        const cuerpo = cuerpos[c.hook]
        const cierre = cierres.get(c.cierre)
        const musica = musicas.get(c.musica)
        if (!cuerpo || !cierre || !musica) throw new Error(`falta ${!cuerpo ? `el cuerpo del hook ${c.hook}` : !cierre ? `el cierre ${c.cierre}` : `la música ${c.musica}`}`)
        const r = await hacerVariante({ cambios: c, id, cuerpo, cierre, musica, conVoz, dir })
        salida[i] = { id, ok: true, ...r }
        log(`${id} lista en ${r.segundos} s (${(r.bytes / 1048576).toFixed(1)} MB, ${r.lufs} LUFS)`)
      } catch (e) {
        salida[i] = { id, ok: false, error: String(/** @type {Error} */ (e).message).split('\n').slice(0, 3).join(' ') }
        log(`${id} falló: ${salida[i].error}`)
      }
    }
  }
  await Promise.all(Array.from({ length: Math.max(1, paralelo) }, obrero))
  return salida
}
