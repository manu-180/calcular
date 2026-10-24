import { definirCasos } from "@/motor/calculo";
import calculadora from "./sales-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Add 18%",
    origen: { tipo: "recalculado", detalle: "10,000 × 18% = 1,800; total 11,800." },
    fecha: "2026-10-17",
    entrada: { importe: 10000, sentido: "add" },
    esperado: { bruto: 11800, impuesto: 1800, tasa: 18 },
  },
  {
    nombre: "Remove 18%",
    origen: { tipo: "recalculado", detalle: "59,000 / 1.18 = 50,000; tax 9,000." },
    fecha: "2026-10-17",
    entrada: { importe: 59000, sentido: "remove" },
    esperado: { neto: 50000, impuesto: 9000 },
  },
]);
