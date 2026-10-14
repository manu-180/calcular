import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoFr: ContenidoUniversal = (ctx) => {
  const precio = montoEjemplo(ctx, 80);
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Calcul de remise",
    title: tituloQueEntre(`Calcul de remise et prix soldé (${ctx.nombrePais})`, `Calcul de remise (${ctx.nombrePais})`, "Calcul de remise"),
    description: "Calculez le prix après remise et ce que vous économisez, même quand deux remises se cumulent, comme 30 % puis 10 % de plus.",
    intro: [
      "Indiquez le prix et le pourcentage de remise : vous voyez tout de suite ce que vous payez et ce que vous économisez.",
      "Si une remise supplémentaire s’applique, ajoutez-la aussi. Deux remises successives ne s’additionnent jamais.",
    ],
    comoSeCalcula: [
      "Prix après remise = prix initial × (1 − remise ÷ 100).",
      "La deuxième remise s’applique au prix déjà réduit par la première.",
      "L’économie est la différence entre le prix initial et le prix après remise.",
    ],
    ejemplo: [
      `Un article à ${m(precio)} avec 25 % de remise revient à ${m(precio * 0.75)}.`,
      `Avec 30 % de remise puis 10 % de plus, il revient à ${m(precio * 0.7 * 0.9)}. La remise totale est de 37 %, pas de 40 %.`,
    ],
    faq: [
      {
        pregunta: "Comment calculer une remise ?",
        respuesta: "Multipliez le prix par le pourcentage, puis divisez par 100. Vous obtenez le montant de la remise. Retirez-le du prix pour savoir ce que vous payez.",
      },
      {
        pregunta: "30 % puis 10 % de remise, est-ce la même chose que 40 % ?",
        respuesta: "Non. La deuxième remise porte sur le prix déjà réduit. Au total, la remise est de 37 %.",
      },
      {
        pregunta: "Comment retrouver le prix avant remise ?",
        respuesta: `Divisez le prix soldé par (1 − remise ÷ 100). Avec 25 % de remise, divisez par ${formatearNumero(ctx, 0.75, 2)}.`,
      },
      {
        pregunta: "Comment trouver le pourcentage de remise à partir de deux prix ?",
        respuesta: `Faites (prix initial − prix soldé) ÷ prix initial × 100. Un article passé de ${m(precio)} à ${m(precio * 0.75)} a une remise de 25 %.`,
      },
    ],
    glosario: [
      { termino: "Remise", definicion: "Le pourcentage retiré du prix initial." },
      { termino: "Prix barré", definicion: "Le prix initial, affiché à côté du prix soldé." },
      { termino: "Remise totale", definicion: "Le pourcentage réellement économisé quand plusieurs remises se cumulent." },
    ],
  };
};
