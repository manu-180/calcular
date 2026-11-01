import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "vn.tinh-luong-huu",
  mercado: "vn",
  concepto: "jubilacion",
  slug: "tinh-luong-huu",
  estado: "publicado",
  requiere: {
    "vn.huu-nam-nam": "numero",
    "vn.huu-nam-nu": "numero",
    "vn.huu-nam-toi-thieu": "numero",
    "vn.huu-ty-le-goc": "numero",
    "vn.huu-ty-le-tang": "numero",
    "vn.huu-ty-le-toi-da": "numero",
    "vn.huu-nam-15-goc": "numero",
    "vn.huu-nam-15-tang": "numero",
    "vn.huu-mot-lan-nam": "numero",
    "vn.huu-mot-lan-nu": "numero",
    "vn.huu-mot-lan-he-so": "numero",
  },
  campos: [
    {
      id: "gioiTinh",
      tipo: "opcion",
      etiqueta: "Giới tính",
      opciones: [
        { valor: "nu", etiqueta: "Nữ" },
        { valor: "nam", etiqueta: "Nam" },
      ],
      porDefecto: "nu",
    },
    { id: "namDong", tipo: "entero", etiqueta: "Số năm đóng BHXH", min: 0, max: 60, porDefecto: 25 },
    { id: "luong", tipo: "moneda", etiqueta: "Mức bình quân tiền lương đóng BHXH", min: 0, porDefecto: 20000000 },
  ],
  calcular(e, v, { redondear }) {
    if (e.luong <= 0) throw new ErrorEntrada("Nhập mức bình quân tiền lương lớn hơn 0.", "luong");
    if (e.namDong < v["vn.huu-nam-toi-thieu"]) throw new ErrorEntrada("Cần đóng BHXH từ đủ 15 năm trở lên để hưởng lương hưu.", "namDong");
    const namGoc = e.gioiTinh === "nam" ? v["vn.huu-nam-nam"] : v["vn.huu-nam-nu"];
    const tyLe =
      e.namDong >= namGoc
        ? Math.min(v["vn.huu-ty-le-goc"] + (e.namDong - namGoc) * v["vn.huu-ty-le-tang"], v["vn.huu-ty-le-toi-da"])
        : v["vn.huu-nam-15-goc"] + (e.namDong - v["vn.huu-nam-toi-thieu"]) * v["vn.huu-nam-15-tang"];
    const namMotLan = e.gioiTinh === "nam" ? v["vn.huu-mot-lan-nam"] : v["vn.huu-mot-lan-nu"];
    const namVuot = Math.max(0, e.namDong - namMotLan);
    return {
      luongHuu: redondear(porcentaje(e.luong, tyLe)),
      tyLe,
      namVuot,
      motLan: redondear(namVuot * v["vn.huu-mot-lan-he-so"] * e.luong),
    };
  },
  resultado: [
    { clave: "luongHuu", etiqueta: "Lương hưu mỗi tháng", formato: "moneda", destacada: true },
    { clave: "tyLe", etiqueta: "Tỷ lệ hưởng", formato: "porcentaje", decimales: 0 },
    { clave: "namVuot", etiqueta: "Số năm đóng cao hơn mốc trợ cấp một lần", formato: "anios", decimales: 0, ocultarSiCero: true },
    { clave: "motLan", etiqueta: "Trợ cấp một lần khi nghỉ hưu", formato: "moneda", ocultarSiCero: true },
  ],
});
