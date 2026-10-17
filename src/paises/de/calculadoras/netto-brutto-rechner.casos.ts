import { definirCasos } from "@/motor/calculo";
import nettoBruttoRechner from "./netto-brutto-rechner";

export default definirCasos(nettoBruttoRechner, [
  {
    nombre: "Netto 2605,50 Euro in Steuerklasse I führt zurück zu rund 4000 Euro brutto",
    origen: {
      tipo: "recalculado",
      url: "https://www.bmf-steuerrechner.de/interface/2026Version1.xhtml?code=LSt2026ext&LZZ=2&RE4=400000&STKL=1&KVZ=2.90&PVZ=1",
      detalle: "Umkehrung des Falls aus dem Brutto-Netto-Rechner: 4000 brutto ergeben 2605,50 netto (Lohnsteuer 524,50 laut BMF, Sozialabgaben 870). Ein Cent weniger Brutto kann wegen der Rundung dasselbe Netto ergeben, daher Toleranz von 50 Cent.",
    },
    fecha: "2026-10-14",
    entrada: { netto: 2605.5, steuerklasse: "1", bundesland: "nw", kirche: false, kinderfreibetraege: "0", kinder: "kinderlos", zusatzbeitrag: null },
    esperado: { brutto: 4000, netto: 2605.5, lohnsteuer: 524.5, sozialabgaben: 870 },
    tolerancia: 0.5,
  },
  {
    nombre: "Ein Netto unter der Minijob-Grenze wird abgewiesen",
    origen: { tipo: "recalculado", detalle: "300 Euro netto erreicht schon ein Minijob unter 603 Euro." },
    fecha: "2026-10-14",
    entrada: { netto: 300, steuerklasse: "1", bundesland: "nw", kirche: false, kinderfreibetraege: "0", kinder: "kinderlos", zusatzbeitrag: null },
    esperaError: true,
  },
]);
