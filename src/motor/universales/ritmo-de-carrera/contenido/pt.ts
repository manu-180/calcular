import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DISTANCIAS_KM, KM_POR_MILLA, reloj, ritmoTexto } from "../definicion";

export const contenidoPt: ContenidoUniversal = (ctx) => {
  const imperial = ctx.unidades === "imperial";
  const u = imperial ? "milha" : "km";
  const corto = imperial ? "mi" : "km";
  const media = imperial ? DISTANCIAS_KM.media / KM_POR_MILLA : DISTANCIAS_KM.media;
  const ritmoMedia = imperial ? 9 * 60 : 5 * 60 + 30;
  return {
    h1: "Calculadora de pace (ritmo de corrida)",
    title: tituloQueEntre(`Calculadora de pace para corrida (${ctx.nombrePais})`, "Calculadora de pace para corrida", "Calculadora de pace"),
    description: `Calcule o seu pace por ${u}, o tempo de prova ou a distância para 5 km, 10 km, meia maratona ou maratona.`,
    intro: [
      "Com dois dos três dados (distância, tempo e pace) você descobre o terceiro. Serve para planejar uma prova ou conferir um treino.",
      "As distâncias de 5 km, 10 km, meia maratona e maratona já estão prontas para escolher.",
    ],
    comoSeCalcula: [
      `Pace = tempo ÷ distância, em minutos e segundos por ${u}.`,
      "Tempo = pace × distância.",
      "Distância = tempo ÷ pace. A velocidade média é a distância dividida pelas horas.",
    ],
    ejemplo: imperial
      ? [
          `3 milhas em 27 minutos dão um pace de 9:00 por milha, a ${formatearNumero(ctx, 20 / 3, 2)} mph.`,
          `Uma meia maratona (${formatearNumero(ctx, media, 2)} mi) a ${ritmoTexto(ritmoMedia)} por milha termina em ${reloj(ritmoMedia * media)}.`,
        ]
      : [
          "10 km em 50 minutos dão um pace de 5:00 por km, a 12 km/h.",
          `Uma meia maratona (${formatearNumero(ctx, media, 1)} ${corto}) a ${ritmoTexto(ritmoMedia)} por km termina em ${reloj(ritmoMedia * media)}.`,
        ],
    faq: [
      {
        pregunta: `Como calcular o meu pace por ${u}?`,
        respuesta: imperial
          ? `Passe o tempo para minutos e divida pelas milhas. 3 milhas em 28 minutos e 30 segundos dão ${formatearNumero(ctx, 9.5, 1)} minutos por milha, ou 9:30.`
          : `Passe o tempo para minutos e divida pelos quilômetros. 10 km em 55 minutos dão ${formatearNumero(ctx, 5.5, 1)} minutos por km, ou 5:30.`,
      },
      {
        pregunta: "Qual é um bom pace para quem está começando?",
        respuesta: "Um que ainda deixe você conversar enquanto corre. Esse pace vai caindo conforme o condicionamento melhora.",
      },
      {
        pregunta: "Quantos quilômetros tem uma maratona?",
        respuesta: `${formatearNumero(ctx, DISTANCIAS_KM.maraton, 3)} km (${formatearNumero(ctx, DISTANCIAS_KM.maraton / KM_POR_MILLA, 1)} milhas). A meia maratona tem a metade.`,
      },
    ],
    glosario: [
      { termino: "Pace", definicion: "O tempo que você leva para percorrer um quilômetro ou uma milha. Também se chama ritmo." },
      { termino: "Velocidade média", definicion: "A distância percorrida por hora." },
    ],
  };
};
