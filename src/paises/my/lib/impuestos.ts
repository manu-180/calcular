import { aplicarEscala, aplicarEscalaMarginal, ErrorEntrada } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

export type Categoria = "single" | "spouse-not-working" | "spouse-working";

export const OPCIONES_CATEGORIA = [
  { valor: "single", etiqueta: "Single" },
  { valor: "spouse-not-working", etiqueta: "Married, husband or wife not working" },
  { valor: "spouse-working", etiqueta: "Married, husband or wife working (or divorced, widowed, single parent)" },
] as const;

type Mapa = Readonly<Record<string, number>>;

// La especificación de HASiL corta cada cálculo en dos decimales (no redondea).
export function truncar2(n: number): number {
  return Math.trunc(Math.round(n * 1e6) / 1e4) / 100;
}

// PCB: hacia arriba al múltiplo de 5 sen (287,02 da 287,05; 152,06 da 152,10).
export function arriba5Sen(n: number): number {
  return Math.ceil(Math.round(n * 1e6) / 5e4) / 20;
}

export function impuestoBruto(escala: readonly FilaEscala[], gravable: number): number {
  return aplicarEscalaMarginal(escala, Math.max(0, gravable));
}

export function tasaMarginal(escala: readonly FilaEscala[], gravable: number): number {
  let tasa = 0;
  for (const f of escala) if (gravable > f.desde) tasa = f.tasa;
  return tasa;
}

export function rebate(gravable: number, conyugeSinIngresos: boolean, v: { individual: number; spouse: number; threshold: number }): number {
  if (gravable > v.threshold) return 0;
  return v.individual + (conyugeSinIngresos ? v.spouse : 0);
}

export function alivioFijo(reliefs: Mapa, categoria: Categoria, hijos: number, hijosEstudios: number, discapacidad: boolean): number {
  return (
    reliefs.individual +
    (categoria === "spouse-not-working" ? reliefs.spouse : 0) +
    (categoria === "single" ? 0 : hijos * reliefs["child-under-18"] + hijosEstudios * reliefs["child-higher-education"]) +
    (discapacidad ? reliefs["disabled-individual"] : 0)
  );
}

export interface EntradaPcb {
  bruto: number;
  epf: number;
  mes: number;
  categoria: Categoria;
  hijos: number;
  hijosEstudios: number;
  discapacidad: boolean;
  otrosAlivios: number;
  zakat: number;
}

export interface ValoresPcb {
  escala: readonly FilaEscala[];
  reliefs: Mapa;
  rebateIndividual: number;
  rebateConyuge: number;
  umbralRebate: number;
  minimo: number;
}

export interface ResultadoPcb {
  pcb: number;
  pcbAntesZakat: number;
  gravableAnual: number;
  pagadoAntes: number;
  minimoNoAlcanzado: boolean;
}

// Fórmula de remuneración normal de la especificación PCB 2026 de HASiL, con el mismo sueldo y el
// mismo EPF todos los meses desde enero: se recorre el año mes a mes para que X (PCB ya pagada) y
// K (EPF ya aportado) sean los que tendría la nómina real.
export function pcbMensual(e: EntradaPcb, v: ValoresPcb): ResultadoPcb {
  const tope = v.reliefs.epf;
  const deducciones = alivioFijo(v.reliefs, e.categoria, e.hijos, e.hijosEstudios, e.discapacidad) + e.otrosAlivios;
  let k = 0;
  let x = 0;
  let z = 0;
  let resultado: ResultadoPcb = { pcb: 0, pcbAntesZakat: 0, gravableAnual: 0, pagadoAntes: 0, minimoNoAlcanzado: false };
  for (let mes = 1; mes <= e.mes; mes++) {
    const n = 12 - mes;
    const k1 = Math.min(e.epf, Math.max(0, tope - k));
    const k2 = n > 0 ? Math.min(truncar2(Math.max(0, tope - (k + k1)) / n), k1) : 0;
    const y = e.bruto * (mes - 1);
    const p = truncar2(y - k + (e.bruto - k1) + truncar2((e.bruto - k2) * n) - deducciones);
    const fila = filaPcb(v.escala, p);
    const conyuge = e.categoria === "spouse-not-working";
    const b = fila.cuota - (p <= v.umbralRebate ? v.rebateIndividual + (conyuge ? v.rebateConyuge : 0) : 0);
    const anual = p > fila.m ? truncar2(((p - fila.m) * fila.r) / 100 + b - (z + x)) : 0;
    const antesZakat = Math.max(0, truncar2(anual / (n + 1)));
    const neto = Math.max(0, antesZakat - e.zakat);
    // Si la PCB antes del zakat es menor que el mínimo, el empleador no la retiene; si lo que queda
    // después del zakat es menor, sí la retiene igual (condiciones 3 y 4 de la especificación).
    const pcb = antesZakat < v.minimo ? 0 : arriba5Sen(neto);
    resultado = { pcb, pcbAntesZakat: antesZakat, gravableAnual: Math.max(0, p), pagadoAntes: x, minimoNoAlcanzado: antesZakat > 0 && antesZakat < v.minimo };
    x += pcb;
    z += e.zakat;
    k += k1;
  }
  return resultado;
}

function filaPcb(escala: readonly FilaEscala[], p: number): { m: number; r: number; cuota: number } {
  let elegida = escala[0];
  for (const f of escala) if (p > f.desde) elegida = f;
  return { m: elegida.desde, r: elegida.tasa, cuota: aplicarEscalaMarginal(escala, elegida.desde) };
}

export function cuotaTabla(escala: readonly FilaEscala[], sueldo: number): number {
  return aplicarEscala(escala, Math.max(0, sueldo));
}

export function noNegativo(valor: number, campo: string, texto: string): void {
  if (valor < 0) throw new ErrorEntrada(texto, campo);
}

const FORMATO_RM = new Intl.NumberFormat("en-MY", { maximumFractionDigits: 2, minimumFractionDigits: 2 });

export function rm(n: number): string {
  return `RM${FORMATO_RM.format(n)}`;
}
