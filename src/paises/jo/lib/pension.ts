import { enMapa, porcentaje } from "@/motor/calculo";
import type { Campo } from "@/motor/tipos";

type Mapa = Readonly<Record<string, number>>;

export const REQUIERE_PENSION = {
  "jo.pension-accrual": "mapa",
  "jo.pension-tier": "numero",
  "jo.pension-dependents": "mapa",
  "jo.pension-dependents-limits": "mapa",
} as const;

export interface TablasPension {
  readonly "jo.pension-accrual": Mapa;
  readonly "jo.pension-tier": number;
  readonly "jo.pension-dependents": Mapa;
  readonly "jo.pension-dependents-limits": Mapa;
}

export const CAMPO_SEXO = {
  id: "sexo",
  tipo: "opcion",
  etiqueta: "المؤمن عليه",
  opciones: [
    { valor: "male", etiqueta: "ذكر" },
    { valor: "female", etiqueta: "أنثى" },
  ],
  porDefecto: "male",
} as const satisfies Campo;

export const CAMPO_DEPENDIENTES = {
  id: "dependientes",
  tipo: "entero",
  etiqueta: "عدد الأشخاص الذين تعيلهم",
  ayuda: "تُضاف زيادة عن ثلاثة معالين على الأكثر.",
  min: 0,
  max: 10,
  porDefecto: 0,
} as const satisfies Campo;

// Arts. 62 (b) y 64 (د/1): por cada año de aporte, 2,5 % de los primeros 1.500 del salario promedio y
// 2 % del resto. Los años salen de los aportes mensuales ÷ 12.
export function pensionBase(promedio: number, aportes: number, t: TablasPension): number {
  const tramo = t["jo.pension-tier"];
  const tasas = t["jo.pension-accrual"];
  const anual = porcentaje(Math.min(promedio, tramo), enMapa(tasas, "first-tier")) + porcentaje(Math.max(0, promedio - tramo), enMapa(tasas, "rest"));
  return (aportes / 12) * anual;
}

// Arts. 62 (ج) y 64 (د/3): 12 % por el primer dependiente (entre 10 y 100), 6 % por el segundo y el
// tercero (entre 10 y 25 cada uno), sobre la pensión ya calculada.
export function aumentoDependientes(pension: number, dependientes: number, t: TablasPension): number {
  const p = t["jo.pension-dependents"];
  const l = t["jo.pension-dependents-limits"];
  const acotar = (x: number, min: number, max: number) => Math.min(max, Math.max(min, x));
  const n = Math.min(3, Math.max(0, Math.floor(dependientes)));
  let total = 0;
  if (n >= 1) total += acotar(porcentaje(pension, enMapa(p, "first")), enMapa(l, "first-min"), enMapa(l, "first-max"));
  if (n >= 2) total += acotar(porcentaje(pension, enMapa(p, "second")), enMapa(l, "other-min"), enMapa(l, "other-max"));
  if (n >= 3) total += acotar(porcentaje(pension, enMapa(p, "third")), enMapa(l, "other-min"), enMapa(l, "other-max"));
  return total;
}
