import { definirCasos } from "@/motor/calculo";
import calculadora from "./nasscorp-pension";

export default definirCasos(calculadora, [
  {
    nombre: "NASSCORP sample: 132 contributions, L$875,000 best five years",
    origen: {
      tipo: "oficial",
      url: "https://nasscorp.org.lr/faq/",
      detalle: "Sample retirement pension calculation: 875,000 / 60 = 14,583.33 × 28% (132 monthly contributions) = 4,083.33.",
    },
    fecha: "2026-10-27",
    entrada: { mejores: 875000, meses: 132, nacimiento: "before-1980" },
    esperado: { promedio: 14583.33, tasa: 28, pension: 4083.33 },
  },
  {
    nombre: "Born after 1980 with 144 contributions",
    origen: { tipo: "recalculado", detalle: "Minimum 144 months gives 25%. 1,200,000 / 60 = 20,000 × 25% = 5,000." },
    fecha: "2026-10-27",
    entrada: { mejores: 1200000, meses: 144, nacimiento: "from-1980" },
    esperado: { tasa: 25, pension: 5000, faltan: 0 },
  },
  {
    nombre: "Born after 1980 with 132 contributions gets a grant",
    origen: { tipo: "recalculado", detalle: "132 is below 144: retirement grant, no monthly pension. 12 months missing." },
    fecha: "2026-10-27",
    entrada: { mejores: 875000, meses: 132, nacimiento: "from-1980" },
    esperado: { tasa: 0, pension: 0, faltan: 12 },
  },
  {
    nombre: "No earnings",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-27",
    entrada: { mejores: 0, meses: 100, nacimiento: "before-1980" },
    esperaError: true,
  },
]);
