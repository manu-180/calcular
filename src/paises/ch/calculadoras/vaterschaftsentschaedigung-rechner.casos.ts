import { definirCasos } from "@/motor/calculo";
import vaterschaftsentschaedigungRechner from "./vaterschaftsentschaedigung-rechner";

const EOG = "https://www.fedlex.admin.ch/eli/cc/1952/1021_1046_1050/de#art_16_l";

export default definirCasos(vaterschaftsentschaedigungRechner, [
  {
    nombre: "Angestellter mit 6000 Franken",
    origen: { tipo: "recalculado", url: EOG, detalle: "6000 / 30 = 200; 80 % = 160 pro Tag; 14 Taggelder = 2240 (Art. 16k und 16l EOG)." },
    fecha: "2026-10-14",
    entrada: { art: "angestellt", einkommen: 6000 },
    esperado: { tagesverdienst: 200, taggeld: 160, total: 2240, tage: 14 },
  },
  {
    nombre: "Hoher Lohn, Höchstbetrag",
    origen: { tipo: "recalculado", url: EOG, detalle: "12 000 / 30 = 400; 80 % = 320, gekürzt auf 220; 14 × 220 = 3080." },
    fecha: "2026-10-14",
    entrada: { art: "angestellt", einkommen: 12000 },
    esperado: { ungekuerzt: 320, taggeld: 220, total: 3080 },
  },
  {
    nombre: "Selbstständiger mit 72 000 Franken",
    origen: { tipo: "recalculado", url: EOG, detalle: "72 000 / 360 = 200; 80 % = 160; 14 × 160 = 2240." },
    fecha: "2026-10-14",
    entrada: { art: "selbststaendig", einkommen: 72000 },
    esperado: { taggeld: 160, total: 2240 },
  },
]);
