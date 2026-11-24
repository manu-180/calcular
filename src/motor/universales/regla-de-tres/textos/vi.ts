import type { TextosUi } from "../../tipos";
import type { UiReglaDeTres } from "../definicion";

export const textosVi: TextosUi<UiReglaDeTres> = {
  slug: "quy-tac-tam-suat",
  ui: () => ({
    tipo: "Loại tam suất",
    directa: "Thuận (A tăng thì B cũng tăng)",
    inversa: "Nghịch (A tăng thì B giảm)",
    a: "A",
    aAyuda: "Cách đọc: A tương ứng với B thì C tương ứng với X. Nhập A, B và C.",
    b: "B",
    c: "C",
    x: "X",
    errorCero: "Giá trị này không được bằng 0 vì là số chia.",
    fraseDirecta: (a, b, c, x) => `Nếu ${a} tương ứng với ${b} thì ${c} tương ứng với ${x}. Cách tính: ${b} × ${c} ÷ ${a}.`,
    fraseInversa: (a, b, c, x) => `Nếu ${a} cho kết quả ${b} thì ${c} cho kết quả ${x}. Cách tính: ${a} × ${b} ÷ ${c}.`,
  }),
};
