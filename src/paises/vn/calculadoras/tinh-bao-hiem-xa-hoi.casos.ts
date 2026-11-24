import { definirCasos } from "@/motor/calculo";
import calculadora from "./tinh-bao-hiem-xa-hoi";

export default definirCasos(calculadora, [
  {
    nombre: "20 triệu, vùng I",
    origen: {
      tipo: "recalculado",
      url: "https://vanban.chinhphu.vn/?pageid=27160&docid=211199",
      detalle: "Người lao động 10,5% = 2.100.000. Doanh nghiệp: BHXH và TNLĐ 17,5% = 3.500.000, BHYT 3% = 600.000, BHTN 1% = 200.000, tổng 4.300.000.",
    },
    fecha: "2026-11-01",
    entrada: { luong: 20000000, vung: "vung-1" },
    esperado: { nldTong: 2100000, dnTong: 4300000, tongCong: 6400000 },
  },
  {
    nombre: "120 triệu chạm cả hai trần ở vùng IV",
    origen: { tipo: "recalculado", detalle: "Trần BHXH 50.600.000; trần BHTN 20 × 3.700.000 = 74.000.000. Người lao động 4.048.000 + 759.000 + 740.000 = 5.547.000." },
    fecha: "2026-11-01",
    entrada: { luong: 120000000, vung: "vung-4" },
    esperado: { nldTong: 5547000, canCuBhxh: 50600000, canCuBhtn: 74000000 },
  },
]);
