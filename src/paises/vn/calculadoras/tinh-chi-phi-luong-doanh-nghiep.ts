import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { canCuDong } from "../lib/nomina";

export default definirCalculadora({
  id: "vn.tinh-chi-phi-luong-doanh-nghiep",
  mercado: "vn",
  concepto: "costo-empleador",
  slug: "tinh-chi-phi-luong-doanh-nghiep",
  estado: "publicado",
  requiere: {
    "vn.muc-tham-chieu": "numero",
    "vn.he-so-tran-bhxh": "numero",
    "vn.he-so-tran-bhtn": "numero",
    "vn.lttv-thang": "numero-por-region",
    "vn.bhxh-om-dau-dn": "numero",
    "vn.bhxh-huu-tri-dn": "numero",
    "vn.tnld-dn": "numero",
    "vn.bhyt-dn": "numero",
    "vn.bhtn-dn": "numero",
    "vn.cong-doan": "numero",
  },
  campos: [
    { id: "luong", tipo: "moneda", etiqueta: "Lương gross mỗi tháng", min: 0, porDefecto: 30000000 },
    { id: "vung", tipo: "region", etiqueta: "Vùng lương tối thiểu của nơi làm việc", porDefecto: "vung-1" },
    { id: "soNguoi", tipo: "entero", etiqueta: "Số nhân viên cùng mức lương", min: 1, max: 100000, porDefecto: 1 },
  ],
  calcular(e, v, { redondear }) {
    if (e.luong <= 0) throw new ErrorEntrada("Nhập lương gross lớn hơn 0.", "luong");
    const { canCuBhxh, canCuBhtn } = canCuDong(e.luong, e.vung, v);
    const bhxh = porcentaje(canCuBhxh, v["vn.bhxh-om-dau-dn"] + v["vn.bhxh-huu-tri-dn"]);
    const tnld = porcentaje(canCuBhxh, v["vn.tnld-dn"]);
    const bhyt = porcentaje(canCuBhxh, v["vn.bhyt-dn"]);
    const bhtn = porcentaje(canCuBhtn, v["vn.bhtn-dn"]);
    const congDoan = porcentaje(canCuBhxh, v["vn.cong-doan"]);
    const dongThem = bhxh + tnld + bhyt + bhtn + congDoan;
    const moiNguoi = e.luong + dongThem;
    return {
      tongChiPhi: redondear(moiNguoi * e.soNguoi),
      moiNguoi: redondear(moiNguoi),
      bhxh: redondear(bhxh),
      tnld: redondear(tnld),
      bhyt: redondear(bhyt),
      bhtn: redondear(bhtn),
      congDoan: redondear(congDoan),
      dongThem: redondear(dongThem),
      tyLe: (dongThem / e.luong) * 100,
    };
  },
  resultado: [
    { clave: "tongChiPhi", etiqueta: "Tổng chi phí lương mỗi tháng", formato: "moneda", destacada: true },
    { clave: "moiNguoi", etiqueta: "Chi phí cho một nhân viên", formato: "moneda" },
    { clave: "bhxh", etiqueta: "Bảo hiểm xã hội", formato: "moneda" },
    { clave: "tnld", etiqueta: "Bảo hiểm tai nạn lao động, bệnh nghề nghiệp", formato: "moneda" },
    { clave: "bhyt", etiqueta: "Bảo hiểm y tế", formato: "moneda" },
    { clave: "bhtn", etiqueta: "Bảo hiểm thất nghiệp", formato: "moneda" },
    { clave: "congDoan", etiqueta: "Kinh phí công đoàn", formato: "moneda" },
    { clave: "dongThem", etiqueta: "Doanh nghiệp đóng thêm cho một nhân viên", formato: "moneda" },
    { clave: "tyLe", etiqueta: "Tỷ lệ đóng thêm so với lương", formato: "porcentaje", decimales: 1 },
  ],
});
