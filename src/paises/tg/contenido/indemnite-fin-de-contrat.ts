import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tg.indemnite-fin-de-contrat",
  h1: "Indemnité de fin de CDD au Togo",
  title: "Indemnité de fin de contrat Togo : CDD de 4 ans",
  description:
    "Savoir si la fin de votre CDD au Togo ouvre droit à l'indemnité de fin de contrat : {{tg.fin-de-contrat-mois}} du dernier salaire brut après {{tg.fin-de-contrat-duree}} consécutifs.",
  intro: [
    "Quand un CDD a duré quatre ans consécutifs et que la relation de travail ne continue pas en CDI, le Code du travail prévoit une indemnité de fin de contrat.",
    "Indiquez la durée du contrat, le dernier salaire et la façon dont il se termine pour savoir si l'indemnité est due et son montant.",
  ],
  comoSeCalcula: [
    "Le CDD doit avoir duré au moins {{tg.fin-de-contrat-duree}} consécutifs.",
    "L'indemnité est égale à {{tg.fin-de-contrat-mois}} de salaire, sur la base du dernier salaire brut, et se paie avec le dernier salaire.",
    "Elle n'est pas due si le salarié est embauché en CDI, s'il refuse un CDI pour un emploi similaire au moins aussi bien payé, ou si le contrat prend fin pour motif économique.",
  ],
  ejemplo: ["Un salarié en CDD depuis quatre ans à 250 000 F bruts, non embauché en CDI, reçoit 250 000 F."],
  faq: [
    {
      pregunta: "Le contrat de projet donne-t-il droit à la même indemnité ?",
      respuesta: "Oui. À la fin d'un contrat de projet d'au moins quatre ans consécutifs, le travailleur reçoit aussi un mois de salaire brut.",
    },
    {
      pregunta: "Quand l'indemnité est-elle payée ?",
      respuesta: "Lors du règlement du dernier salaire, selon l'article 54 du Code du travail.",
    },
    {
      pregunta: "Les congés non pris s'ajoutent-ils ?",
      respuesta: "Oui. L'indemnité compensatrice de congés payés est distincte : elle est due pour les droits acquis et non pris.",
    },
  ],
  glosario: [
    { termino: "CDD", definicion: "Contrat de travail à durée déterminée." },
    { termino: "CDI", definicion: "Contrat de travail à durée indéterminée." },
  ],
});
