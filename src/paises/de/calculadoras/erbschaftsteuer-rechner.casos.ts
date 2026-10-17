import { definirCasos } from "@/motor/calculo";
import erbschaftsteuerRechner from "./erbschaftsteuer-rechner";

const ERBSTG19 = "https://www.gesetze-im-internet.de/erbstg_1974/__19.html";

export default definirCasos(erbschaftsteuerRechner, [
  {
    nombre: "Kind erbt 500.000 Euro",
    origen: { tipo: "recalculado", url: ERBSTG19, detalle: "500000 − 400000 = 100000; Steuerklasse I bis 300000: 11 % = 11000. Härteausgleich: 75000 × 7 % + 25000 × 50 % = 17750, greift nicht." },
    fecha: "2026-10-14",
    entrada: { wert: 500000, verhaeltnis: "kind" },
    esperado: { steuerklasse: "I", freibetrag: 400000, steuerpflichtig: 100000, satz: 11, steuer: 11000 },
  },
  {
    nombre: "Härteausgleich knapp über 75.000 Euro",
    origen: { tipo: "recalculado", url: ERBSTG19, detalle: "476000 − 400000 = 76000; 11 % = 8360. Härteausgleich: 75000 × 7 % + 1000 × 50 % = 5750." },
    fecha: "2026-10-14",
    entrada: { wert: 476000, verhaeltnis: "kind" },
    esperado: { steuerpflichtig: 76000, satz: 11, steuer: 5750 },
  },
  {
    nombre: "Schwester erbt 120.000 Euro",
    origen: { tipo: "recalculado", url: ERBSTG19, detalle: "120000 − 20000 = 100000; Steuerklasse II: 20 % = 20000." },
    fecha: "2026-10-14",
    entrada: { wert: 120000, verhaeltnis: "geschwister" },
    esperado: { steuerklasse: "II", steuerpflichtig: 100000, satz: 20, steuer: 20000 },
  },
  {
    nombre: "Lebensgefährtin, Abrundung auf volle 100 Euro",
    origen: { tipo: "recalculado", url: "https://www.gesetze-im-internet.de/erbstg_1974/__10.html", detalle: "50050 − 20000 = 30050, abgerundet 30000; Steuerklasse III: 30 % = 9000." },
    fecha: "2026-10-14",
    entrada: { wert: 50050, verhaeltnis: "andere" },
    esperado: { steuerklasse: "III", steuerpflichtig: 30000, steuer: 9000 },
  },
  {
    nombre: "Ehegatte unter dem Freibetrag",
    origen: { tipo: "recalculado", url: "https://www.gesetze-im-internet.de/erbstg_1974/__16.html", detalle: "300000 < 500000: keine Steuer." },
    fecha: "2026-10-14",
    entrada: { wert: 300000, verhaeltnis: "ehegatte" },
    esperado: { steuerpflichtig: 0, steuer: 0 },
  },
]);
