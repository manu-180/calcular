import { definirCasos } from "@/motor/calculo";
import calculadora from "./tinh-thue-ho-kinh-doanh";

export default definirCasos(calculadora, [
  {
    nombre: "Dịch vụ 2 tỷ, tính trên doanh thu",
    origen: {
      tipo: "recalculado",
      url: "https://vanban.chinhphu.vn/?pageid=27160&docid=217960",
      detalle: "GTGT 2 tỷ × 5% = 100.000.000. TNCN (2 tỷ - 1 tỷ) × 2% = 20.000.000; giảm 30% = 6.000.000; còn 14.000.000. Tổng 114.000.000.",
    },
    fecha: "2026-11-01",
    entrada: { doanhThu: 2000000000, nganh: "dich-vu", phuongPhap: "doanh-thu", chiPhi: null },
    esperado: { tongThue: 114000000, gtgt: 100000000, tncn: 14000000, giam: 6000000 },
  },
  {
    nombre: "Hàng hóa 2 tỷ",
    origen: { tipo: "recalculado", detalle: "GTGT 2 tỷ × 1% = 20.000.000. TNCN 1 tỷ × 0,5% = 5.000.000; giảm 1.500.000; còn 3.500.000." },
    fecha: "2026-11-01",
    entrada: { doanhThu: 2000000000, nganh: "hang-hoa", phuongPhap: "doanh-thu", chiPhi: null },
    esperado: { gtgt: 20000000, tncn: 3500000 },
  },
  {
    nombre: "Dịch vụ 2 tỷ, tính theo thu nhập",
    origen: { tipo: "recalculado", detalle: "Thu nhập 500.000.000 × 15% = 75.000.000; giảm 22.500.000; còn 52.500.000." },
    fecha: "2026-11-01",
    entrada: { doanhThu: 2000000000, nganh: "dich-vu", phuongPhap: "thu-nhap", chiPhi: 1500000000 },
    esperado: { tncn: 52500000 },
  },
  {
    nombre: "Hàng hóa 5 tỷ, thuế suất 17%",
    origen: { tipo: "recalculado", detalle: "Thu nhập 1 tỷ × 17% = 170.000.000; giảm 51.000.000; còn 119.000.000. GTGT 50.000.000." },
    fecha: "2026-11-01",
    entrada: { doanhThu: 5000000000, nganh: "hang-hoa", phuongPhap: "thu-nhap", chiPhi: 4000000000 },
    esperado: { tncn: 119000000, gtgt: 50000000 },
  },
  {
    nombre: "12 tỷ không còn được giảm",
    origen: { tipo: "recalculado", detalle: "Thu nhập 2 tỷ × 17% = 340.000.000; vượt 10 tỷ nên không giảm. GTGT khác 2% = 240.000.000." },
    fecha: "2026-11-01",
    entrada: { doanhThu: 12000000000, nganh: "khac", phuongPhap: "thu-nhap", chiPhi: 10000000000 },
    esperado: { tncn: 340000000, giam: 0, gtgt: 240000000 },
  },
  {
    nombre: "Dưới ngưỡng 1 tỷ",
    origen: { tipo: "oficial", url: "https://vanban.chinhphu.vn/?pageid=27160&docid=217960", detalle: "Nghị định 141/2026/NĐ-CP đổi ngưỡng thành 01 tỷ đồng." },
    fecha: "2026-11-01",
    entrada: { doanhThu: 800000000, nganh: "dich-vu", phuongPhap: "doanh-thu", chiPhi: null },
    esperado: { tongThue: 0 },
  },
  {
    nombre: "Trên 3 tỷ không được tính theo doanh thu",
    origen: { tipo: "recalculado", detalle: "Điểm b khoản 5 Điều 4 Nghị định 68/2026/NĐ-CP." },
    fecha: "2026-11-01",
    entrada: { doanhThu: 4000000000, nganh: "dich-vu", phuongPhap: "doanh-thu", chiPhi: null },
    esperaError: true,
  },
]);
