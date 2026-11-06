import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoVi: ContenidoUniversal = (ctx) => {
  const precio = montoEjemplo(ctx, 50);
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Công cụ tính phần trăm",
    title: tituloQueEntre(`Công cụ tính phần trăm cho ${ctx.nombrePais}`, "Công cụ tính phần trăm online", "Công cụ tính phần trăm"),
    description: "Tính phần trăm của một số, một số bằng bao nhiêu phần trăm số khác, và kết quả sau khi tăng hoặc giảm theo phần trăm.",
    intro: [
      "Chọn điều bạn muốn biết, nhập hai số và kết quả hiện ra ngay.",
      "Công cụ này gồm bốn phép tính phần trăm thường gặp: phần giá trị, tỷ lệ, tăng và giảm.",
    ],
    comoSeCalcula: [
      "X% của Y = X × Y ÷ 100.",
      "X tính theo phần trăm của Y = X ÷ Y × 100.",
      "Y cộng thêm X% = Y × (1 + X ÷ 100). Y trừ đi X% = Y × (1 − X ÷ 100).",
    ],
    ejemplo: ["15% của 200 là 30.", "30 bằng 25% của 120.", `Giá ${m(precio)} tăng 10% thành ${m(precio * 1.1)}.`],
    faq: [
      {
        pregunta: "Cách tính phần trăm của một số như thế nào?",
        respuesta: "Nhân số đó với tỷ lệ phần trăm, rồi chia cho 100. 20% của 350 là 350 × 20 ÷ 100 = 70.",
      },
      {
        pregunta: "Làm sao biết một số bằng bao nhiêu phần trăm số khác?",
        respuesta: "Chia phần giá trị cho tổng, rồi nhân với 100. Nếu đúng 45 trên 60 câu, kết quả là 45 ÷ 60 × 100 = 75%.",
      },
      {
        pregunta: "Cách cộng thêm phần trăm vào giá như thế nào?",
        respuesta: `Nhân giá với 1 cộng tỷ lệ phần trăm ở dạng thập phân. Để cộng thêm 10%, nhân với ${formatearNumero(ctx, 1.1, 2)}.`,
      },
      {
        pregunta: "Tăng 10% rồi giảm 10% có về lại số ban đầu không?",
        respuesta: "Không. 100 cộng thêm 10% thành 110, và 110 trừ đi 10% thành 99. Phần giảm được tính trên số lớn hơn.",
      },
    ],
    glosario: [
      { termino: "Phần trăm", definicion: "Số lượng được viết dưới dạng một phần của 100." },
      { termino: "Số gốc", definicion: "Số làm mốc để tính phần trăm (Y trong công cụ này)." },
    ],
  };
};
