import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "vn.tinh-tro-cap-thoi-viec",
  h1: "Tính trợ cấp thôi việc",
  title: "Tính trợ cấp thôi việc: {{vn.thoi-viec-moi-nam}} tháng lương mỗi năm",
  description: "Mỗi năm làm việc được {{vn.thoi-viec-moi-nam}} tháng lương theo Điều 46 Bộ luật Lao động, trừ thời gian đã đóng BHTN. Nhập lương và số tháng để tính.",
  intro: [
    "Mỗi năm làm việc được trợ cấp {{vn.thoi-viec-moi-nam}} tháng lương, tính trên lương bình quân 6 tháng liền kề trước khi nghỉ.",
    "Thời gian đã đóng bảo hiểm thất nghiệp không được tính, nên nhiều người chỉ nhận trợ cấp cho giai đoạn trước năm 2009 hoặc giai đoạn chưa thuộc diện đóng.",
  ],
  comoSeCalcula: [
    "Thời gian tính bằng tổng thời gian làm việc thực tế, trừ thời gian đã đóng BHTN và thời gian đã được chi trả trợ cấp.",
    "Theo điểm c khoản 3 Điều 8 Nghị định số 145/2020/NĐ-CP, tháng lẻ từ 6 tháng trở xuống tính 1/2 năm, trên 6 tháng tính 1 năm.",
    "Trợ cấp bằng số năm được tính nhân {{vn.thoi-viec-moi-nam}} nhân lương bình quân.",
  ],
  ejemplo: [
    "Bạn làm 124 tháng, đã đóng BHTN 72 tháng, lương bình quân 20.000.000 ₫. Còn 52 tháng, tức 4 năm 4 tháng, được tính 4,5 năm. Trợ cấp là 45.000.000 ₫.",
  ],
  faq: [
    {
      pregunta: "Trường hợp nào không được trợ cấp thôi việc?",
      respuesta: "Khoản 1 Điều 46 Bộ luật Lao động loại trừ người đủ điều kiện hưởng lương hưu và người tự ý bỏ việc không có lý do chính đáng từ 5 ngày làm việc liên tục trở lên. Người đơn phương nghỉ trái luật cũng không được, theo Điều 40.",
    },
    {
      pregunta: "Công ty phải trả trong bao lâu?",
      respuesta: "Khoản 1 Điều 48 Bộ luật Lao động quy định trong 14 ngày làm việc kể từ ngày chấm dứt hợp đồng, một số trường hợp đặc biệt có thể kéo dài nhưng không quá 30 ngày.",
    },
    {
      pregunta: "Thời gian thử việc có được tính không?",
      respuesta: "Có. Điểm a khoản 3 Điều 8 Nghị định số 145/2020/NĐ-CP tính cả thời gian thử việc, thời gian được cử đi học và thời gian nghỉ hưởng chế độ ốm đau, thai sản.",
    },
  ],
  glosario: [
    { termino: "Trợ cấp thôi việc", definicion: "Khoản công ty trả khi hợp đồng chấm dứt trong các trường hợp tại Điều 46 Bộ luật Lao động." },
    { termino: "Lương bình quân", definicion: "Trung bình tiền lương theo hợp đồng của 6 tháng liền kề trước khi nghỉ." },
  ],
});
