import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mg.calcul-tva",
  h1: "Calcul de la TVA à Madagascar (HT et TTC)",
  title: "Calcul TVA Madagascar : HT, TTC et taux de 20 %",
  description: "Passez du HT au TTC ou du TTC au HT avec la TVA malgache : {{mg.tva[normal]}} au taux normal, {{mg.tva[butane]}} pour le gaz butane, {{mg.tva[export]}} à l'export.",
  intro: [
    "Indiquez un montant pour ajouter la TVA à un prix hors taxes ou pour la retirer d'un prix toutes taxes comprises.",
    "Les taux viennent de l'article 06.01.12 du Code des impôts.",
  ],
  comoSeCalcula: [
    "Le taux normal est de {{mg.tva[normal]}}. Le gaz butane et ses bouteilles sont taxés à {{mg.tva[butane]}}. Les exportations de biens et de services sont à {{mg.tva[export]}}.",
    "Pour passer du TTC au HT, on divise le TTC par 1 plus le taux.",
  ],
  ejemplo: ["Un prix de 100 000 Ar HT donne 120 000 Ar TTC, dont 20 000 Ar de TVA."],
  faq: [
    { pregunta: "Quel est le taux de la TVA à Madagascar ?", respuesta: "{{mg.tva[normal]}} au taux normal, pour la plupart des biens et des services." },
    {
      pregunta: "Qui doit facturer la TVA ?",
      respuesta: "Toute entreprise dont le chiffre d'affaires annuel hors taxe atteint {{mg.tva-seuil}}, et celles qui optent pour le régime du réel. En dessous, l'entreprise relève en principe de l'impôt synthétique et ne facture pas de TVA.",
    },
    { pregunta: "Comment retirer la TVA d'un prix TTC ?", respuesta: "Divisez le prix TTC par 1,20 au taux normal. La différence entre le TTC et le HT est la TVA." },
  ],
  glosario: [
    { termino: "HT", definicion: "Hors taxes : le prix avant la TVA." },
    { termino: "TTC", definicion: "Toutes taxes comprises : le prix avec la TVA." },
  ],
});
