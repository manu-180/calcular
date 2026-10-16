import { definirCasos } from "@/motor/calculo";
import calculadora from "./gst-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Add GST to $100",
    origen: { tipo: "recalculado", detalle: "100 × 15% = 15. Total 115." },
    fecha: "2026-10-14",
    entrada: { importe: 100, modo: "add" },
    esperado: { sinGst: 100, gst: 15, conGst: 115 },
  },
  {
    nombre: "Take GST out of $115",
    origen: { tipo: "recalculado", detalle: "115 × 15 / 115 = 15. Excluding GST 100." },
    fecha: "2026-10-14",
    entrada: { importe: 115, modo: "remove" },
    esperado: { sinGst: 100, gst: 15, conGst: 115 },
  },
  {
    nombre: "Take GST out of $1,000",
    origen: { tipo: "recalculado", detalle: "1,000 × 3 / 23 = 130.43. Excluding GST 869.57." },
    fecha: "2026-10-14",
    entrada: { importe: 1000, modo: "remove" },
    esperado: { sinGst: 869.57, gst: 130.43 },
  },
  {
    nombre: "Zero amount",
    origen: { tipo: "recalculado", detalle: "An amount of 0 is not valid." },
    fecha: "2026-10-14",
    entrada: { importe: 0, modo: "add" },
    esperaError: true,
  },
]);
