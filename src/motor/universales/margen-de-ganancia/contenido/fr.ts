import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { precioConMargen } from "../definicion";

export const contenidoFr: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)} %`;
  const costo = montoEjemplo(ctx, 60);
  const precio = montoEjemplo(ctx, 100);
  return {
    h1: "Calcul du taux de marge et du taux de marque",
    title: tituloQueEntre(`Calcul du taux de marge et du taux de marque (${ctx.nombrePais})`, `Calcul du taux de marge (${ctx.nombrePais})`, "Calcul du taux de marge"),
    description: "Calculez le taux de marge et le taux de marque à partir du coût et du prix, ou le prix de vente qui permet d’atteindre le taux voulu.",
    intro: [
      "Taux de marge et taux de marque sont souvent confondus, et l’erreur peut coûter cher. Les deux mesurent la même marge, mais pas sur la même base.",
      "Saisissez le coût et le prix : vous voyez les deux taux. Ou choisissez un taux et le calcul vous donne le prix à pratiquer.",
    ],
    comoSeCalcula: [
      "Marge = prix de vente HT − coût d’achat HT.",
      "Taux de marge = marge ÷ coût d’achat × 100.",
      "Taux de marque = marge ÷ prix de vente × 100.",
      "Prix pour un taux de marque visé = coût ÷ (1 − taux ÷ 100).",
    ],
    ejemplo: [
      `Un produit acheté ${m(costo)} et vendu ${m(precio)} dégage ${m(precio - costo)} de marge : un taux de marge de ${p(((precio - costo) / costo) * 100)} et un taux de marque de ${p(((precio - costo) / precio) * 100)}.`,
      `Pour un taux de marque de 50 % sur ce coût, il faut vendre ${m(precioConMargen(costo, 50))}. Ajouter 50 % au coût ne donne qu’un taux de marque de ${p(100 / 3)}.`,
    ],
    faq: [
      {
        pregunta: "Quelle différence entre taux de marge et taux de marque ?",
        respuesta: "Le taux de marge rapporte la marge au coût d’achat. Le taux de marque la rapporte au prix de vente. Pour une même marge, le taux de marge est toujours le plus élevé.",
      },
      {
        pregunta: "Comment fixer un prix pour un taux de marque visé ?",
        respuesta: `Divisez le coût par (1 − taux de marque). Pour 30 %, divisez le coût par ${formatearNumero(ctx, 0.7, 2)}. N’ajoutez pas 30 % au coût : vous gagneriez moins que prévu.`,
      },
      {
        pregunta: "Faut-il calculer avec ou sans TVA ?",
        respuesta: "Toujours hors taxes. La TVA ne vous appartient pas : l’inclure gonfle la marge sur le papier.",
      },
      {
        pregunta: "Qu’est-ce que le coefficient multiplicateur ?",
        respuesta: `Le nombre par lequel on multiplie le coût pour obtenir le prix de vente. Ici, ${m(precio)} ÷ ${m(costo)} = ${formatearNumero(ctx, precio / costo, 2)}.`,
      },
    ],
    glosario: [
      { termino: "Taux de marge", definicion: "La marge en pourcentage du coût d’achat HT." },
      { termino: "Taux de marque", definicion: "La marge en pourcentage du prix de vente HT." },
      { termino: "Coefficient multiplicateur", definicion: "Le rapport entre le prix de vente et le coût d’achat." },
    ],
  };
};
