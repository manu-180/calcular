import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tg.calcul-tva",
  h1: "Calcul de la TVA au Togo",
  title: "Calcul TVA Togo : HT, TTC et taux de {{tg.tva}}",
  description:
    "Ajoutez ou retirez la TVA togolaise de {{tg.tva}} : passez d'un prix hors taxes à un prix toutes taxes comprises, ou l'inverse.",
  intro: [
    "Au Togo, la TVA a un taux unique qui s'applique à toutes les ventes et prestations imposables, sauf les opérations exonérées par le Code général des impôts.",
    "Choisissez le sens du calcul et saisissez le montant : vous obtenez le HT, la TVA et le TTC.",
  ],
  comoSeCalcula: [
    "Du HT au TTC : TVA = HT × {{tg.tva}}, puis TTC = HT + TVA.",
    "Du TTC au HT : HT = TTC ÷ (1 + {{tg.tva}}), puis TVA = TTC − HT.",
    "Les montants sont arrondis au franc.",
  ],
  ejemplo: ["Un service facturé 100 000 F HT supporte 18 000 F de TVA, soit 118 000 F TTC."],
  faq: [
    {
      pregunta: "Existe-t-il un taux réduit de TVA au Togo ?",
      respuesta:
        "Non. L'article 195 du Code général des impôts prévoit un taux unique de {{tg.tva}}. Certaines opérations sont exonérées, mais il n'y a pas de second taux.",
    },
    {
      pregunta: "Les petites entreprises facturent-elles la TVA ?",
      respuesta:
        "Les personnes physiques soumises à la taxe professionnelle unique ne la facturent pas : la TPU remplace notamment la TVA pour elles.",
    },
    {
      pregunta: "Comment retrouver la TVA dans un prix TTC ?",
      respuesta: "Divisez le prix TTC par 1 plus le taux de {{tg.tva}} pour obtenir le HT. La différence entre les deux est la TVA.",
    },
  ],
  glosario: [
    { termino: "HT", definicion: "Hors taxes : le prix avant TVA." },
    { termino: "TTC", definicion: "Toutes taxes comprises : le prix payé par le client, TVA incluse." },
  ],
});
