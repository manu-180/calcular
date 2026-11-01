import { definirCasos } from "@/motor/calculo";
import calculadora from "./prepayment-tax";

export default definirCasos(calculadora, [
  { nombre: "ផលរបរ 50 លាន", origen: { tipo: "recalculado", detalle: "50,000,000 x 1% = 500,000; x 12 = 6,000,000" }, fecha: "2026-10-01", entrada: { ventas: 50000000 }, esperado: { mensual: 500000, anual: 6000000, minimo: 6000000 } },
]);
