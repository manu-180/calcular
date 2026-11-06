import { definirCasos } from "@/motor/calculo";
import calculadora from "./vat-calculator";

export default definirCasos(calculadora, [
  { nombre: "បន្ថែម 10%", origen: { tipo: "recalculado", detalle: "1,000,000 x 10% = 100,000" }, fecha: "2026-10-01", entrada: { modo: "sumar", tipo: "general", monto: 1000000 }, esperado: { vat: 100000, total: 1100000 } },
  { nombre: "ដកចេញ", origen: { tipo: "oficial", url: "https://www.tax.gov.kh/kh/article?key=7w9R@j6n45500U5L32", detalle: "មូលដ្ឋាន = ផលរបរ / 1.1: 1,100,000 / 1.1 = 1,000,000" }, fecha: "2026-10-01", entrada: { modo: "quitar", tipo: "general", monto: 1100000 }, esperado: { vat: 100000, base: 1000000 } },
  { nombre: "នាំចេញ 0%", origen: { tipo: "recalculado", detalle: "អត្រា 0%" }, fecha: "2026-10-01", entrada: { modo: "sumar", tipo: "exporta", monto: 500000 }, esperado: { vat: 0, total: 500000 } },
]);
