import type { TextosUi } from "../../tipos";
import type { UiConsumoElectrico } from "../definicion";

export const textosVi: TextosUi<UiConsumoElectrico> = {
  slug: "tinh-tien-dien",
  ui: () => ({
    potencia: "Công suất thiết bị (watt)",
    potenciaAyuda: "Ghi trên nhãn hoặc sách hướng dẫn, theo watt (W). Nếu ghi kW, nhân với 1.000.",
    cantidad: "Số thiết bị giống nhau",
    horas: "Số giờ dùng mỗi ngày",
    dias: "Số ngày dùng mỗi tháng",
    precio: "Giá điện mỗi kWh",
    precioAyuda: "Xem trên hóa đơn tiền điện: giá mỗi kWh, gồm cả thuế nếu bạn muốn biết toàn bộ chi phí.",
    kwhDia: "Điện tiêu thụ mỗi ngày (kWh)",
    kwhMes: "Điện tiêu thụ mỗi tháng (kWh)",
    kwhAnio: "Điện tiêu thụ mỗi năm (kWh)",
    costoDia: "Chi phí mỗi ngày",
    costoMes: "Chi phí mỗi tháng",
    costoAnio: "Chi phí mỗi năm",
    errorHoras: "Một ngày có 24 giờ: số giờ dùng phải từ 0 đến 24.",
  }),
};
