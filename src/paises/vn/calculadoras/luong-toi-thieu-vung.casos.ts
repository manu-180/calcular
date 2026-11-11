import { definirCasos } from "@/motor/calculo";
import calculadora from "./luong-toi-thieu-vung";

export default definirCasos(calculadora, [
  {
    nombre: "Vùng I",
    origen: { tipo: "oficial", url: "https://vanban.chinhphu.vn/?pageid=27160&docid=215832", detalle: "Bảng tại khoản 1 Điều 3 Nghị định số 293/2025/NĐ-CP." },
    fecha: "2026-11-01",
    entrada: { vung: "vung-1", luong: null },
    esperado: { thang: 5310000, gio: 25500 },
  },
  {
    nombre: "Vùng II",
    origen: { tipo: "oficial", url: "https://vanban.chinhphu.vn/?pageid=27160&docid=215832", detalle: "Bảng tại khoản 1 Điều 3 Nghị định số 293/2025/NĐ-CP." },
    fecha: "2026-11-01",
    entrada: { vung: "vung-2", luong: null },
    esperado: { thang: 4730000, gio: 22700 },
  },
  {
    nombre: "Vùng III",
    origen: { tipo: "oficial", url: "https://vanban.chinhphu.vn/?pageid=27160&docid=215832", detalle: "Bảng tại khoản 1 Điều 3 Nghị định số 293/2025/NĐ-CP." },
    fecha: "2026-11-01",
    entrada: { vung: "vung-3", luong: 5000000 },
    esperado: { thang: 4140000, gio: 20000, chenhLech: 860000 },
  },
  {
    nombre: "Vùng IV, lương thấp hơn mức tối thiểu",
    origen: { tipo: "recalculado", detalle: "3.500.000 - 3.700.000 = -200.000." },
    fecha: "2026-11-01",
    entrada: { vung: "vung-4", luong: 3500000 },
    esperado: { thang: 3700000, gio: 17800, chenhLech: -200000 },
  },
]);
