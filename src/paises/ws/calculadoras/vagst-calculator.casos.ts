import { definirCasos } from "@/motor/calculo";
import calculadora from "./vagst-calculator";

const URL = "https://revenue.gov.ws/inland-revenue-services/";

export default definirCasos(calculadora, [
  {
    nombre: "Add VAGST to WST 1,000",
    origen: { tipo: "recalculado", url: URL, detalle: "1,000 × 15% = 150. Total 1,150." },
    fecha: "2026-10-29",
    entrada: { monto: 1000, modo: "sin", facturacion: null },
    esperado: { impuesto: 150, con: 1150, sin: 1000 },
  },
  {
    nombre: "Take VAGST out of WST 1,150",
    origen: { tipo: "recalculado", url: URL, detalle: "1,150 / 1.15 = 1,000. VAGST 150." },
    fecha: "2026-10-29",
    entrada: { monto: 1150, modo: "con", facturacion: null },
    esperado: { sin: 1000, impuesto: 150, con: 1150 },
  },
  {
    nombre: "Turnover over the registration threshold",
    origen: { tipo: "oficial", url: URL, detalle: "Registration is required above SAT 130,000 of annual turnover." },
    fecha: "2026-10-29",
    entrada: { monto: 100, modo: "sin", facturacion: 150000 },
    esperado: { impuesto: 15 },
  },
]);
