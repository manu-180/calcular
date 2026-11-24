import type { TextosUi } from "../../tipos";
import type { UiPropina } from "../definicion";

export const textosVi: TextosUi<UiPropina> = {
  slug: "tinh-tien-tip",
  ui: () => ({
    cuenta: "Tổng hóa đơn",
    porcentaje: "Tiền tip (%)",
    porcentajeAyuda: "Thói quen cho tiền tip khác nhau tùy quốc gia và địa điểm. Chọn mức bạn thấy phù hợp.",
    personas: "Số người trả tiền",
    redondear: "Làm tròn lên phần của mỗi người",
    redondearAyuda: "Để mỗi người trả một số tiền chẵn. Phần dư được tính vào tiền tip.",
    propina: "Tiền tip",
    total: "Tổng cộng có tiền tip",
    porPersona: "Phần của mỗi người",
    propinaEfectiva: "Tiền tip sau khi làm tròn",
    errorPersonas: "Phải có ít nhất một người trả tiền.",
    observacionRedondeo: (efectiva) => `Sau khi làm tròn lên, tiền tip bằng ${efectiva}% hóa đơn.`,
  }),
};
