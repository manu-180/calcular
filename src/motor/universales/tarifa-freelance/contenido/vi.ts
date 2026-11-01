import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { tarifa } from "../definicion";

export const contenidoVi: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const ingreso = montoEjemplo(ctx, 40000);
  const gastos = montoEjemplo(ctx, 5000);
  const r = tarifa({ ingreso, gastos, impuestos: 25, diasLibres: 30, diasSemana: 5, horasSemana: 25 });
  return {
    h1: "Công cụ tính giá freelance theo giờ",
    title: tituloQueEntre(`Công cụ tính giá freelance theo giờ ${ctx.nombrePais}`, `Giá freelance ${ctx.nombrePais}`, "Công cụ tính giá freelance"),
    description: "Tính giá theo giờ và theo ngày khi làm freelancer từ thu nhập bạn muốn có, chi phí kinh doanh, thuế, ngày nghỉ và số giờ tính phí được.",
    intro: [
      "Sai lầm phổ biến nhất của freelancer là lấy mức lương mong muốn khi làm nhân viên rồi chia cho 160 giờ. Cách đó bỏ qua thuế, chi phí kinh doanh, ngày nghỉ và mọi giờ không tính phí được.",
      "Công cụ này bắt đầu từ thu nhập thực nhận bạn muốn có, rồi tính mức giá cần đặt để đạt được con số đó.",
    ],
    comoSeCalcula: [
      "Số tiền cần xuất hóa đơn = thu nhập thực nhận ÷ (1 − thuế suất) + chi phí kinh doanh.",
      "Số ngày làm việc = 52 tuần × số ngày làm việc mỗi tuần − số ngày nghỉ.",
      "Số giờ tính phí mỗi năm = số ngày làm việc × số giờ tính phí mỗi ngày.",
      "Giá theo giờ = số tiền cần xuất hóa đơn ÷ số giờ tính phí mỗi năm.",
    ],
    ejemplo: [
      `Để có thu nhập thực nhận ${m(ingreso)} mỗi năm, với chi phí kinh doanh ${m(gastos)} và thuế 25%, bạn cần xuất hóa đơn ${m(r.facturado)}.`,
      `Với 30 ngày nghỉ và 25 giờ tính phí mỗi tuần, tức là ${Math.round(r.horas)} giờ mỗi năm: giá ${m(r.hora)} mỗi giờ hoặc ${m(r.dia)} mỗi ngày.`,
    ],
    faq: [
      {
        pregunta: "Mỗi tuần tính phí được bao nhiêu giờ?",
        respuesta:
          "Ít hơn số giờ bạn làm việc. Tìm khách hàng, trả lời email, lập hóa đơn và học thêm đều tốn thời gian không được trả tiền. Thường là 20 đến 30 giờ tính phí trong 40 giờ làm việc.",
      },
      {
        pregunta: "Nên tính giá theo giờ hay theo dự án?",
        respuesta: "Cả hai đều được. Ngay cả khi báo giá theo dự án, hãy ước tính số giờ rồi nhân với mức giá này để không bị thiếu.",
      },
      {
        pregunta: "Nên dùng thuế suất bao nhiêu?",
        respuesta:
          "Tùy quốc gia và hình thức kinh doanh của bạn. Cộng thuế thu nhập cá nhân (thuế TNCN) với bảo hiểm xã hội. Nếu chưa chắc, hãy hỏi kế toán.",
      },
    ],
    glosario: [
      { termino: "Giờ tính phí", definicion: "Giờ làm việc bạn thu tiền của khách hàng." },
      { termino: "Thu nhập thực nhận", definicion: "Số tiền còn lại sau thuế và chi phí kinh doanh." },
    ],
  };
};
