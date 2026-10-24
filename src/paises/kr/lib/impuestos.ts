import { aplicarEscala, aplicarEscalaMarginal } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

// Las tasas con decimales (4.75, 0.9448) dejan restos binarios como 9999.999999: se trunca con un
// margen para no perder un won.
export const piso = (n: number): number => Math.floor(n + 1e-6);

// Los impuestos y las cuotas de los seguros sociales se cobran sin la fracción menor de 10 won
// (국고금 관리법 제47조): así figuran en el recibo de sueldo y en la liquidación.
export const truncar10 = (n: number): number => piso(Math.max(0, n) / 10) * 10;

export function filaDe(escala: readonly FilaEscala[], valor: number): FilaEscala {
  let elegida = escala[0];
  for (const f of escala) if (valor >= f.desde) elegida = f;
  return elegida;
}

export function tasaMarginal(escala: readonly FilaEscala[], base: number): number {
  if (base <= 0) return 0;
  let tasa = escala[0].tasa;
  for (const f of escala) if (base > f.desde) tasa = f.tasa;
  return tasa;
}

// 기본세율 (소득세법 제55조): escala marginal sobre el 과세표준.
export function impuestoBasico(base: number, escala: readonly FilaEscala[]): number {
  return piso(aplicarEscalaMarginal(escala, Math.max(0, piso(base))));
}

// 근로소득공제 (제47조): cuota fija + tasa sobre el excedente, con tope y nunca más que el sueldo.
export function deduccionTrabajo(total: number, escala: readonly FilaEscala[], tope: number): number {
  if (total <= 0) return 0;
  return Math.min(total, tope, piso(aplicarEscala(escala, total)));
}

export interface LimitesCreditoTrabajo {
  total1: number;
  limite1: number;
  total2: number;
  piso2: number;
  total3: number;
  piso3: number;
  piso4: number;
}

// 근로소득세액공제 (제59조): 55 % del impuesto hasta 1,3 millones y 30 % del resto, con un tope que
// baja con el 총급여 (8/1000 sobre 33 millones, 1/2 sobre 70 y sobre 120 millones).
export function creditoTrabajo(impuesto: number, total: number, escala: readonly FilaEscala[], l: LimitesCreditoTrabajo): number {
  const credito = piso(aplicarEscala(escala, impuesto));
  let tope: number;
  if (total <= l.total1) tope = l.limite1;
  else if (total <= l.total2) tope = Math.max(l.piso2, l.limite1 - piso(((total - l.total1) * 8) / 1000));
  else if (total <= l.total3) tope = Math.max(l.piso3, l.piso2 - piso((total - l.total2) / 2));
  else tope = Math.max(l.piso4, l.piso3 - piso((total - l.total3) / 2));
  return Math.min(credito, tope);
}

// 자녀세액공제 (제59조의2): hijos de 8 años o más.
export function creditoHijos(hijos: number, m: { uno: number; dos: number; adicional: number }): number {
  if (hijos <= 0) return 0;
  if (hijos === 1) return m.uno;
  return m.dos + Math.max(0, hijos - 2) * m.adicional;
}

export interface ValoresRenta {
  escalaTrabajo: readonly FilaEscala[];
  topeTrabajo: number;
  basico: number;
  brackets: readonly FilaEscala[];
  escalaCredito: readonly FilaEscala[];
  limitesCredito: LimitesCreditoTrabajo;
  estandar: number;
  hijos: { uno: number; dos: number; adicional: number };
  local: number;
}

export interface RentaAnual {
  total: number;
  deduccion: number;
  ingresoTrabajo: number;
  deducciones: number;
  base: number;
  calculado: number;
  creditoTrabajo: number;
  creditoHijos: number;
  creditoEstandar: number;
  determinado: number;
  local: number;
  marginal: number;
}

// Impuesto anual de un asalariado como en el 연말정산 (sin otras deducciones, si no se pasan): 기본공제 por persona,
// 연금보험료공제 y 보험료 공제 (건강·장기요양·고용) completos, 근로소득세액공제, 자녀세액공제 y 표준세액공제.
export function rentaAsalariado(
  e: { total: number; personas: number; hijos: number; pension: number; seguros: number; otrasDeducciones?: number; otrosCreditos?: number },
  v: ValoresRenta,
): RentaAnual {
  const total = Math.max(0, e.total);
  const deduccion = deduccionTrabajo(total, v.escalaTrabajo, v.topeTrabajo);
  const ingresoTrabajo = total - deduccion;
  const deducciones = Math.min(ingresoTrabajo, v.basico * Math.max(1, e.personas) + e.pension + e.seguros + (e.otrasDeducciones ?? 0));
  const base = Math.max(0, ingresoTrabajo - deducciones);
  const calculado = impuestoBasico(base, v.brackets);
  const cTrabajo = creditoTrabajo(calculado, total, v.escalaCredito, v.limitesCredito);
  const cHijos = creditoHijos(e.hijos, v.hijos);
  const resto = Math.max(0, calculado - cTrabajo - cHijos);
  // 표준세액공제 solo si no se piden los 특별세액공제: se toma el mayor de los dos, como elige quien liquida.
  const cEstandar = Math.min(resto, Math.max(v.estandar, e.otrosCreditos ?? 0));
  const determinado = truncar10(resto - cEstandar);
  return {
    total,
    deduccion,
    ingresoTrabajo,
    deducciones,
    base,
    calculado,
    creditoTrabajo: cTrabajo,
    creditoHijos: cHijos,
    creditoEstandar: cEstandar,
    determinado,
    local: truncar10((determinado * v.local) / 100),
    marginal: tasaMarginal(v.brackets, base),
  };
}
