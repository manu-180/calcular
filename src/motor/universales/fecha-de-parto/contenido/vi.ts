import { aDia, aFecha, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DURACION } from "../definicion";

export const contenidoVi: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const fum = "2026-01-10";
  const fpp = aFecha(aDia(fum) + DURACION);
  const fpp32 = aFecha(aDia(fum) + DURACION + 4);
  return {
    h1: "Công cụ tính ngày dự sinh",
    title: tituloQueEntre(`Tính ngày dự sinh và tuổi thai tại ${ctx.nombrePais}`, `Tính ngày dự sinh tại ${ctx.nombrePais}`, "Tính ngày dự sinh"),
    description: "Tính ngày dự sinh từ ngày đầu của kỳ kinh cuối hoặc ngày thụ thai, và xem tuổi thai hôm nay theo tuần.",
    intro: [
      "Nhập ngày đầu của kỳ kinh cuối, hoặc ngày thụ thai nếu bạn biết. Bạn sẽ thấy ngày dự sinh, tuổi thai và tam cá nguyệt hiện tại.",
      "Đây chỉ là ước tính. Khám với bác sĩ hoặc nữ hộ sinh và siêu âm sẽ cho ngày chính xác nhất.",
    ],
    comoSeCalcula: [
      "Cách tính dùng công thức Naegele: ngày dự sinh là ngày đầu của kỳ kinh cuối cộng 280 ngày (40 tuần).",
      "Nếu chu kỳ kinh của bạn dài hơn hoặc ngắn hơn 28 ngày, ngày dự sinh dịch đi đúng bằng phần chênh lệch.",
      "Nếu tính từ ngày thụ thai, cộng thêm 266 ngày (38 tuần).",
      "Tuổi thai được tính từ ngày đầu của kỳ kinh cuối, không phải từ ngày thụ thai.",
    ],
    ejemplo: [
      `Với kỳ kinh cuối bắt đầu vào ${f(fum)} và chu kỳ 28 ngày, ngày dự sinh là ${f(fpp)}.`,
      `Với chu kỳ 32 ngày, ngày dự sinh dịch đi 4 ngày, thành ${f(fpp32)}.`,
    ],
    faq: [
      {
        pregunta: "Cách tính ngày dự sinh như thế nào?",
        respuesta: "Cộng 280 ngày vào ngày đầu của kỳ kinh cuối. Cách nhanh cho kết quả gần giống: cộng 7 vào ngày, trừ 3 vào tháng và cộng 1 vào năm.",
      },
      {
        pregunta: "Vì sao tuổi thai được tính từ kỳ kinh cuối?",
        respuesta: "Vì hầu như ai cũng biết ngày này. Do đó, ở tuần thứ 2 việc thụ thai thực ra vẫn chưa xảy ra.",
      },
      {
        pregunta: "Có bao nhiêu em bé chào đời đúng ngày dự sinh?",
        respuesta: "Rất ít. Phần lớn em bé chào đời từ tuần 37 đến tuần 42, nên ngày dự sinh là mốc tham khảo, không phải ngày chắc chắn.",
      },
    ],
    glosario: [
      { termino: "Kỳ kinh cuối", definicion: "Lần có kinh gần nhất. Ngày dùng để tính là ngày đầu tiên có kinh của lần đó." },
      { termino: "Công thức Naegele", definicion: "Cách ước tính ngày dự sinh bằng cách cộng 280 ngày vào ngày đầu của kỳ kinh cuối." },
    ],
  };
};
