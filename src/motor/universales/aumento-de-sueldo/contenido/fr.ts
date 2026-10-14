import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aumentoReal } from "../definicion";

export const contenidoFr: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)} %`;
  const sueldo = montoEjemplo(ctx, 3000);
  return {
    h1: "Calcul d’une augmentation de salaire",
    title: tituloQueEntre(`Calcul d’une augmentation de salaire (${ctx.nombrePais})`, "Calcul d’une augmentation de salaire", "Augmentation de salaire"),
    description: "Calculez votre nouveau salaire après une augmentation, la différence par mois et par an, et votre augmentation réelle face à l’inflation.",
    intro: [
      "On vous propose une augmentation, ou vous allez en demander une. Saisissez votre salaire et l’augmentation, en pourcentage ou en montant, et voyez ce qui change chaque mois et chaque année.",
      "Ajoutez l’inflation de la période : le calcul vous dit si vous gagnez vraiment en pouvoir d’achat ou si vous ne faites que rattraper.",
    ],
    comoSeCalcula: [
      "Nouveau salaire = salaire actuel × (1 + augmentation ÷ 100).",
      "Différence par an = différence par mois × nombre de salaires par an.",
      "Augmentation réelle = (1 + augmentation) ÷ (1 + inflation) − 1.",
    ],
    ejemplo: [
      `Un salaire de ${m(sueldo)} par mois augmenté de 5 % passe à ${m(sueldo * 1.05)} : ${m(sueldo * 0.05)} de plus par mois et ${m(sueldo * 0.05 * 12)} de plus par an.`,
      `Si l’inflation a été de 3 % sur la période, l’augmentation réelle est de ${p(aumentoReal(5, 3))}. Avec 6 % d’inflation, elle tombe à ${p(aumentoReal(5, 6))}.`,
    ],
    faq: [
      {
        pregunta: "Qu’est-ce qu’une augmentation réelle ?",
        respuesta: "C’est votre augmentation une fois l’inflation déduite. Elle montre si votre nouveau salaire achète plus ou moins qu’avant.",
      },
      {
        pregunta: "Pourquoi ne pas simplement soustraire l’inflation ?",
        respuesta: `Parce que les deux pourcentages se multiplient, ils ne s’additionnent pas. Avec 5 % d’augmentation et 3 % d’inflation, l’augmentation réelle est de ${p(aumentoReal(5, 3))}, pas de 2 %. Quand l’inflation est forte, l’écart grandit beaucoup.`,
      },
      {
        pregunta: "Quelle augmentation demander ?",
        respuesta: "Au moins l’inflation depuis votre dernière augmentation, pour ne pas reculer. Au-delà, regardez ce que paient d’autres employeurs pour un poste comme le vôtre et comment votre poste a évolué.",
      },
    ],
    glosario: [
      { termino: "Augmentation nominale", definicion: "L’augmentation telle qu’elle apparaît sur la fiche de paie, avant inflation." },
      { termino: "Pouvoir d’achat", definicion: "Ce que votre salaire permet d’acheter." },
    ],
  };
};
