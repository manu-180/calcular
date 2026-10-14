import { aplicarEscalaMarginal, ErrorEntrada, porcentaje, porRegion } from "@/motor/calculo";
import type { FilaEscala, ValoresDe } from "@/motor/tipos";

export const PROVINCIAS = [
  { valor: "ab", etiqueta: "Alberta" },
  { valor: "bc", etiqueta: "British Columbia" },
  { valor: "mb", etiqueta: "Manitoba" },
  { valor: "nb", etiqueta: "New Brunswick" },
  { valor: "nl", etiqueta: "Newfoundland and Labrador" },
  { valor: "ns", etiqueta: "Nova Scotia" },
  { valor: "nt", etiqueta: "Northwest Territories" },
  { valor: "nu", etiqueta: "Nunavut" },
  { valor: "on", etiqueta: "Ontario" },
  { valor: "pe", etiqueta: "Prince Edward Island" },
  { valor: "sk", etiqueta: "Saskatchewan" },
  { valor: "yt", etiqueta: "Yukon" },
] as const;

export type Provincia = (typeof PROVINCIAS)[number]["valor"];

export const REQUIERE_APORTES = {
  "ca.cpp": "mapa",
  "ca.cpp-rates": "mapa",
  "ca.ei-maximum": "numero",
  "ca.ei-rates": "mapa",
} as const;

export const REQUIERE_RENTA = {
  ...REQUIERE_APORTES,
  "ca.federal-tax-brackets": "escala",
  "ca.federal-bpa": "mapa",
  "ca.canada-employment-amount": "numero",
  "ca.provincial-tax-brackets": "escala-por-region",
  "ca.provincial-bpa": "numero-por-region",
  "ca.mb-bpa-phaseout": "mapa",
  "ca.on-surtax-thresholds": "mapa",
  "ca.on-surtax-rates": "mapa",
  "ca.on-tax-reduction": "numero",
  "ca.on-health-premium": "escala",
  "ca.on-health-premium-max": "numero",
  "ca.bc-tax-reduction": "mapa",
  "ca.bc-tax-reduction-rate": "numero",
  "ca.ab-supplemental-credit-threshold": "numero",
  "ca.ab-supplemental-credit-rate": "numero",
} as const;

type ValoresAportes = ValoresDe<typeof REQUIERE_APORTES>;
type ValoresRenta = ValoresDe<typeof REQUIERE_RENTA>;

export function dolares(n: number): string {
  return new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: n % 1 === 0 ? 0 : 2 }).format(n);
}

export interface Aportes {
  cppBase: number;
  cppPrimera: number;
  cpp2: number;
  cpp: number;
  ei: number;
}

// T4127, chapters 6 and 7: an employee pays CPP on earnings between the basic exemption and the
// YMPE, CPP2 between the YMPE and the YAMPE, and EI up to the maximum insurable earnings. Only the
// base part of CPP gives a tax credit; the first and second additional parts are a deduction.
export function aportesEmpleado(ingreso: number, v: ValoresAportes, autonomo = false): Aportes {
  const c = v["ca.cpp"];
  const t = v["ca.cpp-rates"];
  const factor = autonomo ? 2 : 1;
  const base = Math.max(0, Math.min(ingreso, c.ympe) - c.exemption);
  const cppBase = porcentaje(base, t.base) * factor;
  const cppPrimera = porcentaje(base, t.first) * factor;
  const cpp2 = porcentaje(Math.max(0, Math.min(ingreso, c.yampe) - c.ympe), t.second) * factor;
  const ei = autonomo ? 0 : porcentaje(Math.min(ingreso, v["ca.ei-maximum"]), v["ca.ei-rates"].employee);
  return { cppBase, cppPrimera, cpp2, cpp: cppBase + cppPrimera, ei };
}

function bpaFederal(neto: number, v: ValoresRenta): number {
  const { max: maximo, min: minimo } = v["ca.federal-bpa"];
  const escala = v["ca.federal-tax-brackets"];
  const desde = escala[3].desde;
  const hasta = escala[4].desde;
  if (neto <= desde) return maximo;
  if (neto >= hasta) return minimo;
  return maximo - ((neto - desde) * (maximo - minimo)) / (hasta - desde);
}

function bpaProvincial(provincia: Provincia, neto: number, v: ValoresRenta): number {
  if (provincia === "yt") return bpaFederal(neto, v);
  const bpa = porRegion(v["ca.provincial-bpa"], provincia);
  if (provincia !== "mb") return bpa;
  const { from: desde, to: hasta } = v["ca.mb-bpa-phaseout"];
  if (neto <= desde) return bpa;
  if (neto >= hasta) return 0;
  return bpa - ((neto - desde) * bpa) / (hasta - desde);
}

