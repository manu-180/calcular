import { aDia, aFecha, esHabil, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoVi: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const inicio = "2026-03-02";
  const mas90 = aFecha(aDia(inicio) + 90);
  let habil = aDia(inicio);
  for (let n = 0; n < 15; ) if (esHabil(++habil)) n++;
  return {
    h1: "Cộng trừ ngày",
    title: tituloQueEntre(
      `Công cụ cộng trừ ngày cho ${ctx.nombrePais}`,
      `Cộng trừ ngày cho ${ctx.nombrePais}`,
      "Công cụ cộng trừ ngày",
    ),
    description: "Cộng hoặc trừ ngày theo lịch hay ngày làm việc từ một mốc thời gian và xem kết quả rơi vào thứ mấy. Tiện cho thời hạn và ngày đến hạn.",
    intro: [
      "Chọn ngày bắt đầu, số ngày và phép cộng hoặc trừ. Bạn sẽ thấy ngày kết quả và thứ của ngày đó.",
      "Với ngày làm việc, Thứ Bảy và Chủ Nhật được bỏ qua.",
    ],
    comoSeCalcula: [
      "Với ngày theo lịch, mỗi ngày bạn nhập sẽ tiến thêm một ngày trên lịch.",
      "Với ngày làm việc, chỉ tính từ Thứ Hai đến Thứ Sáu. Ngày bắt đầu không được tính.",
      "Ngày lễ không được trừ ra vì khác nhau giữa các quốc gia và địa phương.",
    ],
    ejemplo: [`Từ ${f(inicio)}, cộng 90 ngày theo lịch sẽ đến ${f(mas90)}.`, `Từ ${f(inicio)}, cộng 15 ngày làm việc sẽ đến ${f(aFecha(habil))}.`],
    faq: [
      {
        pregunta: "Ngày bắt đầu có được tính là ngày đầu tiên không?",
        respuesta: "Không. Thứ Hai cộng 1 ngày là Thứ Ba. Đa số thời hạn được tính theo cách này.",
      },
      {
        pregunta: "Nếu cộng ngày làm việc từ Thứ Bảy thì sao?",
        respuesta: "Ngày làm việc đầu tiên là Thứ Hai kế tiếp. Thứ Bảy cộng 1 ngày làm việc là Thứ Hai.",
      },
      {
        pregunta: "Năm nhuận có được tính không?",
        respuesta: "Có. Nếu khoảng thời gian đi qua ngày 29 tháng 2, ngày đó được tính thêm một ngày.",
      },
    ],
    glosario: [
      { termino: "Ngày theo lịch", definicion: "Tất cả các ngày trên lịch, không bỏ qua ngày nào." },
      { termino: "Ngày làm việc", definicion: "Trong công cụ này, từ Thứ Hai đến Thứ Sáu." },
    ],
  };
};
