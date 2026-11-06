import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { horarios, minutosTrabajados } from "../definicion";

export const contenidoVi: ContenidoUniversal = (ctx) => {
  const m = (x: number) => formatearMonto(ctx, x);
  const n = (x: number, decimales = 0) => formatearNumero(ctx, x, decimales);
  const hora = (v: string) => horarios(ctx.locale).find((o) => o.valor === v)?.etiqueta ?? v;
  const pago = montoEjemplo(ctx, 15);
  const jornada = minutosTrabajados("09:00", "17:30", 30) / 60;
  const larga = minutosTrabajados("08:00", "18:00", 60) / 60;
  const extra = larga * 5 - 40;
  return {
    h1: "Công cụ tính giờ làm",
    title: tituloQueEntre(`Công cụ tính giờ làm và tăng ca ${ctx.nombrePais}`, `Công cụ tính giờ làm ${ctx.nombrePais}`, "Công cụ tính giờ làm"),
    description: "Cộng giờ làm trong tuần từ giờ vào, giờ ra và thời gian nghỉ, rồi tính lương của bạn, gồm cả tiền tăng ca.",
    intro: [
      "Chọn giờ vào và giờ ra mỗi ngày, thời gian nghỉ không lương và lương theo giờ. Kết quả cho bạn biết tổng số giờ, giờ tăng ca và lương tuần này.",
      "Dùng công cụ này để đối chiếu phiếu lương, điền bảng chấm công hoặc tính tiền cho công việc trả theo giờ.",
    ],
    comoSeCalcula: [
      "Số giờ mỗi ngày = giờ ra − giờ vào − thời gian nghỉ. Nếu giờ ra sớm hơn giờ vào, ca làm kết thúc vào hôm sau.",
      "Giờ tăng ca = tổng số giờ trong tuần − giờ làm thường, nếu tổng vượt quá giờ làm thường.",
      "Lương = giờ làm thường × lương theo giờ + giờ tăng ca × lương theo giờ × (1 + phụ trội tăng ca).",
    ],
    ejemplo: [
      `Từ ${hora("09:00")} đến ${hora("17:30")}, nghỉ 30 phút, bạn làm ${n(jornada)} giờ mỗi ngày. Từ thứ Hai đến thứ Sáu là ${n(jornada * 5)} giờ: với lương ${m(pago)} mỗi giờ, tổng cộng là ${m(jornada * 5 * pago)}.`,
      `Từ ${hora("08:00")} đến ${hora("18:00")}, nghỉ một giờ, bạn làm ${n(larga * 5)} giờ mỗi tuần, trong đó ${n(extra)} giờ là tăng ca. Với mức 1,5 lần, lương là ${m(40 * pago + extra * pago * 1.5)}.`,
    ],
    faq: [
      {
        pregunta: "Cách tính giờ làm như thế nào?",
        respuesta: "Lấy giờ ra trừ giờ vào, rồi trừ thời gian nghỉ. Sau đó cộng tất cả các ngày trong tuần.",
      },
      {
        pregunta: "Đổi phút sang giờ thập phân như thế nào?",
        respuesta: `Chia số phút cho 60. Nửa giờ bằng ${n(0.5, 1)}; 15 phút bằng ${n(0.25, 2)}; 45 phút bằng ${n(0.75, 2)}. Vậy 7 giờ 45 phút bằng ${n(7.75, 2)} giờ.`,
      },
      {
        pregunta: "Giới hạn giờ tăng ca là bao nhiêu và tiền tăng ca tính ra sao?",
        respuesta:
          "Điều này tùy thuộc vào quy định lao động nơi bạn làm việc và hợp đồng của bạn. Công cụ này dùng phụ trội tăng ca và giờ làm thường do bạn nhập, không áp dụng một quy định cụ thể nào.",
      },
    ],
    glosario: [
      { termino: "Tăng ca", definicion: "Giờ làm ngoài giờ làm thường, được trả ở mức cao hơn." },
      { termino: "Lương theo giờ", definicion: "Tiền lương cho mỗi giờ làm thường." },
    ],
  };
};
