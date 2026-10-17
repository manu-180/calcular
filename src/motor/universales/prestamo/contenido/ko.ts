import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cuotaFrancesa, interesesTotales } from "../definicion";

export const contenidoKo: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const monto = montoEjemplo(ctx, 10000);
  const cuota36 = cuotaFrancesa(monto, 12, 36);
  const cuota60 = cuotaFrancesa(monto, 12, 60);
  return {
    h1: "대출 이자 계산기",
    title: tituloQueEntre(`대출 이자 계산기 | ${ctx.nombrePais}`, "대출 이자 계산기"),
    description: "대출의 월 상환액, 총이자, 전체 상환 스케줄을 계산해요. 추가 상환으로 이자를 얼마나 아낄 수 있는지도 보여 줘요.",
    intro: [
      "대출을 받기 전에 꼭 봐야 할 숫자는 두 가지예요. 매달 얼마를 갚는지, 그리고 이자로 모두 얼마를 내는지예요.",
      "대출 금액, 연 이자율, 기간을 넣으세요. 매달 조금씩 더 갚을 생각이라면 그 금액도 넣어 얼마나 빨리 끝나는지 확인해 보세요.",
    ],
    comoSeCalcula: [
      "매달 같은 금액을 갚는 원리금 균등 상환으로 계산해요. 신용대출, 자동차 대출, 주택담보대출에서 흔한 방식이에요.",
      "월 이자율 = 연 이자율 ÷ 12",
      "월 상환액 = 대출 금액 × 월 이자율 ÷ (1 − (1 + 월 이자율)의 −상환 횟수 제곱)",
      "매달 남은 원금에 이자가 붙고, 상환액의 나머지가 원금을 줄여요.",
    ],
    ejemplo: [
      `${m(monto)}을 연 12%로 36개월 동안 빌리면 월 상환액은 ${m(cuota36)}이에요. 이자는 모두 ${m(interesesTotales(monto, 12, 36))}을 내요.`,
      `60개월로 늘리면 월 상환액은 ${m(cuota60)}으로 줄지만, 이자는 ${m(interesesTotales(monto, 12, 60))}으로 늘어요.`,
    ],
    faq: [
      {
        pregunta: "월 상환액은 어떻게 계산하나요?",
        respuesta: "원리금 균등 상환 공식을 써요. 매달 내는 금액은 같지만, 처음에는 이자 비중이 크고 나중에는 원금 비중이 커져요. 그래서 처음에는 잔액이 천천히 줄어요.",
      },
      {
        pregunta: "중도 상환을 하는 게 좋을까요?",
        respuesta: "중도상환수수료가 크지 않다면 대개 이득이에요. 더 낸 돈은 바로 원금을 줄이고, 그만큼 이자가 붙지 않아요. 빨리 갚을수록 더 많이 아껴요.",
      },
      {
        pregunta: "기간이 길면 더 좋은가요?",
        respuesta: "월 상환액은 줄지만 전체 이자는 훨씬 늘어요. 두 숫자를 모두 비교하고 정하세요.",
      },
      {
        pregunta: "금융회사가 알려 준 금액과 왜 다른가요?",
        respuesta: "금융회사는 보험료, 수수료, 세금을 더하거나 광고와 다른 이자율을 적용하기도 해요. 이자율만이 아니라 총비용으로 비교하세요.",
      },
    ],
    glosario: [
      { termino: "원금", definicion: "빌린 돈 중 아직 갚지 않은 부분이에요." },
      { termino: "연 이자율", definicion: "1년 기준 이자율로, 12로 나누면 매달 이자를 계산하는 월 이자율이 돼요." },
      { termino: "원리금 균등 상환", definicion: "원금과 이자를 합친 금액을 매달 똑같이 갚는 방식이에요." },
    ],
  };
};
