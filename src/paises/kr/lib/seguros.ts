import { piso, truncar10 } from "./impuestos";

export interface TasasSeguros {
  pension: number;
  limitesPension: { min: number; max: number };
  salud: number;
  cuidado: number;
  empleo: number;
}

export interface SegurosMensuales {
  basePension: number;
  pension: number;
  salud: number;
  cuidado: number;
  empleo: number;
  total: number;
}

// 4대보험 del trabajador sobre el 보수월액 (sueldo mensual sin lo 비과세). 국민연금: tasa de cada parte
// sobre el 기준소득월액, que no baja del mínimo ni pasa del máximo del 고시. 건강보험: la mitad de la tasa
// total. 장기요양: el 건강보험료 por el cociente entre las dos tasas, redondeado a 4 decimales (법 제9조).
// 고용보험: la mitad de la tasa de 실업급여. 산재보험 lo paga solo el empleador.
export function segurosMensuales(sueldo: number, t: TasasSeguros): SegurosMensuales {
  const s = Math.max(0, sueldo);
  const basePension = Math.min(Math.max(s, t.limitesPension.min), t.limitesPension.max);
  const pension = s > 0 ? truncar10((basePension * t.pension) / 100) : 0;
  const salud = truncar10((s * t.salud) / 200);
  const cociente = Math.round((t.cuidado / t.salud) * 10000) / 10000;
  const cuidado = truncar10(piso(salud * cociente));
  const empleo = truncar10((s * t.empleo) / 200);
  return { basePension, pension, salud, cuidado, empleo, total: pension + salud + cuidado + empleo };
}
