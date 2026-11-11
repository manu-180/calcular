import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "vn.tinh-bhxh-mot-lan",
  mercado: "vn",
  concepto: "propio",
  slug: "tinh-bhxh-mot-lan",
  estado: "publicado",
  requiere: {
    "vn.bhxh-1-lan-truoc-2014": "numero",
    "vn.bhxh-1-lan-tu-2014": "numero",
  },
  campos: [
    { id: "luong", tipo: "moneda", etiqueta: "Mức bình quân tiền lương tháng đóng BHXH", min: 0, porDefecto: 10000000 },
    { id: "namTruoc", tipo: "entero", etiqueta: "Số năm đóng trước năm 2014", min: 0, max: 50, porDefecto: 3 },
    { id: "namSau", tipo: "entero", etiqueta: "Số năm đóng từ năm 2014 trở đi", min: 0, max: 50, porDefecto: 5 },
  ],
  calcular(e, v, { redondear }) {
    if (e.luong <= 0) throw new ErrorEntrada("Nhập mức bình quân tiền lương lớn hơn 0.", "luong");
    if (e.namTruoc + e.namSau === 0) throw new ErrorEntrada("Nhập ít nhất một năm đóng BHXH.", "namSau");
    const thang = e.namTruoc * v["vn.bhxh-1-lan-truoc-2014"] + e.namSau * v["vn.bhxh-1-lan-tu-2014"];
    return {
      tong: redondear(thang * e.luong),
      thang,
      phanTruoc: redondear(e.namTruoc * v["vn.bhxh-1-lan-truoc-2014"] * e.luong),
      phanSau: redondear(e.namSau * v["vn.bhxh-1-lan-tu-2014"] * e.luong),
    };
  },
  resultado: [
    { clave: "tong", etiqueta: "Tiền BHXH một lần", formato: "moneda", destacada: true },
    { clave: "thang", etiqueta: "Số tháng lương bình quân được nhận", formato: "meses", decimales: 1 },
    { clave: "phanTruoc", etiqueta: "Phần đóng trước năm 2014", formato: "moneda", ocultarSiCero: true },
    { clave: "phanSau", etiqueta: "Phần đóng từ năm 2014", formato: "moneda", ocultarSiCero: true },
  ],
});
