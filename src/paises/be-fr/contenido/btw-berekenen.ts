import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "be-fr.btw-berekenen",
  h1: "Calcul de la TVA en Belgique : 21 %, 12 % et 6 %",
  title: "Calcul TVA Belgique : {{be.btw-standaard}}, {{be.btw-tussen}} et {{be.btw-verlaagd}}",
  description:
    "Ajoutez ou retirez la TVA avec le taux normal belge de {{be.btw-standaard}}, le taux intermédiaire de {{be.btw-tussen}} ou le taux réduit de {{be.btw-verlaagd}}.",
  intro: [
    "La Belgique applique trois taux de TVA : le taux normal de {{be.btw-standaard}}, le taux intermédiaire de {{be.btw-tussen}} et le taux réduit de {{be.btw-verlaagd}}. Pour certains biens et services, le taux zéro s'applique exceptionnellement.",
    "Indiquez un montant, choisissez s'il est hors TVA ou TVA comprise et sélectionnez le taux. Vous voyez immédiatement la TVA qu'il contient.",
  ],
  comoSeCalcula: [
    "Ajouter la TVA : montant hors TVA × taux. À {{be.btw-standaard}}, c'est le montant × 0,21.",
    "Retirer la TVA : montant TVA comprise ÷ (1 + taux) donne le montant hors TVA. La différence est la TVA. À {{be.btw-standaard}}, on divise par 1,21, à {{be.btw-verlaagd}} par 1,06.",
    "Nous arrondissons au centime.",
  ],
  ejemplo: [
    "Une facture de 250 € TVA {{be.btw-standaard}} comprise : 250 ÷ 1,21 = 206,61 € hors TVA, elle contient donc 43,39 € de TVA.",
  ],
  faq: [
    {
      pregunta: "Quel taux de TVA s'applique à mon produit ou service ?",
      respuesta:
        "Le taux normal de {{be.btw-standaard}} est la règle. Le taux intermédiaire et le taux réduit ne s'appliquent qu'aux biens et services repris dans l'arrêté royal n° 20. En cas de doute, consultez cette liste ou renseignez-vous auprès du SPF Finances.",
    },
    {
      pregunta: "Pourquoi diviser par 1,21 au lieu de retirer 21 % ?",
      respuesta:
        "Parce que la TVA est calculée sur le montant hors TVA. Sur 121 € TVA comprise, 100 € est le montant hors TVA et 21 € la TVA. Si vous retirez 21 % de 121 €, vous obtenez 95,59 €, ce qui est faux.",
    },
    {
      pregunta: "Où figurent les taux dans la déclaration TVA ?",
      respuesta:
        "Dans la déclaration TVA, chaque taux a sa propre grille pour les opérations à la sortie : grille 03 pour {{be.btw-standaard}}, grille 02 pour {{be.btw-tussen}}, grille 01 pour {{be.btw-verlaagd}} et grille 00 pour le taux zéro.",
    },
  ],
  glosario: [
    { termino: "TVA", definicion: "Taxe sur la valeur ajoutée, que les entreprises facturent sur leurs ventes et reversent au SPF Finances." },
    { termino: "Hors TVA", definicion: "Le montant sans TVA. C'est sur lui que la TVA est calculée." },
    { termino: "TVA comprise", definicion: "Le montant avec TVA, le prix payé par le consommateur." },
  ],
});
