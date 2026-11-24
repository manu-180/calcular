import { definirCasos } from "@/motor/calculo";
import calculadora from "./unused-land-tax";

export default definirCasos(calculadora, [
  { nombre: "ឧទាហរណ៍ GDT", origen: { tipo: "oficial", url: "https://www.tax.gov.kh/kh/article?key=@XN6c3i1925056x7W7", detalle: "(90,000 - 50,000) x 15,000 = 600,000,000; x 2% = 12,000,000" }, fecha: "2026-10-01", entrada: { area: 90000, precio: 15000 }, esperado: { impuesto: 12000000, base: 600000000 } },
  { nombre: "ក្រោម 5 ហិកតា", origen: { tipo: "recalculado", detalle: "40,000 ម៉ែត្រការ៉េ មិនជាប់ពន្ធ" }, fecha: "2026-10-01", entrada: { area: 40000, precio: 15000 }, esperado: { impuesto: 0 } },
]);
