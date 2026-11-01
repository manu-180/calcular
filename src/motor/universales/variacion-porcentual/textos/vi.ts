import type { TextosUi } from "../../tipos";
import type { UiVariacion } from "../definicion";

export const textosVi: TextosUi<UiVariacion> = {
  slug: "tinh-phan-tram-thay-doi",
  ui: () => ({
    inicial: "Giá trị ban đầu",
    final: "Giá trị cuối",
    variacion: "Phần trăm thay đổi",
    diferencia: "Chênh lệch",
    vuelta: "Để quay về giá trị ban đầu",
    vueltaAyuda: "Mức thay đổi cần có của giá trị cuối để quay về giá trị ban đầu.",
    errorInicialCero: "Giá trị ban đầu không được bằng 0: không thể tính phần trăm thay đổi từ số 0.",
    subio: (p) => `Tăng ${p}%.`,
    bajo: (p) => `Giảm ${p}%.`,
    igual: "Không thay đổi: hai giá trị bằng nhau.",
  }),
};
