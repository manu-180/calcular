import type { TextosUi } from "../../tipos";
import type { UiMetrosCuadrados } from "../definicion";

export const textosVi: TextosUi<UiMetrosCuadrados> = {
  slug: "tinh-dien-tich",
  ui: () => ({
    forma: (n) => `Phần ${n}: hình dạng`,
    formaAyuda: "Nếu phòng hình chữ L hoặc không đều, hãy chia thành nhiều phần rồi cộng lại.",
    ninguna: "Không dùng",
    rectangulo: "Hình chữ nhật hoặc hình vuông",
    triangulo: "Hình tam giác",
    circulo: "Hình tròn",
    medidaA: (n, u) => `Phần ${n}: chiều dài, cạnh đáy hoặc đường kính (${u})`,
    medidaAAyuda: "Hình chữ nhật: chiều dài và chiều rộng. Hình tam giác: cạnh đáy và chiều cao. Hình tròn: chỉ cần đường kính.",
    medidaB: (n, u) => `Phần ${n}: chiều rộng hoặc chiều cao (${u})`,
    total: (u) => `Tổng diện tích (${u})`,
    equivale: (u) => `Quy đổi sang ${u}`,
    parcial: (n, u) => `Phần ${n} (${u})`,
    errorMedida: "Số đo này chưa nhập hoặc bằng 0.",
  }),
};
