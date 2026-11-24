import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "vn.ty-gia-usd-vnd",
  mercado: "vn",
  concepto: "tipo-de-cambio",
  slug: "ty-gia-usd-vnd",
  estado: "publicado",
  requiere: { "vn.usd": "serie" },
  campos: [
    { id: "soTien", tipo: "numero", etiqueta: "Số tiền", min: 0, porDefecto: 100 },
    {
      id: "chieu",
      tipo: "opcion",
      etiqueta: "Đổi",
      opciones: [
        { valor: "usd", etiqueta: "Đô la Mỹ sang đồng" },
        { valor: "vnd", etiqueta: "Đồng sang đô la Mỹ" },
      ],
      porDefecto: "usd",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.soTien <= 0) throw new ErrorEntrada("Nhập số tiền lớn hơn 0.", "soTien");
    const tyGia = v["vn.usd"].valor;
    return {
      dong: e.chieu === "usd" ? redondear(e.soTien * tyGia) : null,
      usd: e.chieu === "vnd" ? e.soTien / tyGia : null,
      tyGia,
      ngay: v["vn.usd"].fecha,
      observaciones: ["Đây là tỷ giá trung tâm do Ngân hàng Nhà nước công bố. Ngân hàng thương mại mua, bán theo tỷ giá riêng của họ."],
    };
  },
  resultado: [
    { clave: "dong", etiqueta: "Số tiền bằng đồng", formato: "moneda", destacada: true },
    { clave: "usd", etiqueta: "Số tiền bằng đô la Mỹ", formato: "numero", decimales: 2, destacada: true },
    { clave: "tyGia", etiqueta: "Tỷ giá trung tâm (đồng cho 1 đô la Mỹ)", formato: "numero", decimales: 0 },
    { clave: "ngay", etiqueta: "Áp dụng cho ngày", formato: "fecha" },
  ],
});
