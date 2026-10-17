import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { equilibrio } from "../definicion";

export const contenidoKo: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const fijos = montoEjemplo(ctx, 5000);
  const precio = montoEjemplo(ctx, 50);
  const variable = montoEjemplo(ctx, 30);
  const objetivo = montoEjemplo(ctx, 2000);
  const base = equilibrio(fijos, precio, variable);
  const meta = equilibrio(fijos + objetivo, precio, variable);
  return {
    h1: "손익분기점 계산기",
    title: tituloQueEntre(`손익분기점 계산기 | ${ctx.nombrePais}`, "손익분기점 계산기"),
    description: "비용을 메우려면 매달 몇 개를 팔고 매출이 얼마나 돼야 하는지, 목표 이익을 내려면 얼마나 팔아야 하는지 계산해요.",
    intro: [
      "손익분기점은 이익도 손실도 없는 매출 수준이에요. 그보다 적으면 손해, 많으면 이익이 나기 시작해요.",
      "고정비, 판매가, 개당 비용을 넣으면 비용을 메우는 판매량과 목표를 이루는 판매량을 알려 드려요.",
    ],
    comoSeCalcula: [
      "공헌이익 = 판매가 − 개당 변동비",
      "손익분기점 판매량 = 고정비 ÷ 공헌이익, 올림",
      "손익분기점 매출 = 고정비 ÷ (공헌이익 ÷ 판매가)",
      "목표 이익이 있다면 고정비에 더해서 똑같이 계산해요.",
    ],
    ejemplo: [
      `고정비 ${m(fijos)}, 판매가 ${m(precio)}, 변동비 ${m(variable)}일 때 한 개 팔 때마다 ${m(precio - variable)}이 남아요.`,
      `비용을 메우려면 ${formatearNumero(ctx, base.unidades)}개(${m(base.facturacion)}), 매달 ${m(objetivo)}의 이익을 내려면 ${formatearNumero(ctx, meta.unidades)}개를 팔아야 해요.`,
    ],
    faq: [
      {
        pregunta: "고정비와 변동비는 뭐가 다른가요?",
        respuesta: "고정비는 못 팔아도 그대로인 비용이에요(임대료, 고정 급여, 공과금). 변동비는 팔 때마다 늘어나는 비용이에요(매입, 재료, 수수료, 배송비).",
      },
      {
        pregunta: "손익분기점을 낮추려면요?",
        respuesta: "방법은 세 가지예요. 가격을 올리거나, 개당 변동비를 줄이거나, 고정비를 줄이는 거예요. 보통 가격이 가장 큰 차이를 만들어요.",
      },
      {
        pregunta: "서비스업에도 쓸 수 있나요?",
        respuesta: "네. 한 시간, 한 회 세션, 한 달 고객 한 명을 ‘한 개’로 보면 돼요. 하나를 제공하는 데 드는 비용을 변동비로 넣으세요.",
      },
    ],
    glosario: [
      { termino: "손익분기점", definicion: "매출과 비용이 똑같아지는 판매 수준이에요." },
      { termino: "공헌이익", definicion: "하나를 팔 때마다 고정비를 메우는 데 쓸 수 있는 금액이에요." },
    ],
  };
};
