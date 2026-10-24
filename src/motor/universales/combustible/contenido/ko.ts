import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoKo: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const precio = montoEjemplo(ctx, 3.5);
        const galones = 300 / 30;
        return [
          `편도 150마일을 연비 30mpg인 차로 왕복하면 연료가 ${formatearNumero(ctx, galones)}갤런 필요해요.`,
          `갤런당 ${m(precio)}이면 ${m(galones * precio)}이고, 2명이 나누면 1인당 ${m((galones * precio) / 2)}이에요.`,
        ];
      })()
    : (() => {
        const precio = montoEjemplo(ctx, 1.2);
        const litros = (600 * 8) / 100;
        return [
          `편도 300km를 100km당 8리터(12.5km/L)를 쓰는 차로 왕복하면 연료가 ${formatearNumero(ctx, litros)}리터 필요해요.`,
          `리터당 ${m(precio)}이면 ${m(litros * precio)}이고, 2명이 나누면 1인당 ${m((litros * precio) / 2)}이에요.`,
        ];
      })();
  return {
    h1: "주유비 계산기",
    title: tituloQueEntre(`주유비 계산기 | ${ctx.nombrePais}`, "주유비 계산기"),
    description: "이동 거리, 차량 연비, 기름값으로 여행이나 출퇴근에 드는 주유비와 1인당 부담액을 계산해요.",
    intro: [
      `거리, 차량 연비, ${imperial ? "갤런" : "리터"}당 가격을 넣으면 필요한 연료량과 비용이 나와요.`,
      imperial ? "연비는 마일/갤런으로 넣어요." : "연비는 km/L나 100km당 리터 중 편한 방식으로 넣으면 돼요.",
    ],
    comoSeCalcula: imperial
      ? ["갤런 = 거리 ÷ 연비(마일/갤런)", "비용 = 갤런 × 갤런당 가격. 왕복이면 거리가 두 배예요."]
      : ["100km당 리터일 때: 리터 = 거리 × 연비 ÷ 100", "km/L일 때: 리터 = 거리 ÷ 연비", "비용 = 리터 × 리터당 가격. 왕복이면 거리가 두 배예요."],
    ejemplo,
    faq: [
      {
        pregunta: "km/L와 100km당 리터는 어떻게 바꾸나요?",
        respuesta: `100을 한쪽 값으로 나누면 돼요. 연비가 15km/L인 차는 100km당 약 ${formatearNumero(ctx, 100 / 15, 1)}리터를 써요.`,
      },
      {
        pregunta: "통행료도 들어가나요?",
        respuesta: "아니요. 연료비만 계산해요. 통행료와 주차비는 따로 더하세요.",
      },
      {
        pregunta: "시내에서 연비가 나빠지는 이유는 뭔가요?",
        respuesta: "멈췄다 출발하기를 반복하면 일정한 속도로 달리는 고속도로보다 에너지가 더 들기 때문이에요.",
      },
    ],
    glosario: [
      { termino: "연비", definicion: "일정한 양의 연료로 차가 얼마나 달릴 수 있는지 나타내는 값이에요." },
      { termino: "km/L", definicion: "연료 1리터로 달릴 수 있는 km예요. 숫자가 클수록 연비가 좋아요." },
    ],
  };
};
