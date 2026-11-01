import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "vn.luong-toi-thieu-vung",
  h1: "Lương tối thiểu vùng {{anio}}",
  title: "Lương tối thiểu vùng {{anio}}: vùng I {{vn.lttv-thang@vung-1}}",
  description: "Lương tối thiểu tháng từ {{vn.lttv-thang@vung-4}} đến {{vn.lttv-thang@vung-1}} theo Nghị định 293/2025/NĐ-CP. Chọn vùng để xem mức tháng, mức giờ và so với lương của bạn.",
  intro: [
    "Từ {{vn.lttv-thang@vung-1#desde}}, lương tối thiểu tháng là {{vn.lttv-thang@vung-1}} ở vùng I, {{vn.lttv-thang@vung-2}} ở vùng II, {{vn.lttv-thang@vung-3}} ở vùng III và {{vn.lttv-thang@vung-4}} ở vùng IV.",
    "Mức tối thiểu giờ lần lượt là {{vn.lttv-gio@vung-1}}, {{vn.lttv-gio@vung-2}}, {{vn.lttv-gio@vung-3}} và {{vn.lttv-gio@vung-4}}. Nhập lương của bạn để so sánh.",
  ],
  comoSeCalcula: [
    "Công cụ lấy mức của vùng bạn chọn trong bảng tại khoản 1 Điều 3 Nghị định số 293/2025/NĐ-CP.",
    "Vùng xác định theo nơi người sử dụng lao động hoạt động. Chi nhánh ở địa bàn nào thì áp dụng mức của địa bàn đó. Danh mục địa bàn nằm trong Phụ lục của Nghị định.",
    "Lương tuần, ngày, sản phẩm hoặc khoán phải quy đổi theo tháng hoặc giờ rồi mới so sánh, theo khoản 3 Điều 4 của Nghị định.",
  ],
  ejemplo: [
    "Bạn làm ở vùng III với lương 5.000.000 ₫ mỗi tháng. Mức tối thiểu tháng là 4.140.000 ₫, nên lương của bạn cao hơn 860.000 ₫.",
  ],
  faq: [
    {
      pregunta: "Doanh nghiệp trong khu công nghiệp nằm trên nhiều địa bàn áp dụng vùng nào?",
      respuesta: "Theo điểm c khoản 3 Điều 3 Nghị định số 293/2025/NĐ-CP, khu công nghiệp, khu chế xuất, khu công nghệ cao nằm trên các địa bàn có mức khác nhau thì áp dụng mức cao nhất.",
    },
    {
      pregunta: "Lương tối thiểu tháng dùng để làm gì?",
      respuesta: "Khoản 1 Điều 4 của Nghị định quy định đây là mức thấp nhất làm cơ sở thỏa thuận và trả lương. Người làm đủ thời giờ bình thường và đạt định mức không được trả thấp hơn mức này.",
    },
    {
      pregunta: "Mức này có thay đổi vào năm tới không?",
      respuesta: "Bộ Tư pháp đang thẩm định dự thảo nghị định mới. Khi chưa có nghị định được ban hành, Nghị định số 293/2025/NĐ-CP vẫn là mức áp dụng.",
    },
  ],
  glosario: [
    { termino: "Lương tối thiểu vùng", definicion: "Mức lương thấp nhất cho người làm việc theo hợp đồng lao động, chia theo 4 vùng." },
    { termino: "Lương tối thiểu giờ", definicion: "Mức thấp nhất cho một giờ làm việc khi trả lương theo giờ." },
  ],
});
