import type { Novedad } from "@/motor/tipos";

const VB = "https://vanban.chinhphu.vn/?pageid=27160&docid=";

export const novedades: readonly Novedad[] = [
  {
    id: "vn.nd-398-2026",
    fecha: "2026-11-01",
    titulo: "Giảm 30% thuế TNCN cho hộ kinh doanh năm 2026 và 2027",
    texto:
      "Nghị quyết số 43/2026/QH16 giảm 30% số thuế TNCN phải nộp trên thu nhập kinh doanh của cá nhân cư trú có doanh thu năm không quá 10 tỷ đồng. Công cụ tính thuế hộ kinh doanh đã trừ khoản này.",
    vigenteDesde: "2026-08-24",
    calculadoras: ["vn.tinh-thue-ho-kinh-doanh"],
    fuente: { organismo: "Quốc hội", titulo: "Nghị quyết số 43/2026/QH16", url: `${VB}219330`, tipo: "primaria", verificadoEl: "2026-11-01" },
  },
  {
    id: "vn.muc-tham-chieu-7-2026",
    fecha: "2026-11-01",
    titulo: "Lương cơ sở tăng lên 2.530.000 đồng, trần đóng BHXH tăng theo",
    texto:
      "Từ ngày 1/7/2026, lương cơ sở là 2.530.000 đồng. Khi chưa bãi bỏ lương cơ sở thì mức tham chiếu bằng mức này, nên trần đóng BHXH và trợ cấp một lần khi sinh con đều tăng.",
    vigenteDesde: "2026-07-01",
    calculadoras: ["vn.tinh-luong-gross-net", "vn.tinh-bao-hiem-xa-hoi", "vn.tinh-chi-phi-luong-doanh-nghiep", "vn.tinh-tien-thai-san"],
    fuente: { organismo: "Chính phủ", titulo: "Nghị định số 161/2026/NĐ-CP", url: `${VB}218107`, tipo: "primaria", verificadoEl: "2026-11-01" },
  },
  {
    id: "vn.nguong-1-ty",
    fecha: "2026-11-01",
    titulo: "Ngưỡng doanh thu không phải nộp thuế tăng lên 1 tỷ đồng",
    texto:
      "Nghị định số 141/2026/NĐ-CP đổi ngưỡng 500 triệu đồng thành 01 tỷ đồng, có hiệu lực từ ngày 1/1/2026. Mức này áp dụng cho hộ kinh doanh và cá nhân cho thuê bất động sản.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["vn.tinh-thue-ho-kinh-doanh", "vn.tinh-thue-cho-thue-nha"],
    fuente: { organismo: "Chính phủ", titulo: "Nghị định số 141/2026/NĐ-CP", url: `${VB}217960`, tipo: "primaria", verificadoEl: "2026-11-01" },
  },
  {
    id: "vn.bieu-thue-5-bac",
    fecha: "2026-11-01",
    titulo: "Biểu thuế tiền lương còn 5 bậc, giảm trừ gia cảnh tăng",
    texto:
      "Luật số 109/2025/QH15 đưa biểu thuế lũy tiến về 5 bậc, áp dụng cho tiền lương từ kỳ tính thuế năm 2026. Giảm trừ là 15,5 triệu đồng mỗi tháng cho bản thân và 6,2 triệu đồng mỗi tháng cho mỗi người phụ thuộc.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["vn.tinh-thue-tncn", "vn.tinh-luong-gross-net", "vn.tinh-luong-net-sang-gross", "vn.tinh-giam-tru-gia-canh"],
    fuente: { organismo: "Quốc hội", titulo: "Luật Thuế thu nhập cá nhân số 109/2025/QH15", url: `${VB}216495`, tipo: "primaria", verificadoEl: "2026-11-01" },
  },
  {
    id: "vn.luong-toi-thieu-2026",
    fecha: "2026-11-01",
    titulo: "Lương tối thiểu vùng mới từ 1/1/2026",
    texto: "Nghị định số 293/2025/NĐ-CP đặt mức tháng từ 3.700.000 đồng ở vùng IV đến 5.310.000 đồng ở vùng I. Mức này cũng quyết định trần đóng BHTN và trần trợ cấp thất nghiệp.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["vn.luong-toi-thieu-vung", "vn.tinh-bao-hiem-that-nghiep"],
    fuente: { organismo: "Chính phủ", titulo: "Nghị định số 293/2025/NĐ-CP", url: `${VB}215832`, tipo: "primaria", verificadoEl: "2026-11-01" },
  },
];
