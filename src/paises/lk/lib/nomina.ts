import { aplicarEscala, porcentaje } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

// La Tabla 1 del IRD ya descuenta el alivio personal de Rs. 150,000 al mes: se aplica sobre el sueldo
// entero, sin restar nada antes (nota 03 de la tabla). Tampoco se resta el EPF del empleado.
export function apitMensual(sueldo: number, tabla: readonly FilaEscala[]): number {
  return Math.max(0, aplicarEscala(tabla, Math.max(0, sueldo)));
}

export function tasaMarginal(sueldo: number, tabla: readonly FilaEscala[]): number {
  let tasa = 0;
  for (const f of tabla) if (sueldo > f.desde) tasa = f.tasa;
  return tasa;
}

export interface Aportes {
  epfEmpleado: number;
  epfEmpleador: number;
  etf: number;
}

// EPF y ETF salen del total de lo ganado en el mes, sin tope.
export function aportes(sueldo: number, epfEmpleado: number, epfEmpleador: number, etf: number): Aportes {
  const base = Math.max(0, sueldo);
  return {
    epfEmpleado: porcentaje(base, epfEmpleado),
    epfEmpleador: porcentaje(base, epfEmpleador),
    etf: porcentaje(base, etf),
  };
}
