import { definirCasos } from "@/motor/calculo";
import abgeltungsteuerRechner from "./abgeltungsteuer-rechner";

const ESTG32D = "https://www.gesetze-im-internet.de/estg/__32d.html";

export default definirCasos(abgeltungsteuerRechner, [
  {
    nombre: "5000 Euro, alleinstehend, ohne Kirche",
    origen: { tipo: "recalculado", url: ESTG32D, detalle: "5000 − 1000 = 4000; 25 % = 1000; Soli 5,5 % = 55; zusammen 1055; netto 3945; effektiv 26,375 %." },
    fecha: "2026-10-14",
    entrada: { ertraege: 5000, veranlagung: "einzeln", kirche: false, bundesland: "nw" },
    esperado: { pausch: 1000, steuerpflichtig: 4000, est: 1000, soli: 55, kist: 0, summe: 1055, netto: 3945, effektiv: 26.375 },
  },
  {
    nombre: "Mit Kirchensteuer 9 % (Formel e / (4 + k))",
    origen: { tipo: "recalculado", url: ESTG32D, detalle: "4000 / 4,09 = 977,99; Soli 5,5 % = 53,78; KiSt 9 % = 88,01; zusammen 1119,78." },
    fecha: "2026-10-14",
    entrada: { ertraege: 5000, veranlagung: "einzeln", kirche: true, bundesland: "he" },
    esperado: { est: 977.99, soli: 53.78, kist: 88.01, summe: 1119.78 },
  },
  {
    nombre: "Ehepaar unter dem Pauschbetrag",
    origen: { tipo: "recalculado", url: "https://www.gesetze-im-internet.de/estg/__20.html", detalle: "1500 liegt unter 2000: keine Steuer." },
    fecha: "2026-10-14",
    entrada: { ertraege: 1500, veranlagung: "zusammen", kirche: false, bundesland: "nw" },
    esperado: { steuerpflichtig: 0, summe: 0, netto: 1500 },
  },
]);
