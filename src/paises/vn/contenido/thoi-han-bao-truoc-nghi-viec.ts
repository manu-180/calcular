import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "vn.thoi-han-bao-truoc-nghi-viec",
  h1: "Thời hạn báo trước khi nghỉ việc",
  title: "Báo trước khi nghỉ việc: {{vn.bao-truoc-vo-han}}, {{vn.bao-truoc-12-36}} hay {{vn.bao-truoc-duoi-12}}",
  description: "Báo trước ít nhất {{vn.bao-truoc-vo-han}}, {{vn.bao-truoc-12-36}} hoặc {{vn.bao-truoc-duoi-12}} làm việc tùy loại hợp đồng theo Điều 35 Bộ luật Lao động. Tính cả tiền bồi thường nếu nghỉ sớm.",
  intro: [
    "Muốn nghỉ việc, bạn báo trước ít nhất {{vn.bao-truoc-vo-han}} với hợp đồng không xác định thời hạn, {{vn.bao-truoc-12-36}} với hợp đồng từ 12 đến 36 tháng và {{vn.bao-truoc-duoi-12}} làm việc với hợp đồng dưới 12 tháng.",
    "Nghỉ khi chưa đủ thời hạn là trái pháp luật, và bạn phải bồi thường. Công cụ cho biết thời hạn và số tiền có thể phát sinh.",
  ],
  comoSeCalcula: [
    "Công cụ chọn thời hạn theo loại hợp đồng tại khoản 1 Điều 35 Bộ luật Lao động.",
    "Ngành nghề đặc thù tại Điều 7 Nghị định số 145/2020/NĐ-CP phải báo trước ít nhất {{vn.bao-truoc-dac-thu}}. Hợp đồng dưới 12 tháng của nhóm này báo trước ít nhất một phần tư thời hạn.",
    "Tiền bồi thường theo khoản 2 Điều 40 bằng nửa tháng lương, cộng tiền lương của những ngày không báo trước.",
  ],
  ejemplo: [
    "Hợp đồng 24 tháng phải báo trước 30 ngày, nhưng bạn mới báo 10 ngày. Với lương 26.000.000 ₫ và 26 ngày công, bạn có thể phải bồi thường 13.000.000 ₫ cộng 20.000.000 ₫, tức 33.000.000 ₫.",
  ],
  faq: [
    {
      pregunta: "Khi nào được nghỉ mà không cần báo trước?",
      respuesta: "Khoản 2 Điều 35 liệt kê các trường hợp như không được trả đủ lương, bị ngược đãi, quấy rối tình dục, lao động nữ mang thai phải nghỉ theo chỉ định, đủ tuổi nghỉ hưu.",
    },
    {
      pregunta: "Công ty cho nghỉ thì phải báo trước bao lâu?",
      respuesta: "Khoản 2 Điều 36 quy định cùng các mốc này với người sử dụng lao động. Người lao động tự ý bỏ việc từ 5 ngày làm việc liên tục thì công ty không cần báo trước.",
    },
    {
      pregunta: "Nghỉ trái luật còn mất gì nữa?",
      respuesta: "Điều 40 quy định không được trợ cấp thôi việc và phải hoàn trả chi phí đào tạo nếu có.",
    },
  ],
  glosario: [
    { termino: "Đơn phương chấm dứt hợp đồng", definicion: "Một bên tự chấm dứt hợp đồng mà không cần bên kia đồng ý, nhưng phải đúng điều kiện." },
    { termino: "Báo trước", definicion: "Thông báo trước một số ngày tối thiểu rồi mới nghỉ." },
  ],
});
