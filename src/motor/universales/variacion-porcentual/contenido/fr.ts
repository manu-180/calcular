import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoFr: ContenidoUniversal = (ctx) => {
  const antes = montoEjemplo(ctx, 40);
  const despues = antes * 1.25;
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Calcul du taux d’évolution",
    title: tituloQueEntre(`Calcul du taux d’évolution en % (${ctx.nombrePais})`, `Taux d’évolution (${ctx.nombrePais})`, "Calcul du taux d’évolution"),
    description: "Calculez de combien une valeur a augmenté ou baissé en pourcentage : un prix, un salaire, un chiffre d’affaires ou tout autre nombre.",
    intro: [
      "Saisissez l’ancienne valeur et la nouvelle. Vous obtenez la hausse ou la baisse en pourcentage, et l’écart.",
      "Le calcul indique aussi la variation nécessaire pour revenir au départ. Ce n’est presque jamais le même pourcentage.",
    ],
    comoSeCalcula: [
      "Taux d’évolution = (valeur d’arrivée − valeur de départ) ÷ valeur de départ × 100.",
      "Un résultat positif est une hausse. Un résultat négatif est une baisse.",
      "Si la valeur de départ est négative, on divise par sa valeur absolue : le signe indique toujours s’il y a eu amélioration.",
    ],
    ejemplo: [
      `Un produit qui coûtait ${m(antes)} et coûte maintenant ${m(despues)} a augmenté de 25 %.`,
      "Pour revenir à l’ancien prix, il faudrait une baisse de 20 %, et non de 25 %.",
    ],
    faq: [
      {
        pregunta: "Comment calculer un pourcentage d’augmentation ?",
        respuesta: "Retirez l’ancienne valeur de la nouvelle, divisez par l’ancienne valeur, puis multipliez par 100. De 80 à 100 : 20 ÷ 80 × 100 = 25 %.",
      },
      {
        pregunta: "Comment calculer un pourcentage de baisse ?",
        respuesta: "Le calcul est le même. De 100 à 80 : −20 ÷ 100 × 100 = −20 %. La valeur a donc baissé de 20 %.",
      },
      {
        pregunta: "Pourquoi une hausse de 25 % et une baisse de 25 % ne s’annulent-elles pas ?",
        respuesta: "Chaque pourcentage porte sur une base différente. 80 plus 25 % donne 100, mais 100 moins 25 % donne 75.",
      },
      {
        pregunta: "Quelle différence entre pourcentage et point de pourcentage ?",
        respuesta: "Si un taux passe de 10 % à 12 %, il gagne 2 points. En taux d’évolution, il augmente de 20 %.",
      },
    ],
    glosario: [
      { termino: "Taux d’évolution", definicion: "La variation d’une valeur, exprimée en pourcentage de sa valeur de départ." },
      { termino: "Point de pourcentage", definicion: "La simple différence entre deux pourcentages." },
      { termino: "Coefficient multiplicateur", definicion: "Le nombre par lequel on multiplie la valeur de départ pour obtenir celle d’arrivée (1,25 pour une hausse de 25 %)." },
    ],
  };
};
