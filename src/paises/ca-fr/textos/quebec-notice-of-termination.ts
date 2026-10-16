import { definirTextos } from "@/motor/edicion";
import preavis from "../../ca/calculadoras/quebec-notice-of-termination";

export default definirTextos(preavis, {
  calculadora: "ca-fr.quebec-notice-of-termination",
  slug: "calcul-preavis-fin-emploi",
  campos: {
    meses: { etiqueta: "Mois de service continu" },
    semanal: { etiqueta: "Salaire hebdomadaire habituel" },
  },
  filas: {
    semanas: { etiqueta: "Préavis que l'employeur doit donner" },
    indemnizacion: { etiqueta: "Indemnité compensatrice si aucun préavis n'est donné" },
  },
  mensajes: {
    "Enter your weekly wage.": "Inscrivez votre salaire hebdomadaire.",
    "With less than three months of continuous service, the Act does not require notice.":
      "Avec moins de trois mois de service continu, la loi n'exige pas de préavis.",
  },
});
