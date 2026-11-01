import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoVi: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const anual = montoEjemplo(ctx, 50000);
  const hora = montoEjemplo(ctx, 20);
  return {
    h1: "Công cụ quy đổi lương theo giờ",
    title: tituloQueEntre(`Công cụ tính lương theo giờ ${ctx.nombrePais}`, `Lương theo giờ ${ctx.nombrePais}`, "Công cụ tính lương theo giờ"),
    description: "Quy đổi lương của bạn theo giờ, ngày, tuần, nửa tháng, tháng và năm, dựa trên số giờ làm và số tuần được trả lương.",
    intro: [
      "Lương của bạn mỗi giờ là bao nhiêu? Một năm là bao nhiêu nếu công việc trả theo giờ? Nhập số tiền, chọn kỳ tính lương, rồi xem tất cả các kỳ còn lại.",
      "Dùng công cụ này để so sánh các lời mời làm việc, tính tiền làm thêm giờ hoặc biết giá trị thời gian của bạn.",
    ],
    comoSeCalcula: [
      "Mọi số tiền được đổi trước về mức mỗi năm.",
      "Mỗi giờ = mỗi năm ÷ (số giờ làm mỗi tuần × số tuần được trả lương).",
      "Mỗi ngày = mỗi năm ÷ (số ngày làm mỗi tuần × số tuần được trả lương). Mỗi tuần = mỗi năm ÷ số tuần được trả lương.",
      "Mỗi tháng = mỗi năm ÷ 12. Mỗi nửa tháng = mỗi năm ÷ 24.",
    ],
    ejemplo: [
      `Lương ${m(anual)} mỗi năm với 40 giờ làm mỗi tuần tương đương ${m(anual / 2080)} mỗi giờ và ${m(anual / 12)} mỗi tháng.`,
      `Lời mời ${m(hora)} mỗi giờ cho công việc toàn thời gian tương đương ${m(hora * 2080)} mỗi năm.`,
    ],
    faq: [
      {
        pregunta: "Một năm có bao nhiêu giờ làm?",
        respuesta: `Với 40 giờ mỗi tuần và 52 tuần được trả lương là ${formatearNumero(ctx, 2080)} giờ. Vì vậy, cách tính nhanh là nhân lương theo giờ với khoảng ${formatearNumero(ctx, 2000)}.`,
      },
      {
        pregunta: "Vì sao lương tuần nhân 4 không bằng lương tháng?",
        respuesta: `Vì trung bình một tháng có ${formatearNumero(ctx, 52 / 12, 2)} tuần, không phải 4. Để đổi lương tuần sang lương tháng, nhân với 52 rồi chia cho 12.`,
      },
      {
        pregunta: "Đã gồm thưởng, lương tháng 13 hoặc thuế chưa?",
        respuesta: "Chưa. Công cụ này chỉ quy đổi cùng một số tiền giữa các kỳ. Nếu bạn có thưởng hoặc lương tháng 13, hãy cộng riêng khi so sánh các lời mời làm việc.",
      },
    ],
    glosario: [
      { termino: "Lương gross (trước thuế)", definicion: "Lương trước khi trừ thuế và các khoản đóng bắt buộc." },
      { termino: "Lương theo giờ", definicion: "Lương chia cho số giờ làm được trả lương." },
    ],
  };
};
