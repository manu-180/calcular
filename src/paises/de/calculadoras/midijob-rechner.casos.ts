import { definirCasos } from "@/motor/calculo";
import midijobRechner from "./midijob-rechner";

const SGB4 = "https://www.gesetze-im-internet.de/sgb_4/__20.html";

export default definirCasos(midijobRechner, [
  {
    nombre: "1500 Euro, kinderlos",
    origen: {
      tipo: "recalculado",
      url: SGB4,
      detalle: "G = 603, F = 28 / 42,3 = 0,6619. BE AN = 2000 / 1397 × 897 = 1284,18; BE = 0,6619 × 603 + (2000 / 1397 − 603 / 1397 × 0,6619) × 897 = 1427,03. AN: KV 112,37 + RV 119,43 + AV 16,69 + PV 31,68 = 280,17. Voller Satz 21,75 % = 326,25. AG: 137,36 + 146,00 + 20,41 + 28,25 = 332,02.",
    },
    fecha: "2026-10-14",
    entrada: { brutto: 1500, kinder: "kinderlos", bundesland: "nw", zusatzbeitrag: null },
    esperado: { anBeitrag: 280.17, anVoll: 326.25, ersparnis: 46.08, agBeitrag: 332.02, beAn: 1284.18, beGesamt: 1427.03, faktor: 0.6619, untergrenze: 603 },
  },
  {
    nombre: "800 Euro knapp über der Minijob-Grenze",
    origen: { tipo: "recalculado", url: SGB4, detalle: "BE AN = 2000 / 1397 × 197 = 282,03. AN: 24,68 + 26,23 + 3,67 + 8,83 = 63,41 statt 174,00 mit vollem Satz." },
    fecha: "2026-10-14",
    entrada: { brutto: 800, kinder: "kinderlos", bundesland: "nw", zusatzbeitrag: null },
    esperado: { anBeitrag: 63.41, anVoll: 174 },
  },
  {
    nombre: "Über 2000 Euro wird abgewiesen",
    origen: { tipo: "recalculado", url: SGB4, detalle: "Der Übergangsbereich endet bei 2000 Euro." },
    fecha: "2026-10-14",
    entrada: { brutto: 2100, kinder: "kinderlos", bundesland: "nw", zusatzbeitrag: null },
    esperaError: true,
  },
]);
