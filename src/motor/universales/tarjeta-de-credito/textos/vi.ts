import type { TextosUi } from "../../tipos";
import type { UiTarjetaDeCredito } from "../definicion";

export const textosVi: TextosUi<UiTarjetaDeCredito> = {
  slug: "tinh-lai-the-tin-dung",
  ui: () => ({
    saldo: "Dư nợ thẻ tín dụng",
    tasa: "Lãi suất mỗi năm (%)",
    tasaAyuda: "Lãi suất cho giao dịch mua sắm, tính theo năm. Nếu sao kê ghi lãi suất theo tháng, hãy nhân với 12.",
    modo: "Bạn sẽ thanh toán thế nào?",
    modoFijo: "Số tiền cố định mỗi tháng",
    modoMinimo: "Thanh toán tối thiểu",
    pagoFijo: "Số tiền trả cố định mỗi tháng",
    minimoPorcentaje: "Thanh toán tối thiểu (% dư nợ)",
    minimoPorcentajeAyuda: "Tỷ lệ đơn vị phát hành thẻ yêu cầu mỗi tháng. Xem trên sao kê của bạn.",
    minimoPiso: "Mức thanh toán tối thiểu thấp nhất",
    meses: "Số tháng đến khi trả hết",
    intereses: "Tiền lãi bạn trả",
    total: "Tổng số tiền đã trả",
    primerPago: "Khoản thanh toán tối thiểu đầu tiên",
    tabla: "Kế hoạch theo tháng",
    colMes: "Tháng",
    colPago: "Số tiền trả",
    colInteres: "Tiền lãi",
    colCapital: "Tiền gốc",
    colSaldo: "Dư nợ còn lại",
    errorSaldo: "Nhập dư nợ thẻ tín dụng còn lại.",
    errorFaltaPago: "Nhập số tiền bạn sẽ trả mỗi tháng.",
    errorNoCubre: (interes) => `Với số tiền đó, dư nợ không bao giờ giảm: riêng tiền lãi tháng đầu đã là ${interes}. Hãy tăng số tiền trả.`,
    errorMuyLargo: "Với số tiền đó, cần hơn 50 năm để trả hết. Hãy tăng số tiền trả.",
    observacionAnios: (anios, meses) => (meses === "0" ? `Tương đương ${anios} năm.` : `Tương đương ${anios} năm ${meses} tháng.`),
    observacionFijo: (pago, meses, ahorro) =>
      `Nếu luôn trả ${pago}, bằng khoản thanh toán tối thiểu đầu tiên, bạn trả hết dư nợ trong ${meses} tháng và tiết kiệm được ${ahorro} tiền lãi.`,
    observacionNoGastar: "Phép tính này giả định bạn không dùng thẻ để mua sắm thêm trong thời gian trả nợ.",
  }),
};
