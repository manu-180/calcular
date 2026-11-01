import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lu.cout-employeur",
  h1: "Coût employeur au Luxembourg : charges patronales",
  title: "Coût employeur Luxembourg {{anio}} : charges patronales",
  description: "Ce que coûte un salaire à l'employeur au Luxembourg : maladie, pension, accident, santé au travail et Mutualité des employeurs selon les taux {{anio}}.",
  intro: [
    "Au salaire brut s'ajoutent les charges patronales : la moitié des cotisations maladie et pension, l'assurance accident, la santé au travail et la Mutualité des employeurs.",
    "Le taux de la Mutualité dépend de la classe de l'entreprise. Choisissez la vôtre.",
  ],
  comoSeCalcula: [
    "Maladie : la moitié de {{lu.cotisation-maladie-soins}} et de {{lu.cotisation-maladie-especes}}. Pension : la moitié de {{lu.cotisation-pension}}.",
    "Accident {{lu.cotisation-accident}}, santé au travail {{lu.cotisation-sante-travail}} et Mutualité selon la classe, entièrement à charge de l'employeur.",
    "Toutes ces cotisations s'arrêtent au maximum cotisable de {{lu.plafond-cotisable}} par mois.",
  ],
  ejemplo: [
    "Un salaire de 5.000 euros coûte 5.664,50 euros par mois à un employeur en classe 2 de la Mutualité.",
  ],
  faq: [
    { pregunta: "L'assurance accident a-t-elle un taux unique ?", respuesta: "Oui, mais il est multiplié par un facteur bonus-malus propre à l'entreprise. Le calculateur utilise le taux unique." },
    { pregunta: "La dépendance est-elle à charge de l'employeur ?", respuesta: "Non. La contribution dépendance est entièrement à charge du salarié." },
    { pregunta: "Que manque-t-il dans ce calcul ?", respuesta: "Les avantages en nature, les primes et les coûts prévus par une convention collective. Vérifiez-les dans vos contrats." },
  ],
  glosario: [
    { termino: "Mutualité des employeurs", definicion: "Régime qui rembourse aux employeurs une partie des salaires versés pendant les absences pour maladie, financé par cotisations selon des classes." },
  ],
});
