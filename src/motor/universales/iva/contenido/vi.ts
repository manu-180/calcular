import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoVi: ContenidoUniversal = (ctx) => {
  const tasa = `{{${ctx.datos.tasa}}}`;
  const precio = formatearMonto(ctx, montoEjemplo(ctx, 100));
  return {
    h1: `Công cụ tính thuế GTGT ${ctx.nombrePais}`,
    title: tituloQueEntre(`Công cụ tính thuế GTGT (${tasa}) ${ctx.nombrePais}`, `Thuế GTGT ${tasa} ${ctx.nombrePais}`, `Tính thuế GTGT (${tasa})`),
    description: `Cộng hoặc tách thuế GTGT (VAT) ${tasa} khỏi bất kỳ mức giá nào chỉ trong một bước: giá chưa thuế, tiền thuế GTGT và tổng cộng.`,
    intro: [
      `Thuế suất chung được dùng ở đây cho ${ctx.nombrePais} là ${tasa}.`,
      "Chọn cộng thuế GTGT vào giá chưa thuế hoặc tách thuế khỏi giá đã có thuế, rồi nhập số tiền.",
    ],
    comoSeCalcula: [
      "Cộng thuế GTGT: thuế GTGT = giá chưa thuế × thuế suất ÷ 100. Tổng cộng = giá chưa thuế + thuế GTGT.",
      "Tách thuế GTGT: giá chưa thuế = giá đã có thuế ÷ (1 + thuế suất ÷ 100). Thuế GTGT là phần chênh lệch.",
      "Nếu hàng hóa hoặc dịch vụ áp dụng thuế suất khác, hãy nhập vào ô “Thuế suất khác”.",
    ],
    ejemplo: [
      `Để cộng thuế GTGT vào ${precio}, hãy nhân với ${tasa}, rồi cộng kết quả vào giá.`,
      `Để biết tiền thuế GTGT trong tổng ${precio}, hãy chia tổng đó cho 1 cộng thuế suất, rồi tính phần chênh lệch.`,
    ],
    faq: [
      {
        pregunta: "Cách tính giá chưa thuế GTGT như thế nào?",
        respuesta: "Chia giá cho 1 cộng thuế suất ở dạng thập phân. Kết quả là giá chưa thuế, phần chênh lệch là thuế GTGT.",
      },
      {
        pregunta: "Vì sao không thể lấy tổng trừ đi phần trăm thuế GTGT?",
        respuesta: "Vì thuế GTGT tính trên giá chưa thuế, vốn nhỏ hơn tổng cộng. Nếu lấy phần trăm trên tổng, phần trừ đi sẽ quá lớn.",
      },
      {
        pregunta: `Mọi hàng hóa và dịch vụ đều chịu thuế GTGT ${tasa} phải không?`,
        respuesta:
          "Không phải lúc nào cũng vậy. Một số mặt hàng thiết yếu, dịch vụ y tế hoặc dịch vụ nhất định có thể áp dụng thuế suất khác hoặc được miễn thuế. Khi đó, hãy dùng ô “Thuế suất khác”.",
      },
    ],
    glosario: [
      { termino: "Thuế GTGT", definicion: "Thuế giá trị gia tăng (VAT). Được cộng vào giá hàng hóa và dịch vụ, rồi do người bán nộp lại." },
      { termino: "Giá chưa thuế", definicion: "Giá hàng hóa hoặc dịch vụ trước khi cộng thuế GTGT." },
    ],
  };
};
