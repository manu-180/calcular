import { definirCasos } from "@/motor/calculo";
import calculadora from "./rental-income-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "KSh 60,000 rent in the month",
    origen: { tipo: "recalculado", url: "https://www.kra.go.ke/individual/filing-paying/types-of-taxes/residential-rental-income", detalle: "7.5% × 60,000 = 4,500. Year: 7.5% × 720,000 = 54,000." },
    fecha: "2026-10-17",
    entrada: { renta: 60000, anual: 720000 },
    esperado: { impuesto: 4500, neto: 55500, anualEstimado: 54000 },
  },
  {
    nombre: "KSh 125,500 rent",
    origen: { tipo: "recalculado", detalle: "7.5% × 125,500 = 9,412.50." },
    fecha: "2026-10-17",
    entrada: { renta: 125500, anual: 1506000 },
    esperado: { impuesto: 9412.5 },
  },
]);
