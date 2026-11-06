import { definirCasos } from "@/motor/calculo";
import calculadora from "./tinh-bhxh-mot-lan";

export default definirCasos(calculadora, [
  {
    nombre: "3 năm trước 2014, 5 năm từ 2014",
    origen: { tipo: "recalculado", url: "https://vanban.chinhphu.vn/?pageid=27160&docid=211199", detalle: "3 × 1,5 + 5 × 2 = 14,5 tháng. 14,5 × 10.000.000 = 145.000.000." },
    fecha: "2026-11-01",
    entrada: { luong: 10000000, namTruoc: 3, namSau: 5 },
    esperado: { tong: 145000000, thang: 14.5 },
  },
  {
    nombre: "Chỉ đóng từ 2014",
    origen: { tipo: "recalculado", detalle: "8 × 2 = 16 tháng. 16 × 8.000.000 = 128.000.000." },
    fecha: "2026-11-01",
    entrada: { luong: 8000000, namTruoc: 0, namSau: 8 },
    esperado: { tong: 128000000 },
  },
  {
    nombre: "Không có năm đóng",
    origen: { tipo: "recalculado", detalle: "Thiếu dữ liệu." },
    fecha: "2026-11-01",
    entrada: { luong: 8000000, namTruoc: 0, namSau: 0 },
    esperaError: true,
  },
]);
