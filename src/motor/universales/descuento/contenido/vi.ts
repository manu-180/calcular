import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoVi: ContenidoUniversal = (ctx) => {
  const precio = montoEjemplo(ctx, 80);
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Công cụ tính giảm giá",
    title: tituloQueEntre(`Công cụ tính giảm giá cho ${ctx.nombrePais}`, "Công cụ tính giảm giá và giá sau giảm", "Công cụ tính giảm giá"),
    description: "Tính giá sau giảm và số tiền bạn tiết kiệm được, kể cả khi giảm nhiều lần, như giảm 30% rồi giảm thêm 10%.",
    intro: [
      "Nhập giá và mức giảm để biết ngay số tiền phải trả và số tiền tiết kiệm được.",
      "Nếu chương trình khuyến mãi có giảm thêm, hãy nhập cả mức đó: hai mức giảm liên tiếp không bao giờ được cộng thẳng vào nhau.",
    ],
    comoSeCalcula: [
      "Giá sau giảm = giá ban đầu × (1 − mức giảm ÷ 100).",
      "Mức giảm thêm được tính trên giá đã trừ mức giảm đầu tiên.",
      "Số tiền tiết kiệm được là giá ban đầu trừ giá sau giảm.",
    ],
    ejemplo: [
      `Một món hàng giá ${m(precio)}, giảm 25%, còn ${m(precio * 0.75)}.`,
      `Nếu giảm 30% rồi giảm thêm 10%, giá còn ${m(precio * 0.7 * 0.9)}: tổng mức giảm là 37%, không phải 40%.`,
    ],
    faq: [
      {
        pregunta: "Cách tính giảm giá như thế nào?",
        respuesta: "Nhân giá với phần trăm giảm rồi chia cho 100. Đó là số tiền được giảm. Lấy giá ban đầu trừ số tiền này sẽ ra giá phải trả.",
      },
      {
        pregunta: "Giảm 30% + 10% có bằng giảm 40% không?",
        respuesta: "Không. Mức giảm thứ hai được tính trên giá đã giảm, nên tổng mức giảm là 37%.",
      },
      {
        pregunta: "Làm sao tìm giá gốc từ giá đã giảm?",
        respuesta: `Lấy giá đã giảm chia cho (1 − mức giảm ÷ 100). Với mức giảm 25%, chia cho ${formatearNumero(ctx, 0.75, 2)}.`,
      },
    ],
    glosario: [
      { termino: "Giảm giá", definicion: "Phần trăm được trừ vào giá ban đầu." },
      { termino: "Mức giảm thực tế", definicion: "Tổng phần trăm bạn tiết kiệm được khi có nhiều hơn một mức giảm." },
    ],
  };
};
