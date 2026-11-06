import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "vn.thoi-han-bao-truoc-nghi-viec",
  mercado: "vn",
  concepto: "preaviso",
  slug: "thoi-han-bao-truoc-nghi-viec",
  estado: "publicado",
  requiere: {
    "vn.bao-truoc-vo-han": "numero",
    "vn.bao-truoc-12-36": "numero",
    "vn.bao-truoc-duoi-12": "numero",
    "vn.bao-truoc-dac-thu": "numero",
  },
  campos: [
    {
      id: "loai",
      tipo: "opcion",
      etiqueta: "Loại hợp đồng lao động",
      opciones: [
        { valor: "khong-thoi-han", etiqueta: "Không xác định thời hạn" },
        { valor: "tu-12-den-36", etiqueta: "Xác định thời hạn từ 12 đến 36 tháng" },
        { valor: "duoi-12", etiqueta: "Xác định thời hạn dưới 12 tháng" },
      ],
      porDefecto: "khong-thoi-han",
    },
    { id: "dacThu", tipo: "si-no", etiqueta: "Ngành nghề đặc thù (hàng không, thuyền viên, người quản lý doanh nghiệp)", porDefecto: false },
    { id: "daBao", tipo: "entero", etiqueta: "Số ngày bạn đã báo trước (không bắt buộc)", min: 0, max: 365, requerido: false },
    { id: "luong", tipo: "moneda", etiqueta: "Lương theo hợp đồng mỗi tháng", min: 0, porDefecto: 26000000 },
    { id: "ngayCong", tipo: "numero", etiqueta: "Số ngày làm việc bình thường trong tháng", min: 1, max: 31, porDefecto: 26 },
  ],
  calcular(e, v, { redondear }) {
    if (e.luong < 0) throw new ErrorEntrada("Lương không thể là số âm.", "luong");
    const dacThu = e.dacThu && e.loai !== "duoi-12";
    const ngay = dacThu
      ? v["vn.bao-truoc-dac-thu"]
      : e.loai === "khong-thoi-han"
        ? v["vn.bao-truoc-vo-han"]
        : e.loai === "tu-12-den-36"
          ? v["vn.bao-truoc-12-36"]
          : v["vn.bao-truoc-duoi-12"];
    const thieu = e.daBao === null ? null : Math.max(0, ngay - e.daBao);
    const boiThuong = thieu === null ? null : thieu > 0 ? redondear(e.luong / 2 + (thieu * e.luong) / e.ngayCong) : 0;
    const observaciones: string[] = [];
    if (e.dacThu && e.loai === "duoi-12") observaciones.push("Với ngành nghề đặc thù, hợp đồng dưới 12 tháng phải báo trước ít nhất một phần tư thời hạn hợp đồng.");
    if (e.loai === "duoi-12" && !e.dacThu) observaciones.push("Đây là ngày làm việc, không phải ngày theo lịch.");
    return { ngay, thieu, boiThuong, observaciones };
  },
  resultado: [
    { clave: "ngay", etiqueta: "Thời hạn báo trước tối thiểu", formato: "dias", decimales: 0, destacada: true },
    { clave: "thieu", etiqueta: "Số ngày báo trước còn thiếu", formato: "dias", decimales: 0 },
    { clave: "boiThuong", etiqueta: "Tiền bồi thường nếu nghỉ khi chưa đủ thời hạn", formato: "moneda" },
  ],
});
