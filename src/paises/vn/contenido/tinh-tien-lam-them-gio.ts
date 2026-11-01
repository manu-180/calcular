import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "vn.tinh-tien-lam-them-gio",
  h1: "Tính tiền làm thêm giờ",
  title: "Tính tiền làm thêm giờ: {{vn.them-gio-ngay-thuong}}, {{vn.them-gio-ngay-nghi}}, {{vn.them-gio-ngay-le}}",
  description: "Tiền làm thêm ít nhất {{vn.them-gio-ngay-thuong}} ngày thường, {{vn.them-gio-ngay-nghi}} ngày nghỉ, {{vn.them-gio-ngay-le}} ngày lễ theo Điều 98 Bộ luật Lao động, có tính ban đêm.",
  intro: [
    "Làm thêm giờ được trả ít nhất {{vn.them-gio-ngay-thuong}} vào ngày thường, {{vn.them-gio-ngay-nghi}} vào ngày nghỉ hằng tuần và {{vn.them-gio-ngay-le}} vào ngày lễ, tết.",
    "Làm thêm ban đêm được cộng thêm {{vn.lam-dem}} và {{vn.them-gio-dem}} nữa, nên hệ số cao hơn nhiều. Nhập số giờ từng loại để có tổng tiền.",
  ],
  comoSeCalcula: [
    "Tiền lương một giờ bằng lương tháng chia số giờ làm việc bình thường trong tháng.",
    "Ban ngày: tiền một giờ nhân {{vn.them-gio-ngay-thuong}}, {{vn.them-gio-ngay-nghi}} hoặc {{vn.them-gio-ngay-le}}.",
    "Ban đêm theo Điều 57 Nghị định số 145/2020/NĐ-CP: mức ban ngày, cộng {{vn.lam-dem}}, cộng {{vn.them-gio-dem}} của tiền lương ban ngày của ngày đó. Ngày thường là 200% nếu chưa làm thêm ban ngày, 210% nếu đã làm thêm ban ngày.",
    "Ngày nghỉ hằng tuần là 270%, ngày lễ, tết là 390%.",
  ],
  ejemplo: [
    "Lương 10.400.000 ₫, 208 giờ chuẩn, nên một giờ là 50.000 ₫. Làm thêm 10 giờ ban ngày vào ngày thường được 750.000 ₫. Nếu thêm 4 giờ đêm ngày thường chưa làm thêm ban ngày, cộng 400.000 ₫.",
  ],
  faq: [
    {
      pregunta: "Lương ngày lễ đã gồm trong {{vn.them-gio-ngay-le}} chưa?",
      respuesta: "Điểm c khoản 1 Điều 98 Bộ luật Lao động ghi mức này chưa kể tiền lương ngày lễ, tết, ngày nghỉ có hưởng lương đối với người hưởng lương ngày.",
    },
    {
      pregunta: "Làm việc ban đêm nhưng không làm thêm giờ thì sao?",
      respuesta: "Khoản 2 Điều 98 quy định được trả thêm ít nhất {{vn.lam-dem}} tiền lương của ngày làm việc bình thường.",
    },
    {
      pregunta: "Công ty có được trả thấp hơn các mức này không?",
      respuesta: "Không. Điều 98 dùng cụm từ ít nhất. Công ty có thể trả cao hơn theo thỏa thuận, nên hãy xem hợp đồng và thỏa ước lao động tập thể.",
    },
  ],
  glosario: [
    { termino: "Làm thêm giờ", definicion: "Thời gian làm ngoài giờ bình thường theo pháp luật, thỏa ước hoặc nội quy." },
    { termino: "Giờ bình thường trong tháng", definicion: "Số giờ làm theo hợp đồng trong tháng, không gồm giờ làm thêm." },
  ],
});
