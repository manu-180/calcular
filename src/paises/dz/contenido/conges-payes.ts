import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "dz.conges-payes",
  h1: "Calcul des congés payés en Algérie",
  title: "Congés payés Algérie : {{dz.conges[par-mois]}} par mois de travail",
  description:
    "Calculez vos jours de congé annuel en Algérie : {{dz.conges[par-mois]}} par mois de travail, jusqu'à {{dz.conges[plafond]}}, plus le congé supplémentaire du Sud.",
  intro: [
    "Tout travailleur a droit à un congé annuel payé par l'employeur, et il ne peut pas y renoncer. La loi n° 90-11 en fixe la durée selon le travail effectué pendant la période de référence.",
    "Indiquez le nombre de mois travaillés entre le 1er juillet de l'année précédente et le 30 juin. Cochez la case si vous travaillez dans une région du Sud.",
  ],
  comoSeCalcula: [
    "Congé principal : {{dz.conges[par-mois]}} par mois de travail (article 41).",
    "Plafond : {{dz.conges[plafond]}} calendaires par année de travail.",
    "Régions du Sud : congé supplémentaire d'au moins {{dz.conges[sud]}} par année de travail (article 42).",
    "Vingt-quatre jours ouvrables ou quatre semaines de travail valent un mois. Pour un nouvel embauché, plus de quinze jours ouvrables valent un mois.",
  ],
  faq: [
    {
      pregunta: "Combien de jours de congé par an en Algérie ?",
      respuesta: "{{dz.conges[plafond]}} calendaires pour une année complète, à raison de {{dz.conges[par-mois]}} par mois de travail.",
    },
    {
      pregunta: "Quelle est la période de référence ?",
      respuesta:
        "Elle va du 1er juillet de l'année précédente au 30 juin de l'année du congé (article 40). Pour un travailleur nouvellement recruté, elle commence à la date de recrutement.",
    },
    {
      pregunta: "Peut-on renoncer à son congé contre de l'argent ?",
      respuesta: "Non. L'article 39 de la loi n° 90-11 déclare nulle toute renonciation, totale ou partielle, au congé annuel.",
    },
  ],
  glosario: [
    { termino: "Période de référence", definicion: "Période de travail qui ouvre droit au congé, du 1er juillet au 30 juin." },
    { termino: "Jours calendaires", definicion: "Tous les jours du calendrier, jours de repos compris." },
  ],
});
