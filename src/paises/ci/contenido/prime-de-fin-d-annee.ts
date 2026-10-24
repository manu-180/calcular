import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  "calculadora": "ci.prime-de-fin-d-annee",
  "h1": "Calcul de la prime de fin d'année",
  "title": "Prime de fin d'année Côte d'Ivoire : montant minimum",
  "description": "La gratification de fin d'année vaut au moins {{ci.prime-fin-annee}} du salaire minimum conventionnel de votre catégorie. Calculez la vôtre, au prorata si besoin.",
  "intro": [
    "En fin d'année, la convention collective interprofessionnelle prévoit une prime ou gratification. Elle ne peut pas être inférieure aux trois quarts du salaire minimum de votre catégorie.",
    "Indiquez ce salaire et vos mois de service dans l'année."
  ],
  "comoSeCalcula": [
    "Prime pour une année complète : {{ci.prime-fin-annee}} du salaire minimum conventionnel mensuel.",
    "Si vous êtes arrivé, parti ou licencié en cours d'année, vous recevez une part au prorata des mois de service."
  ],
  "ejemplo": [
    "Avec un salaire minimum de catégorie de 150 000 F et une année complète : 112 500 F. Pour 6 mois : 56 250 F."
  ],
  "faq": [
    {
      "pregunta": "Si mon entreprise verse déjà un treizième mois ?",
      "respuesta": "La prime conventionnelle ne s'ajoute pas à une gratification déjà acquise. Elle garantit un minimum."
    },
    {
      "pregunta": "Le démissionnaire y a-t-il droit ?",
      "respuesta": "Oui, au prorata du temps de service de l'année."
    },
    {
      "pregunta": "Sur quel texte repose-t-elle ?",
      "respuesta": "Sur l'article 53 de la convention collective interprofessionnelle du 19 juillet 1977."
    }
  ],
  "glosario": [
    {
      "termino": "Salaire minimum conventionnel",
      "definicion": "Le salaire minimum fixé par la convention collective pour chaque catégorie professionnelle."
    }
  ]
});
