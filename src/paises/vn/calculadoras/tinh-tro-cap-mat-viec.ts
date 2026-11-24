import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { namTinhTroCap } from "../lib/tro-cap";

export default definirCalculadora({
  id: "vn.tinh-tro-cap-mat-viec",
  mercado: "vn",
  concepto: "indemnizacion-despido",
  slug: "tinh-tro-cap-mat-viec",
  estado: "publicado",
  requiere: { "vn.mat-viec-moi-nam": "numero", "vn.mat-viec-toi-thieu": "numero" },
  campos: [
    { id: "luong", tipo: "moneda", etiqueta: "Lương bình quân 6 tháng cuối", min: 0, porDefecto: 20000000 },
    { id: "tongThang", tipo: "entero", etiqueta: "Tổng số tháng làm việc thực tế cho công ty", min: 0, max: 720, porDefecto: 124 },
    { id: "bhtnThang", tipo: "entero", etiqueta: "Số tháng đã đóng bảo hiểm thất nghiệp hoặc đã được chi trả trợ cấp", min: 0, max: 720, porDefecto: 72 },
  ],
  calcular(e, v, { redondear }) {
    if (e.luong <= 0) throw new ErrorEntrada("Nhập lương lớn hơn 0.", "luong");
    if (e.bhtnThang > e.tongThang) throw new ErrorEntrada("Số tháng đã đóng không thể lớn hơn tổng số tháng làm việc.", "bhtnThang");
    if (e.tongThang < 12) {
      return { troCap: 0, nam: 0, thangLuong: 0, observaciones: ["Trợ cấp mất việc dành cho người đã làm việc thường xuyên từ đủ 12 tháng trở lên."] };
    }
    const nam = namTinhTroCap(e.tongThang - e.bhtnThang);
    const thangLuong = Math.max(nam * v["vn.mat-viec-moi-nam"], v["vn.mat-viec-toi-thieu"]);
    return { troCap: redondear(thangLuong * e.luong), nam, thangLuong, observaciones: [] as string[] };
  },
  resultado: [
    { clave: "troCap", etiqueta: "Trợ cấp mất việc làm", formato: "moneda", destacada: true },
    { clave: "nam", etiqueta: "Số năm được tính", formato: "anios", decimales: 1 },
    { clave: "thangLuong", etiqueta: "Số tháng lương được trả", formato: "meses", decimales: 1 },
  ],
});
