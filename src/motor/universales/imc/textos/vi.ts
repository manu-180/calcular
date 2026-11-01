import type { TextosUi } from "../../tipos";
import type { UiImc } from "../definicion";

export const textosVi: TextosUi<UiImc> = {
  slug: "tinh-bmi",
  ui: () => ({
    peso: (u) => `Cân nặng (${u})`,
    altura: (u) => `Chiều cao (${u})`,
    pies: "Chiều cao: feet (ft)",
    pulgadas: "Chiều cao: inch (in)",
    imc: "Chỉ số khối cơ thể (BMI)",
    categoria: "Phân loại (WHO)",
    pesoMin: (u) => `Cân nặng lý tưởng từ (${u})`,
    pesoMax: (u) => `Cân nặng lý tưởng đến (${u})`,
    rangoAyuda: "Khoảng cân nặng cho chỉ số BMI bình thường ở chiều cao này.",
    bajo: "Thiếu cân",
    normal: "Cân nặng bình thường",
    sobrepeso: "Thừa cân",
    obesidad1: "Béo phì độ 1",
    obesidad2: "Béo phì độ 2",
    obesidad3: "Béo phì độ 3",
    errorPeso: "Cân nặng phải lớn hơn 0.",
    errorAltura: "Chiều cao phải lớn hơn 0.",
    aviso:
      "BMI là chỉ số tham khảo chung cho người trưởng thành. BMI không phân biệt cơ và mỡ, và không áp dụng như nhau cho phụ nữ mang thai hoặc trẻ em. Kết quả này không thay thế việc khám và tư vấn với bác sĩ hoặc nhân viên y tế.",
  }),
};
