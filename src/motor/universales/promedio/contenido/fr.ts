import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

const NOTES: readonly (readonly [number, number])[] = [
  [12, 2],
  [15, 3],
  [9, 1],
];

export const contenidoFr: ContenidoUniversal = (ctx) => {
  const n = (x: number) => formatearNumero(ctx, x, Number.isInteger(x) ? 0 : 2);
  const sommeCoef = NOTES.reduce((s, [, c]) => s + c, 0);
  const ponderee = NOTES.reduce((s, [v, c]) => s + v * c, 0) / sommeCoef;
  const simple = NOTES.reduce((s, [v]) => s + v, 0) / NOTES.length;
  return {
    h1: "Calcul de moyenne avec coefficients",
    title: tituloQueEntre(`Calcul de moyenne avec coefficients (${ctx.nombrePais})`, `Moyenne pondérée (${ctx.nombrePais})`, "Calcul de moyenne pondérée"),
    description: "Calculez votre moyenne, simple ou pondérée, avec jusqu’à 10 notes et le coefficient de chacune : pourcentage, crédits ou nombre de fois.",
    intro: [
      "Saisissez chaque note et son coefficient. Vous voyez la moyenne pondérée et, à côté, la moyenne simple.",
      "Utile pour le bulletin, le bac, les partiels ou toute moyenne où certaines valeurs comptent plus que d’autres.",
    ],
    comoSeCalcula: [
      "Moyenne simple = somme des notes ÷ nombre de notes.",
      "Moyenne pondérée = somme des (note × coefficient) ÷ somme des coefficients.",
      "Les coefficients n’ont pas besoin de faire 100 : le calcul divise par leur total.",
    ],
    ejemplo: [
      `Avec 12/20 coefficient 2, 15/20 coefficient 3 et 9/20 coefficient 1, la moyenne pondérée est de ${n(ponderee)}/20.`,
      `La moyenne simple de ces trois notes est de ${n(simple)}/20 : le 15, plus coefficienté, tire la moyenne pondérée vers le haut.`,
    ],
    faq: [
      {
        pregunta: "Comment calculer une moyenne avec des coefficients ?",
        respuesta: "Multipliez chaque note par son coefficient, additionnez le tout, puis divisez par la somme des coefficients.",
      },
      {
        pregunta: "Et si les coefficients ne font pas 100 % ?",
        respuesta: "Aucun problème. Si une matière vaut 6 crédits et une autre 4, saisissez 6 et 4. Le calcul divise par le total des coefficients.",
      },
      {
        pregunta: "Quelle différence entre moyenne simple et moyenne pondérée ?",
        respuesta: "Dans une moyenne simple, chaque note compte autant. Dans une moyenne pondérée, chacune compte selon son coefficient.",
      },
      {
        pregunta: "Mes notes sont sur 10 ou sur 100, ça marche ?",
        respuesta: "Oui, tant que toutes les notes sont sur le même barème. La moyenne sort sur ce même barème.",
      },
    ],
    glosario: [
      { termino: "Coefficient", definicion: "Le poids d’une note dans la moyenne finale." },
      { termino: "Moyenne pondérée", definicion: "Une moyenne où chaque note est multipliée par son coefficient." },
      { termino: "Barème", definicion: "La note maximale possible, par exemple sur 20." },
    ],
  };
};
