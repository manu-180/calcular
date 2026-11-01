import { definirCasos } from "@/motor/calculo";
import calculadora from "./notice-period-calculator";

const URL = "https://www.mcil.gov.ws/sites/default/files/documents/2013-01/Consolidated-Labour-and-Employment-Relations-Act-2013.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "Six years and seven months of service",
    origen: { tipo: "recalculado", url: URL, detalle: "79 months is between 4 and 7 years: 3 weeks. 3,000 × 12 / 52 = 692.3077 a week, × 3 = 2,076.92. Notice ends 19 November 2026." },
    fecha: "2026-10-29",
    entrada: { inicio: "2020-03-15", aviso: "2026-10-29", pagoMensual: 3000, tipo: "permanente" },
    esperado: { semanas: 3, meses: 79, ultimoDia: "2026-11-19", pagoSustituto: 2076.92 },
  },
  {
    nombre: "Twenty-one years of service",
    origen: { tipo: "recalculado", url: URL, detalle: "More than 19 years: 8 weeks. 8 × 692.3077 = 5,538.46." },
    fecha: "2026-10-29",
    entrada: { inicio: "2005-01-10", aviso: "2026-10-29", pagoMensual: 3000, tipo: "permanente" },
    esperado: { semanas: 8, pagoSustituto: 5538.46 },
  },
  {
    nombre: "Two months of service",
    origen: { tipo: "recalculado", url: URL, detalle: "The schedule starts at three months of service." },
    fecha: "2026-10-29",
    entrada: { inicio: "2026-08-15", aviso: "2026-10-29", pagoMensual: 3000, tipo: "permanente" },
    esperado: { semanas: 0, pagoSustituto: 0 },
  },
  {
    nombre: "Eight months of service",
    origen: { tipo: "recalculado", url: URL, detalle: "Between 3 months and 1 year: 1 week." },
    fecha: "2026-10-29",
    entrada: { inicio: "2026-02-01", aviso: "2026-10-29", pagoMensual: 2600, tipo: "permanente" },
    esperado: { semanas: 1, pagoSustituto: 600 },
  },
]);
