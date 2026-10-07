import { createHash } from "node:crypto";
import { revisarPuntos } from "../../../src/motor/bandas";
import { esFechaISO, sumarDias } from "../../../src/motor/vigencia";
import type { DetectorNorma, DetectorSerie, FechaISO, HallazgoNorma, Http, PaisDefinido, PuntoSerie } from "../../../src/motor/tipos";
import { httpParaDetector, type LlamadaHttp } from "./http";

export const TIMEOUT_DETECTOR_MS = 90_000;
// Una norma más vieja que esto ya no es "nueva" aunque nadie la haya marcado: evita que la primera
// corrida de un país vuelque meses de diario oficial al issue.
export const VENTANA_NORMAS_DIAS = 90;

export type EstadoDetector = "sin-novedad" | "actualizado" | "rechazado" | "fuente-caida" | "norma-nueva" | "error";

export interface ResultadoDetector {
  id: string;
  carril: "serie" | "norma";
  objetivo: string;
  estado: EstadoDetector;
  detalle: string;
  llamadas: LlamadaHttp[];
}

export interface HallazgoNuevo extends HallazgoNorma {
  clave: string;
  detector: string;
  datos: readonly string[];
}

export interface Corrida {
  resultados: ResultadoDetector[];
  puntosNuevos: Map<string, PuntoSerie[]>;
  hallazgosNuevos: HallazgoNuevo[];
}

export function claveHallazgo(detector: string, url: string): string {
  let u = url.trim();
  try {
    const x = new URL(u);
    x.hash = "";
    u = x.toString().replace(/\/$/, "");
  } catch {
    u = url.trim();
  }
  return createHash("sha1").update(`${detector}|${u}`).digest("hex").slice(0, 12);
}

async function conTimeout<T>(p: Promise<T>, ms: number, que: string): Promise<T> {
  let t: NodeJS.Timeout | undefined;
  try {
    return await Promise.race([
      p,
      new Promise<never>((_, rej) => {
        t = setTimeout(() => rej(new Error(`${que}: no respondió en ${Math.round(ms / 1000)} s`)), ms);
      }),
    ]);
  } finally {
    if (t) clearTimeout(t);
  }
}

function ultimaVerificacion(pais: PaisDefinido, datos: readonly string[]): FechaISO | null {
  let max: FechaISO | null = null;
  for (const d of pais.datos) {
    if (!datos.includes(d.id)) continue;
    for (const t of d.tramos) {
      const v = t.fuente?.verificadoEl;
      if (v && esFechaISO(v) && (max === null || v > max)) max = v;
    }
  }
  return max;
}

interface Opciones {
  hoy: FechaISO;
  vistos: ReadonlySet<string>;
  timeoutMs?: number;
}

const iguales = (a: number, b: number) => Math.abs(a - b) <= 1e-9 * Math.max(1, Math.abs(a), Math.abs(b));

