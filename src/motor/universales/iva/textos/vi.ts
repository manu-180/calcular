import type { TextosUi } from "../../tipos";
import type { UiIva } from "../definicion";

export const textosVi: TextosUi<UiIva> = {
  slug: "tinh-thue-gtgt",
  ui: () => ({
    operacion: "Bạn muốn tính gì?",
    agregar: "Cộng thuế GTGT vào giá chưa thuế",
    quitar: "Tách thuế GTGT khỏi giá đã có thuế",
    monto: "Giá",
    montoAyuda: "Giá chưa thuế nếu bạn cộng thuế GTGT; giá đã có thuế nếu bạn tách thuế.",
    otraTasa: "Thuế suất khác (%)",
    otraTasaAyuda: "Không bắt buộc. Nếu hàng hóa của bạn áp dụng thuế suất khác, hãy nhập tại đây. Nếu không, công cụ dùng thuế suất chung.",
    neto: "Giá chưa thuế",
    impuesto: "Thuế GTGT",
    total: "Giá đã có thuế GTGT",
    tasaUsada: "Thuế suất áp dụng",
    errorTasa: "Thuế suất không hợp lệ.",
  }),
};
