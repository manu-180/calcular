import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoKo: ContenidoUniversal = (ctx) => {
  const precio = montoEjemplo(ctx, 80);
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "할인 계산기",
    title: tituloQueEntre(`할인 계산기 | ${ctx.nombrePais}`, "할인 계산기"),
    description: "할인가와 할인 금액을 계산해요. 30% 할인에 10% 추가 할인처럼 겹쳐서 받는 할인도 계산할 수 있어요.",
    intro: [
      "가격과 할인율을 넣으면 내야 할 금액과 아낀 금액이 바로 나와요.",
      "추가 할인이 있다면 그것도 넣으세요. 할인 두 번은 단순히 더해지지 않아요.",
    ],
    comoSeCalcula: [
      "할인가 = 정가 × (1 − 할인율 ÷ 100)",
      "추가 할인은 첫 번째 할인이 적용된 가격에 다시 적용돼요.",
      "할인 금액은 정가에서 할인가를 뺀 금액이에요.",
    ],
    ejemplo: [
      `${m(precio)}짜리 물건을 25% 할인받으면 ${m(precio * 0.75)}이에요.`,
      `30% 할인에 10%를 추가로 받으면 ${m(precio * 0.7 * 0.9)}이에요. 총 할인율은 40%가 아니라 37%예요.`,
    ],
    faq: [
      {
        pregunta: "할인 금액은 어떻게 계산하나요?",
        respuesta: "가격에 할인율을 곱하고 100으로 나누면 할인 금액이에요. 가격에서 이 금액을 빼면 내야 할 금액이 나와요.",
      },
      {
        pregunta: "30% 할인에 10% 추가 할인이면 40% 할인인가요?",
        respuesta: "아니요. 두 번째 할인은 이미 내려간 가격에 적용되기 때문에 총 할인율은 37%예요.",
      },
      {
        pregunta: "할인가로 정가를 알아내려면 어떻게 하나요?",
        respuesta: `할인가를 (1 − 할인율 ÷ 100)으로 나눠요. 25% 할인이라면 ${formatearNumero(ctx, 0.75, 2)}로 나누면 돼요.`,
      },
    ],
    glosario: [
      { termino: "할인율", definicion: "정가에서 깎아 주는 비율이에요." },
      { termino: "실질 할인율", definicion: "할인이 여러 번 적용됐을 때 전체적으로 얼마나 싸졌는지 나타내는 비율이에요." },
    ],
  };
};
