import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "vn.tinh-tien-lam-them-gio",
  mercado: "vn",
  concepto: "horas-extra",
  slug: "tinh-tien-lam-them-gio",
  estado: "publicado",
  requiere: {
    "vn.them-gio-ngay-thuong": "numero",
    "vn.them-gio-ngay-nghi": "numero",
    "vn.them-gio-ngay-le": "numero",
    "vn.lam-dem": "numero",
    "vn.them-gio-dem": "numero",
  },
  campos: [
    { id: "luong", tipo: "moneda", etiqueta: "Lương tháng", min: 0, porDefecto: 10400000 },
    { id: "gioChuan", tipo: "numero", etiqueta: "Số giờ làm việc bình thường trong tháng", min: 1, max: 400, porDefecto: 208 },
    { id: "gioThuong", tipo: "numero", etiqueta: "Giờ làm thêm ban ngày, ngày thường", min: 0, porDefecto: 10 },
    { id: "gioNghi", tipo: "numero", etiqueta: "Giờ làm thêm ban ngày, ngày nghỉ hằng tuần", min: 0, porDefecto: 0 },
    { id: "gioLe", tipo: "numero", etiqueta: "Giờ làm thêm ban ngày, ngày lễ, tết", min: 0, porDefecto: 0 },
    { id: "demThuong", tipo: "numero", etiqueta: "Giờ làm thêm ban đêm, ngày thường", min: 0, porDefecto: 0 },
    { id: "coThemBanNgay", tipo: "si-no", etiqueta: "Ngày đó có làm thêm ban ngày trước khi làm đêm", porDefecto: false },
    { id: "demNghi", tipo: "numero", etiqueta: "Giờ làm thêm ban đêm, ngày nghỉ hằng tuần", min: 0, porDefecto: 0 },
    { id: "demLe", tipo: "numero", etiqueta: "Giờ làm thêm ban đêm, ngày lễ, tết", min: 0, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.luong <= 0) throw new ErrorEntrada("Nhập lương lớn hơn 0.", "luong");
    const gio = e.luong / e.gioChuan;
    const thuong = v["vn.them-gio-ngay-thuong"];
    const nghi = v["vn.them-gio-ngay-nghi"];
    const le = v["vn.them-gio-ngay-le"];
    // khoản 3 Điều 98 BLLĐ y Điều 57 NĐ 145: el recargo de noche se suma, y el 20 % va sobre el jornal de día de
    // ese día (100 % si ese día no hizo extra de día, 150 % si sí).
    const dem = v["vn.lam-dem"];
    const them = v["vn.them-gio-dem"];
    const heDemThuong = thuong + dem + porcentaje(e.coThemBanNgay ? thuong : 100, them);
    const heDemNghi = nghi + dem + porcentaje(nghi, them);
    const heDemLe = le + dem + porcentaje(le, them);
    const banNgay = porcentaje(gio, thuong) * e.gioThuong + porcentaje(gio, nghi) * e.gioNghi + porcentaje(gio, le) * e.gioLe;
    const banDem = porcentaje(gio, heDemThuong) * e.demThuong + porcentaje(gio, heDemNghi) * e.demNghi + porcentaje(gio, heDemLe) * e.demLe;
    return {
      tong: redondear(banNgay + banDem),
      gio: redondear(gio),
      banNgay: redondear(banNgay),
      banDem: redondear(banDem),
      heDemThuong,
      heDemNghi,
      heDemLe,
    };
  },
  resultado: [
    { clave: "tong", etiqueta: "Tiền làm thêm giờ", formato: "moneda", destacada: true },
    { clave: "gio", etiqueta: "Tiền lương một giờ bình thường", formato: "moneda" },
    { clave: "banNgay", etiqueta: "Phần làm thêm ban ngày", formato: "moneda", ocultarSiCero: true },
    { clave: "banDem", etiqueta: "Phần làm thêm ban đêm", formato: "moneda", ocultarSiCero: true },
    { clave: "heDemThuong", etiqueta: "Hệ số ban đêm, ngày thường", formato: "porcentaje", decimales: 0 },
    { clave: "heDemNghi", etiqueta: "Hệ số ban đêm, ngày nghỉ hằng tuần", formato: "porcentaje", decimales: 0 },
    { clave: "heDemLe", etiqueta: "Hệ số ban đêm, ngày lễ, tết", formato: "porcentaje", decimales: 0 },
  ],
});
