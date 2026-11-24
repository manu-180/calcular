import { definirCasos } from "@/motor/calculo";
import calculadora from "./fringe-benefit-tax";

export default definirCasos(calculadora, [
  {
    nombre: "អត្ថប្រយោជន៍ 1,000,000 រៀល",
    origen: { tipo: "recalculado", detalle: "1,000,000 x 20% = 200,000" },
    fecha: "2026-10-01",
    entrada: { valor: 1000000 },
    esperado: { impuesto: 200000, anual: 2400000 },
  },
]);
