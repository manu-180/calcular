import type { TextosUi } from "../../tipos";
import type { UiFondoDeEmergencia } from "../definicion";

export const textosVi: TextosUi<UiFondoDeEmergencia> = {
  slug: "quy-khan-cap",
  ui: () => ({
    gastos: "Chi tiêu thiết yếu mỗi tháng",
    gastosAyuda: "Những khoản vẫn phải trả: nhà ở, ăn uống, điện nước, đi lại, y tế và trả nợ.",
    meses: "Số tháng muốn dự phòng",
    mesesAyuda: "3 đến 6 tháng nếu thu nhập của bạn ổn định. Nhiều hơn nếu thu nhập không đều hoặc gia đình chỉ có một nguồn thu nhập.",
    actual: "Số tiền bạn đã để dành (không bắt buộc)",
    aporte: "Số tiền bạn có thể tiết kiệm mỗi tháng (không bắt buộc)",
    meta: "Quỹ khẩn cấp đề xuất",
    falta: "Số tiền còn phải tiết kiệm",
    mesesParaLlegar: "Số tháng để đủ quỹ",
    cobertura: "Số tháng khoản tiết kiệm hiện tại đủ trang trải",
    errorGastos: "Vui lòng nhập chi tiêu thiết yếu của bạn trong một tháng.",
    yaCubierto: "Quỹ khẩn cấp của bạn đã đủ. Khoản tiết kiệm tiếp theo có thể dành cho mục tiêu khác.",
    sinAporte: "Nhập số tiền bạn có thể tiết kiệm mỗi tháng để biết cần bao lâu.",
    observacionDonde:
      "Hãy giữ trong một tài khoản riêng, rút được ngay trong ngày và giữ được giá trị, ví dụ tài khoản tiết kiệm hoặc quỹ thị trường tiền tệ.",
  }),
};
