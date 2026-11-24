import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoVi: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const precio = montoEjemplo(ctx, 3.5);
        const galones = 300 / 30;
        return [
          `Chuyến đi 150 dặm mỗi chiều, cả đi và về, với xe tiêu thụ 30 mpg cần ${formatearNumero(ctx, galones)} gallon.`,
          `Với giá ${m(precio)} mỗi gallon, chi phí là ${m(galones * precio)}. Nếu hai người chia nhau, mỗi người trả ${m((galones * precio) / 2)}.`,
        ];
      })()
    : (() => {
        const precio = montoEjemplo(ctx, 1.2);
        const litros = (600 * 8) / 100;
        return [
          `Chuyến đi 300 km mỗi chiều, cả đi và về, với xe tiêu thụ 8 lít trên 100 km (${formatearNumero(ctx, 100 / 8, 1)} km/l) cần ${formatearNumero(ctx, litros)} lít.`,
          `Với giá ${m(precio)} mỗi lít, chi phí là ${m(litros * precio)}. Nếu hai người chia nhau, mỗi người trả ${m((litros * precio) / 2)}.`,
        ];
      })();
  return {
    h1: "Công cụ tính chi phí xăng",
    title: tituloQueEntre(`Công cụ tính chi phí xăng chuyến đi ${ctx.nombrePais}`, `Tính chi phí xăng ${ctx.nombrePais}`, "Công cụ tính chi phí xăng"),
    description: "Tính chi phí xăng cho chuyến đi từ quãng đường, mức tiêu thụ nhiên liệu của xe và giá xăng, rồi chia chi phí theo từng người.",
    intro: [
      `Nhập quãng đường, mức tiêu thụ nhiên liệu của xe và giá mỗi ${imperial ? "gallon" : "lít"}. Bạn sẽ thấy lượng xăng cần dùng và chi phí của chuyến đi.`,
      imperial ? "Mức tiêu thụ nhiên liệu nhập theo dặm trên gallon." : "Mức tiêu thụ nhiên liệu có thể nhập theo lít trên 100 km hoặc kilômét trên lít (km/l).",
    ],
    comoSeCalcula: imperial
      ? ["Số gallon = quãng đường ÷ số dặm trên gallon.", "Chi phí = số gallon × giá mỗi gallon. Nếu đi cả đi và về, quãng đường nhân đôi."]
      : [
          "Theo lít trên 100 km: số lít = quãng đường × mức tiêu thụ ÷ 100.",
          "Theo kilômét trên lít: số lít = quãng đường ÷ mức tiêu thụ.",
          "Chi phí = số lít × giá mỗi lít. Nếu đi cả đi và về, quãng đường nhân đôi.",
        ],
    ejemplo,
    faq: [
      {
        pregunta: "Làm sao đổi km/l sang lít trên 100 km?",
        respuesta: `Lấy 100 chia cho số km/l. Xe chạy được 12 km mỗi lít tiêu thụ khoảng ${formatearNumero(ctx, 100 / 12, 1)} lít trên 100 km.`,
      },
      {
        pregunta: "Đã gồm phí cầu đường chưa?",
        respuesta: "Chưa. Công cụ này chỉ tính xăng. Hãy cộng riêng phí cầu đường và phí gửi xe.",
      },
      {
        pregunta: "Vì sao xe tốn xăng hơn trong thành phố?",
        respuesta: "Dừng và chạy liên tục cần nhiều năng lượng hơn so với chạy đều trên đường cao tốc, nên mức tiêu thụ trong thành phố thường cao hơn.",
      },
    ],
    glosario: [
      { termino: "Mức tiêu thụ nhiên liệu", definicion: "Quãng đường xe đi được với một lượng nhiên liệu nhất định." },
      { termino: "km/l", definicion: "Kilômét trên lít. Con số càng cao, xe càng tiết kiệm." },
    ],
  };
};
