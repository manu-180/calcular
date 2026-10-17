import type { FilaEscala } from "@/motor/tipos";
import { cuotaTabla } from "./impuestos";

export type CategoriaSocso = "first" | "second";

export const OPCIONES_CATEGORIA_SOCSO = [
  { valor: "first", etiqueta: "First category: Employment Injury and Invalidity" },
  { valor: "second", etiqueta: "Second category: Employment Injury only" },
] as const;

export interface TablasPerkeso {
  empleador: readonly FilaEscala[];
  empleado: readonly FilaEscala[];
  skbbk: readonly FilaEscala[];
  empleadorSegunda: readonly FilaEscala[];
  skbbkSegunda: readonly FilaEscala[];
  eis: readonly FilaEscala[];
}

export interface Aportes {
  socsoEmpleado: number;
  skbbk: number;
  eisEmpleado: number;
  socsoEmpleador: number;
  eisEmpleador: number;
}

// Las tablas de PERKESO ya llegan topeadas: la última fila («exceed RM6,000») repite el monto del techo.
export function aportesPerkeso(t: TablasPerkeso, sueldo: number, categoria: CategoriaSocso, conSkbbk: boolean, conEis: boolean): Aportes {
  const primera = categoria === "first";
  const eis = conEis ? cuotaTabla(t.eis, sueldo) : 0;
  return {
    socsoEmpleado: primera ? cuotaTabla(t.empleado, sueldo) : 0,
    skbbk: conSkbbk ? cuotaTabla(primera ? t.skbbk : t.skbbkSegunda, sueldo) : 0,
    eisEmpleado: eis,
    socsoEmpleador: cuotaTabla(primera ? t.empleador : t.empleadorSegunda, sueldo),
    eisEmpleador: eis,
  };
}

export const REQUIERE_PERKESO = {
  "my.socso-employer": "escala",
  "my.socso-employee": "escala",
  "my.socso-skbbk": "escala",
  "my.socso-employer-second": "escala",
  "my.socso-skbbk-second": "escala",
  "my.eis": "escala",
} as const;

export function tablas(v: Readonly<Record<keyof typeof REQUIERE_PERKESO, readonly FilaEscala[]>>): TablasPerkeso {
  return {
    empleador: v["my.socso-employer"],
    empleado: v["my.socso-employee"],
    skbbk: v["my.socso-skbbk"],
    empleadorSegunda: v["my.socso-employer-second"],
    skbbkSegunda: v["my.socso-skbbk-second"],
    eis: v["my.eis"],
  };
}
