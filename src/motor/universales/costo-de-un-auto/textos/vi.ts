import type { TextosUi } from "../../tipos";
import type { UiCostoDeUnAuto } from "../definicion";

export const textosVi: TextosUi<UiCostoDeUnAuto> = {
  slug: "chi-phi-nuoi-o-to",
  ui: () => ({
    precio: "Giá trị xe",
    precioAyuda: "Giá mua, hoặc giá thị trường hiện tại nếu bạn đã dùng xe lâu.",
    depreciacion: "Khấu hao mỗi năm (%)",
    depreciacionAyuda: "Xe mới mất 15% đến 25% giá trị trong năm đầu. Xe cũ thường mất ít hơn.",
    cuota: "Tiền trả hằng tháng cho khoản vay (không bắt buộc)",
    cuotaAyuda: "Chỉ để xem số tiền rời khỏi tài khoản mỗi tháng. Không cộng vào chi phí thực.",
    seguro: "Bảo hiểm mỗi tháng",
    distanciaKm: "Số km mỗi tháng",
    distanciaMi: "Số dặm mỗi tháng",
    consumoL100: "Mức tiêu thụ nhiên liệu (lít/100 km)",
    consumoMpg: "Hiệu suất nhiên liệu (dặm/gallon)",
    precioLitro: "Giá nhiên liệu mỗi lít",
    precioGalon: "Giá nhiên liệu mỗi gallon",
    mantenimiento: "Bảo dưỡng mỗi tháng",
    mantenimientoAyuda: "Bảo dưỡng định kỳ, lốp xe, sửa chữa và rửa xe, tính trung bình theo tháng.",
    estacionamiento: "Gửi xe mỗi tháng (không bắt buộc)",
    otros: "Thuế xe, phí đường bộ và chi phí khác mỗi tháng (không bắt buộc)",
    otrosAyuda: "Thuế và phí hằng năm, đăng kiểm, phí đường bộ và tiền phạt, tính trung bình theo tháng.",
    costoMensual: "Chi phí thực mỗi tháng",
    costoAnual: "Chi phí thực mỗi năm",
    porKm: "Chi phí mỗi km",
    porMilla: "Chi phí mỗi dặm",
    combustible: "Nhiên liệu mỗi tháng",
    depreciacionMensual: "Khấu hao mỗi tháng",
    gastoBolsillo: "Số tiền rời khỏi tài khoản mỗi tháng",
    errorConsumo: "Vui lòng nhập mức tiêu thụ nhiên liệu của xe để tính chi phí nhiên liệu.",
    observacionCuota:
      "Tiền trả hằng tháng không được tính vào chi phí thực vì một phần trong đó là để trả cho chính chiếc xe, vốn đã được tính qua khấu hao. Tiền lãi của khoản vay là chi phí phát sinh thêm ngoài phần này.",
  }),
};
