import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "vn.tinh-luong-net-sang-gross",
  h1: "Tính lương net sang gross {{anio}}",
  title: "Tính lương net sang gross {{anio}}: biểu thuế 5 bậc",
  description: "Muốn nhận lương net bao nhiêu? Tính ngược ra lương gross với BHXH {{vn.bhxh-nld}}, giảm trừ {{vn.giam-tru-ban-than}} và thuế đến {{vn.bieu-tncn[-1].tasa}}.",
  intro: [
    "Khi deal lương, nhiều nhà tuyển dụng chỉ ghi lương gross trong hợp đồng. Công cụ này đi ngược từ số tiền bạn muốn nhận về mức gross cần thỏa thuận.",
    "Kết quả dùng giảm trừ {{vn.giam-tru-ban-than}} mỗi tháng, {{vn.giam-tru-phu-thuoc}} cho mỗi người phụ thuộc và giả định công ty đóng bảo hiểm trên toàn bộ lương gross.",
  ],
  comoSeCalcula: [
    "Công cụ thử các mức gross cho đến khi lương net sau bảo hiểm và thuế đúng bằng số bạn nhập.",
    "Mỗi lần thử đều trừ {{vn.bhxh-nld}} BHXH, {{vn.bhyt-nld}} BHYT và {{vn.bhtn-nld}} BHTN, có tính trần {{vn.he-so-tran-bhxh}} lần mức tham chiếu {{vn.muc-tham-chieu}} và {{vn.he-so-tran-bhtn}} lần lương tối thiểu vùng.",
    "Thuế tính theo biểu lũy tiến 5 bậc từ {{vn.bieu-tncn[0].tasa}} đến {{vn.bieu-tncn[-1].tasa}}.",
    "Vì thuế tăng theo bậc, phần chênh lệch giữa gross và net lớn dần khi lương cao hơn.",
  ],
  ejemplo: [
    "Muốn nhận 26.215.000 ₫ ở vùng I, không có người phụ thuộc, bạn cần lương gross 30.000.000 ₫. Trong đó 3.150.000 ₫ là bảo hiểm và 635.000 ₫ là thuế TNCN.",
  ],
  faq: [
    {
      pregunta: "Vì sao có người phụ thuộc thì gross cần thấp hơn?",
      respuesta: "Mỗi người phụ thuộc đã đăng ký giảm thêm {{vn.giam-tru-phu-thuoc}} thu nhập tính thuế mỗi tháng theo Điều 10 Luật số 109/2025/QH15, nên thuế thấp hơn với cùng mức net.",
    },
    {
      pregunta: "Vùng làm việc ảnh hưởng thế nào?",
      respuesta: "Vùng chỉ ảnh hưởng đến trần đóng BHTN, bằng {{vn.he-so-tran-bhtn}} lần lương tối thiểu tháng theo khoản 2 Điều 34 Luật Việc làm. Lương thấp hơn trần thì các vùng cho kết quả như nhau.",
    },
    {
      pregunta: "Công cụ có tính phụ cấp miễn thuế không?",
      respuesta: "Không. Khoản nào được miễn thuế phải xét theo Luật số 109/2025/QH15 và văn bản hướng dẫn. Nếu có các khoản đó, số thuế thực tế sẽ thấp hơn.",
    },
  ],
  glosario: [
    { termino: "Deal lương net", definicion: "Thỏa thuận theo số tiền thực nhận. Hợp đồng và kê khai thuế vẫn cần ghi mức gross tương ứng." },
    { termino: "Người phụ thuộc", definicion: "Người được đăng ký để giảm trừ gia cảnh, như con nhỏ hoặc cha mẹ đủ điều kiện." },
  ],
});
