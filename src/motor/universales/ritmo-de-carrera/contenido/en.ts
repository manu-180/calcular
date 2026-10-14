import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DISTANCIAS_KM, KM_POR_MILLA, reloj, ritmoTexto } from "../definicion";

export const contenidoEn: ContenidoUniversal = (ctx) => {
  const imperial = ctx.unidades === "imperial";
  const u = imperial ? "mile" : "km";
  const corto = imperial ? "mi" : "km";
  const media = imperial ? DISTANCIAS_KM.media / KM_POR_MILLA : DISTANCIAS_KM.media;
  const ritmoMedia = imperial ? 9 * 60 : 5 * 60 + 30;
  return {
    h1: "Running pace calculator",
    title: tituloQueEntre(`Running pace calculator for ${ctx.nombrePais}`, "Running pace calculator"),
    description: `Work out your pace per ${u}, your finish time or your distance for a 5K, 10K, half marathon or marathon.`,
    intro: [
      "With two of the three figures (distance, time and pace) you get the third. Use it to plan a race or check a training run.",
      "The 5K, 10K, half marathon and marathon distances are built in.",
    ],
    comoSeCalcula: [
      `Pace = time ÷ distance, in minutes and seconds per ${u}.`,
      "Time = pace × distance.",
      "Distance = time ÷ pace. Average speed is the distance divided by the hours.",
    ],
    ejemplo: imperial
      ? [
          `3 miles in 27 minutes is a pace of 9:00 per mile, at ${formatearNumero(ctx, 20 / 3, 2)} mph.`,
          `A half marathon (${formatearNumero(ctx, media, 2)} mi) at ${ritmoTexto(ritmoMedia)} per mile finishes in ${reloj(ritmoMedia * media)}.`,
        ]
      : [
          "10 km in 50 minutes is a pace of 5:00 per km, at 12 km/h.",
          `A half marathon (${formatearNumero(ctx, media, 1)} ${corto}) at ${ritmoTexto(ritmoMedia)} per km finishes in ${reloj(ritmoMedia * media)}.`,
        ],
    faq: [
      {
        pregunta: `How do I work out my pace per ${u}?`,
        respuesta: imperial
          ? `Turn the time into minutes and divide by the miles. 3 miles in 28 minutes and 30 seconds is ${formatearNumero(ctx, 9.5, 1)} minutes per mile, or 9:30.`
          : `Turn the time into minutes and divide by the kilometres. 10 km in 55 minutes is ${formatearNumero(ctx, 5.5, 1)} minutes per km, or 5:30.`,
      },
      {
        pregunta: "What is a good pace for a beginner?",
        respuesta: "One that still lets you talk while you run. That pace drops as your fitness builds.",
      },
      {
        pregunta: "How long is a marathon?",
        respuesta: `${formatearNumero(ctx, DISTANCIAS_KM.maraton, 3)} km (${formatearNumero(ctx, DISTANCIAS_KM.maraton / KM_POR_MILLA, 1)} miles). A half marathon is half that.`,
      },
    ],
    glosario: [
      { termino: "Pace", definicion: "How long it takes to cover one kilometre or one mile." },
      { termino: "Average speed", definicion: "The distance covered per hour." },
    ],
  };
};
