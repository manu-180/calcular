import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ma.calcul-tva",
  h1: "Calcul de la TVA au Maroc : {{ma.tva-normal}} et {{ma.tva-reduit}}",
  title: "Calcul TVA Maroc {{anio}} : taux de {{ma.tva-normal}} et {{ma.tva-reduit}}",
  description:
    "Ajoutez ou retirez la TVA marocaine avec le taux normal de {{ma.tva-normal}} ou le taux réduit de {{ma.tva-reduit}}. Passez du hors taxe au TTC et inversement.",
  intro: [
    "Depuis le 1er janvier 2026, la TVA marocaine ne compte plus que deux taux : le taux normal de {{ma.tva-normal}} et le taux réduit de {{ma.tva-reduit}}. Les taux transitoires prévus par la loi de finances 2024 ont pris fin.",
    "Indiquez un montant, précisez s'il est hors taxe ou toutes taxes comprises, puis choisissez le taux. Vous voyez immédiatement la TVA.",
  ],
  comoSeCalcula: [
    "Ajouter la TVA : montant hors taxe × taux. Au taux normal, c'est le montant × 0,20.",
    "Retirer la TVA : montant TTC ÷ (1 + taux) donne le montant hors taxe. La différence est la TVA. Au taux normal, on divise par 1,20, au taux réduit par 1,10.",
    "Nous arrondissons au centime.",
  ],
  ejemplo: ["Une facture de 1 200 DH TTC au taux normal contient 200 DH de TVA : 1 200 ÷ 1,20 = 1 000 DH hors taxe."],
  faq: [
    {
      pregunta: "Quelles opérations relèvent du taux réduit de {{ma.tva-reduit}} ?",
      respuesta:
        "L'article 99 du code général des impôts en dresse la liste. On y trouve notamment l'hébergement et la restauration, l'eau livrée aux réseaux de distribution publique, l'assainissement, le transport urbain et le transport routier de voyageurs et de marchandises.",
    },
    {
      pregunta: "Les taux de 7 % et de 14 % existent-ils encore ?",
      respuesta:
        "Non. La loi de finances 2024 a ramené la TVA à deux taux, avec une période transitoire pour certaines opérations. Depuis le 1er janvier 2026, ces opérations sont passées au taux de {{ma.tva-normal}} ou de {{ma.tva-reduit}}.",
    },
    {
      pregunta: "Pourquoi diviser par 1,20 au lieu de retirer 20 % ?",
      respuesta: "Parce que la TVA est calculée sur le montant hors taxe. Sur 1 200 DH TTC, 1 000 DH sont hors taxe et 200 DH de TVA. Retirer 20 % de 1 200 DH donnerait 960 DH, ce qui est faux.",
    },
  ],
  glosario: [
    { termino: "TVA", definicion: "Taxe sur la valeur ajoutée, facturée par les entreprises sur leurs ventes et reversée à la DGI." },
    { termino: "HT", definicion: "Hors taxe : le montant sans TVA." },
    { termino: "TTC", definicion: "Toutes taxes comprises : le prix payé par le client." },
  ],
});
