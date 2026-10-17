import type { TextosUi } from "../../tipos";
import type { UiPuntoDeEquilibrio } from "../definicion";

export const textosKo: TextosUi<UiPuntoDeEquilibrio> = {
  slug: "break-even",
  ui: () => ({
    fijos: "월 고정비",
    fijosAyuda: "하나도 못 팔아도 나가는 비용이에요. 임대료, 고정 급여, 공과금, 소프트웨어 등.",
    precio: "개당 판매가",
    variable: "개당 변동비",
    variableAyuda: "한 개 팔 때마다 드는 비용이에요. 재료, 매입, 수수료, 배송비 등.",
    objetivo: "월 목표 이익(선택)",
    objetivoAyuda: "비용을 메우고 나서 얼마나 더 팔아야 하는지 볼 때 써요.",
    unidades: "손익분기점 판매량",
    facturacion: "손익분기점 매출",
    contribucion: "개당 공헌이익",
    contribucionAyuda: "한 개 팔 때마다 고정비를 메우는 데 쓸 수 있는 금액이에요(판매가 − 변동비).",
    contribucionPct: "공헌이익률(%)",
    unidadesObjetivo: "목표 이익에 필요한 판매량",
    facturacionObjetivo: "목표 이익에 필요한 매출",
    errorPrecio: "개당 판매가를 넣으세요.",
    errorMargen: "변동비가 판매가와 같거나 더 커요. 팔 때마다 손해라서 손익분기점에 닿지 않아요. 가격이나 비용을 확인하세요.",
    observacionRedondeo: "한 개를 쪼개 팔 수는 없어서 판매량은 올림했어요.",
  }),
};
