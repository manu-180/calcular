import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { grossSangNet, netSangGross, REQUISITOS_BH, REQUISITOS_THUE } from "../lib/nomina";

export default definirCalculadora({
  id: "vn.tinh-luong-net-sang-gross",
  mercado: "vn",
  concepto: "propio",
  slug: "tinh-luong-net-sang-gross",
  estado: "publicado",
  requiere: { ...REQUISITOS_BH, ...REQUISITOS_THUE },
  campos: [
    { id: "net", tipo: "moneda", etiqueta: "Lương net muốn nhận mỗi tháng", min: 0, porDefecto: 26215000 },
    { id: "phuThuoc", tipo: "entero", etiqueta: "Số người phụ thuộc đã đăng ký", min: 0, max: 20, porDefecto: 0 },
    { id: "vung", tipo: "region", etiqueta: "Vùng lương tối thiểu của nơi làm việc", porDefecto: "vung-1" },
  ],
  calcular(e, v, { redondear }) {
    if (e.net <= 0) throw new ErrorEntrada("Nhập lương net lớn hơn 0.", "net");
    const gross = redondear(netSangGross(e.net, e.vung, e.phuThuoc, v));
    const r = grossSangNet(gross, null, e.vung, e.phuThuoc, v);
    return {
      gross,
      tongBaoHiem: redondear(r.tong),
      thue: redondear(r.thue),
      chenhLech: redondear(gross - e.net),
    };
  },
  resultado: [
    { clave: "gross", etiqueta: "Lương gross cần thỏa thuận", formato: "moneda", destacada: true },
    { clave: "tongBaoHiem", etiqueta: "Bảo hiểm người lao động đóng", formato: "moneda" },
    { clave: "thue", etiqueta: "Thuế TNCN", formato: "moneda" },
    { clave: "chenhLech", etiqueta: "Chênh lệch giữa gross và net", formato: "moneda" },
  ],
});
