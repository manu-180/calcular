import { definirCasos } from "@/motor/calculo";
import mutterschaftsentschaedigungRechner from "./mutterschaftsentschaedigung-rechner";

const MB602 = "https://www.ahv-iv.ch/p/6.02.d";

export default definirCasos(mutterschaftsentschaedigungRechner, [
  {
    nombre: "Arbeitnehmerin mit 5250 Franken",
    origen: { tipo: "oficial", url: MB602, detalle: "Merkblatt 6.02, Beispiel 14: 5250 / 30 = 175; 80 % = 140 pro Tag; 98 Tage = 13 720." },
    fecha: "2026-10-14",
    entrada: { art: "angestellt", einkommen: 5250 },
    esperado: { tagesverdienst: 175, taggeld: 140, total: 13720, tage: 98 },
  },
  {
    nombre: "Arbeitnehmerin über dem Höchstbetrag",
    origen: { tipo: "oficial", url: MB602, detalle: "Beispiel 15: 8430 / 30 = 281; 80 % = 224,80, gekürzt auf 220; 98 Tage = 21 560." },
    fecha: "2026-10-14",
    entrada: { art: "angestellt", einkommen: 8430 },
    esperado: { tagesverdienst: 281, ungekuerzt: 224.8, taggeld: 220, total: 21560 },
  },
  {
    nombre: "Selbstständige mit 27 000 Franken",
    origen: { tipo: "oficial", url: MB602, detalle: "Beispiel 16: 27 000 / 360 = 75; 80 % = 60; 98 Tage = 5880." },
    fecha: "2026-10-14",
    entrada: { art: "selbststaendig", einkommen: 27000 },
    esperado: { tagesverdienst: 75, taggeld: 60, total: 5880 },
  },
  {
    nombre: "Selbstständige über dem Höchstbetrag",
    origen: { tipo: "oficial", url: MB602, detalle: "Beispiel 17: 102 600 / 360 = 285; 80 % = 228, gekürzt auf 220; 21 560." },
    fecha: "2026-10-14",
    entrada: { art: "selbststaendig", einkommen: 102600 },
    esperado: { taggeld: 220, total: 21560 },
  },
]);
