import { definirCasos } from "@/motor/calculo";
import kalkulackaMaterske from "./kalkulacka-materske";

const Z26 = "https://www.socpoist.sk/news/zmena-2026-socialna-poistovna-bude-vyplacat-vyssie-maximalne-sumy-davok-nemocenske-materske";
const Z27 = "https://www.socpoist.sk/news/zmena-2027-socialna-poistovna-bude-vyplacat-vyssie-maximalne-sumy-davok-nemocenske-materske";

export default definirCasos(kalkulackaMaterske, [
  { nombre: "Strop v roku 2026", origen: { tipo: "oficial", url: Z26, detalle: "Maximálne 2 254,70 eura pri 30 dňoch a 2 329,90 eura pri 31 dňoch." }, fecha: "2026-06-15", entrada: { mzda: 6000, dlzka: "bezne" }, esperado: { mesiac30: 2254.7, mesiac31: 2329.9, dvz: 100.2083 } },
  { nombre: "Strop v roku 2027", origen: { tipo: "oficial", url: Z27, detalle: "Maximálne 2 396,80 eura pri 30 dňoch a 2 476,70 eura pri 31 dňoch." }, fecha: "2027-02-15", entrada: { mzda: 6000, dlzka: "bezne" }, esperado: { mesiac30: 2396.8, mesiac31: 2476.7 } },
  { nombre: "Mzda 1 500 eur", origen: { tipo: "recalculado", url: Z26, detalle: "DVZ 49,3151 × 75 % = 36,986325; × 30 = 1 109,59, nahor 1 109,60." }, fecha: "2026-06-15", entrada: { mzda: 1500, dlzka: "bezne" }, esperado: { mesiac30: 1109.6, mesiac31: 1146.6, tyzdne: 34 } },
]);
