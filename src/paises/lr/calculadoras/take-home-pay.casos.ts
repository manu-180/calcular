import { definirCasos } from "@/motor/calculo";
import calculadora from "./take-home-pay";

export default definirCasos(calculadora, [
  {
    nombre: "L$40,000 a month",
    origen: {
      tipo: "recalculado",
      detalle: "NASSCORP 4% = 1,600. Year 480,000: 6,500 + 15% × 280,000 = 48,500, a month 4,041.67. Net 40,000 − 1,600 − 4,041.67 = 34,358.33.",
    },
    fecha: "2026-10-27",
    entrada: { salario: 40000, divisa: "lrd", beneficios: 0, tipoCambio: null },
    esperado: { nasscorp: 1600, pit: 4041.67, neto: 34358.33, marginal: 15 },
  },
  {
    nombre: "Housing benefit above the exemption",
    origen: {
      tipo: "recalculado",
      detalle: "Salary 40,000 and housing worth 10,000 a month: benefits 120,000 a year, 100,000 exempt, 20,000 taxed. Year 500,000: 6,500 + 15% × 300,000 = 51,500, a month 4,291.67. Net 40,000 − 1,600 − 4,291.67 = 34,108.33.",
    },
    fecha: "2026-10-27",
    entrada: { salario: 40000, divisa: "lrd", beneficios: 10000, tipoCambio: null },
    esperado: { pit: 4291.67, neto: 34108.33, gravable: 500000 },
  },
  {
    nombre: "US$600 a month at L$170",
    origen: {
      tipo: "recalculado",
      detalle: "600 × 170 = 102,000 a month. NASSCORP 4,080. Year 1,224,000: 96,500 + 25% × 424,000 = 202,500, a month 16,875. Net 102,000 − 4,080 − 16,875 = 81,045, or US$476.74.",
    },
    fecha: "2026-10-27",
    entrada: { salario: 600, divisa: "usd", beneficios: 0, tipoCambio: 170 },
    esperado: { nasscorp: 4080, pit: 16875, neto: 81045, netoUsd: 476.74, marginal: 25 },
  },
  {
    nombre: "Low salary below the tax-free band",
    origen: { tipo: "recalculado", detalle: "5,000 a month is 60,000 a year: no PIT. NASSCORP 200. Net 4,800." },
    fecha: "2026-10-27",
    entrada: { salario: 5000, divisa: "lrd", beneficios: 0, tipoCambio: null },
    esperado: { pit: 0, nasscorp: 200, neto: 4800 },
  },
  {
    nombre: "No salary",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-27",
    entrada: { salario: 0, divisa: "lrd", beneficios: 0, tipoCambio: null },
    esperaError: true,
  },
]);
