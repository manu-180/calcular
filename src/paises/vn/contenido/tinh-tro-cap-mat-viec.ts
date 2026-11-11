import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "vn.tinh-tro-cap-mat-viec",
  h1: "Tính trợ cấp mất việc làm",
  title: "Tính trợ cấp mất việc làm: ít nhất {{vn.mat-viec-toi-thieu}} tháng lương",
  description: "Mỗi năm làm việc được {{vn.mat-viec-moi-nam}} tháng lương, ít nhất {{vn.mat-viec-toi-thieu}} tháng, theo Điều 47 Bộ luật Lao động. Nhập lương để tính số tiền được nhận.",
  intro: [
    "Khi công ty cho thôi việc vì thay đổi cơ cấu, công nghệ, lý do kinh tế hoặc chia tách, sáp nhập, bạn được trả {{vn.mat-viec-moi-nam}} tháng lương cho mỗi năm làm việc.",
    "Dù thời gian tính ngắn, mức trả vẫn ít nhất bằng {{vn.mat-viec-toi-thieu}} tháng lương.",
  ],
  comoSeCalcula: [
    "Thời gian tính bằng tổng thời gian làm việc thực tế, trừ thời gian đã đóng BHTN và thời gian đã được chi trả trợ cấp.",
    "Tháng lẻ từ 6 tháng trở xuống tính 1/2 năm, trên 6 tháng tính 1 năm.",
    "Số tiền bằng số năm nhân {{vn.mat-viec-moi-nam}} tháng lương bình quân 6 tháng cuối, nhưng không thấp hơn {{vn.mat-viec-toi-thieu}} tháng lương.",
  ],
  ejemplo: [
    "Bạn làm 124 tháng, đã đóng BHTN 72 tháng, lương bình quân 20.000.000 ₫. Thời gian tính là 4,5 năm, nên trợ cấp là 90.000.000 ₫.",
  ],
  faq: [
    {
      pregunta: "Khác gì với trợ cấp thôi việc?",
      respuesta: "Trợ cấp thôi việc (Điều 46) là nửa tháng lương mỗi năm khi hợp đồng chấm dứt thông thường. Trợ cấp mất việc (Điều 47) là {{vn.mat-viec-moi-nam}} tháng lương mỗi năm, áp dụng khi công ty cho thôi việc theo Điều 42 và Điều 43.",
    },
    {
      pregunta: "Đã đóng BHTN cả quá trình thì có được gì không?",
      respuesta: "Có. Khoản 2 Điều 8 Nghị định số 145/2020/NĐ-CP quy định nếu đã làm từ đủ 12 tháng nhưng thời gian tính ít hơn 24 tháng thì công ty vẫn trả ít nhất {{vn.mat-viec-toi-thieu}} tháng lương.",
    },
    {
      pregunta: "Công ty phải báo trước bao lâu?",
      respuesta: "Khoản 6 Điều 42 Bộ luật Lao động yêu cầu trao đổi với tổ chức đại diện người lao động và thông báo trước 30 ngày cho Ủy ban nhân dân cấp tỉnh và người lao động.",
    },
  ],
  glosario: [
    { termino: "Mất việc làm", definicion: "Người lao động bị cho thôi việc vì lý do của doanh nghiệp, không phải do lỗi của họ." },
    { termino: "Thời gian tính trợ cấp", definicion: "Thời gian làm việc thực tế sau khi trừ thời gian đã đóng bảo hiểm thất nghiệp." },
  ],
});
