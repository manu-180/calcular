import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  "calculadora": "ne.droit-commande-publique",
  "h1": "Droit d'enregistrement sur la commande publique au Niger",
  "title": "Droit sur la commande publique Niger {{anio}}",
  "description": "Calculez le droit d'enregistrement sur un marché public ({{ne.commande-droit[public]}}) ou un contrat privé ({{ne.commande-droit[prive]}}) au Niger, en vigueur depuis {{ne.commande-droit#desde}}.",
  "intro": [
    "La commande publique paie un droit de {{ne.commande-droit[public]}} du prix hors TVA. Les contrats entre personnes privées paient {{ne.commande-droit[prive]}}.",
    "Choisissez la nature du contrat et saisissez le montant hors taxe. Le calcul tient compte de l'exemption des petits bons de commande."
  ],
  "comoSeCalcula": [
    "Le droit est liquidé sur le prix hors TVA, ou sur l'évaluation hors taxes des travaux, fournitures, ouvrages ou services.",
    "Sont réputés commande publique les bons de commande, les marchés publics, les délégations de service public et les contrats de partenariat conclus par l'État, les collectivités, les établissements publics et les projets financés par l'État.",
    "Les bons de commande d'un montant inférieur à {{ne.commande-bon-seuil}} sont exemptés. À ce montant exact, le droit est dû."
  ],
  "ejemplo": [
    "Un marché public de fournitures de 20 000 000 F hors TVA supporte un droit de 1 000 000 F. Un contrat de prestation de 5 000 000 F entre deux sociétés privées supporte 100 000 F."
  ],
  "faq": [
    {
      "pregunta": "Quel taux s'applique à la commande publique ?",
      "respuesta": "{{ne.commande-droit[public]}}, liquidé sur le prix hors TVA (article 470 du Code général des impôts)."
    },
    {
      "pregunta": "Et pour un contrat entre personnes privées ?",
      "respuesta": "{{ne.commande-droit[prive]}} du montant hors TVA. Les ONG et associations de développement sont assimilées à des personnes privées (article 470, point 4)."
    },
    {
      "pregunta": "Quels bons de commande sont exemptés ?",
      "respuesta": "Ceux dont le montant est inférieur à {{ne.commande-bon-seuil}} (liste des exemptions du droit d'enregistrement, point 58)."
    }
  ],
  "glosario": [
    {
      "termino": "Commande publique",
      "definicion": "Les achats de travaux, fournitures et services passés par l'État et les organismes publics."
    },
    {
      "termino": "Droit d'enregistrement",
      "definicion": "Impôt perçu quand un acte ou un contrat est enregistré auprès de l'administration fiscale."
    },
    {
      "termino": "Hors TVA",
      "definicion": "Le prix avant ajout de la taxe sur la valeur ajoutée."
    }
  ]
});
