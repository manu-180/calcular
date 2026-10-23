import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DISTANCIAS_KM, KM_POR_MILLA, reloj, ritmoTexto } from "../definicion";

export const contenidoKo: ContenidoUniversal = (ctx) => {
  const imperial = ctx.unidades === "imperial";
  const u = imperial ? "마일" : "km";
  const media = imperial ? DISTANCIAS_KM.media / KM_POR_MILLA : DISTANCIAS_KM.media;
  const ritmoMedia = imperial ? 9 * 60 : 5 * 60 + 30;
  return {
    h1: "러닝 페이스 계산기",
    title: tituloQueEntre(`러닝 페이스 계산기 | ${ctx.nombrePais}`, "러닝 페이스 계산기"),
    description: `1${u}당 페이스, 완주 기록, 거리를 계산해요. 5km, 10km, 하프 마라톤, 풀코스 마라톤 거리가 들어 있어요.`,
    intro: [
      "거리, 기록, 페이스 중 두 가지를 알면 나머지 하나가 나와요. 대회 계획이나 훈련 점검에 써 보세요.",
      "5km, 10km, 하프 마라톤, 풀코스 마라톤 거리는 미리 들어 있어요.",
    ],
    comoSeCalcula: [`페이스 = 기록 ÷ 거리. 1${u}당 분과 초로 나타내요.`, "기록 = 페이스 × 거리", "거리 = 기록 ÷ 페이스. 평균 속도는 거리를 시간으로 나눈 값이에요."],
    ejemplo: imperial
      ? [
          `3마일을 27분에 달리면 페이스는 1마일 9:00, 시속 ${formatearNumero(ctx, 20 / 3, 2)}마일이에요.`,
          `하프 마라톤(${formatearNumero(ctx, media, 2)}마일)을 1마일 ${ritmoTexto(ritmoMedia)} 페이스로 달리면 완주 기록은 ${reloj(ritmoMedia * media)}예요.`,
        ]
      : [
          "10km를 50분에 달리면 페이스는 1km 5:00, 시속 12km예요.",
          `하프 마라톤(${formatearNumero(ctx, media, 1)}km)을 1km ${ritmoTexto(ritmoMedia)} 페이스로 달리면 완주 기록은 ${reloj(ritmoMedia * media)}예요.`,
        ],
    faq: [
      {
        pregunta: `1${u}당 페이스는 어떻게 계산하나요?`,
        respuesta: imperial
          ? `기록을 분으로 바꿔 마일 수로 나눠요. 3마일을 28분 30초에 달렸다면 1마일 ${formatearNumero(ctx, 9.5, 1)}분, 즉 9:30이에요.`
          : `기록을 분으로 바꿔 km 수로 나눠요. 10km를 55분에 달렸다면 1km ${formatearNumero(ctx, 5.5, 1)}분, 즉 5:30이에요.`,
      },
      {
        pregunta: "초보자에게 알맞은 페이스는요?",
        respuesta: "달리면서 대화할 수 있을 정도의 페이스예요. 체력이 붙으면 그 페이스도 빨라져요.",
      },
      {
        pregunta: "풀코스 마라톤은 몇 km인가요?",
        respuesta: `${formatearNumero(ctx, DISTANCIAS_KM.maraton, 3)}km(${formatearNumero(ctx, DISTANCIAS_KM.maraton / KM_POR_MILLA, 1)}마일)예요. 하프 마라톤은 그 절반이에요.`,
      },
    ],
    glosario: [
      { termino: "페이스", definicion: "1km나 1마일을 달리는 데 걸리는 시간이에요." },
      { termino: "평균 속도", definicion: "한 시간에 달리는 거리예요." },
    ],
  };
};
