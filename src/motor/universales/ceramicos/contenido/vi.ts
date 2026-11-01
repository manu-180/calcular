import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoVi: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const piezas = Math.ceil((150 * 1.1) / 1 - 1e-9);
        return [
          `Với 150 ft², gạch 12 × 12 in (1 ft² mỗi viên) và dự phòng 10%, bạn cần ${piezas} viên.`,
          `Nếu mỗi thùng có 10 viên, bạn cần ${Math.ceil(piezas / 10)} thùng.`,
        ];
      })()
    : (() => {
        const pieza = 0.6 * 0.6;
        const piezas = Math.ceil((20 * 1.1) / pieza - 1e-9);
        return [
          `Với 20 m², gạch 60 × 60 cm (${n(pieza)} m² mỗi viên) và dự phòng 10%, bạn cần ${piezas} viên.`,
          `Nếu mỗi thùng có 4 viên, bạn cần ${Math.ceil(piezas / 4)} thùng.`,
        ];
      })();
  return {
    h1: "Công cụ tính gạch lát nền",
    title: tituloQueEntre(`Công cụ tính số gạch lát nền ${ctx.nombrePais}`, `Tính gạch lát nền ${ctx.nombrePais}`, "Tính gạch lát nền"),
    description: "Tính số viên gạch cần cho sàn hoặc tường, đã gồm phần dự phòng hao hụt, và số thùng cần mua. Nhập diện tích và kích thước gạch.",
    intro: [
      "Nhập diện tích cần lát, kích thước viên gạch và số viên mỗi thùng. Bạn sẽ thấy cần mua bao nhiêu viên và bao nhiêu thùng.",
      "Phần dự phòng hao hụt bù cho các viên phải cắt ở mép và các viên bị vỡ.",
    ],
    comoSeCalcula: [
      `Diện tích một viên = dài × rộng, đổi sang ${imperial ? "feet vuông" : "mét vuông"}.`,
      "Số viên = diện tích × (1 + dự phòng ÷ 100) ÷ diện tích một viên, làm tròn lên.",
      "Số thùng = số viên ÷ số viên mỗi thùng, làm tròn lên.",
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Nên dự phòng bao nhiêu gạch?",
        respuesta: "10% khi lát thẳng. Khi lát chéo, lát xương cá hoặc phòng có nhiều góc phải cắt, từ 15% đến 20%.",
      },
      {
        pregunta: "Có cần tính độ rộng mạch gạch không?",
        respuesta: "Không. Mạch gạch chỉ rộng vài milimét và phần chênh lệch đã nằm trong dự phòng hao hụt.",
      },
      {
        pregunta: "Có nên mua dư gạch không?",
        respuesta: "Có, vài viên cùng lô sản xuất. Nếu sau này có viên bị vỡ, gạch từ lô khác có thể hơi khác màu.",
      },
    ],
    glosario: [
      { termino: "Dự phòng hao hụt", definicion: "Phần trăm mua thêm cho phần cắt và gạch vỡ." },
      { termino: "Mạch gạch", definicion: "Khe giữa các viên gạch, được trám bằng keo chà mạch." },
    ],
  };
};
