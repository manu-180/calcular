import { definirTextos } from "@/motor/edicion";
import kinderzulagenRechner from "../../ch/calculadoras/kinderzulagen-rechner";
import { COMUN } from "../lib/comun";

export default definirTextos(kinderzulagenRechner, {
  calculadora: "ch-fr.kinderzulagen-rechner",
  slug: "allocations-familiales",
  campos: {
    kinder: { etiqueta: "Enfants jusqu'à 16 ans" },
    inAusbildung: { etiqueta: "Enfants en formation (de 15 à 25 ans)" },
    kantonKinder: { etiqueta: "Allocation pour enfant dans votre canton (si plus élevée)", ayuda: "Laissez vide : le minimum légal s'applique." },
    kantonAusbildung: { etiqueta: "Allocation de formation professionnelle dans votre canton (si plus élevée)" },
  },
  filas: {
    monat: { etiqueta: "Allocations familiales par mois" },
    jahr: { etiqueta: "Par an" },
    kinderzulage: { etiqueta: "Allocation pour enfant par enfant" },
    ausbildungszulage: { etiqueta: "Allocation de formation par enfant" },
  },
  ...COMUN,
});
