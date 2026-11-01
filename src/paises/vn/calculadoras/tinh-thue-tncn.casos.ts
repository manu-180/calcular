import { definirCasos } from "@/motor/calculo";
import calculadora from "./tinh-thue-tncn";

export default definirCasos(calculadora, [
  {
    nombre: "Theo tháng, 30 triệu, bảo hiểm 3.150.000",
    origen: { tipo: "recalculado", url: "https://vanban.chinhphu.vn/?pageid=27160&docid=216495", detalle: "Tính thuế 11.350.000. Bậc 1: 10.000.000 × 5% = 500.000. Bậc 2: 1.350.000 × 10% = 135.000. Tổng 635.000." },
    fecha: "2026-11-01",
    entrada: { ky: "thang", thuNhap: 30000000, baoHiem: 3150000, phuThuoc: 0 },
    esperado: { thue: 635000, bac: 2, thueSuatBac: 10 },
  },
  {
    nombre: "Theo năm khớp với bảng năm",
    origen: { tipo: "recalculado", detalle: "Thu nhập năm 600.000.000, bảo hiểm 63.000.000, giảm trừ 186.000.000, tính thuế 351.000.000. Bảng năm: 120.000.000 × 5% + 231.000.000 × 10% = 6.000.000 + 23.100.000 = 29.100.000." },
    fecha: "2026-11-01",
    entrada: { ky: "nam", thuNhap: 600000000, baoHiem: 63000000, phuThuoc: 0 },
    esperado: { thue: 29100000, tinhThue: 351000000 },
  },
  {
    nombre: "Thu nhập thấp hơn giảm trừ",
    origen: { tipo: "recalculado", detalle: "15.000.000 nhỏ hơn 15.500.000 nên không có thuế." },
    fecha: "2026-11-01",
    entrada: { ky: "thang", thuNhap: 15000000, baoHiem: 1575000, phuThuoc: 0 },
    esperado: { thue: 0, bac: 0 },
  },
  {
    nombre: "Bậc cao nhất",
    origen: { tipo: "recalculado", detalle: "Tính thuế 124.500.000: 500.000 + 2.000.000 + 6.000.000 + 12.000.000 + 24.500.000 × 35% = 8.575.000. Tổng 29.075.000." },
    fecha: "2026-11-01",
    entrada: { ky: "thang", thuNhap: 140000000, baoHiem: 0, phuThuoc: 0 },
    esperado: { thue: 29075000, bac: 5, thueSuatBac: 35 },
  },
]);
