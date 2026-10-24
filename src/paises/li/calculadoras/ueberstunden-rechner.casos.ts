import { definirCasos } from "@/motor/calculo";
import ueberstundenRechner from "./ueberstunden-rechner";

export default definirCasos(ueberstundenRechner, [
  {
    nombre: "6500 Franken Monatslohn, 42 Stunden, 10 Überstunden",
    origen: { tipo: "recalculado", url: "https://www.gesetze.li/konso/1003001000", detalle: "Stundenlohn 6500 x 12 / 52 / 42 = 35,71; Normallohn 357,14; Zuschlag 25 % = 89,29; total 446,43." },
    fecha: "2026-10-22",
    entrada: { lohnart: "monat", lohn: 6500, wochenstunden: 42, stunden: 10, zuschlag: null },
    esperado: { stundenlohn: 35.71, grund: 357.14, zuschlag: 89.29, total: 446.43, satz: 25 },
  },
  {
    nombre: "30 Franken Stundenlohn, 5 Stunden",
    origen: { tipo: "recalculado", url: "https://www.gesetze.li/konso/1003001000", detalle: "150 plus 25 % = 187,50." },
    fecha: "2026-10-22",
    entrada: { lohnart: "stunde", lohn: 30, wochenstunden: 42, stunden: 5, zuschlag: null },
    esperado: { total: 187.5, zuschlag: 37.5 },
  },
]);
