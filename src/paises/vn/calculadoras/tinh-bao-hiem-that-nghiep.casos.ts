import { definirCasos } from "@/motor/calculo";
import calculadora from "./tinh-bao-hiem-that-nghiep";

export default definirCasos(calculadora, [
  {
    nombre: "15 triệu, đóng 40 tháng",
    origen: { tipo: "recalculado", url: "https://vanban.chinhphu.vn/?pageid=27160&docid=214560", detalle: "60% × 15.000.000 = 9.000.000. 40 tháng chưa đủ thêm 12 tháng so với 36, nên 3 tháng. Tổng 27.000.000." },
    fecha: "2026-11-01",
    entrada: { luong: 15000000, thangDong: 40, vung: "vung-1" },
    esperado: { tong: 27000000, moiThang: 9000000, soThang: 3 },
  },
  {
    nombre: "Đủ 48 tháng được 4 tháng",
    origen: { tipo: "recalculado", detalle: "36 tháng đầu được 3 tháng, đủ thêm 12 tháng được thêm 1 tháng." },
    fecha: "2026-11-01",
    entrada: { luong: 10000000, thangDong: 48, vung: "vung-2" },
    esperado: { soThang: 4, tong: 24000000 },
  },
  {
    nombre: "Chạm trần vùng I",
    origen: { tipo: "recalculado", detalle: "60% × 60.000.000 = 36.000.000, trần 5 × 5.310.000 = 26.550.000." },
    fecha: "2026-11-01",
    entrada: { luong: 60000000, thangDong: 24, vung: "vung-1" },
    esperado: { moiThang: 26550000, tong: 79650000 },
  },
  {
    nombre: "Tối đa 12 tháng",
    origen: { tipo: "recalculado", detalle: "Đóng 300 tháng vẫn chỉ được 12 tháng." },
    fecha: "2026-11-01",
    entrada: { luong: 10000000, thangDong: 300, vung: "vung-3" },
    esperado: { soThang: 12 },
  },
  {
    nombre: "Chưa đủ 12 tháng",
    origen: { tipo: "recalculado", detalle: "Điểm b khoản 1 Điều 38 Luật Việc làm." },
    fecha: "2026-11-01",
    entrada: { luong: 10000000, thangDong: 11, vung: "vung-3" },
    esperado: { tong: 0, soThang: 0 },
  },
]);
