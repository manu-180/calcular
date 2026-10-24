import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoKo: ContenidoUniversal = (ctx) => {
  const tasa = `{{${ctx.datos.tasa}}}`;
  const precio = formatearMonto(ctx, montoEjemplo(ctx, 100));
  return {
    h1: `${ctx.nombrePais} 부가가치세 계산기`,
    title: tituloQueEntre(`부가가치세 계산기 (${tasa}) | ${ctx.nombrePais}`, `부가세 계산기 (${tasa})`, "부가세 계산기"),
    description: `어떤 가격이든 ${tasa} 부가가치세를 한 번에 더하거나 빼요. 공급가액, 세액, 합계를 원 단위까지 보여 줘요.`,
    intro: [`${ctx.nombrePais}에서 쓰는 기본 세율은 ${tasa}예요.`, "공급가액에 세금을 더할지, 세금이 포함된 가격에서 뺄지 고르고 금액을 넣으세요."],
    comoSeCalcula: [
      "세금 더하기: 세액 = 공급가액 × 세율 ÷ 100, 합계 = 공급가액 + 세액",
      "세금 빼기: 공급가액 = 부가세 포함 가격 ÷ (1 + 세율 ÷ 100), 세액은 그 차이예요.",
      "다른 세율이 적용되는 품목은 ‘다른 세율’에 넣어 계산할 수 있어요.",
    ],
    ejemplo: [`${precio}에 세금을 더하려면 ${tasa}를 곱한 금액을 가격에 더해요.`, `부가세 포함 ${precio}에 든 세금을 알려면 1에 세율을 더한 수로 나눈 뒤 원래 금액에서 빼요.`],
    faq: [
      {
        pregunta: "부가세 포함 가격에서 부가세를 빼려면요?",
        respuesta: "가격을 1에 세율을 소수로 더한 수로 나눠요. 남는 게 공급가액이고, 그 차이가 세액이에요.",
      },
      {
        pregunta: "합계에서 세율만큼 빼면 안 되나요?",
        respuesta: "세금은 더 작은 공급가액을 기준으로 매겨졌기 때문이에요. 합계에서 세율만큼 빼면 너무 많이 빠져요.",
      },
      {
        pregunta: `모든 품목에 ${tasa}가 붙나요?`,
        respuesta: "꼭 그렇지는 않아요. 일부 식품, 의료, 교육 서비스 등은 면세되기도 해요. 그럴 때는 ‘다른 세율’을 쓰세요.",
      },
    ],
    glosario: [
      { termino: "부가가치세", definicion: "상품과 서비스 가격에 더해지는 세금이에요. 나라에 따라 VAT나 GST라고도 해요." },
      { termino: "공급가액", definicion: "세금을 더하기 전 가격이에요." },
    ],
  };
};
