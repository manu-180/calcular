import type { TextosUi } from "../../tipos";
import type { UiTarifaFreelance } from "../definicion";

export const textosVi: TextosUi<UiTarifaFreelance> = {
  slug: "tinh-gia-freelance",
  ui: () => ({
    ingreso: "Thu nhập thực nhận bạn muốn có mỗi năm",
    ingresoAyuda: "Sau thuế và chi phí kinh doanh. Xem đây là lương của bạn khi làm freelancer.",
    gastos: "Chi phí kinh doanh mỗi năm",
    gastosAyuda: "Thiết bị, ứng dụng, internet, khóa học, dịch vụ kế toán, bảo hiểm y tế và tiết kiệm hưu trí.",
    impuestos: "Thuế và các khoản đóng ước tính (%)",
    impuestosAyuda:
      "Phần nộp thuế tính trên số tiền hóa đơn trừ chi phí. Nếu chưa chắc, hãy hỏi kế toán. Có thể bắt đầu với 25%.",
    diasLibres: "Số ngày nghỉ mỗi năm",
    diasLibresAyuda: "Nghỉ phép, ngày lễ và ngày ốm. Không ai trả tiền cho những ngày này, nên mức giá của bạn phải bù vào.",
    diasSemana: "Số ngày làm việc mỗi tuần",
    horasSemana: "Số giờ tính phí được mỗi tuần",
    horasSemanaAyuda:
      "Chỉ tính giờ bạn thu tiền khách. Tìm khách hàng, làm giấy tờ và học thêm không tính phí được. Thường là 20 đến 30 trong 40 giờ.",
    tarifaHora: "Giá theo giờ",
    tarifaDia: "Giá theo ngày",
    facturacionMensual: "Số tiền cần xuất hóa đơn mỗi tháng",
    facturacionAnual: "Số tiền cần xuất hóa đơn mỗi năm",
    horasAnio: "Số giờ tính phí được mỗi năm",
    errorIngreso: "Nhập thu nhập bạn muốn có mỗi năm.",
    errorImpuestos: "Thuế phải dưới 100%.",
    errorDias: "Với số ngày nghỉ đó, không còn ngày làm việc nào trong năm.",
    errorHoras: "Nhập số giờ tính phí được mỗi tuần.",
    observacionFacturables: "Nếu mức giá của bạn thấp hơn con số này, thu nhập sẽ dưới kế hoạch hoặc số giờ làm sẽ tăng.",
  }),
};
