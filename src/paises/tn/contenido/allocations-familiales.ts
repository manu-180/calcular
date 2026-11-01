import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tn.allocations-familiales",
  h1: "Allocations familiales CNSS en Tunisie",
  title: "Allocations familiales CNSS Tunisie : montant par enfant",
  description:
    "Calculez le montant des allocations familiales versées par la CNSS en Tunisie pour vos trois premiers enfants à charge, par trimestre, par mois et par an.",
  intro: [
    "Le salarié affilié à la CNSS perçoit des allocations familiales pour ses trois premiers enfants à charge, qu'ils soient nés de lui, adoptés ou recueillis.",
    "Indiquez le nombre d'enfants à charge et votre salaire. Vous obtenez le montant par enfant et le total, par trimestre comme le verse la CNSS.",
  ],
  comoSeCalcula: [
    "L'allocation est un pourcentage du revenu du trimestre, retenu au plus à {{tn.allocations-familiales-plafond}} : {{tn.allocations-familiales-taux[enfant-1]}} pour le premier enfant, {{tn.allocations-familiales-taux[enfant-2]}} pour le deuxième et {{tn.allocations-familiales-taux[enfant-3]}} pour le troisième.",
    "Au delà du troisième enfant, aucune allocation supplémentaire n'est versée.",
    "Le paiement se fait par mandat postal, quinze jours après le dépôt du dossier complet.",
  ],
  faq: [
    {
      pregunta: "Quel est le montant des allocations familiales en Tunisie ?",
      respuesta:
        "Au plus 21,960 dinars par trimestre pour le premier enfant, 19,520 pour le deuxième et 17,080 pour le troisième, soit 58,560 dinars par trimestre pour trois enfants.",
    },
    {
      pregunta: "Jusqu'à quel âge l'enfant ouvre-t-il droit aux allocations ?",
      respuesta:
        "Jusqu'à 16 ans sans condition, 18 ans pour un apprenti peu rémunéré, 21 ans pour un enfant qui poursuit ses études secondaires ou supérieures sans travailler, et sans limite d'âge pour un enfant handicapé ou atteint d'une maladie incurable.",
    },
    {
      pregunta: "Garde-t-on les allocations en arrêt maladie ou à la retraite ?",
      respuesta:
        "Oui. Le droit est maintenu pendant un congé de maladie ou de maternité indemnisé, pour les titulaires d'une pension de vieillesse, d'invalidité ou de survivant, et pendant un an pour le salarié licencié pour motif économique.",
    },
  ],
  glosario: [
    { termino: "CNSS", definicion: "Caisse nationale de sécurité sociale, qui verse les allocations aux salariés du secteur privé." },
    { termino: "Enfant à charge", definicion: "Enfant que l'assuré entretient et qui remplit les conditions d'âge ou de santé." },
  ],
});
