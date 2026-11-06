import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { precioConMargen } from "../definicion";

export const contenidoVi: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  const costo = montoEjemplo(ctx, 60);
  const precio = montoEjemplo(ctx, 100);
  return {
    h1: "Công cụ tính biên lợi nhuận",
    title: tituloQueEntre(`Công cụ tính biên lợi nhuận ${ctx.nombrePais}`, `Biên lợi nhuận ${ctx.nombrePais}`, "Công cụ tính biên lợi nhuận"),
    description: "Tính biên lợi nhuận và markup từ giá vốn và giá bán, hoặc tính giá bán cần đặt để đạt biên lợi nhuận bạn muốn.",
    intro: [
      "Biên lợi nhuận và markup rất dễ nhầm lẫn, và phần chênh lệch có thể khiến bạn lỗ. Cả hai đều đo cùng một khoản lợi nhuận, nhưng trên hai cơ sở khác nhau.",
      "Nhập giá vốn và giá bán để xem cả hai chỉ số. Hoặc chọn biên lợi nhuận mục tiêu để biết giá bán cần đặt.",
    ],
    comoSeCalcula: [
      "Lợi nhuận = giá bán − giá vốn.",
      "Biên lợi nhuận = lợi nhuận ÷ giá bán × 100.",
      "Markup = lợi nhuận ÷ giá vốn × 100.",
      "Giá bán theo biên lợi nhuận mục tiêu = giá vốn ÷ (1 − biên lợi nhuận ÷ 100).",
    ],
    ejemplo: [
      `Sản phẩm có giá vốn ${m(costo)}, bán ${m(precio)} cho lợi nhuận ${m(precio - costo)}: biên lợi nhuận ${p(((precio - costo) / precio) * 100)} và markup ${p(((precio - costo) / costo) * 100)}.`,
      `Để đạt biên lợi nhuận 50% với giá vốn đó, bạn cần bán với giá ${m(precioConMargen(costo, 50))}. Cộng thêm 50% vào giá vốn chỉ cho biên lợi nhuận ${p(100 / 3)}.`,
    ],
    faq: [
      {
        pregunta: "Biên lợi nhuận và markup khác nhau thế nào?",
        respuesta: "Biên lợi nhuận là lợi nhuận so với giá bán. Markup là lợi nhuận so với giá vốn. Với cùng một khoản lợi nhuận, markup luôn lớn hơn.",
      },
      {
        pregunta: "Cách tính giá bán từ biên lợi nhuận mục tiêu như thế nào?",
        respuesta: `Chia giá vốn cho (1 − biên lợi nhuận). Với biên lợi nhuận 30%, chia giá vốn cho ${formatearNumero(ctx, 0.7, 2)}. Đừng cộng 30% vào giá vốn: lợi nhuận sẽ thấp hơn dự tính.`,
      },
      {
        pregunta: "Giá vốn có gồm thuế không?",
        respuesta: "Dùng giá vốn và giá bán không gồm thuế tính cho người mua, như thuế GTGT. Nếu tính cả thuế, biên lợi nhuận sẽ trông lớn hơn thực tế.",
      },
    ],
    glosario: [
      { termino: "Biên lợi nhuận", definicion: "Lợi nhuận tính theo phần trăm giá bán." },
      { termino: "Markup", definicion: "Lợi nhuận tính theo phần trăm giá vốn." },
      { termino: "Giá vốn", definicion: "Chi phí để mua hoặc sản xuất hàng bán ra." },
    ],
  };
};
