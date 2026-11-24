import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoVi: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 0.15);
  const kwhMes = (1000 * 4 * 30) / 1000;
  return {
    h1: "Công cụ tính tiền điện",
    title: tituloQueEntre(`Công cụ tính tiền điện hằng tháng ${ctx.nombrePais}`, `Công cụ tính tiền điện ${ctx.nombrePais}`, "Công cụ tính tiền điện"),
    description: "Tính điện năng tiêu thụ và tiền điện của một thiết bị theo ngày, tháng và năm từ công suất (watt), thời gian dùng và giá mỗi kWh.",
    intro: [
      "Nhập công suất thiết bị, số giờ bạn dùng và giá mỗi kWh trên hóa đơn. Bạn sẽ thấy điện năng tiêu thụ và chi phí.",
      "Dùng công cụ này để biết thiết bị nào làm hóa đơn tăng nhiều nhất: máy lạnh, máy nước nóng, tủ lạnh hay máy tính.",
    ],
    comoSeCalcula: [
      "kWh mỗi ngày = watt × số giờ dùng ÷ 1.000.",
      "kWh mỗi tháng = kWh mỗi ngày × số ngày dùng. Để tính cả năm, nhân số tháng với 12.",
      "Chi phí = kWh × giá mỗi kWh.",
    ],
    ejemplo: [
      `Thiết bị 1.000 watt dùng 4 giờ mỗi ngày tiêu thụ 4 kWh mỗi ngày và ${formatearNumero(ctx, kwhMes)} kWh mỗi tháng.`,
      `Với giá ${m(precio)} mỗi kWh, chi phí là ${m(kwhMes * precio)} mỗi tháng.`,
    ],
    faq: [
      {
        pregunta: "kWh là gì?",
        respuesta: "Kilowatt giờ (kWh) là điện năng mà thiết bị 1.000 watt dùng khi chạy trong một giờ. Đây là đơn vị ghi trên hóa đơn tiền điện, còn gọi là “số điện”.",
      },
      {
        pregunta: "Tủ lạnh có chạy hết công suất cả ngày không?",
        respuesta: "Không. Máy nén bật và tắt luân phiên. Với thiết bị như vậy, hãy nhập khoảng 8 đến 10 giờ mỗi ngày, không phải 24.",
      },
      {
        pregunta: "Vì sao kết quả không khớp hẳn với hóa đơn của tôi?",
        respuesta: "Hóa đơn có thể cộng thêm phí cố định, thuế hoặc giá khác nhau theo từng bậc. Công cụ này chỉ cho thấy mức tiêu thụ của thiết bị đó.",
      },
    ],
    glosario: [
      { termino: "Watt (W)", definicion: "Đơn vị công suất: lượng năng lượng thiết bị dùng trong mỗi giây." },
      { termino: "Kilowatt giờ (kWh)", definicion: "1.000 watt trong một giờ. Đây là phần bạn trả trên hóa đơn tiền điện." },
    ],
  };
};
