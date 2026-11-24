import type { TextosUi } from "../../tipos";
import type { UiConversorSueldo } from "../definicion";

export const textosVi: TextosUi<UiConversorSueldo> = {
  slug: "quy-doi-luong",
  ui: () => ({
    monto: "Lương",
    periodo: "Lương tính theo",
    hora: "Giờ",
    dia: "Ngày",
    semana: "Tuần",
    quincena: "Nửa tháng (24 lần mỗi năm)",
    mes: "Tháng",
    anio: "Năm",
    horasSemana: "Số giờ làm mỗi tuần",
    diasSemana: "Số ngày làm mỗi tuần",
    semanasAnio: "Số tuần được trả lương mỗi năm",
    semanasAnioAyuda: "52 nếu kỳ nghỉ của bạn vẫn được trả lương. Nếu chỉ được trả cho các tuần đi làm, hãy trừ các tuần còn lại.",
    porHora: "Mỗi giờ",
    porDia: "Mỗi ngày",
    porSemana: "Mỗi tuần",
    porQuincena: "Mỗi nửa tháng",
    porMes: "Mỗi tháng",
    porAnio: "Mỗi năm",
    errorHoras: "Nhập số giờ bạn làm mỗi tuần.",
    errorSemanas: "Số tuần được trả lương mỗi năm phải lớn hơn 0.",
    observacionBruto: "Đây là cùng một số tiền quy đổi sang kỳ khác. Chưa cộng thưởng và lương tháng 13, chưa trừ thuế.",
  }),
};
