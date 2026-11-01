import { definirCasos } from "@/motor/calculo";
import calculadora from "./pension-tax-deduction-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "N$480,000 with N$36,000 to a pension fund",
    origen: {
      tipo: "recalculado",
      detalle: "Without: 59,000 + 28% × 130,000 = 95,400. With: 444,000 → 59,000 + 28% × 94,000 = 85,320. Saving 10,080.",
    },
    fecha: "2026-10-27",
    entrada: { ingreso: 480000, pension: 36000, anualidad: 0, educacion: 0 },
    esperado: { antes: 95400, despues: 85320, ahorro: 10080, deduccion: 36000, espacio: 114000 },
  },
  {
    nombre: "N$660,000 with N$40,000 pension (NamRA example)",
    origen: {
      tipo: "oficial",
      url: "https://itas.namra.org.na/tax/income-tax/calculator",
      detalle: "NamRA calculator: income 660,000 and pension 40,000 give tax of N$136,000. Without the pension: 115,000 + 30% × 110,000 = 148,000. Saving 12,000.",
    },
    fecha: "2026-10-27",
    entrada: { ingreso: 660000, pension: 40000, anualidad: 0, educacion: 0 },
    esperado: { despues: 136000, antes: 148000, ahorro: 12000 },
  },
  {
    nombre: "Contributions above the cap",
    origen: { tipo: "recalculado", detalle: "120,000 + 60,000 = 180,000, capped at 150,000. 1,000,000 − 150,000 = 850,000 → 205,000. Without: 205,000 + 32% × 150,000 = 253,000. Saving 48,000." },
    fecha: "2026-10-27",
    entrada: { ingreso: 1000000, pension: 120000, anualidad: 60000, educacion: 0 },
    esperado: { deduccion: 150000, despues: 205000, ahorro: 48000, espacio: 0 },
  },
]);
