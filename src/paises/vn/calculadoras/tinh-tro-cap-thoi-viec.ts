import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { namTinhTroCap } from "../lib/tro-cap";

export default definirCalculadora({
  id: "vn.tinh-tro-cap-thoi-viec",
  mercado: "vn",
  concepto: "propio",
  slug: "tinh-tro-cap-thoi-viec",
  estado: "publicado",
  requiere: { "vn.thoi-viec-moi-nam": "numero" },
  campos: [
    { id: "luong", tipo: "moneda", etiqueta: "Lương bình quân 6 tháng cuối", min: 0, porDefecto: 20000000 },
    { id: "tongThang", tipo: "entero", etiqueta: "Tổng số tháng làm việc thực tế cho công ty", min: 0, max: 720, porDefecto: 124 },
    { id: "bhtnThang", tipo: "entero", etiqueta: "Số tháng đã đóng bảo hiểm thất nghiệp hoặc đã được chi trả trợ cấp", min: 0, max: 720, porDefecto: 72 },
  ],
  calcular(e, v, { redondear }) {
    if (e.luong <= 0) throw new ErrorEntrada("Nhập lương lớn hơn 0.", "luong");
    if (e.bhtnThang > e.tongThang) throw new ErrorEntrada("Số tháng đã đóng không thể lớn hơn tổng số tháng làm việc.", "bhtnThang");
    const thangTinh = e.tongThang - e.bhtnThang;
    const nam = e.tongThang >= 12 ? namTinhTroCap(thangTinh) : 0;
    return {
      troCap: redondear(nam * v["vn.thoi-viec-moi-nam"] * e.luong),
      nam,
      thangTinh,
      observaciones: e.tongThang < 12 ? ["Trợ cấp thôi việc dành cho người đã làm việc thường xuyên từ đủ 12 tháng trở lên."] : [],
    };
  },
  resultado: [
    { clave: "troCap", etiqueta: "Trợ cấp thôi việc", formato: "moneda", destacada: true },
    { clave: "nam", etiqueta: "Số năm được tính", formato: "anios", decimales: 1 },
    { clave: "thangTinh", etiqueta: "Số tháng còn lại để tính", formato: "meses", decimales: 0 },
  ],
});
