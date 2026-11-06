import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { grossSangNet, REQUISITOS_BH, REQUISITOS_THUE } from "../lib/nomina";

export default definirCalculadora({
  id: "vn.tinh-luong-gross-net",
  mercado: "vn",
  concepto: "sueldo-neto",
  slug: "tinh-luong-gross-net",
  estado: "publicado",
  requiere: { ...REQUISITOS_BH, ...REQUISITOS_THUE },
  campos: [
    { id: "luong", tipo: "moneda", etiqueta: "Lương gross mỗi tháng", min: 0, porDefecto: 30000000 },
    { id: "phuThuoc", tipo: "entero", etiqueta: "Số người phụ thuộc đã đăng ký", min: 0, max: 20, porDefecto: 0 },
    { id: "vung", tipo: "region", etiqueta: "Vùng lương tối thiểu của nơi làm việc", porDefecto: "vung-1" },
    {
      id: "luongDong",
      tipo: "moneda",
      etiqueta: "Lương đóng bảo hiểm mỗi tháng (nếu khác lương gross)",
      min: 0,
      requerido: false,
      ayuda: "Để trống nếu công ty đóng bảo hiểm trên toàn bộ lương gross.",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.luong <= 0) throw new ErrorEntrada("Nhập lương gross lớn hơn 0.", "luong");
    if (e.luongDong !== null && e.luongDong > e.luong) throw new ErrorEntrada("Lương đóng bảo hiểm không thể lớn hơn lương gross.", "luongDong");
    const r = grossSangNet(e.luong, e.luongDong, e.vung, e.phuThuoc, v);
    const net = redondear(r.net);
    return {
      net,
      bhxh: redondear(r.bhxh),
      bhyt: redondear(r.bhyt),
      bhtn: redondear(r.bhtn),
      tongBaoHiem: redondear(r.tong),
      giamTru: redondear(r.giamTru),
      tinhThue: redondear(r.tinhThue),
      thue: redondear(r.thue),
      tyLeNhan: (net / e.luong) * 100,
    };
  },
  resultado: [
    { clave: "net", etiqueta: "Lương net nhận về mỗi tháng", formato: "moneda", destacada: true },
    { clave: "bhxh", etiqueta: "Bảo hiểm xã hội", formato: "moneda" },
    { clave: "bhyt", etiqueta: "Bảo hiểm y tế", formato: "moneda" },
    { clave: "bhtn", etiqueta: "Bảo hiểm thất nghiệp", formato: "moneda" },
    { clave: "tongBaoHiem", etiqueta: "Tổng bảo hiểm bị trừ", formato: "moneda" },
    { clave: "giamTru", etiqueta: "Giảm trừ gia cảnh", formato: "moneda" },
    { clave: "tinhThue", etiqueta: "Thu nhập tính thuế", formato: "moneda" },
    { clave: "thue", etiqueta: "Thuế TNCN", formato: "moneda" },
    { clave: "tyLeNhan", etiqueta: "Tỷ lệ net so với gross", formato: "porcentaje", decimales: 1 },
  ],
  mundo: { bruto: "luong", periodoBruto: "mes", neto: "net", periodoNeto: "mes" },
});
