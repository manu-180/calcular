import { definirCasos } from "@/motor/calculo";
import calculadora from "./wrongful-dismissal-compensation-calculator";

const ACT = "https://lpr.adb.org/sites/default/files/resource/%5Bnid%5D/bhutan-labour-and-employement-act-2007-english.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "3 years on Nu. 25,000",
    origen: { tipo: "recalculado", url: ACT, detalle: "Section 94(b): 1 month for each year, so 3 months. 3 × 25,000 = 75,000." },
    fecha: "2026-10-29",
    entrada: { anios: 3, salario: 25000 },
    esperado: { compensacion: 75000, meses: 3, plazoSalarios: 7 },
  },
  {
    nombre: "8 years is capped at 6 months",
    origen: { tipo: "recalculado", url: ACT, detalle: "8 months is above the cap of 6. 6 × 25,000 = 150,000." },
    fecha: "2026-10-29",
    entrada: { anios: 8, salario: 25000 },
    esperado: { compensacion: 150000, meses: 6 },
  },
  {
    nombre: "Less than a year",
    origen: { tipo: "recalculado", detalle: "No complete year gives no months." },
    fecha: "2026-10-29",
    entrada: { anios: 0, salario: 25000 },
    esperado: { compensacion: 0, meses: 0 },
  },
]);
