import { definirCasos } from "@/motor/calculo";
import calculadora from "./paye-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "FRCS worked example: salary of FJ$240,000 plus a retiring payment of FJ$30,200.50",
    origen: {
      tipo: "oficial",
      url: "https://frcs.org.fj/files/2026/08/Employer-Guide-2026.pdf",
      detalle: "The Employer Guide 2026 gives PAYE of 47,666.17 on 270,200.50. Check: 47,600 + 33% × 200.50 = 47,666.165, rounded half up.",
    },
    fecha: "2026-10-29",
    entrada: { bruto: 270200.5, periodo: "year", residencia: "resident" },
    esperado: { impuestoAnual: 47666.17 },
  },
  {
    nombre: "Monthly pay of FJ$5,000",
    origen: { tipo: "recalculado", detalle: "Annual 60,000. Tax 3,600 + 20% × 10,000 = 5,600. Per month 5,600 / 12 = 466.67." },
    fecha: "2026-10-29",
    entrada: { bruto: 5000, periodo: "month", residencia: "resident" },
    esperado: { impuestoPeriodo: 466.67, impuestoAnual: 5600, brutoAnual: 60000, netoPeriodo: 4533.33, tasaMarginal: 20 },
  },
  {
    nombre: "Annual pay at the tax-free threshold of FJ$30,000",
    origen: { tipo: "recalculado", detalle: "The first 30,000 of income is nil." },
    fecha: "2026-10-29",
    entrada: { bruto: 30000, periodo: "year", residencia: "resident" },
    esperado: { impuestoAnual: 0 },
  },
  {
    nombre: "Annual pay of FJ$30,001, first dollar in the 18% band",
    origen: { tipo: "recalculado", detalle: "18% × 1 = 0.18." },
    fecha: "2026-10-29",
    entrada: { bruto: 30001, periodo: "year", residencia: "resident" },
    esperado: { impuestoAnual: 0.18 },
  },
  {
    nombre: "Fortnightly pay of FJ$2,000 in the 20% band",
    origen: { tipo: "recalculado", detalle: "Annual 52,000. Tax 3,600 + 20% × 2,000 = 4,000. Per fortnight 4,000 / 26 = 153.85." },
    fecha: "2026-10-29",
    entrada: { bruto: 2000, periodo: "fortnight", residencia: "resident" },
    esperado: { impuestoPeriodo: 153.85, impuestoAnual: 4000 },
  },
  {
    nombre: "Non-resident earning FJ$100,000 a year",
    origen: { tipo: "recalculado", detalle: "Non-resident table: 10,000 + 20% × (100,000 − 50,000) = 20,000." },
    fecha: "2026-10-29",
    entrada: { bruto: 100000, periodo: "year", residencia: "non-resident" },
    esperado: { impuestoAnual: 20000 },
  },
  {
    nombre: "Resident earning FJ$1,200,000 a year, top band",
    origen: { tipo: "recalculado", detalle: "318,500 + 39% × 200,000 = 396,500." },
    fecha: "2026-10-29",
    entrada: { bruto: 1200000, periodo: "year", residencia: "resident" },
    esperado: { impuestoAnual: 396500, tasaMarginal: 39 },
  },
  { nombre: "Zero pay is rejected", origen: { tipo: "recalculado", detalle: "Pay must be above zero." }, fecha: "2026-10-29", entrada: { bruto: 0, periodo: "month", residencia: "resident" }, esperaError: true },
]);
