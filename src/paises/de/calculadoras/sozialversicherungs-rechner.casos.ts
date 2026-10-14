import { definirCasos } from "@/motor/calculo";
import sozialversicherungsRechner from "./sozialversicherungs-rechner";

export default definirCasos(sozialversicherungsRechner, [
  {
    nombre: "4000 Euro, kinderlos, Nordrhein-Westfalen",
    origen: {
      tipo: "recalculado",
      url: "https://www.gesetze-im-internet.de/svbezgrv_2026/BJNR1160A0025.html",
      detalle: "AN: KV (14,6 + 2,9) / 2 = 8,75 % = 350; PV 1,8 + 0,6 = 2,4 % = 96; RV 9,3 % = 372; AV 1,3 % = 52; zusammen 870. AG: 350 + 72 + 372 + 52 = 846. Gesamt 1716.",
    },
    fecha: "2026-10-14",
    entrada: { brutto: 4000, kinder: "kinderlos", bundesland: "nw", zusatzbeitrag: null },
    esperado: { anKv: 350, anPv: 96, anRv: 372, anAv: 52, anSumme: 870, agPv: 72, agSumme: 846, gesamt: 1716 },
  },
  {
    nombre: "4000 Euro in Sachsen, kinderlos",
    origen: {
      tipo: "recalculado",
      url: "https://www.gesetze-im-internet.de/sgb_11/__58.html",
      detalle: "Sachsen: Beschäftigte tragen 1 Prozentpunkt allein. AN-PV (3,6 − 1) / 2 + 1 + 0,6 = 2,9 % = 116; AG-PV 1,3 % = 52.",
    },
    fecha: "2026-10-14",
    entrada: { brutto: 4000, kinder: "kinderlos", bundesland: "sn", zusatzbeitrag: null },
    esperado: { anPv: 116, agPv: 52 },
  },
  {
    nombre: "Über den Beitragsbemessungsgrenzen, eigener Zusatzbeitrag 2,5 %",
    origen: {
      tipo: "recalculado",
      url: "https://www.gesetze-im-internet.de/svbezgrv_2026/BJNR1160A0025.html",
      detalle: "10000 Euro, zwei Kinder: KV 5812,50 × (14,6 + 2,5) / 2 % = 496,97; PV 5812,50 × (1,8 − 0,25) % = 90,09; RV 8450 × 9,3 % = 785,85; AV 8450 × 1,3 % = 109,85.",
    },
    fecha: "2026-10-14",
    entrada: { brutto: 10000, kinder: "2", bundesland: "by", zusatzbeitrag: 2.5 },
    esperado: { anKv: 496.97, anPv: 90.09, anRv: 785.85, anAv: 109.85 },
  },
]);
