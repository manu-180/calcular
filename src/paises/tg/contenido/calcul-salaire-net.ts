import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tg.calcul-salaire-net",
  h1: "Calcul du salaire net au Togo",
  title: "Calcul salaire net Togo : du brut au net",
  description:
    "Passez du salaire brut au net au Togo : CNSS de {{tg.cnss-taux[pension-salarie]}}, AMU de {{tg.amu-taux[salarie]}} et IRPP avec la réduction pour personnes à charge.",
  intro: [
    "Le salaire net est ce qui reste du brut après la cotisation retraite à la CNSS, la cotisation à l'assurance maladie universelle (AMU) et l'impôt sur le revenu (IRPP) retenu par l'employeur.",
    "Indiquez votre brut du mois et le nombre de personnes à votre charge. Vous obtenez le net à payer et le détail de chaque retenue.",
  ],
  comoSeCalcula: [
    "La CNSS retient {{tg.cnss-taux[pension-salarie]}} pour la pension de vieillesse et l'AMU {{tg.amu-taux[salarie]}}, sur toute la rémunération, sans plafond.",
    "Pour l'IRPP, on part du brut de l'année moins ces cotisations, on retire la déduction forfaitaire de {{tg.irpp-abattement}} puis {{tg.irpp-charge-famille}} par personne à charge et par mois.",
    "Le barème annuel s'applique au revenu obtenu, arrondi au millier inférieur. L'impôt de l'année divisé par 12 donne la retenue du mois.",
  ],
  ejemplo: [
    "Avec 200 000 F bruts par mois, sans personne à charge : 8 000 F de CNSS, 10 000 F d'AMU et 1 680 F d'IRPP. Le net est de 180 320 F.",
  ],
  faq: [
    {
      pregunta: "Les cotisations sociales réduisent-elles l'IRPP ?",
      respuesta:
        "Oui. Le Code général des impôts déduit du brut la retenue pour la retraite, dans la limite de {{tg.irpp-retraite-plafond}} du brut, et les cotisations d'assurance maladie obligatoires, avant la déduction forfaitaire.",
    },
    {
      pregunta: "Qui compte comme personne à charge ?",
      respuesta:
        "Le conjoint sans ressources, les enfants de moins de 21 ans ou infirmes, ceux de moins de 25 ans qui étudient ou sont en apprentissage, et les parents invalides qui vivent sous votre toit. On en retient {{tg.irpp-charges-max}} au plus.",
    },
    {
      pregunta: "Que se passe-t-il si mon salaire est inférieur au SMIG ?",
      respuesta:
        "La CNSS calcule les cotisations sur au moins le SMIG, soit {{tg.smig}} par mois. Le calcul l'applique et vous le signale.",
    },
  ],
  glosario: [
    { termino: "AMU", definicion: "Assurance maladie universelle, gérée par la CNSS pour les salariés du privé." },
    { termino: "Net à payer", definicion: "La somme versée au salarié une fois toutes les retenues faites." },
  ],
});
