import type { TextosUi } from "../../tipos";
import type { UiDividirGastos } from "../definicion";

export const textosVi: TextosUi<UiDividirGastos> = {
  slug: "chia-tien",
  ui: () => ({
    persona: (n) => `Người ${n}`,
    personaAyuda: "Nhập số tiền mỗi người đã trả. Nếu ai chưa trả nhưng vẫn cùng chia chi phí, nhập 0. Để trống các ô còn lại.",
    total: "Tổng chi phí",
    personas: "Số người",
    cuota: "Phần của mỗi người",
    transferencias: "Số lần chuyển khoản để thanh toán",
    tabla: "Ai trả cho ai",
    colDe: "Người trả",
    colPara: "Người nhận",
    colMonto: "Số tiền",
    errorPocas: "Cần ít nhất hai người để chia chi phí.",
    aMano: "Mọi người đã huề: ai cũng trả số tiền bằng nhau.",
  }),
};
