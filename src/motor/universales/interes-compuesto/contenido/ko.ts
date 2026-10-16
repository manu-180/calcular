import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { proyectar } from "../definicion";

export const contenidoKo: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const capital = montoEjemplo(ctx, 1000);
  const aporte = montoEjemplo(ctx, 100);
  const a10 = proyectar(capital, aporte, 7, 10, "mensual")[9].saldo;
  const a20 = proyectar(capital, aporte, 7, 20, "mensual")[19].saldo;
  return {
    h1: "복리 계산기",
    title: tituloQueEntre(`복리 계산기 (적립식) | ${ctx.nombrePais}`, `복리 계산기 | ${ctx.nombrePais}`, "복리 계산기"),
    description: "복리와 매달 적립으로 돈이 어떻게 불어나는지 계산해요. 최종 금액, 이자 수익, 연도별 표를 보여 줘요.",
    intro: [
      "복리에서는 이자가 잔액에 더해지고, 그 이자에도 이자가 붙어요. 그래서 저축은 시간이 갈수록 더 빨리 불어나요.",
      "지금 가진 돈, 매달 넣을 수 있는 돈, 이자율, 기간을 넣으세요. 최종 금액과 그중 이자가 얼마인지 보여 드려요.",
    ],
    comoSeCalcula: [
      "최종 금액 = 초기 금액 × (1 + i)의 n제곱 + 적립액 × ((1 + i)의 n제곱 − 1) ÷ i",
      "i는 고른 복리 주기에 해당하는 월 이자율이고, n은 개월 수예요.",
      "적립액은 매달 말에 더해져요.",
    ],
    ejemplo: [`${m(capital)}으로 시작해 매달 ${m(aporte)}을 연 7%로 적립하면 10년 뒤 ${m(a10)}이 돼요.`, `10년을 더 이어가면 ${m(a20)}이 돼요. 두 번째 10년은 첫 10년보다 훨씬 많이 불어나요.`],
    faq: [
      {
        pregunta: "단리와 복리는 어떻게 다른가요?",
        respuesta: "단리는 언제나 처음 원금에만 이자가 붙어요. 복리는 원금에 이미 받은 이자를 더한 금액에 이자가 붙어요.",
      },
      {
        pregunta: "72의 법칙이 뭔가요?",
        respuesta: "돈이 두 배가 되는 데 걸리는 시간을 쉽게 구하는 방법이에요. 72를 연 이자율로 나눠요. 연 6%라면 약 12년 만에 두 배가 돼요.",
      },
      {
        pregunta: "이자율은 얼마로 넣어야 하나요?",
        respuesta: "돈을 넣어 둘 곳에 맞는 현실적인 이율로 넣으세요. 현재 가치로 보고 싶다면 이자율에서 예상 물가상승률을 뺀 값을 쓰세요.",
      },
    ],
    glosario: [
      { termino: "복리", definicion: "이자를 원금에 더하고, 그 합계에 다음 이자가 붙는 방식이에요." },
      { termino: "적립", definicion: "매달 정해진 금액을 꾸준히 넣는 거예요." },
    ],
  };
};
