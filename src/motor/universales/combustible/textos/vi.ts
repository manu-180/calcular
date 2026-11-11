import type { TextosUi } from "../../tipos";
import type { UiCombustible } from "../definicion";

export const textosVi: TextosUi<UiCombustible> = {
  slug: "tinh-chi-phi-xang",
  ui: () => ({
    distancia: (u) => `Quãng đường (${u})`,
    idaYVuelta: "Cả đi và về",
    tipoConsumo: "Cách đo mức tiêu thụ nhiên liệu",
    l100: "Lít trên 100 km",
    kml: "Kilômét trên lít (km/l)",
    consumo: "Mức tiêu thụ nhiên liệu",
    consumoMpg: "Mức tiêu thụ nhiên liệu (dặm trên gallon)",
    consumoAyuda: "Xem sổ hướng dẫn hoặc màn hình thông tin trên xe. Đi đường cao tốc thường tiết kiệm hơn đi trong thành phố.",
    precio: (u) => (u === "L" ? "Giá mỗi lít" : "Giá mỗi gallon"),
    personas: "Số người chia tiền",
    costo: "Chi phí xăng",
    porPersona: "Mỗi người",
    combustible: (u) => (u === "L" ? "Lượng xăng cần (lít)" : "Lượng xăng cần (gallon)"),
    distanciaTotal: (u) => `Tổng quãng đường (${u})`,
    costoPorDistancia: (u) => (u === "mi" ? "Chi phí mỗi dặm" : `Chi phí mỗi ${u}`),
    errorConsumo: "Mức tiêu thụ nhiên liệu phải lớn hơn 0.",
    errorPersonas: "Phải có ít nhất một người.",
  }),
};
