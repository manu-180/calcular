import { definirCasos } from "@/motor/calculo";
import calculadora from "./transfer-tax";

export default definirCasos(calculadora, [
  { nombre: "ឧទាហរណ៍ GDT", origen: { tipo: "oficial", url: "https://www.tax.gov.kh/kh/article?key=V@gid2894250474499", detalle: "235,200,000 x 4% = 9,408,000" }, fecha: "2026-10-01", entrada: { valor: 235200000, caso: "venta" }, esperado: { impuesto: 9408000 } },
  { nombre: "រង្វង់ផ្ទាល់", origen: { tipo: "recalculado", detalle: "រួចពីពន្ធ" }, fecha: "2026-10-01", entrada: { valor: 235200000, caso: "exento" }, esperado: { impuesto: 0 } },
  { nombre: "មរតកបងប្អូន", origen: { tipo: "recalculado", detalle: "(300,000,000 - 200,000,000) x 4% = 4,000,000" }, fecha: "2026-10-01", entrada: { valor: 300000000, caso: "herencia-otros" }, esperado: { impuesto: 4000000 } },
  { nombre: "ប្រគល់ជូនលើកបន្ទាប់", origen: { tipo: "recalculado", detalle: "(300,000,000 - 100,000,000) x 4% = 8,000,000" }, fecha: "2026-10-01", entrada: { valor: 300000000, caso: "regalo" }, esperado: { impuesto: 8000000 } },
]);
