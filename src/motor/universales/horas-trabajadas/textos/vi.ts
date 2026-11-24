import type { TextosUi } from "../../tipos";
import type { UiHorasTrabajadas } from "../definicion";

export const textosVi: TextosUi<UiHorasTrabajadas> = {
  slug: "tinh-gio-lam",
  ui: () => ({
    dias: ["Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy", "Chủ Nhật"],
    entrada: (dia) => `${dia}: giờ vào`,
    salida: (dia) => `${dia}: giờ ra`,
    horarioAyuda: "Để trống những ngày bạn không làm việc. Nếu tan ca sau nửa đêm, vẫn tính là một ca.",
    pausa: "Thời gian nghỉ không lương mỗi ngày (phút)",
    pausaAyuda: "Giờ nghỉ trưa hoặc giờ nghỉ không được trả lương. Được trừ vào mỗi ngày làm việc.",
    pagoHora: "Lương theo giờ",
    umbral: "Số giờ làm thường mỗi tuần (không bắt buộc)",
    umbralAyuda: "Số giờ vượt mức này được trả theo mức tăng ca. Để trống nếu không có tăng ca.",
    recargo: "Phụ trội tăng ca (%)",
    recargoAyuda: "Mỗi giờ tăng ca được trả cao hơn bao nhiêu phần trăm. 50% nghĩa là 1,5 lần lương theo giờ.",
    horasTotales: "Giờ làm",
    horasReloj: "Tính theo giờ và phút",
    horasNormales: "Giờ làm thường",
    horasExtra: "Giờ tăng ca",
    pagoNormal: "Lương giờ làm thường",
    pagoExtra: "Tiền tăng ca",
    pagoTotal: "Tổng lương tuần này",
    tabla: "Chi tiết theo ngày",
    colDia: "Ngày",
    colEntrada: "Giờ vào",
    colSalida: "Giờ ra",
    colHoras: "Số giờ",
    errorFaltaSalida: (dia) => `Chưa nhập giờ ra của ${dia}.`,
    errorFaltaEntrada: (dia) => `Chưa nhập giờ vào của ${dia}.`,
    errorIguales: (dia) => `Giờ vào và giờ ra của ${dia} trùng nhau.`,
    errorPausa: (dia) => `Thời gian nghỉ bằng hoặc dài hơn ca làm của ${dia}.`,
    errorSinDias: "Nhập giờ vào và giờ ra cho ít nhất một ngày.",
    observacionNoche: "Có ca kết thúc vào hôm sau: toàn bộ số giờ được tính cho ngày bắt đầu ca.",
    observacionGenerico:
      "Đây là phép tính chung. Giới hạn giờ làm, quy định tăng ca và lương làm đêm hoặc ngày lễ tùy thuộc vào quy định lao động và hợp đồng của bạn.",
  }),
};
