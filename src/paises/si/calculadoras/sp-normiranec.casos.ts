import { definirCasos } from "@/motor/calculo";
import calc from "./sp-normiranec";

export default definirCasos(calc, [
  { nombre: "Polni, 40.000", origen: { tipo: "recalculado", detalle: "80 % = 32000; osnova 8000; 20 % = 1600; prispevki 651,04 × 12" }, fecha: "2026-10-31", entrada: { prihodki: 40000, vrsta: "polni" }, esperado: { odhodki: 32000, dohodnina: 1600, ostane: 30587.52 } },
  { nombre: "Polni, 120.000", origen: { tipo: "recalculado", detalle: "Odhodki 48000, osnova 72000, dohodnina 14400 kot v 7. členu ZPZR" }, fecha: "2026-10-31", entrada: { prihodki: 120000, vrsta: "polni" }, esperado: { dohodnina: 14400, osnova: 72000 } },
  { nombre: "Popoldan, 50.000", origen: { tipo: "recalculado", detalle: "10000 + 7000 odhodkov; osnova 33000; dohodnina 6600 kot v 7. členu ZPZR" }, fecha: "2026-10-31", entrada: { prihodki: 50000, vrsta: "popoldan" }, esperado: { odhodki: 17000, dohodnina: 6600 } },
]);
