import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DISTANCIAS_KM, KM_POR_MILLA, reloj, ritmoTexto } from "../definicion";

export const contenidoRu: ContenidoUniversal = (ctx) => {
  const imperial = ctx.unidades === "imperial";
  const u = imperial ? "милю" : "километр";
  const media = imperial ? DISTANCIAS_KM.media / KM_POR_MILLA : DISTANCIAS_KM.media;
  const ritmoMedia = imperial ? 9 * 60 : 5 * 60 + 30;
  return {
    h1: "Калькулятор темпа бега",
    title: tituloQueEntre(`Калькулятор темпа бега: ${ctx.nombrePais}`, "Калькулятор темпа бега", "Темп бега"),
    description: `Рассчитайте темп на ${u}, время на финише или дистанцию для забега на 5 км, 10 км, полумарафона или марафона.`,
    intro: [
      "Зная две величины из трех (дистанцию, время и темп), вы получите третью. Калькулятор помогает спланировать забег или проверить тренировку.",
      "Дистанции 5 км, 10 км, полумарафона и марафона уже заданы.",
    ],
    comoSeCalcula: [
      `Темп = время ÷ дистанция, в минутах и секундах на ${u}.`,
      "Время = темп × дистанция.",
      "Дистанция = время ÷ темп. Средняя скорость равна дистанции, деленной на время в часах.",
    ],
    ejemplo: imperial
      ? [
          `3 мили за 27 минут дают темп 9:00 на милю и скорость ${formatearNumero(ctx, 20 / 3, 2)} миль/ч.`,
          `Полумарафон (${formatearNumero(ctx, media, 2)} мили) в темпе ${ritmoTexto(ritmoMedia)} на милю занимает ${reloj(ritmoMedia * media)}.`,
        ]
      : [
          "10 км за 50 минут дают темп 5:00 на километр и скорость 12 км/ч.",
          `Полумарафон (${formatearNumero(ctx, media, 1)} км) в темпе ${ritmoTexto(ritmoMedia)} на километр занимает ${reloj(ritmoMedia * media)}.`,
        ],
    faq: [
      {
        pregunta: `Как рассчитать темп бега на ${u}?`,
        respuesta: imperial
          ? `Переведите время в минуты и разделите на число миль. 3 мили за 28 минут 30 секунд дают ${formatearNumero(ctx, 9.5, 1)} минуты на милю, то есть 9:30.`
          : `Переведите время в минуты и разделите на число километров. 10 км за 55 минут дают ${formatearNumero(ctx, 5.5, 1)} минуты на километр, то есть 5:30.`,
      },
      {
        pregunta: "Какой темп подходит начинающему бегуну?",
        respuesta: "Тот, при котором вы можете разговаривать на бегу. По мере тренировок темп постепенно становится быстрее.",
      },
      {
        pregunta: "Сколько километров в марафоне?",
        respuesta: `${formatearNumero(ctx, DISTANCIAS_KM.maraton, 3)} км (${formatearNumero(ctx, DISTANCIAS_KM.maraton / KM_POR_MILLA, 1)} мили). Полумарафон вдвое короче.`,
      },
    ],
    glosario: [
      { termino: "Темп", definicion: "Время, за которое вы пробегаете один километр или одну милю." },
      { termino: "Средняя скорость", definicion: "Расстояние, которое вы преодолеваете за час." },
    ],
  };
};
