import { definirCasos } from "@/motor/calculo";
import calculadora from "./severance-pay-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Unfair dismissal after five years",
    origen: {
      tipo: "recalculado",
      url: "https://media.ulii.org/media/legislation/128859/source_file/107fdd589735b99e/ug-act-2026-10-publication-document.pdf",
      detalle: "New section 88: one month's salary for each year worked. 5 × 1,000,000 = 5,000,000.",
    },
    fecha: "2026-10-24",
    entrada: { anios: 5, meses: 0, mensual: 1000000, motivo: "unfair" },
    esperado: { severance: 5000000, anios: 5 },
  },
  {
    nombre: "Redundancy after 3 years and 7 months",
    origen: { tipo: "recalculado", detalle: "Three full years × 1,500,000 = 4,500,000." },
    fecha: "2026-10-24",
    entrada: { anios: 3, meses: 7, mensual: 1500000, motivo: "redundancy" },
    esperado: { severance: 4500000 },
  },
  {
    nombre: "Resignation",
    origen: { tipo: "recalculado", detalle: "Not one of the situations in section 86." },
    fecha: "2026-10-24",
    entrada: { anios: 8, meses: 0, mensual: 1000000, motivo: "other" },
    esperado: { severance: 0 },
  },
  {
    nombre: "Five months of service",
    origen: { tipo: "recalculado", detalle: "Section 86 needs six months of continuous service." },
    fecha: "2026-10-24",
    entrada: { anios: 0, meses: 5, mensual: 1000000, motivo: "unfair" },
    esperado: { severance: 0 },
  },
]);
