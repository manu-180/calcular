// Helpers de lectura del Boletín Oficial para los cargadores automáticos. La descarga (con sus minas:
// fecha en el path, ediciones ajenas en días no hábiles, encoding variable, fallback a curl) vive en
// scripts/vigia/boletin-oficial.ts y se reusa acá: un solo cliente del B.O. en el repo.

import { leerAviso as leerAvisoBO, listarSeccion, type Aviso } from "../vigia/boletin-oficial";

export type { Aviso };

export const normalizar = (s: string) => s.normalize("NFD").replace(/\p{M}/gu, "").toUpperCase();

export function restarDias(iso: string, n: number): string {
  const d = new Date(`${iso}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() - n);
  return d.toISOString().slice(0, 10);
}

/** Avisos de la primera sección de un día. null = la fuente no respondió. [] = no hubo edición. */
export async function avisosDelDia(fechaIso: string): Promise<Aviso[] | null> {
  const avisos = await listarSeccion("primera", fechaIso);
  return avisos === null ? null : avisos.filter((a) => a.fecha === fechaIso);
}

export function leerAviso(id: string, fechaIso: string): Promise<string | null> {
  return leerAvisoBO("primera", id, fechaIso);
}

/** Barre los últimos `dias` días hasta `hastaIso` y devuelve los avisos cuyo título matchea. */
export async function buscar(hastaIso: string, dias: number, patron: RegExp): Promise<Aviso[] | null> {
  const out: Aviso[] = [];
  for (let i = 0; i < dias; i++) {
    const avisos = await avisosDelDia(restarDias(hastaIso, i));
    if (avisos === null) return null;
    out.push(...avisos.filter((a) => patron.test(normalizar(a.titulo))));
  }
  return out;
}

/** "$435.748,51" → 435748.51 */
export function montoArs(txt: string): number {
  return Number(txt.replace(/[$\s.]/g, "").replace(",", "."));
}

/** Los montos "($...)" de un artículo, en orden. */
export function montosDelArticulo(texto: string, n: number): number[] {
  const re = new RegExp(`ART[IÍ]CULO ${n}[°º]?\\.?-([\\s\\S]*?)(?=ART[IÍ]CULO ${n + 1}[°º]?\\.?-|$)`, "i");
  const cuerpo = texto.match(re)?.[1] ?? "";
  return [...cuerpo.matchAll(/\(\s*\$\s*([\d.]+,\d{2}|[\d.]+)\s*\)/g)].map((m) => montoArs(m[1]));
}

export function articulo(texto: string, n: number): string {
  const re = new RegExp(`ART[IÍ]CULO ${n}[°º]?\\.?-([\\s\\S]*?)(?=ART[IÍ]CULO ${n + 1}[°º]?\\.?-|$)`, "i");
  return texto.match(re)?.[1] ?? "";
}

const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

/** "octubre de 2026" → "2026-10" (el primero que aparezca en el texto). */
export function periodoEnTexto(texto: string): string | null {
  const m = texto.toLowerCase().match(new RegExp(`(${MESES.join("|")}) de (\\d{4})`));
  if (!m) return null;
  return `${m[2]}-${String(MESES.indexOf(m[1]) + 1).padStart(2, "0")}`;
}

/** "2026-10" → "octubre de 2026" */
export function vigenciaDe(periodo: string): string {
  return `${MESES[Number(periodo.slice(5, 7)) - 1]} de ${periodo.slice(0, 4)}`;
}

/** "2026-09-28" → "28 de septiembre de 2026" */
export function fechaBO(iso: string): string {
  return `${Number(iso.slice(8, 10))} de ${MESES[Number(iso.slice(5, 7)) - 1]} de ${iso.slice(0, 4)}`;
}
