import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoVi: ContenidoUniversal = (ctx) => {
  const precio3 = montoEjemplo(ctx, 6);
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Công cụ tính quy tắc tam suất thuận và nghịch",
    title: tituloQueEntre(
      `Công cụ tính quy tắc tam suất cho ${ctx.nombrePais}`,
      `Quy tắc tam suất cho ${ctx.nombrePais}`,
      "Công cụ tính quy tắc tam suất",
    ),
    description: "Giải bài toán tam suất thuận hoặc nghịch chỉ trong vài giây. Nhập ba giá trị để có giá trị thứ tư kèm cách tính chi tiết.",
    intro: [
      "Quy tắc này dùng khi hai đại lượng thay đổi cùng nhau và bạn đã biết ba trong bốn giá trị.",
      "Chọn thuận hoặc nghịch, nhập A, B và C. Công cụ sẽ tính X.",
    ],
    comoSeCalcula: [
      "Tam suất thuận: X = B × C ÷ A. Dùng khi hai đại lượng cùng tăng (càng nhiều kilôgam, giá càng cao).",
      "Tam suất nghịch: X = A × B ÷ C. Dùng khi một đại lượng tăng và đại lượng kia giảm (càng nhiều người làm, càng ít ngày).",
    ],
    ejemplo: [
      `Nếu 3 kg có giá ${m(precio3)} thì 5 kg có giá ${m((precio3 * 5) / 3)}.`,
      "Nếu 4 người sơn xong một căn nhà trong 12 ngày thì 6 người sơn xong trong 8 ngày.",
    ],
    faq: [
      {
        pregunta: "Làm sao phân biệt tam suất thuận và tam suất nghịch?",
        respuesta: "Nếu đại lượng này tăng khi đại lượng kia tăng, đó là tam suất thuận. Nếu đại lượng này giảm khi đại lượng kia tăng, đó là tam suất nghịch.",
      },
      {
        pregunta: "Cách tính tam suất thuận bằng tay như thế nào?",
        respuesta: `Nhân chéo hai giá trị đã biết rồi chia cho giá trị còn lại. Nếu 3 tương ứng với 600 thì 5 tương ứng với 600 × 5 ÷ 3 = ${formatearNumero(ctx, 1000)}.`,
      },
      {
        pregunta: "Có dùng để tính phần trăm được không?",
        respuesta: "Được. Nếu 200 là 100% thì 50 là 25%. Đó là tam suất thuận với A = 200, B = 100 và C = 50.",
      },
    ],
    glosario: [
      { termino: "Tam suất thuận", definicion: "Hai đại lượng cùng tăng hoặc cùng giảm." },
      { termino: "Tam suất nghịch", definicion: "Một đại lượng tăng khi đại lượng kia giảm." },
    ],
  };
};
