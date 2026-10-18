import { definirTextos } from "@/motor/edicion";
import calculInflation from "../../lu/calculadoras/calcul-inflation";
import { COMUN } from "../lib/comun";

export default definirTextos(calculInflation, {
  calculadora: "lu-de.calcul-inflation",
  slug: "inflationsrechner",
  campos: {
    montant: { etiqueta: "Betrag in Euro" },
    de: { etiqueta: "Monat des ursprünglichen Betrags", ayuda: "Es zählt der Index dieses Monats, der Tag spielt keine Rolle." },
    a: { etiqueta: "Monat, in den umgerechnet wird" },
  },
  filas: {
    ajuste: { etiqueta: "Betrag mit gleicher Kaufkraft" },
    difference: { etiqueta: "Unterschied durch die Inflation" },
    total: { etiqueta: "Inflation im Zeitraum" },
    annuelle: { etiqueta: "Inflation über ein Jahr im Endmonat" },
    moisDepart: { etiqueta: "Ausgangsmonat" },
    indiceDepart: { etiqueta: "IPCN des Ausgangsmonats" },
    moisFin: { etiqueta: "Endmonat" },
    indiceFin: { etiqueta: "IPCN des Endmonats" },
  },
  ...COMUN,
});
