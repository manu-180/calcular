import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bj.indemnite-licenciement-abusif",
  h1: "Indemnité de licenciement abusif au Bénin ({{anio}})",
  title: "Licenciement abusif {{anio}} au Bénin : indemnité de 3 à 9 mois",
  description:
    "Estimez la réparation d'un licenciement abusif au Bénin : de {{bj.licenciement-abusif-mois[minimum]}} à {{bj.licenciement-abusif-mois[maximum]}} de salaire brut, ou {{bj.licenciement-irregulier-mois}} au plus pour un licenciement irrégulier.",
  intro: [
    "Un employeur ne peut licencier que pour un motif légitime, notifié par écrit, et après avoir permis au travailleur de s'expliquer. Sinon, le juge du travail peut accorder une réparation encadrée par la loi de 2017.",
    "Indiquez le salaire brut moyen des douze derniers mois et la situation. Le calcul donne la fourchette que la loi prévoit.",
  ],
  comoSeCalcula: [
    "Un licenciement abusif donne lieu à réparation. Son montant ne peut être inférieur à {{bj.licenciement-abusif-mois[minimum]}} de salaire brut ni supérieur à {{bj.licenciement-abusif-mois[maximum]}} (loi n° 2017-05, article 30).",
    "Le salaire retenu est le salaire mensuel brut moyen des douze derniers mois d'activité (article 31).",
    "Si le motif est légitime mais que les formalités n'ont pas été respectées, le licenciement est irrégulier et non abusif. L'indemnité ne peut alors dépasser {{bj.licenciement-irregulier-mois}} de salaire brut, et elle n'est due qu'à partir de {{bj.licenciement-irregulier-anciennete}} de travail effectif (article 29).",
    "Le juge fixe le montant exact selon le préjudice. Cette réparation ne se confond ni avec l'indemnité de préavis ni avec l'indemnité de licenciement.",
  ],
  ejemplo: [
    "Un salarié dont le salaire brut moyen est de 250 000 F est licencié sans motif légitime. La réparation se situe entre 750 000 F (3 mois) et 2 250 000 F (9 mois). Si le motif était légitime mais que la procédure a été bâclée, l'indemnité ne dépasse pas 500 000 F (2 mois).",
  ],
  faq: [
    {
      pregunta: "Quelle indemnité pour un licenciement abusif au Bénin ?",
      respuesta: "L'article 30 de la loi n° 2017-05 du 29 août 2017 fixe une réparation d'au moins {{bj.licenciement-abusif-mois[minimum]}} et d'au plus {{bj.licenciement-abusif-mois[maximum]}} de salaire brut.",
    },
    {
      pregunta: "Qui doit prouver le motif du licenciement ?",
      respuesta: "En cas de contestation, la preuve de l'existence du motif légitime incombe à l'employeur (article 30).",
    },
    {
      pregunta: "Qu'est-ce qu'un licenciement irrégulier ?",
      respuesta: "C'est un licenciement pour motif légitime sans notification écrite, sans indication du motif ou sans que le travailleur ait pu s'expliquer. Il n'est pas abusif, mais l'article 29 prévoit une indemnité plafonnée à {{bj.licenciement-irregulier-mois}} de salaire brut.",
    },
  ],
  glosario: [
    { termino: "Licenciement abusif", definicion: "Un licenciement sans motif légitime, qui ouvre droit à réparation." },
    { termino: "Licenciement irrégulier", definicion: "Un licenciement fondé sur un motif légitime mais prononcé sans respecter les formalités." },
    { termino: "Préjudice", definicion: "Le dommage subi par le travailleur, que le juge apprécie pour fixer la réparation." },
  ],
});
