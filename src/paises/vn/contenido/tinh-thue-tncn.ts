import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "vn.tinh-thue-tncn",
  h1: "Tính thuế TNCN từ tiền lương {{anio}}",
  title: "Tính thuế TNCN {{anio}}: biểu 5 bậc từ {{vn.bieu-tncn[0].tasa}} đến {{vn.bieu-tncn[-1].tasa}}",
  description: "Tính thuế thu nhập cá nhân theo tháng hoặc quyết toán năm với giảm trừ {{vn.giam-tru-ban-than}} và biểu thuế lũy tiến 5 bậc mới.",
  intro: [
    "Biểu thuế tiền lương có 5 bậc: {{vn.bieu-tncn[0].tasa}}, {{vn.bieu-tncn[1].tasa}}, {{vn.bieu-tncn[2].tasa}}, {{vn.bieu-tncn[3].tasa}} và {{vn.bieu-tncn[4].tasa}}. Bạn chỉ nộp thuế trên phần thu nhập còn lại sau bảo hiểm và giảm trừ gia cảnh.",
    "Chọn tính theo tháng để xem số tạm khấu trừ, hoặc theo năm để ước tính khi quyết toán.",
  ],
  comoSeCalcula: [
    "Lấy tổng thu nhập chịu thuế, trừ bảo hiểm bắt buộc, rồi trừ {{vn.giam-tru-ban-than}} cho bản thân và {{vn.giam-tru-phu-thuoc}} cho mỗi người phụ thuộc mỗi tháng.",
    "Phần còn lại áp theo từng bậc: đến {{vn.bieu-tncn[0].hasta}} chịu {{vn.bieu-tncn[0].tasa}}; trên {{vn.bieu-tncn[1].desde}} đến {{vn.bieu-tncn[1].hasta}} chịu {{vn.bieu-tncn[1].tasa}}; trên {{vn.bieu-tncn[2].desde}} đến {{vn.bieu-tncn[2].hasta}} chịu {{vn.bieu-tncn[2].tasa}}.",
    "Trên {{vn.bieu-tncn[3].desde}} đến {{vn.bieu-tncn[3].hasta}} chịu {{vn.bieu-tncn[3].tasa}}; phần trên {{vn.bieu-tncn[4].desde}} chịu {{vn.bieu-tncn[4].tasa}}.",
    "Khi tính theo năm, công cụ dùng bảng năm của cùng Điều 9, bằng bảng tháng nhân 12.",
  ],
  ejemplo: [
    "Thu nhập 30.000.000 ₫, bảo hiểm 3.150.000 ₫, không có người phụ thuộc. Thu nhập tính thuế là 11.350.000 ₫. Thuế gồm 500.000 ₫ ở bậc 1 và 135.000 ₫ ở bậc 2, tổng cộng 635.000 ₫.",
  ],
  faq: [
    {
      pregunta: "Biểu thuế 5 bậc thay thế biểu 7 bậc từ khi nào?",
      respuesta: "Từ kỳ tính thuế năm 2026 đối với tiền lương của cá nhân cư trú, theo khoản 2 Điều 29 Luật số 109/2025/QH15. Thu nhập năm 2025 vẫn quyết toán theo quy định cũ.",
    },
    {
      pregunta: "Bảo hiểm nào được trừ trước khi tính thuế?",
      respuesta: "Khoản 2 Điều 8 Luật số 109/2025/QH15 cho trừ BHXH, BHYT, BHTN, bảo hiểm trách nhiệm nghề nghiệp bắt buộc với một số ngành và một số khoản hưu trí, nhân thọ trong mức Chính phủ quy định.",
    },
    {
      pregunta: "Người không cư trú có dùng biểu này không?",
      respuesta: "Không. Biểu lũy tiến chỉ áp dụng cho cá nhân cư trú. Luật số 109/2025/QH15 quy định thuế suất riêng cho thu nhập của cá nhân không cư trú.",
    },
  ],
  glosario: [
    { termino: "Thu nhập tính thuế", definicion: "Phần còn lại sau khi lấy thu nhập chịu thuế trừ bảo hiểm và giảm trừ gia cảnh." },
    { termino: "Lũy tiến từng phần", definicion: "Mỗi phần thu nhập chịu thuế suất của bậc chứa nó, không phải toàn bộ thu nhập chịu một mức." },
  ],
});
