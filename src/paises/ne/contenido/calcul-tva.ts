import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  "calculadora": "ne.calcul-tva",
  "h1": "Calcul de la TVA au Niger : du HT au TTC et inversement",
  "title": "Calcul TVA Niger : prix HT et TTC",
  "description": "Passez du prix hors taxe au prix toutes taxes comprises au Niger, et inversement, avec le taux normal de la TVA.",
  "intro": [
    "Cette page calcule la taxe sur la valeur ajoutée au taux normal. Elle sera publiée quand le taux aura été confirmé dans le Code général des impôts en vigueur."
  ],
  "comoSeCalcula": [
    "Du HT au TTC : on ajoute le taux au prix hors taxe.",
    "Du TTC au HT : on divise le prix par un plus le taux."
  ],
  "ejemplo": [
    "Pour 100 000 F hors taxe, la TVA est de 19 000 F et le prix TTC de 119 000 F."
  ],
  "faq": [],
  "glosario": [
    {
      "termino": "TVA",
      "definicion": "Taxe sur la valeur ajoutée, payée par le consommateur sur le prix d'un bien ou d'un service."
    }
  ]
});
