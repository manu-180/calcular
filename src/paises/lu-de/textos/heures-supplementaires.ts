import { definirTextos } from "@/motor/edicion";
import heuresSupplementaires from "../../lu/calculadoras/heures-supplementaires";
import { COMUN } from "../lib/comun";

export default definirTextos(heuresSupplementaires, {
  calculadora: "lu-de.heures-supplementaires",
  slug: "ueberstunden-rechner",
  campos: {
    brut: { etiqueta: "Monatlicher Bruttolohn" },
    heures: { etiqueta: "Anzahl Überstunden" },
  },
  filas: {
    paiement: { etiqueta: "Bezahlung der Stunden (mit Zuschlag)" },
    repos: { etiqueta: "Oder bezahlte Ausgleichsruhe" },
    horaire: { etiqueta: "Stundenlohn (Bruttomonatslohn / 173)" },
  },
  ...COMUN,
});
