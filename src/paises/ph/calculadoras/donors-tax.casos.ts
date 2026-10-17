import { definirCasos } from "@/motor/calculo";
import calculadora from "./donors-tax";

export default definirCasos(calculadora, [
  {
    nombre: "First gift of ₱500,000",
    origen: { tipo: "recalculado", detalle: "(500,000 − 250,000) × 6% = 15,000." },
    fecha: "2026-10-16",
    entrada: { regalo: 500000, previos: 0 },
    esperado: { impuesto: 15000, gravado: 250000, impuestoAnual: 15000 },
  },
  {
    nombre: "Second gift in the same year",
    origen: { tipo: "recalculado", detalle: "Previous 200,000, now 300,000: total 500,000, tax 15,000; earlier gifts had no tax. Tax on this gift 15,000." },
    fecha: "2026-10-16",
    entrada: { regalo: 300000, previos: 200000 },
    esperado: { impuesto: 15000, acumulado: 500000 },
  },
  {
    nombre: "Gift under the exemption",
    origen: { tipo: "recalculado", detalle: "100,000 is under 250,000: no tax, 150,000 of exemption left." },
    fecha: "2026-10-16",
    entrada: { regalo: 100000, previos: 0 },
    esperado: { impuesto: 0, exentoRestante: 150000 },
  },
  {
    nombre: "Zero gift",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-16",
    entrada: { regalo: 0, previos: 0 },
    esperaError: true,
  },
]);
