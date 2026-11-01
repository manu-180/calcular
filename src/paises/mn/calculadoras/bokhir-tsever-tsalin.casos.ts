import { definirCasos } from "@/motor/calculo";
import calculadora from "./bokhir-tsever-tsalin";

export default definirCasos(calculadora, [
  { nombre: "1,607,000 цэвэр", origen: { tipo: "recalculado", detalle: "Урвуу тооцоо: ₮ 2,000,000 бохир цалингаас ₮ 1,607,000 үлддэг." }, fecha: "2026-11-01", entrada: { neto: 1607000 }, esperado: { bruto: 2000000 }, tolerancia: 2 },
  { nombre: "648,828 цэвэр", origen: { tipo: "recalculado", detalle: "Урвуу тооцоо: доод хэмжээ ₮ 792,000 цалингаас ₮ 648,828 үлддэг." }, fecha: "2026-11-01", entrada: { neto: 648828 }, esperado: { bruto: 792000 }, tolerancia: 2 },
]);
