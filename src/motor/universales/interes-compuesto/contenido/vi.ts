import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { proyectar } from "../definicion";

export const contenidoVi: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const capital = montoEjemplo(ctx, 1000);
  const aporte = montoEjemplo(ctx, 100);
  const a10 = proyectar(capital, aporte, 7, 10, "mensual")[9].saldo;
  const a20 = proyectar(capital, aporte, 7, 20, "mensual")[19].saldo;
  return {
    h1: "Công cụ tính lãi kép",
    title: tituloQueEntre(`Công cụ tính lãi kép ${ctx.nombrePais}`, "Công cụ tính lãi kép trực tuyến", "Công cụ tính lãi kép"),
    description:
      "Xem tiền của bạn tăng thế nào với lãi kép và khoản gửi hằng tháng. Nhận số dư cuối kỳ, tổng tiền lãi và bảng theo từng năm.",
    intro: [
      "Với lãi kép, tiền lãi được nhập vào số dư rồi tiếp tục sinh lãi. Vì vậy tiền tiết kiệm và đầu tư tăng ngày càng nhanh qua từng năm.",
      "Nhập số tiền bạn đang có, tiền gửi thêm mỗi tháng, lãi suất và thời hạn. Kết quả cho bạn biết số dư cuối kỳ và phần đến từ tiền lãi.",
    ],
    comoSeCalcula: [
      "Số dư cuối kỳ = tiền gốc × (1 + i) mũ n + tiền gửi × ((1 + i) mũ n − 1) ÷ i.",
      "Trong đó i là lãi suất mỗi tháng tương đương với kỳ nhập lãi bạn chọn, và n là số tháng.",
      "Tiền gửi được tính vào cuối mỗi tháng.",
    ],
    ejemplo: [
      `Bắt đầu với ${m(capital)} và gửi thêm ${m(aporte)} mỗi tháng, lãi suất 7% mỗi năm, số dư của bạn đạt ${m(a10)} sau 10 năm.`,
      `Nếu tiếp tục thêm 10 năm, số dư đạt ${m(a20)}. Thập kỷ thứ hai sinh lời nhiều hơn hẳn thập kỷ đầu.`,
    ],
    faq: [
      {
        pregunta: "Lãi đơn và lãi kép khác nhau thế nào?",
        respuesta:
          "Lãi đơn luôn tính trên tiền gốc ban đầu. Lãi kép tính trên tiền gốc cộng với tiền lãi đã nhận.",
      },
      {
        pregunta: "Quy tắc 72 là gì?",
        respuesta: "Đây là cách ước tính nhanh thời gian để tiền tăng gấp đôi: lấy 72 chia cho lãi suất mỗi năm. Với lãi suất 6%, tiền tăng gấp đôi sau khoảng 12 năm.",
      },
      {
        pregunta: "Nên dùng lãi suất bao nhiêu?",
        respuesta:
          "Dùng con số thực tế với sản phẩm bạn chọn, ví dụ tiền gửi có kỳ hạn, chứng chỉ quỹ hoặc trái phiếu. Để xem kết quả theo giá trị đồng tiền hôm nay, hãy trừ lãi suất đi mức lạm phát ước tính.",
      },
    ],
    glosario: [
      { termino: "Lãi kép", definicion: "Tiền lãi tính trên số dư cộng với tiền lãi đã nhận." },
      { termino: "Kỳ nhập lãi", definicion: "Tần suất tiền lãi được cộng vào số dư." },
    ],
  };
};
