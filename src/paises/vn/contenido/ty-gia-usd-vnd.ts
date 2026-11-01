import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "vn.ty-gia-usd-vnd",
  h1: "Tỷ giá USD sang VND hôm nay",
  title: "Tỷ giá USD sang VND {{anio}}: tỷ giá trung tâm {{vn.usd}}",
  description: "Đổi đô la Mỹ sang đồng theo tỷ giá trung tâm của Ngân hàng Nhà nước, hiện là {{vn.usd}} cho 1 USD. Nhập số tiền để đổi hai chiều.",
  intro: [
    "Tỷ giá trung tâm áp dụng cho ngày {{vn.usd#desde}} là {{vn.usd}} cho 1 đô la Mỹ, theo công bố của Ngân hàng Nhà nước Việt Nam.",
    "Nhập số tiền và chọn chiều đổi. Kết quả phù hợp để ước tính, vì ngân hàng thương mại niêm yết tỷ giá mua, bán riêng.",
  ],
  comoSeCalcula: [
    "Đổi sang đồng: số đô la nhân tỷ giá trung tâm.",
    "Đổi sang đô la: số đồng chia tỷ giá trung tâm.",
    "Tỷ giá trung tâm do Ngân hàng Nhà nước công bố cho từng ngày làm việc và là căn cứ để các ngân hàng xác định tỷ giá của mình.",
  ],
  ejemplo: ["Với tỷ giá 25.637 đồng, 100 đô la Mỹ bằng 2.563.700 ₫. Ngược lại, 25.637.000 ₫ bằng 1.000 đô la Mỹ."],
  faq: [
    {
      pregunta: "Tỷ giá trung tâm khác gì tỷ giá ngân hàng?",
      respuesta: "Tỷ giá trung tâm do Ngân hàng Nhà nước công bố. Giá mua, bán thực tế do từng ngân hàng thương mại niêm yết, nên khi đổi tiền bạn nên xem bảng của ngân hàng đó.",
    },
    {
      pregunta: "Bao lâu tỷ giá cập nhật một lần?",
      respuesta: "Ngân hàng Nhà nước công bố theo từng ngày áp dụng. Trang này hiển thị ngày áp dụng ngay bên cạnh kết quả, để bạn biết số liệu mới đến đâu.",
    },
    {
      pregunta: "Có dùng tỷ giá này để khai thuế được không?",
      respuesta: "Công cụ chỉ để ước tính. Khi kê khai, hãy dùng tỷ giá do văn bản về thuế hoặc kế toán áp dụng cho nghiệp vụ của bạn quy định.",
    },
  ],
  glosario: [
    { termino: "Tỷ giá trung tâm", definicion: "Tỷ giá giữa đồng và đô la Mỹ do Ngân hàng Nhà nước Việt Nam công bố." },
    { termino: "Tỷ giá niêm yết", definicion: "Giá mua, bán ngoại tệ mà ngân hàng thương mại công bố cho khách." },
  ],
});
