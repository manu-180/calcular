import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cagr, roi } from "../definicion";

export const contenidoVi: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  const inicial = montoEjemplo(ctx, 10000);
  const final = montoEjemplo(ctx, 15000);
  return {
    h1: "Công cụ tính ROI",
    title: tituloQueEntre(`Công cụ tính ROI và CAGR ${ctx.nombrePais}`, `Công cụ tính ROI ${ctx.nombrePais}`, "Công cụ tính ROI và CAGR"),
    description: "Tính tỷ suất lợi nhuận tổng (ROI) và tỷ suất mỗi năm (CAGR) của khoản đầu tư từ tiền gốc, giá trị hiện tại và thời gian đầu tư.",
    intro: [
      "Lãi 50% nghe rất lớn, nhưng đạt được trong 2 năm hay 10 năm là hai chuyện khác nhau. Để so sánh các khoản đầu tư, bạn cần tỷ suất mỗi năm.",
      "Nhập số tiền đã bỏ ra, giá trị hiện tại và số năm đã đầu tư. Công cụ hiển thị tỷ suất lợi nhuận tổng và tỷ suất lãi kép mỗi năm.",
    ],
    comoSeCalcula: [
      "ROI = (giá trị cuối + khoản đã nhận − tiền gốc) ÷ tiền gốc × 100.",
      "CAGR = ((giá trị cuối + khoản đã nhận) ÷ tiền gốc) lũy thừa (1 ÷ số năm), rồi trừ 1.",
      "CAGR là tốc độ tăng trưởng kép mỗi năm: con số cho cùng kết quả nếu lặp lại mỗi năm.",
    ],
    ejemplo: [
      `Tiền gốc ${m(inicial)} tăng thành ${m(final)} mang lại lợi nhuận ${m(final - inicial)}, tức ROI ${p(roi(inicial, final))}.`,
      `Nếu mất 5 năm, tỷ suất mỗi năm là ${p(cagr(inicial, final, 5))}. Nếu chỉ mất 2 năm, tỷ suất là ${p(cagr(inicial, final, 2))}.`,
    ],
    faq: [
      {
        pregunta: "ROI và CAGR khác nhau thế nào?",
        respuesta:
          "ROI là tổng lợi nhuận so với tiền gốc, không xét thời gian. CAGR quy về từng năm, nên có thể so sánh các khoản đầu tư có thời hạn khác nhau.",
      },
      {
        pregunta: "Vì sao tỷ suất mỗi năm không phải là tổng chia cho số năm?",
        respuesta: `Vì lợi nhuận mỗi năm được cộng vào số dư và tiếp tục sinh lời. Lãi 50% trong 5 năm tương đương ${p(cagr(1, 1.5, 5))} mỗi năm theo lãi kép, không phải 10%.`,
      },
      {
        pregunta: "Tính cổ tức hoặc tiền lãi đã nhận như thế nào?",
        respuesta: "Nhập vào ô khoản đã nhận nếu bạn đã rút số tiền đó. Nếu tái đầu tư, số tiền này đã nằm trong giá trị cuối.",
      },
    ],
    glosario: [
      { termino: "ROI", definicion: "Return on investment: tổng lợi nhuận tính theo phần trăm của tiền gốc đã đầu tư." },
      { termino: "CAGR", definicion: "Compound annual growth rate: tỷ suất trung bình mỗi năm có tính hiệu ứng lãi kép." },
    ],
  };
};
