import type { TextosUi } from "../../tipos";
import type { UiInteresSimple } from "../definicion";

export const textosVi: TextosUi<UiInteresSimple> = {
  slug: "tinh-lai-don",
  ui: () => ({
    capital: "Tiền gốc",
    tasa: "Lãi suất mỗi năm (%)",
    tiempo: "Thời hạn",
    unidad: "Đơn vị thời gian",
    dias: "Ngày",
    meses: "Tháng",
    anios: "Năm",
    base: "Số ngày trong năm (với thời hạn tính theo ngày)",
    baseAyuda: "Một số ngân hàng tính một năm là 360 ngày. Nếu chưa chắc, hãy giữ 365.",
    base365: "365 ngày",
    base360: "360 ngày (năm ngân hàng)",
    interes: "Tiền lãi",
    montoFinal: "Gốc cộng lãi",
    tasaPeriodo: "Lãi suất cho thời hạn này",
    errorCapital: "Nhập tiền gốc lớn hơn 0.",
  }),
};
