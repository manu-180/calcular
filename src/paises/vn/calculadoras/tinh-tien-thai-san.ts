import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "vn.tinh-tien-thai-san",
  mercado: "vn",
  concepto: "propio",
  slug: "tinh-tien-thai-san",
  estado: "publicado",
  requiere: {
    "vn.thai-san-thang": "numero",
    "vn.thai-san-them": "numero",
    "vn.thai-san-ty-le": "numero",
    "vn.thai-san-mot-lan": "numero",
    "vn.muc-tham-chieu": "numero",
  },
  campos: [
    { id: "luong", tipo: "moneda", etiqueta: "Lương đóng BHXH bình quân 6 tháng cuối", min: 0, porDefecto: 10000000 },
    { id: "soCon", tipo: "entero", etiqueta: "Số con sinh trong lần này", min: 1, max: 6, porDefecto: 1 },
  ],
  calcular(e, v, { redondear }) {
    if (e.luong <= 0) throw new ErrorEntrada("Nhập lương lớn hơn 0.", "luong");
    const thang = v["vn.thai-san-thang"] + (e.soCon - 1) * v["vn.thai-san-them"];
    const moiThang = porcentaje(e.luong, v["vn.thai-san-ty-le"]);
    const motLan = v["vn.thai-san-mot-lan"] * v["vn.muc-tham-chieu"] * e.soCon;
    const tienNghi = moiThang * thang;
    return {
      tong: redondear(tienNghi + motLan),
      thang,
      moiThang: redondear(moiThang),
      tienNghi: redondear(tienNghi),
      motLan: redondear(motLan),
    };
  },
  resultado: [
    { clave: "tong", etiqueta: "Tổng tiền thai sản", formato: "moneda", destacada: true },
    { clave: "thang", etiqueta: "Thời gian nghỉ", formato: "meses", decimales: 0 },
    { clave: "moiThang", etiqueta: "Trợ cấp mỗi tháng", formato: "moneda" },
    { clave: "tienNghi", etiqueta: "Trợ cấp cả thời gian nghỉ", formato: "moneda" },
    { clave: "motLan", etiqueta: "Trợ cấp một lần khi sinh", formato: "moneda" },
  ],
});
