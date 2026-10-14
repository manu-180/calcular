import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { KG_POR_LB, M_POR_PULGADA } from "../definicion";

export const contenidoEn: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const m = 69 * M_POR_PULGADA;
  const ejemplo = imperial
    ? [
        `Someone who weighs 160 lb and is 5 ft 9 in tall has a BMI of ${n((160 * KG_POR_LB) / (m * m))}: a healthy weight.`,
        `At that height, a healthy weight is ${n((18.5 * m * m) / KG_POR_LB)} to ${n((24.9 * m * m) / KG_POR_LB)} lb.`,
      ]
    : [
        `Someone who weighs 70 kg and is ${n(1.75, 2)} m tall has a BMI of ${n(70 / (1.75 * 1.75))}: a healthy weight.`,
        `At that height, a healthy weight is ${n(18.5 * 1.75 * 1.75)} to ${n(24.9 * 1.75 * 1.75)} kg.`,
      ];
  return {
    h1: "BMI calculator",
    title: tituloQueEntre(`BMI calculator for ${ctx.nombrePais}`, "BMI calculator"),
    description: "Work out your body mass index from your weight and height, see your WHO category and the healthy weight range for your height.",
    intro: [
      "Enter your weight and height. You see your BMI, its category according to the World Health Organization and the healthy weight range for your height.",
      "It is a general guide for adults. It is not a substitute for advice from a health professional.",
    ],
    comoSeCalcula: [
      imperial ? "BMI = weight in pounds × 703 ÷ (height in inches × height in inches)." : "BMI = weight in kilos ÷ (height in metres × height in metres).",
      `Under ${n(18.5)} is underweight. ${n(18.5)} to ${n(24.9)} is a healthy weight. 25 to ${n(29.9)} is overweight. 30 and over is obesity.`,
      `The healthy weight range is the one that gives a BMI between ${n(18.5)} and ${n(24.9)} at your height.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "What is a normal BMI?",
        respuesta: `For the WHO, a BMI between ${n(18.5)} and ${n(24.9)} in adults. The range is the same for women and men.`,
      },
      {
        pregunta: "Does BMI work for everyone?",
        respuesta: "No. It can't tell muscle from fat, so very muscular people may score high. It is also used differently in pregnancy and for children and teenagers.",
      },
      {
        pregunta: "How do I work out BMI in pounds and inches?",
        respuesta: "Multiply your weight in pounds by 703, then divide by your height in inches squared. At 5 ft 9 in, that is 69 × 69.",
      },
    ],
    glosario: [
      { termino: "BMI", definicion: "Body mass index: how your weight relates to your height." },
      { termino: "WHO", definicion: "World Health Organization, which sets the adult BMI categories." },
    ],
  };
};
