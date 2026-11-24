import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "vn.tinh-le-phi-truoc-ba",
  h1: "Tính lệ phí trước bạ {{anio}}",
  title: "Tính lệ phí trước bạ {{anio}}: nhà đất {{vn.tb-nha-dat}}, ô tô từ {{vn.tb-o-to}}",
  description: "Lệ phí trước bạ nhà đất {{vn.tb-nha-dat}}, xe máy {{vn.tb-xe-may}}, ô tô từ {{vn.tb-o-to}}, ô tô điện {{vn.tb-o-to-dien}}. Nhập giá tính lệ phí để biết số tiền phải nộp.",
  intro: [
    "Mức thu chung là {{vn.tb-nha-dat}} với nhà, đất, {{vn.tb-xe-may}} với xe máy và {{vn.tb-o-to}} với ô tô từ 9 chỗ trở xuống nộp lần đầu. Nhiều tỉnh, thành phố áp dụng mức ô tô cao hơn.",
    "Ô tô điện chạy pin nộp lần đầu đang ở mức {{vn.tb-o-to-dien}}. Nghị định số 202/2026/NĐ-CP kéo dài mức này đến hết ngày 31/12/2030.",
  ],
  comoSeCalcula: [
    "Lệ phí bằng giá tính lệ phí nhân mức thu của loại tài sản, theo Điều 8 Nghị định số 10/2022/NĐ-CP đã sửa đổi.",
    "Với ô tô, Hội đồng nhân dân tỉnh có thể tăng mức {{vn.tb-o-to}} nhưng không quá {{vn.tb-o-to-tang-toi-da}} mức chung. Nhập mức của địa phương bạn.",
    "Pick-up chở hàng cabin kép và tải VAN nộp bằng {{vn.tb-pickup-he-so}} mức ô tô. Từ lần thứ hai, ô tô nộp {{vn.tb-o-to-lan-2}}, xe máy nộp {{vn.tb-xe-may-lan-2}}.",
    "Giá ô tô, xe máy lấy theo Bảng giá của Ủy ban nhân dân tỉnh. Giá nhà, đất là giá theo bảng của tỉnh, hoặc giá hợp đồng nếu cao hơn.",
  ],
  ejemplo: [
    "Mua nhà đất với giá tính lệ phí 3.000.000.000 ₫, bạn nộp 15.000.000 ₫. Mua ô tô 800.000.000 ₫ ở nơi thu 12%, bạn nộp 96.000.000 ₫.",
  ],
  faq: [
    {
      pregunta: "Giá tính lệ phí nhà đất lấy theo đâu?",
      respuesta: "Khoản 1 Điều 7 Nghị định số 10/2022/NĐ-CP dùng giá do Ủy ban nhân dân cấp tỉnh ban hành. Nghị định số 175/2025/NĐ-CP quy định nếu giá hợp đồng cao hơn thì lấy giá hợp đồng.",
    },
    {
      pregunta: "Ô tô điện được miễn lệ phí đến khi nào?",
      respuesta: "Nghị định số 51/2025/NĐ-CP quy định mức {{vn.tb-o-to-dien}} đến hết 28/2/2027. Nghị định số 202/2026/NĐ-CP thay thế từ 1/3/2027 và giữ mức đó đến hết 31/12/2030.",
    },
    {
      pregunta: "Xe máy ở thành phố có còn nộp 5% không?",
      respuesta: "Không. Nghị định số 175/2025/NĐ-CP sửa khoản 4 Điều 8, chỉ còn mức {{vn.tb-xe-may}} và {{vn.tb-xe-may-lan-2}} từ lần thứ hai, không phân biệt địa bàn.",
    },
  ],
  glosario: [
    { termino: "Lệ phí trước bạ", definicion: "Khoản phải nộp khi đăng ký quyền sở hữu, quyền sử dụng tài sản như nhà, đất, xe." },
    { termino: "Bảng giá tính lệ phí", definicion: "Bảng do Ủy ban nhân dân cấp tỉnh ban hành, dùng làm giá tính cho ô tô, xe máy." },
  ],
});
