import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { area, FT2_POR_M2 } from "../definicion";

export const contenidoVi: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const u = imperial ? "ft" : "m";
  const us = imperial ? "ft²" : "m²";
  const enL = imperial ? area("rectangulo", 16, 12) + area("rectangulo", 10, 6) : area("rectangulo", 5, 4) + area("rectangulo", 3, 2);
  return {
    h1: imperial ? "Công cụ tính foot vuông" : "Công cụ tính mét vuông",
    title: imperial
      ? tituloQueEntre(`Công cụ tính diện tích foot vuông ${ctx.nombrePais}`, "Công cụ tính foot vuông")
      : tituloQueEntre(`Công cụ tính mét vuông và diện tích đất ${ctx.nombrePais}`, `Công cụ tính mét vuông ${ctx.nombrePais}`, "Công cụ tính mét vuông"),
    description: "Tính diện tích phòng, sàn nhà hoặc đất: hình chữ nhật, hình tam giác và hình tròn, cộng tối đa năm phần cùng lúc.",
    intro: [
      "Chọn hình dạng và nhập số đo. Nếu phòng không phải hình chữ nhật đơn giản, hãy chia thành nhiều phần và công cụ sẽ cộng lại cho bạn.",
      imperial ? "Kết quả cũng được hiển thị theo mét vuông." : "Kết quả cũng được hiển thị theo foot vuông (ft²).",
    ],
    comoSeCalcula: [
      "Hình chữ nhật: chiều dài × chiều rộng.",
      "Hình tam giác: cạnh đáy × chiều cao ÷ 2.",
      `Hình tròn: π × bán kính × bán kính, trong đó bán kính bằng một nửa đường kính. 1 m² bằng ${n(FT2_POR_M2)} ft².`,
    ],
    ejemplo: [
      imperial
        ? `Phòng khách hình chữ L có thể chia thành hai hình chữ nhật 16 × 12 ft và 10 × 6 ft. Tổng diện tích là ${n(enL, 0)} ft².`
        : `Phòng khách hình chữ L có thể chia thành hai hình chữ nhật 5 × 4 m và 3 × 2 m. Tổng diện tích là ${n(enL, 0)} m².`,
      `Bàn tròn có đường kính 2 ${u} chiếm ${n(area("circulo", 2, 0))} ${us}.`,
    ],
    faq: [
      {
        pregunta: imperial ? "Cách tính diện tích phòng theo foot vuông như thế nào?" : "Cách tính số mét vuông của một căn phòng như thế nào?",
        respuesta: imperial
          ? "Đo chiều dài và chiều rộng theo foot, rồi nhân lại. Phòng 12 × 10 ft có diện tích 120 ft²."
          : "Đo chiều dài và chiều rộng theo mét, rồi nhân lại. Phòng 4 × 3 m có diện tích 12 m².",
      },
      {
        pregunta: "Nếu số đo tính bằng centimet thì sao?",
        respuesta: `Đổi sang mét trước bằng cách chia cho 100. 350 cm bằng ${n(3.5, 1)} m. Với inch, chia cho 12 để ra foot.`,
      },
      {
        pregunta: "Cách đổi mét vuông sang foot vuông như thế nào?",
        respuesta: `Nhân với ${n(FT2_POR_M2)}. 20 m² bằng ${n(20 * FT2_POR_M2)} ft².`,
      },
    ],
    glosario: [
      { termino: "Mét vuông (m²)", definicion: "Diện tích của hình vuông có cạnh 1 mét." },
      { termino: "Foot vuông (ft²)", definicion: "Diện tích của hình vuông có cạnh 1 foot." },
    ],
  };
};
