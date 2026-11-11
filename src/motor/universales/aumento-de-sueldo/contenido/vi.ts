import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aumentoReal } from "../definicion";

export const contenidoVi: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  const sueldo = montoEjemplo(ctx, 4000);
  return {
    h1: "Công cụ tính tăng lương",
    title: tituloQueEntre(`Công cụ tính tăng lương ${ctx.nombrePais}`, `Tính tăng lương ${ctx.nombrePais}`, "Công cụ tính tăng lương"),
    description: "Tính lương mới sau khi tăng, chênh lệch mỗi tháng và mỗi năm, cùng mức tăng thực của bạn sau khi so với lạm phát.",
    intro: [
      "Bạn vừa được đề nghị tăng lương, hoặc sắp đề xuất tăng lương. Nhập lương và mức tăng, theo phần trăm hoặc số tiền, rồi xem thay đổi mỗi tháng và mỗi năm.",
      "Thêm lạm phát trong giai đoạn đó để biết sức mua của bạn thật sự tăng hay chỉ theo kịp giá cả.",
    ],
    comoSeCalcula: [
      "Lương mới = lương hiện tại × (1 + mức tăng ÷ 100).",
      "Chênh lệch mỗi năm = chênh lệch mỗi tháng × số tháng lương mỗi năm.",
      "Mức tăng thực = (1 + mức tăng) ÷ (1 + lạm phát) − 1.",
    ],
    ejemplo: [
      `Lương ${m(sueldo)} mỗi tháng, tăng 5% thành ${m(sueldo * 1.05)}: thêm ${m(sueldo * 0.05)} mỗi tháng và ${m(sueldo * 0.05 * 12)} mỗi năm.`,
      `Nếu lạm phát trong giai đoạn đó là 3%, mức tăng thực là ${p(aumentoReal(5, 3))}. Nếu lạm phát là 6%, mức tăng thực là ${p(aumentoReal(5, 6))}.`,
    ],
    faq: [
      {
        pregunta: "Mức tăng lương thực là gì?",
        respuesta: "Là mức tăng lương sau khi tính đến lạm phát. Con số này cho biết lương mới của bạn mua được nhiều hơn hay ít hơn trước.",
      },
      {
        pregunta: "Vì sao không chỉ lấy mức tăng lương trừ lạm phát?",
        respuesta: `Vì hai tỷ lệ này nhân với nhau, không cộng trừ trực tiếp. Với mức tăng 5% và lạm phát 3%, mức tăng thực là ${p(aumentoReal(5, 3))}, không phải 2%. Khi lạm phát cao, chênh lệch càng lớn.`,
      },
      {
        pregunta: "Nên đề xuất tăng lương bao nhiêu là hợp lý?",
        respuesta:
          "Tối thiểu bằng lạm phát từ lần tăng gần nhất, để sức mua của bạn không giảm. Ngoài ra, hãy xem mức lương thị trường cho cùng vị trí và trách nhiệm của bạn đã tăng bao nhiêu.",
      },
    ],
    glosario: [
      { termino: "Mức tăng danh nghĩa", definicion: "Mức tăng ghi trên phiếu lương, trước khi tính đến lạm phát." },
      { termino: "Sức mua", definicion: "Lượng hàng hóa và dịch vụ mà lương của bạn mua được." },
    ],
  };
};
