import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "vn.tinh-bao-hiem-that-nghiep",
  h1: "Tính bảo hiểm thất nghiệp {{anio}}",
  title: "Tính bảo hiểm thất nghiệp {{anio}}: hưởng {{vn.tctn-ty-le}} lương",
  description: "Trợ cấp thất nghiệp bằng {{vn.tctn-ty-le}} lương đóng bình quân 6 tháng, tối đa {{vn.tctn-tran}} lần lương tối thiểu vùng. Nhập số tháng đóng để biết tiền và số tháng được hưởng.",
  intro: [
    "Mức hưởng mỗi tháng bằng {{vn.tctn-ty-le}} lương đóng BHTN bình quân của 6 tháng gần nhất, tối đa {{vn.tctn-tran}} lần lương tối thiểu tháng của vùng theo Luật Việc làm số 74/2025/QH15.",
    "Bạn được hưởng {{vn.tctn-thang-goc}} tháng khi đóng đủ 12 đến đủ 36 tháng, sau đó thêm một tháng cho mỗi 12 tháng đóng thêm, tối đa {{vn.tctn-thang-toi-da}} tháng.",
  ],
  comoSeCalcula: [
    "Mức hưởng bằng lương bình quân nhân {{vn.tctn-ty-le}}, không vượt {{vn.tctn-tran}} lần lương tối thiểu vùng, ví dụ {{vn.lttv-thang@vung-1}} ở vùng I.",
    "Số tháng hưởng bắt đầu từ {{vn.tctn-thang-goc}} tháng, cộng thêm một tháng cho mỗi đủ 12 tháng đóng vượt mốc 36 tháng.",
    "Tổng tiền bằng mức hưởng nhân số tháng.",
  ],
  ejemplo: [
    "Lương đóng bình quân 15.000.000 ₫, đã đóng 40 tháng ở vùng I. Mức hưởng là 9.000.000 ₫ mỗi tháng trong 3 tháng, tổng cộng 27.000.000 ₫.",
  ],
  faq: [
    {
      pregunta: "Cần đóng bao lâu mới được hưởng?",
      respuesta: "Điểm b khoản 1 Điều 38 Luật Việc làm yêu cầu đóng từ đủ {{vn.tctn-thang-toi-thieu-dong}} tháng trong 24 tháng trước khi nghỉ. Hợp đồng từ đủ 1 đến dưới 12 tháng thì đóng đủ 12 tháng trong 36 tháng.",
    },
    {
      pregunta: "Phải nộp hồ sơ trong thời hạn nào?",
      respuesta: "Điểm c khoản 1 Điều 38 yêu cầu nộp đủ hồ sơ trong 3 tháng kể từ ngày chấm dứt hợp đồng. Khoản 3 Điều 39 tính ngày hưởng từ ngày làm việc thứ 11 sau khi nộp đủ hồ sơ.",
    },
    {
      pregunta: "Tự nghỉ việc có được hưởng không?",
      respuesta: "Có, nếu nghỉ đúng luật. Điểm a khoản 1 Điều 38 chỉ loại trừ người đơn phương chấm dứt hợp đồng trái pháp luật và người nghỉ việc khi đủ điều kiện hưởng lương hưu.",
    },
  ],
  glosario: [
    { termino: "Trợ cấp thất nghiệp", definicion: "Khoản Quỹ bảo hiểm thất nghiệp trả hằng tháng khi bạn nghỉ việc và đủ điều kiện." },
    { termino: "Thông báo tìm việc", definicion: "Việc người đang hưởng trợ cấp phải làm hằng tháng với tổ chức dịch vụ việc làm công." },
  ],
});
