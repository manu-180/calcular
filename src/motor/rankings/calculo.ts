import { diaDeLibertad, diasDelAnio, netoAnualPpa, tasaEfectiva } from "../mundo/calculo";
import type { GrillaMundo, PaisMundo } from "../mundo/tipos";
import { IDS_RANKING, type IdRanking } from "./rutas";

// Rankings de países armados sobre la grilla de «Tu sueldo en el mundo». Todo sale de la grilla: un
// país que entra a la grilla aparece en todos los rankings y uno que sale desaparece, sin tocar nada.
// Los sueldos de referencia son brutos ANUALES en dólares internacionales (PPA), los mismos en todos
// los países: así «mismo sueldo» quiere decir el mismo poder de compra.

export const NIVELES = { bajo: 12_000, medio: 30_000, alto: 75_000 } as const;
export type IdNivel = keyof typeof NIVELES;
export const IDS_NIVEL: readonly IdNivel[] = ["bajo", "medio", "alto"];

// Un aumento se mide entre dos niveles: de cada dólar que se suma entre uno y otro, cuánto queda.
export const TRAMOS = { "bajo-medio": ["bajo", "medio"], "medio-alto": ["medio", "alto"] } as const satisfies Record<string, readonly [IdNivel, IdNivel]>;
export type IdTramo = keyof typeof TRAMOS;
export const IDS_TRAMO: readonly IdTramo[] = ["bajo-medio", "medio-alto"];

// Niveles del archivo de datos abiertos: los tres de los rankings y dos intermedios.
export const NIVELES_DATOS: readonly number[] = [12_000, 20_000, 30_000, 50_000, 75_000];

export type Variante = IdNivel | IdTramo;

export interface DefinicionRanking {
  id: IdRanking;
  variantes: readonly Variante[];
  porDefecto: Variante;
  // asc: el valor más chico va primero (el día de libertad más temprano). desc: el más grande.
  orden: "asc" | "desc";
}

export const RANKINGS: Readonly<Record<IdRanking, DefinicionRanking>> = {
  rinde: { id: "rinde", variantes: IDS_NIVEL, porDefecto: "medio", orden: "desc" },
  libertad: { id: "libertad", variantes: IDS_NIVEL, porDefecto: "medio", orden: "asc" },
  aumento: { id: "aumento", variantes: IDS_TRAMO, porDefecto: "medio-alto", orden: "desc" },
};

export function esVariante(id: IdRanking, v: string | null | undefined): v is Variante {
  return typeof v === "string" && (RANKINGS[id].variantes as readonly string[]).includes(v);
}

export function esIdRanking(v: string | null | undefined): v is IdRanking {
  return typeof v === "string" && (IDS_RANKING as readonly string[]).includes(v);
}

export interface FilaRanking {
  mercado: string;
  iso: string;
  // Competición estándar (1, 2, 2, 4): los empatados comparten puesto y el siguiente salta.
  puesto: number;
  // Cuántos países comparten este puesto, incluido este (1 = sin empate).
  empatados: number;
  // El dato del ranking: neto mensual en dólares internacionales (rinde), día del año (libertad) o
  // cuánto queda de cada 100 de aumento (aumento).
  valor: number;
  // Lo que decide el orden y el empate: el valor con la precisión que muestra la página. Dos países
  // que la página muestra iguales comparten puesto.
  clave: number;
  // Carga sobre el sueldo (0-1): tasa efectiva en rinde y libertad, tasa marginal del tramo en aumento.
  carga: number;
  // Proporción para la barra (0-1): lo que queda del bruto, la parte del año para el Estado, lo que
  // queda del aumento. Siempre sobre una escala que empieza en cero.
  barra: number;
}

export interface ResultadoRanking {
  id: IdRanking;
  variante: Variante;
  anio: number;
  filas: readonly FilaRanking[];
}

const redondear = (x: number, decimales: number) => Math.round(x * 10 ** decimales) / 10 ** decimales;

