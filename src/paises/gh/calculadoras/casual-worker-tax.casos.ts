import { definirCasos } from "@/motor/calculo";
import calculadora from "./casual-worker-tax";

export default definirCasos(calculadora, [
  {
    nombre: "GH₵1,000 to a casual worker",
    origen: { tipo: "recalculado", detalle: "5% of 1,000 = 50." },
    fecha: "2026-10-18",
    entrada: { pago: 1000 },
    esperado: { impuesto: 50, neto: 950 },
  },
  {
    nombre: "Zero",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-18",
    entrada: { pago: 0 },
    esperaError: true,
  },
]);
