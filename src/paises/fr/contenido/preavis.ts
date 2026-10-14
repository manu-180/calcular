import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "fr.preavis",
  h1: "Préavis de licenciement : durée et indemnité",
  title: "Préavis de licenciement : durée légale et calcul de la fin",
  description:
    "Quelle est la durée de votre préavis de licenciement ? Calculez-la selon votre ancienneté, la date de fin et l'indemnité compensatrice si vous ne l'effectuez pas.",
  intro: [
    "Le préavis est la période entre la notification du licenciement et la fin effective du contrat. Le salarié continue de travailler et d'être payé pendant cette période.",
    "Sa durée légale dépend de l'ancienneté. Une convention collective, le contrat ou les usages peuvent prévoir une durée plus longue, plus favorable au salarié.",
  ],
  comoSeCalcula: [
    "Moins de 6 mois d'ancienneté : la durée est fixée par la convention collective ou les usages.",
    "De 6 mois à 2 ans : {{fr.preavis-moins-2-ans}}.",
    "À partir de 2 ans : {{fr.preavis-2-ans}}.",
    "Travailleur handicapé : la durée est doublée, dans la limite de {{fr.preavis-handicap-max}}.",
    "Le préavis commence le jour de la première présentation de la lettre de licenciement.",
  ],
  ejemplo: [
    "Un salarié avec 3 ans d'ancienneté reçoit sa lettre le 31 décembre 2026. Son préavis de 2 mois se termine le 28 février 2027.",
    "Si l'employeur le dispense de préavis avec un salaire de 2 400 €, il reçoit une indemnité compensatrice de 4 800 €.",
  ],
  faq: [
    {
      pregunta: "L'employeur peut-il me dispenser de préavis ?",
      respuesta:
        "Oui, et vous ne pouvez pas refuser. Il doit alors vous verser une indemnité compensatrice égale au salaire que vous auriez perçu pendant le préavis.",
    },
    {
      pregunta: "Puis-je demander à ne pas faire mon préavis ?",
      respuesta:
        "Oui, mais l'employeur peut refuser. S'il accepte, il n'est pas obligé de vous verser l'indemnité compensatrice.",
    },
    {
      pregunta: "Y a-t-il un préavis en cas de faute grave ?",
      respuesta: "Non. Un licenciement pour faute grave ou lourde se fait sans préavis ni indemnité compensatrice.",
    },
  ],
  glosario: [
    { termino: "Préavis", definicion: "Délai entre la notification de la rupture du contrat et la fin du contrat." },
    { termino: "Indemnité compensatrice de préavis", definicion: "Salaire versé quand l'employeur dispense le salarié d'effectuer son préavis." },
  ],
});
