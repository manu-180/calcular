import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { precioConMargen } from "../definicion";

export const contenidoKo: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  const costo = montoEjemplo(ctx, 60);
  const precio = montoEjemplo(ctx, 100);
  return {
    h1: "마진율 계산기",
    title: tituloQueEntre(`마진율 계산기 (마크업) | ${ctx.nombrePais}`, `마진율 계산기 | ${ctx.nombrePais}`, "마진율 계산기"),
    description: "원가와 판매가로 마진율과 마크업을 계산하고, 원하는 마진을 남기려면 얼마에 팔아야 하는지도 알려 줘요.",
    intro: [
      "마진율과 마크업은 자주 헷갈리고, 그 차이 때문에 손해를 보기도 해요. 둘 다 같은 이익을 재지만 기준이 달라요.",
      "원가와 판매가를 넣으면 둘 다 보여 드려요. 목표 마진율을 고르면 얼마에 팔아야 하는지도 알려 드려요.",
    ],
    comoSeCalcula: ["이익 = 판매가 − 원가", "마진율 = 이익 ÷ 판매가 × 100", "마크업 = 이익 ÷ 원가 × 100", "목표 마진율의 판매가 = 원가 ÷ (1 − 마진율 ÷ 100)"],
    ejemplo: [
      `원가 ${m(costo)}인 상품을 ${m(precio)}에 팔면 이익은 ${m(precio - costo)}이에요. 마진율은 ${p(((precio - costo) / precio) * 100)}, 마크업은 ${p(((precio - costo) / costo) * 100)}예요.`,
      `같은 원가로 마진율 50%를 남기려면 ${m(precioConMargen(costo, 50))}에 팔아야 해요. 원가에 50%를 더하기만 하면 마진율은 ${p(100 / 3)}밖에 안 돼요.`,
    ],
    faq: [
      {
        pregunta: "마진율과 마크업은 어떻게 다른가요?",
        respuesta: "마진율은 판매가 대비 이익, 마크업은 원가 대비 이익이에요. 이익이 같다면 마크업이 늘 더 큰 숫자예요.",
      },
      {
        pregunta: "목표 마진율로 가격을 정하려면요?",
        respuesta: `원가를 (1 − 마진율)로 나눠요. 마진율 30%라면 원가를 ${formatearNumero(ctx, 0.7, 2)}로 나누세요. 원가에 30%를 더하면 생각보다 덜 남아요.`,
      },
      {
        pregunta: "원가에 세금을 넣어야 하나요?",
        respuesta: "부가가치세처럼 손님에게 받아서 내는 세금은 뺀 원가와 판매가를 쓰세요. 넣으면 마진이 실제보다 커 보여요.",
      },
    ],
    glosario: [
      { termino: "마진율", definicion: "판매가 대비 이익의 비율이에요." },
      { termino: "마크업", definicion: "원가 대비 이익의 비율이에요." },
    ],
  };
};
