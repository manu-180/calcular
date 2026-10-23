import type { TextosUi } from "../../tipos";
import type { UiPresupuesto } from "../definicion";

export const textosKo: TextosUi<UiPresupuesto> = {
  slug: "budget",
  ui: () => ({
    ingreso: "월 실수령액",
    ingresoAyuda: "세금과 4대 보험료가 빠진 뒤 매달 통장에 들어오는 금액이에요.",
    pctNecesidades: "필수 지출(%)",
    pctNecesidadesAyuda: "주거비, 식비, 공과금, 교통비, 의료비, 대출 최소 상환액 등이에요.",
    pctGustos: "선택 지출(%)",
    pctGustosAyuda: "외식, 꼭 필요하지 않은 쇼핑, 구독 서비스, 여행 등이에요.",
    pctAhorro: "저축(%)",
    pctAhorroAyuda: "비상금, 목표 저축, 노후 자금, 대출 추가 상환 등이에요.",
    necesidades: "필수 지출",
    gustos: "선택 지출",
    ahorro: "저축",
    ahorroAnual: "1년 저축액",
    errorIngreso: "월 실수령액을 넣으세요.",
    errorSuma: (suma) => `세 비율의 합이 ${suma}%예요. 합계가 100%가 되도록 맞춰 주세요.`,
    observacionAhorroBajo: "저축이 10%보다 적으면 갑작스러운 지출에 대비할 여유가 거의 없어요. 가능하면 선택 지출을 조금 줄여 보세요.",
  }),
};
