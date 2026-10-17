import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoKo: ContenidoUniversal = (ctx) => {
  const antes = montoEjemplo(ctx, 40);
  const despues = antes * 1.25;
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "증감률 계산기",
    title: tituloQueEntre(`증감률 계산기 | ${ctx.nombrePais}`, "증감률 계산기"),
    description: "가격, 급여, 매출처럼 시간이 지나며 바뀐 숫자가 몇 % 오르거나 내렸는지 계산해요.",
    intro: [
      "처음 값과 나중 값을 넣으면 몇 % 오르거나 내렸는지, 차이는 얼마인지 보여 줘요.",
      "원래 값으로 돌아가려면 몇 % 바뀌어야 하는지도 알려 줘요. 같은 %인 경우는 거의 없어요.",
    ],
    comoSeCalcula: [
      "증감률 = (나중 값 − 처음 값) ÷ 처음 값 × 100",
      "결과가 플러스면 오른 것이고, 마이너스면 내린 거예요.",
      "처음 값이 음수면 절댓값으로 나눠서, 부호만 봐도 좋아졌는지 알 수 있어요.",
    ],
    ejemplo: [`${m(antes)}이던 물건이 ${m(despues)}이 되면 25% 오른 거예요.`, "원래 가격으로 돌아가려면 25%가 아니라 20% 내려야 해요."],
    faq: [
      {
        pregunta: "증가율은 어떻게 계산하나요?",
        respuesta: "나중 값에서 처음 값을 빼고, 처음 값으로 나눈 뒤 100을 곱해요. 80에서 100이 되면 20 ÷ 80 × 100 = 25%예요.",
      },
      {
        pregunta: "감소율은 어떻게 계산하나요?",
        respuesta: "계산식은 같아요. 100에서 80이 되면 −20 ÷ 100 × 100 = −20%이니, 20% 내린 거예요.",
      },
      {
        pregunta: "25% 올랐다가 25% 내리면 왜 원래대로 안 돌아오나요?",
        respuesta: "기준이 되는 수가 다르기 때문이에요. 80에서 25% 오르면 100이지만, 100에서 25% 내리면 75예요.",
      },
      {
        pregunta: "%와 %포인트는 어떻게 다른가요?",
        respuesta: "금리가 10%에서 12%가 되면 2%포인트 오른 거예요. 증감률로 따지면 20% 오른 거고요.",
      },
    ],
    glosario: [
      { termino: "증감률", definicion: "값이 얼마나 바뀌었는지를 처음 값에 대한 %로 나타낸 거예요." },
      { termino: "%포인트", definicion: "두 퍼센트 사이의 단순한 차이예요." },
    ],
  };
};
