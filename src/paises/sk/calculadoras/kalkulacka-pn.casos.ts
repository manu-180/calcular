import { definirCasos } from "@/motor/calculo";
import kalkulackaPn from "./kalkulacka-pn";

const PN = "https://www.socpoist.sk/socialne-poistenie/nemocenske-poistenie/nemocenske-davka-pocas-pn/dalsie-informacie-nemocenske";
const Z26 = "https://www.socpoist.sk/news/zmena-2026-socialna-poistovna-bude-vyplacat-vyssie-maximalne-sumy-davok-nemocenske-materske";

export default definirCasos(kalkulackaPn, [
  { nombre: "Zamestnanec, 1 500 eur, 20 dní", origen: { tipo: "recalculado", url: PN, detalle: "DVZ 49,3151; 3 × 25 % = 36,99; 11 × 55 % = 298,36; 6 × 55 % = 162,74, nahor 162,80; spolu 498,15." }, fecha: "2026-06-15", entrada: { mzda: 1500, dni: 20, kto: "zamestnanec" }, esperado: { dvz: 49.3151, firma: 335.35, poistovna: 162.8, spolu: 498.15 } },
  { nombre: "SZČO, 1 500 eur, 10 dní", origen: { tipo: "recalculado", url: PN, detalle: "3 × 49,3151 × 25 % = 36,986; 7 × 49,3151 × 55 % = 189,863; spolu 226,85, nahor 226,90." }, fecha: "2026-06-15", entrada: { mzda: 1500, dni: 10, kto: "szco" }, esperado: { poistovna: 226.9, firma: 0 } },
  { nombre: "Strop 2026 za 30 dní nemocenského", origen: { tipo: "oficial", url: Z26, detalle: "Max. DVZ 100,2083; pri 30 dňoch nemocenské 1 653,50 eura; dni 15 až 44." }, fecha: "2026-06-15", entrada: { mzda: 6000, dni: 44, kto: "zamestnanec" }, esperado: { dvz: 100.2083, poistovna: 1653.5 } },
]);
