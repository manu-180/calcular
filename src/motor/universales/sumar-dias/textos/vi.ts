import type { TextosUi } from "../../tipos";
import type { UiSumarDias } from "../definicion";

export const textosVi: TextosUi<UiSumarDias> = {
  slug: "cong-tru-ngay",
  ui: () => ({
    fecha: "Ngày bắt đầu",
    operacion: "Phép tính",
    sumar: "Cộng ngày",
    restar: "Trừ ngày",
    dias: "Số ngày",
    tipo: "Loại ngày",
    corridos: "Ngày theo lịch",
    habiles: "Ngày làm việc (Thứ Hai đến Thứ Sáu)",
    resultado: "Ngày kết quả",
    diaSemana: "Thứ",
    diasCorridos: "Tổng số ngày theo lịch",
    nombresDias: ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"],
    errorDias: "Số ngày phải là số nguyên, tối đa 100 năm.",
    notaHabiles: "Ngày làm việc bỏ qua Thứ Bảy và Chủ Nhật, nhưng không bỏ qua ngày lễ. Nếu có ngày lễ trong khoảng này, hãy cộng thêm riêng.",
  }),
};
