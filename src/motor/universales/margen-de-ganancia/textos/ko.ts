import type { TextosUi } from "../../tipos";
import type { UiMargenDeGanancia } from "../definicion";

export const textosKo: TextosUi<UiMargenDeGanancia> = {
  slug: "profit-margin",
  ui: () => ({
    modo: "무엇을 계산할까요?",
    modoPrecio: "원가와 판매가로 마진율 구하기",
    modoMargen: "목표 마진율로 판매가 구하기",
    modoMarkup: "목표 마크업으로 판매가 구하기",
    costo: "개당 원가",
    costoAyuda: "한 개를 사 오거나 만드는 데 드는 금액이에요. 손님에게 받는 부가가치세는 빼세요.",
    precio: "판매가",
    precioAyuda: "마진율을 계산할 때만 넣어요. 부가가치세를 뺀 금액이에요.",
    objetivo: "목표 마진율 또는 마크업(%)",
    objetivoAyuda: "판매가를 계산할 때만 넣어요.",
    precioResultado: "판매가",
    margen: "마진율",
    margenAyuda: "판매가 대비 이익의 비율이에요.",
    markup: "마크업(원가 대비 이익률)",
    markupAyuda: "원가 대비 이익의 비율이에요.",
    ganancia: "개당 이익",
    errorCosto: "개당 원가를 넣으세요.",
    errorFaltaPrecio: "마진율을 계산하려면 판매가를 넣으세요.",
    errorFaltaObjetivo: "목표 마진율이나 마크업을 넣으세요.",
    errorMargen100: "마진율은 100%보다 낮아야 해요. 100%라면 원가 없이 판매가 전부가 이익이라는 뜻이에요.",
    observacionPerdida: "그 가격이면 원가보다 싸게 파는 거예요. 팔 때마다 손해를 봐요.",
  }),
};
