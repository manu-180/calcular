import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DISTANCIAS_KM, KM_POR_MILLA, reloj, ritmoTexto } from "../definicion";

export const contenidoPl: ContenidoUniversal = (ctx) => {
  const imperial = ctx.unidades === "imperial";
  const u = imperial ? "milę" : "kilometr";
  const corto = imperial ? "mi" : "km";
  const media = imperial ? DISTANCIAS_KM.media / KM_POR_MILLA : DISTANCIAS_KM.media;
  const ritmoMedia = imperial ? 9 * 60 : 5 * 60 + 30;
  return {
    h1: "Kalkulator tempa biegu",
    title: tituloQueEntre(
      `Kalkulator tempa biegu: tempo, czas i dystans | ${ctx.nombrePais}`,
      `Kalkulator tempa biegu | ${ctx.nombrePais}`,
      "Kalkulator tempa biegu",
    ),
    description: `Oblicz tempo na ${u}, czas na mecie albo dystans na 5 km, 10 km, w półmaratonie albo maratonie.`,
    intro: [
      "Gdy znasz dwie z trzech wartości (dystans, czas i tempo), dostaniesz trzecią. Przyda się do zaplanowania startu albo sprawdzenia treningu.",
      "Dystanse 5 km, 10 km, półmaratonu i maratonu są już wpisane.",
    ],
    comoSeCalcula: [
      `Tempo = czas ÷ dystans, w minutach i sekundach na ${u}.`,
      "Czas = tempo × dystans.",
      "Dystans = czas ÷ tempo. Średnia prędkość to dystans podzielony przez liczbę godzin.",
    ],
    ejemplo: imperial
      ? [
          `3 mile w 27 minut to tempo 9:00 na milę, czyli ${formatearNumero(ctx, 20 / 3, 2)} mph.`,
          `Półmaraton (${formatearNumero(ctx, media, 2)} mi) w tempie ${ritmoTexto(ritmoMedia)} na milę kończysz w czasie ${reloj(ritmoMedia * media)}.`,
        ]
      : [
          "10 km w 50 minut to tempo 5:00 na kilometr, czyli 12 km/h.",
          `Półmaraton (${formatearNumero(ctx, media, 1)} ${corto}) w tempie ${ritmoTexto(ritmoMedia)} na kilometr kończysz w czasie ${reloj(ritmoMedia * media)}.`,
        ],
    faq: [
      {
        pregunta: `Jak obliczyć tempo na ${u}?`,
        respuesta: imperial
          ? `Zamień czas na minuty i podziel przez liczbę mil. 3 mile w 28 minut i 30 sekund to ${formatearNumero(ctx, 9.5, 1)} minuty na milę, czyli 9:30.`
          : `Zamień czas na minuty i podziel przez liczbę kilometrów. 10 km w 55 minut to ${formatearNumero(ctx, 5.5, 1)} minuty na kilometr, czyli 5:30.`,
      },
      {
        pregunta: "Jakie tempo jest dobre na początek?",
        respuesta: "Takie, przy którym możesz jeszcze rozmawiać w trakcie biegu. Z czasem, gdy poprawia się kondycja, to tempo będzie coraz szybsze.",
      },
      {
        pregunta: "Ile kilometrów ma maraton?",
        respuesta: `${formatearNumero(ctx, DISTANCIAS_KM.maraton, 3)} km (${formatearNumero(ctx, DISTANCIAS_KM.maraton / KM_POR_MILLA, 1)} mili). Półmaraton to połowa tego dystansu.`,
      },
    ],
    glosario: [
      { termino: "Tempo", definicion: "Ile czasu zajmuje przebiegnięcie jednego kilometra albo jednej mili." },
      { termino: "Średnia prędkość", definicion: "Dystans pokonany w ciągu godziny." },
    ],
  };
};
