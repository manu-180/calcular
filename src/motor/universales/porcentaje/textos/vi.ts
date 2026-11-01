import type { TextosUi } from "../../tipos";
import type { UiPorcentaje } from "../definicion";

export const textosVi: TextosUi<UiPorcentaje> = {
  slug: "tinh-phan-tram",
  ui: () => ({
    modo: "Bạn muốn tính gì?",
    modoParte: "X% của Y là bao nhiêu?",
    modoProporcion: "X bằng bao nhiêu phần trăm của Y?",
    modoAumento: "Y cộng thêm X%",
    modoRebaja: "Y trừ đi X%",
    x: "Số X",
    xAyuda: "Tỷ lệ phần trăm. Nếu bạn chọn “X bằng bao nhiêu phần trăm của Y?”, hãy nhập phần giá trị đó.",
    y: "Số Y",
    resultado: "Kết quả",
    porcentaje: "Tỷ lệ phần trăm",
    diferencia: "Số được cộng thêm hoặc trừ đi",
    errorYCero: "Y không được bằng 0: không thể tính phần trăm của 0.",
    fraseParte: (x, y, r) => `${x}% của ${y} là ${r}.`,
    fraseProporcion: (x, y, p) => `${x} bằng ${p}% của ${y}.`,
    fraseAumento: (x, y, r, d) => `${y} cộng thêm ${x}% thành ${r}: tăng ${d}.`,
    fraseRebaja: (x, y, r, d) => `${y} trừ đi ${x}% thành ${r}: giảm ${d}.`,
  }),
};
