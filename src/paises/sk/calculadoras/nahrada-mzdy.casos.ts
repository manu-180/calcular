import { definirCasos } from "@/motor/calculo";
import nahradaMzdy from "./nahrada-mzdy";

const ZP = "https://static.slov-lex.sk/static/SK/ZZ/2001/311/20260901.html";

export default definirCasos(nahradaMzdy, [
  { nombre: "6 000 eur za 520 hodín, päť dní dovolenky", origen: { tipo: "recalculado", url: ZP, detalle: "§ 134 ods. 4: 6 000 / 520 = 11,5385; 40 hodín = 461,54; mesačne × 174 = 2 007,70." }, fecha: "2026-06-15", entrada: { mzda: 6000, hodiny: 520, dni: 5, hodinyDenne: 8 }, esperado: { hodinovy: 11.5385, nahrada: 461.54, mesacny: 2007.7 } },
  { nombre: "Zárobok pod minimálnou mzdou", origen: { tipo: "recalculado", url: ZP, detalle: "§ 134 ods. 5: zvýšenie na 5,259 eura; 8 hodín = 42,07." }, fecha: "2026-06-15", entrada: { mzda: 1000, hodiny: 520, dni: 1, hodinyDenne: 8 }, esperado: { hodinovy: 5.259, nahrada: 42.07 } },
]);
