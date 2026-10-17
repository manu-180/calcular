import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ch-fr.mwst-rechner",
  h1: "Calcul de la TVA en Suisse : {{ch.mwst-normalsatz}}, {{ch.mwst-reduziert}} et {{ch.mwst-beherbergung}}",
  title: "Calcul TVA Suisse : ajouter ou extraire {{ch.mwst-normalsatz}}",
  description: "TVA suisse au taux de {{ch.mwst-normalsatz}}, {{ch.mwst-reduziert}} ou {{ch.mwst-beherbergung}} : montant hors TVA et TVA comprise, au centime près.",
  intro: [
    "En Suisse, la TVA s'élève à {{ch.mwst-normalsatz}}. Les denrées alimentaires, les médicaments, les livres et les journaux sont soumis au taux réduit de {{ch.mwst-reduziert}}. Pour l'hébergement avec petit-déjeuner, le taux spécial est de {{ch.mwst-beherbergung}}.",
    "Avec le calculateur, vous ajoutez la TVA à un montant ou vous l'extrayez d'un prix TVA comprise.",
  ],
  comoSeCalcula: [
    "Ajouter : le montant multiplié par le taux donne la TVA. Montant plus TVA donne le prix TVA comprise.",
    "Extraire : le prix TVA comprise divisé par 1,081 (ou 1,026 et 1,038) donne le montant hors TVA. La différence est la taxe.",
    "Ne déduisez pas simplement {{ch.mwst-normalsatz}} du prix final : vous obtiendriez trop de taxe.",
  ],
  ejemplo: [
    "Une offre de 2000 francs hors TVA coûte 2162 francs au taux normal. Elle contient 162 francs de TVA.",
  ],
  faq: [
    { pregunta: "Comment extraire la TVA d'un montant brut ?", respuesta: "Divisez le montant TVA comprise par 1,081. De 108,10 francs, il reste 100 francs hors TVA, la taxe s'élève à 8,10 francs." },
    { pregunta: "Qu'est-ce qui est soumis au taux réduit ?", respuesta: "Entre autres l'eau amenée par des conduites, les denrées alimentaires sauf les boissons alcooliques, les médicaments, les journaux, les revues et les livres. La liste complète figure à l'art. 25, al. 2, de la loi sur la TVA." },
    { pregunta: "Le taux réduit s'applique-t-il au restaurant ?", respuesta: "Non. Les mets et boissons servis au restaurant sont soumis au taux normal. Les denrées alimentaires à l'emporter sont soumises au taux réduit, sauf les boissons alcooliques." },
    { pregunta: "Jusqu'à quand vaut le taux spécial pour l'hébergement ?", respuesta: "La loi le prévoit jusqu'au 31 décembre 2027 au plus tard. Il s'applique aux nuitées avec petit-déjeuner, même si celui-ci est facturé à part." },
  ],
  glosario: [
    { termino: "TVA", definicion: "Taxe sur la valeur ajoutée, perçue par l'Administration fédérale des contributions." },
    { termino: "Impôt préalable", definicion: "La TVA qu'une entreprise paie sur ses achats et qu'elle peut déduire dans son décompte." },
  ],
});
