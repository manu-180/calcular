import type { TextosUi } from "../../tipos";
import type { UiPromedio } from "../definicion";

export const textosVi: TextosUi<UiPromedio> = {
  slug: "tinh-trung-binh",
  ui: () => ({
    nota: (n) => `Điểm ${n}`,
    notaAyuda: "Nhập từng điểm cùng trọng số của điểm đó. Để trống những dòng không dùng.",
    peso: (n) => `Trọng số ${n}`,
    pesoAyuda: "Có thể là phần trăm, số tín chỉ hoặc số lần điểm đó được tính. Không có trọng số, mọi điểm được tính như nhau.",
    ponderado: "Trung bình có trọng số",
    simple: "Trung bình cộng",
    cantidad: "Số lượng điểm",
    sumaPesos: "Tổng trọng số",
    errorSinNotas: "Nhập ít nhất một điểm.",
    errorFaltaPeso: "Điểm này chưa có trọng số. Nếu dùng trọng số, hãy nhập trọng số cho mọi điểm.",
    errorFaltaNota: "Trọng số này chưa có điểm. Nhập điểm hoặc xóa trọng số.",
    errorPesosCero: "Tổng trọng số bằng 0: ít nhất một trọng số phải lớn hơn 0.",
    sinPesos: "Không có trọng số, trung bình có trọng số bằng trung bình cộng.",
  }),
};
