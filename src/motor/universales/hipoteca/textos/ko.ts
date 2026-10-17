import type { TextosUi } from "../../tipos";
import type { UiHipoteca } from "../definicion";

export const textosKo: TextosUi<UiHipoteca> = {
  slug: "mortgage",
  ui: () => ({
    precio: "주택 가격",
    entradaPorcentaje: "자기자금(주택 가격의 %)",
    entradaMonto: "자기자금 금액(선택)",
    entradaMontoAyuda: "금액을 넣으면 비율 대신 이 금액으로 계산해요.",
    tasa: "연 이자율(%)",
    anios: "대출 기간(년)",
    gastos: "매달 드는 주거비(선택)",
    gastosAyuda: "재산세, 주택 보험료, 관리비처럼 대출과 함께 내는 비용이에요.",
    cuota: "월 대출 상환액",
    cuotaTotal: "주거비를 포함한 월 지출",
    entrada: "자기자금",
    prestado: "대출 금액",
    intereses: "총이자",
    total: "대출 상환 총액",
    tabla: "연도별 상환",
    colAnio: "연차",
    colIntereses: "낸 이자",
    colCapital: "갚은 원금",
    colSaldo: "연말 잔액",
    errorPrecio: "주택 가격을 넣으세요.",
    errorEntrada: "자기자금으로 주택 가격을 모두 낼 수 있어서 계산할 대출이 없어요. 자기자금을 줄여 보세요.",
    observacionPrestado: (porcentaje) => `주택 가격의 ${porcentaje}%를 빌리게 돼요. 이 비율이 높을수록 금융회사의 심사 조건은 보통 까다로워져요.`,
    observacionCostos: "취득세, 중개수수료, 등기 비용 같은 부대비용은 들어 있지 않아요. 자기자금과 별도로 준비해 두세요.",
  }),
};
