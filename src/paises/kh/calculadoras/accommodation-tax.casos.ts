import { definirCasos } from "@/motor/calculo";
import calculadora from "./accommodation-tax";

export default definirCasos(calculadora, [
  { nombre: "ឧទាហរណ៍ 2%", origen: { tipo: "recalculado", detalle: "4,000,000 x 2% = 80,000 (GDT: 1,000 USD x 2% = 20 USD)" }, fecha: "2026-10-01", entrada: { tarifa: 4000000 }, esperado: { impuesto: 80000 } },
]);
