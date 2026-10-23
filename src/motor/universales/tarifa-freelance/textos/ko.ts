import type { TextosUi } from "../../tipos";
import type { UiTarifaFreelance } from "../definicion";

export const textosKo: TextosUi<UiTarifaFreelance> = {
  slug: "freelance-rate",
  ui: () => ({
    ingreso: "1년에 손에 쥐고 싶은 금액",
    ingresoAyuda: "세금과 경비를 뺀 금액이에요. 프리랜서로서 받는 월급인 셈이에요.",
    gastos: "1년 사업 경비",
    gastosAyuda: "장비, 소프트웨어, 인터넷, 교육, 세무사, 보험, 노후 저축 등이에요.",
    impuestos: "세금과 사회보험료 예상치(%)",
    impuestosAyuda: "매출에서 경비를 뺀 금액에 붙는 세금 비율이에요. 잘 모르겠다면 세무사에게 물어보세요. 25%로 시작해 보세요.",
    diasLibres: "1년 쉬는 날",
    diasLibresAyuda: "휴가, 공휴일, 아파서 쉬는 날이에요. 아무도 대신 내 주지 않으니 단가에 넣어야 해요.",
    diasSemana: "주당 일하는 날",
    horasSemana: "주당 청구할 수 있는 시간",
    horasSemanaAyuda: "청구할 수 있는 시간만 넣어요. 영업, 행정, 공부 시간은 빠져요. 40시간 중 20~30시간이 보통이에요.",
    tarifaHora: "시간당 단가",
    tarifaDia: "일당",
    facturacionMensual: "필요한 월 매출",
    facturacionAnual: "필요한 연 매출",
    horasAnio: "1년 청구 가능 시간",
    errorIngreso: "1년에 벌고 싶은 금액을 넣으세요.",
    errorImpuestos: "세금 비율은 100%보다 낮아야 해요.",
    errorDias: "쉬는 날이 그만큼이면 1년에 일할 날이 남지 않아요.",
    errorHoras: "주당 몇 시간을 청구할 수 있는지 넣으세요.",
    observacionFacturables: "이보다 싸게 받으면 계획보다 덜 벌거나 더 오래 일하게 돼요.",
  }),
};
