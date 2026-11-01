import type { TextosUi } from "../../tipos";
import type { UiMargenDeGanancia } from "../definicion";

export const textosVi: TextosUi<UiMargenDeGanancia> = {
  slug: "tinh-bien-loi-nhuan",
  ui: () => ({
    modo: "Bạn muốn tính gì?",
    modoPrecio: "Biên lợi nhuận, từ giá vốn và giá bán",
    modoMargen: "Giá bán theo biên lợi nhuận mục tiêu",
    modoMarkup: "Giá bán theo markup mục tiêu",
    costo: "Giá vốn mỗi sản phẩm",
    costoAyuda: "Chi phí để mua hoặc sản xuất một sản phẩm, không gồm thuế tính cho người mua như thuế GTGT.",
    precio: "Giá bán",
    precioAyuda: "Chỉ nhập khi bạn tính biên lợi nhuận. Chưa gồm thuế.",
    objetivo: "Biên lợi nhuận hoặc markup mục tiêu (%)",
    objetivoAyuda: "Chỉ nhập khi bạn tính giá bán.",
    precioResultado: "Giá bán",
    margen: "Biên lợi nhuận",
    margenAyuda: "Lợi nhuận tính theo phần trăm giá bán.",
    markup: "Markup",
    markupAyuda: "Lợi nhuận tính theo phần trăm giá vốn.",
    ganancia: "Lợi nhuận mỗi sản phẩm",
    errorCosto: "Nhập giá vốn của một sản phẩm.",
    errorFaltaPrecio: "Nhập giá bán để tính biên lợi nhuận.",
    errorFaltaObjetivo: "Nhập biên lợi nhuận hoặc markup mục tiêu của bạn.",
    errorMargen100: "Biên lợi nhuận phải dưới 100%: con số đó nghĩa là toàn bộ giá bán là lợi nhuận, không có giá vốn.",
    observacionPerdida: "Với giá đó, bạn đang bán dưới giá vốn: mỗi lần bán đều lỗ.",
  }),
};
