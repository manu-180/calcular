import { definirCasos } from "@/motor/calculo";
import calculadora from "./salary-compensation-calculator";

const GN7 = "https://www.mra.mu/download/GN15WRA.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "Full-time worker on Rs 25,000",
    origen: { tipo: "oficial", url: GN7, detalle: "Regulation 3(2)(a): 635 rupees a month up to 50,000." },
    fecha: "2026-10-24",
    entrada: { basico: 25000, jornada: "full" },
    esperado: { compensacion: 635, nuevoBasico: 25635, anual: 7620 },
  },
  {
    nombre: "Exactly Rs 50,000 still qualifies",
    origen: { tipo: "oficial", url: GN7, detalle: "Up to 50,000 rupees inclusive." },
    fecha: "2026-10-24",
    entrada: { basico: 50000, jornada: "full" },
    esperado: { compensacion: 635 },
  },
  {
    nombre: "Above Rs 50,000",
    origen: { tipo: "oficial", url: GN7, detalle: "No amount set above 50,000 rupees." },
    fecha: "2026-10-24",
    entrada: { basico: 50001, jornada: "full" },
    esperado: { compensacion: 0 },
  },
  {
    nombre: "Part-time worker on Rs 9,000",
    origen: { tipo: "recalculado", url: GN7, detalle: "Regulation 3(2)(b)(i): 3.7% × 9,000 = 333, rounded up to the next rupee = 333." },
    fecha: "2026-10-24",
    entrada: { basico: 9000, jornada: "part" },
    esperado: { compensacion: 333 },
  },
  {
    nombre: "Part-time worker on Rs 12,345",
    origen: { tipo: "recalculado", url: GN7, detalle: "3.7% × 12,345 = 456.765, rounded up to 457." },
    fecha: "2026-10-24",
    entrada: { basico: 12345, jornada: "part" },
    esperado: { compensacion: 457 },
  },
]);
