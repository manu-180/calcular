import { definirCasos } from "@/motor/calculo";
import grunderwerbsteuerRechner from "./grunderwerbsteuer-rechner";

const GREST = "https://www.bmf.gv.at/themen/steuern/immobilien-grundstuecke/grunderwerbsteuer/steuersatz.html";
const GB = "https://www.oesterreich.gv.at/de/themen/bauen_und_wohnen/grundstueckskauf_und_grundbuch/grundbuch/1/Seite.600201";

export default definirCasos(grunderwerbsteuerRechner, [
  {
    nombre: "Kauf um 300.000 Euro mit Kredit über 200.000 Euro",
    origen: { tipo: "recalculado", url: GB, detalle: "Grunderwerbsteuer 3,5 % = 10.500; Eigentum 1,1 % = 3.300; Pfandrecht 1,2 % von 200.000 = 2.400; Eingabengebühr 85; zusammen 16.285." },
    fecha: "2026-10-14",
    entrada: { art: "kauf", wert: 300000, pfand: 200000 },
    esperado: { grest: 10500, eintragung: 3300, pfand: 2400, eingabe: 85, summe: 16285 },
  },
  {
    nombre: "Übertragung in der Familie, 500.000 Euro Grundstückswert",
    origen: { tipo: "recalculado", url: GREST, detalle: "Stufentarif: 0,5 % × 250.000 = 1.250; 2 % × 150.000 = 3.000; 3,5 % × 100.000 = 3.500; zusammen 7.750. Eintragung höchstens 1,1 % von 30 % = 1.650." },
    fecha: "2026-10-14",
    entrada: { art: "familie", wert: 500000, pfand: null },
    esperado: { grest: 7750, eintragung: 1650, summe: 9485 },
  },
  {
    nombre: "Kleine Schenkung unter 250.000 Euro",
    origen: { tipo: "recalculado", url: GREST, detalle: "Die ersten 250.000 Euro mit 0,5 %: 200.000 × 0,5 % = 1.000." },
    fecha: "2026-10-14",
    entrada: { art: "familie", wert: 200000, pfand: null },
    esperado: { grest: 1000 },
  },
]);
