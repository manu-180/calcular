import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aEfectiva, aNominal } from "../definicion";

export const contenidoVi: ContenidoUniversal = (ctx) => {
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  return {
    h1: "Công cụ tính lãi suất thực",
    title: tituloQueEntre(`Công cụ tính lãi suất thực ${ctx.nombrePais}`, "Đổi lãi suất danh nghĩa sang lãi suất thực", "Công cụ tính lãi suất thực"),
    description:
      "Đổi lãi suất danh nghĩa theo năm sang lãi suất thực theo năm và ngược lại, với kỳ ghép lãi hằng tháng, hằng quý, mỗi 6 tháng hoặc hằng ngày.",
    intro: [
      "Hai đề nghị có cùng con số lãi suất vẫn có thể cho kết quả khác nhau. Điểm khác nằm ở tần suất tính hoặc trả lãi.",
      "Lãi suất thực theo năm đưa mọi thứ về cùng một chuẩn: đó là mức bạn thực sự trả hoặc nhận trong một năm. Chọn lãi suất bạn đang có, công cụ sẽ hiển thị lãi suất còn lại.",
    ],
    comoSeCalcula: [
      "Lãi suất thực = (1 + lãi suất danh nghĩa ÷ m) lũy thừa m, rồi trừ 1. Ở đây m là số kỳ trong một năm: 12 nếu hằng tháng, 4 nếu hằng quý.",
      "Lãi suất danh nghĩa = m × ((1 + lãi suất thực) lũy thừa 1 ÷ m, rồi trừ 1).",
      "Lãi suất mỗi kỳ là lãi suất danh nghĩa chia cho m.",
    ],
    ejemplo: [
      `Lãi suất danh nghĩa 12% mỗi năm, ghép lãi hằng tháng, bằng lãi suất thực ${p(aEfectiva(12, 12))} mỗi năm.`,
      `Lãi suất thực 10% mỗi năm bằng lãi suất danh nghĩa ${p(aNominal(10, 12))} nếu ghép lãi hằng tháng.`,
    ],
    faq: [
      {
        pregunta: "Lãi suất danh nghĩa và lãi suất thực khác nhau thế nào?",
        respuesta:
          "Lãi suất danh nghĩa là con số theo năm trước khi tính hiệu ứng lãi kép. Lãi suất thực đã tính cả phần tiền lãi sinh lãi. Vì vậy lãi suất thực luôn bằng hoặc cao hơn lãi suất danh nghĩa.",
      },
      {
        pregunta: "Nên dùng lãi suất nào để so sánh các đề nghị?",
        respuesta:
          "Với tiết kiệm và tiền gửi, hãy dùng lãi suất thực vì nó cho thấy số tiền bạn thực sự nhận. Với khoản vay, hãy so sánh lãi suất thực và cả tổng chi phí, gồm phí xử lý hồ sơ và phí quản lý.",
      },
      {
        pregunta: "Vì sao lãi suất thực tăng khi ghép lãi thường xuyên hơn?",
        respuesta:
          "Tiền lãi được cộng vào số dư sớm hơn và bắt đầu sinh lãi. Nếu ghép lãi mỗi năm một lần, lãi suất danh nghĩa và lãi suất thực bằng nhau.",
      },
    ],
    glosario: [
      { termino: "Lãi suất danh nghĩa", definicion: "Lãi suất theo năm trước khi tính hiệu ứng lãi kép." },
      { termino: "Lãi suất thực", definicion: "Lãi suất theo năm đã tính hiệu ứng lãi kép." },
      { termino: "Lãi kép", definicion: "Tiền lãi được cộng vào số dư rồi tiếp tục sinh lãi." },
    ],
  };
};
