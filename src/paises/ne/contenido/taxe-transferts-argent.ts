import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  "calculadora": "ne.taxe-transferts-argent",
  "h1": "Taxe sur les transferts d'argent et le mobile money au Niger",
  "title": "Taxe transfert d'argent Niger : calcul {{anio}}",
  "description": "Calculez la taxe sur les dépôts et transferts d'argent au Niger : {{ne.tdta-taux}} du montant brut, {{ne.tdta-taux-eleve}} au-dessus de {{ne.tdta-seuil}}.",
  "intro": [
    "Depuis le {{ne.tdta-taux#desde}}, les dépôts et transferts d'argent supportent une taxe de {{ne.tdta-taux}} du montant brut. Au-dessus de {{ne.tdta-seuil}}, le taux monte à {{ne.tdta-taux-eleve}}.",
    "La taxe vise les agences de transfert d'argent, les services de mobile money et les plateformes de services financiers agréées. Elle est perçue au moment du dépôt ou du transfert."
  ],
  "comoSeCalcula": [
    "La base est le montant brut du dépôt ou du transfert, avant la déduction des frais.",
    "Jusqu'à {{ne.tdta-seuil}}, on applique {{ne.tdta-taux}}. Au-delà, le texte porte le taux à {{ne.tdta-taux-eleve}} et ce calcul l'applique à tout le montant.",
    "Les transferts au sein du réseau d'un même assujetti et les fonds destinés au paiement des impôts et taxes sont exonérés."
  ],
  "ejemplo": [
    "Pour un transfert de 500 000 F, la taxe est de 2 500 F (0,5 % de 500 000). Pour un transfert de 3 000 000 F, qui dépasse le seuil de 2 000 000 F, elle est de 150 000 F (5 % de 3 000 000)."
  ],
  "faq": [
    {
      "pregunta": "Qui est assujetti à cette taxe ?",
      "respuesta": "Les personnes qui réalisent au Niger des opérations de dépôt et de transfert d'argent de compte à compte, par un opérateur de transfert, un établissement de paiement ou un émetteur de monnaie électronique (article 394 ter du Code général des impôts)."
    },
    {
      "pregunta": "Quel est le taux de la taxe ?",
      "respuesta": "{{ne.tdta-taux}} du montant brut déposé ou transféré, porté à {{ne.tdta-taux-eleve}} pour les montants supérieurs à {{ne.tdta-seuil}} (article 394 sexies)."
    },
    {
      "pregunta": "Quelles opérations sont exonérées ?",
      "respuesta": "Les transferts de fonds au sein du réseau des personnes assujetties et les fonds destinés au paiement des impôts et taxes aux receveurs et autres comptables publics (article 394 quater)."
    },
    {
      "pregunta": "Qui reverse la taxe à l'administration ?",
      "respuesta": "L'opérateur la perçoit au moment du dépôt ou du transfert, puis la reverse avec un modèle de déclaration fourni par l'administration fiscale (article 394 nonies)."
    }
  ],
  "glosario": [
    {
      "termino": "TDTA",
      "definicion": "Taxe sur les dépôts et transferts d'argent, créée par la loi de finances 2026."
    },
    {
      "termino": "Mobile money",
      "definicion": "Service qui permet de déposer, envoyer et retirer de l'argent depuis un téléphone."
    },
    {
      "termino": "Montant brut",
      "definicion": "Le montant avant déduction des frais de l'opérateur."
    }
  ]
});
