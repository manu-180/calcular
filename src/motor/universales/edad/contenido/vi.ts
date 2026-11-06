import { aDia, fechaLarga, mesesYDias } from "../../comun/fechas";
import { duracionVi } from "../../dias-entre-fechas/textos/vi";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoVi: ContenidoUniversal = (ctx) => {
  const nac = "1990-05-15";
  const ref = "2026-10-13";
  const { meses, dias } = mesesYDias(nac, ref);
  const total = aDia(ref) - aDia(nac);
  return {
    h1: "Công cụ tính tuổi",
    title: tituloQueEntre(`Công cụ tính tuổi cho ${ctx.nombrePais}`, "Công cụ tính tuổi theo ngày sinh", "Công cụ tính tuổi"),
    description: "Tính tuổi chính xác của bạn theo năm, tháng và ngày, số ngày bạn đã sống và còn bao lâu nữa đến sinh nhật tiếp theo.",
    intro: [
      "Nhập ngày sinh để xem tuổi chính xác của bạn hôm nay, cả theo tháng, tuần và ngày.",
      "Đổi ngày thứ hai để biết tuổi của một người vào một ngày cụ thể, hoặc sau này người đó bao nhiêu tuổi.",
    ],
    comoSeCalcula: [
      "Công cụ đếm số tháng tròn từ ngày sinh đến ngày đã chọn. Mỗi 12 tháng được tính là một năm.",
      "Số ngày còn lại sau tháng tròn cuối cùng là phần ngày trong tuổi.",
      "Năm nhuận được tính đủ 366 ngày.",
    ],
    ejemplo: [
      `Người sinh vào ${fechaLarga(ctx.locale, nac)}, tính đến ${fechaLarga(ctx.locale, ref)}, có tuổi chính xác là ${duracionVi(Math.floor(meses / 12), meses % 12, dias)}.`,
      `Tương đương ${formatearNumero(ctx, total)} ngày.`,
    ],
    faq: [
      {
        pregunta: "Cách tính tuổi chính xác như thế nào?",
        respuesta: "Tính số năm tròn trước, rồi số tháng tròn kể từ sinh nhật gần nhất, sau đó là số ngày còn lại.",
      },
      {
        pregunta: "Người sinh ngày 29 tháng 2 thì tính thế nào?",
        respuesta: "Trong những năm không nhuận, công cụ này lấy ngày 28 tháng 2 làm sinh nhật. Một số quy định lấy ngày 1 tháng 3.",
      },
      {
        pregunta: "Tôi đã sống được bao nhiêu ngày?",
        respuesta: "Xem dòng “Theo ngày”. Dòng này đếm mọi ngày từ ngày sinh đến ngày đã chọn, không tính ngày cuối.",
      },
    ],
    glosario: [
      { termino: "Tuổi", definicion: "Số năm tròn kể từ khi sinh." },
      { termino: "Năm nhuận", definicion: "Năm có 366 ngày, thêm ngày 29 tháng 2. Cứ bốn năm có một lần, trừ một số năm tròn thế kỷ." },
    ],
  };
};
