import { definirCasos } from "@/motor/calculo";
import calculadora from "./tinh-giam-tru-gia-canh";

export default definirCasos(calculadora, [
  {
    nombre: "Một người phụ thuộc, cả năm",
    origen: { tipo: "recalculado", url: "https://vanban.chinhphu.vn/?pageid=27160&docid=215927", detalle: "15.500.000 + 6.200.000 = 21.700.000 mỗi tháng; × 12 = 260.400.000. Gross không thuế: 21.700.000 / 0,895 = 24.245.810." },
    fecha: "2026-11-01",
    entrada: { phuThuoc: 1, thang: 12, vung: "vung-1" },
    esperado: { tongKy: 260400000, thang: 21700000, grossKhongThue: 24245810 },
    tolerancia: 1,
  },
  {
    nombre: "Không người phụ thuộc",
    origen: { tipo: "recalculado", detalle: "15.500.000 / 0,895 = 17.318.436." },
    fecha: "2026-11-01",
    entrada: { phuThuoc: 0, thang: 1, vung: "vung-1" },
    esperado: { tongKy: 15500000, grossKhongThue: 17318436 },
    tolerancia: 1,
  },
]);
