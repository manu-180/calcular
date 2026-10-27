import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bf.indemnite-maladie",
  h1: "Salaire pendant un arrêt maladie",
  title: "Arrêt maladie Burkina Faso : salaire maintenu par l'employeur",
  description:
    "Calculez ce que l'employeur verse pendant une absence pour maladie non professionnelle : mois à plein salaire puis à demi-salaire selon l'ancienneté.",
  intro: [
    "Pendant une maladie ou un accident non professionnel constaté par un certificat médical, le contrat est suspendu et l'employeur maintient tout ou partie du salaire.",
    "Indiquez votre ancienneté, votre salaire et la durée de l'absence. Vous obtenez l'indemnité due.",
  ],
  comoSeCalcula: [
    "Moins d'un an d'ancienneté : {{bf.maladie-plein-salaire[0]}} à plein salaire puis {{bf.maladie-demi-salaire[0]}} à demi-salaire.",
    "De un à cinq ans : {{bf.maladie-plein-salaire[1]}} puis {{bf.maladie-demi-salaire[1]}}. De six à dix ans : {{bf.maladie-plein-salaire[6]}} puis {{bf.maladie-demi-salaire[6]}}.",
    "De onze à quinze ans : {{bf.maladie-plein-salaire[11]}} puis {{bf.maladie-demi-salaire[11]}}. Au-delà de quinze ans : {{bf.maladie-plein-salaire[16]}} puis {{bf.maladie-demi-salaire[16]}}.",
  ],
  ejemplo: ["Avec trois ans d'ancienneté et 200 000 F de salaire, trois mois d'absence donnent 400 000 F : un mois plein puis deux mois à moitié."],
  faq: [
    {
      pregunta: "Ces montants valent-ils pour chaque arrêt ?",
      respuesta: "Non. Ils sont le maximum de l'année civile, quels que soient le nombre et la durée des absences pour maladie ou accident non professionnels.",
    },
    {
      pregunta: "Combien de temps le contrat reste-t-il suspendu ?",
      respuesta: "Dans la limite d'un an. Ce délai peut être prorogé jusqu'au remplacement du travailleur.",
    },
    {
      pregunta: "Et pour un accident du travail ?",
      respuesta: "Ce calcul ne le couvre pas. L'accident du travail et la maladie professionnelle relèvent de la branche des risques professionnels de la CNSS.",
    },
  ],
  glosario: [
    { termino: "Maladie non professionnelle", definicion: "Une maladie ou un accident sans lien avec le travail." },
    { termino: "Année civile", definicion: "Du 1er janvier au 31 décembre." },
  ],
});
