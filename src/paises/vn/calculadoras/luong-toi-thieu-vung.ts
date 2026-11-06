import { definirCalculadora, ErrorEntrada, porRegion } from "@/motor/calculo";

export default definirCalculadora({
  id: "vn.luong-toi-thieu-vung",
  mercado: "vn",
  concepto: "salario-minimo",
  slug: "luong-toi-thieu-vung",
  estado: "publicado",
  requiere: {
    "vn.lttv-thang": "numero-por-region",
    "vn.lttv-gio": "numero-por-region",
  },
  campos: [
    { id: "vung", tipo: "region", etiqueta: "Vùng của nơi doanh nghiệp hoạt động", porDefecto: "vung-1" },
    { id: "luong", tipo: "moneda", etiqueta: "Lương tháng của bạn (không bắt buộc)", min: 0, requerido: false },
  ],
  calcular(e, v) {
    if (e.luong !== null && e.luong < 0) throw new ErrorEntrada("Lương không thể là số âm.", "luong");
    const thang = porRegion(v["vn.lttv-thang"], e.vung);
    const gio = porRegion(v["vn.lttv-gio"], e.vung);
    const chenhLech = e.luong === null ? null : e.luong - thang;
    return {
      thang,
      gio,
      chenhLech,
      observaciones:
        chenhLech !== null && chenhLech < 0
          ? ["Lương tháng này thấp hơn mức tối thiểu của vùng khi làm đủ thời giờ bình thường trong tháng."]
          : [],
    };
  },
  resultado: [
    { clave: "thang", etiqueta: "Lương tối thiểu tháng", formato: "moneda", destacada: true },
    { clave: "gio", etiqueta: "Lương tối thiểu giờ", formato: "moneda" },
    { clave: "chenhLech", etiqueta: "Lương của bạn so với mức tối thiểu", formato: "moneda" },
  ],
});
