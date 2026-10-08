import { enMapa, porcentaje } from "@/motor/calculo";

type Mapa = Readonly<Record<string, number>>;

export interface Aportes {
  cotizacion: number;
  riesgoComun: number;
  comision: number;
  solidario: number;
  gestora: number;
  nacionalSolidario: number;
  total: number;
}

const TRAMOS_ANS = ["tramo-1", "tramo-2", "tramo-3"] as const;

// Ley 065, art. 87 f): cada porcentaje se aplica a lo que el total solidario pasa de su monto y los
// tres se suman ("no son de carácter excluyente"). Con un solo empleador, el total solidario es el
// total ganado.
export function aporteNacionalSolidario(totalGanado: number, tasas: Mapa, umbrales: Mapa, redondear: (n: number) => number): number {
  let suma = 0;
  for (const t of TRAMOS_ANS) suma += redondear(porcentaje(Math.max(0, totalGanado - enMapa(umbrales, t)), enMapa(tasas, t)));
  return redondear(suma);
}

export function aportesLaborales(totalGanado: number, aportes: Mapa, tasasAns: Mapa, umbralesAns: Mapa, redondear: (n: number) => number): Aportes {
  const cotizacion = redondear(porcentaje(totalGanado, enMapa(aportes, "cotizacion")));
  const riesgoComun = redondear(porcentaje(totalGanado, enMapa(aportes, "riesgo-comun")));
  const comision = redondear(porcentaje(totalGanado, enMapa(aportes, "comision")));
  const solidario = redondear(porcentaje(totalGanado, enMapa(aportes, "solidario")));
  const gestora = redondear(cotizacion + riesgoComun + comision + solidario);
  const nacionalSolidario = aporteNacionalSolidario(totalGanado, tasasAns, umbralesAns, redondear);
  return { cotizacion, riesgoComun, comision, solidario, gestora, nacionalSolidario, total: redondear(gestora + nacionalSolidario) };
}

export interface ParametrosRcIva {
  alicuota: number;
  salarioMinimo: number;
  minimoNoImponibleSmn: number;
  computoSmn: number;
}

export interface RcIva {
  sueldoNeto: number;
  minimoNoImponible: number;
  base: number;
  impuesto: number;
  computoSalarioMinimo: number;
  impuestoNeto: number;
  creditoFacturas: number;
  retencion: number;
  saldoAFavor: number;
}

// D.S. 21531, art. 8: al total ganado se le restan los aportes laborales y dos salarios mínimos; sobre
// eso va el 13 %. Contra ese impuesto se computa el 13 % de un salario mínimo (D.S. 5383), el 13 % de
// las facturas del Formulario 110 y el saldo a favor anterior. Criterio nuestro, no escrito en la
// norma: el cómputo del salario mínimo solo cancela impuesto y no genera saldo a favor (si lo hiciera,
// todo dependiente bajo el mínimo acumularía saldo cada mes sin presentar facturas).
export function rcIva(sueldoNeto: number, facturas: number, saldoAnterior: number, p: ParametrosRcIva, redondear: (n: number) => number): RcIva {
  const minimoNoImponible = redondear(p.salarioMinimo * p.minimoNoImponibleSmn);
  const base = redondear(Math.max(0, sueldoNeto - minimoNoImponible));
  const impuesto = redondear(porcentaje(base, p.alicuota));
  const computoSalarioMinimo = redondear(porcentaje(p.salarioMinimo * p.computoSmn, p.alicuota));
  const impuestoNeto = redondear(Math.max(0, impuesto - computoSalarioMinimo));
  const creditoFacturas = redondear(porcentaje(facturas, p.alicuota));
  const disponible = redondear(creditoFacturas + saldoAnterior);
  const retencion = redondear(Math.max(0, impuestoNeto - disponible));
  const saldoAFavor = redondear(Math.max(0, disponible - impuestoNeto));
  return { sueldoNeto, minimoNoImponible, base, impuesto, computoSalarioMinimo, impuestoNeto, creditoFacturas, retencion, saldoAFavor };
}
