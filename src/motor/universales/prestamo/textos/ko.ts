import type { TextosUi } from "../../tipos";
import type { UiPrestamo } from "../definicion";

export const textosKo: TextosUi<UiPrestamo> = {
  slug: "loan",
  ui: () => ({
    monto: "대출 금액",
    tasa: "연 이자율(%)",
    tasaAyuda: "상품 안내에 적힌 연 이자율이에요. 수수료는 포함하지 않아요.",
    meses: "대출 기간(개월)",
    extra: "매달 추가로 갚을 금액(선택)",
    extraAyuda: "더 빨리 갚으려고 매달 더 내는 금액이에요. 전부 원금 상환에 쓰여요.",
    cuota: "월 상환액",
    intereses: "총이자",
    total: "총상환액",
    mesesReales: "추가 상환 시 상환 기간(개월)",
    ahorro: "아끼는 이자",
    tabla: "상환 스케줄",
    colMes: "회차",
    colPago: "상환액",
    colInteres: "이자",
    colCapital: "원금",
    colSaldo: "잔액",
    errorMonto: "0보다 큰 금액을 넣으세요.",
    observacionCostos: "월 상환액에는 금융회사가 붙이는 보험료, 수수료, 세금이 빠져 있어요. 계약 전에 총비용을 꼭 확인하세요.",
    observacionExtra: (meses, ahorro) => `추가로 갚으면 ${meses}개월 만에 다 갚고, 이자를 ${ahorro} 아낄 수 있어요.`,
  }),
};
