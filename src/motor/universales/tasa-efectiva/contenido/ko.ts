import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aEfectiva, aNominal } from "../definicion";

export const contenidoKo: ContenidoUniversal = (ctx) => {
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  return {
    h1: "명목·실효 연이율 계산기",
    title: tituloQueEntre(`명목·실효 연이율 계산기 | ${ctx.nombrePais}`, `실효 연이율 계산기 | ${ctx.nombrePais}`, "실효 연이율 계산기"),
    description: "명목 연이율을 실효 연이율로, 실효 연이율을 명목 연이율로 바꿔요. 복리 주기는 매달, 분기, 반년, 매일 중에서 고를 수 있어요.",
    intro: [
      "이율이 같은 두 상품도 실제 비용은 다를 수 있어요. 차이는 이자를 얼마나 자주 계산하느냐예요.",
      "실효 연이율로 맞추면 1년 동안 실제로 내거나 받는 이자로 비교할 수 있어요. 알고 있는 이율을 고르면 다른 쪽을 보여 줘요.",
    ],
    comoSeCalcula: [
      "실효 연이율 = (1 + 명목 연이율 ÷ m)의 m제곱 − 1. m은 1년 동안의 복리 횟수로, 매달이면 12, 분기마다면 4예요.",
      "명목 연이율 = m × ((1 + 실효 연이율)의 1 ÷ m제곱 − 1)",
      "기간당 이율은 명목 연이율을 m으로 나눈 값이에요.",
    ],
    ejemplo: [`명목 연이율 12%를 매달 복리로 계산하면 실효 연이율은 ${p(aEfectiva(12, 12))}예요.`, `실효 연이율 10%는 매달 복리일 때 명목 연이율 ${p(aNominal(10, 12))}에 해당해요.`],
    faq: [
      {
        pregunta: "명목 연이율과 실효 연이율은 어떻게 다른가요?",
        respuesta: "명목 연이율은 복리를 따지기 전의 연이율이에요. 실효 연이율은 이자에 이자가 붙는 효과까지 넣은 값이에요. 그래서 실효 연이율은 명목 연이율과 같거나 더 높아요.",
      },
      {
        pregunta: "상품을 비교할 때는 어떤 걸 써야 하나요?",
        respuesta: "예적금은 실제로 받는 이자를 보여 주는 실효 연이율로 비교하세요. 대출은 실효 연이율과 함께 수수료를 포함한 총비용도 비교하세요.",
      },
      {
        pregunta: "복리 횟수가 많으면 왜 실효 연이율이 올라가나요?",
        respuesta: "이자가 더 빨리 원금에 더해져서 그 이자에도 이자가 붙기 시작하기 때문이에요. 1년에 한 번 복리라면 두 이율은 같아요.",
      },
    ],
    glosario: [
      { termino: "명목 연이율", definicion: "복리를 넣지 않은, 표시된 연이율이에요." },
      { termino: "실효 연이율", definicion: "복리 효과를 넣은 실제 연이율이에요." },
      { termino: "복리", definicion: "이자가 원금에 더해져 그 이자에도 이자가 붙는 방식이에요." },
    ],
  };
};
