import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoFr: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const piezas = Math.ceil((150 * 1.1) / 1 - 1e-9);
        return [
          `Pour 150 ft² en carreaux de 12 × 12 in (1 ft² chacun) avec 10 % de marge, il faut ${n(piezas, 0)} carreaux.`,
          `Avec 10 carreaux par carton, cela fait ${n(Math.ceil(piezas / 10), 0)} cartons.`,
        ];
      })()
    : (() => {
        const pieza = 0.6 * 0.6;
        const piezas = Math.ceil((20 * 1.1) / pieza - 1e-9);
        return [
          `Pour 20 m² en carreaux de 60 × 60 cm (${n(pieza)} m² chacun) avec 10 % de marge, il faut ${n(piezas, 0)} carreaux.`,
          `Avec 4 carreaux par carton, cela fait ${n(Math.ceil(piezas / 4), 0)} cartons.`,
        ];
      })();
  return {
    h1: "Calcul de carrelage",
    title: tituloQueEntre(`Calcul de carrelage : nombre de carreaux (${ctx.nombrePais})`, `Calcul de carrelage (${ctx.nombrePais})`, "Calcul de carrelage"),
    description: "Calculez combien de carreaux il vous faut pour un sol ou un mur, marge pour les chutes comprise, et combien de cartons acheter.",
    intro: [
      "Saisissez la surface, les dimensions d’un carreau et le nombre de carreaux par carton. Vous voyez combien de carreaux et de cartons acheter.",
      "La marge couvre les coupes en bordure et les carreaux qui cassent.",
    ],
    comoSeCalcula: [
      `Surface d’un carreau = longueur × largeur, convertie en ${imperial ? "pieds carrés" : "mètres carrés"}.`,
      "Carreaux = surface × (1 + marge ÷ 100) ÷ surface d’un carreau, arrondi au-dessus.",
      "Cartons = carreaux ÷ carreaux par carton, arrondi au-dessus.",
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Quelle marge prévoir pour les chutes ?",
        respuesta: "10 % en pose droite. En pose diagonale, à chevrons ou dans une pièce avec beaucoup de découpes, 15 % à 20 %.",
      },
      {
        pregunta: "Faut-il tenir compte des joints ?",
        respuesta: "Non. Les joints ne font que quelques millimètres et la marge couvre déjà la différence.",
      },
      {
        pregunta: "Faut-il acheter quelques carreaux en plus ?",
        respuesta: "Oui, quelques-uns du même bain. Si un carreau casse plus tard, il peut être difficile de retrouver exactement la même teinte.",
      },
    ],
    glosario: [
      { termino: "Chutes", definicion: "Les morceaux de carreaux perdus lors des coupes. On les prévoit avec une marge en pourcentage." },
      { termino: "Bain", definicion: "Le lot de fabrication. Des carreaux de bains différents peuvent varier légèrement de teinte." },
    ],
  };
};
