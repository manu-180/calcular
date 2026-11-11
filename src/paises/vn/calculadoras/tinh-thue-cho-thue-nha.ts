import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "vn.tinh-thue-cho-thue-nha",
  mercado: "vn",
  concepto: "propio",
  slug: "tinh-thue-cho-thue-nha",
  estado: "publicado",
  requiere: {
    "vn.hkd-nguong": "numero",
    "vn.hkd-gtgt": "mapa",
    "vn.nha-tncn": "numero",
  },
  campos: [
    { id: "tienThue", tipo: "moneda", etiqueta: "Tiền thuê mỗi tháng", min: 0, porDefecto: 120000000 },
    { id: "soThang", tipo: "entero", etiqueta: "Số tháng cho thuê trong năm", min: 1, max: 12, porDefecto: 12 },
  ],
  calcular(e, v, { redondear }) {
    if (e.tienThue <= 0) throw new ErrorEntrada("Nhập tiền thuê lớn hơn 0.", "tienThue");
    const doanhThu = e.tienThue * e.soThang;
    const nguong = v["vn.hkd-nguong"];
    const vuot = doanhThu > nguong;
    const gtgt = vuot ? porcentaje(doanhThu, enMapa(v["vn.hkd-gtgt"], "dich-vu")) : 0;
    const tncn = vuot ? porcentaje(doanhThu - nguong, v["vn.nha-tncn"]) : 0;
    return {
      tongThue: redondear(gtgt + tncn),
      doanhThu: redondear(doanhThu),
      gtgt: redondear(gtgt),
      tncn: redondear(tncn),
      conLai: redondear(doanhThu - gtgt - tncn),
      observaciones: vuot
        ? ["Chưa trừ khoản giảm 30% của Nghị quyết số 43/2026/QH16. Hãy hỏi cơ quan thuế về việc áp dụng khoản giảm này với thu nhập cho thuê bất động sản."]
        : ["Doanh thu chưa vượt ngưỡng nên chưa phải nộp GTGT và TNCN."],
    };
  },
  resultado: [
    { clave: "tongThue", etiqueta: "Tổng thuế phải nộp cả năm", formato: "moneda", destacada: true },
    { clave: "doanhThu", etiqueta: "Doanh thu cho thuê cả năm", formato: "moneda" },
    { clave: "gtgt", etiqueta: "Thuế GTGT", formato: "moneda" },
    { clave: "tncn", etiqueta: "Thuế TNCN", formato: "moneda" },
    { clave: "conLai", etiqueta: "Còn lại sau thuế", formato: "moneda" },
  ],
});
