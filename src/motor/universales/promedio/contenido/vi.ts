import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoVi: ContenidoUniversal = (ctx) => {
  const n = (x: number) => formatearNumero(ctx, x, Number.isInteger(x) ? 0 : 1);
  const notas = [70, 80, 90];
  const pesos = [20, 30, 50];
  const ponderado = notas.reduce((s, v, i) => s + v * pesos[i], 0) / pesos.reduce((s, p) => s + p, 0);
  const simple = notas.reduce((s, v) => s + v, 0) / notas.length;
  return {
    h1: "Công cụ tính điểm trung bình có trọng số",
    title: tituloQueEntre(
      `Công cụ tính điểm trung bình có trọng số cho ${ctx.nombrePais}`,
      `Tính điểm trung bình có trọng số cho ${ctx.nombrePais}`,
      "Công cụ tính điểm trung bình có trọng số",
    ),
    description: "Tính điểm trung bình, trung bình cộng hoặc có trọng số, với tối đa 10 điểm và trọng số riêng: phần trăm, tín chỉ hoặc số lần.",
    intro: [
      "Nhập từng điểm và trọng số của điểm đó. Bạn sẽ thấy trung bình có trọng số và trung bình cộng ngay bên cạnh.",
      "Phù hợp với điểm học bạ, GPA đại học và mọi loại trung bình mà một số giá trị có ảnh hưởng lớn hơn các giá trị khác.",
    ],
    comoSeCalcula: [
      "Trung bình cộng = tổng các điểm ÷ số lượng điểm.",
      "Trung bình có trọng số = tổng (điểm × trọng số) ÷ tổng trọng số.",
      "Trọng số không nhất thiết phải cộng lại bằng 100: kết quả luôn được chia cho tổng trọng số.",
    ],
    ejemplo: [
      `Với điểm 70 có trọng số 20%, điểm 80 có trọng số 30% và điểm 90 có trọng số 50%, trung bình có trọng số là ${n(ponderado)}.`,
      `Trung bình cộng của ba điểm đó là ${n(simple)}: điểm 90 có trọng số lớn nhất nên kéo trung bình có trọng số lên cao hơn.`,
    ],
    faq: [
      {
        pregunta: "Cách tính trung bình có trọng số như thế nào?",
        respuesta: "Nhân mỗi điểm với trọng số của điểm đó, cộng các kết quả lại, rồi chia cho tổng tất cả trọng số.",
      },
      {
        pregunta: "Nếu trọng số không cộng lại bằng 100% thì sao?",
        respuesta: "Không sao. Nếu một môn có 3 tín chỉ và môn khác có 2 tín chỉ, hãy dùng 3 và 2. Kết quả được chia cho tổng trọng số.",
      },
      {
        pregunta: "Trung bình cộng và trung bình có trọng số khác nhau thế nào?",
        respuesta: "Với trung bình cộng, mọi điểm được tính như nhau. Với trung bình có trọng số, mỗi điểm được tính theo trọng số của điểm đó.",
      },
      {
        pregunta: "Có thể dùng để tính GPA không?",
        respuesta: "Có. Nhập điểm số của từng môn làm điểm và số tín chỉ của môn đó làm trọng số.",
      },
    ],
    glosario: [
      { termino: "Trọng số", definicion: "Mức độ một điểm ảnh hưởng đến kết quả trung bình cuối cùng." },
      { termino: "Trung bình có trọng số", definicion: "Trung bình trong đó mỗi điểm được nhân với trọng số của điểm đó." },
    ],
  };
};
