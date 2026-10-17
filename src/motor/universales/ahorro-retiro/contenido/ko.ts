import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { acumular, rentaMensual } from "../definicion";

export const contenidoKo: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const actual = montoEjemplo(ctx, 5000);
  const aporte = montoEjemplo(ctx, 200);
  const a30 = acumular(30, 65, actual, aporte, 4);
  const capital30 = a30[a30.length - 1].saldo;
  const a40 = acumular(40, 65, actual, aporte, 4);
  const capital40 = a40[a40.length - 1].saldo;
  return {
    h1: "노후 자금 계산기",
    title: tituloQueEntre(`노후 자금 계산기 | ${ctx.nombrePais}`, "노후 자금 계산기"),
    description: "매달 적립하면 은퇴할 때 얼마를 모을 수 있는지, 그 돈으로 매달 얼마를 쓸 수 있는지 현재 가치로 계산해요.",
    intro: [
      "공적 연금만으로는 지금의 생활 수준을 유지하기 어려운 경우가 많아요. 직접 모으는 돈은 적더라도 일찍 시작하면 큰 차이를 만들어요.",
      "나이, 은퇴하고 싶은 나이, 지금 모은 돈, 매달 넣을 수 있는 금액을 넣으세요. 은퇴 시점 자금과 매달 쓸 수 있는 금액을 보여 드려요.",
    ],
    comoSeCalcula: [
      "자금은 매달 실질 수익률(수익률에서 물가상승률을 뺀 값)로 불어나요. 그래서 결과가 현재 가치로 나와요.",
      "은퇴 뒤에는 고른 기간 동안 매달 같은 금액을 꺼내 써요. 남은 돈은 그동안에도 계속 불어나요.",
      "공적 연금, 세금, 투자 수수료는 들어 있지 않아요.",
    ],
    ejemplo: [
      `30세에 ${m(actual)}을 갖고 매달 ${m(aporte)}을 실질 4%로 적립하면 65세에 ${m(capital30)}이 돼요. 25년 동안 매달 ${m(rentaMensual(capital30, 4, 25))}을 쓸 수 있어요.`,
      `같은 조건으로 40세에 시작하면 ${m(capital40)}이에요. 10년 차이가 아주 커요.`,
    ],
    faq: [
      {
        pregunta: "실질 수익률이 뭔가요?",
        respuesta: "물가 상승분을 뺀 수익률이에요. 투자 수익률이 7%이고 물가상승률이 3%라면 실질 수익률은 약 4%예요.",
      },
      {
        pregunta: "국민연금을 대신할 수 있나요?",
        respuesta: "아니요. 이건 국민연금이나 퇴직연금에 더해지는 개인 저축이에요. 공적 연금 예상액은 해당 기관에서 확인하세요.",
      },
      {
        pregunta: "노후를 위해 얼마나 모아야 하나요?",
        respuesta: "정해진 답은 없어요. 흔히 쓰는 기준은 소득의 10~15%예요. 가장 중요한 건 최대한 일찍 시작하는 거예요.",
      },
    ],
    glosario: [
      { termino: "실질 수익률", definicion: "물가상승률을 넘는 만큼의 수익률이에요." },
      { termino: "현재 가치", definicion: "미래의 금액을 지금 기준으로 무엇을 살 수 있는지로 나타낸 거예요." },
    ],
  };
};
