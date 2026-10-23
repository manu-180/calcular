import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoKo: ContenidoUniversal = (ctx) => {
  const precio3 = montoEjemplo(ctx, 6);
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "비례식 계산기",
    title: tituloQueEntre(`비례식 계산기 (정비례·반비례) | ${ctx.nombrePais}`, `비례식 계산기 | ${ctx.nombrePais}`, "비례식 계산기"),
    description: "정비례와 반비례를 바로 풀어요. 값 세 개를 넣으면 나머지 하나를 계산 과정과 함께 보여 줘요.",
    intro: [
      "두 양이 함께 변하고, 네 값 중 세 개를 알고 있을 때 쓰는 계산이에요.",
      "정비례인지 반비례인지 고르고 A, B, C를 넣으면 X가 나와요.",
    ],
    comoSeCalcula: [
      "정비례: X = B × C ÷ A. 두 양이 함께 커질 때 써요(무게가 늘면 가격도 올라요).",
      "반비례: X = A × B ÷ C. 한쪽이 커지면 다른 쪽이 작아질 때 써요(사람이 늘면 걸리는 날은 줄어요).",
    ],
    ejemplo: [`3kg에 ${m(precio3)}이면 5kg은 ${m((precio3 * 5) / 3)}이에요.`, "4명이 12일 걸리는 페인트칠은 6명이면 8일이면 끝나요."],
    faq: [
      {
        pregunta: "정비례인지 반비례인지 어떻게 알 수 있나요?",
        respuesta: "한쪽이 커질 때 다른 쪽도 커지면 정비례, 한쪽이 커질 때 다른 쪽이 작아지면 반비례예요.",
      },
      {
        pregunta: "정비례는 손으로 어떻게 계산하나요?",
        respuesta: `대각선에 있는 두 값을 곱하고 남은 값으로 나눠요. 3에 600이면, 5에는 600 × 5 ÷ 3 = ${formatearNumero(ctx, 1000)}이에요.`,
      },
      {
        pregunta: "퍼센트 계산에도 쓸 수 있나요?",
        respuesta: "네. 200이 100%라면 50은 25%예요. A = 200, B = 100, C = 50인 정비례로 계산하면 돼요.",
      },
    ],
    glosario: [
      { termino: "정비례", definicion: "두 양이 함께 커지거나 함께 작아지는 관계예요." },
      { termino: "반비례", definicion: "한쪽이 커지면 다른 쪽이 작아지는 관계예요." },
    ],
  };
};
