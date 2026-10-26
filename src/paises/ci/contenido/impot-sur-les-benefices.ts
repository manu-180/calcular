import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  "calculadora": "ci.impot-sur-les-benefices",
  "h1": "Calcul de l'impôt sur les bénéfices",
  "title": "Impôt sur les bénéfices Côte d'Ivoire : taux de 25 %",
  "description": "Calculez l'impôt sur les bénéfices industriels et commerciaux (BIC) : {{ci.bic-taux[general]}} en droit commun, {{ci.bic-taux[telecom]}} pour les télécoms et TIC.",
  "intro": [
    "Les entreprises du régime du réel paient l'impôt sur les bénéfices industriels et commerciaux (BIC) sur leur résultat fiscal.",
    "Indiquez votre bénéfice fiscal et votre secteur. Vous obtenez l'impôt et le bénéfice qui reste."
  ],
  "comoSeCalcula": [
    "Impôt = bénéfice fiscal × taux.",
    "Le taux est de {{ci.bic-taux[general]}} pour les personnes physiques et morales, et de {{ci.bic-taux[telecom]}} pour les télécommunications et les technologies de l'information."
  ],
  "ejemplo": [
    "Un bénéfice fiscal de 20 000 000 F donne 5 000 000 F d'impôt au taux de {{ci.bic-taux[general]}}."
  ],
  "faq": [
    {
      "pregunta": "Le bénéfice fiscal est-il le bénéfice comptable ?",
      "respuesta": "Pas toujours. On part du résultat comptable et on ajoute ou retire les charges et produits que la loi fiscale traite autrement."
    },
    {
      "pregunta": "Et si l'entreprise est en perte ?",
      "respuesta": "Il n'y a pas d'impôt sur les bénéfices, mais un impôt minimum forfaitaire peut rester dû."
    },
    {
      "pregunta": "Les petites entreprises paient-elles cet impôt ?",
      "respuesta": "Non. Sous 200 millions de chiffre d'affaires, elles relèvent de la taxe de l'entreprenant ou de l'impôt des microentreprises."
    }
  ],
  "glosario": [
    {
      "termino": "BIC",
      "definicion": "Bénéfices industriels et commerciaux."
    },
    {
      "termino": "Bénéfice fiscal",
      "definicion": "Le résultat sur lequel l'impôt est calculé."
    }
  ]
});
