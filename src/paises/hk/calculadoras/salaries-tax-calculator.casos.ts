import { definirCasos } from "@/motor/calculo";
import calculadora from "./salaries-tax-calculator";

const SIN_FAMILIA = { hijos: 0, hijosRecientes: 0, padres60: 0, padres60Conviven: 0, padres55: 0, padres55Conviven: 0 };
const SIN_DEDUCCIONES = { mpf: 0, tvc: 0, alquiler: 0, educacion: 0, residencia: 0, otras: 0 };

export default definirCasos(calculadora, [
  {
    nombre: "IRD PAM 39 Q1: 2025/26, six months at $40,000 with MPF",
    origen: {
      tipo: "oficial",
      url: "https://www.ird.gov.hk/eng/pdf/pam39e.pdf",
      detalle: "240,000 less MPF 9,000 less basic allowance 132,000 = 99,000. Tax 3,940, less the 3,000 reduction = 940.",
    },
    fecha: "2026-10-16",
    entrada: { anio: "2025-26", ingreso: 240000, estado: "single", monoparental: false, ...SIN_FAMILIA, ...SIN_DEDUCCIONES, mpf: 9000 },
    esperado: { baseImponible: 99000, impuesto: 3940, reduccion: 3000, aPagar: 940 },
  },
  {
    nombre: "IRD 2026-27 Budget example 1: single, $380,000 in 2025/26",
    origen: {
      tipo: "oficial",
      url: "https://www.ird.gov.hk/eng/pdf/2026/example2627.pdf",
      detalle: "380,000 less basic allowance 132,000 = 248,000. Tax 24,160 less 3,000 = 21,160.",
    },
    fecha: "2026-10-16",
    entrada: { anio: "2025-26", ingreso: 380000, estado: "single", monoparental: false, ...SIN_FAMILIA, ...SIN_DEDUCCIONES },
    esperado: { baseImponible: 248000, impuesto: 24160, aPagar: 21160 },
  },
  {
    nombre: "IRD 2026-27 Budget example 1: same income with 2026/27 allowances",
    origen: {
      tipo: "oficial",
      url: "https://www.ird.gov.hk/eng/pdf/2026/example2627.pdf",
      detalle: "380,000 less basic allowance 145,000 = 235,000. Tax 21,950, no reduction for 2026/27.",
    },
    fecha: "2026-10-16",
    entrada: { anio: "2026-27", ingreso: 380000, estado: "single", monoparental: false, ...SIN_FAMILIA, ...SIN_DEDUCCIONES },
    esperado: { baseImponible: 235000, aPagar: 21950, reduccion: 0 },
  },
  {
    nombre: "IRD 2026-27 Budget example 2: single parent with TVC, 2025/26",
    origen: {
      tipo: "oficial",
      url: "https://www.ird.gov.hk/eng/pdf/2026/example2627.pdf",
      detalle: "500,000 less TVC 60,000 = 440,000. Less basic 132,000, single parent 132,000, child 130,000 = 46,000. Tax 920, fully reduced.",
    },
    fecha: "2026-10-16",
    entrada: { anio: "2025-26", ingreso: 500000, estado: "single", monoparental: true, ...SIN_FAMILIA, hijos: 1, ...SIN_DEDUCCIONES, tvc: 60000 },
    esperado: { ingresoNeto: 440000, baseImponible: 46000, impuesto: 920, aPagar: 0 },
  },
  {
    nombre: "IRD 2026-27 Budget example 2: single parent with TVC, 2026/27 allowances",
    origen: {
      tipo: "oficial",
      url: "https://www.ird.gov.hk/eng/pdf/2026/example2627.pdf",
      detalle: "440,000 less 145,000, 145,000 and 140,000 = 10,000. Tax 200.",
    },
    fecha: "2026-10-16",
    entrada: { anio: "2026-27", ingreso: 500000, estado: "single", monoparental: true, ...SIN_FAMILIA, hijos: 1, ...SIN_DEDUCCIONES, tvc: 60000 },
    esperado: { baseImponible: 10000, aPagar: 200 },
  },
  {
    nombre: "IRD PAM 39 Q5: married, spouse without income, 2026/27",
    origen: {
      tipo: "oficial",
      url: "https://www.ird.gov.hk/eng/pdf/pam39e.pdf",
      detalle: "480,000 less MPF 18,000 = 462,000, less married person's allowance 290,000 = 172,000. Tax 12,080.",
    },
    fecha: "2026-10-16",
    entrada: { anio: "2026-27", ingreso: 480000, estado: "married", monoparental: false, ...SIN_FAMILIA, ...SIN_DEDUCCIONES, mpf: 18000 },
    esperado: { baseImponible: 172000, aPagar: 12080 },
  },
  {
    nombre: "High income pays at the standard rate",
    origen: {
      tipo: "recalculado",
      detalle: "Net income 3,000,000 less MPF 18,000 = 2,982,000. Progressive: 16,000 + (2,982,000 less 145,000 less 200,000) x 17% = 464,290. Standard: 2,982,000 x 15% = 447,300, the lower.",
    },
    fecha: "2026-10-16",
    entrada: { anio: "2026-27", ingreso: 3000000, estado: "single", monoparental: false, ...SIN_FAMILIA, ...SIN_DEDUCCIONES, mpf: 18000 },
    esperado: { progresivo: 464290, estandar: 447300, aPagar: 447300 },
  },
  {
    nombre: "MPF above the ceiling counts only up to $18,000",
    origen: { tipo: "recalculado", detalle: "Deduction capped at 18,000: 300,000 less 18,000 less 145,000 = 137,000. Tax 4,000 + 37,000 x 10% = 7,700." },
    fecha: "2026-10-16",
    entrada: { anio: "2026-27", ingreso: 300000, estado: "single", monoparental: false, ...SIN_FAMILIA, ...SIN_DEDUCCIONES, mpf: 25000 },
    esperado: { deducciones: 18000, baseImponible: 137000, aPagar: 7700 },
  },
  {
    nombre: "Newborn and two parents aged 60 living with you",
    origen: {
      tipo: "recalculado",
      detalle: "2026/27: married 290,000 + child 140,000 x 2 (newborn) + parents 55,000 x 4 = 790,000. 1,000,000 less 18,000 less 790,000 = 192,000. Tax 9,000 + 42,000 x 14% = 14,880.",
    },
    fecha: "2026-10-16",
    entrada: { anio: "2026-27", ingreso: 1000000, estado: "married", monoparental: false, ...SIN_FAMILIA, hijos: 1, hijosRecientes: 1, padres60: 2, padres60Conviven: 2, ...SIN_DEDUCCIONES, mpf: 18000 },
    esperado: { asignaciones: 790000, baseImponible: 192000, aPagar: 14880 },
  },
  {
    nombre: "More newborns than children is not valid",
    origen: { tipo: "recalculado", detalle: "hijosRecientes > hijos." },
    fecha: "2026-10-16",
    entrada: { anio: "2026-27", ingreso: 300000, estado: "single", monoparental: false, ...SIN_FAMILIA, hijos: 1, hijosRecientes: 2, ...SIN_DEDUCCIONES },
    esperaError: true,
  },
]);
