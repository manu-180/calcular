import { definirCasos } from "@/motor/calculo";
import calculadora from "./provisional-salaries-tax";

const SIN_FAMILIA = { estado: "single", monoparental: false, hijos: 0, hijosRecientes: 0, padres60: 0, padres60Conviven: 0, padres55: 0, padres55Conviven: 0 } as const;

export default definirCasos(calculadora, [
  {
    nombre: "IRD PAM 39 Q2 and Q3: six months at $40,000 grossed up, with the 2025/26 balance",
    origen: {
      tipo: "oficial",
      url: "https://www.ird.gov.hk/eng/pdf/pam39e.pdf",
      detalle: "480,000 less MPF 18,000 less basic allowance 145,000 = 317,000. PST 35,890. First instalment 940 + 26,917 (75%, cents moved to the second) = 27,857, second 8,973.",
    },
    fecha: "2026-10-16",
    entrada: { anio: "2026-27", ingreso: 240000, meses: 6, mpf: 9000, otras: 0, ...SIN_FAMILIA, finalAnterior: 940 },
    esperado: { ingresoAnual: 480000, baseImponible: 317000, provisional: 35890, primera: 27857, segunda: 8973, total: 36830 },
  },
  {
    nombre: "IRD PAM 39 Q5: married person's allowance lowers the PST",
    origen: {
      tipo: "oficial",
      url: "https://www.ird.gov.hk/eng/pdf/pam39e.pdf",
      detalle: "462,000 less married person's allowance 290,000 = 172,000. PST 12,080.",
    },
    fecha: "2026-10-16",
    entrada: { anio: "2026-27", ingreso: 480000, meses: 12, mpf: 18000, otras: 0, ...SIN_FAMILIA, estado: "married", finalAnterior: 0 },
    esperado: { baseImponible: 172000, provisional: 12080 },
  },
  {
    nombre: "IRD 2026-27 Budget example 1: 2026/27 PST on $380,000",
    origen: {
      tipo: "oficial",
      url: "https://www.ird.gov.hk/eng/pdf/2026/example2627.pdf",
      detalle: "380,000 less basic allowance 145,000 = 235,000. PST 21,950.",
    },
    fecha: "2026-10-16",
    entrada: { anio: "2026-27", ingreso: 380000, meses: 12, mpf: 0, otras: 0, ...SIN_FAMILIA, finalAnterior: 0 },
    esperado: { provisional: 21950, primera: 16462, segunda: 5488 },
  },
  {
    nombre: "No income is not valid",
    origen: { tipo: "recalculado", detalle: "Income 0." },
    fecha: "2026-10-16",
    entrada: { anio: "2026-27", ingreso: 0, meses: 12, mpf: 0, otras: 0, ...SIN_FAMILIA, finalAnterior: 0 },
    esperaError: true,
  },
]);
