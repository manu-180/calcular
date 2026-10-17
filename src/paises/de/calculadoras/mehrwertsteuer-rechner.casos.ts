import { definirCasos } from "@/motor/calculo";
import mehrwertsteuerRechner from "./mehrwertsteuer-rechner";

const USTG = "https://www.gesetze-im-internet.de/ustg_1980/__12.html";

export default definirCasos(mehrwertsteuerRechner, [
  {
    nombre: "100 Euro netto plus 19 %",
    origen: { tipo: "recalculado", url: USTG, detalle: "100 × 19 % = 19; brutto 119 (§ 12 Absatz 1 UStG)." },
    fecha: "2026-10-14",
    entrada: { betrag: 100, richtung: "aufschlagen", satz: "regel" },
    esperado: { satz: 19, netto: 100, mwst: 19, brutto: 119 },
  },
  {
    nombre: "119 Euro brutto, 19 % herausrechnen",
    origen: { tipo: "recalculado", url: USTG, detalle: "119 / 1,19 = 100; MwSt 19." },
    fecha: "2026-10-14",
    entrada: { betrag: 119, richtung: "herausrechnen", satz: "regel" },
    esperado: { netto: 100, mwst: 19 },
  },
  {
    nombre: "10,70 Euro brutto mit 7 %",
    origen: { tipo: "recalculado", url: USTG, detalle: "10,70 / 1,07 = 10; MwSt 0,70 (§ 12 Absatz 2 UStG)." },
    fecha: "2026-10-14",
    entrada: { betrag: 10.7, richtung: "herausrechnen", satz: "ermaessigt" },
    esperado: { satz: 7, netto: 10, mwst: 0.7 },
  },
  {
    nombre: "Rundung auf den Cent",
    origen: { tipo: "recalculado", url: USTG, detalle: "49,99 / 1,19 = 42,008 → 42,01; MwSt 7,98." },
    fecha: "2026-10-14",
    entrada: { betrag: 49.99, richtung: "herausrechnen", satz: "regel" },
    esperado: { netto: 42.01, mwst: 7.98, brutto: 49.99 },
  },
]);
