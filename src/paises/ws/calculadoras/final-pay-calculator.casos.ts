import { definirCasos } from "@/motor/calculo";
import calculadora from "./final-pay-calculator";

const URL = "https://www.mcil.gov.ws/sites/default/files/documents/2013-01/Consolidated-Labour-and-Employment-Relations-Act-2013.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "Three weeks of notice pay and 7 leave days",
    origen: { tipo: "recalculado", url: URL, detalle: "Week 692.3077. Leave 692.3077 / 5 × 7 = 969.23. Notice 3 × 692.3077 = 2,076.92. Unpaid wages 500. Total 3,546.15." },
    fecha: "2026-10-29",
    entrada: { pagoMensual: 3000, diasSemana: 5, diasVacaciones: 7, semanasAviso: 3, salarioPendiente: 500 },
    esperado: { vacaciones: 969.23, aviso: 2076.92, pendiente: 500, total: 3546.15 },
  },
  {
    nombre: "Only unused leave",
    origen: { tipo: "recalculado", url: URL, detalle: "2,600 × 12 / 52 = 600 a week. 600 / 5 × 10 = 1,200." },
    fecha: "2026-10-29",
    entrada: { pagoMensual: 2600, diasSemana: 5, diasVacaciones: 10, semanasAviso: 0, salarioPendiente: 0 },
    esperado: { total: 1200 },
  },
]);
