import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { equilibrio } from "../definicion";

export const contenidoVi: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const fijos = montoEjemplo(ctx, 5000);
  const precio = montoEjemplo(ctx, 50);
  const variable = montoEjemplo(ctx, 30);
  const objetivo = montoEjemplo(ctx, 2000);
  const base = equilibrio(fijos, precio, variable);
  const meta = equilibrio(fijos + objetivo, precio, variable);
  return {
    h1: "Công cụ tính điểm hòa vốn (BEP)",
    title: tituloQueEntre(`Công cụ tính điểm hòa vốn (BEP) ${ctx.nombrePais}`, `Công cụ tính điểm hòa vốn ${ctx.nombrePais}`, "Công cụ tính điểm hòa vốn (BEP)"),
    description: "Tính số đơn vị cần bán và doanh thu mỗi tháng để bù đủ mọi chi phí kinh doanh, cũng như để đạt lợi nhuận mục tiêu của bạn.",
    intro: [
      "Điểm hòa vốn (BEP, break even point) là mức bán hàng mà tại đó doanh nghiệp không lãi cũng không lỗ. Dưới mức này bạn lỗ, trên mức này bạn bắt đầu có lãi.",
      "Nhập chi phí cố định, giá bán và chi phí mỗi đơn vị. Công cụ sẽ tính số cần bán để bù chi phí và để đạt mục tiêu của bạn.",
    ],
    comoSeCalcula: [
      "Số dư đảm phí = giá bán − chi phí biến đổi mỗi đơn vị.",
      "Sản lượng hòa vốn = chi phí cố định ÷ số dư đảm phí, làm tròn lên.",
      "Doanh thu hòa vốn = chi phí cố định ÷ (số dư đảm phí ÷ giá bán).",
      "Với lợi nhuận mục tiêu, cộng mục tiêu đó vào chi phí cố định rồi tính theo cách tương tự.",
    ],
    ejemplo: [
      `Với chi phí cố định ${m(fijos)}, giá bán ${m(precio)} và chi phí biến đổi ${m(variable)}, mỗi lần bán còn lại ${m(precio - variable)}.`,
      `Bạn cần bán ${formatearNumero(ctx, base.unidades)} đơn vị (${m(base.facturacion)}) để bù chi phí, và ${formatearNumero(ctx, meta.unidades)} đơn vị để có lợi nhuận ${m(objetivo)} mỗi tháng.`,
    ],
    faq: [
      {
        pregunta: "Chi phí cố định và chi phí biến đổi là gì?",
        respuesta:
          "Chi phí cố định không đổi dù không bán được hàng: tiền thuê, lương cố định, điện. Chi phí biến đổi tăng theo doanh số: hàng hóa, nguyên liệu, hoa hồng, phí giao hàng.",
      },
      {
        pregunta: "Làm sao để hạ điểm hòa vốn?",
        respuesta: "Có ba cách: tăng giá bán, giảm chi phí biến đổi mỗi đơn vị hoặc cắt giảm chi phí cố định. Giá bán thường có tác động lớn nhất.",
      },
      {
        pregunta: "Có dùng được cho doanh nghiệp dịch vụ không?",
        respuesta: "Có. Một đơn vị có thể là một giờ, một buổi hoặc một khách hàng mỗi tháng. Nhập chi phí để cung cấp mỗi dịch vụ làm chi phí biến đổi.",
      },
    ],
    glosario: [
      { termino: "Điểm hòa vốn (BEP)", definicion: "Mức bán hàng mà tại đó doanh thu bằng tổng chi phí." },
      { termino: "Số dư đảm phí", definicion: "Phần còn lại của mỗi lần bán để bù chi phí cố định." },
    ],
  };
};
