import { definirCasos } from "@/motor/calculo";
import ueberstundenRechner from "./ueberstunden-rechner";

const OR = "https://www.fedlex.admin.ch/eli/cc/27/317_321_377/de#art_321_c";

export default definirCasos(ueberstundenRechner, [
  {
    nombre: "Monatslohn 6500, 42 Stunden, 10 Überstunden",
    origen: { tipo: "recalculado", url: OR, detalle: "6500 × 12 / 52 / 42 = 35,71 pro Stunde. 10 Stunden = 357,14; Zuschlag 25 % = 89,29; total 446,43 (Art. 321c Abs. 3 OR)." },
    fecha: "2026-10-14",
    entrada: { lohnart: "monat", lohn: 6500, wochenstunden: 42, stunden: 10, zuschlag: null },
    esperado: { stundenlohn: 35.71, grund: 357.14, zuschlag: 89.29, total: 446.43, satz: 25 },
  },
  {
    nombre: "Stundenlohn 30 Franken, 8 Überstunden",
    origen: { tipo: "recalculado", url: OR, detalle: "8 × 30 = 240; Zuschlag 60; total 300." },
    fecha: "2026-10-14",
    entrada: { lohnart: "stunde", lohn: 30, wochenstunden: 42, stunden: 8, zuschlag: null },
    esperado: { grund: 240, zuschlag: 60, total: 300 },
  },
  {
    nombre: "Ohne Zuschlag laut Vertrag",
    origen: { tipo: "recalculado", url: OR, detalle: "Schriftlich wegbedungen: 8 × 30 = 240 ohne Zuschlag." },
    fecha: "2026-10-14",
    entrada: { lohnart: "stunde", lohn: 30, wochenstunden: 42, stunden: 8, zuschlag: 0 },
    esperado: { zuschlag: 0, total: 240 },
  },
]);
