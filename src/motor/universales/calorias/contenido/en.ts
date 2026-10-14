import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DEFICIT, FACTORES, mifflin, SUPERAVIT } from "../definicion";

export const contenidoEn: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 0) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const basal = mifflin("hombre", 35, 180 * 0.45359237, 70 * 2.54);
        return [
          `A 35-year-old man who weighs 180 lb and is 5 ft 10 in tall has a basal metabolic rate of about ${n(basal)} kcal.`,
          `With little activity, he keeps his weight on about ${n(basal * FACTORES.sedentaria)} kcal a day.`,
        ];
      })()
    : (() => {
        const basal = mifflin("mujer", 30, 60, 165);
        return [
          `A 30-year-old woman who weighs 60 kg and is 165 cm tall has a basal metabolic rate of about ${n(basal)} kcal.`,
          `With moderate activity, she keeps her weight on about ${n(basal * FACTORES.moderada)} kcal a day.`,
        ];
      })();
  return {
    h1: "Daily calorie calculator",
    title: tituloQueEntre(`Calorie calculator for ${ctx.nombrePais}`, "Calorie calculator"),
    description: "Work out how many calories you burn a day from your age, weight, height and activity, and how many to eat to keep, lose or gain weight.",
    intro: [
      "Fill in your details and activity level. You see your basal metabolic rate and the calories you burn on a normal day.",
      "It is a rough estimate. It is not a substitute for advice from a health or nutrition professional.",
    ],
    comoSeCalcula: [
      `Basal metabolic rate (Mifflin-St Jeor): 10 × weight in kg + ${n(6.25, 2)} × height in cm − 5 × age, plus 5 for men or minus 161 for women.`,
      `Maintenance calories = basal rate × activity factor, from ${n(1.2, 1)} (little activity) to ${n(1.9, 1)} (very high).`,
      `To lose weight it takes off ${DEFICIT} kcal a day, and to gain it adds ${SUPERAVIT}: a moderate, sustainable change.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "What is basal metabolic rate?",
        respuesta: "It is the energy your body uses at complete rest to breathe, keep warm and keep your organs working.",
      },
      {
        pregunta: "How many calories should I eat to lose weight?",
        respuesta: `A common starting point is about ${DEFICIT} kcal a day below maintenance. It is best to set it with a professional.`,
      },
      {
        pregunta: "How accurate is the formula?",
        respuesta: "Mifflin-St Jeor is one of the most widely used, but it gives an average. Genetics, muscle mass and health change what you really burn.",
      },
    ],
    glosario: [
      { termino: "Calorie (kcal)", definicion: "The unit of energy in food and in what your body burns." },
      { termino: "Basal metabolic rate", definicion: "The calories your body burns at complete rest." },
    ],
  };
};
