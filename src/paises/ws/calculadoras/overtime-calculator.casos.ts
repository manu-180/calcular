import { definirCasos } from "@/motor/calculo";
import calculadora from "./overtime-calculator";

const URL = "https://www.mcil.gov.ws/sites/default/files/documents/2013-01/Consolidated-Labour-and-Employment-Relations-Act-2013.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "10 hours of overtime at WST 20 an hour",
    origen: { tipo: "recalculado", url: URL, detalle: "20 × 1.5 = 30 an hour. 30 × 10 = 300." },
    fecha: "2026-10-29",
    entrada: { pago: 20, base: "hora", horas: 10, tipo: "extra" },
    esperado: { tarifa: 30, total: 300 },
  },
  {
    nombre: "6 hours of overtime on WST 3,000 a month",
    origen: { tipo: "recalculado", url: URL, detalle: "Hourly 3,000 × 12 / 2,080 = 17.3077. × 1.5 = 25.9615. × 6 = 155.77." },
    fecha: "2026-10-29",
    entrada: { pago: 3000, base: "mes", horas: 6, tipo: "extra" },
    esperado: { horaBase: 17.31, total: 155.77 },
  },
  {
    nombre: "8 hours on a public holiday",
    origen: { tipo: "recalculado", url: URL, detalle: "Double rate: 20 × 2 × 8 = 320." },
    fecha: "2026-10-29",
    entrada: { pago: 20, base: "hora", horas: 8, tipo: "feriado" },
    esperado: { total: 320 },
  },
]);
