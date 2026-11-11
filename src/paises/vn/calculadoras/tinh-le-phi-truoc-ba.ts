import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "vn.tinh-le-phi-truoc-ba",
  mercado: "vn",
  concepto: "propio",
  slug: "tinh-le-phi-truoc-ba",
  estado: "publicado",
  requiere: {
    "vn.tb-nha-dat": "numero",
    "vn.tb-xe-may": "numero",
    "vn.tb-xe-may-lan-2": "numero",
    "vn.tb-o-to": "numero",
    "vn.tb-o-to-tang-toi-da": "numero",
    "vn.tb-pickup-he-so": "numero",
    "vn.tb-o-to-lan-2": "numero",
    "vn.tb-o-to-dien": "numero",
  },
  campos: [
    {
      id: "loai",
      tipo: "opcion",
      etiqueta: "Loại tài sản",
      opciones: [
        { valor: "nha-dat", etiqueta: "Nhà, đất" },
        { valor: "xe-may", etiqueta: "Xe máy, nộp lần đầu" },
        { valor: "xe-may-2", etiqueta: "Xe máy, nộp từ lần thứ hai" },
        { valor: "o-to", etiqueta: "Ô tô từ 9 chỗ trở xuống, nộp lần đầu" },
        { valor: "pickup", etiqueta: "Pick-up chở hàng cabin kép, tải VAN, nộp lần đầu" },
        { valor: "o-to-2", etiqueta: "Ô tô, nộp từ lần thứ hai" },
        { valor: "o-to-dien", etiqueta: "Ô tô điện chạy pin, nộp lần đầu" },
      ],
      porDefecto: "nha-dat",
    },
    { id: "gia", tipo: "moneda", etiqueta: "Giá tính lệ phí trước bạ", min: 0, porDefecto: 3000000000 },
    { id: "mucTinh", tipo: "porcentaje", etiqueta: "Mức thu ô tô tại tỉnh, thành phố của bạn (%)", min: 0, max: 100, porDefecto: 10, visibleSi: { loai: ["o-to", "pickup"] } },
  ],
  calcular(e, v, { redondear }) {
    if (e.gia <= 0) throw new ErrorEntrada("Nhập giá tính lệ phí lớn hơn 0.", "gia");
    let tyLe: number;
    if (e.loai === "o-to" || e.loai === "pickup") {
      const chung = v["vn.tb-o-to"];
      const toiDa = chung + porcentaje(chung, v["vn.tb-o-to-tang-toi-da"]);
      const muc = e.mucTinh ?? chung;
      if (muc < chung || muc > toiDa) throw new ErrorEntrada(`Mức thu của tỉnh phải từ ${chung}% đến ${toiDa}%.`, "mucTinh");
      tyLe = e.loai === "pickup" ? porcentaje(muc, v["vn.tb-pickup-he-so"]) : muc;
    } else if (e.loai === "nha-dat") tyLe = v["vn.tb-nha-dat"];
    else if (e.loai === "xe-may") tyLe = v["vn.tb-xe-may"];
    else if (e.loai === "xe-may-2") tyLe = v["vn.tb-xe-may-lan-2"];
    else if (e.loai === "o-to-2") tyLe = v["vn.tb-o-to-lan-2"];
    else tyLe = v["vn.tb-o-to-dien"];
    return { lePhi: redondear(porcentaje(e.gia, tyLe)), tyLe };
  },
  resultado: [
    { clave: "lePhi", etiqueta: "Lệ phí trước bạ phải nộp", formato: "moneda", destacada: true },
    { clave: "tyLe", etiqueta: "Mức thu áp dụng", formato: "porcentaje", decimales: 1 },
  ],
});
