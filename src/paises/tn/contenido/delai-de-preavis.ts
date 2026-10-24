import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tn.delai-de-preavis",
  h1: "Délai de préavis en Tunisie",
  title: "Préavis de licenciement ou démission Tunisie : calcul",
  description:
    "Calculez la fin de votre préavis en Tunisie : {{tn.preavis}} après la lettre recommandée, la date d'absence autorisée et l'indemnité de préavis non respecté.",
  intro: [
    "Le contrat de travail à durée indéterminée prend fin à l'expiration du préavis, que la rupture vienne de l'employeur ou du salarié. La partie qui rompt envoie une lettre recommandée à l'autre.",
    "Indiquez la date de réception de la lettre et votre salaire. Vous obtenez la date de fin du préavis et la date à partir de laquelle vous pouvez vous absenter pour chercher un emploi.",
  ],
  comoSeCalcula: [
    "Le préavis légal est de {{tn.preavis}} à compter de la lettre recommandée (article 14 bis du code du travail).",
    "Pendant toute la seconde moitié du préavis, le salarié peut s'absenter pour chercher un autre emploi. Ces absences comptent comme du travail effectif et ne réduisent ni le salaire ni les primes.",
    "L'article 23 du code prévoit une indemnité quand le préavis n'est pas respecté. Le calcul l'estime au salaire d'un préavis entier.",
  ],
  faq: [
    {
      pregunta: "Quelle est la durée du préavis en Tunisie ?",
      respuesta:
        "Le code du travail fixe {{tn.preavis}} pour un contrat à durée indéterminée, par lettre recommandée. Une convention collective, le contrat ou l'usage peuvent prévoir mieux pour le salarié.",
    },
    {
      pregunta: "Le préavis s'applique-t-il aussi à la démission ?",
      respuesta:
        "Oui. L'article 14 bis vise la rupture du contrat à durée indéterminée par l'une ou l'autre partie : le salarié qui démissionne prévient son employeur dans le même délai.",
    },
    {
      pregunta: "Peut-on quitter l'entreprise sans préavis ?",
      respuesta:
        "Sans préavis, le contrat peut prendre fin d'un commun accord, pour faute grave de l'autre partie, en cas de force majeure ou dans les autres cas prévus par la loi.",
    },
  ],
  glosario: [
    { termino: "Préavis", definicion: "Délai entre l'annonce de la rupture du contrat et la fin effective du travail." },
    { termino: "Lettre recommandée", definicion: "Envoi postal avec accusé de réception qui fait courir le préavis." },
    { termino: "Contrat à durée indéterminée", definicion: "Contrat sans date de fin, qui est la règle depuis la loi n° 2025-9." },
  ],
});
