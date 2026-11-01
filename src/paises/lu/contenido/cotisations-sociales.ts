import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lu.cotisations-sociales",
  h1: "Calcul des cotisations sociales du salarié au Luxembourg",
  title: "Cotisations sociales Luxembourg {{anio}} : part salarié",
  description: "Cotisations sociales {{anio}} du salarié au Luxembourg : maladie, pension et dépendance sur le salaire brut, avec le maximum cotisable de {{lu.plafond-cotisable}}.",
  intro: [
    "Le salarié paie la moitié des cotisations maladie et pension et toute la contribution dépendance. En 2026, la cotisation pension passe à {{lu.cotisation-pension}} au total.",
    "Le calculateur donne le détail par mois et sur douze mois.",
  ],
  comoSeCalcula: [
    "Maladie : (soins {{lu.cotisation-maladie-soins}} + prestations en espèces {{lu.cotisation-maladie-especes}}) / 2.",
    "Pension : {{lu.cotisation-pension}} / 2. Maladie et pension ne dépassent pas le maximum cotisable de {{lu.plafond-cotisable}} par mois.",
    "Dépendance : {{lu.cotisation-dependance}} du salaire, sans plafond, après un abattement de {{lu.abattement-dependance}}.",
  ],
  ejemplo: [
    "Sur 5.000 euros bruts, le salarié paie 152,50 euros de maladie, 425 euros de pension et 60,30 euros de dépendance, soit 637,80 euros par mois.",
  ],
  faq: [
    { pregunta: "Qu'est-ce que le maximum cotisable ?", respuesta: "Le plafond de l'assiette de cotisation, égal à cinq fois le salaire social minimum. Au-delà, il n'y a plus de cotisation maladie ni pension." },
    { pregunta: "La dépendance est-elle plafonnée ?", respuesta: "Non. Elle s'applique sur tout le salaire, diminué d'un abattement d'un quart du salaire social minimum." },
    { pregunta: "Qui paie l'assurance accident ?", respuesta: "L'employeur. Il paie aussi la santé au travail et la Mutualité des employeurs." },
  ],
  glosario: [
    { termino: "Assiette de cotisation", definicion: "Montant du salaire sur lequel les cotisations sont calculées." },
    { termino: "CCSS", definicion: "Centre commun de la sécurité sociale, qui perçoit les cotisations." },
  ],
});
