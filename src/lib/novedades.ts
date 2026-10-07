import { NOVEDADES_REGISTRADAS } from "@/data/novedades";
import { paginaDeRuta } from "@/data/navegacion";

export type TipoNovedad = "dato" | "correccion";

export type Novedad = {
  id: string;
  serie: string;
  organismo: string;
  tipo: TipoNovedad;
  /** Día en que el organismo lo publicó (Boletín Oficial, INDEC, la Corte). Sólo si se sabe. */
  publicadoEl?: string;
  /** Día en que llegó a calcular.ar: lo escribe el pipeline o sale del commit. Sólo si se sabe. */
  cargadoEl?: string;
  rigeDesde?: string;
  titulo: string;
  detalle: string;
  fuente: { nombre: string; url: string };
  rutas: string[];
};

export const SITIO = "https://calcular.ar";

const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];
const MESES_CORTOS = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

export function fechaDe(n: Novedad): string {
  return (n.publicadoEl ?? n.cargadoEl)!;
}

/** Cuándo cambió el sitio: si no se sabe el día de carga, el de publicación (fue a lo sumo ese). */
export function fechaEnElSitio(n: Novedad): string {
  return (n.cargadoEl ?? n.publicadoEl)!;
}

function partes(iso: string) {
  const [a, m, d] = iso.split("-").map(Number);
  return { a, m, d };
}

/** "2026-09-28" → "28 de septiembre de 2026" */
export function fechaLargaNovedad(iso: string): string {
  const { a, m, d } = partes(iso);
  return `${d} de ${MESES[m - 1]} de ${a}`;
}

/** "2026-09-28" → "28 de septiembre" */
export function fechaSinAnio(iso: string): string {
  const { m, d } = partes(iso);
  return `${d} de ${MESES[m - 1]}`;
}

export function diaYMes(iso: string): { dia: number; mes: string } {
  const { m, d } = partes(iso);
  return { dia: d, mes: MESES_CORTOS[m - 1] };
}

/** "2026-09" → "septiembre de 2026" */
export function mesConAnio(periodo: string): string {
  return `${MESES[Number(periodo.slice(5, 7)) - 1]} de ${periodo.slice(0, 4)}`;
}

/** "2026-09" → "septiembre" */
export function nombreDeMes(periodo: string): string {
  return MESES[Number(periodo.slice(5, 7)) - 1];
}

/** RFC 822 para RSS. Mediodía de Buenos Aires: así el día no se corre en ningún lector. */
export function fechaRss(iso: string): string {
  return new Date(`${iso}T12:00:00-03:00`).toUTCString();
}

function ordenar(lista: readonly Novedad[]): Novedad[] {
  return [...lista].sort((x, y) => {
    const f = fechaDe(y).localeCompare(fechaDe(x));
    if (f !== 0) return f;
    const c = fechaEnElSitio(y).localeCompare(fechaEnElSitio(x));
    return c !== 0 ? c : x.id.localeCompare(y.id);
  });
}

export const NOVEDADES: Novedad[] = ordenar(NOVEDADES_REGISTRADAS);

/** Las últimas `n`, una por serie: así un dato que se mueve seguido no tapa a los demás. */
export function ultimasNovedades(n: number): Novedad[] {
  const vistas = new Set<string>();
  const salida: Novedad[] = [];
  for (const x of NOVEDADES) {
    if (vistas.has(x.serie)) continue;
    vistas.add(x.serie);
    salida.push(x);
    if (salida.length === n) break;
  }
  return salida;
}

/** El último día en que el sitio cambió por un dato oficial. Real: sale del registro, no del reloj. */
export function ultimoCambio(): string | null {
  return NOVEDADES.reduce<string | null>((max, x) => {
    const f = fechaEnElSitio(x);
    return !max || f > max ? f : max;
  }, null);
}

export function porMes(lista: readonly Novedad[] = NOVEDADES): { periodo: string; items: Novedad[] }[] {
  const grupos = new Map<string, Novedad[]>();
  for (const x of lista) {
    const p = fechaDe(x).slice(0, 7);
    grupos.set(p, [...(grupos.get(p) ?? []), x]);
  }
  return [...grupos.entries()].map(([periodo, items]) => ({ periodo, items }));
}

export function calculadorasDe(n: Novedad): { href: string; titulo: string }[] {
  return n.rutas.map((href) => {
    const p = paginaDeRuta(href);
    return { href, titulo: p?.corto ?? p?.titulo ?? href };
  });
}

export function organismosVigilados(): string[] {
  return [...new Set(NOVEDADES.map((x) => x.organismo))].sort((a, b) => a.localeCompare(b, "es"));
}

/** Cómo llegó al sitio, en una frase. null cuando no se sabe el día de carga ni hay qué contar. */
export function llegada(n: Novedad): { texto: string; mismoDia: boolean } | null {
  if (n.publicadoEl && n.cargadoEl) {
    if (n.publicadoEl === n.cargadoEl) return { texto: "En el sitio el mismo día", mismoDia: true };
    return { texto: `En el sitio desde el ${fechaSinAnio(n.cargadoEl)}`, mismoDia: false };
  }
  if (n.cargadoEl) return { texto: `En el sitio desde el ${fechaSinAnio(n.cargadoEl)}`, mismoDia: false };
  return null;
}
