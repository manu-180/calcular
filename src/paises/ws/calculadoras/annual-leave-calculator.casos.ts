import { definirCasos } from "@/motor/calculo";
import calculadora from "./annual-leave-calculator";

const URL = "https://www.mcil.gov.ws/sites/default/files/documents/2013-01/Consolidated-Labour-and-Employment-Relations-Act-2013.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "18 months of service, 5 days taken",
    origen: { tipo: "recalculado", url: URL, detalle: "10 × 18 / 12 = 15 days built up. Balance 10. Day pay 3,000 × 12 / 260 = 138.4615. Value 1,384.62." },
    fecha: "2026-10-29",
    entrada: { meses: 18, tomados: 5, pagoMensual: 3000, diasSemana: 5 },
    esperado: { acumulados: 15, saldo: 10, pagoDia: 138.46, valorSaldo: 1384.62 },
  },
  {
    nombre: "Six months of service, nothing taken",
    origen: { tipo: "recalculado", url: URL, detalle: "10 × 6 / 12 = 5 days. 5 × 138.4615 = 692.31." },
    fecha: "2026-10-29",
    entrada: { meses: 6, tomados: 0, pagoMensual: 3000, diasSemana: 5 },
    esperado: { acumulados: 5, saldo: 5, valorSaldo: 692.31 },
  },
  {
    nombre: "More leave taken than built up",
    origen: { tipo: "recalculado", url: URL, detalle: "Balance cannot go below zero." },
    fecha: "2026-10-29",
    entrada: { meses: 12, tomados: 12, pagoMensual: 2000, diasSemana: 5 },
    esperado: { saldo: 0, valorSaldo: 0 },
  },
]);
