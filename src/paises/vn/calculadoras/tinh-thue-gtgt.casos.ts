import { definirCasos } from "@/motor/calculo";
import calculadora from "./tinh-thue-gtgt";

export default definirCasos(calculadora, [
  {
    nombre: "Cộng thuế 8%",
    origen: { tipo: "recalculado", url: "https://vanban.chinhphu.vn/?pageid=27160&docid=214209", detalle: "10.000.000 × 8% = 800.000; tổng 10.800.000." },
    fecha: "2026-11-01",
    entrada: { soTien: 10000000, chieu: "chua-thue", nhom: "giam" },
    esperado: { thue: 800000, coThue: 10800000, thueSuat: 8 },
  },
  {
    nombre: "Tách thuế 10%",
    origen: { tipo: "recalculado", detalle: "11.000.000 / 1,1 = 10.000.000; thuế 1.000.000." },
    fecha: "2026-11-01",
    entrada: { soTien: 11000000, chieu: "co-thue", nhom: "pho-thong" },
    esperado: { thue: 1000000, chuaThue: 10000000 },
  },
  {
    nombre: "Thuế suất 5%",
    origen: { tipo: "recalculado", detalle: "2.000.000 × 5% = 100.000." },
    fecha: "2026-11-01",
    entrada: { soTien: 2000000, chieu: "chua-thue", nhom: "uu-dai" },
    esperado: { thue: 100000, thueSuat: 5 },
  },
  {
    nombre: "Ngày cuối của mức giảm",
    origen: { tipo: "recalculado", detalle: "Nghị quyết 204/2025/QH15 có hiệu lực đến hết 31/12/2026." },
    fecha: "2026-12-31",
    entrada: { soTien: 10000000, chieu: "chua-thue", nhom: "giam" },
    esperado: { thueSuat: 8 },
  },
  {
    nombre: "Hết mức giảm",
    origen: { tipo: "recalculado", detalle: "Từ 1/1/2027 trở lại thuế suất 10% của khoản 3 Điều 9 Luật Thuế GTGT." },
    fecha: "2027-01-01",
    entrada: { soTien: 10000000, chieu: "chua-thue", nhom: "giam" },
    esperado: { thueSuat: 10, thue: 1000000 },
  },
]);
