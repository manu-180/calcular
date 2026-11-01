import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cuotaFrancesa, interesesTotales } from "../../prestamo/definicion";

export const contenidoVi: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 200000);
  const prestado = precio * 0.8;
  const cuota20 = cuotaFrancesa(prestado, 7, 240);
  const cuota10 = cuotaFrancesa(prestado, 7, 120);
  return {
    h1: "Công cụ tính vay mua nhà",
    title: tituloQueEntre(`Công cụ tính vay mua nhà tại ${ctx.nombrePais}: tiền trả hằng tháng`, `Công cụ tính vay mua nhà tại ${ctx.nombrePais}`, "Công cụ tính vay mua nhà"),
    description:
      "Tính tiền trả hằng tháng khi vay mua nhà từ giá nhà, tiền trả trước, lãi suất và thời hạn vay. Xem tổng tiền lãi và dư nợ từng năm.",
    intro: [
      "Vay mua nhà là khoản nợ lớn nhất của hầu hết các gia đình. Bạn nên xem đủ các con số trước khi làm việc với ngân hàng.",
      "Nhập giá nhà, tiền trả trước, lãi suất và thời hạn vay. Nếu bạn trả thuế nhà đất hoặc bảo hiểm cùng kỳ trả, hãy thêm vào để thấy khoản chi thực tế mỗi tháng.",
    ],
    comoSeCalcula: [
      "Số tiền vay = giá nhà − tiền trả trước.",
      "Tiền trả cố định mỗi tháng, với lãi suất năm chia cho 12 và thời hạn vay tính theo tháng (phương pháp trả đều).",
      "Với mỗi năm, tiền lãi và tiền gốc đã trả được cộng lại, sau đó hiển thị dư nợ.",
    ],
    ejemplo: [
      `Căn nhà giá ${m(precio)}, trả trước 20%, còn số tiền vay ${m(prestado)}. Với lãi suất 7% và thời hạn vay 20 năm, tiền trả là ${m(cuota20)} mỗi tháng.`,
      `Trong 20 năm, tổng tiền lãi là ${m(interesesTotales(prestado, 7, 240))}. Với thời hạn vay 10 năm, tiền trả tăng lên ${m(cuota10)}, nhưng tổng tiền lãi giảm còn ${m(interesesTotales(prestado, 7, 120))}.`,
    ],
    faq: [
      {
        pregunta: "Nên trả trước bao nhiêu khi vay mua nhà?",
        respuesta:
          "Tùy ngân hàng và loại nhà. Trả trước càng nhiều, khoản vay, tiền trả hằng tháng và tổng tiền lãi càng nhỏ. Hãy để dành thêm cho phí hợp đồng, công chứng và thuế khi mua nhà.",
      },
      {
        pregunta: "Vì sao dư nợ gần như không giảm trong những năm đầu?",
        respuesta:
          "Tiền lãi được tính trên dư nợ. Đầu thời hạn vay, dư nợ còn lớn nên phần lớn tiền trả dành cho tiền lãi. Càng về sau, tỷ lệ này càng đảo ngược.",
      },
      {
        pregunta: "Lãi suất cố định và lãi suất thả nổi khác nhau thế nào?",
        respuesta:
          "Lãi suất cố định giữ nguyên trong thời gian đã thỏa thuận, thường là vài năm đầu. Sau đó lãi suất thả nổi theo thị trường, nên tiền trả hằng tháng có thể tăng. Công cụ này giả định lãi suất không đổi trong suốt thời hạn vay.",
      },
      {
        pregunta: "Nên chọn thời hạn vay ngắn hay dài?",
        respuesta:
          "Nếu vẫn trả được mức tiền cao hơn, thời hạn ngắn tiết kiệm tiền lãi hơn nhiều. Nếu không, thời hạn dài kèm trả bớt nợ trước hạn khi có tiền cũng là một lựa chọn.",
      },
    ],
    glosario: [
      { termino: "Tiền trả trước", definicion: "Phần giá nhà bạn trả bằng tiền của mình." },
      { termino: "Số tiền vay", definicion: "Số tiền bạn vay từ ngân hàng." },
      { termino: "Dư nợ", definicion: "Tiền gốc bạn vẫn còn phải trả." },
    ],
  };
};
