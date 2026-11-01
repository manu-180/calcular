import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

// El VAT del hộ se fija por grupo de actividad (khoản 2 Điều 11 Luật GTGT). La lista del TNCN (khoản 3 Điều 7
// Luật 109) separa dos subgrupos que para el VAT son «dịch vụ».
const NHOM_GTGT: Record<string, string> = { "tai-san-dai-ly": "dich-vu", "noi-dung-so": "dich-vu" };

export default definirCalculadora({
  id: "vn.tinh-thue-ho-kinh-doanh",
  mercado: "vn",
  concepto: "regimen-simplificado",
  slug: "tinh-thue-ho-kinh-doanh",
  estado: "publicado",
  requiere: {
    "vn.hkd-nguong": "numero",
    "vn.hkd-nguong-3-ty": "numero",
    "vn.hkd-nguong-50-ty": "numero",
    "vn.hkd-ts-15": "numero",
    "vn.hkd-ts-17": "numero",
    "vn.hkd-ts-20": "numero",
    "vn.hkd-tncn": "mapa",
    "vn.hkd-gtgt": "mapa",
    "vn.hkd-giam-tncn": "numero",
    "vn.hkd-tran-giam": "numero",
  },
  campos: [
    { id: "doanhThu", tipo: "moneda", etiqueta: "Doanh thu cả năm", min: 0, porDefecto: 2000000000 },
    { id: "nganh", tipo: "opcion-dato", dato: "vn.hkd-tncn", etiqueta: "Ngành nghề kinh doanh", porDefecto: "dich-vu" },
    {
      id: "phuongPhap",
      tipo: "opcion",
      etiqueta: "Cách tính thuế TNCN",
      opciones: [
        { valor: "doanh-thu", etiqueta: "Theo thuế suất trên doanh thu" },
        { valor: "thu-nhap", etiqueta: "Theo thu nhập (doanh thu trừ chi phí)" },
      ],
      porDefecto: "doanh-thu",
    },
    { id: "chiPhi", tipo: "moneda", etiqueta: "Chi phí được trừ cả năm", min: 0, porDefecto: 0, visibleSi: { phuongPhap: ["thu-nhap"] } },
  ],
  calcular(e, v, { redondear }) {
    const nguong = v["vn.hkd-nguong"];
    if (e.doanhThu < 0) throw new ErrorEntrada("Doanh thu không thể là số âm.", "doanhThu");
    if (e.doanhThu <= nguong) {
      return {
        tongThue: 0,
        gtgt: 0,
        tncnGoc: 0,
        giam: 0,
        tncn: 0,
        conLai: redondear(e.doanhThu),
        observaciones: ["Doanh thu chưa vượt ngưỡng nên không phải nộp GTGT và TNCN. Bạn vẫn cần thông báo doanh thu thực tế với cơ quan thuế."],
      };
    }
    if (e.doanhThu > v["vn.hkd-nguong-3-ty"] && e.phuongPhap === "doanh-thu") {
      throw new ErrorEntrada("Doanh thu trên 3 tỷ đồng phải tính thuế theo thu nhập. Hãy chọn cách đó và nhập chi phí.", "phuongPhap");
    }
    const gtgt = porcentaje(e.doanhThu, enMapa(v["vn.hkd-gtgt"], NHOM_GTGT[e.nganh] ?? e.nganh));
    let tncnGoc: number;
    if (e.phuongPhap === "thu-nhap") {
      const thueSuat =
        e.doanhThu <= v["vn.hkd-nguong-3-ty"] ? v["vn.hkd-ts-15"] : e.doanhThu <= v["vn.hkd-nguong-50-ty"] ? v["vn.hkd-ts-17"] : v["vn.hkd-ts-20"];
      tncnGoc = porcentaje(Math.max(0, e.doanhThu - (e.chiPhi ?? 0)), thueSuat);
    } else {
      tncnGoc = porcentaje(e.doanhThu - nguong, enMapa(v["vn.hkd-tncn"], e.nganh));
    }
    const giam = e.doanhThu <= v["vn.hkd-tran-giam"] ? porcentaje(tncnGoc, v["vn.hkd-giam-tncn"]) : 0;
    const tncn = tncnGoc - giam;
    return {
      tongThue: redondear(gtgt + tncn),
      gtgt: redondear(gtgt),
      tncnGoc: redondear(tncnGoc),
      giam: redondear(giam),
      tncn: redondear(tncn),
      conLai: redondear(e.doanhThu - gtgt - tncn),
      observaciones: [] as string[],
    };
  },
  resultado: [
    { clave: "tongThue", etiqueta: "Tổng thuế phải nộp cả năm", formato: "moneda", destacada: true },
    { clave: "gtgt", etiqueta: "Thuế GTGT", formato: "moneda" },
    { clave: "tncnGoc", etiqueta: "Thuế TNCN trước khi giảm", formato: "moneda" },
    { clave: "giam", etiqueta: "Giảm theo Nghị quyết 43/2026/QH16", formato: "moneda", ocultarSiCero: true },
    { clave: "tncn", etiqueta: "Thuế TNCN phải nộp", formato: "moneda" },
    { clave: "conLai", etiqueta: "Doanh thu còn lại sau thuế", formato: "moneda" },
  ],
});
