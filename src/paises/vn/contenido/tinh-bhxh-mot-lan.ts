import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "vn.tinh-bhxh-mot-lan",
  h1: "Tính tiền BHXH một lần",
  title: "Tính BHXH một lần: {{vn.bhxh-1-lan-truoc-2014}} và {{vn.bhxh-1-lan-tu-2014}} tháng lương mỗi năm",
  description: "Mỗi năm đóng trước 2014 được {{vn.bhxh-1-lan-truoc-2014}} tháng, từ 2014 được {{vn.bhxh-1-lan-tu-2014}} tháng lương bình quân theo Điều 70 Luật BHXH. Nhập số năm để tính.",
  intro: [
    "Mỗi năm đóng trước năm 2014 được tính {{vn.bhxh-1-lan-truoc-2014}} tháng lương bình quân, mỗi năm từ năm 2014 trở đi được tính {{vn.bhxh-1-lan-tu-2014}} tháng.",
    "Hãy cân nhắc trước khi rút: nhận BHXH một lần sẽ xóa thời gian đóng dùng để tính lương hưu sau này.",
  ],
  comoSeCalcula: [
    "Số tháng được nhận bằng số năm đóng trước 2014 nhân {{vn.bhxh-1-lan-truoc-2014}}, cộng số năm từ 2014 nhân {{vn.bhxh-1-lan-tu-2014}}.",
    "Tiền nhận bằng số tháng đó nhân mức bình quân tiền lương tháng đóng BHXH.",
    "Mức bình quân do cơ quan BHXH xác định, có điều chỉnh lương các năm trước theo Điều 73 Luật số 41/2024/QH15, nên số thực nhận có thể cao hơn phép tính với lương danh nghĩa.",
  ],
  ejemplo: [
    "Đóng 3 năm trước 2014 và 5 năm từ 2014, mức bình quân 10.000.000 ₫. Bạn được 14,5 tháng lương bình quân, tức 145.000.000 ₫.",
  ],
  faq: [
    {
      pregunta: "Ai được rút BHXH một lần?",
      respuesta: "Khoản 1 Điều 70 Luật số 41/2024/QH15 liệt kê các trường hợp như đủ tuổi hưởng lương hưu mà chưa đủ 15 năm, ra nước ngoài định cư, mắc một số bệnh nặng. Người đóng trước 1/7/2025, nghỉ 12 tháng và chưa đủ 20 năm cũng thuộc diện này.",
    },
    {
      pregunta: "Đóng chưa đủ một năm thì tính thế nào?",
      respuesta: "Điểm c khoản 3 Điều 70 quy định mức hưởng bằng số tiền đã đóng nhưng không quá 2 tháng lương bình quân.",
    },
    {
      pregunta: "Tháng lẻ trước năm 2014 tính ra sao?",
      respuesta: "Điểm a khoản 3 Điều 70 quy định nếu có đóng cả trước và sau 2014 thì tháng lẻ trước 2014 được chuyển sang giai đoạn từ năm 2014 để tính.",
    },
  ],
  glosario: [
    { termino: "BHXH một lần", definicion: "Khoản nhận một lần thay vì tiếp tục tích lũy thời gian đóng để hưởng lương hưu." },
    { termino: "Bảo lưu", definicion: "Giữ lại thời gian đã đóng để tính sau này, theo Điều 71 Luật số 41/2024/QH15." },
  ],
});
