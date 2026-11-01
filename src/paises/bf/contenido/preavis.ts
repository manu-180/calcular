import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bf.preavis",
  h1: "Durée du préavis et indemnité compensatrice",
  title: "Préavis Burkina Faso : durée et indemnité",
  description:
    "Durée du préavis selon le code du travail de 2026 ({{bf.preavis-jours-horaire}} à {{bf.preavis-mois[cadre]}}) et indemnité compensatrice s'il n'est pas observé.",
  intro: [
    "La rupture d'un contrat à durée indéterminée passe par un préavis écrit, qu'elle vienne de l'employeur ou du travailleur.",
    "Indiquez votre catégorie et votre salaire. Vous obtenez la durée du préavis et l'indemnité due si elle n'est pas respectée.",
  ],
  comoSeCalcula: [
    "{{bf.preavis-jours-horaire}} pour le travailleur payé à l'heure ou à la journée.",
    "{{bf.preavis-mois[employe]}} pour les autres salariés, {{bf.preavis-mois[cadre]}} pour les cadres, agents de maîtrise, techniciens et assimilés.",
    "Si le préavis n'est pas observé, la partie qui rompt verse la rémunération et les avantages de la période non effectuée.",
  ],
  ejemplo: ["Un cadre payé 600 000 F par mois a droit à trois mois de préavis. S'il est dispensé sans être payé, l'indemnité est de 1 800 000 F."],
  faq: [
    {
      pregunta: "Puis-je chercher un emploi pendant le préavis ?",
      respuesta: "Oui. Le travailleur dispose de deux jours ouvrables de liberté par semaine, à plein salaire, pour chercher un autre emploi.",
    },
    {
      pregunta: "Que se passe-t-il si je trouve un emploi avant la fin du préavis ?",
      respuesta:
        "Le travailleur licencié qui doit occuper tout de suite un nouvel emploi peut partir avant la fin du préavis, après en avoir informé l'employeur, sans payer d'indemnité compensatrice.",
    },
    {
      pregunta: "Le préavis est-il dû en cas de faute lourde ?",
      respuesta: "Non. La rupture peut intervenir sans préavis en cas de faute lourde, sous le contrôle du juge sur la gravité de la faute.",
    },
  ],
  glosario: [
    { termino: "Préavis", definicion: "Le délai entre la notification de la rupture et la fin du contrat." },
    { termino: "Indemnité compensatrice", definicion: "La somme due quand le préavis n'est pas effectué." },
  ],
});
