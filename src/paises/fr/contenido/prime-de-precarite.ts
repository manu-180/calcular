import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "fr.prime-de-precarite",
  h1: "Prime de précarité : calcul de l'indemnité de fin de CDD",
  title: "Prime de précarité : calcul de l'indemnité de fin de CDD",
  description:
    "Calculez votre indemnité de fin de CDD ({{fr.cdd-indemnite-fin}} de la rémunération brute) et l'indemnité de congés payés versées à la fin du contrat.",
  intro: [
    "À la fin d'un CDD, le salarié reçoit en principe une indemnité de fin de contrat, souvent appelée prime de précarité. Elle compense l'absence d'emploi stable.",
    "Elle est égale à au moins {{fr.cdd-indemnite-fin}} de la rémunération brute totale versée pendant le contrat. Une convention collective peut la ramener à {{fr.cdd-indemnite-fin-reduite}} en échange d'un accès à la formation.",
  ],
  comoSeCalcula: [
    "Additionnez tous les salaires bruts perçus pendant le CDD (primes comprises).",
    "Prime de précarité : ce total × {{fr.cdd-indemnite-fin}} (ou {{fr.cdd-indemnite-fin-reduite}} si votre convention le prévoit).",
    "Congés payés non pris : une indemnité compensatrice d'au moins {{fr.cdd-conges}} de la rémunération brute totale s'ajoute.",
  ],
  ejemplo: ["Un CDD de 6 mois payé 2 000 € brut par mois donne 12 000 € de rémunération. La prime de précarité est de 1 200 € brut."],
  faq: [
    {
      pregunta: "Quand la prime de précarité n'est-elle pas versée ?",
      respuesta:
        "Notamment pour un CDD saisonnier, un contrat d'usage, un contrat aidé, un contrat conclu avec un jeune pendant ses vacances, ou si le CDD se poursuit par un CDI. Elle n'est pas due non plus si vous refusez un CDI pour un poste équivalent.",
    },
    {
      pregunta: "Quand est-elle versée ?",
      respuesta: "À la fin du contrat, avec le dernier salaire. Son montant figure sur le bulletin de paie.",
    },
    {
      pregunta: "La prime de précarité est-elle imposable ?",
      respuesta: "Oui. C'est un élément de salaire soumis aux cotisations sociales et à l'impôt sur le revenu.",
    },
  ],
  glosario: [
    { termino: "CDD", definicion: "Contrat à durée déterminée, conclu pour une durée ou une mission précise." },
    { termino: "Prime de précarité", definicion: "Nom courant de l'indemnité de fin de contrat d'un CDD." },
  ],
});
