import type { TextosUi } from "../../tipos";
import type { UiHipoteca } from "../definicion";

export const textosVi: TextosUi<UiHipoteca> = {
  slug: "tinh-vay-mua-nha",
  ui: () => ({
    precio: "Giá nhà",
    entradaPorcentaje: "Trả trước (% giá nhà)",
    entradaMonto: "Số tiền trả trước (không bắt buộc)",
    entradaMontoAyuda: "Nếu nhập, số này sẽ được dùng thay cho phần trăm.",
    tasa: "Lãi suất vay mua nhà mỗi năm (%)",
    anios: "Thời hạn vay (năm)",
    gastos: "Chi phí nhà ở mỗi tháng (không bắt buộc)",
    gastosAyuda: "Thuế nhà đất, bảo hiểm nhà hoặc phí quản lý mà bạn trả cùng tiền trả hằng tháng.",
    cuota: "Tiền trả hằng tháng",
    cuotaTotal: "Tiền trả hằng tháng kèm chi phí nhà ở",
    entrada: "Tiền trả trước",
    prestado: "Số tiền vay",
    intereses: "Tổng tiền lãi",
    total: "Tổng số tiền phải trả",
    tabla: "Theo năm",
    colAnio: "Năm",
    colIntereses: "Tiền lãi đã trả",
    colCapital: "Tiền gốc đã trả",
    colSaldo: "Dư nợ cuối năm",
    errorPrecio: "Vui lòng nhập giá nhà.",
    errorEntrada: "Tiền trả trước đã bằng toàn bộ giá nhà, nên không có khoản vay nào để tính. Hãy giảm số tiền trả trước.",
    observacionPrestado: (porcentaje) => `Bạn vay ${porcentaje}% giá nhà. Tỷ lệ vay càng cao, điều kiện của ngân hàng thường càng chặt.`,
    observacionCostos: "Phí hợp đồng, công chứng, thuế khi mua nhà, định giá và phí xử lý hồ sơ chưa được tính. Hãy chuẩn bị riêng khoản này ngoài tiền trả trước.",
  }),
};
