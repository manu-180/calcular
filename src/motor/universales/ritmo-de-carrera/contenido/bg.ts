import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DISTANCIAS_KM, KM_POR_MILLA, reloj, ritmoTexto } from "../definicion";

export const contenidoBg: ContenidoUniversal = (ctx) => {
  const imperial = ctx.unidades === "imperial";
  const u = imperial ? "миля" : "километър";
  const media = imperial ? DISTANCIAS_KM.media / KM_POR_MILLA : DISTANCIAS_KM.media;
  const ritmoMedia = imperial ? 9 * 60 : 5 * 60 + 30;
  const za = GRAMATICA.bg.para(ctx.nombrePais);
  return {
    h1: "Калкулатор за темпо на бягане",
    title: tituloQueEntre(`Калкулатор за темпо на бягане ${za}`, "Калкулатор за темпо на бягане"),
    description: `Изчислете темпото си на ${u}, крайното време или разстоянието за 5 км, 10 км, полумаратон или маратон.`,
    intro: [
      "С две от трите стойности (разстояние, време и темпо) получавате третата. Използвайте го, за да планирате състезание или да проверите тренировка.",
      "Разстоянията за 5 км, 10 км, полумаратон и маратон са въведени предварително.",
    ],
    comoSeCalcula: [
      `Темпо = време ÷ разстояние, в минути и секунди на ${u}.`,
      "Време = темпо × разстояние.",
      "Разстояние = време ÷ темпо. Средната скорост е разстоянието, разделено на часовете.",
    ],
    ejemplo: imperial
      ? [
          `3 мили за 27 минути е темпо 9:00 на миля, при средна скорост ${formatearNumero(ctx, 20 / 3, 2)} мили/ч.`,
          `Полумаратон (${formatearNumero(ctx, media, 2)} мили) с темпо ${ritmoTexto(ritmoMedia)} на миля завършва за ${reloj(ritmoMedia * media)}.`,
        ]
      : [
          "10 км за 50 минути е темпо 5:00 на километър, при средна скорост 12 км/ч.",
          `Полумаратон (${formatearNumero(ctx, media, 1)} км) с темпо ${ritmoTexto(ritmoMedia)} на километър завършва за ${reloj(ritmoMedia * media)}.`,
        ],
    faq: [
      {
        pregunta: `Как да изчисля темпото си на ${u}?`,
        respuesta: imperial
          ? `Превърнете времето в минути и го разделете на милите. 3 мили за 28 минути и 30 секунди дават ${formatearNumero(ctx, 9.5, 1)} минути на миля, тоест 9:30.`
          : `Превърнете времето в минути и го разделете на километрите. 10 км за 55 минути дават ${formatearNumero(ctx, 5.5, 1)} минути на километър, тоест 5:30.`,
      },
      {
        pregunta: "Какво темпо е добро за начинаещ?",
        respuesta: "Такова, при което все още можете да говорите, докато бягате. С подобряването на формата това темпо става по-бързо.",
      },
      {
        pregunta: "Колко е дълъг маратонът?",
        respuesta: `${formatearNumero(ctx, DISTANCIAS_KM.maraton, 3)} км (${formatearNumero(ctx, DISTANCIAS_KM.maraton / KM_POR_MILLA, 1)} мили). Полумаратонът е наполовина.`,
      },
    ],
    glosario: [
      { termino: "Темпо", definicion: "Колко време Ви трябва, за да пробягате един километър или една миля." },
      { termino: "Средна скорост", definicion: "Разстоянието, изминато за един час." },
    ],
  };
};
