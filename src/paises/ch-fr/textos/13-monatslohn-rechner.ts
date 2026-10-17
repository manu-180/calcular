import { definirTextos } from "@/motor/edicion";
import c13MonatslohnRechner from "../../ch/calculadoras/13-monatslohn-rechner";
import { COMUN } from "../lib/comun";

export default definirTextos(c13MonatslohnRechner, {
  calculadora: "ch-fr.13-monatslohn-rechner",
  slug: "13e-salaire",
  campos: {
    monatslohn: { etiqueta: "Salaire brut mensuel" },
    monate: { etiqueta: "Mois travaillés dans l'année civile", ayuda: "Saisissez un demi-mois comme 0,5." },
  },
  filas: {
    anteil: { etiqueta: "13e salaire (au prorata)" },
    proMonat: { etiqueta: "Part par mois travaillé" },
    jahreslohn: { etiqueta: "Salaire brut de ces mois, 13e salaire compris" },
  },
  ...COMUN,
});
