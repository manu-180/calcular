import type { TextosUi } from "../../tipos";
import type { UiPrestamo } from "../definicion";

export const textosVi: TextosUi<UiPrestamo> = {
  slug: "tinh-lai-vay",
  ui: () => ({
    monto: "Số tiền vay",
    tasa: "Lãi suất theo năm (%)",
    tasaAyuda: "Lãi suất năm tính trên dư nợ giảm dần ghi trong đề nghị vay. Chưa gồm phí hồ sơ và phí quản lý khoản vay.",
    meses: "Thời hạn vay (tháng)",
    extra: "Trả thêm mỗi tháng (không bắt buộc)",
    extraAyuda: "Số tiền bạn trả thêm mỗi tháng để tất toán sớm hơn. Toàn bộ khoản này được trừ vào tiền gốc.",
    cuota: "Tiền trả hằng tháng",
    intereses: "Tổng tiền lãi vay",
    total: "Tổng số tiền phải trả",
    mesesReales: "Số tháng đến khi tất toán nếu trả thêm",
    ahorro: "Tiền lãi vay bạn tiết kiệm được",
    tabla: "Lịch trả nợ",
    colMes: "Tháng",
    colPago: "Tiền trả",
    colInteres: "Tiền lãi",
    colCapital: "Tiền gốc",
    colSaldo: "Dư nợ còn lại",
    errorMonto: "Nhập số tiền vay lớn hơn 0.",
    observacionCostos:
      "Số tiền trả hằng tháng này chưa gồm bảo hiểm, phí hồ sơ, phí quản lý khoản vay hoặc thuế mà bên cho vay có thể cộng thêm. Hãy hỏi tổng chi phí trước khi ký.",
    observacionExtra: (meses, ahorro) => `Khi trả thêm, khoản vay được tất toán sau ${meses} tháng và bạn tiết kiệm ${ahorro} tiền lãi vay.`,
  }),
};
