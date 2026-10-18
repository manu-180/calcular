import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cagr, roi } from "../definicion";

export const contenidoKo: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  const inicial = montoEjemplo(ctx, 10000);
  const final = montoEjemplo(ctx, 15000);
  return {
    h1: "투자수익률 계산기 (ROI·CAGR)",
    title: tituloQueEntre(`투자수익률 계산기 (ROI·CAGR) | ${ctx.nombrePais}`, `투자수익률 계산기 | ${ctx.nombrePais}`, "투자수익률 계산기"),
    description: "투자 금액, 지금의 평가액, 지난 기간으로 투자의 총수익률(ROI)과 연평균 수익률(CAGR)을 계산해요.",
    intro: [
      "50% 수익은 멋져 보이지만 2년 만에 낸 것과 10년 걸려 낸 것은 달라요. 투자를 비교하려면 1년 기준 수익률이 필요해요.",
      "투자 금액, 지금의 평가액, 지난 햇수를 넣으세요. 총수익률과 복리로 본 연평균 수익률을 보여 드려요.",
    ],
    comoSeCalcula: [
      "ROI = (최종 평가액 + 받은 수익 − 투자 금액) ÷ 투자 금액 × 100",
      "CAGR = ((최종 평가액 + 받은 수익) ÷ 투자 금액)의 (1 ÷ 기간)제곱 − 1",
      "CAGR은 복리로 본 연평균 수익률로, 해마다 반복하면 같은 결과가 나오는 비율이에요.",
    ],
    ejemplo: [
      `${m(inicial)}을 투자해 ${m(final)}이 되면 수익은 ${m(final - inicial)}, ROI는 ${p(roi(inicial, final))}예요.`,
      `5년이 걸렸다면 연평균 수익률은 ${p(cagr(inicial, final, 5))}, 2년이라면 ${p(cagr(inicial, final, 2))}예요.`,
    ],
    faq: [
      {
        pregunta: "ROI와 CAGR은 어떻게 다른가요?",
        respuesta: "ROI는 기간과 상관없이 투자 금액 대비 전체 수익이에요. CAGR은 그것을 1년 단위로 나눈 값이라 기간이 다른 투자끼리 비교할 수 있어요.",
      },
      {
        pregunta: "왜 연평균 수익률은 총수익률을 햇수로 나눈 값이 아닌가요?",
        respuesta: `해마다 생긴 수익이 잔액에 더해져서 그것도 함께 불어나기 때문이에요. 5년간 50% 수익은 복리로 연 ${p(cagr(1, 1.5, 5))}이지, 10%가 아니에요.`,
      },
      {
        pregunta: "받은 배당이나 이자는 어떻게 넣나요?",
        respuesta: "찾아서 썼다면 ‘중간에 받은 수익’에 넣으세요. 재투자했다면 이미 최종 평가액에 들어 있어요.",
      },
    ],
    glosario: [
      { termino: "ROI", definicion: "투자수익률. 투자 금액 대비 전체 수익의 비율이에요." },
      { termino: "CAGR", definicion: "연평균 성장률. 복리로 본 1년 평균 수익률이에요." },
    ],
  };
};
