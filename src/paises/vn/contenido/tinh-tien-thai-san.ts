import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "vn.tinh-tien-thai-san",
  h1: "Tính tiền thai sản {{anio}}",
  title: "Tính tiền thai sản {{anio}}: {{vn.thai-san-thang}} tháng và trợ cấp một lần",
  description: "Trợ cấp bằng {{vn.thai-san-ty-le}} lương đóng BHXH bình quân trong {{vn.thai-san-thang}} tháng, cộng {{vn.thai-san-mot-lan}} lần mức tham chiếu mỗi con. Nhập lương để tính.",
  intro: [
    "Khi sinh con, lao động nữ được nghỉ {{vn.thai-san-thang}} tháng, hưởng {{vn.thai-san-ty-le}} lương đóng BHXH bình quân của 6 tháng gần nhất.",
    "Ngoài ra còn có trợ cấp một lần bằng {{vn.thai-san-mot-lan}} lần mức tham chiếu {{vn.muc-tham-chieu}} cho mỗi con.",
  ],
  comoSeCalcula: [
    "Thời gian nghỉ là {{vn.thai-san-thang}} tháng cho một con. Sinh đôi trở lên thì tính từ con thứ hai, mỗi con được nghỉ thêm {{vn.thai-san-them}} tháng, theo khoản 1 Điều 139 Bộ luật Lao động.",
    "Trợ cấp một tháng bằng {{vn.thai-san-ty-le}} mức bình quân tiền lương đóng BHXH của 6 tháng gần nhất, theo Điều 59 Luật số 41/2024/QH15.",
    "Trợ cấp một lần bằng {{vn.thai-san-mot-lan}} lần mức tham chiếu tại tháng sinh, nhân số con, theo Điều 58.",
  ],
  ejemplo: [
    "Lương đóng BHXH bình quân 10.000.000 ₫, sinh một con. Trợ cấp cả thời gian nghỉ là 60.000.000 ₫, trợ cấp một lần là 5.060.000 ₫, tổng cộng 65.060.000 ₫.",
  ],
  faq: [
    {
      pregunta: "Được nghỉ trước khi sinh bao lâu?",
      respuesta: "Khoản 1 Điều 139 Bộ luật Lao động quy định thời gian nghỉ trước khi sinh không quá 2 tháng, nằm trong tổng thời gian {{vn.thai-san-thang}} tháng.",
    },
    {
      pregunta: "Đi làm sớm có còn được trợ cấp không?",
      respuesta: "Có. Khoản 4 Điều 139 cho phép trở lại làm khi đã nghỉ ít nhất 4 tháng, nếu báo trước, được đồng ý và có xác nhận y tế. Bạn nhận cả tiền lương những ngày làm lẫn trợ cấp thai sản.",
    },
    {
      pregunta: "Chồng được nghỉ bao nhiêu ngày khi vợ sinh?",
      respuesta: "Khoản 2 Điều 53 Luật số 41/2024/QH15 quy định 5 ngày làm việc, 7 ngày nếu vợ phẫu thuật hoặc sinh con dưới 32 tuần, 10 ngày nếu sinh đôi và 14 ngày nếu sinh đôi phải phẫu thuật.",
    },
    {
      pregunta: "Cần điều kiện gì để được hưởng?",
      respuesta: "Điều kiện đóng BHXH nằm tại Điều 50 Luật số 41/2024/QH15. Công cụ này giả định bạn đã đủ điều kiện, nên hãy kiểm tra thời gian đóng trên sổ BHXH.",
    },
  ],
  glosario: [
    { termino: "Trợ cấp thai sản", definicion: "Khoản Quỹ ốm đau và thai sản trả thay lương trong thời gian nghỉ sinh." },
    { termino: "Mức tham chiếu", definicion: "Mức tiền dùng để tính một số chế độ BHXH. Khi chưa bãi bỏ lương cơ sở thì bằng lương cơ sở." },
  ],
});
