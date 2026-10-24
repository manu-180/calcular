import { definirCasos } from "@/motor/calculo";
import calculadora from "./rent-tax";

export default definirCasos(calculadora, [
  {
    nombre: "Residential rent of GH₵2,000",
    origen: { tipo: "recalculado", detalle: "8% of 2,000 = 160." },
    fecha: "2026-10-18",
    entrada: { renta: 2000, tipo: "residential" },
    esperado: { impuesto: 160, neto: 1840, tasa: 8 },
  },
  {
    nombre: "Commercial rent of GH₵10,000",
    origen: { tipo: "recalculado", detalle: "15% of 10,000 = 1,500." },
    fecha: "2026-10-18",
    entrada: { renta: 10000, tipo: "commercial" },
    esperado: { impuesto: 1500, tasa: 15 },
  },
  {
    nombre: "Zero",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-18",
    entrada: { renta: 0, tipo: "residential" },
    esperaError: true,
  },
]);
