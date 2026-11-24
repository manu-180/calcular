import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "vn.tinh-phep-nam",
  h1: "Tính ngày phép năm",
  title: "Tính ngày phép năm: {{vn.phep-binh-thuong}} và thêm theo thâm niên",
  description: "Nghỉ hằng năm từ {{vn.phep-binh-thuong}}, tăng một ngày sau mỗi {{vn.phep-tham-nien-nam}} làm việc theo Điều 113, 114 Bộ luật Lao động. Tính cả tiền ngày chưa nghỉ khi thôi việc.",
  intro: [
    "Làm đủ 12 tháng, bạn được nghỉ {{vn.phep-binh-thuong}} trong điều kiện bình thường, {{vn.phep-nang-nhoc}} với nghề nặng nhọc, độc hại và {{vn.phep-dac-biet}} với nghề đặc biệt nặng nhọc, độc hại.",
    "Cứ đủ {{vn.phep-tham-nien-nam}} làm việc cho một công ty, bạn được thêm một ngày. Khi thôi việc, ngày chưa nghỉ được trả thành tiền.",
  ],
  comoSeCalcula: [
    "Làm từ đủ 12 tháng: số ngày theo điều kiện làm việc, cộng một ngày cho mỗi {{vn.phep-tham-nien-nam}} làm việc.",
    "Làm chưa đủ 12 tháng: số ngày theo tỷ lệ với số tháng làm việc, theo khoản 2 Điều 113.",
    "Tiền ngày chưa nghỉ bằng số ngày còn lại nhân lương tháng, chia số ngày làm việc bình thường trong tháng.",
  ],
  ejemplo: [
    "Bạn làm 6 năm trong điều kiện bình thường, nên có 13 ngày phép. Đã nghỉ 8 ngày, còn 5 ngày. Với lương 10.400.000 ₫ và 26 ngày công, tiền của 5 ngày đó là 2.000.000 ₫ khi thôi việc.",
  ],
  faq: [
    {
      pregunta: "Có được gộp phép năm không?",
      respuesta: "Có. Khoản 4 Điều 113 Bộ luật Lao động cho phép thỏa thuận nghỉ thành nhiều lần hoặc nghỉ gộp tối đa 3 năm một lần.",
    },
    {
      pregunta: "Nghỉ việc mà chưa nghỉ hết phép thì sao?",
      respuesta: "Khoản 3 Điều 113 quy định công ty phải thanh toán tiền lương cho những ngày chưa nghỉ khi thôi việc hoặc mất việc.",
    },
    {
      pregunta: "Ai quyết định lịch nghỉ?",
      respuesta: "Khoản 4 Điều 113 giao người sử dụng lao động quy định lịch nghỉ sau khi tham khảo ý kiến người lao động và phải thông báo trước.",
    },
  ],
  glosario: [
    { termino: "Nghỉ hằng năm", definicion: "Những ngày nghỉ vẫn hưởng nguyên lương theo hợp đồng, thường gọi là phép năm." },
    { termino: "Thâm niên", definicion: "Thời gian làm việc liên tục cho cùng một người sử dụng lao động." },
  ],
});