async function correrSerie(pais: PaisDefinido, det: DetectorSerie, http: Http, op: Opciones, llamadas: LlamadaHttp[]) {
  const base = { id: det.id, carril: "serie" as const, objetivo: det.serie, llamadas };
  const serie = pais.series.find((s) => s.id === det.serie);
  if (!serie) return { r: { ...base, estado: "error" as const, detalle: `la serie ${det.serie} no está en series.json (o el archivo tiene errores)` }, puntos: [] };
  let traidos: readonly PuntoSerie[] | null;
  try {
    traidos = await conTimeout(det.traer(http), op.timeoutMs ?? TIMEOUT_DETECTOR_MS, det.id);
  } catch (err) {
    return { r: { ...base, estado: "fuente-caida" as const, detalle: `la fuente falló: ${(err as Error).message}` }, puntos: [] };
  }
  if (traidos === null) return { r: { ...base, estado: "fuente-caida" as const, detalle: "la fuente respondió con una forma inesperada (traer devolvió null)" }, puntos: [] };
  if (!Array.isArray(traidos)) return { r: { ...base, estado: "error" as const, detalle: "traer no devolvió una lista de puntos" }, puntos: [] };

  const ultima = serie.puntos[serie.puntos.length - 1]?.[0] ?? "0000-00-00";
  const publicados = new Map(serie.puntos.map(([f, v]) => [f, v]));
  // Solo se revisa desde el último punto publicado: comparar un punto de hace un mes contra el valor
  // de hoy dispara el salto máximo en una serie que sube todos los días (UF, UDIS).
  const recientes = traidos.filter((p) => typeof p?.fecha === "string" && p.fecha >= ultima);
  const revisados = traidos.filter((p) => typeof p?.fecha === "string" && p.fecha < ultima);
  const corregidos = revisados.filter((p) => publicados.has(p.fecha) && !iguales(publicados.get(p.fecha)!, p.valor));
  const rev = revisarPuntos(serie, recientes, det.banda, op.hoy);
  if (rev.rechazos.length) {
    return { r: { ...base, estado: "rechazado" as const, detalle: `no se escribió nada: ${rev.rechazos.slice(0, 4).join("; ")}${rev.rechazos.length > 4 ? ` (y ${rev.rechazos.length - 4} más)` : ""}` }, puntos: [] };
  }
  const nota = corregidos.length ? `; ojo: la fuente cambió ${corregidos.length} valor(es) ya publicado(s) (${corregidos.slice(0, 3).map((p) => `${p.fecha}: ${publicados.get(p.fecha)} → ${p.valor}`).join(", ")}), no se tocan` : "";
  if (rev.aceptados.length === 0) {
    return { r: { ...base, estado: corregidos.length ? ("rechazado" as const) : ("sin-novedad" as const), detalle: `sin puntos nuevos (último publicado: ${ultima})${nota}` }, puntos: [] };
  }
  const desde = rev.aceptados[0].fecha;
  const hasta = rev.aceptados[rev.aceptados.length - 1];
  return {
    r: { ...base, estado: "actualizado" as const, detalle: `${rev.aceptados.length} punto(s) nuevo(s), ${desde === hasta.fecha ? desde : `${desde} a ${hasta.fecha}`}, último ${hasta.valor}${nota}` },
    puntos: rev.aceptados,
  };
}

async function correrNorma(pais: PaisDefinido, det: DetectorNorma, http: Http, op: Opciones, llamadas: LlamadaHttp[]) {
  const base = { id: det.id, carril: "norma" as const, objetivo: det.datos.join(", "), llamadas };
  let traidos: readonly HallazgoNorma[] | null;
  try {
    traidos = await conTimeout(det.traer(http), op.timeoutMs ?? TIMEOUT_DETECTOR_MS, det.id);
  } catch (err) {
    return { r: { ...base, estado: "fuente-caida" as const, detalle: `la fuente falló: ${(err as Error).message}` }, hallazgos: [] };
  }
  if (traidos === null) return { r: { ...base, estado: "fuente-caida" as const, detalle: "la fuente respondió con una forma inesperada (traer devolvió null)" }, hallazgos: [] };
  if (!Array.isArray(traidos)) return { r: { ...base, estado: "error" as const, detalle: "traer no devolvió una lista de hallazgos" }, hallazgos: [] };

  const verificado = ultimaVerificacion(pais, det.datos);
  const limite = sumarDias(op.hoy, -VENTANA_NORMAS_DIAS);
  const nuevos: HallazgoNuevo[] = [];
  let anteriores = 0;
  let repetidos = 0;
  let invalidos = 0;
  const enEstaCorrida = new Set<string>();
  for (const h of traidos) {
    if (!h || typeof h.titulo !== "string" || !h.titulo.trim() || typeof h.url !== "string" || !/^https?:\/\//.test(h.url) || !esFechaISO(h.fecha)) {
      invalidos++;
      continue;
    }
    // Una norma publicada antes de la última verificación de los datos que vigila ya la vio quien
    // verificó: avisarla es ruido. El mismo día sí se avisa (no sabemos el orden).
    if (h.fecha < limite || (verificado !== null && h.fecha < verificado)) {
      anteriores++;
      continue;
    }
    const clave = claveHallazgo(det.id, h.url);
    if (op.vistos.has(clave) || enEstaCorrida.has(clave)) {
      repetidos++;
      continue;
    }
    enEstaCorrida.add(clave);
    nuevos.push({ titulo: h.titulo.trim(), url: h.url, fecha: h.fecha, clave, detector: det.id, datos: det.datos });
  }
  const partes = [`${traidos.length} hallazgo(s)`];
  if (nuevos.length) partes.push(`${nuevos.length} nuevo(s)`);
  if (repetidos) partes.push(`${repetidos} ya avisado(s)`);
  if (anteriores) partes.push(`${anteriores} anterior(es) a la última verificación${verificado ? ` (${verificado})` : ""}`);
  if (invalidos) partes.push(`${invalidos} con forma inválida`);
  return { r: { ...base, estado: nuevos.length ? ("norma-nueva" as const) : ("sin-novedad" as const), detalle: partes.join(", ") }, hallazgos: nuevos };
}

