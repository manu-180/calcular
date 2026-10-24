import { cuotaFrancesa, interesesTotales } from "../../prestamo/definicion";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoKo: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 200000);
  const prestado = precio * 0.8;
  const cuota30 = cuotaFrancesa(prestado, 7, 360);
  const cuota15 = cuotaFrancesa(prestado, 7, 180);
  return {
    h1: "주택담보대출 계산기",
    title: tituloQueEntre(`주택담보대출 계산기 | ${ctx.nombrePais}`, "주택담보대출 계산기"),
    description: "주택 가격, 자기자금, 이자율, 기간으로 주택담보대출 월 상환액을 계산해요. 총이자와 해마다 잔액이 줄어드는 모습도 보여 줘요.",
    intro: [
      "주택담보대출은 대부분의 가정이 지는 가장 큰 빚이에요. 금융회사와 상담하기 전에 전체 숫자를 먼저 확인해 보세요.",
      "주택 가격, 자기자금, 이자율, 기간을 넣으세요. 재산세나 보험료를 함께 낸다면 그것도 넣어 실제 월 지출을 확인하세요.",
    ],
    comoSeCalcula: [
      "대출 금액 = 주택 가격 − 자기자금",
      "연 이자율을 12로 나눈 월 이자율과 개월 수로 바꾼 기간으로 매달 같은 상환액을 계산해요.",
      "해마다 낸 이자와 갚은 원금을 더하고, 남은 대출 금액을 보여 줘요.",
    ],
    ejemplo: [
      `${m(precio)}짜리 집에 자기자금 20%를 넣으면 대출 금액은 ${m(prestado)}이에요. 연 7%, 30년이면 월 상환액은 ${m(cuota30)}이에요.`,
      `30년 동안 내는 이자는 ${m(interesesTotales(prestado, 7, 360))}이에요. 15년으로 줄이면 월 상환액은 ${m(cuota15)}으로 오르지만 이자는 ${m(interesesTotales(prestado, 7, 180))}으로 줄어요.`,
    ],
    faq: [
      {
        pregunta: "자기자금은 얼마나 있어야 하나요?",
        respuesta: "금융회사와 나라마다 달라요. 자기자금이 많을수록 빌리는 돈이 줄고, 월 상환액과 이자도 줄어요. 부대비용도 따로 준비해 두세요.",
      },
      {
        pregunta: "처음 몇 년 동안 잔액이 거의 안 줄어드는 이유는요?",
        respuesta: "이자는 남은 대출 금액에 붙어요. 처음에는 잔액이 커서 상환액 대부분이 이자로 나가요. 시간이 지나면 그 비중이 바뀌어요.",
      },
      {
        pregunta: "기간이 짧을수록 좋은가요?",
        respuesta: "더 높은 월 상환액을 감당할 수 있다면 그래요. 이자를 훨씬 덜 내요. 어렵다면 기간을 길게 잡고 여유가 있을 때 중도 상환하는 방법도 있어요.",
      },
      {
        pregunta: "월 상환액이 바뀔 수도 있나요?",
        respuesta: "고정금리라면 그대로예요. 변동금리라면 바뀔 수 있어요. 이 계산기는 대출 기간 내내 이자율이 같다고 가정해요.",
      },
    ],
    glosario: [
      { termino: "자기자금", definicion: "주택 가격 중 내 돈으로 내는 부분이에요." },
      { termino: "원금", definicion: "빌린 돈 중 아직 갚지 않은 금액이에요." },
      { termino: "잔액", definicion: "대출에서 아직 남아 있는 금액이에요." },
    ],
  };
};
