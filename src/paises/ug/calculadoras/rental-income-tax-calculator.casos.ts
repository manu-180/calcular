import { definirCasos } from "@/motor/calculo";
import calculadora from "./rental-income-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "URA example: individual with Ushs 6,000,000",
    origen: {
      tipo: "oficial",
      url: "https://ura.go.ug/en/rental-income-tax-4/",
      detalle: "6,000,000 − 2,820,000 = 3,180,000; 12% = 381,600.",
    },
    fecha: "2026-10-24",
    entrada: { tipo: "individual", renta: 6000000, gastos: null },
    esperado: { impuesto: 381600, gravable: 3180000 },
  },
  {
    nombre: "URA example: company with Ushs 4,100,000 of expenses",
    origen: {
      tipo: "oficial",
      url: "https://ura.go.ug/en/rental-income-tax-4/",
      detalle: "Expenses capped at 50% of 6,000,000 = 3,000,000. Chargeable 3,000,000; 30% = 900,000.",
    },
    fecha: "2026-10-24",
    entrada: { tipo: "company", renta: 6000000, gastos: 4100000 },
    esperado: { impuesto: 900000, gravable: 3000000, deducido: 3000000 },
  },
  {
    nombre: "Individual below the threshold",
    origen: { tipo: "recalculado", detalle: "2,400,000 is below 2,820,000: nil (URA partnership example for Arafat)." },
    fecha: "2026-10-24",
    entrada: { tipo: "individual", renta: 2400000, gastos: null },
    esperado: { impuesto: 0, gravable: 0 },
  },
  {
    nombre: "Company with expenses under the cap",
    origen: { tipo: "recalculado", detalle: "Expenses 1,000,000 are below 3,000,000, so all are deducted. (6,000,000 − 1,000,000) × 30% = 1,500,000." },
    fecha: "2026-10-24",
    entrada: { tipo: "company", renta: 6000000, gastos: 1000000 },
    esperado: { impuesto: 1500000, deducido: 1000000 },
  },
]);
