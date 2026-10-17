import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aumentoReal } from "../definicion";

export const contenidoKo: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  const sueldo = montoEjemplo(ctx, 4000);
  return {
    h1: "연봉 인상 계산기",
    title: tituloQueEntre(`연봉 인상 계산기 | ${ctx.nombrePais}`, "연봉 인상 계산기"),
    description: "인상 후 월급, 월·연 차이, 그리고 물가 상승을 뺀 실질 인상률까지 계산해요.",
    intro: [
      "인상을 제안받았거나 곧 협상할 예정인가요? 지금 월급과 인상분을 비율이나 금액으로 넣으면 매달, 매년 얼마나 달라지는지 보여 줘요.",
      "기간 중 물가상승률도 넣으면 실제로 구매력이 늘었는지, 따라잡기만 했는지 알려 드려요.",
    ],
    comoSeCalcula: ["인상 후 월급 = 지금 월급 × (1 + 인상률 ÷ 100)", "연 차이 = 월 차이 × 1년 지급 횟수", "실질 인상률 = (1 + 인상률) ÷ (1 + 물가상승률) − 1"],
    ejemplo: [
      `월급 ${m(sueldo)}이 5% 오르면 ${m(sueldo * 1.05)}이 돼요. 한 달에 ${m(sueldo * 0.05)}, 1년에 ${m(sueldo * 0.05 * 12)}이 늘어요.`,
      `그 기간 물가상승률이 3%라면 실질 인상률은 ${p(aumentoReal(5, 3))}예요. 물가상승률이 6%라면 ${p(aumentoReal(5, 6))}예요.`,
    ],
    faq: [
      {
        pregunta: "실질 인상률이 뭔가요?",
        respuesta: "물가 상승을 뺀 인상률이에요. 새 월급으로 전보다 더 살 수 있는지, 덜 살 수 있는지 보여 줘요.",
      },
      {
        pregunta: "인상률에서 물가상승률을 빼면 안 되나요?",
        respuesta: `두 비율은 더하고 빼는 게 아니라 곱해지기 때문이에요. 인상 5%, 물가 3%라면 실질 인상률은 2%가 아니라 ${p(aumentoReal(5, 3))}예요. 물가가 많이 오를수록 차이가 훨씬 커져요.`,
      },
      {
        pregunta: "인상은 얼마나 요구해야 하나요?",
        respuesta: "적어도 지난 인상 이후의 물가 상승분은 요구하세요. 그래야 뒤처지지 않아요. 그 이상은 비슷한 일의 시장 시세와 맡은 일이 얼마나 커졌는지를 기준으로 삼으세요.",
      },
    ],
    glosario: [
      { termino: "명목 인상", definicion: "급여명세서에 보이는 인상으로, 물가를 반영하기 전의 값이에요." },
      { termino: "구매력", definicion: "월급으로 살 수 있는 것의 양이에요." },
    ],
  };
};
