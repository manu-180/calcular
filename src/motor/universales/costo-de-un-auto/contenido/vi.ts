import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { costoMensual, type GastosAuto } from "../definicion";

export const contenidoVi: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const imperial = ctx.unidades === "imperial";
  const g: GastosAuto = {
    precio: montoEjemplo(ctx, 25000),
    depreciacion: 15,
    seguro: montoEjemplo(ctx, 100),
    distancia: 1000,
    consumo: imperial ? 28 : 8,
    precioCombustible: montoEjemplo(ctx, imperial ? 3.5 : 1.2),
    mantenimiento: montoEjemplo(ctx, 60),
    estacionamiento: 0,
    otros: 0,
  };
  const mensual = costoMensual(g, imperial);
  const unidad = imperial ? "dặm" : "km";
  return {
    h1: "Công cụ tính chi phí nuôi ô tô",
    title: tituloQueEntre(`Công cụ tính chi phí nuôi ô tô tại ${ctx.nombrePais}`, `Chi phí nuôi ô tô tại ${ctx.nombrePais}`, "Công cụ tính chi phí nuôi ô tô"),
    description: `Tính chi phí thực của ô tô theo tháng, theo năm và theo ${unidad}: nhiên liệu, bảo hiểm, bảo dưỡng, gửi xe và khấu hao.`,
    intro: [
      "Nhiều người biết mình tốn bao nhiêu tiền xăng. Ít người cộng thêm bảo hiểm, bảo dưỡng, gửi xe và nhất là phần giá trị xe giảm đi mỗi năm.",
      "Nhập các khoản chi của bạn để xem chiếc xe thực sự tốn bao nhiêu. Kết quả giúp bạn quyết định nên mua xe, đổi xe hay dùng phương tiện khác.",
    ],
    comoSeCalcula: [
      imperial
        ? "Nhiên liệu mỗi tháng = số dặm mỗi tháng ÷ số dặm mỗi gallon × giá mỗi gallon."
        : "Nhiên liệu mỗi tháng = số km mỗi tháng × số lít mỗi 100 km ÷ 100 × giá mỗi lít.",
      "Khấu hao mỗi tháng = giá trị xe × khấu hao mỗi năm ÷ 12.",
      "Chi phí thực = nhiên liệu + bảo hiểm + bảo dưỡng + gửi xe + chi phí khác + khấu hao.",
      `Chi phí mỗi ${unidad} = chi phí thực mỗi tháng ÷ quãng đường đi trong tháng.`,
    ],
    ejemplo: [
      `Một chiếc xe trị giá ${m(g.precio)}, chạy ${formatearNumero(ctx, g.distancia)} ${unidad} mỗi tháng, tốn ${m(mensual)} mỗi tháng, đã tính cả khấu hao.`,
      `Tức là ${m(mensual * 12)} mỗi năm và ${formatearMonto(ctx, mensual / g.distancia)} cho mỗi ${unidad}.`,
    ],
    faq: [
      {
        pregunta: "Khấu hao ô tô là gì?",
        respuesta:
          "Khấu hao là phần giá trị xe mất đi theo thời gian và mức sử dụng. Bạn không trả khoản này mỗi tháng, nhưng sẽ thấy rõ khi bán xe. Với xe mới, đây thường là chi phí lớn nhất.",
      },
      {
        pregunta: "Vì sao không cộng tiền trả hằng tháng của khoản vay?",
        respuesta:
          "Một phần tiền trả hằng tháng là để trả cho chính chiếc xe, vốn đã được tính qua khấu hao. Nếu cộng cả hai, chiếc xe bị tính hai lần. Tiền lãi của khoản vay là chi phí phát sinh thêm ngoài phần này.",
      },
      {
        pregunta: "Làm sao để giảm chi phí nuôi ô tô?",
        respuesta:
          "So sánh phí bảo hiểm mỗi năm, giữ đúng áp suất lốp và lịch bảo dưỡng, và đừng đổi xe quá thường xuyên: giá trị xe giảm nhiều nhất trong những năm đầu.",
      },
    ],
    glosario: [
      { termino: "Khấu hao", definicion: "Phần giá trị xe mất đi do thời gian và mức sử dụng." },
      { termino: `Chi phí mỗi ${unidad}`, definicion: `Chi phí trung bình cho mỗi ${unidad} đã đi, tính đủ mọi khoản.` },
    ],
  };
};
