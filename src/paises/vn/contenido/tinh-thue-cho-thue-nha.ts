import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "vn.tinh-thue-cho-thue-nha",
  h1: "Tính thuế cho thuê nhà {{anio}}",
  title: "Tính thuế cho thuê nhà {{anio}}: ngưỡng {{vn.hkd-nguong}}",
  description: "Doanh thu cho thuê từ {{vn.hkd-nguong}} trở xuống chưa phải nộp thuế. Phần vượt chịu TNCN {{vn.nha-tncn}}, cộng GTGT {{vn.hkd-gtgt[dich-vu]}} trên toàn bộ doanh thu.",
  intro: [
    "Cá nhân cho thuê nhà có doanh thu năm từ {{vn.hkd-nguong}} trở xuống không phải nộp GTGT và TNCN. Mức này áp dụng từ {{vn.hkd-nguong#desde}} theo Nghị định số 141/2026/NĐ-CP.",
    "Vượt ngưỡng, bạn nộp GTGT {{vn.hkd-gtgt[dich-vu]}} trên toàn bộ doanh thu và TNCN {{vn.nha-tncn}} trên phần vượt ngưỡng.",
  ],
  comoSeCalcula: [
    "Doanh thu năm bằng tiền thuê mỗi tháng nhân số tháng cho thuê trong năm.",
    "Khoản 4 Điều 7 Luật số 109/2025/QH15 tính TNCN trên phần doanh thu vượt ngưỡng nhân {{vn.nha-tncn}}, không trừ chi phí.",
    "Điều 3 Nghị định số 68/2026/NĐ-CP tính GTGT theo tỷ lệ % trên doanh thu khi vượt ngưỡng.",
    "Có nhiều hợp đồng cho thuê thì tổng mức được trừ cũng chỉ bằng một lần ngưỡng trong năm.",
  ],
  ejemplo: [
    "Cho thuê 120.000.000 ₫ mỗi tháng trong 12 tháng. Doanh thu là 1.440.000.000 ₫. GTGT là 72.000.000 ₫, TNCN là 22.000.000 ₫, tổng thuế là 94.000.000 ₫.",
  ],
  faq: [
    {
      pregunta: "Khi nào phải kê khai thuế cho thuê nhà?",
      respuesta: "Điểm d khoản 3 Điều 8 Nghị định số 68/2026/NĐ-CP cho chọn khai 2 lần (31/7 và 31/1 năm sau) hoặc một lần trong năm (31/1 năm sau).",
    },
    {
      pregunta: "Khách thuê là công ty thì ai khai thuế?",
      respuesta: "Điểm đ khoản 3 Điều 8 của Nghị định cho phép tổ chức thuê nhà khai thay, nộp thay nếu hợp đồng có thỏa thuận. Nếu người thuê là cá nhân, bạn phải tự khai.",
    },
    {
      pregunta: "Cho thuê nhiều căn thì tính ngưỡng thế nào?",
      respuesta: "Khoản 4 Điều 4 Nghị định số 68/2026/NĐ-CP cho bạn chọn hợp đồng để trừ, nhưng tổng mức trừ của tất cả hợp đồng không vượt quá mức ngưỡng trong một năm.",
    },
    {
      pregunta: "Cho thuê theo kiểu lưu trú có dùng cách này không?",
      respuesta: "Không. Khoản 4 Điều 7 Luật số 109/2025/QH15 loại trừ hoạt động kinh doanh lưu trú. Nhà nghỉ, homestay tính như hộ kinh doanh.",
    },
  ],
  glosario: [
    { termino: "Doanh thu cho thuê", definicion: "Tiền bên thuê trả theo từng kỳ trong hợp đồng. Trả trước nhiều năm thì được phân bổ hoặc tính một lần." },
    { termino: "Khai thay", definicion: "Bên thuê là tổ chức thay bạn khai và nộp thuế khi hợp đồng có thỏa thuận." },
  ],
});
