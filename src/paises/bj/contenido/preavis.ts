import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bj.preavis",
  h1: "Préavis de licenciement ou de démission au Bénin ({{anio}})",
  title: "Préavis {{anio}} au Bénin : durée et indemnité",
  description:
    "Trouvez la durée du préavis au Bénin selon votre catégorie, de {{bj.preavis-duree[horaire]}} à {{bj.preavis-duree[cadre]}}, et l'indemnité due si le préavis n'a pas été respecté.",
  intro: [
    "Le préavis va de {{bj.preavis-duree[horaire]}} à {{bj.preavis-duree[cadre]}}. Celui qui rompt un contrat à durée indéterminée doit prévenir l'autre partie avant la fin de la relation de travail. La durée de ce préavis dépend de la catégorie du travailleur.",
    "Choisissez la catégorie, indiquez la rémunération mensuelle et les jours de préavis déjà respectés. Le calcul donne le préavis légal et l'indemnité à verser pour la part manquante.",
  ],
  comoSeCalcula: [
    "Le Code du travail fixe le préavis à {{bj.preavis-duree[horaire]}} pour les travailleurs payés à l'heure, à un mois pour les employés, ouvriers et manœuvres, et à trois mois pour les agents de maîtrise, cadres et assimilés (article 53). Le calcul compte un mois pour {{bj.preavis-duree[employe]}}.",
    "Pendant le préavis, le travailleur dispose de {{bj.preavis-jours-liberte}} de liberté par semaine pour chercher un emploi, payés à plein salaire (article 54).",
    "Si le contrat est rompu sans préavis, la partie responsable verse à l'autre une indemnité égale à la rémunération et aux avantages que le travailleur aurait perçus pendant le préavis non respecté (article 55).",
  ],
  ejemplo: [
    "Un employé à 200 000 F par mois est licencié sans préavis. Le préavis légal est d'un mois, soit 30 jours : l'employeur lui doit 200 000 F. Pour un cadre à 600 000 F qui a travaillé 60 jours d'un préavis de 90 jours, il manque 30 jours : l'indemnité est de 600 000 F.",
  ],
  faq: [
    {
      pregunta: "Quelle est la durée du préavis au Bénin ?",
      respuesta: "L'article 53 du Code du travail prévoit {{bj.preavis-duree[horaire]}} pour les travailleurs payés à l'heure, un mois pour les employés et ouvriers, trois mois pour les cadres et agents de maîtrise.",
    },
    {
      pregunta: "Peut-on quitter avant la fin du préavis si l'on a trouvé un emploi ?",
      respuesta: "Oui en cas de licenciement : l'article 54 permet au travailleur qui a trouvé un nouvel emploi de partir après en avoir avisé son employeur, sans indemnité pour inobservation du délai.",
    },
    {
      pregunta: "Le préavis est-il dû en cas de faute lourde ?",
      respuesta: "L'article 55 permet la rupture sans préavis en cas de faute lourde, sous réserve de l'appréciation de la juridiction compétente.",
    },
  ],
  glosario: [
    { termino: "Préavis", definicion: "Le délai à respecter entre l'annonce de la rupture et la fin du contrat." },
    { termino: "Indemnité compensatrice", definicion: "La somme versée à l'autre partie quand le préavis n'est pas respecté." },
    { termino: "Faute lourde", definicion: "Une faute grave d'ordre professionnel qui autorise la rupture sans préavis." },
  ],
});
