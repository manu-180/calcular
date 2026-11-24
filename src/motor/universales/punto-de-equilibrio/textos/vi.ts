import type { TextosUi } from "../../tipos";
import type { UiPuntoDeEquilibrio } from "../definicion";

export const textosVi: TextosUi<UiPuntoDeEquilibrio> = {
  slug: "tinh-diem-hoa-von",
  ui: () => ({
    fijos: "Chi phí cố định mỗi tháng",
    fijosAyuda: "Chi phí vẫn phải trả dù không bán được hàng: thuê mặt bằng, lương cố định, điện, phí phần mềm.",
    precio: "Giá bán mỗi đơn vị",
    variable: "Chi phí biến đổi mỗi đơn vị",
    variableAyuda: "Chi phí cho mỗi đơn vị bán ra: nguyên liệu, hàng hóa, hoa hồng, phí giao hàng.",
    objetivo: "Lợi nhuận mục tiêu mỗi tháng (không bắt buộc)",
    objetivoAyuda: "Để xem cần bán bao nhiêu trên mức hòa vốn.",
    unidades: "Số đơn vị để hòa vốn",
    facturacion: "Doanh thu để hòa vốn",
    contribucion: "Số dư đảm phí mỗi đơn vị",
    contribucionAyuda: "Phần còn lại của mỗi lần bán để bù chi phí cố định: giá bán trừ chi phí biến đổi.",
    contribucionPct: "Tỷ lệ số dư đảm phí (%)",
    unidadesObjetivo: "Số đơn vị để đạt lợi nhuận mục tiêu",
    facturacionObjetivo: "Doanh thu để đạt lợi nhuận mục tiêu",
    errorPrecio: "Nhập giá bán của một đơn vị.",
    errorMargen:
      "Chi phí biến đổi bằng hoặc cao hơn giá bán: mỗi lần bán đều lỗ và không bao giờ hòa vốn. Hãy kiểm tra lại giá hoặc chi phí.",
    observacionRedondeo: "Số đơn vị được làm tròn lên, vì không thể bán nửa đơn vị.",
  }),
};
