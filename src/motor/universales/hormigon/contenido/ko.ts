import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { MEZCLA } from "../definicion";

export const contenidoKo: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const ft3 = 10 * 10 * (4 / 12);
        return [
          `10 × 10피트, 두께 4인치 마당에는 콘크리트가 ${n(ft3)}세제곱피트(${n(ft3 / 27)}세제곱야드) 필요해요.`,
          `기준 배합이라면 시멘트는 약 ${n((MEZCLA.cementoKg * ft3 * 0.0283168466) / 0.45359237, 0)}파운드예요.`,
        ];
      })()
    : (() => {
        const volumen = 4 * 3 * 0.1;
        return [
          `4 × 3m, 두께 10cm 바닥에는 콘크리트가 ${n(volumen, 1)}m³ 필요해요.`,
          `기준 배합이라면 시멘트 약 ${n(MEZCLA.cementoKg * volumen, 0)}kg, 모래 ${n(MEZCLA.arenaM3 * volumen)}m³, 자갈 ${n(MEZCLA.piedraM3 * volumen)}m³가 들어요.`,
        ];
      })();
  return {
    h1: "콘크리트 양 계산기",
    title: tituloQueEntre(`콘크리트 계산기 | ${ctx.nombrePais}`, "콘크리트 계산기"),
    description: `바닥 타설에 필요한 콘크리트 양을 ${imperial ? "세제곱야드" : "m³"}로 계산하고, 시멘트, 모래, 자갈을 대략 얼마나 사야 하는지도 알려 줘요.`,
    intro: [
      "길이, 너비, 두께를 넣으면 콘크리트 부피와 비비는 데 필요한 재료의 대략적인 양이 나와요.",
      "재료량은 배합에 따라 달라요. 이 계산기는 일반적인 1:2:3 배합을 기준으로 해요.",
    ],
    comoSeCalcula: [
      imperial ? "부피 = 길이 × 너비 × 두께(두께는 피트). 세제곱피트를 27로 나누면 세제곱야드예요." : "부피 = 길이 × 너비 × 두께(두께는 미터)",
      "바닥 요철과 흘리는 양을 생각해 여유분을 더해요.",
      `1m³당 시멘트 약 ${MEZCLA.cementoKg}kg, 모래 ${n(MEZCLA.arenaM3)}m³, 자갈 ${n(MEZCLA.piedraM3, 1)}m³, 물 ${MEZCLA.aguaL}리터가 들어요.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "1세제곱야드는 몇 세제곱피트인가요?",
        respuesta: "27세제곱피트예요. 1세제곱야드는 3 × 3 × 3피트 크기의 정육면체예요.",
      },
      {
        pregunta: "콘크리트 1m³에 시멘트는 얼마나 들어가나요?",
        respuesta: `1:2:3 배합이라면 약 ${MEZCLA.cementoKg}kg이에요. 강도가 높은 콘크리트일수록 시멘트가 더 들어가요.`,
      },
      {
        pregunta: "레미콘을 주문하는 게 나을까요?",
        respuesta: "양이 많다면 품질이 고르고 빠른 경우가 많아요. 작은 작업이라면 이 양을 참고해 현장에서 비비는 것도 흔해요.",
      },
    ],
    glosario: [
      { termino: "배합", definicion: "시멘트, 모래, 자갈, 물을 섞는 비율이에요." },
      { termino: "세제곱야드(yd³)", definicion: "한 변이 1야드인 정육면체의 부피로, 27세제곱피트예요." },
    ],
  };
};
