import type { TextosUi } from "../../tipos";
import type { UiInteresCompuesto } from "../definicion";

export const textosVi: TextosUi<UiInteresCompuesto> = {
  slug: "tinh-lai-kep",
  ui: () => ({
    capital: "Tiền gốc ban đầu",
    aporte: "Tiền gửi thêm mỗi tháng (không bắt buộc)",
    aporteAyuda: "Số tiền bạn gửi thêm mỗi tháng. Được tính vào cuối tháng.",
    tasa: "Lãi suất mỗi năm (%)",
    anios: "Thời hạn (năm)",
    capitalizacion: "Kỳ nhập lãi",
    anual: "Hằng năm",
    semestral: "6 tháng một lần",
    trimestral: "Hằng quý",
    mensual: "Hằng tháng",
    diaria: "Hằng ngày",
    saldo: "Số dư cuối kỳ",
    aportado: "Tổng tiền đã gửi",
    intereses: "Tiền lãi nhận được",
    tabla: "Tăng trưởng theo năm",
    colAnio: "Năm",
    colAportado: "Tiền gửi",
    colIntereses: "Tiền lãi",
    colSaldo: "Số dư cuối năm",
    errorSinDinero: "Nhập tiền gốc ban đầu hoặc tiền gửi thêm mỗi tháng.",
    observacionIntereses: (porcentaje) => `Có ${porcentaje}% số dư cuối kỳ đến từ tiền lãi.`,
  }),
};
