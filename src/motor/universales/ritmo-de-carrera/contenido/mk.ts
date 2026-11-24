import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DISTANCIAS_KM, KM_POR_MILLA, reloj, ritmoTexto } from "../definicion";

export const contenidoMk: ContenidoUniversal = (ctx) => {
  const imperial = ctx.unidades === "imperial";
  const u = imperial ? "милја" : "километар";
  const media = imperial ? DISTANCIAS_KM.media / KM_POR_MILLA : DISTANCIAS_KM.media;
  const ritmoMedia = imperial ? 9 * 60 : 5 * 60 + 30;
  const za = GRAMATICA.mk.para(ctx.nombrePais);
  return {
    h1: "Калкулатор за темпо на трчање",
    title: tituloQueEntre(`Калкулатор за темпо на трчање ${za}`, "Калкулатор за темпо на трчање"),
    description: `Пресметајте темпо по ${u}, крајно време или растојание за 5 км, 10 км, полумаратон или маратон.`,
    intro: [
      "Со две од трите вредности (растојание, време и темпо) ја добивате третата. Користете го за да планирате трка или да проверите тренинг.",
      "Растојанијата за 5 км, 10 км, полумаратон и маратон се веќе внесени.",
    ],
    comoSeCalcula: [
      `Темпо = време ÷ растојание, во минути и секунди по ${u}.`,
      "Време = темпо × растојание.",
      "Растојание = време ÷ темпо. Просечната брзина е растојанието поделено со часовите.",
    ],
    ejemplo: imperial
      ? [
          `3 милји за 27 минути е темпо 9:00 по милја, со просечна брзина од ${formatearNumero(ctx, 20 / 3, 2)} милји/ч.`,
          `Полумаратон (${formatearNumero(ctx, media, 2)} милји) со темпо ${ritmoTexto(ritmoMedia)} по милја се завршува за ${reloj(ritmoMedia * media)}.`,
        ]
      : [
          "10 км за 50 минути е темпо 5:00 по километар, со просечна брзина од 12 км/ч.",
          `Полумаратон (${formatearNumero(ctx, media, 1)} км) со темпо ${ritmoTexto(ritmoMedia)} по километар се завршува за ${reloj(ritmoMedia * media)}.`,
        ],
    faq: [
      {
        pregunta: `Како да го пресметам темпото по ${u}?`,
        respuesta: imperial
          ? `Претворете го времето во минути и поделете го со милјите. 3 милји за 28 минути и 30 секунди даваат ${formatearNumero(ctx, 9.5, 1)} минути по милја, односно 9:30.`
          : `Претворете го времето во минути и поделете го со километрите. 10 км за 55 минути даваат ${formatearNumero(ctx, 5.5, 1)} минути по километар, односно 5:30.`,
      },
      {
        pregunta: "Кое темпо е добро за почетник?",
        respuesta: "Она при кое сè уште можете да зборувате додека трчате. Како што се подобрува формата, тоа темпо станува побрзо.",
      },
      {
        pregunta: "Колку е долг маратонот?",
        respuesta: `${formatearNumero(ctx, DISTANCIAS_KM.maraton, 3)} км (${formatearNumero(ctx, DISTANCIAS_KM.maraton / KM_POR_MILLA, 1)} милји). Полумаратонот е половина од тоа.`,
      },
    ],
    glosario: [
      { termino: "Темпо", definicion: "Колку време ви треба за да истрчате еден километар или една милја." },
      { termino: "Просечна брзина", definicion: "Растојанието поминато за еден час." },
    ],
  };
};
