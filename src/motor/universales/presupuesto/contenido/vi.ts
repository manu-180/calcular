import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoVi: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const ingreso = montoEjemplo(ctx, 2000);
  return {
    h1: "Công cụ lập ngân sách 50/30/20",
    title: tituloQueEntre(`Công cụ lập ngân sách 50/30/20 ${ctx.nombrePais}`, "Công cụ lập ngân sách 50/30/20", "Ngân sách 50/30/20"),
    description:
      "Chia lương net hằng tháng theo quy tắc 50/30/20: bao nhiêu cho thiết yếu, mong muốn và tiết kiệm. Đổi tỷ lệ nếu cần.",
    intro: [
      "Quy tắc 50/30/20 là cách đơn giản để quản lý tài chính hằng tháng. Một nửa cho nhu cầu thiết yếu, 30% cho những điều bạn thích và 20% cho tiết kiệm.",
      "Nhập lương net của bạn và công cụ sẽ hiển thị từng phần. Nếu hoàn cảnh của bạn khác, ví dụ tiền thuê nhà cao, hãy điều chỉnh tỷ lệ.",
    ],
    comoSeCalcula: ["Thiết yếu = thu nhập × 50%.", "Mong muốn = thu nhập × 30%.", "Tiết kiệm = thu nhập × 20%. Tổng ba tỷ lệ phải bằng 100%."],
    ejemplo: [
      `Với thu nhập ${m(ingreso)} mỗi tháng: ${m(ingreso * 0.5)} cho thiết yếu, ${m(ingreso * 0.3)} cho mong muốn và ${m(ingreso * 0.2)} cho tiết kiệm.`,
      `Trong một năm, phần 20% đó thành khoản tiết kiệm ${m(ingreso * 0.2 * 12)}.`,
    ],
    faq: [
      {
        pregunta: "Khoản nào là thiết yếu, khoản nào là mong muốn?",
        respuesta:
          "Thiết yếu là các hóa đơn bắt buộc phải trả: nhà ở, thực phẩm cơ bản, điện nước, đi lại, sức khỏe và khoản trả nợ tối thiểu. Mong muốn là những khoản chi có thể dừng khi cần.",
      },
      {
        pregunta: "Nếu chi tiêu thiết yếu của tôi vượt quá 50% thì sao?",
        respuesta: "Điều đó khá phổ biến, nhất là khi tiền thuê nhà cao. Hãy thử 60/20/20 hoặc 70/20/10, và cố gắng không để phần tiết kiệm về 0.",
      },
      {
        pregunta: "Tiền trả nợ có tính vào tiết kiệm không?",
        respuesta: "Khoản trả nợ tối thiểu thuộc nhóm thiết yếu. Khoản trả thêm để hết nợ sớm được tính vào tiết kiệm, vì cũng làm tăng tài sản ròng của bạn.",
      },
    ],
    glosario: [
      { termino: "Lương net", definicion: "Thu nhập bạn nhận được sau thuế và các khoản khấu trừ." },
      { termino: "Quy tắc 50/30/20", definicion: "Cách chia thu nhập cho thiết yếu, mong muốn và tiết kiệm." },
    ],
  };
};
