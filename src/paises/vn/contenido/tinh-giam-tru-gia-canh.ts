import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "vn.tinh-giam-tru-gia-canh",
  h1: "Tính giảm trừ gia cảnh {{anio}}",
  title: "Giảm trừ gia cảnh {{anio}}: {{vn.giam-tru-ban-than}} và {{vn.giam-tru-phu-thuoc}}",
  description: "Mức giảm trừ gia cảnh là {{vn.giam-tru-ban-than}} cho bản thân và {{vn.giam-tru-phu-thuoc}} cho mỗi người phụ thuộc. Xem lương gross bao nhiêu chưa phải nộp thuế.",
  intro: [
    "Mức giảm trừ là {{vn.giam-tru-ban-than}} mỗi tháng cho người nộp thuế và {{vn.giam-tru-phu-thuoc}} mỗi tháng cho mỗi người phụ thuộc, áp dụng từ kỳ tính thuế 2026.",
    "Công cụ cộng tổng giảm trừ trong kỳ và cho biết mức lương gross mà bạn chưa phải nộp thuế TNCN.",
  ],
  comoSeCalcula: [
    "Giảm trừ mỗi tháng bằng {{vn.giam-tru-ban-than}} cộng {{vn.giam-tru-phu-thuoc}} nhân số người phụ thuộc.",
    "Tổng giảm trừ trong kỳ bằng số đó nhân số tháng.",
    "Lương gross chưa phải nộp thuế là mức mà sau khi trừ {{vn.bhxh-nld}} BHXH, {{vn.bhyt-nld}} BHYT và {{vn.bhtn-nld}} BHTN thì phần còn lại đúng bằng mức giảm trừ.",
  ],
  ejemplo: [
    "Có một người phụ thuộc, tính cả năm. Giảm trừ mỗi tháng là 21.700.000 ₫, cả năm là 260.400.000 ₫. Nếu đóng bảo hiểm trên toàn bộ lương, lương gross đến khoảng 24.245.810 ₫ mỗi tháng thì chưa phải nộp thuế.",
  ],
  faq: [
    {
      pregunta: "Văn bản nào quy định mức giảm trừ này?",
      respuesta: "Điều 1 Nghị quyết số 110/2025/UBTVQH15 và Điều 10 Luật Thuế thu nhập cá nhân số 109/2025/QH15. Nghị quyết áp dụng từ kỳ tính thuế năm 2026 và thay thế Nghị quyết số 954/2020/UBTVQH14.",
    },
    {
      pregunta: "Mức giảm trừ có thể thay đổi nữa không?",
      respuesta: "Có. Khoản 2 Điều 10 Luật số 109/2025/QH15 quy định Chính phủ trình Ủy ban Thường vụ Quốc hội điều chỉnh mức này căn cứ biến động giá cả, thu nhập.",
    },
    {
      pregunta: "Giảm trừ gia cảnh áp dụng cho những thu nhập nào?",
      respuesta: "Khoản 1 Điều 10 quy định số tiền này được trừ vào thu nhập chịu thuế từ tiền lương, tiền công của người nộp thuế là cá nhân cư trú, trước khi tính thuế.",
    },
  ],
  glosario: [
    { termino: "Giảm trừ gia cảnh", definicion: "Số tiền được trừ vào thu nhập từ lương trước khi tính thuế TNCN." },
    { termino: "Người phụ thuộc", definicion: "Người mà người nộp thuế đăng ký để được giảm trừ thêm mỗi tháng." },
  ],
});
