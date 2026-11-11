import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoVi: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const gastos = montoEjemplo(ctx, 1500);
  const aporte = montoEjemplo(ctx, 300);
  return {
    h1: "Công cụ tính quỹ khẩn cấp",
    title: tituloQueEntre(`Công cụ tính quỹ khẩn cấp tại ${ctx.nombrePais}`, `Quỹ khẩn cấp tại ${ctx.nombrePais}`, "Công cụ tính quỹ khẩn cấp"),
    description: "Tính quỹ khẩn cấp phù hợp từ chi tiêu thiết yếu của bạn, và cần bao nhiêu tháng để tích lũy từ khoản tiết kiệm mỗi tháng.",
    intro: [
      "Quỹ khẩn cấp là khoản tiền dự phòng cho những việc không thể lên kế hoạch: mất việc, vấn đề sức khỏe hoặc sửa nhà gấp.",
      "Có quỹ khẩn cấp, bạn không phải dựa vào thẻ tín dụng hay khoản vay khi gặp khó khăn. Nhập chi tiêu thiết yếu và số tháng muốn dự phòng.",
    ],
    comoSeCalcula: [
      "Quỹ khẩn cấp đề xuất = chi tiêu thiết yếu mỗi tháng × số tháng dự phòng.",
      "Số tiền còn thiếu = quỹ khẩn cấp đề xuất − số tiền đã có.",
      "Số tháng để đủ quỹ = số tiền còn thiếu ÷ số tiền tiết kiệm mỗi tháng, làm tròn lên.",
    ],
    ejemplo: [
      `Với chi tiêu thiết yếu ${m(gastos)} mỗi tháng, quỹ khẩn cấp cho 6 tháng là ${m(gastos * 6)}.`,
      `Nếu bạn tiết kiệm ${m(aporte)} mỗi tháng, bạn sẽ đủ quỹ sau ${Math.ceil((gastos * 6) / aporte)} tháng.`,
    ],
    faq: [
      {
        pregunta: "Quỹ khẩn cấp bao nhiêu là đủ?",
        respuesta:
          "Mốc thường dùng là 3 đến 6 lần chi tiêu thiết yếu hằng tháng. Nếu thu nhập của bạn không ổn định, bạn là freelancer hoặc gia đình chỉ có một nguồn thu nhập, hãy đặt mục tiêu 6 đến 12 tháng.",
      },
      {
        pregunta: "Nên giữ quỹ khẩn cấp ở đâu?",
        respuesta:
          "Ở nơi an toàn, rút được ngay trong ngày và tách khỏi tài khoản chi tiêu hằng ngày. Khoản này không dùng để đầu tư rủi ro: nhiệm vụ của nó là có sẵn khi bạn cần.",
      },
      {
        pregunta: "Nên lập quỹ khẩn cấp hay trả nợ trước?",
        respuesta:
          "Cách thường dùng: trước tiên để dành một khoản bằng một tháng chi tiêu, sau đó trả các khoản nợ lãi cao như thẻ tín dụng, rồi hoàn tất quỹ khẩn cấp.",
      },
    ],
    glosario: [
      { termino: "Chi tiêu thiết yếu", definicion: "Những khoản vẫn phải trả dù thu nhập dừng lại: nhà ở, ăn uống, tiền điện, y tế." },
      { termino: "Tính thanh khoản", definicion: "Mức độ nhanh chóng mà tiền có thể được sử dụng mà không mất giá trị." },
    ],
  };
};
