import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sn.calcul-tva",
  h1: "Calcul de la TVA au Sénégal (HT et TTC)",
  title: "Calcul TVA Sénégal : HT, TTC et taux de 18 %",
  description: "Passez du HT au TTC ou du TTC au HT avec la TVA du Sénégal : {{sn.tva[normal]}} au taux normal, {{sn.tva[hebergement]}} pour l'hébergement touristique agréé.",
  intro: [
    "Inscrivez un montant pour ajouter la TVA à un prix hors taxes ou pour la retirer d'un prix toutes taxes comprises.",
    "Les taux viennent de l'article 369 du Code général des impôts.",
  ],
  comoSeCalcula: [
    "Le taux normal est de {{sn.tva[normal]}}. Il est réduit à {{sn.tva[hebergement]}} pour les prestations des établissements d'hébergement touristique agréés.",
    "Pour passer du TTC au HT, on divise le TTC par 1 plus le taux.",
  ],
  ejemplo: ["Un prix de 100 000 francs HT donne 118 000 francs TTC, dont 18 000 francs de TVA."],
  faq: [
    {
      pregunta: "Quel est le taux de la TVA au Sénégal?",
      respuesta: "{{sn.tva[normal]}} au taux normal.",
    },
    {
      pregunta: "Qui bénéficie du taux de {{sn.tva[hebergement]}}?",
      respuesta: "Les établissements d'hébergement touristique agréés, comme les hôtels, les auberges, les résidences hôtelières et les appartements meublés, pour leurs prestations.",
    },
    {
      pregunta: "Comment retirer la TVA d'un prix TTC?",
      respuesta: "Divisez le prix TTC par 1,18 au taux normal. La différence entre le TTC et le HT est la TVA.",
    },
  ],
  glosario: [
    { termino: "HT", definicion: "Hors taxes : le prix avant la TVA." },
    { termino: "TTC", definicion: "Toutes taxes comprises : le prix avec la TVA." },
  ],
});
