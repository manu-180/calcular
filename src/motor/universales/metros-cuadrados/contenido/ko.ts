import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { area, FT2_POR_M2 } from "../definicion";

export const contenidoKo: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const u = imperial ? "피트" : "m";
  const us = imperial ? "제곱피트" : "m²";
  const enL = imperial ? area("rectangulo", 16, 12) + area("rectangulo", 10, 6) : area("rectangulo", 5, 4) + area("rectangulo", 3, 2);
  return {
    h1: "면적 계산기 (제곱미터)",
    title: tituloQueEntre(`면적 계산기 (제곱미터) | ${ctx.nombrePais}`, `면적 계산기 | ${ctx.nombrePais}`, "면적 계산기"),
    description: "방, 바닥, 땅의 면적을 계산해요. 직사각형, 삼각형, 원을 지원하고 최대 다섯 구역까지 더할 수 있어요.",
    intro: [
      "모양을 고르고 치수를 넣으세요. 단순한 직사각형이 아니라면 구역으로 나눠 넣으면 합계를 내 줘요.",
      imperial ? "결과는 제곱미터로도 보여 줘요." : "결과는 제곱피트로도 보여 줘요.",
    ],
    comoSeCalcula: [
      "직사각형: 가로 × 세로",
      "삼각형: 밑변 × 높이 ÷ 2",
      `원: π × 반지름 × 반지름(반지름은 지름의 절반). 1m²는 ${n(FT2_POR_M2)}제곱피트예요.`,
    ],
    ejemplo: [
      imperial
        ? `ㄱ자형 거실은 16 × 12피트와 10 × 6피트 직사각형으로 나눌 수 있어요. 합계 ${n(enL, 0)}제곱피트예요.`
        : `ㄱ자형 거실은 5 × 4m와 3 × 2m 직사각형으로 나눌 수 있어요. 합계 ${n(enL, 0)}m²예요.`,
      `지름 2${u}인 원형 탁자의 면적은 ${n(area("circulo", 2, 0))}${us}예요.`,
    ],
    faq: [
      {
        pregunta: "방 면적은 어떻게 계산하나요?",
        respuesta: "가로와 세로 길이를 미터로 재서 곱해요. 4 × 3m 방이라면 12m²예요.",
      },
      {
        pregunta: "치수가 센티미터라면요?",
        respuesta: `먼저 미터로 바꾸세요. 센티미터를 100으로 나누면 돼요. 350cm는 ${n(3.5, 1)}m예요.`,
      },
      {
        pregunta: "평과 제곱미터는 어떻게 바꾸나요?",
        respuesta: `1평은 약 ${n(400 / 121)}m²예요. 제곱미터를 평으로 바꾸려면 ${n(400 / 121)}로 나누면 돼요.`,
      },
    ],
    glosario: [
      { termino: "제곱미터(m²)", definicion: "한 변이 1m인 정사각형의 면적이에요." },
      { termino: "제곱피트(ft²)", definicion: "한 변이 1피트인 정사각형의 면적이에요." },
    ],
  };
};