function primaSaludOntario(gravable: number, v: ValoresRenta): number {
  const filas = v["ca.on-health-premium"];
  let prima = 0;
  filas.forEach((f, i) => {
    if (gravable <= f.desde) return;
    const tope = i + 1 < filas.length ? (filas[i + 1].cuotaFija ?? 0) : v["ca.on-health-premium-max"];
    prima = Math.min(tope, (f.cuotaFija ?? 0) + porcentaje(gravable - f.desde, f.tasa));
  });
  return prima;
}

export interface EntradaRenta {
  provincia: Provincia;
  empleo: number;
  otros: number;
  deducciones: number;
  aportes: Aportes;
}

export interface ResultadoRenta {
  gravable: number;
  federal: number;
  provincial: number;
  total: number;
}

function tasaMasBaja(escala: readonly FilaEscala[]): number {
  return escala[0].tasa;
}

// Annual tax for a resident of a province other than Quebec, following the structure of T4127
// Option 1 (steps 2 to 5) with annual credits: basic personal amount, Canada employment amount,
// base CPP and EI, all at the lowest rate. Provincial extras: Ontario surtax, health premium and
// tax reduction; BC tax reduction; Alberta supplemental credit; Yukon employment amount.
export function impuestoAnual(e: EntradaRenta, v: ValoresRenta): ResultadoRenta {
  const deduccionCpp = e.aportes.cppPrimera + e.aportes.cpp2;
  const gravable = Math.max(0, e.empleo + e.otros - e.deducciones - deduccionCpp);
  const federalEscala = v["ca.federal-tax-brackets"];
  const fBaja = tasaMasBaja(federalEscala);
  const cea = Math.min(e.empleo, v["ca.canada-employment-amount"]);
  const creditoAportes = e.aportes.cppBase + e.aportes.ei;
  const federal = Math.max(0, aplicarEscalaMarginal(federalEscala, gravable) - porcentaje(bpaFederal(gravable, v) + cea + creditoAportes, fBaja));

  const pEscala = porRegion(v["ca.provincial-tax-brackets"], e.provincia);
  const pBaja = tasaMasBaja(pEscala);
  const k1p = porcentaje(bpaProvincial(e.provincia, gravable, v), pBaja);
  const k2p = porcentaje(creditoAportes, pBaja);
  const k4p = e.provincia === "yt" ? porcentaje(cea, pBaja) : 0;
  const k5p = e.provincia === "ab" ? Math.max(0, porcentaje(k1p + k2p - v["ca.ab-supplemental-credit-threshold"], v["ca.ab-supplemental-credit-rate"])) : 0;
  const t4 = Math.max(0, aplicarEscalaMarginal(pEscala, gravable) - k1p - k2p - k4p - k5p);

  let provincial = t4;
  if (e.provincia === "on") {
    const u = v["ca.on-surtax-thresholds"];
    const s = v["ca.on-surtax-rates"];
    const v1 = porcentaje(Math.max(0, t4 - u.first), s.first) + porcentaje(Math.max(0, t4 - u.second), s.second);
    const v2 = primaSaludOntario(gravable, v);
    const reduccion = Math.max(0, Math.min(t4 + v1, 2 * v["ca.on-tax-reduction"] - (t4 + v1)));
    provincial = t4 + v1 - reduccion + v2;
  } else if (e.provincia === "bc") {
    const r = v["ca.bc-tax-reduction"];
    const reduccion = Math.max(0, Math.min(t4, r.amount - porcentaje(Math.max(0, gravable - r.threshold), v["ca.bc-tax-reduction-rate"])));
    provincial = t4 - reduccion;
  }
  return { gravable, federal, provincial, total: federal + provincial };
}

// Rate on the next $100 of other income, so it includes surtaxes, the health premium and the
// clawback of the basic personal amounts.
export function tasaMarginal(e: EntradaRenta, v: ValoresRenta): number {
  const antes = impuestoAnual(e, v).total;
  const despues = impuestoAnual({ ...e, otros: e.otros + 100 }, v).total;
  return despues - antes;
}

export function validarIngreso(monto: number, campo: string): void {
  if (!Number.isFinite(monto) || monto < 0) throw new ErrorEntrada("Enter an amount of zero or more.", campo);
}
