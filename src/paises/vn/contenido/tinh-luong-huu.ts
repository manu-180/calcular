import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "vn.tinh-luong-huu",
  h1: "Tính lương hưu hằng tháng",
  title: "Tính lương hưu: đủ {{vn.huu-nam-toi-thieu}} năm đóng, tối đa {{vn.huu-ty-le-toi-da}}",
  description: "Lương hưu từ {{vn.huu-ty-le-goc}} đến {{vn.huu-ty-le-toi-da}} mức bình quân tiền lương đóng BHXH theo Luật Bảo hiểm xã hội. Nhập số năm đóng để ước tính.",
  intro: [
    "Từ đủ {{vn.huu-nam-toi-thieu}} năm đóng BHXH là có thể hưởng lương hưu khi đủ tuổi nghỉ hưu. Tỷ lệ cao nhất là {{vn.huu-ty-le-toi-da}} mức bình quân tiền lương.",
    "Công cụ ước tính theo Điều 66 Luật số 41/2024/QH15. Bạn cần tự nhập mức bình quân, vì cơ quan BHXH còn điều chỉnh lương các năm trước theo hệ số riêng.",
  ],
  comoSeCalcula: [
    "Lao động nữ: {{vn.huu-ty-le-goc}} ứng với {{vn.huu-nam-nu}} năm đóng, mỗi năm thêm {{vn.huu-ty-le-tang}}.",
    "Lao động nam: {{vn.huu-ty-le-goc}} ứng với {{vn.huu-nam-nam}} năm đóng, mỗi năm thêm {{vn.huu-ty-le-tang}}. Nếu đóng từ đủ {{vn.huu-nam-toi-thieu}} đến dưới {{vn.huu-nam-nam}} năm thì {{vn.huu-nam-15-goc}} ứng với {{vn.huu-nam-toi-thieu}} năm, mỗi năm thêm {{vn.huu-nam-15-tang}}.",
    "Nam đóng trên {{vn.huu-mot-lan-nam}} năm, nữ đóng trên {{vn.huu-mot-lan-nu}} năm được thêm trợ cấp một lần: mỗi năm cao hơn bằng {{vn.huu-mot-lan-he-so}} lần mức bình quân.",
  ],
  ejemplo: [
    "Lao động nữ đóng 25 năm, mức bình quân 20.000.000 ₫. Tỷ lệ hưởng là 65%, nên lương hưu là 13.000.000 ₫ mỗi tháng.",
  ],
  faq: [
    {
      pregunta: "Đóng 15 năm có được lương hưu không?",
      respuesta: "Có, nếu đủ tuổi nghỉ hưu và thuộc trường hợp tại Điều 64 Luật số 41/2024/QH15. Luật cũ yêu cầu 20 năm. Lao động nam đóng 15 năm hưởng {{vn.huu-nam-15-goc}}, lao động nữ hưởng {{vn.huu-ty-le-goc}}.",
    },
    {
      pregunta: "Nghỉ hưu trước tuổi bị trừ bao nhiêu?",
      respuesta: "Khoản 3 Điều 66 quy định mỗi năm nghỉ trước tuổi giảm 2%. Dưới 6 tháng không giảm, từ đủ 6 đến dưới 12 tháng giảm 1%. Công cụ này chưa tính phần giảm đó.",
    },
    {
      pregunta: "Lương hưu có được điều chỉnh không?",
      respuesta: "Điều 67 Luật số 41/2024/QH15 quy định lương hưu được điều chỉnh trên cơ sở mức tăng của chỉ số giá tiêu dùng, phù hợp khả năng ngân sách và quỹ. Chính phủ quyết định thời điểm và mức điều chỉnh.",
    },
  ],
  glosario: [
    { termino: "Mức bình quân tiền lương", definicion: "Trung bình tiền lương đóng BHXH theo Điều 72, sau khi điều chỉnh theo quy định." },
    { termino: "Tỷ lệ hưởng", definicion: "Phần trăm của mức bình quân mà bạn nhận thành lương hưu." },
  ],
});
