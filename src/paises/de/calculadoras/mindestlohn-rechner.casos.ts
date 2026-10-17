import { definirCasos } from "@/motor/calculo";
import mindestlohnRechner from "./mindestlohn-rechner";

const MILOV = "https://www.gesetze-im-internet.de/milov5/__1.html";

export default definirCasos(mindestlohnRechner, [
  {
    nombre: "Vollzeit mit 40 Stunden im Jahr 2026",
    origen: { tipo: "recalculado", url: MILOV, detalle: "13,90 × 40 × 13 / 3 = 2409,33 im Monat; 13,90 × 40 × 52 = 28912 im Jahr. Minijob-Grenze 13,90 × 130 / 3 = 602,33 → 603; 603 / 13,90 = 43,38 Stunden." },
    fecha: "2026-10-14",
    entrada: { wochenstunden: 40, monatsbrutto: null },
    esperado: { mindestlohn: 13.9, monatlich: 2409.33, jaehrlich: 28912, minijobGrenze: 603, minijobStunden: 43.381 },
    tolerancia: 0.001,
  },
  {
    nombre: "Letzter Tag mit 13,90 Euro",
    origen: { tipo: "recalculado", url: MILOV, detalle: "Am 31.12.2026 gilt noch 13,90 Euro." },
    fecha: "2026-12-31",
    entrada: { wochenstunden: 40, monatsbrutto: null },
    esperado: { mindestlohn: 13.9 },
  },
  {
    nombre: "Ab 2027: 14,60 Euro und neue Minijob-Grenze",
    origen: { tipo: "recalculado", url: MILOV, detalle: "14,60 × 40 × 13 / 3 = 2530,67. Grenze 14,60 × 130 / 3 = 632,67 → 633." },
    fecha: "2027-01-01",
    entrada: { wochenstunden: 40, monatsbrutto: null },
    esperado: { mindestlohn: 14.6, monatlich: 2530.67, minijobGrenze: 633 },
  },
  {
    nombre: "Prüfung eines Lohns unter dem Mindestlohn",
    origen: { tipo: "recalculado", url: MILOV, detalle: "2200 × 3 / (13 × 40) = 12,69 Euro je Stunde; 1,21 Euro unter 13,90." },
    fecha: "2026-10-14",
    entrada: { wochenstunden: 40, monatsbrutto: 2200 },
    esperado: { ihrStundenlohn: 12.69, differenz: -1.21 },
  },
]);