function medir(id: IdRanking, variante: Variante, pais: PaisMundo, anio: number): Omit<FilaRanking, "puesto" | "empatados"> {
  const base = { mercado: pais.mercado, iso: pais.iso };
  if (id === "aumento") {
    const [a, b] = TRAMOS[variante as IdTramo];
    const desde = NIVELES[a];
    const hasta = NIVELES[b];
    const queda = Math.min(1, Math.max(0, (netoAnualPpa(pais, hasta) - netoAnualPpa(pais, desde)) / (hasta - desde)));
    const valor = queda * 100;
    return { ...base, valor, clave: Math.round(valor), carga: 1 - queda, barra: queda };
  }
  const bruto = NIVELES[variante as IdNivel];
  const tasa = tasaEfectiva(pais, bruto);
  if (id === "libertad") {
    const dia = diaDeLibertad(tasa, anio);
    return { ...base, valor: dia, clave: dia, carga: tasa, barra: Math.min(1, dia / diasDelAnio(anio)) };
  }
  const mensual = netoAnualPpa(pais, bruto) / 12;
  return { ...base, valor: mensual, clave: Math.round(mensual), carga: tasa, barra: Math.min(1, Math.max(0, 1 - tasa)) };
}

// Orden y puestos. Entre empatados, por ISO: el orden es estable entre pedidos y entre la página, la
// imagen y los datos abiertos (la página puede reordenarlos por nombre sin cambiar los puestos).
export function clasificar<T extends { iso: string; clave: number }>(items: readonly T[], orden: "asc" | "desc"): (T & { puesto: number; empatados: number })[] {
  const signo = orden === "asc" ? 1 : -1;
  const ordenados = [...items].filter((x) => Number.isFinite(x.clave)).sort((a, b) => signo * (a.clave - b.clave) || (a.iso < b.iso ? -1 : a.iso > b.iso ? 1 : 0));
  const cuenta = new Map<number, number>();
  for (const x of ordenados) cuenta.set(x.clave, (cuenta.get(x.clave) ?? 0) + 1);
  let puesto = 0;
  return ordenados.map((x, i) => {
    if (i === 0 || ordenados[i - 1].clave !== x.clave) puesto = i + 1;
    return { ...x, puesto, empatados: cuenta.get(x.clave) ?? 1 };
  });
}

export function anioDeGrilla(grilla: GrillaMundo): number {
  const anio = Number(grilla.generadoEl.slice(0, 4));
  return Number.isInteger(anio) && anio > 2000 ? anio : new Date().getUTCFullYear();
}

export function rankingDe(grilla: GrillaMundo, id: IdRanking, variante: Variante): ResultadoRanking {
  const anio = anioDeGrilla(grilla);
  const medidas = grilla.paises.filter((p) => p.puntos.length > 1 && p.ppa > 0).map((p) => medir(id, variante, p, anio));
  return { id, variante, anio, filas: clasificar(medidas, RANKINGS[id].orden) };
}

export function todosLosRankings(grilla: GrillaMundo): Record<IdRanking, Record<string, ResultadoRanking>> {
  const salida = {} as Record<IdRanking, Record<string, ResultadoRanking>>;
  for (const id of IDS_RANKING) {
    salida[id] = {};
    for (const v of RANKINGS[id].variantes) salida[id][v] = rankingDe(grilla, id, v);
  }
  return salida;
}

// País de la edición en la grilla: ca-fr usa la fila de Canadá. global no tiene país.
export function paisDeEdicion(grilla: GrillaMundo, m: { codigo: string; pais: string }): PaisMundo | null {
  if (m.codigo === "global") return null;
  return grilla.paises.find((p) => p.mercado === m.codigo) ?? grilla.paises.find((p) => p.iso === m.pais) ?? null;
}

// Resumen por país para los datos abiertos: lo mismo que la página de «Tu sueldo en el mundo» ya
// manda al navegador, en los niveles fijos y redondeado.
export interface NivelDatos {
  bruto: number;
  neto: number;
  tasa: number;
  dia: number;
}

export function nivelesDe(pais: PaisMundo, anio: number): NivelDatos[] {
  return NIVELES_DATOS.map((bruto) => {
    const tasa = tasaEfectiva(pais, bruto);
    return { bruto, neto: Math.round(netoAnualPpa(pais, bruto)), tasa: redondear(tasa, 4), dia: diaDeLibertad(tasa, anio) };
  });
}
