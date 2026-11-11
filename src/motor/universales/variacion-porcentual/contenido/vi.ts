import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoVi: ContenidoUniversal = (ctx) => {
  const antes = montoEjemplo(ctx, 40);
  const despues = antes * 1.25;
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Công cụ tính phần trăm thay đổi",
    title: tituloQueEntre(
      `Công cụ tính phần trăm thay đổi cho ${ctx.nombrePais}`,
      `Phần trăm tăng giảm cho ${ctx.nombrePais}`,
      "Công cụ tính phần trăm thay đổi",
    ),
    description: "Tính một giá trị đã tăng hoặc giảm bao nhiêu phần trăm: giá cả, lương, doanh số hay bất kỳ con số nào thay đổi theo thời gian.",
    intro: [
      "Nhập giá trị cũ và giá trị mới. Bạn sẽ thấy phần trăm tăng hoặc giảm cùng mức chênh lệch.",
      "Công cụ cũng cho biết mức thay đổi cần có để quay về giá trị ban đầu, gần như không bao giờ cùng phần trăm.",
    ],
    comoSeCalcula: [
      "Phần trăm thay đổi = (giá trị mới − giá trị cũ) ÷ giá trị cũ × 100.",
      "Kết quả dương nghĩa là tăng. Kết quả âm nghĩa là giảm.",
      "Nếu giá trị cũ là số âm, số chia là giá trị tuyệt đối của nó, nên dấu vẫn cho biết giá trị có cải thiện hay không.",
    ],
    ejemplo: [
      `Một món hàng trước đây giá ${m(antes)} và nay giá ${m(despues)} đã tăng 25%.`,
      "Để quay về giá cũ, giá phải giảm 20%, không phải 25%.",
    ],
    faq: [
      {
        pregunta: "Cách tính phần trăm tăng như thế nào?",
        respuesta: "Lấy giá trị mới trừ giá trị cũ, chia cho giá trị cũ, rồi nhân với 100. Từ 80 lên 100: 20 ÷ 80 × 100 = 25%.",
      },
      {
        pregunta: "Cách tính phần trăm giảm như thế nào?",
        respuesta: "Công thức giống nhau. Từ 100 xuống 80: −20 ÷ 100 × 100 = −20%, tức là giảm 20%.",
      },
      {
        pregunta: "Vì sao tăng 25% rồi giảm 25% không quay về ban đầu?",
        respuesta: "Mỗi phần trăm được tính trên một số gốc khác nhau. 80 cộng 25% thành 100, nhưng 100 trừ 25% thành 75.",
      },
      {
        pregunta: "Phần trăm và điểm phần trăm khác nhau thế nào?",
        respuesta: "Nếu lãi suất tăng từ 10% lên 12%, mức tăng là 2 điểm phần trăm. Tính theo phần trăm thay đổi, mức tăng là 20%.",
      },
    ],
    glosario: [
      { termino: "Phần trăm thay đổi", definicion: "Mức thay đổi của một giá trị, tính theo phần trăm của giá trị ban đầu." },
      { termino: "Điểm phần trăm", definicion: "Chênh lệch trực tiếp giữa hai tỷ lệ phần trăm." },
    ],
  };
};
