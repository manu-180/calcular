import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "vn.tinh-thue-gtgt",
  h1: "Tính thuế GTGT {{anio}}",
  title: "Tính thuế GTGT {{anio}}: thuế suất {{vn.gtgt-giam}}, 10% và 5%",
  description: "Cộng hoặc tách thuế giá trị gia tăng khỏi giá bán. Mức {{vn.gtgt-giam}} cho nhóm được giảm, {{vn.gtgt-pho-thong}} phổ thông và {{vn.gtgt-uu-dai}} ưu đãi.",
  intro: [
    "Hiện có ba mức thường gặp: {{vn.gtgt-giam}} cho nhóm được giảm, {{vn.gtgt-pho-thong}} cho nhóm phổ thông và {{vn.gtgt-uu-dai}} cho nhóm ưu đãi.",
    "Nhập giá chưa thuế để cộng thuế, hoặc nhập giá đã có thuế để tách ra phần thuế và giá gốc khi lập hóa đơn.",
  ],
  comoSeCalcula: [
    "Cộng thuế: tiền thuế bằng giá chưa thuế nhân thuế suất, rồi cộng vào giá.",
    "Tách thuế: giá chưa thuế bằng giá đã có thuế chia cho 1 cộng thuế suất. Phần còn lại là thuế.",
    "Nghị quyết số 204/2025/QH15 giảm 2% thuế suất đến hết ngày 31/12/2026. Viễn thông, tài chính, ngân hàng, chứng khoán, bảo hiểm, bất động sản, kim loại, khai khoáng và hàng chịu thuế tiêu thụ đặc biệt (trừ xăng) không được giảm.",
  ],
  ejemplo: [
    "Giá chưa thuế 10.000.000 ₫ thuộc nhóm được giảm. Tiền thuế là 800.000 ₫ và khách trả 10.800.000 ₫. Nếu cùng giá đó thuộc nhóm không được giảm, tiền thuế là 1.000.000 ₫.",
  ],
  faq: [
    {
      pregunta: "Giảm thuế GTGT 2% áp dụng đến khi nào?",
      respuesta: "Điều 2 Nghị quyết số 204/2025/QH15 quy định từ ngày 1/7/2025 đến hết ngày 31/12/2026. Sau đó, nếu không có quy định mới, nhóm này trở lại thuế suất {{vn.gtgt-pho-thong}}.",
    },
    {
      pregunta: "Mặt hàng nào chịu thuế suất 5%?",
      respuesta: "Khoản 2 Điều 9 Luật Thuế giá trị gia tăng số 48/2024/QH15 liệt kê các nhóm này. Hãy đối chiếu mặt hàng của bạn với danh mục đó và văn bản hướng dẫn trước khi xuất hóa đơn.",
    },
    {
      pregunta: "Hộ kinh doanh có dùng các thuế suất này không?",
      respuesta: "Không. Hộ, cá nhân kinh doanh tính theo tỷ lệ % trên doanh thu tại khoản 2 Điều 11 của Luật. Hãy dùng công cụ tính thuế hộ kinh doanh.",
    },
  ],
  glosario: [
    { termino: "Thuế GTGT", definicion: "Thuế giá trị gia tăng, cộng vào giá bán hàng hóa, dịch vụ." },
    { termino: "Tách thuế", definicion: "Tìm giá gốc và phần thuế từ một mức giá đã bao gồm thuế." },
  ],
});
