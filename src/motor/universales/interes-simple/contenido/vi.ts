import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoVi: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const capital = montoEjemplo(ctx, 1000);
  return {
    h1: "Công cụ tính lãi đơn",
    title: tituloQueEntre(`Công cụ tính lãi đơn ${ctx.nombrePais}`, "Công cụ tính lãi đơn trực tuyến", "Công cụ tính lãi đơn"),
    description:
      "Tính lãi đơn từ tiền gốc và lãi suất năm, với thời hạn theo ngày, tháng hoặc năm. Chọn năm 365 hoặc 360 ngày và xem tổng số tiền.",
    intro: [
      "Lãi đơn luôn tính trên tiền gốc ban đầu: tiền lãi không được nhập vào số dư trong suốt thời hạn.",
      "Cách tính này được dùng cho tiền gửi ngắn hạn, khoản vay giữa cá nhân và nhiều bài toán ở trường học.",
    ],
    comoSeCalcula: [
      "Tiền lãi = tiền gốc × lãi suất năm × thời gian tính theo năm.",
      "Với tháng, chia cho 12. Với ngày, chia cho 365 hoặc 360, tùy cách tính của ngân hàng.",
      "Tổng số tiền = tiền gốc + tiền lãi.",
    ],
    ejemplo: [
      `Tiền gốc ${m(capital)} với lãi suất 10% mỗi năm trong 6 tháng sinh ra ${m(capital * 0.1 * 0.5)} tiền lãi.`,
      `Cùng số tiền đó trong 90 ngày sinh ra ${m((capital * 0.1 * 90) / 365)} nếu một năm tính 365 ngày và ${m((capital * 0.1 * 90) / 360)} nếu tính 360 ngày.`,
    ],
    faq: [
      {
        pregunta: "Công thức tính lãi đơn là gì?",
        respuesta: `L = G × i × t. G là tiền gốc, i là lãi suất năm ở dạng thập phân (10% bằng ${formatearNumero(ctx, 0.1, 2)}), t là thời gian tính theo năm.`,
      },
      {
        pregunta: "Lãi đơn khác lãi kép thế nào?",
        respuesta: "Lãi đơn luôn tính trên cùng một khoản tiền gốc. Với lãi kép, tiền lãi được nhập vào số dư rồi tiếp tục sinh lãi.",
      },
      {
        pregunta: "Vì sao có ngân hàng tính một năm 360 ngày?",
        respuesta: "Đó là thông lệ ngân hàng để phép tính đơn giản hơn. Với 360 ngày, tiền lãi cao hơn một chút. Hãy hỏi ngân hàng của bạn về cách tính đang áp dụng.",
      },
    ],
    glosario: [
      { termino: "Tiền gốc", definicion: "Số tiền được cho vay hoặc đem đầu tư." },
      { termino: "Năm ngân hàng", definicion: "Năm được tính là 360 ngày, mỗi tháng 30 ngày." },
    ],
  };
};
