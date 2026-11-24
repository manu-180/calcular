import { definirCasos } from "@/motor/calculo";
import calculadora from "./property-tax";

export default definirCasos(calculadora, [
  { nombre: "ឧទាហរណ៍ GDT", origen: { tipo: "oficial", url: "https://www.tax.gov.kh/kh/article?key=Rk1yM6013i68510741", detalle: "158,400 USD x 4,000 x 80% = 506,880,000; ដក 100,000,000 = 406,880,000; x 0.1% = 406,880" }, fecha: "2026-10-01", entrada: { valor: 633600000 }, esperado: { impuesto: 406880, base: 406880000 } },
  { nombre: "ក្រោមកម្រិត", origen: { tipo: "recalculado", detalle: "100,000,000 x 80% ដក 100,000,000 តិចជាង 0" }, fecha: "2026-10-01", entrada: { valor: 100000000 }, esperado: { impuesto: 0 } },
]);
