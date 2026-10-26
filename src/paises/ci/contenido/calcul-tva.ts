import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ci.calcul-tva",
  h1: "Calcul de la TVA en Côte d'Ivoire",
  title: "Calcul TVA Côte d'Ivoire : HT, TTC et taux de 18 %",
  description:
    "Ajoutez ou retirez la TVA d'un prix au taux de {{ci.tva-normal}} ou au taux réduit de {{ci.tva-reduit}}. Passez du HT au TTC en un clic.",
  intro: [
    "La TVA s'applique en Côte d'Ivoire au taux de droit commun de {{ci.tva-normal}} sur le prix hors taxe. Un taux réduit de {{ci.tva-reduit}} vise une liste de produits.",
    "Choisissez le sens du calcul et le taux. Vous obtenez le HT, la TVA et le TTC.",
  ],
  comoSeCalcula: ["Du HT au TTC : TVA = HT × taux, puis TTC = HT + TVA.", "Du TTC au HT : HT = TTC / (1 + taux), puis TVA = TTC − HT."],
  ejemplo: ["Une facture de 100 000 F HT au taux de {{ci.tva-normal}} porte 18 000 F de TVA, soit 118 000 F TTC."],
  faq: [
    {
      pregunta: "Quels produits ont le taux réduit ?",
      respuesta:
        "Le lait (hors yaourts et autres produits laitiers), les pâtes de blé dur, les produits pétroliers, le lait infantile et les préparations pour nourrissons, la viande importée hors CEDEAO et le riz de luxe.",
    },
    {
      pregunta: "Tous les commerçants facturent-ils la TVA ?",
      respuesta:
        "Non. Les entreprises du régime de l'entreprenant et du régime des microentreprises ne sont pas autorisées à facturer la TVA. Ce sont les régimes du réel qui la collectent.",
    },
    {
      pregunta: "Quand déclarer la TVA ?",
      respuesta: "Les redevables souscrivent leur déclaration chaque mois auprès de leur service des impôts.",
    },
  ],
  glosario: [
    { termino: "HT", definicion: "Hors taxes : le prix avant TVA." },
    { termino: "TTC", definicion: "Toutes taxes comprises : le prix payé par le client." },
  ],
});
