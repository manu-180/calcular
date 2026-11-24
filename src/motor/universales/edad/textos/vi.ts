import type { TextosUi } from "../../tipos";
import { duracionVi } from "../../dias-entre-fechas/textos/vi";
import type { UiEdad } from "../definicion";

export const textosVi: TextosUi<UiEdad> = {
  slug: "tinh-tuoi",
  ui: () => ({
    nacimiento: "Ngày sinh",
    referencia: "Tuổi vào ngày",
    referenciaAyuda: "Mặc định là hôm nay. Đổi để xem tuổi vào một ngày khác.",
    edad: "Tuổi",
    anios: "Số tuổi",
    totalMeses: "Theo tháng",
    totalSemanas: "Theo tuần",
    totalDias: "Theo ngày",
    proximo: "Sinh nhật tiếp theo",
    faltan: "Số ngày còn lại",
    cumplira: "Sẽ tròn (tuổi)",
    duracion: duracionVi,
    errorFutura: "Ngày sinh không được sau ngày bạn đang kiểm tra.",
    cumpleHoy: (anios) => `Hôm nay là sinh nhật: tròn ${anios} tuổi.`,
    nota29: "Với người sinh ngày 29 tháng 2, sinh nhật được tính vào ngày 28 tháng 2 trong những năm không nhuận.",
  }),
};
