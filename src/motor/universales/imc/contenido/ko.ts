import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { KG_POR_LB, M_POR_PULGADA } from "../definicion";

export const contenidoKo: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const m = 69 * M_POR_PULGADA;
  const ejemplo = imperial
    ? [
        `몸무게 160파운드, 키 5피트 9인치인 사람의 BMI는 ${n((160 * KG_POR_LB) / (m * m))}, 판정은 정상 체중이에요.`,
        `이 키의 정상 체중은 ${n((18.5 * m * m) / KG_POR_LB)}~${n((24.9 * m * m) / KG_POR_LB)}파운드예요.`,
      ]
    : [
        `몸무게 70kg, 키 ${n(1.75, 2)}m인 사람의 BMI는 ${n(70 / (1.75 * 1.75))}, 판정은 정상 체중이에요.`,
        `이 키의 정상 체중은 ${n(18.5 * 1.75 * 1.75)}~${n(24.9 * 1.75 * 1.75)}kg이에요.`,
      ];
  return {
    h1: "BMI 계산기",
    title: tituloQueEntre(`BMI 계산기 (체질량지수) | ${ctx.nombrePais}`, `BMI 계산기 | ${ctx.nombrePais}`, "BMI 계산기"),
    description: "몸무게와 키로 체질량지수(BMI)를 계산하고, WHO 기준 판정과 내 키에 맞는 정상 체중 범위를 보여 줘요.",
    intro: [
      "몸무게와 키를 넣으면 BMI, 세계보건기구(WHO) 기준 판정, 키에 맞는 정상 체중 범위가 나와요.",
      "성인을 위한 대략적인 기준이에요. 의사 등 전문가와의 상담을 대신하지 않아요.",
    ],
    comoSeCalcula: [
      imperial ? "BMI = 몸무게(파운드) × 703 ÷ (키(인치) × 키(인치))" : "BMI = 몸무게(kg) ÷ (키(m) × 키(m))",
      `${n(18.5)} 미만은 저체중, ${n(18.5)}~${n(24.9)}는 정상 체중, 25~${n(29.9)}는 과체중, 30 이상은 비만이에요.`,
      `정상 체중 범위는 그 키에서 BMI가 ${n(18.5)}~${n(24.9)}가 되는 몸무게예요.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "BMI 정상 범위는 어떻게 되나요?",
        respuesta: `WHO 기준으로 성인은 ${n(18.5)}~${n(24.9)}가 정상 체중이에요. 남녀 모두 같은 범위예요.`,
      },
      {
        pregunta: "BMI는 누구에게나 맞나요?",
        respuesta: "아니요. 근육과 지방을 구분하지 못해서 근육량이 많은 사람은 높게 나올 수 있어요. 임신 중이거나 어린이, 청소년은 다른 기준으로 봐요.",
      },
      {
        pregunta: "파운드와 인치로 BMI를 계산하려면요?",
        respuesta: "몸무게(파운드)에 703을 곱하고 키(인치)의 제곱으로 나눠요. 5피트 9인치라면 69 × 69예요.",
      },
    ],
    glosario: [
      { termino: "BMI", definicion: "체질량지수. 키에 비해 몸무게가 어느 정도인지 나타내는 수치예요." },
      { termino: "WHO", definicion: "세계보건기구. 성인 BMI 판정 구간을 정해요." },
    ],
  };
};
