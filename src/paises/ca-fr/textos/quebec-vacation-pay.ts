import { definirTextos } from "@/motor/edicion";
import vacances from "../../ca/calculadoras/quebec-vacation-pay";

export default definirTextos(vacances, {
  calculadora: "ca-fr.quebec-vacation-pay",
  slug: "calcul-indemnite-de-vacances",
  campos: {
    salario: { etiqueta: "Salaire brut gagné pendant l'année de référence" },
    anios: { etiqueta: "Années de service continu à la fin de l'année de référence" },
  },
  filas: {
    pago: { etiqueta: "Indemnité de vacances" },
    tasa: { etiqueta: "Taux de l'indemnité" },
    semanas: { etiqueta: "Semaines de vacances" },
  },
  mensajes: {
    "Enter the wages you earned in the reference year.": "Inscrivez le salaire gagné pendant l'année de référence.",
    "With less than one year of service, the leave is one day for each full month of service, up to two weeks.":
      "Avec moins d'un an de service, le congé est d'un jour par mois complet de service, jusqu'à deux semaines.",
  },
});
