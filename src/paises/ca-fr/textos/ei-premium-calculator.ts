import { definirTextos } from "@/motor/edicion";
import eiPremium from "../../ca/calculadoras/ei-premium-calculator";
import { MENSAJES_COMUNES } from "../lib/comun";

export default definirTextos(eiPremium, {
  calculadora: "ca-fr.ei-premium-calculator",
  slug: "calcul-cotisations-assurance-emploi",
  campos: {
    ingreso: { etiqueta: "Rémunération assurable pour 2026" },
    lugar: { etiqueta: "Où vous travaillez", opciones: { canada: "Hors Québec", qc: "Au Québec" }, porDefecto: "qc" },
  },
  filas: {
    empleado: { etiqueta: "Vos cotisations d'assurance-emploi pour 2026" },
    empleador: { etiqueta: "Cotisations de l'employeur" },
    total: { etiqueta: "Total des cotisations" },
    asegurable: { etiqueta: "Rémunération qui compte pour l'AE" },
    tasa: { etiqueta: "Votre taux de cotisation" },
    maximo: { etiqueta: "Cotisation annuelle maximale à ce taux" },
  },
  mensajes: {
    ...MENSAJES_COMUNES,
    "Your earnings are above the maximum insurable earnings, so you pay the yearly maximum.":
      "Votre rémunération dépasse le maximum de la rémunération assurable : vous payez donc la cotisation annuelle maximale.",
  },
});
