import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoKo: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const ingreso = montoEjemplo(ctx, 2000);
  return {
    h1: "50/30/20 가계부 예산 계산기",
    title: tituloQueEntre(`50/30/20 예산 계산기 | ${ctx.nombrePais}`, "50/30/20 예산 계산기"),
    description: "월 실수령액을 50/30/20 규칙으로 나눠요. 필수 지출, 선택 지출, 저축에 각각 얼마를 쓸지 보여 주고, 비율도 바꿀 수 있어요.",
    intro: [
      "50/30/20 규칙은 한 달 예산을 쉽게 짜는 방법이에요. 절반은 필수 지출, 30%는 하고 싶은 것, 20%는 저축에 써요.",
      "실수령액을 넣으면 각각에 얼마를 쓸 수 있는지 나와요. 월세가 비싸는 등 상황이 다르다면 비율을 조정하세요.",
    ],
    comoSeCalcula: ["필수 지출 = 실수령액 × 50%", "선택 지출 = 실수령액 × 30%", "저축 = 실수령액 × 20%. 세 비율의 합은 100%여야 해요."],
    ejemplo: [
      `실수령액이 월 ${m(ingreso)}이라면 필수 지출에 ${m(ingreso * 0.5)}, 선택 지출에 ${m(ingreso * 0.3)}, 저축에 ${m(ingreso * 0.2)}을 써요.`,
      `1년이면 그 20%가 모여 ${m(ingreso * 0.2 * 12)}을 저축하게 돼요.`,
    ],
    faq: [
      {
        pregunta: "필수 지출과 선택 지출은 어떻게 나누나요?",
        respuesta: "필수 지출은 꼭 내야 하는 돈이에요(주거비, 기본 식비, 공과금, 교통비, 의료비, 대출 최소 상환액). 선택 지출은 필요하면 줄일 수 있는 것들이에요.",
      },
      {
        pregunta: "필수 지출이 50%를 넘으면요?",
        respuesta: "특히 월세가 비싸면 흔한 일이에요. 60/20/20이나 70/20/10을 써 보세요. 저축을 0으로 만드는 건 피하세요.",
      },
      {
        pregunta: "대출 상환도 저축에 들어가나요?",
        respuesta: "최소 상환액은 필수 지출에 넣어요. 빨리 갚으려고 더 내는 돈은 저축처럼 순자산을 늘리니 저축으로 쳐요.",
      },
    ],
    glosario: [
      { termino: "실수령액", definicion: "세금과 4대 보험료를 뺀 뒤 실제로 받는 금액이에요." },
      { termino: "50/30/20 규칙", definicion: "소득을 필수 지출, 선택 지출, 저축으로 나누는 방법이에요." },
    ],
  };
};
