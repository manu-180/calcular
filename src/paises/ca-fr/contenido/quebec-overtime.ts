import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ca-fr.quebec-overtime",
  h1: "Calcul des heures supplémentaires au Québec",
  title: "Heures supplémentaires au Québec : calcul de la paie",
  description: "Calculez la paie d'une semaine avec des heures supplémentaires au Québec, selon la semaine normale et la majoration de la Loi sur les normes du travail.",
  intro: [
    "Inscrivez votre salaire horaire habituel et les heures travaillées dans la semaine pour voir la paie des heures normales, celle des heures supplémentaires et le total.",
    "Le calcul suit la Loi sur les normes du travail. Votre contrat ou votre convention collective peut prévoir plus.",
  ],
  comoSeCalcula: [
    "Les heures jusqu'à {{ca.qc-overtime[hours]}} dans la semaine sont payées au salaire horaire habituel.",
    "Chaque heure au-delà de {{ca.qc-overtime[hours]}} est payée au salaire habituel majoré de {{ca.qc-overtime[premium]}}.",
  ],
  faq: [
    {
      pregunta: "À partir de combien d'heures est-ce du temps supplémentaire?",
      respuesta: "À partir de {{ca.qc-overtime[hours]}} heures dans la semaine.",
    },
    {
      pregunta: "Quelle est la majoration?",
      respuesta: "{{ca.qc-overtime[premium]}} de votre salaire horaire habituel, en plus de ce salaire.",
    },
    {
      pregunta: "Et les emplois de compétence fédérale?",
      respuesta: "Ce calcul suit la Loi sur les normes du travail du Québec. Les emplois de compétence fédérale suivent le Code canadien du travail.",
    },
  ],
  glosario: [
    { termino: "Salaire horaire habituel", definicion: "Le salaire que vous gagnez normalement pour une heure de travail." },
    { termino: "Heures supplémentaires", definicion: "Les heures travaillées au-delà de la semaine normale de travail." },
  ],
});
