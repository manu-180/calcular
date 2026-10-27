import { definirCasos } from "@/motor/calculo";
import calculadora from "./gst-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Add 13% GST to L$10,000",
    origen: { tipo: "recalculado", detalle: "Sections 1000(b)(3) and 1021(b)(1): 13% × 10,000 = 1,300. Total 11,300." },
    fecha: "2026-10-27",
    entrada: { monto: 10000, modo: "sin", exportacion: false },
    esperado: { gst: 1300, neto: 10000, total: 11300, tasa: 13 },
  },
  {
    nombre: "Take GST out of L$11,300",
    origen: { tipo: "recalculado", detalle: "11,300 ÷ 1.13 = 10,000. GST 1,300." },
    fecha: "2026-10-27",
    entrada: { monto: 11300, modo: "con", exportacion: false },
    esperado: { gst: 1300, neto: 10000, total: 11300 },
  },
  {
    nombre: "Export of goods at zero rate",
    origen: { tipo: "recalculado", detalle: "Section 1000(b)(3): exports of goods are taxed at 0%." },
    fecha: "2026-10-27",
    entrada: { monto: 5000, modo: "sin", exportacion: true },
    esperado: { gst: 0, total: 5000, tasa: 0 },
  },
  {
    nombre: "Zero amount",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-27",
    entrada: { monto: 0, modo: "sin", exportacion: false },
    esperaError: true,
  },
]);
