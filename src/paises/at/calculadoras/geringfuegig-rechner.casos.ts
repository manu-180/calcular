import { definirCasos } from "@/motor/calculo";
import geringfuegigRechner from "./geringfuegig-rechner";

const SV = "https://www.sozialversicherung.at/cdscontent/load?contentid=10008.806858";

export default definirCasos(geringfuegigRechner, [
  {
    nombre: "14 Euro, 8 Stunden pro Woche",
    origen: { tipo: "recalculado", url: SV, detalle: "14 × 8 × 52 / 12 = 485,33 Euro; Grenze 551,10 Euro; höchstens 551,10 / (14 × 52 / 12) = 9,08 Stunden pro Woche." },
    fecha: "2026-10-14",
    entrada: { stundenlohn: 14, stunden: 8 },
    esperado: { ergebnis: "Geringfügig beschäftigt", monatslohn: 485.33, abstand: 65.77, maxStunden: 9.084 },
    tolerancia: 0.001,
  },
  {
    nombre: "14 Euro, 10 Stunden pro Woche",
    origen: { tipo: "recalculado", url: SV, detalle: "14 × 10 × 52 / 12 = 606,67 Euro, über der Grenze von 551,10 Euro." },
    fecha: "2026-10-14",
    entrada: { stundenlohn: 14, stunden: 10 },
    esperado: { ergebnis: "Über der Geringfügigkeitsgrenze: voll versichert", monatslohn: 606.67, abstand: -55.57 },
  },
]);
