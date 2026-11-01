import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "vn.tinh-thue-ho-kinh-doanh",
  h1: "Tính thuế hộ kinh doanh {{anio}}",
  title: "Tính thuế hộ kinh doanh {{anio}}: ngưỡng {{vn.hkd-nguong}}",
  description: "Doanh thu từ {{vn.hkd-nguong}} trở xuống không nộp GTGT và TNCN. Nhập doanh thu năm và ngành nghề để tính thuế, có giảm {{vn.hkd-giam-tncn}} TNCN.",
  intro: [
    "Hộ kinh doanh có doanh thu năm từ {{vn.hkd-nguong}} trở xuống không phải nộp GTGT và TNCN, theo Nghị định số 141/2026/NĐ-CP áp dụng từ {{vn.hkd-nguong#desde}}. Thuế khoán đã được thay bằng kê khai theo doanh thu thực tế.",
    "Doanh thu năm không quá {{vn.hkd-tran-giam}} còn được giảm {{vn.hkd-giam-tncn}} số thuế TNCN phải nộp của năm 2026 và năm 2027, theo Nghị quyết số 43/2026/QH16.",
  ],
  comoSeCalcula: [
    "GTGT bằng toàn bộ doanh thu nhân tỷ lệ: {{vn.hkd-gtgt[hang-hoa]}} với hàng hóa, {{vn.hkd-gtgt[dich-vu]}} với dịch vụ, {{vn.hkd-gtgt[san-xuat]}} với sản xuất, vận tải, {{vn.hkd-gtgt[khac]}} với hoạt động khác.",
    "Doanh thu đến {{vn.hkd-nguong-3-ty}} có thể tính TNCN trên phần vượt ngưỡng: {{vn.hkd-tncn[hang-hoa]}} hàng hóa, {{vn.hkd-tncn[dich-vu]}} dịch vụ, {{vn.hkd-tncn[san-xuat]}} sản xuất, vận tải, {{vn.hkd-tncn[noi-dung-so]}} nội dung số và cho thuê tài sản, {{vn.hkd-tncn[khac]}} hoạt động khác.",
    "Hoặc tính trên thu nhập (doanh thu trừ chi phí): {{vn.hkd-ts-15}} khi doanh thu đến {{vn.hkd-nguong-3-ty}}, {{vn.hkd-ts-17}} khi đến {{vn.hkd-nguong-50-ty}}, {{vn.hkd-ts-20}} khi cao hơn.",
    "Doanh thu trên {{vn.hkd-nguong-3-ty}} bắt buộc tính trên thu nhập. Cho thuê bất động sản tính riêng, hãy dùng công cụ tính thuế cho thuê nhà.",
  ],
  ejemplo: [
    "Tiệm dịch vụ có doanh thu 2.000.000.000 ₫ trong năm. GTGT là 100.000.000 ₫. TNCN tính trên 1.000.000.000 ₫ vượt ngưỡng là 20.000.000 ₫, được giảm 6.000.000 ₫ nên còn 14.000.000 ₫. Tổng thuế là 114.000.000 ₫.",
  ],
  faq: [
    {
      pregunta: "Ngưỡng doanh thu là 500 triệu hay 1 tỷ đồng?",
      respuesta: "Luật số 109/2025/QH15 ban đầu ghi 500 triệu đồng. Luật số 09/2026/QH16 giao Chính phủ quy định mức này, và Nghị định số 141/2026/NĐ-CP đổi thành 01 tỷ đồng, có hiệu lực từ ngày 1/1/2026.",
    },
    {
      pregunta: "Doanh thu dưới ngưỡng có cần làm gì không?",
      respuesta: "Có. Điểm a khoản 1 Điều 8 Nghị định số 68/2026/NĐ-CP yêu cầu thông báo doanh thu thực tế phát sinh trong năm với cơ quan thuế chậm nhất ngày 31 tháng 1 năm sau.",
    },
    {
      pregunta: "Khoản giảm 30% có áp dụng khi doanh thu vượt 10 tỷ đồng không?",
      respuesta: "Không. Khoản 1 Điều 1 Nghị quyết số 43/2026/QH16 chỉ giảm với cá nhân cư trú có doanh thu hằng năm không quá 10 tỷ đồng.",
    },
    {
      pregunta: "Đã chọn tính trên thu nhập thì có đổi lại được không?",
      respuesta: "Điểm d khoản 5 Điều 4 Nghị định số 68/2026/NĐ-CP yêu cầu ổn định phương pháp tính theo thu nhập trong 2 năm liên tục kể từ năm đầu áp dụng.",
    },
  ],
  glosario: [
    { termino: "Hộ kinh doanh", definicion: "Hộ gia đình hoặc cá nhân đăng ký kinh doanh và nộp thuế theo doanh thu hoặc thu nhập." },
    { termino: "Doanh thu tính thuế", definicion: "Phần doanh thu vượt ngưỡng không phải nộp thuế TNCN." },
    { termino: "Chi phí được trừ", definicion: "Chi phí thực tế liên quan đến kinh doanh, có đủ hóa đơn, chứng từ theo Điều 6 Nghị định số 68/2026/NĐ-CP." },
  ],
});
