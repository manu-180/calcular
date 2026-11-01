import type { TextosUi } from "../../tipos";
import type { UiAumentoDeSueldo } from "../definicion";

export const textosVi: TextosUi<UiAumentoDeSueldo> = {
  slug: "tinh-tang-luong",
  ui: () => ({
    sueldo: "Lương hiện tại mỗi tháng",
    sueldoAyuda: "Lương gross (trước thuế) hoặc lương net, chọn một loại. Kết quả dùng cùng cơ sở đó.",
    aumentoPorcentaje: "Mức tăng lương (%)",
    aumentoMonto: "Mức tăng bằng số tiền (không bắt buộc)",
    aumentoMontoAyuda: "Nếu mức tăng của bạn là một số tiền cố định, nhập vào đây. Số này được dùng thay cho phần trăm.",
    inflacion: "Lạm phát trong giai đoạn đó (%, không bắt buộc)",
    inflacionAyuda: "Lạm phát từ lần tăng lương gần nhất, để xem lương của bạn mua được nhiều hơn hay ít hơn trước.",
    sueldosAnio: "Số tháng lương mỗi năm",
    sueldosAnioAyuda: "12 nếu nhận lương theo tháng. 13 trở lên nếu bạn có thêm lương tháng 13 hoặc khoản lương bổ sung hằng năm.",
    nuevo: "Lương mới mỗi tháng",
    diferenciaMensual: "Chênh lệch mỗi tháng",
    diferenciaAnual: "Chênh lệch mỗi năm",
    porcentaje: "Mức tăng theo phần trăm",
    real: "Mức tăng thực (sau lạm phát)",
    realAyuda: "Sức mua của lương mới tăng thêm bao nhiêu so với lương cũ.",
    errorSueldo: "Nhập lương hiện tại của bạn.",
    errorSinAumento: "Nhập mức tăng theo phần trăm hoặc số tiền.",
    observacionGana: (puntos) => `Mức tăng của bạn cao hơn lạm phát: sức mua của lương tăng ${puntos}% so với trước.`,
    observacionPierde: (puntos) => `Mức tăng của bạn thấp hơn lạm phát: sức mua của lương giảm ${puntos}% so với trước.`,
    observacionIgual: "Mức tăng của bạn bằng lạm phát: sức mua của lương giữ nguyên như trước.",
  }),
};
