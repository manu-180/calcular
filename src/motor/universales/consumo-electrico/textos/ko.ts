import type { TextosUi } from "../../tipos";
import type { UiConsumoElectrico } from "../definicion";

export const textosKo: TextosUi<UiConsumoElectrico> = {
  slug: "electricity-cost",
  ui: () => ({
    potencia: "소비전력(W)",
    potenciaAyuda: "제품 라벨이나 설명서에 와트(W)로 적혀 있어요. kW라면 1000을 곱하세요.",
    cantidad: "같은 제품 개수",
    horas: "하루 사용 시간",
    dias: "한 달 사용 일수",
    precio: "kWh당 요금",
    precioAyuda: "전기요금 고지서에서 확인할 수 있어요. 세금까지 포함한 금액을 보려면 세금이 포함된 단가를 넣으세요.",
    kwhDia: "하루 사용량(kWh)",
    kwhMes: "한 달 사용량(kWh)",
    kwhAnio: "1년 사용량(kWh)",
    costoDia: "하루 전기요금",
    costoMes: "한 달 전기요금",
    costoAnio: "1년 전기요금",
    errorHoras: "하루는 24시간이에요. 사용 시간은 0에서 24 사이로 넣어 주세요.",
  }),
};
