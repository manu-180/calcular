import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoFr: ContenidoUniversal = (ctx) => {
  const tasa = `{{${ctx.datos.tasa}}}`;
  const precio = formatearMonto(ctx, montoEjemplo(ctx, 100));
  const canada = ctx.locale.endsWith("-CA");
  return {
    h1: "Calcul de la TVA : HT et TTC",
    title: tituloQueEntre(`Calcul TVA ${tasa} : HT et TTC (${ctx.nombrePais})`, `Calcul TVA ${tasa} (${ctx.nombrePais})`, `Calcul TVA ${tasa}`),
    description: `Ajoutez ou retirez la TVA à ${tasa} sur n’importe quel prix en une étape : le prix HT, le montant de la TVA et le prix TTC, au centime près.`,
    intro: [
      `Le calcul applique le taux normal de TVA du pays (${ctx.nombrePais}), soit ${tasa}.`,
      "Choisissez si vous partez d’un prix hors taxes (HT) ou d’un prix toutes taxes comprises (TTC), puis saisissez le montant.",
    ],
    comoSeCalcula: [
      "Du HT au TTC : TVA = prix HT × taux ÷ 100. Prix TTC = prix HT + TVA.",
      "Du TTC au HT : prix HT = prix TTC ÷ (1 + taux ÷ 100). La TVA est la différence.",
      "Si votre produit relève d’un taux réduit, saisissez-le dans « Autre taux de TVA ».",
    ],
    ejemplo: [
      `Pour passer ${precio} HT en TTC, multipliez par ${tasa} et ajoutez le résultat au prix.`,
      `Pour connaître la TVA comprise dans ${precio} TTC, divisez par 1 plus le taux, puis faites la différence.`,
    ],
    faq: [
      {
        pregunta: "Comment calculer un prix HT à partir du TTC ?",
        respuesta: "Divisez le prix TTC par 1 plus le taux écrit en décimal. Vous obtenez le prix HT. La différence entre les deux est la TVA.",
      },
      {
        pregunta: "Pourquoi ne pas retirer simplement le pourcentage du prix TTC ?",
        respuesta: "Parce que la TVA a été calculée sur le prix HT, qui est plus petit. Retirer le pourcentage du TTC enlève trop.",
      },
      {
        pregunta: `Tout est-il soumis à ${tasa} ?`,
        respuesta: "Pas toujours. Certains produits alimentaires, médicaments ou services ont un taux réduit ou sont exonérés. Dans ce cas, utilisez « Autre taux de TVA ».",
      },
    ],
    glosario: [
      {
        termino: "TVA",
        definicion: canada
          ? "Taxe sur la valeur ajoutée, ajoutée au prix des biens et des services. Au Canada, on parle plutôt de TPS, de TVQ ou de TVH."
          : "Taxe sur la valeur ajoutée, ajoutée au prix des biens et des services.",
      },
      { termino: "HT", definicion: "Hors taxes : le prix avant l’ajout de la TVA." },
      { termino: "TTC", definicion: "Toutes taxes comprises : le prix final payé, TVA incluse." },
    ],
  };
};
