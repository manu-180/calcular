import { formatearNumero, segunTrato, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DEFICIT, FACTORES, mifflin, SUPERAVIT } from "../definicion";

export const contenidoEs: ContenidoUniversal = (ctx) => {
  const t = (tu: string, usted: string, vos: string) => segunTrato(ctx.trato, { tu, usted, vos });
  const n = (x: number, d = 0) => formatearNumero(ctx, x, d);
  const basal = mifflin("mujer", 30, 60, 165);
  const mant = basal * FACTORES.moderada;
  return {
    h1: "Calculadora de calorías diarias",
    title: tituloQueEntre(`Calorías diarias: calculadora en ${ctx.nombrePais}`, `Calorías diarias en ${ctx.nombrePais}`, "Calculadora de calorías diarias"),
    description: t(
      "Calcula cuántas calorías gastas por día según tu edad, peso, altura y actividad, y cuántas comer para mantener, bajar o subir de peso.",
      "Calcule cuántas calorías gasta por día según su edad, peso, altura y actividad, y cuántas comer para mantener, bajar o subir de peso.",
      "Calculá cuántas calorías gastás por día según tu edad, peso, altura y actividad, y cuántas comer para mantener, bajar o subir de peso.",
    ),
    intro: [
      t(
        "Completa tus datos y tu nivel de actividad. Ves tu metabolismo basal y las calorías que gastas en un día normal.",
        "Complete sus datos y su nivel de actividad. Verá su metabolismo basal y las calorías que gasta en un día normal.",
        "Completá tus datos y tu nivel de actividad. Ves tu metabolismo basal y las calorías que gastás en un día normal.",
      ),
      "Es una estimación orientativa. No reemplaza la consulta con un profesional de la salud o de la nutrición.",
    ],
    comoSeCalcula: [
      `Metabolismo basal (fórmula de Mifflin-St Jeor): 10 × peso en kg + ${n(6.25, 2)} × altura en cm − 5 × edad, más 5 en hombres o menos 161 en mujeres.`,
      `Calorías de mantenimiento = metabolismo basal × factor de actividad, que va de ${n(1.2, 1)} (poca actividad) a ${n(1.9, 1)} (muy alta).`,
      `Para bajar de peso se restan ${DEFICIT} kcal por día y para subir se suman ${SUPERAVIT}: un cambio moderado y sostenible.`,
    ],
    ejemplo: [
      `Una mujer de 30 años, 60 kg y 165 cm tiene un metabolismo basal de unas ${n(basal)} kcal.`,
      `Con actividad moderada, mantiene su peso con unas ${n(mant)} kcal por día. Para bajar de peso, unas ${n(mant - DEFICIT)}.`,
    ],
    faq: [
      {
        pregunta: "¿Qué es el metabolismo basal?",
        respuesta: "Es la energía que usa el cuerpo en reposo total para respirar, mantener la temperatura y que los órganos funcionen.",
      },
      {
        pregunta: "¿Cuántas calorías hay que comer para bajar de peso?",
        respuesta: `Un punto de partida habitual es comer unas ${DEFICIT} kcal menos que las de mantenimiento. Lo ideal es definirlo con un profesional.`,
      },
      {
        pregunta: "¿Qué tan exacta es la fórmula?",
        respuesta: "Mifflin-St Jeor es una de las más usadas, pero es un promedio. La genética, la masa muscular y la salud cambian el gasto real.",
      },
    ],
    glosario: [
      { termino: "Caloría (kcal)", definicion: "Unidad de energía de los alimentos y del gasto del cuerpo." },
      { termino: "Metabolismo basal", definicion: "Las calorías que el cuerpo gasta en reposo total." },
    ],
  };
};
