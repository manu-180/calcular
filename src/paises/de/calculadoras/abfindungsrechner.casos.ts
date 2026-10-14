import { definirCasos } from "@/motor/calculo";
import abfindungsrechner from "./abfindungsrechner";

const KSCHG = "https://www.gesetze-im-internet.de/kschg/__1a.html";
const ESTG34 = "https://www.gesetze-im-internet.de/estg/__34.html";

export default definirCasos(abfindungsrechner, [
  {
    nombre: "Zehn Jahre, 4000 Euro, mit Fünftelregelung",
    origen: {
      tipo: "recalculado",
      url: ESTG34,
      detalle: "0,5 × 4000 × 10 = 20000. zvE 50000: ESt(70000) − ESt(50000) = 18264 − 10548 = 7716. Fünftel: 5 × (ESt(54000) − ESt(50000)) = 5 × (11980 − 10548) = 7160. Ersparnis 556.",
    },
    fecha: "2026-10-14",
    entrada: { monatsverdienst: 4000, jahre: 10, monate: 3, zvE: 50000, veranlagung: "einzeln" },
    esperado: { jahre: 10, abfindung: 20000, steuerNormal: 7716, steuerFuenftel: 7160, ersparnis: 556, netto: 12840 },
  },
  {
    nombre: "Mehr als sechs Monate werden aufgerundet",
    origen: { tipo: "recalculado", url: KSCHG, detalle: "10 Jahre und 7 Monate zählen als 11 Jahre (§ 1a Absatz 2 KSchG): 0,5 × 3000 × 11 = 16500." },
    fecha: "2026-10-14",
    entrada: { monatsverdienst: 3000, jahre: 10, monate: 7, zvE: null, veranlagung: "einzeln" },
    esperado: { jahre: 11, abfindung: 16500, steuerFuenftel: null },
  },
  {
    nombre: "Zusammenveranlagung mit 80.000 Euro",
    origen: { tipo: "recalculado", url: ESTG34, detalle: "Abfindung 50000 (0,5 × 5000 × 20). Splitting: normal 17992; Fünftel 5 × (ESt(90000) − ESt(80000)) = 16260." },
    fecha: "2026-10-14",
    entrada: { monatsverdienst: 5000, jahre: 20, monate: 0, zvE: 80000, veranlagung: "zusammen" },
    esperado: { abfindung: 50000, steuerNormal: 17992, steuerFuenftel: 16260, ersparnis: 1732 },
  },
]);
