import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DISTANCIAS_KM, KM_POR_MILLA, reloj, ritmoTexto } from "../definicion";

export const contenidoUk: ContenidoUniversal = (ctx) => {
  const imperial = ctx.unidades === "imperial";
  const u = imperial ? "милю" : "кілометр";
  const corto = imperial ? "mi" : "км";
  const media = imperial ? DISTANCIAS_KM.media / KM_POR_MILLA : DISTANCIAS_KM.media;
  const ritmoMedia = imperial ? 9 * 60 : 5 * 60 + 30;
  return {
    h1: "Калькулятор темпу бігу",
    title: tituloQueEntre(`Калькулятор темпу бігу: ${ctx.nombrePais}`, "Калькулятор темпу бігу (pace)", "Калькулятор темпу бігу"),
    description: `Розрахуйте темп на ${u}, час на фініші або дистанцію для забігу на 5 км, 10 км, напівмарафону чи марафону.`,
    intro: [
      "Введіть два з трьох значень (дистанцію, час або темп), і ви побачите третє. Скористайтеся цим, щоб спланувати забіг чи перевірити тренування.",
      "Дистанції 5 км, 10 км, напівмарафону й марафону вже є у списку.",
    ],
    comoSeCalcula: [
      `Темп = час ÷ дистанція, у хвилинах і секундах на ${u}.`,
      "Час = темп × дистанція.",
      "Дистанція = час ÷ темп. Середня швидкість дорівнює дистанції, поділеній на кількість годин.",
    ],
    ejemplo: imperial
      ? [
          `Якщо пробігти 3 милі за 27 хвилин, темп становить 9:00 на милю, а середня швидкість ${formatearNumero(ctx, 20 / 3, 2)} mph.`,
          `Напівмарафон (${formatearNumero(ctx, media, 2)} mi) у темпі ${ritmoTexto(ritmoMedia)} на милю можна пробігти за ${reloj(ritmoMedia * media)}.`,
        ]
      : [
          "Якщо пробігти 10 км за 50 хвилин, темп становить 5:00 на кілометр, а середня швидкість 12 км/год.",
          `Напівмарафон (${formatearNumero(ctx, media, 1)} ${corto}) у темпі ${ritmoTexto(ritmoMedia)} на кілометр можна пробігти за ${reloj(ritmoMedia * media)}.`,
        ],
    faq: [
      {
        pregunta: `Як розрахувати темп на ${u}?`,
        respuesta: imperial
          ? `Переведіть час у хвилини і поділіть на кількість миль. 3 милі за 28 хвилин 30 секунд дають ${formatearNumero(ctx, 9.5, 1)} хвилини на милю, тобто 9:30.`
          : `Переведіть час у хвилини і поділіть на кількість кілометрів. 10 км за 55 хвилин дають ${formatearNumero(ctx, 5.5, 1)} хвилини на кілометр, тобто 5:30.`,
      },
      {
        pregunta: "Який темп підходить початківцю?",
        respuesta: "Той, за якого ви можете розмовляти під час бігу. З покращенням форми цей темп стає швидшим.",
      },
      {
        pregunta: "Скільки кілометрів у марафоні?",
        respuesta: `${formatearNumero(ctx, DISTANCIAS_KM.maraton, 3)} км (${formatearNumero(ctx, DISTANCIAS_KM.maraton / KM_POR_MILLA, 1)} милі). Напівмарафон удвічі коротший.`,
      },
    ],
    glosario: [
      { termino: "Темп (pace)", definicion: "Час, за який ви пробігаєте один кілометр або одну милю." },
      { termino: "Середня швидкість", definicion: "Відстань, яку ви долаєте за годину." },
    ],
  };
};
