import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { KG_POR_LB, M_POR_PULGADA } from "../definicion";

export const contenidoFr: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const m = 69 * M_POR_PULGADA;
  const ejemplo = imperial
    ? [
        `Une personne de 160 lb mesurant 5 pieds 9 pouces a un IMC de ${n((160 * KG_POR_LB) / (m * m))} : un poids normal.`,
        `À cette taille, le poids normal va de ${n((18.5 * m * m) / KG_POR_LB)} à ${n((24.9 * m * m) / KG_POR_LB)} lb.`,
      ]
    : [
        `Une personne de 70 kg mesurant ${n(1.75, 2)} m a un IMC de ${n(70 / (1.75 * 1.75))} : un poids normal.`,
        `À cette taille, le poids normal va de ${n(18.5 * 1.75 * 1.75)} à ${n(24.9 * 1.75 * 1.75)} kg.`,
      ];
  return {
    h1: "Calcul de l’IMC",
    title: tituloQueEntre(`Calcul de l’IMC, indice de masse corporelle (${ctx.nombrePais})`, `Calcul de l’IMC (${ctx.nombrePais})`, "Calcul de l’IMC"),
    description: "Calculez votre indice de masse corporelle à partir du poids et de la taille, avec la catégorie de l’OMS et le poids normal pour votre taille.",
    intro: [
      "Saisissez votre poids et votre taille. Vous voyez votre IMC, sa catégorie selon l’Organisation mondiale de la santé et la fourchette de poids normal pour votre taille.",
      "C’est un repère général pour les adultes. Il ne remplace pas l’avis d’un professionnel de santé.",
    ],
    comoSeCalcula: [
      imperial
        ? "IMC = poids en livres × 703 ÷ (taille en pouces × taille en pouces)."
        : "IMC = poids en kilos ÷ (taille en mètres × taille en mètres).",
      `En dessous de ${n(18.5)}, c’est une insuffisance pondérale. De ${n(18.5)} à ${n(24.9)}, un poids normal. De 25 à ${n(29.9)}, un surpoids. À partir de 30, une obésité.`,
      `Le poids normal est celui qui donne, à votre taille, un IMC entre ${n(18.5)} et ${n(24.9)}.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Quel est un IMC normal ?",
        respuesta: `Pour l’OMS, un IMC entre ${n(18.5)} et ${n(24.9)} chez l’adulte. La fourchette est la même pour les femmes et pour les hommes.`,
      },
      {
        pregunta: "L’IMC est-il valable pour tout le monde ?",
        respuesta: "Non. Il ne distingue pas le muscle de la graisse : une personne très musclée peut avoir un IMC élevé. Il s’utilise aussi autrement pendant la grossesse et chez l’enfant ou l’adolescent.",
      },
      {
        pregunta: "Comment calculer son IMC à la main ?",
        respuesta: `Divisez votre poids en kilos par votre taille en mètres au carré. Pour 70 kg et ${n(1.75, 2)} m : 70 ÷ (${n(1.75, 2)} × ${n(1.75, 2)}) = ${n(70 / (1.75 * 1.75))}.`,
      },
    ],
    glosario: [
      { termino: "IMC", definicion: "Indice de masse corporelle : le rapport entre votre poids et votre taille." },
      { termino: "OMS", definicion: "Organisation mondiale de la santé, qui définit les catégories d’IMC chez l’adulte." },
    ],
  };
};
