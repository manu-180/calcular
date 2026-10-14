import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DEFICIT, FACTORES, mifflin, SUPERAVIT } from "../definicion";

export const contenidoFr: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 0) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const basal = mifflin("hombre", 35, 180 * 0.45359237, 70 * 2.54);
        return [
          `Un homme de 35 ans, 180 lb et 5 pieds 10 pouces a un métabolisme de base d’environ ${n(basal)} kcal.`,
          `Avec peu d’activité, il garde son poids avec environ ${n(basal * FACTORES.sedentaria)} kcal par jour.`,
        ];
      })()
    : (() => {
        const basal = mifflin("mujer", 30, 60, 165);
        return [
          `Une femme de 30 ans, 60 kg et 165 cm a un métabolisme de base d’environ ${n(basal)} kcal.`,
          `Avec une activité modérée, elle garde son poids avec environ ${n(basal * FACTORES.moderada)} kcal par jour.`,
        ];
      })();
  return {
    h1: "Calcul des besoins caloriques journaliers",
    title: tituloQueEntre(`Calcul des besoins caloriques (${ctx.nombrePais})`, "Calcul des besoins caloriques", "Besoins caloriques"),
    description: "Calculez combien de calories vous dépensez par jour selon votre âge, poids, taille et activité, et combien en manger pour garder, perdre ou prendre du poids.",
    intro: [
      "Remplissez vos données et votre niveau d’activité. Vous voyez votre métabolisme de base et les calories que vous dépensez une journée normale.",
      "C’est une estimation. Elle ne remplace pas l’avis d’un professionnel de santé ou d’un diététicien.",
    ],
    comoSeCalcula: [
      `Métabolisme de base (Mifflin-St Jeor) : 10 × poids en kg + ${n(6.25, 2)} × taille en cm − 5 × âge, plus 5 pour un homme ou moins 161 pour une femme.`,
      `Calories d’entretien = métabolisme de base × coefficient d’activité, de ${n(1.2, 1)} (peu d’activité) à ${n(1.9, 1)} (très élevée).`,
      `Pour perdre du poids, le calcul retire ${DEFICIT} kcal par jour. Pour en prendre, il en ajoute ${SUPERAVIT}. C’est un changement modéré, tenable dans la durée.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Qu’est-ce que le métabolisme de base ?",
        respuesta: "C’est l’énergie que votre corps utilise au repos complet pour respirer, maintenir sa température et faire fonctionner les organes.",
      },
      {
        pregunta: "Combien de calories manger pour perdre du poids ?",
        respuesta: `Un point de départ courant est d’environ ${DEFICIT} kcal par jour sous vos calories d’entretien. Le mieux est de le fixer avec un professionnel.`,
      },
      {
        pregunta: "Cette formule est-elle précise ?",
        respuesta: "Mifflin-St Jeor fait partie des plus utilisées, mais elle donne une moyenne. La génétique, la masse musculaire et l’état de santé changent ce que vous dépensez vraiment.",
      },
    ],
    glosario: [
      { termino: "Calorie (kcal)", definicion: "L’unité d’énergie des aliments et de ce que dépense le corps." },
      { termino: "Métabolisme de base", definicion: "Les calories que votre corps dépense au repos complet." },
      { termino: "Calories d’entretien", definicion: "Les calories qui permettent de garder le même poids." },
    ],
  };
};
