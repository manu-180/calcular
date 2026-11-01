import { definirCasos } from "@/motor/calculo";
import calculadora from "./tinh-le-phi-truoc-ba";

export default definirCasos(calculadora, [
  {
    nombre: "Nhà đất 3 tỷ",
    origen: { tipo: "recalculado", url: "https://vanban.chinhphu.vn/?pageid=27160&docid=205090", detalle: "3.000.000.000 × 0,5% = 15.000.000." },
    fecha: "2026-11-01",
    entrada: { loai: "nha-dat", gia: 3000000000, mucTinh: null },
    esperado: { lePhi: 15000000, tyLe: 0.5 },
  },
  {
    nombre: "Ô tô 800 triệu, tỉnh thu 12%",
    origen: { tipo: "recalculado", url: "https://vanban.chinhphu.vn/?pageid=27160&docid=214313", detalle: "800.000.000 × 12% = 96.000.000." },
    fecha: "2026-11-01",
    entrada: { loai: "o-to", gia: 800000000, mucTinh: 12 },
    esperado: { lePhi: 96000000 },
  },
  {
    nombre: "Pick-up cabin kép 600 triệu",
    origen: { tipo: "recalculado", detalle: "10% × 60% = 6%. 600.000.000 × 6% = 36.000.000." },
    fecha: "2026-11-01",
    entrada: { loai: "pickup", gia: 600000000, mucTinh: 10 },
    esperado: { lePhi: 36000000, tyLe: 6 },
  },
  {
    nombre: "Xe máy 50 triệu",
    origen: { tipo: "recalculado", detalle: "50.000.000 × 2% = 1.000.000." },
    fecha: "2026-11-01",
    entrada: { loai: "xe-may", gia: 50000000, mucTinh: null },
    esperado: { lePhi: 1000000 },
  },
  {
    nombre: "Xe máy lần hai",
    origen: { tipo: "recalculado", detalle: "50.000.000 × 1% = 500.000." },
    fecha: "2026-11-01",
    entrada: { loai: "xe-may-2", gia: 50000000, mucTinh: null },
    esperado: { lePhi: 500000 },
  },
  {
    nombre: "Ô tô lần hai",
    origen: { tipo: "recalculado", detalle: "500.000.000 × 2% = 10.000.000." },
    fecha: "2026-11-01",
    entrada: { loai: "o-to-2", gia: 500000000, mucTinh: null },
    esperado: { lePhi: 10000000 },
  },
  {
    nombre: "Ô tô điện",
    origen: { tipo: "oficial", url: "https://vanban.chinhphu.vn/?pageid=27160&docid=212984", detalle: "Mức thu 0% đến hết 28/2/2027." },
    fecha: "2026-11-01",
    entrada: { loai: "o-to-dien", gia: 1000000000, mucTinh: null },
    esperado: { lePhi: 0 },
  },
  {
    nombre: "Ô tô điện theo nghị định mới",
    origen: { tipo: "oficial", url: "https://vanban.chinhphu.vn/?pageid=27160&docid=218368", detalle: "Mức thu 0% từ 1/3/2027 đến hết 31/12/2030." },
    fecha: "2027-03-01",
    entrada: { loai: "o-to-dien", gia: 1000000000, mucTinh: null },
    esperado: { lePhi: 0 },
  },
  {
    nombre: "Mức tỉnh vượt 15%",
    origen: { tipo: "recalculado", detalle: "Điểm a khoản 5 Điều 8: tăng không quá 50% của 10%." },
    fecha: "2026-11-01",
    entrada: { loai: "o-to", gia: 800000000, mucTinh: 16 },
    esperaError: true,
  },
]);
