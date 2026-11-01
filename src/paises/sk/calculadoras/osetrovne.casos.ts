import { definirCasos } from "@/motor/calculo";
import osetrovne from "./osetrovne";

const Z26 = "https://www.socpoist.sk/news/zmena-2026-socialna-poistovna-bude-vyplacat-vyssie-maximalne-sumy-davok-nemocenske-materske";

export default definirCasos(osetrovne, [
  { nombre: "Strop 14 dní v roku 2026", origen: { tipo: "oficial", url: Z26, detalle: "Najviac 771,70 eura za 14 dní." }, fecha: "2026-06-15", entrada: { mzda: 6000, dni: 14 }, esperado: { osetrovne: 771.7 } },
  { nombre: "Mzda 1 500 eur a 10 dní", origen: { tipo: "recalculado", url: Z26, detalle: "49,3151 × 55 % × 10 = 271,23, nahor 271,30." }, fecha: "2026-06-15", entrada: { mzda: 1500, dni: 10 }, esperado: { osetrovne: 271.3 } },
  { nombre: "Viac ako 14 dní je chyba", origen: { tipo: "recalculado", url: Z26, detalle: "Dávka sa vypláca najviac 14 dní." }, fecha: "2026-06-15", entrada: { mzda: 1500, dni: 15 }, esperaError: true },
]);
