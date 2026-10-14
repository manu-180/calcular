import { formatearNumero, segunTrato, type ContenidoUniversal } from "../../tipos";
import { KG_POR_LB, M_POR_PULGADA } from "../definicion";

export const contenidoEs: ContenidoUniversal = (ctx) => {
  const t = (tu: string, usted: string, vos: string) => segunTrato(ctx.trato, { tu, usted, vos });
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const m = 69 * M_POR_PULGADA;
  const ejemplo = imperial
    ? [
        `Una persona de 160 lb y 5 ft 9 in tiene un IMC de ${n((160 * KG_POR_LB) / (m * m))}: peso normal.`,
        `Para esa altura, el peso saludable va de ${n((18.5 * m * m) / KG_POR_LB)} a ${n((24.9 * m * m) / KG_POR_LB)} lb.`,
      ]
    : [
        `Una persona de 70 kg y ${n(1.75, 2)} m tiene un IMC de ${n(70 / (1.75 * 1.75))}: peso normal.`,
        `Para esa altura, el peso saludable va de ${n(18.5 * 1.75 * 1.75)} a ${n(24.9 * 1.75 * 1.75)} kg.`,
      ];
  return {
    h1: "Calculadora de IMC",
    title: `Calculadora de IMC en ${ctx.nombrePais}`,
    description: t(
      "Calcula tu índice de masa corporal con tu peso y tu altura, mira tu categoría según la OMS y el peso saludable para tu altura.",
      "Calcule su índice de masa corporal con su peso y su altura, vea su categoría según la OMS y el peso saludable para su altura.",
      "Calculá tu índice de masa corporal con tu peso y tu altura, mirá tu categoría según la OMS y el peso saludable para tu altura.",
    ),
    intro: [
      t(
        "Escribe tu peso y tu altura. Ves tu IMC (índice de masa corporal), la categoría según la Organización Mundial de la Salud y el rango de peso saludable para tu altura.",
        "Escriba su peso y su altura. Verá su IMC (índice de masa corporal), la categoría según la Organización Mundial de la Salud y el rango de peso saludable para su altura.",
        "Escribí tu peso y tu altura. Ves tu IMC (índice de masa corporal), la categoría según la Organización Mundial de la Salud y el rango de peso saludable para tu altura.",
      ),
      "Es un dato orientativo para adultos. No reemplaza la consulta con un profesional de la salud.",
    ],
    comoSeCalcula: [
      imperial
        ? "IMC = peso en libras × 703 ÷ (altura en pulgadas × altura en pulgadas)."
        : "IMC = peso en kilos ÷ (altura en metros × altura en metros).",
      `Menos de ${n(18.5)} es bajo peso. De ${n(18.5)} a ${n(24.9)}, peso normal. De 25 a ${n(29.9)}, sobrepeso. Desde 30, obesidad.`,
      `El rango de peso saludable es el que da un IMC entre ${n(18.5)} y ${n(24.9)} para esa altura.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "¿Cuál es el IMC normal?",
        respuesta: `Para la OMS, un IMC entre ${n(18.5)} y ${n(24.9)} en adultos. Es el mismo rango para mujeres y hombres.`,
      },
      {
        pregunta: "¿El IMC sirve para todos?",
        respuesta: "No. No distingue músculo de grasa, así que puede dar alto en personas muy musculosas. Tampoco se usa igual en el embarazo, en niños ni en adolescentes.",
      },
      {
        pregunta: "¿Cómo se calcula el IMC con la altura en centímetros?",
        respuesta: t(
          `Pasa la altura a metros dividiendo por 100. Con 170 cm, usa ${n(1.7, 2)}: el peso se divide por ${n(1.7, 2)} × ${n(1.7, 2)}.`,
          `Pase la altura a metros dividiendo por 100. Con 170 cm, use ${n(1.7, 2)}: el peso se divide por ${n(1.7, 2)} × ${n(1.7, 2)}.`,
          `Pasá la altura a metros dividiendo por 100. Con 170 cm, usá ${n(1.7, 2)}: el peso se divide por ${n(1.7, 2)} × ${n(1.7, 2)}.`,
        ),
      },
    ],
    glosario: [
      { termino: "IMC", definicion: "Índice de masa corporal: relación entre el peso y la altura." },
      { termino: "OMS", definicion: "Organización Mundial de la Salud, que define las categorías del IMC para adultos." },
    ],
  };
};
