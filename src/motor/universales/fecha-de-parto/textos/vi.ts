import type { TextosUi } from "../../tipos";
import type { UiFechaDeParto } from "../definicion";

export const textosVi: TextosUi<UiFechaDeParto> = {
  slug: "tinh-ngay-du-sinh",
  ui: () => ({
    metodo: "Bạn biết ngày nào?",
    fum: "Ngày đầu của kỳ kinh cuối",
    concepcion: "Ngày thụ thai",
    fecha: "Ngày",
    fechaAyuda: "Nếu chọn kỳ kinh cuối, nhập ngày đầu tiên có kinh.",
    ciclo: "Độ dài chu kỳ kinh (ngày)",
    cicloAyuda: "Chỉ dùng với kỳ kinh cuối. Nếu không biết, giữ nguyên 28.",
    fpp: "Ngày dự sinh",
    edadGestacional: "Tuổi thai hôm nay",
    trimestre: "Tam cá nguyệt",
    faltan: "Số ngày còn lại",
    fechaConcepcion: "Ngày thụ thai ước tính",
    semanasYDias: (s, d) => `${s} tuần${d ? ` ${d} ngày` : ""}`,
    trimestres: ["Tam cá nguyệt thứ nhất", "Tam cá nguyệt thứ hai", "Tam cá nguyệt thứ ba"],
    errorFutura: "Ngày không được sau hôm nay.",
    errorCiclo: "Độ dài chu kỳ phải từ 20 đến 45 ngày.",
    notaPasada: "Đã hơn 42 tuần kể từ ngày đó, nên tuổi thai không được hiển thị.",
    aviso: "Đây chỉ là ước tính: rất ít em bé chào đời đúng ngày dự sinh. Siêu âm và khám định kỳ với bác sĩ hoặc nữ hộ sinh sẽ cho ngày chính xác nhất.",
  }),
};
