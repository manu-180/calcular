import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoKo: ContenidoUniversal = (ctx) => {
  const cuenta = montoEjemplo(ctx, 60);
  const propina = cuenta * 0.15;
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "팁 계산기",
    title: tituloQueEntre(`팁 계산기 | ${ctx.nombrePais}`, "팁 계산기"),
    description: "팁 금액, 팁을 포함한 합계, 나눠 낼 때 1인당 금액을 계산해요. 1인당 금액을 딱 떨어지게 올릴 수도 있어요.",
    intro: [
      "계산서 금액, 팁 비율, 나눠 낼 사람 수를 넣으면 팁, 합계, 1인당 금액이 나와요.",
      "딱 떨어지는 금액이 좋다면 1인당 금액을 올림하세요. 올린 만큼은 팁에 더해져요.",
    ],
    comoSeCalcula: ["팁 = 계산서 금액 × 팁 비율 ÷ 100", "합계 = 계산서 금액 + 팁", "1인당 금액 = 합계 ÷ 사람 수"],
    ejemplo: [`${m(cuenta)} 계산서에 15% 팁을 더하면 ${m(propina)}이 늘어 합계는 ${m(cuenta + propina)}이에요.`, `3명이 나눠 내면 1인당 ${m((cuenta + propina) / 3)}이에요.`],
    faq: [
      {
        pregunta: "팁은 얼마나 줘야 하나요?",
        respuesta: `그 지역 관습에 따라 달라요. ${ctx.nombrePais}에서는 보통 어떻게 하는지, 계산서에 봉사료가 이미 들어 있는지 확인하세요.`,
      },
      {
        pregunta: "팁은 세금 전 금액과 후 금액 중 어디에 매기나요?",
        respuesta: "대부분은 계산서에 찍힌 합계에 매겨요. 세금 전 금액을 기준으로 하고 싶다면 그 금액을 넣으세요.",
      },
      {
        pregunta: "15% 팁을 빠르게 계산하는 방법이 있나요?",
        respuesta: "계산서 금액을 10으로 나눠 10%를 구하고, 그 절반을 더해요. 40이라면 4에 2를 더해 6이에요.",
      },
    ],
    glosario: [
      { termino: "팁", definicion: "가격과 별도로 서비스에 대한 감사의 뜻으로 주는 돈이에요." },
      { termino: "봉사료", definicion: "가게가 서비스 요금으로 계산서에 미리 더해 둔 금액이에요." },
    ],
  };
};
