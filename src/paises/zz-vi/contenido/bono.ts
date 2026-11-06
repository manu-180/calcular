import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "zz-vi.bono",
  h1: "Công cụ tính thưởng nửa năm của Zetaland",
  title: "Thưởng nửa năm tại Zetaland: tính số tiền bạn nhận",
  description: "Tính thưởng nửa năm theo lương tối thiểu của vùng và phụ cấp {{zz.bonificacion}}. Dữ liệu chính thức có ghi ngày và nguồn.",
  intro: [
    "Thưởng nửa năm là khoản thêm một tháng lương, trả hai lần mỗi năm.",
    "Nếu làm đủ nửa năm, bạn nhận một tháng lương cộng với {{zz.bonificacion}}.",
  ],
  comoSeCalcula: [
    "Phép tính bắt đầu từ lương gross hằng tháng. Nếu thấp hơn lương tối thiểu của vùng, sẽ dùng lương tối thiểu.",
    "Lương đó nhân với số tháng làm việc rồi chia cho 6.",
    "Ở công ty nhỏ, tiền thưởng bằng một nửa.",
    "Tiền thưởng được cộng thêm {{zz.bonificacion}}.",
  ],
  faq: [
    { pregunta: "Lương tối thiểu ở Vùng Bắc là bao nhiêu?", respuesta: "{{zz.minimo@norte}}, áp dụng từ {{zz.minimo@norte#desde}}." },
    { pregunta: "Nếu tôi không làm đủ nửa năm thì sao?", respuesta: "Bạn nhận phần tương ứng với số tháng đã làm." },
    { pregunta: "Phụ cấp có luôn được trả không?", respuesta: "Có. Phụ cấp bằng {{zz.bonificacion}} tiền thưởng và công ty trả cùng lúc với tiền thưởng." },
  ],
  glosario: [
    { termino: "Thưởng nửa năm", definicion: "Khoản lương thêm mà luật yêu cầu trả vào tháng 7 và tháng 12." },
    { termino: "Lương tối thiểu", definicion: "Mức lương thấp nhất được phép trả cho một ngày làm đủ giờ ở mỗi vùng." },
  ],
});
