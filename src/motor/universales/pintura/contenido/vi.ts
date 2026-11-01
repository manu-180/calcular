import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { MARGEN } from "../definicion";

export const contenidoVi: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const neta = 48 * 8 - 40;
        const gal = (neta * 2) / 350;
        return [
          `Phòng có tường dài 48 ft, cao 8 ft, cửa đi và cửa sổ chiếm 40 ft² thì có ${n(neta, 0)} ft² cần sơn.`,
          `Với 2 lớp và loại sơn có độ phủ 350 ft² mỗi gallon, bạn cần ${n(gal, 2)} gallon. Tính cả dự phòng là ${n(gal * (1 + MARGEN), 2)} gallon.`,
        ];
      })()
    : (() => {
        const neta = 14 * 2.6 - 4;
        const litros = (neta * 2) / 10;
        return [
          `Phòng có tường dài 14 m, cao ${n(2.6)} m, cửa đi và cửa sổ chiếm 4 m² thì có ${n(neta)} m² cần sơn.`,
          `Với 2 lớp và loại sơn có độ phủ 10 m² mỗi lít, bạn cần ${n(litros, 2)} lít. Tính cả dự phòng là ${n(litros * (1 + MARGEN), 2)} lít.`,
        ];
      })();
  return {
    h1: "Công cụ tính lượng sơn",
    title: tituloQueEntre(`Công cụ tính lượng sơn tường ${ctx.nombrePais}`, `Công cụ tính lượng sơn ${ctx.nombrePais}`, "Công cụ tính lượng sơn"),
    description: "Tính lượng sơn tường cần dùng theo kích thước tường, cửa đi và cửa sổ, số lớp sơn và độ phủ ghi trên thùng sơn.",
    intro: [
      "Nhập chiều dài và chiều cao tường (hoặc nhập thẳng diện tích), diện tích cửa đi và cửa sổ, cùng số lớp sơn bạn định dùng.",
      "Kết quả đã cộng thêm 10% dự phòng để không bị hết sơn giữa chừng.",
    ],
    comoSeCalcula: [
      "Diện tích = tổng chiều dài tường × chiều cao, trừ cửa đi và cửa sổ.",
      "Lượng sơn = diện tích × số lớp ÷ độ phủ.",
      `Sau đó cộng thêm ${MARGEN * 100}% dự phòng.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Một lít sơn tường sơn được bao nhiêu mét vuông?",
        respuesta: "Sơn tường nội thất thường phủ khoảng 8 đến 12 m² mỗi lít cho một lớp. Con số chính xác được ghi trên thùng sơn.",
      },
      {
        pregunta: "Cần sơn bao nhiêu lớp?",
        respuesta: "Hai lớp là tiêu chuẩn. Tường mới trát, tường hút sơn mạnh hoặc khi đổi sang màu rất khác có thể cần lớp thứ ba.",
      },
      {
        pregunta: "Có cần trừ cửa đi và cửa sổ không?",
        respuesta: "Có, nếu chúng lớn. Không nên trừ cửa nhỏ, vì phần sơn đó sẽ dùng cho mép và góc tường.",
      },
    ],
    glosario: [
      { termino: "Độ phủ", definicion: "Diện tích mà một lít hoặc một gallon sơn phủ được với một lớp." },
      { termino: "Lớp sơn", definicion: "Mỗi lần sơn phủ lên tường." },
    ],
  };
};
