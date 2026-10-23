import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoKo: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const gastos = montoEjemplo(ctx, 1500);
  const aporte = montoEjemplo(ctx, 300);
  return {
    h1: "비상금 계산기",
    title: tituloQueEntre(`비상금 계산기 | ${ctx.nombrePais}`, "비상금 계산기"),
    description: "월 필수 생활비로 비상금이 얼마나 있어야 하는지, 매달 모을 수 있는 금액으로 몇 개월이면 채울 수 있는지 계산해요.",
    intro: [
      "비상금은 계획할 수 없는 일에 대비하는 돈이에요. 실직, 건강 문제, 급한 집수리 같은 일이요.",
      "비상금이 있으면 가장 힘들 때 카드 빚에 기대지 않아도 돼요. 월 필수 생활비와 몇 개월을 대비할지 넣으세요.",
    ],
    comoSeCalcula: ["권장 비상금 = 월 필수 생활비 × 대비할 개월 수", "더 모아야 할 금액 = 권장 비상금 − 이미 모은 금액", "다 모으는 데 걸리는 개월 수 = 더 모아야 할 금액 ÷ 매달 모을 수 있는 금액, 올림"],
    ejemplo: [`월 필수 생활비가 ${m(gastos)}이라면 6개월분 비상금은 ${m(gastos * 6)}이에요.`, `매달 ${m(aporte)}씩 모으면 ${Math.ceil((gastos * 6) / aporte)}개월이면 다 모여요.`],
    faq: [
      {
        pregunta: "비상금은 몇 개월분이 있어야 하나요?",
        respuesta: "보통 필수 생활비의 3~6개월분을 권해요. 소득이 들쭉날쭉하거나, 자영업이거나, 외벌이라면 6~12개월분을 목표로 하세요.",
      },
      {
        pregunta: "비상금은 어디에 넣어 둬야 하나요?",
        respuesta: "생활비 통장과 분리해서, 당일에 찾을 수 있는 안전한 곳에 두세요. 위험한 투자용이 아니에요. 필요할 때 꼭 있어야 하는 돈이에요.",
      },
      {
        pregunta: "비상금 모으기와 빚 갚기 중 뭐가 먼저인가요?",
        respuesta: "흔한 방법은 먼저 한 달 치를 모으고, 그다음 카드 빚처럼 이자가 비싼 빚을 갚고, 그 뒤에 비상금을 마저 채우는 거예요.",
      },
    ],
    glosario: [
      { termino: "필수 생활비", definicion: "소득이 끊겨도 계속 내야 하는 지출이에요(주거비, 식비, 공과금, 의료비 등)." },
      { termino: "유동성", definicion: "돈을 가치 손실 없이 얼마나 빨리 쓸 수 있는지예요." },
    ],
  };
};
