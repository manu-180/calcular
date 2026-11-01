import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bj.calcul-tva",
  h1: "Calcul de la TVA au Bénin ({{anio}})",
  title: "TVA Bénin {{anio}} : calcul HT et TTC à {{bj.tva}}",
  description: "Passez du prix hors taxe au prix TTC, ou l'inverse, avec la TVA béninoise de {{bj.tva}} prévue par le Code général des impôts.",
  intro: [
    "Au Bénin, la taxe sur la valeur ajoutée s'applique à un taux unique de {{bj.tva}}. Il suffit de connaître le prix hors taxe ou le prix toutes taxes comprises pour retrouver l'autre.",
    "Choisissez le montant que vous connaissez et saisissez-le. Le calcul donne le HT, la TVA et le TTC.",
  ],
  comoSeCalcula: [
    "À partir d'un prix hors taxe, la TVA est de {{bj.tva}} du montant, et le TTC est la somme des deux.",
    "À partir d'un prix TTC, on divise par 1,18 pour retrouver le hors taxe, la TVA étant la différence.",
    "Le taux de {{bj.tva}} vient de l'article 241 du Code général des impôts. Les opérations exonérées ou hors champ ne suivent pas ce calcul.",
  ],
  ejemplo: [
    "Une facture de 100 000 F hors taxe porte 18 000 F de TVA, soit 118 000 F TTC. Un prix affiché de 59 000 F TTC correspond à 50 000 F hors taxe et 9 000 F de TVA.",
  ],
  faq: [
    {
      pregunta: "Quel est le taux de la TVA au Bénin ?",
      respuesta: "L'article 241 du Code général des impôts fixe le taux de la taxe sur la valeur ajoutée à {{bj.tva}}.",
    },
    {
      pregunta: "Comment retrouver le prix hors taxe à partir du TTC ?",
      respuesta: "On divise le prix TTC par 1,18. Retirer 18 % du TTC donnerait un résultat faux, car la TVA se calcule sur le prix hors taxe.",
    },
    {
      pregunta: "Un petit commerçant facture-t-il la TVA ?",
      respuesta: "Les entreprises soumises à la taxe professionnelle synthétique relèvent d'un régime distinct. Consultez notre calculateur de la TPS.",
    },
  ],
  glosario: [
    { termino: "HT", definicion: "Hors taxe : le prix avant l'ajout de la TVA." },
    { termino: "TTC", definicion: "Toutes taxes comprises : le prix que paie le client." },
    { termino: "TVA", definicion: "Taxe sur la valeur ajoutée, payée par le consommateur final." },
  ],
});
