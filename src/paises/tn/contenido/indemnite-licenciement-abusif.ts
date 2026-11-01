import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tn.indemnite-licenciement-abusif",
  h1: "Indemnité pour licenciement abusif en Tunisie",
  title: "Licenciement abusif Tunisie : calcul des indemnités",
  description:
    "Estimez les dommages et intérêts pour licenciement abusif en Tunisie : un à deux mois de salaire par année d'ancienneté, au plus trois ans de salaire.",
  intro: [
    "Un licenciement est abusif lorsqu'il intervient sans motif réel et sérieux ou sans respecter la procédure prévue par la loi, le règlement ou le contrat. Le salarié peut alors saisir le conseil de prud'hommes dans l'année qui suit la rupture.",
    "Indiquez votre salaire, vos dates d'embauche et de licenciement, et la situation. Vous obtenez la fourchette prévue par le code du travail.",
  ],
  comoSeCalcula: [
    "Sans motif réel et sérieux : de {{tn.licenciement-abusif[mois-par-an-min]}} à {{tn.licenciement-abusif[mois-par-an-max]}} mois de salaire par année d'ancienneté, sans dépasser {{tn.licenciement-abusif[plafond-mois]}} mois de salaire.",
    "Motif réel et sérieux mais procédure non respectée : de {{tn.licenciement-abusif[procedure-min]}} à {{tn.licenciement-abusif[procedure-max]}} mois de salaire, selon la nature de la procédure et son effet sur les droits du salarié.",
    "Le salaire retenu est celui du moment de la rupture, avec tous les avantages qui ne remboursent pas des frais.",
  ],
  faq: [
    {
      pregunta: "Combien touche un salarié licencié abusivement en Tunisie ?",
      respuesta:
        "Le juge accorde entre {{tn.licenciement-abusif[mois-par-an-min]}} et {{tn.licenciement-abusif[mois-par-an-max]}} mois de salaire par année d'ancienneté, au plus trois ans de salaire. Il tient compte de la qualification, de l'ancienneté, de l'âge, du salaire, de la situation de famille et de l'effet du licenciement sur la retraite.",
    },
    {
      pregunta: "Ces dommages et intérêts remplacent-ils l'indemnité de fin de service ?",
      respuesta:
        "Non. Ils s'ajoutent à l'indemnité de fin de service et à l'indemnité pour préavis non respecté. On ne peut pas y renoncer à l'avance.",
    },
    {
      pregunta: "Dans quel délai faut-il agir ?",
      respuesta:
        "L'action pour rupture abusive du contrat doit être déposée au greffe du conseil de prud'hommes dans l'année qui suit la rupture, sinon elle est prescrite.",
    },
    {
      pregunta: "Et pour un contrat à durée déterminée ?",
      respuesta:
        "La rupture abusive d'un contrat à durée déterminée par l'employeur ouvre droit au salaire de la période restant à courir jusqu'au terme du contrat.",
    },
  ],
  glosario: [
    { termino: "Licenciement abusif", definicion: "Licenciement sans motif réel et sérieux ou sans respect de la procédure." },
    { termino: "Conseil de prud'hommes", definicion: "Juridiction qui tranche les litiges individuels du travail." },
    { termino: "Motif réel et sérieux", definicion: "Raison objective et suffisamment grave pour justifier la rupture du contrat." },
  ],
});
