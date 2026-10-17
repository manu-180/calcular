import { definirCasos } from "@/motor/calculo";
import grunderwerbsteuerRechner from "./grunderwerbsteuer-rechner";

export default definirCasos(grunderwerbsteuerRechner, [
  {
    nombre: "Formel mit einem gesetzten Satz von 6,5 %",
    origen: { tipo: "recalculado", detalle: "400000 × 6,5 % = 26000. Satz über valores gesetzt, weil die Landessätze noch nicht in der Quelle geprüft sind." },
    fecha: "2026-10-14",
    entrada: { kaufpreis: 400000, bundesland: "nw" },
    valores: { "de.grunderwerbsteuer": { nw: 6.5 } },
    esperado: { satz: 6.5, steuer: 26000, gesamt: 426000 },
  },
]);
