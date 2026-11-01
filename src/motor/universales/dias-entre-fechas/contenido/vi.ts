import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aDia, fechaLarga, habilesEntre } from "../../comun/fechas";

export const contenidoVi: ContenidoUniversal = (ctx) => {
  const desde = "2026-03-02";
  const hasta = "2026-06-30";
  const dias = aDia(hasta) - aDia(desde);
  const habiles = habilesEntre(aDia(desde), aDia(hasta));
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  return {
    h1: "Công cụ tính số ngày giữa hai ngày",
    title: tituloQueEntre(
      `Công cụ tính số ngày giữa hai ngày cho ${ctx.nombrePais}`,
      "Tính số ngày giữa hai ngày",
      "Công cụ tính số ngày",
    ),
    description: "Tính số ngày giữa hai ngày: ngày theo lịch, số tuần, số tháng và ngày làm việc từ thứ Hai đến thứ Sáu.",
    intro: [
      "Chọn ngày bắt đầu và ngày kết thúc. Bạn sẽ thấy số ngày theo lịch, cùng khoảng thời gian đó theo tuần và tháng, và số ngày làm việc.",
      "Dùng để tính thời hạn, ngày đến hạn, ngày nghỉ phép, thai kỳ hoặc đếm ngược.",
    ],
    comoSeCalcula: [
      "Ngày theo lịch là tất cả các ngày nằm giữa hai ngày đã chọn. Ngày bắt đầu được tính, ngày kết thúc thì không, trừ khi bạn đánh dấu tùy chọn.",
      "Ngày làm việc là các ngày từ thứ Hai đến thứ Sáu trong cùng khoảng đó. Không trừ ngày nghỉ lễ.",
      "Năm nhuận được tính cả ngày 29 tháng 2.",
    ],
    ejemplo: [
      `Từ ${f(desde)} đến ${f(hasta)} có ${formatearNumero(ctx, dias)} ngày theo lịch.`,
      `Trong đó, ${formatearNumero(ctx, habiles)} ngày rơi vào từ thứ Hai đến thứ Sáu.`,
    ],
    faq: [
      {
        pregunta: "Ngày đầu hoặc ngày cuối có được tính không?",
        respuesta: "Theo mặc định, ngày đầu được tính và ngày cuối thì không, giống như khi lấy hai ngày trừ cho nhau. Nếu cần tính cả hai, đánh dấu “Tính cả ngày kết thúc”.",
      },
      {
        pregunta: "Ngày làm việc đã trừ ngày nghỉ lễ chưa?",
        respuesta: "Chưa. Ngày làm việc được tính từ thứ Hai đến thứ Sáu. Ngày nghỉ lễ khác nhau theo quốc gia, địa phương và từng năm, nên bạn cần trừ riêng.",
      },
      {
        pregunta: "Một năm có bao nhiêu ngày?",
        respuesta: "365 ngày, hoặc 366 ngày vào năm nhuận. Vì vậy, khoảng cách giữa hai ngày giống nhau ở các năm khác nhau có thể chênh lệch.",
      },
    ],
    glosario: [
      { termino: "Ngày theo lịch", definicion: "Tất cả các ngày trên lịch, kể cả cuối tuần và ngày nghỉ lễ." },
      { termino: "Ngày làm việc", definicion: "Trong công cụ này, từ thứ Hai đến thứ Sáu." },
    ],
  };
};
