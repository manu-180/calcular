import { aplicarEscalaMarginal, enMapa, porcentaje } from "@/motor/calculo";
import type { FilaEscala, ValoresDe } from "@/motor/tipos";

export const REQUIERE_SUELDO = {
  "uy.bpc": "numero",
  "uy.aporte-jubilatorio": "numero",
  "uy.tope-aportes": "numero",
  "uy.fonasa-hasta": "mapa",
  "uy.fonasa-mas": "mapa",
  "uy.fonasa-umbral": "numero",
  "uy.frl": "numero",
  "uy.irpf-escala": "escala",
  "uy.irpf-incremento": "numero",
  "uy.irpf-incremento-umbral": "numero",
  "uy.irpf-deducciones-umbral": "numero",
  "uy.irpf-deducciones-tasa-baja": "numero",
  "uy.irpf-deducciones-tasa-alta": "numero",
  "uy.irpf-deduccion-hijo": "numero",
  "uy.irpf-deduccion-hijo-discapacidad": "numero",
} as const;

export type ValoresSueldo = ValoresDe<typeof REQUIERE_SUELDO>;

export interface SituacionSueldo {
  nominal: number;
  hijos: number;
  hijosDiscapacidad: number;
  conyuge: boolean;
  deduccionCompartida?: boolean;
  otrasDeducciones?: number;
}

export interface CalculoSueldo {
  montepio: number;
  fonasa: number;
  tasaFonasa: number;
  frl: number;
  rentaComputable: number;
  impuestoEscala: number;
  deduccionHijos: number;
  deducciones: number;
  tasaDeducciones: number;
  descuentoDeducciones: number;
  irpf: number;
  tasaMarginal: number;
  liquido: number;
  topeAportes: number;
  superaTope: boolean;
  conIncremento: boolean;
}

function escalaEnPesos(escala: readonly FilaEscala[], bpc: number): FilaEscala[] {
  return escala.map((f) => ({ desde: f.desde * bpc, hasta: f.hasta === null ? null : f.hasta * bpc, tasa: f.tasa }));
}

function tasaMarginal(escala: readonly FilaEscala[], base: number): number {
  let tasa = 0;
  for (const f of escala) if (base > f.desde) tasa = f.tasa;
  return tasa;
}

export function claveFonasa(hijos: number, conyuge: boolean): "sin" | "hijos" | "conyuge" | "ambos" {
  if (conyuge) return hijos > 0 ? "ambos" : "conyuge";
  return hijos > 0 ? "hijos" : "sin";
}

// Retención mensual del IRPF según el artículo 63 del Decreto 148/007: escala sobre la renta del mes
// (con el 6 % extra si pasa 10 BPC) menos un porcentaje de las deducciones. El 6 % y la tasa de
// deducciones se deciden con el nominal sin incremento; el tope de aportes no cuenta para el 6 %.
export function calcularSueldo(v: ValoresSueldo, s: SituacionSueldo, redondear: (n: number) => number): CalculoSueldo {
  const bpc = v["uy.bpc"];
  const tope = v["uy.tope-aportes"];
  const montepio = redondear(porcentaje(Math.min(s.nominal, tope), v["uy.aporte-jubilatorio"]));
  const hijosTotales = s.hijos + s.hijosDiscapacidad;
  const tablaFonasa = s.nominal > v["uy.fonasa-umbral"] * bpc ? v["uy.fonasa-mas"] : v["uy.fonasa-hasta"];
  const tasaFonasa = enMapa(tablaFonasa, claveFonasa(hijosTotales, s.conyuge));
  const fonasa = redondear(porcentaje(s.nominal, tasaFonasa));
  const frl = redondear(porcentaje(s.nominal, v["uy.frl"]));

  const conIncremento = s.nominal > v["uy.irpf-incremento-umbral"] * bpc;
  const rentaComputable = redondear(conIncremento ? s.nominal + porcentaje(s.nominal, v["uy.irpf-incremento"]) : s.nominal);
  const escala = escalaEnPesos(v["uy.irpf-escala"], bpc);
  const impuestoEscala = redondear(aplicarEscalaMarginal(escala, rentaComputable));

  const factorHijos = s.deduccionCompartida ? 0.5 : 1;
  const deduccionHijos = redondear(((s.hijos * v["uy.irpf-deduccion-hijo"] + s.hijosDiscapacidad * v["uy.irpf-deduccion-hijo-discapacidad"]) * bpc * factorHijos) / 12);
  const deducciones = redondear(montepio + fonasa + frl + deduccionHijos + (s.otrasDeducciones ?? 0));
  const tasaDeducciones = s.nominal <= v["uy.irpf-deducciones-umbral"] * bpc ? v["uy.irpf-deducciones-tasa-baja"] : v["uy.irpf-deducciones-tasa-alta"];
  const descuentoDeducciones = redondear(porcentaje(deducciones, tasaDeducciones));
  const irpf = Math.max(0, redondear(impuestoEscala - descuentoDeducciones));

  return {
    montepio,
    fonasa,
    tasaFonasa,
    frl,
    rentaComputable,
    impuestoEscala,
    deduccionHijos,
    deducciones,
    tasaDeducciones,
    descuentoDeducciones,
    irpf,
    tasaMarginal: tasaMarginal(escala, rentaComputable),
    liquido: redondear(s.nominal - montepio - fonasa - frl - irpf),
    topeAportes: tope,
    superaTope: s.nominal > tope,
    conIncremento,
  };
}
