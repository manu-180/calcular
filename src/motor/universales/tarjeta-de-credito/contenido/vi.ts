import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { saldar } from "../definicion";

const r2 = (n: number) => Math.round(n * 100) / 100;

export const contenidoVi: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const saldo = montoEjemplo(ctx, 2000);
  const fijo = montoEjemplo(ctx, 100);
  const conFijo = saldar(saldo, 22, { modo: "fijo", fijo, porcentaje: 0, piso: 0 }, r2);
  const conMinimo = saldar(saldo, 22, { modo: "minimo", fijo: 0, porcentaje: 5, piso: montoEjemplo(ctx, 25) }, r2);
  return {
    h1: "Công cụ tính lãi và thời gian trả hết thẻ tín dụng",
    title: tituloQueEntre(`Tính lãi thẻ tín dụng ${ctx.nombrePais}`, "Tính thời gian trả hết thẻ tín dụng", "Tính lãi thẻ tín dụng"),
    description:
      "Tìm hiểu cần bao nhiêu tháng để trả hết dư nợ thẻ tín dụng và tiền lãi là bao nhiêu, khi trả số tiền cố định hoặc thanh toán tối thiểu.",
    intro: [
      "Thẻ tín dụng thường là khoản nợ có lãi suất cao nhất. Nếu chỉ thanh toán tối thiểu, bạn có thể mất nhiều năm để trả hết và tiền lãi cứ tăng dần.",
      "Nhập dư nợ, lãi suất mỗi năm và số tiền bạn có thể trả mỗi tháng. Công cụ hiển thị khi nào trả hết, tổng tiền lãi và kế hoạch theo tháng.",
    ],
    comoSeCalcula: [
      "Mỗi tháng cộng thêm tiền lãi: dư nợ × lãi suất mỗi năm ÷ 12.",
      "Sau đó trừ số tiền trả. Với thanh toán tối thiểu, số tiền này là một tỷ lệ trên dư nợ, có mức thấp nhất.",
      "Lặp lại cho đến khi dư nợ bằng 0. Nếu số tiền trả không lớn hơn tiền lãi, khoản nợ không bao giờ giảm.",
    ],
    ejemplo: [
      `Dư nợ ${m(saldo)} với lãi suất 22% mỗi năm, trả ${m(fijo)} mỗi tháng, sẽ hết sau ${conFijo.meses} tháng với tổng tiền lãi ${m(conFijo.intereses)}.`,
      `Nếu chỉ thanh toán tối thiểu 5%, cần ${conMinimo.meses} tháng để trả hết và tiền lãi tăng lên ${m(conMinimo.intereses)}.`,
    ],
    faq: [
      {
        pregunta: "Điều gì xảy ra nếu chỉ thanh toán tối thiểu thẻ tín dụng?",
        respuesta:
          "Khoản thanh toán tối thiểu giảm theo dư nợ, nên mỗi tháng bạn trả ít hơn và khoản nợ kéo dài. Nếu có thể, hãy trả số tiền cố định lớn hơn, dù chỉ cao hơn mức tối thiểu một chút.",
      },
      {
        pregunta: "Có nên chuyển dư nợ thẻ sang khoản vay tiền mặt không?",
        respuesta: "Nếu lãi suất khoản vay thấp hơn nhiều so với lãi suất thẻ, thường sẽ tiết kiệm hơn. Hãy so sánh tổng tiền lãi của hai lựa chọn, gồm cả phí xử lý hồ sơ và phí quản lý.",
      },
      {
        pregunta: "Nên trả thẻ nào trước?",
        respuesta: "Thanh toán tối thiểu tất cả các thẻ, rồi dùng phần còn lại trả thẻ có lãi suất cao nhất. Cách này giúp tổng tiền lãi bạn trả ở mức thấp nhất.",
      },
    ],
    glosario: [
      { termino: "Thanh toán tối thiểu", definicion: "Số tiền thấp nhất phải trả mỗi tháng để không bị phí trả chậm. Không giúp trả hết nợ." },
      { termino: "Dư nợ", definicion: "Tổng số tiền bạn còn nợ đơn vị phát hành thẻ." },
    ],
  };
};
