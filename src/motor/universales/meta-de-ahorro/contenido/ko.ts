import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aporteNecesario } from "../definicion";

export const contenidoKo: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const meta = montoEjemplo(ctx, 10000);
  const actual = montoEjemplo(ctx, 1000);
  return {
    h1: "목표 저축 계산기",
    title: tituloQueEntre(`목표 저축 계산기 | ${ctx.nombrePais}`, "목표 저축 계산기"),
    description: "목표 금액을 기한까지 모으려면 매달 얼마를 저축해야 하는지, 지금 모은 돈과 그 수익까지 넣어 계산해요.",
    intro: [
      "여행, 자동차, 집 계약금, 비상금. 금액과 날짜가 정해진 목표는 훨씬 이루기 쉬워요.",
      "모으고 싶은 금액과 개월 수를 넣으면 매달, 매주 얼마씩 모으면 되는지 알려 드려요.",
    ],
    comoSeCalcula: [
      "먼저 지금 모은 돈이 기간이 끝날 때까지 얼마로 불어나는지 계산해요.",
      "부족한 금액을 매달 같은 금액으로 나눠요.",
      "저축에 이자가 붙으면 매달 넣는 돈에도 이자가 붙어서, 조금 덜 넣어도 돼요.",
    ],
    ejemplo: [`이자 없이 24개월 동안 ${m(meta)}을 모으려면 매달 ${m(meta / 24)}이 필요해요.`, `이미 ${m(actual)}이 있고 연 5% 수익이 난다면 매달 ${m(aporteNecesario(meta, actual, 24, 5))}이면 충분해요.`],
    faq: [
      {
        pregunta: "목표를 꾸준히 지키려면 어떻게 하나요?",
        respuesta: "월급이 들어오면 다른 데 쓰기 전에 바로 옮기세요. 가능하면 다른 계좌로 자동이체를 걸어 두는 게 좋아요.",
      },
      {
        pregunta: "매달 금액이 너무 크면요?",
        respuesta: "기간을 늘리거나 목표 금액을 낮추세요. 감당할 수 있는 금액부터 시작해서 수입이 늘면 올리는 방법도 있어요.",
      },
      {
        pregunta: "물가 상승도 생각해야 하나요?",
        respuesta: "목표가 몇 년 뒤라면 예상 물가상승률만큼 금액을 올려 잡으세요. 지금 100으로 살 수 있는 것이 그때는 훨씬 비쌀 수 있어요.",
      },
    ],
    glosario: [
      { termino: "적립액", definicion: "목표를 위해 매달 떼어 두는 돈이에요." },
      { termino: "수익률", definicion: "저축이 계좌나 투자에서 벌어들이는 비율이에요." },
    ],
  };
};
