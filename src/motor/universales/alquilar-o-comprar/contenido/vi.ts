import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { comparar } from "../definicion";

export const contenidoVi: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 200000);
  const alquiler = montoEjemplo(ctx, 1000);
  const base = { precio, entrada: 20, gastosCompra: 4, tasa: 7, aniosHipoteca: 25, alquiler, aumentoAlquiler: 3, gastosPropietario: 1.5, revalorizacion: 3, rendimiento: 5 };
  const a10 = comparar({ ...base, horizonte: 10 }).anios[9];
  const a3 = comparar({ ...base, horizonte: 3 }).anios[2];
  const quien = (a: { comprar: number; alquilar: number }) => (a.comprar >= a.alquilar ? "mua nhà" : "thuê nhà");
  return {
    h1: "Công cụ tính nên thuê hay mua nhà",
    title: tituloQueEntre(`Thuê hay mua nhà tại ${ctx.nombrePais}`, "Tính nên thuê hay mua nhà", "Thuê hay mua nhà"),
    description:
      "So sánh thuê và mua nhà trong khoảng thời gian bạn chọn. Xem lựa chọn nào có lợi hơn, có lợi từ năm nào và chênh lệch là bao nhiêu.",
    intro: [
      "Chỉ so sánh tiền trả hằng tháng với tiền thuê là chưa đủ. Người mua trả tiền lãi, phí bảo trì và thuế đất, nhưng cuối cùng sở hữu căn nhà. Người thuê có thể đem vốn trả trước đi đầu tư.",
      "Công cụ này cộng tất cả theo từng năm và cho thấy lựa chọn nào mang lại tài sản ròng lớn hơn.",
    ],
    comoSeCalcula: [
      "Mua: mỗi tháng bạn trả tiền vay mua nhà và chi phí chủ nhà. Tài sản ròng của bạn là giá trị căn nhà trừ dư nợ còn lại.",
      "Thuê: vốn trả trước và chi phí mua nhà được đem đi đầu tư theo lợi suất của khoản đầu tư khác, còn tiền thuê tăng mỗi năm.",
      "Mỗi tháng, bên chi ít hơn đem phần chênh lệch đi đầu tư, nên hai lựa chọn dùng cùng một ngân sách.",
      "Lựa chọn tốt hơn là lựa chọn có tài sản ròng lớn hơn vào cuối kỳ.",
    ],
    ejemplo: [
      `Căn nhà giá ${m(precio)}, vốn trả trước 20%, vay mua nhà lãi suất 7% trong 25 năm, so với tiền thuê ${m(alquiler)} mỗi tháng.`,
      `Sau 10 năm, ${quien(a10)} có lợi hơn ${m(Math.abs(a10.comprar - a10.alquilar))}. Sau 3 năm, ${quien(a3)} có lợi hơn ${m(Math.abs(a3.comprar - a3.alquilar))}.`,
    ],
    faq: [
      {
        pregunta: "Thuê nhà có phải là mất tiền không?",
        respuesta:
          "Không hẳn. Người mua cũng trả những khoản không lấy lại được: tiền lãi, thuế đất và phí bảo trì. Điều quan trọng là cuối cùng bạn có bao nhiêu tài sản ở mỗi lựa chọn.",
      },
      {
        pregunta: "Vì sao kết quả thay đổi khi đổi khoảng thời gian?",
        respuesta:
          "Mua nhà có chi phí lớn ban đầu (chi phí mua và tiền lãi những năm đầu), cần thời gian mới bù lại được. Nếu bạn dự định chuyển nhà sớm, thuê thường có lợi hơn.",
      },
      {
        pregunta: "Con số nào ảnh hưởng nhiều nhất?",
        respuesta:
          "Tỷ lệ giữa giá nhà và tiền thuê, lãi suất vay mua nhà và mức tăng giá nhà. Hãy thử đổi mức tăng giá nhà và lợi suất đầu tư để xem kết quả thay đổi đến đâu.",
      },
    ],
    glosario: [
      { termino: "Tài sản ròng", definicion: "Tất cả những gì bạn có, trừ đi các khoản nợ." },
      { termino: "Mức tăng giá nhà", definicion: "Phần trăm giá trị căn nhà tăng lên mỗi năm." },
      { termino: "Chi phí cơ hội", definicion: "Khoản lời mà vốn trả trước có thể mang lại nếu được đem đi đầu tư." },
    ],
  };
};
