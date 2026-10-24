import { definirCasos } from "@/motor/calculo";
import calculadora from "./foreign-card-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Rs. 100,000 spent abroad",
    origen: { tipo: "recalculado", detalle: "0.5% × 100,000 = 500." },
    fecha: "2026-10-17",
    entrada: { monto: 100000 },
    esperado: { impuesto: 500, total: 100500 },
  },
]);
