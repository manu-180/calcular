import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DISTANCIAS_KM, KM_POR_MILLA, reloj, ritmoTexto } from "../definicion";

export const contenidoVi: ContenidoUniversal = (ctx) => {
  const imperial = ctx.unidades === "imperial";
  const u = imperial ? "dặm" : "km";
  const corto = imperial ? "mi" : "km";
  const media = imperial ? DISTANCIAS_KM.media / KM_POR_MILLA : DISTANCIAS_KM.media;
  const ritmoMedia = imperial ? 9 * 60 : 5 * 60 + 30;
  return {
    h1: "Công cụ tính pace chạy bộ",
    title: tituloQueEntre(`Công cụ tính pace chạy bộ 5K, 10K và marathon ${ctx.nombrePais}`, `Công cụ tính pace chạy bộ ${ctx.nombrePais}`, "Công cụ tính pace chạy bộ"),
    description: `Tính pace chạy bộ mỗi ${u}, thời gian hoàn thành hoặc quãng đường cho các cự ly 5K, 10K, bán marathon và marathon.`,
    intro: [
      "Chỉ cần hai trong ba con số (quãng đường, thời gian và pace), bạn sẽ có con số còn lại. Dùng để lên kế hoạch thi đấu hoặc kiểm tra buổi tập.",
      "Các cự ly 5K, 10K, bán marathon và marathon đã có sẵn.",
    ],
    comoSeCalcula: [
      `Pace = thời gian ÷ quãng đường, tính bằng phút và giây mỗi ${u}.`,
      "Thời gian = pace × quãng đường.",
      "Quãng đường = thời gian ÷ pace. Tốc độ trung bình là quãng đường chia cho số giờ.",
    ],
    ejemplo: imperial
      ? [
          `3 dặm trong 27 phút tức là pace 9:00 mỗi dặm, với tốc độ ${formatearNumero(ctx, 20 / 3, 2)} mph.`,
          `Bán marathon (${formatearNumero(ctx, media, 2)} mi) với pace ${ritmoTexto(ritmoMedia)} mỗi dặm sẽ hoàn thành trong ${reloj(ritmoMedia * media)}.`,
        ]
      : [
          `10 km trong 50 phút tức là pace 5:00 mỗi km, với tốc độ ${formatearNumero(ctx, 12, 0)} km/giờ.`,
          `Bán marathon (${formatearNumero(ctx, media, 1)} ${corto}) với pace ${ritmoTexto(ritmoMedia)} mỗi km sẽ hoàn thành trong ${reloj(ritmoMedia * media)}.`,
        ],
    faq: [
      {
        pregunta: `Cách tính pace chạy bộ mỗi ${u} như thế nào?`,
        respuesta: imperial
          ? `Đổi thời gian ra phút, rồi chia cho số dặm. 3 dặm trong 28 phút 30 giây tức là ${formatearNumero(ctx, 9.5, 1)} phút mỗi dặm, hay 9:30.`
          : `Đổi thời gian ra phút, rồi chia cho số kilômét. 10 km trong 55 phút tức là ${formatearNumero(ctx, 5.5, 1)} phút mỗi km, hay 5:30.`,
      },
      {
        pregunta: "Pace bao nhiêu là tốt cho người mới chạy?",
        respuesta: "Là pace mà bạn vẫn có thể vừa chạy vừa nói chuyện. Pace sẽ nhanh dần khi thể lực của bạn tốt hơn.",
      },
      {
        pregunta: "Marathon dài bao nhiêu?",
        respuesta: `${formatearNumero(ctx, DISTANCIAS_KM.maraton, 3)} km (${formatearNumero(ctx, DISTANCIAS_KM.maraton / KM_POR_MILLA, 1)} dặm). Bán marathon bằng một nửa cự ly đó.`,
      },
    ],
    glosario: [
      { termino: "Pace", definicion: "Thời gian cần để chạy hết một kilômét hoặc một dặm." },
      { termino: "Tốc độ trung bình", definicion: "Quãng đường đi được trong một giờ." },
    ],
  };
};
