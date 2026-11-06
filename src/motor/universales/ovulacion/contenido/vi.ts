import { aDia, aFecha, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { FASE_LUTEA, ventana } from "../definicion";

export const contenidoVi: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const fum = "2026-03-05";
  const v = ventana(aDia(fum), 28);
  return {
    h1: "Công cụ tính ngày rụng trứng",
    title: tituloQueEntre(`Cách tính ngày rụng trứng và ngày dễ thụ thai ${ctx.nombrePais}`, `Công cụ tính ngày rụng trứng ${ctx.nombrePais}`, "Công cụ tính ngày rụng trứng"),
    description: "Tính ngày rụng trứng dự kiến, thời kỳ dễ thụ thai và ngày có kinh tiếp theo, kèm lịch cho ba chu kỳ kế tiếp.",
    intro: [
      "Nhập ngày đầu tiên của kỳ kinh gần nhất và độ dài chu kỳ của bạn. Bạn sẽ thấy ngày rụng trứng dự kiến, những ngày dễ thụ thai và kỳ kinh tiếp theo.",
      "Đây là ước tính cho chu kỳ đều. Công cụ này không phải biện pháp tránh thai và không thay thế tư vấn của bác sĩ hoặc nữ hộ sinh.",
    ],
    comoSeCalcula: [
      `Rụng trứng thường xảy ra ${FASE_LUTEA} ngày trước kỳ kinh tiếp theo: ngày đầu kỳ kinh gần nhất + độ dài chu kỳ − ${FASE_LUTEA}.`,
      "Thời kỳ dễ thụ thai kéo dài từ 5 ngày trước khi rụng trứng đến 1 ngày sau đó, vì tinh trùng có thể sống đến 5 ngày.",
      "Kỳ kinh tiếp theo được dự kiến sau kỳ kinh gần nhất một chu kỳ.",
    ],
    ejemplo: [
      `Nếu kỳ kinh gần nhất bắt đầu vào ${f(fum)} và chu kỳ dài 28 ngày, ngày rụng trứng dự kiến là ${f(aFecha(v.ovulacion))}.`,
      `Thời kỳ dễ thụ thai kéo dài từ ${f(aFecha(v.desde))} đến ${f(aFecha(v.hasta))}, và kỳ kinh tiếp theo dự kiến vào ${f(aFecha(v.proxima))}.`,
    ],
    faq: [
      {
        pregunta: "Ngày nào dễ thụ thai nhất?",
        respuesta: "Hai hoặc ba ngày trước khi rụng trứng và chính ngày rụng trứng. Toàn bộ thời kỳ dễ thụ thai kéo dài khoảng 6 ngày.",
      },
      {
        pregunta: "Chu kỳ không đều có dùng được không?",
        respuesta: "Có thể dùng để tham khảo, nhưng kém chính xác hơn. Với chu kỳ không đều, ngày rụng trứng có thể lệch vài ngày giữa các tháng.",
      },
      {
        pregunta: "Có thể dùng công cụ này để tránh thai không?",
        respuesta: "Không. Đây chỉ là ước tính và ngày rụng trứng có thể đến sớm hoặc muộn hơn. Để tránh thai, hãy dùng biện pháp tránh thai và hỏi ý kiến bác sĩ hoặc nữ hộ sinh.",
      },
    ],
    glosario: [
      { termino: "Rụng trứng", definicion: "Thời điểm buồng trứng phóng thích trứng." },
      { termino: "Thời kỳ dễ thụ thai", definicion: "Những ngày trong chu kỳ có thể mang thai." },
    ],
  };
};
