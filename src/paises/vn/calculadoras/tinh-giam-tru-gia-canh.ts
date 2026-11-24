import { definirCalculadora } from "@/motor/calculo";
import { baoHiemNguoiLaoDong, REQUISITOS_BH, REQUISITOS_THUE } from "../lib/nomina";

export default definirCalculadora({
  id: "vn.tinh-giam-tru-gia-canh",
  mercado: "vn",
  concepto: "propio",
  slug: "tinh-giam-tru-gia-canh",
  estado: "publicado",
  requiere: { ...REQUISITOS_BH, ...REQUISITOS_THUE },
  campos: [
    { id: "phuThuoc", tipo: "entero", etiqueta: "Số người phụ thuộc", min: 0, max: 20, porDefecto: 1 },
    { id: "thang", tipo: "entero", etiqueta: "Số tháng tính giảm trừ", min: 1, max: 12, porDefecto: 12 },
    { id: "vung", tipo: "region", etiqueta: "Vùng lương tối thiểu của nơi làm việc", porDefecto: "vung-1" },
  ],
  calcular(e, v, { redondear }) {
    const banThan = v["vn.giam-tru-ban-than"];
    const moiNguoi = v["vn.giam-tru-phu-thuoc"];
    const thang = banThan + e.phuThuoc * moiNguoi;
    // Sueldo hasta el que no se paga impuesto: gross - seguros = deducción. Por mitades, por los topes de cotización.
    let bajo = 0;
    let alto = thang * 3;
    for (let i = 0; i < 80 && alto - bajo > 0.01; i++) {
      const medio = (bajo + alto) / 2;
      if (medio - baoHiemNguoiLaoDong(medio, e.vung, v).tong < thang) bajo = medio;
      else alto = medio;
    }
    return {
      tongKy: redondear(thang * e.thang),
      thang: redondear(thang),
      banThan: redondear(banThan * e.thang),
      phuThuoc: redondear(e.phuThuoc * moiNguoi * e.thang),
      grossKhongThue: redondear(alto),
    };
  },
  resultado: [
    { clave: "tongKy", etiqueta: "Tổng giảm trừ trong kỳ", formato: "moneda", destacada: true },
    { clave: "thang", etiqueta: "Giảm trừ mỗi tháng", formato: "moneda" },
    { clave: "banThan", etiqueta: "Phần của bản thân trong kỳ", formato: "moneda" },
    { clave: "phuThuoc", etiqueta: "Phần của người phụ thuộc trong kỳ", formato: "moneda", ocultarSiCero: true },
    { clave: "grossKhongThue", etiqueta: "Lương gross tháng chưa phải nộp thuế", formato: "moneda", ayuda: "Giả định đóng bảo hiểm trên toàn bộ lương và không có khoản miễn thuế." },
  ],
});
