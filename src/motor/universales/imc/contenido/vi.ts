import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { KG_POR_LB, M_POR_PULGADA } from "../definicion";

export const contenidoVi: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const m = 69 * M_POR_PULGADA;
  const ejemplo = imperial
    ? [
        `Người nặng 160 lb và cao 5 ft 9 in có BMI ${n((160 * KG_POR_LB) / (m * m))}, thuộc nhóm cân nặng bình thường.`,
        `Ở chiều cao đó, cân nặng lý tưởng là từ ${n((18.5 * m * m) / KG_POR_LB)} đến ${n((24.9 * m * m) / KG_POR_LB)} lb.`,
      ]
    : [
        `Người nặng 70 kg và cao ${n(1.75, 2)} m có BMI ${n(70 / (1.75 * 1.75))}, thuộc nhóm cân nặng bình thường.`,
        `Ở chiều cao đó, cân nặng lý tưởng là từ ${n(18.5 * 1.75 * 1.75)} đến ${n(24.9 * 1.75 * 1.75)} kg.`,
      ];
  return {
    h1: "Công cụ tính BMI",
    title: tituloQueEntre(`Công cụ tính BMI và cân nặng lý tưởng ${ctx.nombrePais}`, `Công cụ tính BMI ${ctx.nombrePais}`, "Công cụ tính BMI"),
    description: "Tính chỉ số khối cơ thể (BMI) từ cân nặng và chiều cao của bạn, xem phân loại theo WHO và khoảng cân nặng lý tưởng.",
    intro: [
      "Nhập cân nặng và chiều cao của bạn. Bạn sẽ thấy chỉ số BMI, phân loại theo Tổ chức Y tế Thế giới (WHO) và khoảng cân nặng lý tưởng với chiều cao của mình.",
      "Đây là chỉ số tham khảo chung cho người trưởng thành. Kết quả không thay thế việc khám và tư vấn với bác sĩ hoặc nhân viên y tế.",
    ],
    comoSeCalcula: [
      imperial ? "BMI = cân nặng tính bằng pound × 703 ÷ (chiều cao tính bằng inch × chiều cao tính bằng inch)." : "BMI = cân nặng tính bằng kg ÷ (chiều cao tính bằng mét × chiều cao tính bằng mét).",
      `Dưới ${n(18.5)} là thiếu cân. Từ ${n(18.5)} đến ${n(24.9)} là bình thường. Từ 25 đến ${n(29.9)} là thừa cân. Từ 30 trở lên là béo phì.`,
      `Khoảng cân nặng lý tưởng là mức cân cho BMI từ ${n(18.5)} đến ${n(24.9)} ở chiều cao của bạn.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Chỉ số BMI bao nhiêu là bình thường?",
        respuesta: `Theo WHO, BMI bình thường ở người trưởng thành là từ ${n(18.5)} đến ${n(24.9)}. Khoảng này như nhau cho nữ và nam.`,
      },
      {
        pregunta: "BMI có áp dụng cho tất cả mọi người không?",
        respuesta: "Không. BMI không phân biệt cơ và mỡ, nên người nhiều cơ có thể có chỉ số cao. Với phụ nữ mang thai, trẻ em và thanh thiếu niên, cần dùng cách đánh giá khác.",
      },
      {
        pregunta: "Cách tính BMI thủ công như thế nào?",
        respuesta: imperial
          ? "Nhân cân nặng tính bằng pound với 703, rồi chia cho bình phương chiều cao tính bằng inch. Với 5 ft 9 in, bình phương là 69 × 69."
          : `Chia cân nặng tính bằng kg cho bình phương chiều cao tính bằng mét. Với chiều cao ${n(1.7, 2)} m, bình phương là ${n(1.7, 2)} × ${n(1.7, 2)} = ${n(1.7 * 1.7, 2)}.`,
      },
    ],
    glosario: [
      { termino: "BMI", definicion: "Body mass index hay chỉ số khối cơ thể: tỷ lệ giữa cân nặng và chiều cao." },
      { termino: "WHO", definicion: "Tổ chức Y tế Thế giới, đơn vị đưa ra các phân loại BMI cho người trưởng thành." },
    ],
  };
};
