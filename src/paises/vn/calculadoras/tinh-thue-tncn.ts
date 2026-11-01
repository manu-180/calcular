import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { REQUISITOS_THUE, thueThang } from "../lib/nomina";

export default definirCalculadora({
  id: "vn.tinh-thue-tncn",
  mercado: "vn",
  concepto: "impuesto-renta",
  slug: "tinh-thue-tncn",
  estado: "publicado",
  requiere: REQUISITOS_THUE,
  campos: [
    {
      id: "ky",
      tipo: "opcion",
      etiqueta: "Kỳ tính",
      opciones: [
        { valor: "thang", etiqueta: "Theo tháng" },
        { valor: "nam", etiqueta: "Theo năm (quyết toán)" },
      ],
      porDefecto: "thang",
    },
    { id: "thuNhap", tipo: "moneda", etiqueta: "Tổng thu nhập chịu thuế trong kỳ", min: 0, porDefecto: 30000000 },
    { id: "baoHiem", tipo: "moneda", etiqueta: "Bảo hiểm bắt buộc đã đóng trong kỳ", min: 0, porDefecto: 3150000 },
    { id: "phuThuoc", tipo: "entero", etiqueta: "Số người phụ thuộc", min: 0, max: 20, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.thuNhap <= 0) throw new ErrorEntrada("Nhập thu nhập lớn hơn 0.", "thuNhap");
    if (e.baoHiem > e.thuNhap) throw new ErrorEntrada("Tiền bảo hiểm không thể lớn hơn thu nhập.", "baoHiem");
    // La tabla anual del Điều 9 son los mismos tramos mensuales por 12: se calcula el mes promedio.
    const thang = e.ky === "nam" ? 12 : 1;
    const t = thueThang((e.thuNhap - e.baoHiem) / thang, e.phuThuoc, v);
    const escala = v["vn.bieu-tncn"];
    const bac = t.tinhThue <= 0 ? 0 : escala.findIndex((f) => f.hasta === null || t.tinhThue <= f.hasta) + 1;
    return {
      thue: redondear(t.thue * thang),
      giamTru: redondear(t.giamTru * thang),
      tinhThue: redondear(t.tinhThue * thang),
      bac,
      thueSuatBac: bac > 0 ? escala[bac - 1].tasa : 0,
      thueSuatThuc: e.thuNhap > 0 ? ((t.thue * thang) / e.thuNhap) * 100 : 0,
    };
  },
  resultado: [
    { clave: "thue", etiqueta: "Thuế TNCN phải nộp trong kỳ", formato: "moneda", destacada: true },
    { clave: "giamTru", etiqueta: "Giảm trừ gia cảnh", formato: "moneda" },
    { clave: "tinhThue", etiqueta: "Thu nhập tính thuế", formato: "moneda" },
    { clave: "bac", etiqueta: "Bậc thuế cao nhất", formato: "numero", decimales: 0 },
    { clave: "thueSuatBac", etiqueta: "Thuế suất của bậc đó", formato: "porcentaje", decimales: 0 },
    { clave: "thueSuatThuc", etiqueta: "Thuế suất thực tế trên thu nhập", formato: "porcentaje", decimales: 2 },
  ],
});
