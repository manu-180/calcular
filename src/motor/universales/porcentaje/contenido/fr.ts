import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoFr: ContenidoUniversal = (ctx) => {
  const precio = montoEjemplo(ctx, 50);
  const m = (n: number) => formatearMonto(ctx, n);
  const coef = formatearNumero(ctx, 1.1, 2);
  return {
    h1: "Calcul de pourcentage",
    title: tituloQueEntre(`Calcul de pourcentage en ligne (${ctx.nombrePais})`, `Calcul de pourcentage (${ctx.nombrePais})`, "Calcul de pourcentage"),
    description: "Calculez le pourcentage d’un nombre, la part qu’un nombre représente dans un autre, ou le résultat d’une hausse ou d’une baisse en %.",
    intro: [
      "Choisissez ce que vous cherchez, saisissez les deux nombres et le résultat s’affiche aussitôt.",
      "Les quatre calculs de pourcentage du quotidien sont réunis ici : une part, une proportion, une hausse et une baisse.",
    ],
    comoSeCalcula: [
      "X % de Y = X × Y ÷ 100.",
      "Part de X dans Y, en pourcentage = X ÷ Y × 100.",
      "Y augmenté de X % = Y × (1 + X ÷ 100). Y diminué de X % = Y × (1 − X ÷ 100).",
    ],
    ejemplo: [
      "15 % de 200 font 30.",
      "30 représente 25 % de 120.",
      `Un prix de ${m(precio)} qui augmente de 10 % passe à ${m(precio * 1.1)}.`,
    ],
    faq: [
      {
        pregunta: "Comment calculer le pourcentage d’un nombre ?",
        respuesta: "Multipliez le nombre par le pourcentage, puis divisez par 100. 20 % de 350, c’est 350 × 20 ÷ 100 = 70.",
      },
      {
        pregunta: "Comment calculer un pourcentage entre deux nombres ?",
        respuesta: "Divisez la partie par le total, puis multipliez par 100. Avec 45 bonnes réponses sur 60, vous obtenez 45 ÷ 60 × 100 = 75 %.",
      },
      {
        pregunta: "Comment ajouter un pourcentage à un prix ?",
        respuesta: `Multipliez le prix par le coefficient multiplicateur, c’est-à-dire 1 + pourcentage ÷ 100. Pour ajouter 10 %, multipliez par ${coef}.`,
      },
      {
        pregunta: "Une hausse de 10 % puis une baisse de 10 %, est-ce qu’on revient au départ ?",
        respuesta: "Non. 100 plus 10 % donne 110, et 110 moins 10 % donne 99. La baisse s’applique à un nombre plus grand.",
      },
    ],
    glosario: [
      { termino: "Pourcentage", definicion: "Une quantité exprimée en parts sur 100." },
      { termino: "Base", definicion: "Le nombre sur lequel on prend le pourcentage (Y dans ce calculateur)." },
      { termino: "Coefficient multiplicateur", definicion: `Le nombre par lequel on multiplie pour appliquer une hausse ou une baisse (${coef} pour une hausse de 10 %).` },
    ],
  };
};
