import { definirCasos } from "@/motor/calculo";
import mzdaZaNadcas from "./mzda-za-nadcas";

const ZP = "https://static.slov-lex.sk/static/SK/ZZ/2001/311/20260901.html";

export default definirCasos(mzdaZaNadcas, [
  { nombre: "10 hodín, bežná práca", origen: { tipo: "recalculado", url: ZP, detalle: "§ 121 ods. 1: 12 × 10 = 120; 25 % z 120 = 30." }, fecha: "2026-06-15", entrada: { hodinova: 12, priemerny: 12, hodiny: 10, druh: "bezna" }, esperado: { spolu: 150, zvyhodnenie: 30 } },
  { nombre: "10 hodín, riziková práca", origen: { tipo: "recalculado", url: ZP, detalle: "§ 121 ods. 1: 35 % z 120 = 42." }, fecha: "2026-06-15", entrada: { hodinova: 12, priemerny: 12, hodiny: 10, druh: "rizikova" }, esperado: { spolu: 162 } },
]);
