import { definirCasos } from "@/motor/calculo";
import lohnsteuerRechner from "./lohnsteuer-rechner";

const BMF = "https://www.bmf-steuerrechner.de/interface/2026Version1.xhtml?code=LSt2026ext&LZZ=2&KVZ=2.90&PVZ=1";

export default definirCasos(lohnsteuerRechner, [
  {
    nombre: "5500 Euro, alle sechs Steuerklassen",
    origen: {
      tipo: "oficial",
      url: `${BMF}&RE4=550000&STKL=1`,
      detalle: "BMF-Schnittstelle (PAP 2026), kinderlos, Zusatzbeitrag 2,9 %: Klasse I 921,25; II 797,50; III 506,83; IV 921,25; V 1448,00; VI 1492,33 Euro (je Abfrage mit STKL=1 bis 6).",
    },
    fecha: "2026-10-14",
    entrada: { brutto: 5500, steuerklasse: "1", kinderfreibetraege: "0", bundesland: "nw", kirche: false, kinder: "kinderlos", zusatzbeitrag: null },
    esperado: { lohnsteuer: 921.25, soli: 0, klasse1: 921.25, klasse2: 797.5, klasse3: 506.83, klasse4: 921.25, klasse5: 1448, klasse6: 1492.33 },
  },
  {
    nombre: "15000 Euro in Steuerklasse III mit Soli in der Milderungszone",
    origen: { tipo: "oficial", url: `${BMF}&RE4=1500000&STKL=3`, detalle: "BMF: Lohnsteuer 3804,66 Euro, Solidaritätszuschlag 49,14 Euro." },
    fecha: "2026-10-14",
    entrada: { brutto: 15000, steuerklasse: "3", kinderfreibetraege: "0", bundesland: "he", kirche: false, kinder: "kinderlos", zusatzbeitrag: null },
    esperado: { lohnsteuer: 3804.66, soli: 49.14 },
  },
  {
    nombre: "12000 Euro in Steuerklasse IV mit 1,5 Kinderfreibeträgen und Kirche in Bayern",
    origen: {
      tipo: "oficial",
      url: "https://www.bmf-steuerrechner.de/interface/2026Version1.xhtml?code=LSt2026ext&LZZ=2&RE4=1200000&STKL=4&ZKF=1.5&KVZ=2.90&PVZ=0&PVA=1&R=1",
      detalle: "BMF: Lohnsteuer 3493,50, Soli 178,05, Bemessungsgrundlage Kirchensteuer 3237,33; 8 % davon = 258,98 (abgerundet).",
    },
    fecha: "2026-10-14",
    entrada: { brutto: 12000, steuerklasse: "4", kinderfreibetraege: "1.5", bundesland: "by", kirche: true, kinder: "2", zusatzbeitrag: null },
    esperado: { lohnsteuer: 3493.5, soli: 178.05, kirchensteuer: 258.98 },
  },
]);
