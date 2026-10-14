import { definirCasos } from "@/motor/calculo";
import bruttoNettoRechner from "./brutto-netto-rechner";

const BMF = "https://www.bmf-steuerrechner.de/interface/2026Version1.xhtml?code=LSt2026ext&LZZ=2";

export default definirCasos(bruttoNettoRechner, [
  {
    nombre: "4000 Euro, Steuerklasse I, kinderlos, ohne Kirche",
    origen: {
      tipo: "oficial",
      url: `${BMF}&RE4=400000&STKL=1&KVZ=2.90&PVZ=1`,
      detalle: "Lohnsteuer 524,50 laut BMF-Schnittstelle (PAP 2026). Sozialabgaben: KV 4000 × 8,75 % = 350; PV 4000 × 2,4 % = 96; RV 4000 × 9,3 % = 372; AV 4000 × 1,3 % = 52. Netto 4000 − 524,50 − 870 = 2605,50.",
    },
    fecha: "2026-10-14",
    entrada: { brutto: 4000, steuerklasse: "1", bundesland: "nw", kirche: false, kinderfreibetraege: "0", kinder: "kinderlos", zusatzbeitrag: null },
    esperado: { lohnsteuer: 524.5, soli: 0, kirchensteuer: 0, kv: 350, pv: 96, rv: 372, av: 52, netto: 2605.5 },
  },
  {
    nombre: "6500 Euro, Steuerklasse III, zwei Kinderfreibeträge, drei Kinder, Sachsen, Kirche",
    origen: {
      tipo: "oficial",
      url: `${BMF}&RE4=650000&STKL=3&ZKF=2&KVZ=2.90&PVZ=0&PVS=1&PVA=2&R=1`,
      detalle: "Lohnsteuer 757,83 und Bemessungsgrundlage Kirchensteuer 320,33 laut BMF. KiSt 9 % = 28,82. KV 5812,50 × 8,75 % = 508,59; PV Sachsen 2,3 % − 2 × 0,25 % = 1,8 % von 5812,50 = 104,63; RV 604,50; AV 84,50. Netto 6500 − 786,65 − 1302,22 = 4411,13.",
    },
    fecha: "2026-10-14",
    entrada: { brutto: 6500, steuerklasse: "3", bundesland: "sn", kirche: true, kinderfreibetraege: "2", kinder: "3", zusatzbeitrag: null },
    esperado: { lohnsteuer: 757.83, soli: 0, kirchensteuer: 28.82, kv: 508.59, pv: 104.63, rv: 604.5, av: 84.5, netto: 4411.13 },
  },
  {
    nombre: "1500 Euro im Übergangsbereich, Steuerklasse I, kinderlos",
    origen: {
      tipo: "recalculado",
      url: `${BMF}&RE4=150000&STKL=1&KVZ=2.90&PVZ=1`,
      detalle: "Lohnsteuer 9,25 laut BMF. G = 13,90 × 130 / 3 = 603 (aufgerundet); F = 28 / 42,3 = 0,6619. BE AN = 2000 / 1397 × 897 = 1284,18; BE = 1427,03. KV 112,37; RV 119,43; AV 16,69; PV 1284,18 × 1,8 % + 1427,03 × 0,6 % = 31,68. Netto 1500 − 9,25 − 280,17 = 1210,58.",
    },
    fecha: "2026-10-14",
    entrada: { brutto: 1500, steuerklasse: "1", bundesland: "be", kirche: false, kinderfreibetraege: "0", kinder: "kinderlos", zusatzbeitrag: null },
    esperado: { lohnsteuer: 9.25, kv: 112.37, rv: 119.43, av: 16.69, pv: 31.68, netto: 1210.58 },
  },
  {
    nombre: "9800 Euro, Steuerklasse I: Soli und Bemessungsgrenzen",
    origen: {
      tipo: "oficial",
      url: `${BMF}&RE4=980000&STKL=1&KVZ=2.90&PVZ=1`,
      detalle: "Lohnsteuer 2548,75 und Soli 101,49 laut BMF. KV 5812,50 × 8,75 % = 508,59; PV 5812,50 × 2,4 % = 139,50; RV 8450 × 9,3 % = 785,85; AV 8450 × 1,3 % = 109,85.",
    },
    fecha: "2026-10-14",
    entrada: { brutto: 9800, steuerklasse: "1", bundesland: "by", kirche: false, kinderfreibetraege: "0", kinder: "kinderlos", zusatzbeitrag: null },
    esperado: { lohnsteuer: 2548.75, soli: 101.49, kv: 508.59, pv: 139.5, rv: 785.85, av: 109.85 },
  },
  {
    nombre: "Minijob-Lohn wird abgewiesen",
    origen: { tipo: "recalculado", detalle: "500 Euro liegen unter der Geringfügigkeitsgrenze von 603 Euro." },
    fecha: "2026-10-14",
    entrada: { brutto: 500, steuerklasse: "1", bundesland: "nw", kirche: false, kinderfreibetraege: "0", kinder: "kinderlos", zusatzbeitrag: null },
    esperaError: true,
  },
]);
