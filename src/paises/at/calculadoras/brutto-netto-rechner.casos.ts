import { definirCasos } from "@/motor/calculo";
import bruttoNettoRechner from "./brutto-netto-rechner";

const BMF_RECHNER = "https://onlinerechner.haude.at/BMF-Brutto-Netto-Rechner/";
const OHNE = { kinderUnter18: 0, kinderAb18: 0, faboHalb: false, avabKinder: 0, pendler: "keine", pendlerKm: null } as const;

export default definirCasos(bruttoNettoRechner, [
  {
    nombre: "3.500 Euro brutto, Angestellte in Wien",
    origen: { tipo: "oficial", url: BMF_RECHNER, detalle: "BMF-Brutto-Netto-Rechner 2026, Angestellter, Wien: SV 641,20, LSt 404,09, Netto 2.454,71; 13. Bezug netto 2.765,60; 14. Bezug netto 2.728,40; Jahr netto 34.950,52." },
    fecha: "2026-10-14",
    entrada: { brutto: 3500, wien: true, ...OHNE },
    esperado: { sv: 641.2, lohnsteuer: 404.09, netto: 2454.71, urlaubsgeld: 2765.6, weihnachtsgeld: 2728.4, nettoJahr: 34950.52, svJahr: 8889.3, lohnsteuerJahr: 5160.18, grenzsteuersatz: 30 },
  },
  {
    nombre: "8.000 Euro brutto in Wien, über der Höchstbeitragsgrundlage",
    origen: { tipo: "oficial", url: BMF_RECHNER, detalle: "BMF-Brutto-Netto-Rechner 2026, Wien: SV 1.269,58, LSt 2.002,16, Netto 4.728,26; 13. Bezug netto 6.273,54; 14. Bezug netto 6.579,72; Jahr netto 69.592,38." },
    fecha: "2026-10-14",
    entrada: { brutto: 8000, wien: true, ...OHNE },
    esperado: { sv: 1269.58, lohnsteuer: 2002.16, netto: 4728.26, urlaubsgeld: 6273.54, weihnachtsgeld: 6579.72, nettoJahr: 69592.38 },
  },
  {
    nombre: "2.300 Euro brutto in Wien, ermäßigte Arbeitslosenversicherung",
    origen: { tipo: "oficial", url: BMF_RECHNER, detalle: "BMF-Brutto-Netto-Rechner 2026, Wien: SV 376,51, LSt 123,50, Netto 1.799,99; 13. Bezug netto 1.872,31; 14. Bezug netto 1.835,11; Jahr netto 25.307,30." },
    fecha: "2026-10-14",
    entrada: { brutto: 2300, wien: true, ...OHNE },
    esperado: { sv: 376.51, av: 23, lohnsteuer: 123.5, netto: 1799.99, urlaubsgeld: 1872.31, weihnachtsgeld: 1835.11, nettoJahr: 25307.3 },
  },
  {
    nombre: "3.500 Euro außerhalb Wiens, ein Kind, großes Pendlerpauschale 30 km",
    origen: {
      tipo: "recalculado",
      url: "https://www.bmf.gv.at/themen/steuern/arbeitnehmerveranlagung/pendlerfoerderung-das-pendlerpauschale/allgemeines-zum-pendlerpauschale.html",
      detalle: "SV 3.500 × 18,07 % = 632,45; Pendlerpauschale 1.476 / 12 = 123; BMG 2.744,55; Tarif 140,884 + 30 % × 900,88 = 411,148; minus Familienbonus 166,68, Verkehrsabsetzbetrag 41,33, Pendlereuro 30 × 6 / 12 = 15 ergibt 188,14; Netto 2.679,41.",
    },
    fecha: "2026-10-14",
    entrada: { brutto: 3500, wien: false, kinderUnter18: 1, kinderAb18: 0, faboHalb: false, avabKinder: 0, pendler: "gross-20", pendlerKm: 30 },
    esperado: { sv: 632.45, lohnsteuer: 188.14, netto: 2679.41, familienbonus: 166.68, nettoJahr: 37646.92 },
  },
  {
    nombre: "Geringfügig beschäftigt: 500 Euro",
    origen: { tipo: "recalculado", url: "https://www.sozialversicherung.at/cdscontent/load?contentid=10008.806858", detalle: "500 Euro liegen unter der Geringfügigkeitsgrenze von 551,10 Euro: keine Dienstnehmerbeiträge, Lohnsteuer 0." },
    fecha: "2026-10-14",
    entrada: { brutto: 500, wien: false, ...OHNE },
    esperado: { sv: 0, lohnsteuer: 0, netto: 500, nettoJahr: 7000 },
  },
  {
    nombre: "Pendlerpauschale ohne Kilometer",
    origen: { tipo: "recalculado", url: "https://www.bmf.gv.at/themen/steuern/arbeitnehmerveranlagung/pendlerfoerderung-das-pendlerpauschale/allgemeines-zum-pendlerpauschale.html", detalle: "Der Pendlereuro braucht die einfache Strecke." },
    fecha: "2026-10-14",
    entrada: { brutto: 3000, wien: false, kinderUnter18: 0, kinderAb18: 0, faboHalb: false, avabKinder: 0, pendler: "klein-20", pendlerKm: null },
    esperaError: true,
  },
]);
