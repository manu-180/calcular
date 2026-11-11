import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoVi: ContenidoUniversal = (ctx) => {
  const cuenta = montoEjemplo(ctx, 60);
  const propina = cuenta * 0.15;
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Công cụ tính tiền tip",
    title: tituloQueEntre(`Công cụ tính tiền tip cho ${ctx.nombrePais}`, "Công cụ tính tiền tip và chia hóa đơn", "Công cụ tính tiền tip"),
    description: "Tính tiền tip, tổng hóa đơn và phần của mỗi người khi chia hóa đơn. Phần của mỗi người có thể được làm tròn lên.",
    intro: [
      "Nhập hóa đơn, tỷ lệ tiền tip và số người trả tiền. Bạn sẽ thấy tiền tip, tổng cộng và phần của mỗi người.",
      "Nếu bạn thích số chẵn, phần của mỗi người được làm tròn lên và phần dư được tính vào tiền tip.",
    ],
    comoSeCalcula: ["Tiền tip = hóa đơn × tỷ lệ tiền tip ÷ 100.", "Tổng cộng = hóa đơn + tiền tip.", "Phần của mỗi người = tổng cộng chia cho số người."],
    ejemplo: [
      `Hóa đơn ${m(cuenta)} với tiền tip 15% tăng thêm ${m(propina)}, nên tổng cộng là ${m(cuenta + propina)}.`,
      `Nếu chia cho 3 người, mỗi người trả ${m((cuenta + propina) / 3)}.`,
    ],
    faq: [
      {
        pregunta: "Nên cho tiền tip bao nhiêu?",
        respuesta: `Tùy thói quen địa phương. Hãy xem mức thông thường tại ${ctx.nombrePais}, và kiểm tra hóa đơn đã có phí phục vụ (service charge) chưa.`,
      },
      {
        pregunta: "Tiền tip tính trên giá trước hay sau thuế?",
        respuesta: "Đa số mọi người tính tiền tip trên tổng số ghi trên hóa đơn. Nếu bạn muốn tính trên giá chưa thuế, hãy nhập con số đó.",
      },
      {
        pregunta: "Cách tính nhanh tiền tip 15% như thế nào?",
        respuesta: "Chia hóa đơn cho 10 để có 10%, rồi cộng thêm một nửa số đó. Với 40, kết quả là 4 cộng 2, tức là 6.",
      },
    ],
    glosario: [
      { termino: "Tiền tip", definicion: "Khoản tiền thêm ngoài giá mà bạn cho để cảm ơn sự phục vụ." },
      { termino: "Phí phục vụ", definicion: "Khoản phí do cơ sở kinh doanh đã cộng vào hóa đơn cho việc phục vụ." },
    ],
  };
};
