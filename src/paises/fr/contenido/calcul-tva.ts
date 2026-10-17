import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "fr.calcul-tva",
  h1: "Calcul de la TVA : HT, TTC et taux 2026",
  title: "Calcul TVA : HT et TTC, taux de {{fr.tva-normal}} à {{fr.tva-particulier}}",
  description:
    "Ajoutez ou retirez la TVA en un clic avec les taux français : {{fr.tva-normal}}, {{fr.tva-intermediaire}}, {{fr.tva-reduit}} et {{fr.tva-particulier}}. Prix HT, TVA et TTC au centime près.",
  intro: [
    "En France métropolitaine, la TVA a un taux normal de {{fr.tva-normal}}, deux taux réduits de {{fr.tva-intermediaire}} et {{fr.tva-reduit}}, et un taux particulier de {{fr.tva-particulier}}.",
    "Choisissez si votre prix est hors taxes (HT) ou toutes taxes comprises (TTC), puis le taux qui correspond à votre produit ou service.",
  ],
  comoSeCalcula: [
    "Du HT au TTC : TVA = prix HT × taux. Le prix TTC est le prix HT plus la TVA.",
    "Du TTC au HT : prix HT = prix TTC ÷ (1 + taux). Avec le taux normal, on divise par 1,20.",
    "La TVA est toujours la différence entre le prix TTC et le prix HT.",
  ],
  ejemplo: [
    "Une prestation facturée 1 000 € HT au taux normal coûte 1 200 € TTC, dont 200 € de TVA.",
    "Un repas au restaurant payé 45 € TTC comprend 40,91 € HT et 4,09 € de TVA au taux de {{fr.tva-intermediaire}}.",
  ],
  faq: [
    {
      pregunta: "Comment calculer le HT à partir du TTC ?",
      respuesta: "Divisez le prix TTC par 1 plus le taux. Au taux normal, divisez par 1,20 : 120 € TTC font 100 € HT.",
    },
    {
      pregunta: "Pourquoi ne pas retirer 20 % du prix TTC ?",
      respuesta:
        "Parce que la TVA est calculée sur le prix HT, plus petit que le TTC. Retirer 20 % de 120 € donne 96 €, alors que le vrai prix HT est de 100 €.",
    },
    {
      pregunta: "Quel taux de TVA s'applique à mon activité ?",
      respuesta:
        "Le taux normal de {{fr.tva-normal}} est la règle. Le taux de {{fr.tva-intermediaire}} vise notamment la restauration, le transport de voyageurs et certains travaux dans les logements. Le taux de {{fr.tva-reduit}} vise surtout les produits alimentaires et les livres, et celui de {{fr.tva-particulier}} les médicaments remboursés et la presse.",
    },
    {
      pregunta: "Les taux sont-ils les mêmes en outre-mer ?",
      respuesta:
        "Non. La Guadeloupe, la Martinique et La Réunion appliquent des taux plus bas, par exemple 8,5 % au lieu de 20 %. Ce calcul utilise les taux de la métropole.",
    },
  ],
  glosario: [
    { termino: "HT", definicion: "Hors taxes : le prix avant l'ajout de la TVA." },
    { termino: "TTC", definicion: "Toutes taxes comprises : le prix payé par le client, TVA incluse." },
    { termino: "TVA", definicion: "Taxe sur la valeur ajoutée, payée par le consommateur et reversée à l'État par l'entreprise." },
  ],
});
