import { definirCasos } from "@/motor/calculo";
import tehotenske from "./tehotenske";

const Z26 = "https://www.socpoist.sk/news/zmena-2026-socialna-poistovna-bude-vyplacat-vyssie-maximalne-sumy-davok-nemocenske-materske";

export default definirCasos(tehotenske, [
  { nombre: "Strop 2026", origen: { tipo: "oficial", url: Z26, detalle: "Najviac 451 eur pri 30 dňoch a 466 eur pri 31 dňoch." }, fecha: "2026-06-15", entrada: { mzda: 6000 }, esperado: { mesiac30: 451, mesiac31: 466 } },
  { nombre: "Mzda 1 500 eur", origen: { tipo: "recalculado", url: Z26, detalle: "49,3151 × 15 % = 7,397265; × 30 = 221,92, nahor 222,00." }, fecha: "2026-06-15", entrada: { mzda: 1500 }, esperado: { mesiac30: 222 } },
]);
