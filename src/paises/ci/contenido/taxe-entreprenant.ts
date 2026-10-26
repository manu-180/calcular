import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  "calculadora": "ci.taxe-entreprenant",
  "h1": "Calcul de la taxe de l'entreprenant",
  "title": "Taxe d'État de l'entreprenant et microentreprises",
  "description": "Calculez l'impôt des petites entreprises selon le chiffre d'affaires : taxe communale ou d'État de l'entreprenant, ou impôt des microentreprises.",
  "intro": [
    "Les petites entreprises ne paient pas l'impôt sur le bénéfice ni la TVA : elles paient un impôt sur leur chiffre d'affaires. Le régime dépend du chiffre d'affaires annuel.",
    "Indiquez votre chiffre d'affaires TTC et votre activité. Vous obtenez le régime, l'impôt de l'année et le versement mensuel."
  ],
  "comoSeCalcula": [
    "Jusqu'à {{ci.regimes-seuils[taxe-communale]}} : taxe communale de l'entreprenant, {{ci.entreprenant-taxe-communale[commerce]}} pour le commerce et {{ci.entreprenant-taxe-communale[autres]}} pour les autres activités.",
    "Jusqu'à {{ci.regimes-seuils[taxe-etat]}} : taxe d'État de l'entreprenant, {{ci.entreprenant-taxe-etat[commerce]}} pour le commerce et {{ci.entreprenant-taxe-etat[autres]}} sinon, réduits de {{ci.entreprenant-reduction-cga}} pour un adhérent de CGA.",
    "Jusqu'à {{ci.regimes-seuils[microentreprises]}} : impôt des microentreprises, {{ci.microentreprises-taux[normal]}} ou {{ci.microentreprises-taux[adherent]}} avec un CGA ou un expert-comptable conventionné.",
    "L'impôt annuel se paie par douzièmes, avant le 10 de chaque mois."
  ],
  "ejemplo": [
    "Un commerçant qui fait 12 000 000 F de chiffre d'affaires paie la taxe d'État de l'entreprenant à 4 % : 480 000 F par an, soit 40 000 F par mois."
  ],
  "faq": [
    {
      "pregunta": "Puis-je facturer la TVA ?",
      "respuesta": "Non. Les entreprises du régime de l'entreprenant et du régime des microentreprises ne facturent pas la TVA et ne la déduisent pas."
    },
    {
      "pregunta": "Quand déclarer ?",
      "respuesta": "La déclaration annuelle se dépose au plus tard le 15 janvier. L'impôt se paie ensuite chaque mois par douzième."
    },
    {
      "pregunta": "Que se passe-t-il au-delà de 200 millions ?",
      "respuesta": "Vous passez au régime du réel simplifié, puis au réel normal au-delà de {{ci.regimes-seuils[reel-simplifie]}}. L'impôt porte alors sur le bénéfice."
    },
    {
      "pregunta": "Ces taxes remplacent-elles l'ITS de mes salariés ?",
      "respuesta": "Pour la taxe communale de l'entreprenant, oui. Pour l'impôt des microentreprises, non : l'ITS des salariés reste dû."
    }
  ],
  "glosario": [
    {
      "termino": "CGA",
      "definicion": "Centre de gestion agréé, qui aide les petites entreprises à tenir leur comptabilité."
    },
    {
      "termino": "Chiffre d'affaires TTC",
      "definicion": "Toutes les recettes de l'année, taxes comprises."
    }
  ]
});
