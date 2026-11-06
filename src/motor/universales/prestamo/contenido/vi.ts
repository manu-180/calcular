import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cuotaFrancesa, interesesTotales } from "../definicion";

export const contenidoVi: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const monto = montoEjemplo(ctx, 10000);
  const cuota36 = cuotaFrancesa(monto, 12, 36);
  const cuota60 = cuotaFrancesa(monto, 12, 60);
  return {
    h1: "Công cụ tính lãi vay",
    title: tituloQueEntre(`Công cụ tính lãi vay ${ctx.nombrePais}`, "Công cụ tính lãi vay và tiền trả hằng tháng", "Công cụ tính lãi vay"),
    description:
      "Tính tiền trả hằng tháng, tổng tiền lãi vay và lịch trả nợ đầy đủ. Xem luôn bạn tiết kiệm được bao nhiêu nếu trả thêm mỗi tháng.",
    intro: [
      "Trước khi đăng ký khoản vay, có hai con số quan trọng: tiền trả hằng tháng và tổng tiền lãi vay bạn phải trả.",
      "Nhập số tiền vay, lãi suất theo năm và thời hạn vay. Nếu bạn dự định trả thêm mỗi tháng, hãy nhập cả số đó để xem khoản vay được tất toán sớm bao nhiêu.",
    ],
    comoSeCalcula: [
      "Công cụ dùng cách trả góp đều hằng tháng với lãi suất trên dư nợ giảm dần (phương pháp niên kim), thường gặp ở vay tiêu dùng, vay mua xe và vay mua nhà.",
      "Lãi suất tháng = lãi suất theo năm ÷ 12.",
      "Tiền trả hằng tháng = số tiền vay × lãi suất tháng ÷ (1 − (1 + lãi suất tháng) mũ âm số tháng).",
      "Mỗi tháng, tiền lãi được tính trên dư nợ còn lại. Phần còn lại của khoản trả được trừ vào tiền gốc.",
    ],
    ejemplo: [
      `Khoản vay ${m(monto)} với lãi suất 12% một năm và thời hạn 36 tháng có tiền trả hằng tháng là ${m(cuota36)}. Tổng tiền lãi vay là ${m(interesesTotales(monto, 12, 36))}.`,
      `Nếu kéo dài thời hạn vay lên 60 tháng, tiền trả hằng tháng giảm còn ${m(cuota60)}, nhưng tổng tiền lãi vay tăng lên ${m(interesesTotales(monto, 12, 60))}.`,
    ],
    faq: [
      {
        pregunta: "Cách tính tiền trả hằng tháng của khoản vay như thế nào?",
        respuesta:
          "Dùng công thức niên kim. Số tiền trả mỗi tháng bằng nhau, nhưng đầu thời hạn phần lớn là tiền lãi, gần cuối phần lớn là tiền gốc. Vì vậy dư nợ giảm chậm trong giai đoạn đầu.",
      },
      {
        pregunta: "Lãi phẳng và lãi trên dư nợ giảm dần khác nhau thế nào?",
        respuesta:
          "Lãi phẳng tính trên số tiền vay ban đầu trong suốt thời hạn vay, còn lãi trên dư nợ giảm dần tính trên dư nợ còn lại. Cùng một con số, lãi phẳng đắt hơn nhiều. Công cụ này dùng lãi suất trên dư nợ giảm dần.",
      },
      {
        pregunta: "Trả nợ trước hạn có lợi không?",
        respuesta:
          "Thường là có, miễn là phí trả nợ trước hạn không lớn. Số tiền trả thêm được trừ ngay vào tiền gốc nên phần đó không còn sinh lãi. Trả càng sớm, bạn tiết kiệm càng nhiều.",
      },
      {
        pregunta: "Nên chọn thời hạn vay dài hay ngắn?",
        respuesta: "Thời hạn dài giúp tiền trả hằng tháng nhẹ hơn, nhưng tổng tiền lãi vay lớn hơn nhiều. Hãy so sánh cả hai con số trước khi quyết định.",
      },
    ],
    glosario: [
      { termino: "Tiền gốc", definicion: "Phần nợ bạn chưa hoàn trả." },
      { termino: "Thời hạn vay", definicion: "Khoảng thời gian của khoản vay, thường tính bằng tháng." },
      { termino: "Lãi suất trên dư nợ giảm dần", definicion: "Lãi suất được tính trên dư nợ còn lại mỗi tháng." },
    ],
  };
};
