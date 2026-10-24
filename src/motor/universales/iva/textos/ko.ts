import type { TextosUi } from "../../tipos";
import type { UiIva } from "../definicion";

export const textosKo: TextosUi<UiIva> = {
  slug: "vat",
  ui: () => ({
    operacion: "무엇을 할까요?",
    agregar: "공급가액에 부가가치세 더하기",
    quitar: "부가세 포함 가격에서 부가가치세 빼기",
    monto: "가격",
    montoAyuda: "세금을 더하려면 공급가액, 빼려면 부가세 포함 가격을 넣으세요.",
    otraTasa: "다른 세율(%)",
    otraTasaAyuda: "선택 사항이에요. 다른 세율이 적용되는 품목이라면 넣으세요. 비워 두면 기본 세율을 써요.",
    neto: "공급가액",
    impuesto: "부가가치세",
    total: "부가세 포함 가격",
    tasaUsada: "적용한 세율",
    errorTasa: "세율이 올바르지 않아요.",
  }),
};
