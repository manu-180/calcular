import type { FilaEscala } from "@/motor/tipos";

export interface ParametrosSpk {
  tasaEmpleado: number;
  bandas: readonly FilaEscala[];
  minimoEmpleador: number;
}

// La primera fila de la escala es el grupo de hasta BND 500, que paga una cuota fija. Las demás son
// porcentajes sobre el sueldo completo (no por tramos): el grupo lo decide el sueldo.
export function empleadorSpk(sueldo: number, p: ParametrosSpk): number {
  if (sueldo <= 0) return 0;
  let fila = p.bandas[0];
  for (const f of p.bandas) if (sueldo >= f.desde) fila = f;
  if (fila === p.bandas[0]) return fila.cuotaFija ?? p.minimoEmpleador;
  return Math.max((sueldo * fila.tasa) / 100, p.minimoEmpleador);
}

export function empleadoSpk(sueldo: number, p: ParametrosSpk): number {
  return sueldo <= 0 ? 0 : (sueldo * p.tasaEmpleado) / 100;
}

export const REQUIERE_SPK = {
  "bn.spk-employee-rate": "numero",
  "bn.spk-employer-bands": "escala",
  "bn.spk-employer-minimum": "numero",
} as const;
