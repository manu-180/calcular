import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { MEZCLA } from "../definicion";

export const contenidoVi: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const ft3 = 10 * 10 * (4 / 12);
        return [
          `Sàn 10 × 10 ft dày 4 in cần ${n(ft3)} ft³ bê tông, tức ${n(ft3 / 27)} yard khối.`,
          `Với cấp phối tham khảo, lượng xi măng khoảng ${n((MEZCLA.cementoKg * ft3 * 0.0283168466) / 0.45359237, 0)} lb.`,
        ];
      })()
    : (() => {
        const volumen = 4 * 3 * 0.1;
        return [
          `Sàn 4 × 3 m dày 10 cm cần ${n(volumen, 1)} m³ bê tông.`,
          `Với cấp phối tham khảo, bạn cần khoảng ${n(MEZCLA.cementoKg * volumen, 0)} kg xi măng, ${n(MEZCLA.arenaM3 * volumen)} m³ cát và ${n(MEZCLA.piedraM3 * volumen)} m³ đá.`,
        ];
      })();
  return {
    h1: "Công cụ tính bê tông",
    title: tituloQueEntre(`Công cụ tính bê tông và xi măng ${ctx.nombrePais}`, `Công cụ tính bê tông ${ctx.nombrePais}`, "Công cụ tính bê tông"),
    description: `Tính thể tích bê tông để đổ sàn hoặc mái theo ${imperial ? "yard khối" : "mét khối"}, kèm lượng xi măng, cát và đá ước tính cần mua.`,
    intro: [
      "Nhập chiều dài, chiều rộng và độ dày. Bạn sẽ thấy thể tích bê tông và lượng vật liệu ước tính cho mẻ trộn.",
      "Lượng vật liệu phụ thuộc vào cấp phối. Công cụ này dùng cấp phối phổ biến 1:2:3 để tham khảo.",
    ],
    comoSeCalcula: [
      imperial ? "Thể tích = chiều dài × chiều rộng × độ dày, với độ dày tính bằng foot. Chia số foot khối cho 27 để ra yard khối." : "Thể tích = chiều dài × chiều rộng × độ dày, với độ dày tính bằng mét.",
      "Sau đó cộng thêm phần dự phòng cho bề mặt không bằng phẳng và vữa rơi vãi.",
      `Mỗi m³: khoảng ${MEZCLA.cementoKg} kg xi măng, ${n(MEZCLA.arenaM3)} m³ cát, ${n(MEZCLA.piedraM3, 1)} m³ đá và ${MEZCLA.aguaL} lít nước.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "1 khối bê tông cần bao nhiêu bao xi măng?",
        respuesta: `Với cấp phối 1:2:3, cần khoảng ${MEZCLA.cementoKg} kg xi măng mỗi m³, tức ${n(MEZCLA.cementoKg / 50, 0)} bao loại 50 kg. Bê tông mác cao hơn cần nhiều xi măng hơn.`,
      },
      {
        pregunta: "Cách tính khối lượng bê tông như thế nào?",
        respuesta: `Nhân chiều dài, chiều rộng và độ dày theo mét. Sàn 5 × 4 m dày 12 cm là 5 × 4 × ${n(0.12)} = ${n(5 * 4 * 0.12, 1)} m³.`,
      },
      {
        pregunta: "Nên dùng bê tông tươi hay tự trộn?",
        respuesta: "Với khối lượng đổ lớn, bê tông tươi thường đồng đều và nhanh hơn. Với việc nhỏ, tự trộn theo định mức này vẫn rất phổ biến.",
      },
    ],
    glosario: [
      { termino: "Cấp phối bê tông", definicion: "Tỷ lệ xi măng, cát, đá và nước trong một mẻ trộn." },
      { termino: "Khối (m³)", definicion: "Thể tích của hình lập phương có cạnh 1 mét. Bê tông tươi thường được bán theo khối." },
    ],
  };
};
