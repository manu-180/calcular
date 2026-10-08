import { aplicarEscala, porcentaje } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

export interface TasasTrabajador {
  sfs: number;
  afp: number;
  topeSfs: number;
  topeAfp: number;
}

export function aportesTrabajador(salario: number, t: TasasTrabajador, redondear: (n: number) => number): { sfs: number; afp: number } {
  return {
    sfs: redondear(porcentaje(Math.min(salario, t.topeSfs), t.sfs)),
    afp: redondear(porcentaje(Math.min(salario, t.topeAfp), t.afp)),
  };
}

// La DGII retiene mes a mes la doceava parte del impuesto anual: lleva la base mensual a un año, aplica
// la escala del art. 296 y divide entre 12 (así sale su tabla de retención para asalariados).
export function isrMensual(baseMensual: number, escala: readonly FilaEscala[], redondear: (n: number) => number): { anual: number; mensual: number; tasa: number } {
  const anual = aplicarEscala(escala, baseMensual * 12);
  let tasa = 0;
  for (const f of escala) if (baseMensual * 12 >= f.desde) tasa = f.tasa;
  return { anual: redondear(anual), mensual: redondear(anual / 12), tasa };
}
