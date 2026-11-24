import { definirCasos } from "@/motor/calculo";
import calculadora from "./patent-tax";

const URL = "https://www.tax.gov.kh/kh/article?key=xGkI6376525034Ux97";

export default definirCasos(calculadora, [
  { nombre: "តូច", origen: { tipo: "oficial", url: URL, detalle: "អ្នកជាប់ពន្ធតូច 400,000 រៀល" }, fecha: "2026-10-01", entrada: { categoria: "small", segundoSemestre: false }, esperado: { pago: 400000 } },
  { nombre: "តូច ឆមាសទីពីរ", origen: { tipo: "oficial", url: URL, detalle: "ចាប់ខែកក្កដា ដល់ខែធ្នូ បង់ពាក់កណ្តាល" }, fecha: "2026-10-01", entrada: { categoria: "small", segundoSemestre: true }, esperado: { pago: 200000 } },
  { nombre: "ធំ លើស 10,000 លាន", origen: { tipo: "oficial", url: URL, detalle: "5,000,000 រៀល" }, fecha: "2026-10-01", entrada: { categoria: "large-10b", segundoSemestre: false }, esperado: { pago: 5000000 } },
]);
