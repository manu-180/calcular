import type { TextosUi } from "../../tipos";
import type { UiPintura } from "../definicion";

const volumen = (u: string) => (u === "L" ? "lít" : "gallon Mỹ");

export const textosVi: TextosUi<UiPintura> = {
  slug: "tinh-luong-son",
  ui: () => ({
    modo: "Bạn có số đo nào?",
    modoMedidas: "Chiều dài và chiều cao tường",
    modoSuperficie: "Tổng diện tích",
    largo: (u) => `Tổng chiều dài tường (${u})`,
    largoAyuda: "Cộng tất cả các bức tường cần sơn. Với một phòng, dùng chu vi của phòng.",
    alto: (u) => `Chiều cao tường (${u})`,
    superficie: (u) => `Diện tích cần sơn (${u})`,
    aberturas: (u) => `Cửa đi và cửa sổ không sơn (${u})`,
    aberturasAyuda: "Một cửa đi khoảng 2 m² (21 ft²) và một cửa sổ thông thường khoảng 1 đến 2 m².",
    manos: "Số lớp sơn",
    rendimiento: (u) => `Độ phủ của sơn (${u})`,
    rendimientoAyuda: "Ghi trên thùng sơn: diện tích phủ được cho mỗi lớp. Nếu không biết, dùng giá trị gợi ý.",
    recomendado: (u) => `Lượng sơn cần mua (${volumen(u)})`,
    recomendadoAyuda: "Đã gồm 10% dự phòng để sửa chỗ lỗi và phần sơn còn dính trên con lăn.",
    necesario: (u) => `Lượng sơn vừa đủ (${volumen(u)})`,
    neta: (u) => `Diện tích được sơn (${u})`,
    errorMedidas: "Nhập chiều dài và chiều cao tường.",
    errorSuperficie: "Nhập diện tích cần sơn.",
    errorAberturas: "Cửa đi và cửa sổ không thể chiếm toàn bộ tường.",
    errorRendimiento: "Độ phủ của sơn phải lớn hơn 0.",
  }),
};
