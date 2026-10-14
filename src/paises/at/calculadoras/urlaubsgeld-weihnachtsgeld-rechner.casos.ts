import { definirCasos } from "@/motor/calculo";
import urlaubsgeldWeihnachtsgeldRechner from "./urlaubsgeld-weihnachtsgeld-rechner";

const BMF_RECHNER = "https://onlinerechner.haude.at/BMF-Brutto-Netto-Rechner/";
const STEUERBUCH = "https://www.bmf.gv.at/dam/jcr:436f8c01-38e0-41bf-b904-c0e62a862bf1/251117_Steuerbuch2026_DE_BF.pdf";

export default definirCasos(urlaubsgeldWeihnachtsgeldRechner, [
  {
    nombre: "3.500 Euro Monatsgehalt",
    origen: { tipo: "oficial", url: BMF_RECHNER, detalle: "BMF-Brutto-Netto-Rechner 2026: 13. Bezug SV 597,45, LSt 136,95, netto 2.765,60; 14. Bezug SV 597,45, LSt 174,15, netto 2.728,40." },
    fecha: "2026-10-14",
    entrada: { brutto: 3500, monate: 12 },
    esperado: { urlaubSv: 597.45, urlaubLst: 136.95, urlaubNetto: 2765.6, weihnachtLst: 174.15, weihnachtNetto: 2728.4, summeNetto: 5494 },
  },
  {
    nombre: "2.300 Euro Monatsgehalt",
    origen: { tipo: "oficial", url: BMF_RECHNER, detalle: "BMF-Brutto-Netto-Rechner 2026: 13. Bezug netto 1.872,31, 14. Bezug netto 1.835,11." },
    fecha: "2026-10-14",
    entrada: { brutto: 2300, monate: 12 },
    esperado: { urlaubNetto: 1872.31, weihnachtNetto: 1835.11, summeNetto: 3707.42 },
  },
  {
    nombre: "1.300 Euro: unter der Freigrenze",
    origen: { tipo: "recalculado", url: STEUERBUCH, detalle: "Jahressechstel 2.600 Euro liegt unter der Freigrenze von 2.615 Euro: keine Lohnsteuer. SV 1.300 × 14,12 % = 183,56 je Sonderzahlung." },
    fecha: "2026-10-14",
    entrada: { brutto: 1300, monate: 12 },
    esperado: { urlaubLst: 0, weihnachtLst: 0, urlaubSv: 183.56, summeNetto: 2232.88 },
  },
  {
    nombre: "3.000 Euro, sechs Monate beschäftigt",
    origen: { tipo: "recalculado", url: STEUERBUCH, detalle: "Je 1.500 Euro; SV 1.500 × 14,12 % = 211,80; Urlaubsgeld (1.288,20 minus 620) × 6 % = 40,09; Weihnachtsgeld 1.288,20 × 6 % = 77,29." },
    fecha: "2026-10-14",
    entrada: { brutto: 3000, monate: 6 },
    esperado: { urlaubBrutto: 1500, urlaubSv: 211.8, urlaubLst: 40.09, weihnachtLst: 77.29, summeNetto: 2459.02 },
  },
]);
