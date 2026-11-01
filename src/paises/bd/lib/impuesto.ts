import { aplicarEscalaMarginal, enMapa, porcentaje } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

// Categorías de la tabla de করমুক্ত সীমা (Poripothro 2026-27, 1.1). Las claves son las del mapa
// bd.tax-free-threshold; las etiquetas visibles salen del mapa.
export const CATEGORIAS = ["general", "women-senior", "disabled", "freedom-fighter"] as const;

export interface DatosImpuesto {
  "bd.income-tax-slabs": readonly FilaEscala[];
  "bd.tax-free-threshold": Readonly<Record<string, number>>;
  "bd.disabled-child-extra": number;
}

export function umbralDe(v: DatosImpuesto, categoria: string, hijosConDiscapacidad: number): number {
  return enMapa(v["bd.tax-free-threshold"], categoria) + Math.max(0, hijosConDiscapacidad) * v["bd.disabled-child-extra"];
}

// La escala se publica con el umbral general como primer tramo y los siguientes como «পরবর্তী»
// montos; un umbral más alto corre todos los tramos, así que alcanza con restar la diferencia.
export function impuestoBruto(v: DatosImpuesto, ingreso: number, umbral: number): number {
  const corrimiento = umbral - enMapa(v["bd.tax-free-threshold"], "general");
  return aplicarEscalaMarginal(v["bd.income-tax-slabs"], Math.max(0, ingreso - corrimiento));
}

export function tasaMarginal(v: DatosImpuesto, ingreso: number, umbral: number): number {
  const base = Math.max(0, ingreso - (umbral - enMapa(v["bd.tax-free-threshold"], "general")));
  let tasa = 0;
  for (const f of v["bd.income-tax-slabs"]) if (base > f.desde) tasa = f.tasa;
  return tasa;
}

// Ley 2023, art. 78: la menor de 3 % del ingreso, 10 % de la inversión y el tope.
export function rebaja(rebate: Readonly<Record<string, number>>, ingreso: number, inversion: number): { rebaja: number; porIngreso: number; porInversion: number; tope: number } {
  const porIngreso = porcentaje(Math.max(0, ingreso), enMapa(rebate, "income-pct"));
  const porInversion = porcentaje(Math.max(0, inversion), enMapa(rebate, "investment-pct"));
  const tope = enMapa(rebate, "max");
  return { rebaja: Math.min(porIngreso, porInversion, tope), porIngreso, porInversion, tope };
}

export interface Liquidacion {
  bruto: number;
  rebaja: number;
  despuesRebaja: number;
  minimo: number;
  impuesto: number;
}

export function liquidar(
  v: DatosImpuesto & { "bd.investment-rebate": Readonly<Record<string, number>>; "bd.minimum-tax": Readonly<Record<string, number>> },
  ingreso: number,
  umbral: number,
  inversion: number,
  nuevo: boolean,
): Liquidacion {
  const bruto = impuestoBruto(v, ingreso, umbral);
  const r = Math.min(bruto, rebaja(v["bd.investment-rebate"], ingreso, inversion).rebaja);
  const despuesRebaja = bruto - r;
  const minimo = ingreso > umbral ? enMapa(v["bd.minimum-tax"], nuevo ? "new" : "general") : 0;
  return { bruto, rebaja: r, despuesRebaja, minimo, impuesto: Math.max(despuesRebaja, minimo) };
}
