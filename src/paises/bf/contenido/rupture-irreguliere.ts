import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bf.rupture-irreguliere",
  h1: "Indemnité pour rupture irrégulière du contrat",
  title: "Rupture irrégulière Burkina Faso : indemnité et plafond",
  description:
    "Licenciement sans lettre ou sans motif : {{bf.rupture-irreguliere[licenciement]}} de salaire. Démission non écrite : {{bf.rupture-irreguliere[demission]}} pour l'employeur.",
  intro: [
    "Le code du travail de 2026 sanctionne la rupture qui ne respecte pas la forme écrite, même quand le motif est légitime.",
    "Indiquez la situation et le salaire moyen. Vous obtenez l'indemnité et le plafond des dommages et intérêts en cas d'abus.",
  ],
  comoSeCalcula: [
    "Licenciement légitime sur le fond mais sans notification écrite ou sans motif : le travailleur reçoit {{bf.rupture-irreguliere[licenciement]}} de salaire.",
    "Démission non notifiée par écrit : l'employeur reçoit {{bf.rupture-irreguliere[demission]}} de salaire.",
    "Le salaire retenu est le salaire global mensuel moyen des six derniers mois, ou depuis l'entrée si l'ancienneté est plus courte.",
  ],
  ejemplo: ["Un licenciement sans lettre, avec 250 000 F de salaire moyen : 750 000 F d'indemnité pour rupture irrégulière."],
  faq: [
    {
      pregunta: "Quel est le plafond des dommages et intérêts ?",
      respuesta:
        "Si la rupture est jugée abusive, le juge fixe les dommages et intérêts : au plus {{bf.dommages-plafond[employeur]}} de salaire quand la responsabilité est celle de l'employeur, {{bf.dommages-plafond[travailleur]}} quand elle est celle du travailleur.",
    },
    {
      pregunta: "Ces sommes remplacent-elles le préavis ?",
      respuesta: "Non. Les dommages et intérêts ne se confondent ni avec l'indemnité de préavis ni avec l'indemnité de licenciement.",
    },
    {
      pregunta: "Qu'est-ce qu'un licenciement abusif ?",
      respuesta: "C'est un licenciement sans motif légitime. Il donne lieu à la réintégration du travailleur ou, en cas de refus, à des dommages et intérêts.",
    },
  ],
  glosario: [
    { termino: "Rupture irrégulière", definicion: "Une rupture qui ne respecte pas la procédure, notamment l'écrit et le motif." },
    { termino: "Salaire global mensuel moyen", definicion: "La moyenne de tout ce que vous avez perçu par mois sur la période retenue." },
  ],
});
