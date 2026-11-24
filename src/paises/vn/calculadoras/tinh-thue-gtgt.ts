import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "vn.tinh-thue-gtgt",
  mercado: "vn",
  concepto: "iva",
  slug: "tinh-thue-gtgt",
  estado: "publicado",
  requiere: {
    "vn.gtgt-pho-thong": "numero",
    "vn.gtgt-uu-dai": "numero",
    "vn.gtgt-giam": "numero",
  },
  campos: [
    { id: "soTien", tipo: "moneda", etiqueta: "Số tiền", min: 0, porDefecto: 10000000 },
    {
      id: "chieu",
      tipo: "opcion",
      etiqueta: "Bạn đang có",
      opciones: [
        { valor: "chua-thue", etiqueta: "Giá chưa có thuế, cần cộng thuế" },
        { valor: "co-thue", etiqueta: "Giá đã có thuế, cần tách thuế" },
      ],
      porDefecto: "chua-thue",
    },
    {
      id: "nhom",
      tipo: "opcion",
      etiqueta: "Nhóm hàng hóa, dịch vụ",
      opciones: [
        { valor: "giam", etiqueta: "Nhóm được giảm thuế theo Nghị quyết 204/2025/QH15" },
        { valor: "pho-thong", etiqueta: "Nhóm không được giảm, thuế suất 10%" },
        { valor: "uu-dai", etiqueta: "Nhóm thuế suất 5%" },
      ],
      porDefecto: "giam",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.soTien <= 0) throw new ErrorEntrada("Nhập số tiền lớn hơn 0.", "soTien");
    const thueSuat = e.nhom === "giam" ? v["vn.gtgt-giam"] : e.nhom === "uu-dai" ? v["vn.gtgt-uu-dai"] : v["vn.gtgt-pho-thong"];
    const chuaThue = e.chieu === "chua-thue" ? e.soTien : e.soTien / (1 + thueSuat / 100);
    const thue = redondear(porcentaje(chuaThue, thueSuat));
    return {
      thue,
      thueSuat,
      chuaThue: redondear(chuaThue),
      coThue: redondear(chuaThue + thue),
    };
  },
  resultado: [
    { clave: "thue", etiqueta: "Tiền thuế GTGT", formato: "moneda", destacada: true },
    { clave: "thueSuat", etiqueta: "Thuế suất áp dụng", formato: "porcentaje", decimales: 0 },
    { clave: "chuaThue", etiqueta: "Giá chưa có thuế", formato: "moneda" },
    { clave: "coThue", etiqueta: "Giá đã có thuế", formato: "moneda" },
  ],
});
