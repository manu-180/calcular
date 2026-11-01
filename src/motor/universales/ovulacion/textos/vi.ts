import type { TextosUi } from "../../tipos";
import type { UiOvulacion } from "../definicion";

export const textosVi: TextosUi<UiOvulacion> = {
  slug: "tinh-ngay-rung-trung",
  ui: () => ({
    fum: "Ngày đầu tiên của kỳ kinh gần nhất",
    fumAyuda: "Ngày đầu tiên ra máu kinh, không phải ngày cuối cùng.",
    ciclo: "Độ dài chu kỳ kinh nguyệt (ngày)",
    cicloAyuda: "Tính từ ngày đầu của kỳ kinh này đến ngày trước kỳ kinh sau. Nếu thay đổi theo từng tháng, hãy dùng số trung bình.",
    ovulacion: "Ngày rụng trứng dự kiến",
    fertilDesde: "Bắt đầu thời kỳ dễ thụ thai",
    fertilHasta: "Kết thúc thời kỳ dễ thụ thai",
    proxima: "Kỳ kinh tiếp theo",
    tabla: "Các chu kỳ tiếp theo",
    colRegla: "Kỳ kinh",
    colDesde: "Dễ thụ thai từ",
    colHasta: "Dễ thụ thai đến",
    colOvulacion: "Rụng trứng",
    errorCiclo: "Độ dài chu kỳ phải từ 21 đến 45 ngày.",
    aviso: "Đây là ước tính cho chu kỳ đều. Công cụ này không phải biện pháp tránh thai và không thay thế tư vấn của bác sĩ hoặc nữ hộ sinh.",
  }),
};
