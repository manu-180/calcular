import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bf.periode-d-essai",
  h1: "Durée de la période d'essai",
  title: "Période d'essai Burkina Faso : durée maximale",
  description:
    "Durée maximale de l'essai selon le code du travail de 2026 : {{bf.essai-jours-horaire}}, {{bf.essai-mois[employe]}} ou {{bf.essai-mois[cadre]}}, renouvelable une fois.",
  intro: [
    "L'essai permet à l'employeur et au travailleur de se tester avant un engagement ferme. Sa durée est plafonnée par la loi.",
    "Choisissez la catégorie de l'emploi et indiquez si l'essai est renouvelé. Vous obtenez la durée maximale.",
  ],
  comoSeCalcula: [
    "{{bf.essai-jours-horaire}} pour le travailleur payé à l'heure ou à la journée.",
    "{{bf.essai-mois[employe]}} pour les autres salariés et {{bf.essai-mois[cadre]}} pour les cadres, agents de maîtrise, techniciens et assimilés.",
    "L'essai ne peut être renouvelé qu'une seule fois, pour la même durée.",
  ],
  ejemplo: ["Un technicien engagé à l'essai pour trois mois, renouvelé une fois : l'essai dure au plus six mois."],
  faq: [
    {
      pregunta: "Peut-on rompre l'essai à tout moment ?",
      respuesta: "Oui. L'engagement à l'essai peut cesser à tout moment, sans préavis ni indemnité, par l'une ou l'autre partie.",
    },
    {
      pregunta: "Quel salaire pendant l'essai ?",
      respuesta: "Au moins le salaire minimum de la catégorie professionnelle de l'emploi occupé.",
    },
    {
      pregunta: "Les congés acquis pendant l'essai sont-ils perdus ?",
      respuesta: "Non. Si l'essai prend fin, l'indemnité compensatrice de congé payé reste due.",
    },
  ],
  glosario: [
    { termino: "Engagement à l'essai", definicion: "Contrat ou clause qui permet de vérifier les aptitudes avant l'embauche définitive." },
    { termino: "Renouvellement", definicion: "Prolongation de l'essai, permise une seule fois et pour la même durée." },
  ],
});
