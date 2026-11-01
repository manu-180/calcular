import { definirCasos } from "@/motor/calculo";
import kalkulackaDochodku from "./kalkulacka-dochodku";

const ZSP = "https://static.slov-lex.sk/static/SK/ZZ/2003/461/20260901.html";

export default definirCasos(kalkulackaDochodku, [
  { nombre: "Priemerná mzda, 40 rokov", origen: { tipo: "recalculado", url: ZSP, detalle: "§ 66: 1 × 40 × 19,7633 = 790,53, nahor 790,60." }, fecha: "2026-06-15", entrada: { body: 1, roky: 40 }, esperado: { dochodok: 790.6 } },
  { nombre: "Dvojnásobok priemeru, 42 rokov", origen: { tipo: "recalculado", url: ZSP, detalle: "§ 63 ods. 3: 1,25 + 0,75 × 0,68 = 1,76; × 42 × 19,7633 = 1 460,90, nahor 1 461,00." }, fecha: "2026-06-15", entrada: { body: 2, roky: 42 }, esperado: { upraveny: 1.76, dochodok: 1461 } },
  { nombre: "Nízky príjem, 35 rokov", origen: { tipo: "recalculado", url: ZSP, detalle: "§ 63 ods. 4: 0,8 + 0,2 × 0,2 = 0,84; × 35 × 19,7633 = 581,04, nahor 581,10." }, fecha: "2026-06-15", entrada: { body: 0.8, roky: 35 }, esperado: { upraveny: 0.84, dochodok: 581.1 } },
]);
