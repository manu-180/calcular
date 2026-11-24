import { definirCasos } from "@/motor/calculo";
import calculadora from "./tinh-thue-cho-thue-nha";

export default definirCasos(calculadora, [
  {
    nombre: "120 triệu mỗi tháng, 12 tháng",
    origen: { tipo: "recalculado", url: "https://vanban.chinhphu.vn/?pageid=27160&docid=217111", detalle: "Doanh thu 1.440.000.000. GTGT 5% = 72.000.000. TNCN (1.440.000.000 - 1.000.000.000) × 5% = 22.000.000. Tổng 94.000.000." },
    fecha: "2026-11-01",
    entrada: { tienThue: 120000000, soThang: 12 },
    esperado: { tongThue: 94000000, gtgt: 72000000, tncn: 22000000 },
  },
  {
    nombre: "Đúng ngưỡng 1 tỷ",
    origen: { tipo: "recalculado", detalle: "Từ 01 tỷ đồng trở xuống không phải nộp thuế." },
    fecha: "2026-11-01",
    entrada: { tienThue: 100000000, soThang: 10 },
    esperado: { tongThue: 0, doanhThu: 1000000000 },
  },
  {
    nombre: "Dưới ngưỡng",
    origen: { tipo: "recalculado", detalle: "20.000.000 × 12 = 240.000.000, không phải nộp thuế." },
    fecha: "2026-11-01",
    entrada: { tienThue: 20000000, soThang: 12 },
    esperado: { tongThue: 0, conLai: 240000000 },
  },
]);
