import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "vn.tinh-phep-nam",
  mercado: "vn",
  concepto: "vacaciones",
  slug: "tinh-phep-nam",
  estado: "publicado",
  requiere: {
    "vn.phep-binh-thuong": "numero",
    "vn.phep-nang-nhoc": "numero",
    "vn.phep-dac-biet": "numero",
    "vn.phep-tham-nien-nam": "numero",
  },
  campos: [
    {
      id: "loai",
      tipo: "opcion",
      etiqueta: "Điều kiện làm việc",
      opciones: [
        { valor: "binh-thuong", etiqueta: "Bình thường" },
        { valor: "nang-nhoc", etiqueta: "Chưa thành niên, khuyết tật, nghề nặng nhọc, độc hại" },
        { valor: "dac-biet", etiqueta: "Nghề đặc biệt nặng nhọc, độc hại" },
      ],
      porDefecto: "binh-thuong",
    },
    { id: "thang", tipo: "entero", etiqueta: "Tổng số tháng làm việc cho công ty", min: 1, max: 720, porDefecto: 72 },
    { id: "daNghi", tipo: "numero", etiqueta: "Số ngày đã nghỉ trong năm", min: 0, max: 60, porDefecto: 0 },
    { id: "luong", tipo: "moneda", etiqueta: "Lương tháng (để tính tiền ngày chưa nghỉ)", min: 0, porDefecto: 10400000 },
    { id: "ngayCong", tipo: "numero", etiqueta: "Số ngày làm việc bình thường trong tháng", min: 1, max: 31, porDefecto: 26 },
  ],
  calcular(e, v, { redondear }) {
    if (e.daNghi < 0) throw new ErrorEntrada("Số ngày đã nghỉ không thể là số âm.", "daNghi");
    const goc = e.loai === "dac-biet" ? v["vn.phep-dac-biet"] : e.loai === "nang-nhoc" ? v["vn.phep-nang-nhoc"] : v["vn.phep-binh-thuong"];
    const tangThem = e.thang >= 12 ? Math.floor(e.thang / 12 / v["vn.phep-tham-nien-nam"]) : 0;
    const soNgay = e.thang >= 12 ? goc + tangThem : (goc * e.thang) / 12;
    const conLai = Math.max(0, soNgay - e.daNghi);
    return {
      soNgay,
      tangThem,
      conLai,
      tienChuaNghi: redondear((conLai * e.luong) / e.ngayCong),
    };
  },
  resultado: [
    { clave: "soNgay", etiqueta: "Số ngày nghỉ hằng năm", formato: "dias", decimales: 1, destacada: true },
    { clave: "tangThem", etiqueta: "Ngày tăng thêm theo thâm niên", formato: "dias", decimales: 0, ocultarSiCero: true },
    { clave: "conLai", etiqueta: "Số ngày chưa nghỉ", formato: "dias", decimales: 1 },
    { clave: "tienChuaNghi", etiqueta: "Tiền của những ngày chưa nghỉ khi thôi việc", formato: "moneda" },
  ],
});
