import { definirTextos } from "@/motor/edicion";
import calculTva from "../../lu/calculadoras/calcul-tva";
import { COMUN } from "../lib/comun";

export default definirTextos(calculTva, {
  calculadora: "lu-de.calcul-tva",
  slug: "mehrwertsteuer-rechner",
  campos: {
    montant: { etiqueta: "Betrag in Euro" },
    sens: { etiqueta: "Was möchten Sie berechnen?", opciones: { "ajouter": "Mehrwertsteuer hinzurechnen (Nettobetrag)", "extraire": "Mehrwertsteuer herausrechnen (Bruttobetrag)" } },
    taux: { etiqueta: "Steuersatz", opciones: { "normal": "Normalsatz", "intermediaire": "Zwischensatz", "reduit": "Ermäßigter Satz", "super-reduit": "Stark ermäßigter Satz" } },
  },
  filas: {
    tva: { etiqueta: "Mehrwertsteuer" },
    ht: { etiqueta: "Betrag ohne Mehrwertsteuer" },
    ttc: { etiqueta: "Betrag mit Mehrwertsteuer" },
    taux: { etiqueta: "Steuersatz" },
  },
  ...COMUN,
});
