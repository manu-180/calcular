import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ci.calcul-cotisations-cnps",
  h1: "Calcul des cotisations CNPS",
  title: "Calcul cotisations CNPS Côte d'Ivoire : salarié et employeur",
  description:
    "Calculez les cotisations CNPS d'un salaire : retraite, prestations familiales, maternité et accidents du travail, avec les plafonds en vigueur.",
  intro: [
    "Chaque mois, l'employeur verse à la Caisse nationale de prévoyance sociale (CNPS) la part du salarié et sa propre part. Le salarié ne paie que la retraite.",
    "Indiquez le salaire brut et le taux accidents du travail de l'entreprise. Vous voyez la retenue sur le bulletin et ce que paie l'employeur.",
  ],
  comoSeCalcula: [
    "Retraite : {{ci.cnps-taux[retraite-salarie]}} pour le salarié et {{ci.cnps-taux[retraite-employeur]}} pour l'employeur, sur le salaire limité à {{ci.cnps-plafond-retraite-smig}} fois le SMIG ({{ci.smig}}).",
    "Prestations familiales ({{ci.cnps-taux[prestations-familiales]}}) et assurance maternité ({{ci.cnps-taux[maternite]}}) : à la charge de l'employeur, sur le salaire limité à {{ci.cnps-plafond-prestations}} par mois.",
    "Accidents du travail : de {{ci.cnps-accident-travail[minimum]}} à {{ci.cnps-accident-travail[maximum]}} selon le secteur, sur la même base de {{ci.cnps-plafond-prestations}}.",
  ],
  ejemplo: [
    "Pour 300 000 F bruts et un taux accidents du travail de 2 % : le salarié cotise 18 900 F pour sa retraite. L'employeur paie 23 100 F de retraite, 3 500 F de prestations familiales, 525 F de maternité et 1 400 F d'accidents du travail.",
  ],
  faq: [
    {
      pregunta: "Le salarié paie-t-il les prestations familiales ?",
      respuesta:
        "Non. Les prestations familiales, l'assurance maternité et les accidents du travail sont à la charge exclusive de l'employeur. Le salarié ne cotise que pour la retraite.",
    },
    {
      pregunta: "Sur quoi sont calculées les cotisations ?",
      respuesta:
        "Sur l'ensemble du salaire, avantages en nature et indemnités compris, sauf les remboursements de frais. La base ne peut pas être inférieure au SMIG. Certaines primes (panier, salissure, outillage, transport) sont exclues dans des limites fixées par la CNPS.",
    },
    {
      pregunta: "Quand l'employeur paie-t-il la CNPS ?",
      respuesta:
        "Chaque mois s'il emploie 20 salariés ou plus, chaque trimestre sinon. Le versement se fait dans les 15 jours qui suivent la période, en ligne sur le portail e-CNPS.",
    },
  ],
  glosario: [
    {
      termino: "CNPS",
      definicion: "Caisse nationale de prévoyance sociale. Elle gère la retraite, les prestations familiales, la maternité et les accidents du travail des salariés du privé.",
    },
    { termino: "Plafond", definicion: "Montant de salaire au-delà duquel on ne cotise plus pour une branche." },
  ],
});
