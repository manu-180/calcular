import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { baoHiemNguoiLaoDong, REQUISITOS_BH } from "../lib/nomina";

export default definirCalculadora({
  id: "vn.tinh-bao-hiem-xa-hoi",
  mercado: "vn",
  concepto: "aportes-seguridad-social",
  slug: "tinh-bao-hiem-xa-hoi",
  estado: "publicado",
  requiere: {
    ...REQUISITOS_BH,
    "vn.bhxh-om-dau-dn": "numero",
    "vn.bhxh-huu-tri-dn": "numero",
    "vn.tnld-dn": "numero",
    "vn.bhyt-dn": "numero",
    "vn.bhtn-dn": "numero",
  },
  campos: [
    { id: "luong", tipo: "moneda", etiqueta: "Lương đóng bảo hiểm mỗi tháng", min: 0, porDefecto: 20000000 },
    { id: "vung", tipo: "region", etiqueta: "Vùng lương tối thiểu của nơi làm việc", porDefecto: "vung-1" },
  ],
  calcular(e, v, { redondear }) {
    if (e.luong <= 0) throw new ErrorEntrada("Nhập lương đóng bảo hiểm lớn hơn 0.", "luong");
    const r = baoHiemNguoiLaoDong(e.luong, e.vung, v);
    const dnBhxh = porcentaje(r.canCuBhxh, v["vn.bhxh-om-dau-dn"] + v["vn.bhxh-huu-tri-dn"] + v["vn.tnld-dn"]);
    const dnBhyt = porcentaje(r.canCuBhxh, v["vn.bhyt-dn"]);
    const dnBhtn = porcentaje(r.canCuBhtn, v["vn.bhtn-dn"]);
    const dnTong = dnBhxh + dnBhyt + dnBhtn;
    return {
      nldTong: redondear(r.tong),
      nldBhxh: redondear(r.bhxh),
      nldBhyt: redondear(r.bhyt),
      nldBhtn: redondear(r.bhtn),
      dnTong: redondear(dnTong),
      dnBhxh: redondear(dnBhxh),
      dnBhyt: redondear(dnBhyt),
      dnBhtn: redondear(dnBhtn),
      canCuBhxh: redondear(r.canCuBhxh),
      canCuBhtn: redondear(r.canCuBhtn),
      tongCong: redondear(r.tong + dnTong),
    };
  },
  resultado: [
    { clave: "nldTong", etiqueta: "Bạn đóng mỗi tháng", formato: "moneda", destacada: true },
    { clave: "nldBhxh", etiqueta: "Bạn đóng BHXH", formato: "moneda" },
    { clave: "nldBhyt", etiqueta: "Bạn đóng BHYT", formato: "moneda" },
    { clave: "nldBhtn", etiqueta: "Bạn đóng BHTN", formato: "moneda" },
    { clave: "dnTong", etiqueta: "Doanh nghiệp đóng mỗi tháng", formato: "moneda" },
    { clave: "dnBhxh", etiqueta: "Doanh nghiệp đóng BHXH và TNLĐ", formato: "moneda" },
    { clave: "dnBhyt", etiqueta: "Doanh nghiệp đóng BHYT", formato: "moneda" },
    { clave: "dnBhtn", etiqueta: "Doanh nghiệp đóng BHTN", formato: "moneda" },
    { clave: "canCuBhxh", etiqueta: "Căn cứ đóng BHXH, BHYT sau khi tính trần", formato: "moneda" },
    { clave: "canCuBhtn", etiqueta: "Căn cứ đóng BHTN sau khi tính trần", formato: "moneda" },
    { clave: "tongCong", etiqueta: "Tổng cả hai bên đóng", formato: "moneda" },
  ],
});
