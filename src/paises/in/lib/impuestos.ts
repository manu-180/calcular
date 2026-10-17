import { aplicarEscalaMarginal } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

export type Regimen = "new" | "old";
export type Edad = "below60" | "60to79" | "80plus";

export interface TablasRenta {
  slabs: readonly FilaEscala[];
  surcharge: readonly FilaEscala[];
  rebateLimit: number;
  rebateMax: number;
  cess: number;
}

export interface ImpuestoRenta {
  slabTax: number;
  rebate: number;
  surcharge: number;
  cess: number;
  total: number;
}

// El recargo rige cuando el ingreso "excede" cada umbral (50 lakh, 1 crore...), así que el tramo se
// elige con > y no con >= como hace el motor.
function filaRecargo(escala: readonly FilaEscala[], ingreso: number): FilaEscala {
  let fila = escala[0];
  for (const f of escala) if (ingreso > f.desde) fila = f;
  return fila;
}

// Section 156(2)(b): con ingreso apenas por encima de 12 lakh, el impuesto no puede superar lo que el
// ingreso excede el límite. Section 156(1) (régimen viejo) no tiene ese alivio.
function rebaja(regimen: Regimen, ingreso: number, impuesto: number, t: TablasRenta): number {
  if (ingreso <= t.rebateLimit) return Math.min(impuesto, t.rebateMax);
  if (regimen === "new" && impuesto > ingreso - t.rebateLimit) return impuesto - (ingreso - t.rebateLimit);
  return 0;
}

function antesDeCess(regimen: Regimen, ingreso: number, t: TablasRenta): { slabTax: number; rebate: number; surcharge: number } {
  const slabTax = aplicarEscalaMarginal(t.slabs, ingreso);
  const rebate = rebaja(regimen, ingreso, slabTax, t);
  const neto = slabTax - rebate;
  const fila = filaRecargo(t.surcharge, ingreso);
  let surcharge = (neto * fila.tasa) / 100;
  if (fila.tasa > 0) {
    // Marginal relief: impuesto más recargo no puede pasar el del umbral más lo que se lo excede.
    const umbral = fila.desde;
    const enUmbral = aplicarEscalaMarginal(t.slabs, umbral);
    const recargoUmbral = (enUmbral * filaRecargo(t.surcharge, umbral).tasa) / 100;
    const tope = enUmbral + recargoUmbral + (ingreso - umbral);
    if (neto + surcharge > tope) surcharge = Math.max(0, tope - neto);
  }
  return { slabTax, rebate, surcharge };
}

export function impuestoRenta(regimen: Regimen, ingreso: number, t: TablasRenta): ImpuestoRenta {
  const base = Math.max(0, ingreso);
  const r = antesDeCess(regimen, base, t);
  const conRecargo = r.slabTax - r.rebate + r.surcharge;
  const cess = (conRecargo * t.cess) / 100;
  return { ...r, cess, total: conRecargo + cess };
}

export function tasaMarginal(escala: readonly FilaEscala[], ingreso: number): number {
  let tasa = 0;
  for (const f of escala) if (ingreso > f.desde) tasa = f.tasa;
  return tasa;
}

export function rupias(n: number): string {
  return `₹${n.toLocaleString("en-IN", { minimumFractionDigits: n % 1 === 0 ? 0 : 2, maximumFractionDigits: 2 })}`;
}
