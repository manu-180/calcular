import { definirCalculadora, ErrorEntrada, porcentaje, porRegion } from "@/motor/calculo";

export default definirCalculadora({
  id: "vn.tinh-bao-hiem-that-nghiep",
  mercado: "vn",
  concepto: "propio",
  slug: "tinh-bao-hiem-that-nghiep",
  estado: "publicado",
  requiere: {
    "vn.tctn-ty-le": "numero",
    "vn.tctn-tran": "numero",
    "vn.tctn-thang-goc": "numero",
    "vn.tctn-thang-toi-da": "numero",
    "vn.tctn-thang-toi-thieu-dong": "numero",
    "vn.lttv-thang": "numero-por-region",
  },
  campos: [
    { id: "luong", tipo: "moneda", etiqueta: "Lương đóng BHTN bình quân 6 tháng cuối", min: 0, porDefecto: 15000000 },
    { id: "thangDong", tipo: "entero", etiqueta: "Số tháng đã đóng bảo hiểm thất nghiệp", min: 0, max: 600, porDefecto: 40 },
    { id: "vung", tipo: "region", etiqueta: "Vùng của nơi làm việc cuối cùng", porDefecto: "vung-1" },
  ],
  calcular(e, v, { redondear }) {
    if (e.luong <= 0) throw new ErrorEntrada("Nhập lương lớn hơn 0.", "luong");
    const tran = v["vn.tctn-tran"] * porRegion(v["vn.lttv-thang"], e.vung);
    const moiThang = Math.min(porcentaje(e.luong, v["vn.tctn-ty-le"]), tran);
    if (e.thangDong < v["vn.tctn-thang-toi-thieu-dong"]) {
      return { tong: 0, moiThang: 0, soThang: 0, tran: redondear(tran), observaciones: ["Bạn cần đóng từ đủ 12 tháng trở lên trong 24 tháng trước khi nghỉ để được hưởng."] };
    }
    const them = e.thangDong > 36 ? Math.floor((e.thangDong - 36) / 12) : 0;
    const soThang = Math.min(v["vn.tctn-thang-goc"] + them, v["vn.tctn-thang-toi-da"]);
    return { tong: redondear(moiThang * soThang), moiThang: redondear(moiThang), soThang, tran: redondear(tran), observaciones: [] as string[] };
  },
  resultado: [
    { clave: "tong", etiqueta: "Tổng trợ cấp thất nghiệp", formato: "moneda", destacada: true },
    { clave: "moiThang", etiqueta: "Mức hưởng mỗi tháng", formato: "moneda" },
    { clave: "soThang", etiqueta: "Số tháng được hưởng", formato: "meses", decimales: 0 },
    { clave: "tran", etiqueta: "Mức hưởng tối đa mỗi tháng của vùng", formato: "moneda" },
  ],
});
