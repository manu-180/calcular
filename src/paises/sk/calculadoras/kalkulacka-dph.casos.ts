import { definirCasos } from "@/motor/calculo";
import kalkulackaDph from "./kalkulacka-dph";

const Z = "https://static.slov-lex.sk/static/SK/ZZ/2004/222/20260101.html";

export default definirCasos(kalkulackaDph, [
  { nombre: "100 eur bez DPH pri 23 %", origen: { tipo: "recalculado", url: Z, detalle: "§ 27 ods. 1: 100 × 1,23 = 123." }, fecha: "2026-06-15", entrada: { suma: 100, sadzba: "zakladna", smer: "bez" }, esperado: { sDph: 123, dph: 23 } },
  { nombre: "119 eur s DPH pri 19 %", origen: { tipo: "recalculado", url: Z, detalle: "§ 27 ods. 2: 119 / 1,19 = 100." }, fecha: "2026-06-15", entrada: { suma: 119, sadzba: "znizena", smer: "s" }, esperado: { bezDph: 100, dph: 19 } },
  { nombre: "200 eur bez DPH pri 5 %", origen: { tipo: "recalculado", url: Z, detalle: "§ 27 ods. 3: 200 × 1,05 = 210." }, fecha: "2026-06-15", entrada: { suma: 200, sadzba: "najnizsia", smer: "bez" }, esperado: { sDph: 210 } },
]);
