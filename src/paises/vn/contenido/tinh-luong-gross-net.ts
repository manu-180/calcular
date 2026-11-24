import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "vn.tinh-luong-gross-net",
  h1: "Tính lương gross sang net {{anio}}",
  title: "Tính lương gross sang net {{anio}}: biểu thuế 5 bậc mới",
  description: "Đổi lương gross sang net với BHXH, BHYT, BHTN, giảm trừ {{vn.giam-tru-ban-than}} và biểu thuế 5 bậc. Nhập lương để biết số tiền thực nhận.",
  intro: [
    "Từ kỳ tính thuế 2026, bạn được giảm trừ {{vn.giam-tru-ban-than}} mỗi tháng cho bản thân và {{vn.giam-tru-phu-thuoc}} cho mỗi người phụ thuộc. Biểu thuế chỉ còn 5 bậc, từ {{vn.bieu-tncn[0].tasa}} đến {{vn.bieu-tncn[-1].tasa}}.",
    "Nhập lương gross, số người phụ thuộc và vùng của nơi làm việc. Công cụ trừ bảo hiểm bắt buộc, trừ giảm trừ gia cảnh rồi tính thuế, để bạn thấy số tiền về tài khoản.",
  ],
  comoSeCalcula: [
    "Bạn đóng {{vn.bhxh-nld}} bảo hiểm xã hội, {{vn.bhyt-nld}} bảo hiểm y tế và {{vn.bhtn-nld}} bảo hiểm thất nghiệp trên lương đóng bảo hiểm.",
    "BHXH và BHYT chỉ tính đến {{vn.he-so-tran-bhxh}} lần mức tham chiếu {{vn.muc-tham-chieu}} (áp dụng từ {{vn.muc-tham-chieu#desde}}). BHTN chỉ tính đến {{vn.he-so-tran-bhtn}} lần lương tối thiểu tháng của vùng.",
    "Thu nhập tính thuế bằng gross trừ bảo hiểm, trừ {{vn.giam-tru-ban-than}} và {{vn.giam-tru-phu-thuoc}} cho mỗi người phụ thuộc.",
    "Thuế tính lũy tiến từng phần theo Điều 9 Luật Thuế thu nhập cá nhân số 109/2025/QH15: đến {{vn.bieu-tncn[0].hasta}} chịu {{vn.bieu-tncn[0].tasa}}, phần trên {{vn.bieu-tncn[-1].desde}} chịu {{vn.bieu-tncn[-1].tasa}}.",
  ],
  ejemplo: [
    "Lương gross 30.000.000 ₫ ở vùng I, không có người phụ thuộc. Bảo hiểm bị trừ là 3.150.000 ₫. Thu nhập tính thuế là 11.350.000 ₫, nên thuế là 635.000 ₫ (500.000 ₫ ở bậc 1 và 135.000 ₫ ở bậc 2). Lương net là 26.215.000 ₫.",
  ],
  faq: [
    {
      pregunta: "Mức giảm trừ gia cảnh mới áp dụng từ khi nào?",
      respuesta: "Từ kỳ tính thuế năm 2026 theo Nghị quyết số 110/2025/UBTVQH15, và được đưa vào Điều 10 Luật số 109/2025/QH15. Vì vậy cả năm 2026 đều dùng mức {{vn.giam-tru-ban-than}}.",
    },
    {
      pregunta: "Biểu thuế 5 bậc có áp dụng cho lương cả năm 2026 không?",
      respuesta: "Có. Luật số 109/2025/QH15 có hiệu lực từ 1/7/2026, nhưng khoản 2 Điều 29 quy định phần thu nhập từ tiền lương, tiền công của cá nhân cư trú áp dụng từ kỳ tính thuế năm 2026.",
    },
    {
      pregunta: "Vì sao lương cao không bị trừ thêm BHXH?",
      respuesta: "Vì Điều 31 Luật Bảo hiểm xã hội giới hạn tiền lương đóng ở {{vn.he-so-tran-bhxh}} lần mức tham chiếu. Với mức tham chiếu {{vn.muc-tham-chieu}}, phần lương vượt trần không phải đóng BHXH và BHYT.",
    },
    {
      pregunta: "Công ty đóng bảo hiểm trên lương thấp hơn gross thì sao?",
      respuesta: "Hãy nhập mức đó vào ô lương đóng bảo hiểm. Khoản 1 Điều 31 yêu cầu đóng trên lương theo công việc, phụ cấp lương và các khoản bổ sung trả thường xuyên, nên bạn nên đối chiếu với hợp đồng.",
    },
  ],
  glosario: [
    { termino: "Lương gross", definicion: "Tổng lương ghi trong hợp đồng, trước khi trừ bảo hiểm và thuế." },
    { termino: "Lương net", definicion: "Số tiền bạn thực nhận sau khi đã trừ bảo hiểm bắt buộc và thuế TNCN." },
    { termino: "Mức tham chiếu", definicion: "Mức tiền Chính phủ quyết định để tính mức đóng, mức hưởng BHXH. Khi chưa bãi bỏ lương cơ sở thì bằng lương cơ sở." },
  ],
});