// Dos detectores de la misma serie (SII y mindicador para la UF) tienen que coincidir en las fechas
// que comparten; si no, no se escribe ninguno de los dos.
function cruzarFuentes(resultados: ResultadoDetector[], porDetector: Map<string, PuntoSerie[]>, detectores: readonly DetectorSerie[]): Map<string, PuntoSerie[]> {
  const salida = new Map<string, PuntoSerie[]>();
  const porSerie = new Map<string, DetectorSerie[]>();
  for (const d of detectores) porSerie.set(d.serie, [...(porSerie.get(d.serie) ?? []), d]);
  for (const [serie, dets] of porSerie) {
    const conPuntos = dets.filter((d) => (porDetector.get(d.id)?.length ?? 0) > 0);
    if (conPuntos.length === 0) continue;
    const mapa = new Map<FechaISO, { valor: number; det: string }>();
    const choques: string[] = [];
    for (const d of conPuntos) {
      for (const p of porDetector.get(d.id)!) {
        const previo = mapa.get(p.fecha);
        if (previo && !iguales(previo.valor, p.valor)) choques.push(`${p.fecha}: ${previo.det} dice ${previo.valor} y ${d.id} dice ${p.valor}`);
        else if (!previo) mapa.set(p.fecha, { valor: p.valor, det: d.id });
      }
    }
    if (choques.length) {
      for (const d of conPuntos) {
        const r = resultados.find((x) => x.id === d.id)!;
        r.estado = "rechazado";
        r.detalle = `las fuentes de ${serie} no coinciden, no se escribió nada: ${choques.slice(0, 3).join("; ")}`;
      }
      continue;
    }
    salida.set(serie, [...mapa.entries()].sort(([a], [b]) => (a < b ? -1 : 1)).map(([fecha, { valor }]) => ({ fecha, valor })));
  }
  return salida;
}

export async function correrDetectores(pais: PaisDefinido, httpBase: Http, op: Opciones): Promise<Corrida> {
  const resultados: ResultadoDetector[] = [];
  const porDetector = new Map<string, PuntoSerie[]>();
  const hallazgosNuevos: HallazgoNuevo[] = [];
  const conErrores = pais.errores.length > 0;
  for (const det of pais.detectores) {
    const llamadas: LlamadaHttp[] = [];
    const http = httpParaDetector(httpBase, det, llamadas);
    if (det.carril === "serie") {
      if (conErrores) {
        resultados.push({ id: det.id, carril: "serie", objetivo: det.serie, estado: "error", detalle: `el país tiene ${pais.errores.length} error(es) de datos: no se escriben series hasta corregirlos`, llamadas });
        continue;
      }
      const { r, puntos } = await correrSerie(pais, det, http, op, llamadas);
      resultados.push(r);
      porDetector.set(det.id, puntos);
    } else if (det.carril === "norma") {
      const { r, hallazgos } = await correrNorma(pais, det, http, op, llamadas);
      resultados.push(r);
      for (const h of hallazgos) if (!hallazgosNuevos.some((x) => x.clave === h.clave)) hallazgosNuevos.push(h);
    } else {
      const d = det as { id: string };
      resultados.push({ id: d.id, carril: "serie", objetivo: "?", estado: "error", detalle: "carril desconocido", llamadas });
    }
  }
  const series = pais.detectores.filter((d): d is DetectorSerie => d.carril === "serie");
  const puntosNuevos = cruzarFuentes(resultados, porDetector, series);
  return { resultados, puntosNuevos, hallazgosNuevos };
}
