import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "vn.tinh-lam-phat",
  h1: "Tính lạm phát và sức mua của đồng tiền",
  title: "Tính lạm phát {{anio}}: CPI tăng {{vn.cpi-nam}} so với cùng kỳ",
  description: "CPI mới nhất tăng {{vn.cpi-nam}} so với cùng kỳ năm trước. Nhập số tiền và số năm để biết cần bao nhiêu tiền trong tương lai và sức mua còn lại.",
  intro: [
    "CPI tháng {{vn.cpi-nam#desde}} tăng {{vn.cpi-nam}} so với cùng kỳ năm trước và {{vn.cpi-thang}} so với tháng trước, theo Cục Thống kê. Bình quân từ đầu năm, CPI tăng {{vn.cpi-binh-quan}}.",
    "Công cụ cho thấy một khoản tiền hôm nay tương đương bao nhiêu sau vài năm nếu giá tiếp tục tăng như vậy, hoặc theo mức bạn tự giả định.",
  ],
  comoSeCalcula: [
    "Số tiền tương đương bằng số tiền hôm nay nhân (1 + lạm phát) mũ số năm.",
    "Sức mua còn lại bằng số tiền hôm nay chia cho cùng hệ số đó.",
    "Nếu bạn không nhập lạm phát giả định, công cụ dùng mức CPI so với cùng kỳ năm trước mới nhất là {{vn.cpi-nam}}. Đây là phép chiếu đơn giản, không phải dự báo.",
  ],
  ejemplo: [
    "Với lạm phát giả định 5% mỗi năm, 10.000.000 ₫ hôm nay tương đương 12.762.816 ₫ sau 5 năm. Nói cách khác, 10.000.000 ₫ khi đó chỉ mua được lượng hàng trị giá khoảng 7.835.262 ₫ hôm nay.",
  ],
  faq: [
    {
      pregunta: "Số liệu CPI lấy từ đâu?",
      respuesta: "Từ thông cáo báo chí về tình hình giá hằng tháng của Cục Thống kê, Bộ Tài chính, đăng tại nso.gov.vn. Trang này ghi rõ tháng của số liệu.",
    },
    {
      pregunta: "CPI so với cùng kỳ khác gì so với tháng trước?",
      respuesta: "So với cùng kỳ là mức tăng của tháng đó so với đúng tháng năm trước. So với tháng trước chỉ phản ánh biến động một tháng, nên số nhỏ hơn nhiều.",
    },
    {
      pregunta: "Có nên dùng mức này để dự báo lâu dài không?",
      respuesta: "Nên thận trọng. CPI biến động theo từng năm. Hãy thử vài mức giả định khác nhau trong ô lạm phát để thấy khoảng kết quả.",
    },
  ],
  glosario: [
    { termino: "CPI", definicion: "Chỉ số giá tiêu dùng, đo mức thay đổi giá của giỏ hàng hóa, dịch vụ tiêu dùng." },
    { termino: "Sức mua", definicion: "Lượng hàng hóa, dịch vụ mà một số tiền mua được." },
  ],
});
