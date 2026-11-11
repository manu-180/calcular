import type { TextosUi } from "../../tipos";
import type { UiAhorroRetiro } from "../definicion";

export const textosVi: TextosUi<UiAhorroRetiro> = {
  slug: "tiet-kiem-huu-tri",
  ui: () => ({
    edadActual: "Tuổi hiện tại của bạn",
    edadRetiro: "Tuổi bạn muốn nghỉ hưu",
    actual: "Số tiền đã tích lũy",
    aporte: "Số tiền góp mỗi tháng",
    rendimiento: "Lợi suất thực mỗi năm (%)",
    rendimientoAyuda: "Lợi nhuận đầu tư sau khi trừ lạm phát. Với kế hoạch dài hạn, từ 2% đến 5% là giả định thận trọng.",
    aniosRenta: "Số năm nghỉ hưu cần chi trả (năm)",
    aniosRentaAyuda: "Số năm bạn muốn dùng khoản tiền này sau khi nghỉ hưu.",
    capital: "Số tiền khi nghỉ hưu",
    renta: "Thu nhập mỗi tháng từ khoản tiền đó",
    aportado: "Tổng tiền đã góp",
    intereses: "Tổng phần tăng thêm",
    tabla: "Mức tăng theo độ tuổi",
    colEdad: "Tuổi",
    colAportado: "Đã góp đến lúc đó",
    colSaldo: "Số tiền",
    errorEdades: "Tuổi nghỉ hưu phải lớn hơn tuổi hiện tại của bạn.",
    errorSinAhorro: "Nhập số tiền đã có hoặc số tiền góp mỗi tháng.",
    observacionDineroDeHoy: "Mọi con số đều theo giá trị tiền hôm nay, vì lợi suất đã trừ lạm phát.",
    observacionPublica: "Đây chỉ là khoản tiết kiệm hưu trí cá nhân của bạn. Chưa tính lương hưu từ bảo hiểm xã hội hoặc từ nơi làm việc.",
  }),
};
