import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tn.indemnite-fin-de-service",
  h1: "Indemnité de fin de service en Tunisie",
  title: "Indemnité de licenciement Tunisie : fin de service",
  description:
    "Calculez l'indemnité de fin de service due au salarié licencié en Tunisie selon son ancienneté et son salaire, dans la limite du plafond légal de trois mois.",
  intro: [
    "Le salarié en contrat à durée indéterminée licencié après la période d'essai a droit à une indemnité de fin de service, sauf faute grave. C'est le montant minimum prévu par l'article 22 du code du travail.",
    "Indiquez votre salaire mensuel, votre salaire journalier et vos dates d'embauche et de licenciement. Le calcul compte les mois complets passés dans l'entreprise.",
  ],
  comoSeCalcula: [
    "{{tn.indemnite-fin-de-service[jours-par-mois]}} jour de salaire par mois de travail effectif dans la même entreprise.",
    "Le salaire retenu est celui perçu au moment du licenciement, avec tous les avantages qui ne remboursent pas des frais.",
    "L'indemnité ne peut pas dépasser {{tn.indemnite-fin-de-service[plafond-mois]}} mois de salaire, quelle que soit l'ancienneté, sauf conditions plus favorables d'une convention collective ou du contrat.",
  ],
  faq: [
    {
      pregunta: "Comment calculer l'indemnité de licenciement en Tunisie ?",
      respuesta:
        "Comptez les mois de travail effectif et multipliez-les par {{tn.indemnite-fin-de-service[jours-par-mois]}} jour de salaire. Le résultat est plafonné à {{tn.indemnite-fin-de-service[plafond-mois]}} mois de salaire. Avec 1 500 dinars par mois et 60 dinars par jour, huit ans d'ancienneté donnent 96 × 60 = 5 760 dinars, ramenés au plafond de 4 500 dinars.",
    },
    {
      pregunta: "Qui n'a pas droit à l'indemnité de fin de service ?",
      respuesta:
        "Le salarié licencié pour faute grave, celui qui est encore en période d'essai et celui dont le contrat à durée déterminée arrive simplement à son terme. La démission n'y ouvre pas droit non plus.",
    },
    {
      pregunta: "L'indemnité de fin de service s'ajoute-t-elle aux dommages et intérêts pour licenciement abusif ?",
      respuesta:
        "Oui. En cas de licenciement abusif, le juge peut accorder des dommages et intérêts en plus de l'indemnité de fin de service et de l'indemnité de préavis non respecté.",
    },
  ],
  glosario: [
    { termino: "Indemnité de fin de service", definicion: "Somme due au salarié en contrat à durée indéterminée licencié sans faute grave après la période d'essai." },
    { termino: "Faute grave", definicion: "Manquement qui rend impossible le maintien de la relation de travail et prive de l'indemnité." },
    { termino: "Travail effectif", definicion: "Période réellement travaillée dans l'entreprise, ou absence assimilée par la loi." },
  ],
});
