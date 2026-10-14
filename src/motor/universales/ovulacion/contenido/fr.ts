import { aDia, aFecha, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { FASE_LUTEA, ventana } from "../definicion";

export const contenidoFr: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const fum = "2026-03-05";
  const v = ventana(aDia(fum), 28);
  return {
    h1: "Calcul de l’ovulation et de la période fertile",
    title: tituloQueEntre(`Calcul de l’ovulation et période fertile (${ctx.nombrePais})`, `Calcul de l’ovulation (${ctx.nombrePais})`, "Calcul de l’ovulation"),
    description: "Estimez votre jour d’ovulation, votre période fertile et la date de vos prochaines règles, avec les trois cycles suivants.",
    intro: [
      "Indiquez le premier jour de vos dernières règles et la durée de votre cycle. Vous voyez l’ovulation estimée, vos jours fertiles et vos prochaines règles.",
      "C’est une estimation pour des cycles réguliers. Ce n’est pas une méthode de contraception et cela ne remplace pas l’avis d’un professionnel de santé.",
    ],
    comoSeCalcula: [
      `L’ovulation a lieu en général ${FASE_LUTEA} jours avant les règles suivantes : premier jour des dernières règles + durée du cycle − ${FASE_LUTEA}.`,
      "La période fertile va de 5 jours avant l’ovulation au lendemain, car les spermatozoïdes peuvent survivre jusqu’à 5 jours.",
      "Les prochaines règles arrivent un cycle après les dernières.",
    ],
    ejemplo: [
      `Avec des dernières règles le ${f(fum)} et un cycle de 28 jours, l’ovulation est estimée au ${f(aFecha(v.ovulacion))}.`,
      `La période fertile va du ${f(aFecha(v.desde))} au ${f(aFecha(v.hasta))}, et les prochaines règles sont attendues le ${f(aFecha(v.proxima))}.`,
    ],
    faq: [
      {
        pregunta: "Quels sont les jours les plus fertiles ?",
        respuesta: "Les deux ou trois jours avant l’ovulation et le jour de l’ovulation. La période fertile dure environ 6 jours.",
      },
      {
        pregunta: "Le calcul marche-t-il avec un cycle irrégulier ?",
        respuesta: "Il donne une idée, mais moins précise. Avec un cycle irrégulier, l’ovulation peut se décaler de plusieurs jours d’un mois à l’autre.",
      },
      {
        pregunta: "Peut-on s’en servir pour éviter une grossesse ?",
        respuesta: "Non. L’estimation est approximative et l’ovulation peut arriver plus tôt ou plus tard. Pour éviter une grossesse, utilisez une méthode de contraception.",
      },
    ],
    glosario: [
      { termino: "Ovulation", definicion: "Le moment où un ovaire libère un ovule." },
      { termino: "Période fertile", definicion: "Les jours du cycle où une grossesse est possible." },
      { termino: "Phase lutéale", definicion: `La période entre l’ovulation et les règles suivantes, d’environ ${FASE_LUTEA} jours.` },
    ],
  };
};
