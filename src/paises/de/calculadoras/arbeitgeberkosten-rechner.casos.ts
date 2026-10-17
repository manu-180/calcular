import { definirCasos } from "@/motor/calculo";
import arbeitgeberkostenRechner from "./arbeitgeberkosten-rechner";

export default definirCasos(arbeitgeberkostenRechner, [
  {
    nombre: "4000 Euro brutto",
    origen: {
      tipo: "recalculado",
      url: "https://www.gesetze-im-internet.de/svbezgrv_2026/BJNR1160A0025.html",
      detalle: "AG: KV 8,75 % = 350; PV 1,8 % = 72; RV 9,3 % = 372; AV 1,3 % = 52; zusammen 846. Kosten 4846, im Jahr 58152. Aufschlag 21,15 %.",
    },
    fecha: "2026-10-14",
    entrada: { brutto: 4000, bundesland: "nw", zusatzbeitrag: null },
    esperado: { kv: 350, pv: 72, rv: 372, av: 52, abgaben: 846, kosten: 4846, kostenJahr: 58152, aufschlag: 21.15 },
  },
  {
    nombre: "7000 Euro in Sachsen über der Bemessungsgrenze der Krankenversicherung",
    origen: {
      tipo: "recalculado",
      url: "https://www.gesetze-im-internet.de/sgb_11/__58.html",
      detalle: "KV 5812,50 × 8,75 % = 508,59; PV 5812,50 × 1,3 % = 75,56; RV 7000 × 9,3 % = 651; AV 91. Zusammen 1326,15.",
    },
    fecha: "2026-10-14",
    entrada: { brutto: 7000, bundesland: "sn", zusatzbeitrag: null },
    esperado: { kv: 508.59, pv: 75.56, rv: 651, av: 91, abgaben: 1326.15 },
  },
]);
