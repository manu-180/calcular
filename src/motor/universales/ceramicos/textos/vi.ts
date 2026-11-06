import type { TextosUi } from "../../tipos";
import type { UiCeramicos } from "../definicion";

export const textosVi: TextosUi<UiCeramicos> = {
  slug: "tinh-gach-lat-nen",
  ui: () => ({
    superficie: (u) => `Diện tích cần lát gạch (${u})`,
    largo: (u) => `Chiều dài viên gạch (${u})`,
    ancho: (u) => `Chiều rộng viên gạch (${u})`,
    desperdicio: "Phần dự phòng hao hụt (%)",
    desperdicioAyuda: "Cho phần cắt và gạch vỡ. Dùng 10% khi lát thẳng và 15% khi lát chéo.",
    porCaja: "Số viên mỗi thùng",
    porCajaAyuda: "Không bắt buộc. Nhập để biết cần mua bao nhiêu thùng.",
    piezas: "Số viên gạch",
    cajas: "Số thùng cần mua",
    conDesperdicio: (u) => `Diện tích kèm dự phòng (${u})`,
    cubre: (u) => `Diện tích số thùng đó lát được (${u})`,
    errorSuperficie: "Diện tích phải lớn hơn 0.",
    errorPieza: "Kích thước viên gạch phải lớn hơn 0.",
  }),
};
