import { definirCasos } from "@/motor/calculo";
import calculadora from "./tinh-tien-thai-san";

export default definirCasos(calculadora, [
  {
    nombre: "Sinh một con, lương 10 triệu",
    origen: { tipo: "recalculado", url: "https://vanban.chinhphu.vn/?pageid=27160&docid=211199", detalle: "6 × 10.000.000 = 60.000.000. Một lần: 2 × 2.530.000 = 5.060.000. Tổng 65.060.000." },
    fecha: "2026-11-01",
    entrada: { luong: 10000000, soCon: 1 },
    esperado: { tong: 65060000, thang: 6, motLan: 5060000 },
  },
  {
    nombre: "Sinh đôi",
    origen: { tipo: "recalculado", detalle: "7 × 10.000.000 = 70.000.000. Một lần: 2 × 2.530.000 × 2 = 10.120.000. Tổng 80.120.000." },
    fecha: "2026-11-01",
    entrada: { luong: 10000000, soCon: 2 },
    esperado: { tong: 80120000, thang: 7 },
  },
]);
