import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "vn.tinh-lam-phat",
  mercado: "vn",
  concepto: "inflacion",
  slug: "tinh-lam-phat",
  estado: "publicado",
  requiere: { "vn.cpi-nam": "serie", "vn.cpi-thang": "serie", "vn.cpi-binh-quan": "serie" },
  campos: [
    { id: "soTien", tipo: "moneda", etiqueta: "Số tiền hôm nay", min: 0, porDefecto: 10000000 },
    { id: "soNam", tipo: "entero", etiqueta: "Số năm", min: 1, max: 50, porDefecto: 1 },
    { id: "tyLe", tipo: "porcentaje", etiqueta: "Lạm phát giả định mỗi năm (để trống để dùng CPI mới nhất)", min: -10, max: 100, requerido: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.soTien <= 0) throw new ErrorEntrada("Nhập số tiền lớn hơn 0.", "soTien");
    const cpi = v["vn.cpi-nam"];
    const tyLe = e.tyLe ?? cpi.valor;
    const heSo = Math.pow(1 + tyLe / 100, e.soNam);
    return {
      tuongDuong: redondear(e.soTien * heSo),
      tangThem: redondear(e.soTien * (heSo - 1)),
      sucMua: redondear(e.soTien / heSo),
      tyLe,
      cpiNam: cpi.valor,
      cpiThang: v["vn.cpi-thang"].valor,
      cpiBinhQuan: v["vn.cpi-binh-quan"].valor,
      thangCpi: cpi.fecha,
    };
  },
  resultado: [
    { clave: "tuongDuong", etiqueta: "Số tiền tương đương sau kỳ này", formato: "moneda", destacada: true },
    { clave: "tangThem", etiqueta: "Phần tăng do lạm phát", formato: "moneda" },
    { clave: "sucMua", etiqueta: "Sức mua còn lại của số tiền hôm nay", formato: "moneda" },
    { clave: "tyLe", etiqueta: "Lạm phát mỗi năm đang dùng", formato: "porcentaje", decimales: 2 },
    { clave: "cpiNam", etiqueta: "CPI so với cùng kỳ năm trước", formato: "porcentaje", decimales: 2 },
    { clave: "cpiThang", etiqueta: "CPI so với tháng trước", formato: "porcentaje", decimales: 2 },
    { clave: "cpiBinhQuan", etiqueta: "CPI bình quân từ đầu năm", formato: "porcentaje", decimales: 2 },
    { clave: "thangCpi", etiqueta: "Tháng của số liệu CPI", formato: "fecha" },
  ],
});
