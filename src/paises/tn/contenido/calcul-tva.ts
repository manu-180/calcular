import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tn.calcul-tva",
  h1: "Calcul de la TVA en Tunisie : {{tn.tva-normal}}, {{tn.tva-intermediaire}} et {{tn.tva-reduit}}",
  title: "Calcul TVA Tunisie : taux de {{tn.tva-normal}}, {{tn.tva-intermediaire}} et {{tn.tva-reduit}}",
  description:
    "Ajoutez ou retirez la TVA tunisienne au taux général de {{tn.tva-normal}} ou aux taux de {{tn.tva-intermediaire}} et {{tn.tva-reduit}}. Passez du hors taxe au TTC et inversement.",
  intro: [
    "La TVA tunisienne compte trois taux : le taux général de {{tn.tva-normal}}, qui s'applique à tout ce qui ne relève pas d'un autre taux, le taux de {{tn.tva-intermediaire}} et le taux réduit de {{tn.tva-reduit}} pour les produits et services du tableau B du code de la TVA.",
    "Indiquez un montant, précisez s'il est hors taxe ou toutes taxes comprises, puis choisissez le taux.",
  ],
  comoSeCalcula: [
    "Ajouter la TVA : montant hors taxe × taux.",
    "Retirer la TVA : montant TTC ÷ (1 + taux) donne le hors taxe ; la différence est la TVA.",
    "Nous arrondissons au millime.",
  ],
  faq: [
    {
      pregunta: "Quel est le taux de TVA en Tunisie ?",
      respuesta: "Le taux général est de {{tn.tva-normal}}. Certaines opérations relèvent du taux de {{tn.tva-intermediaire}} ou du taux réduit de {{tn.tva-reduit}}, selon les listes de l'article 7 du code de la TVA et de ses tableaux annexés.",
    },
    {
      pregunta: "Comment retirer la TVA d'un prix TTC ?",
      respuesta: "Divisez le prix TTC par 1 plus le taux. Au taux général, divisez par 1,19 : le résultat est le prix hors taxe et la différence est la TVA.",
    },
    {
      pregunta: "Pourquoi ne pas simplement retirer le pourcentage du prix TTC ?",
      respuesta: "Parce que la TVA se calcule sur le prix hors taxe. Retirer {{tn.tva-normal}} du prix TTC donnerait un hors taxe trop bas.",
    },
  ],
  glosario: [
    { termino: "TVA", definicion: "Taxe sur la valeur ajoutée, facturée par les entreprises et reversée à l'État." },
    { termino: "HT", definicion: "Hors taxe : le montant sans TVA." },
    { termino: "TTC", definicion: "Toutes taxes comprises : le prix payé par le client." },
  ],
});
