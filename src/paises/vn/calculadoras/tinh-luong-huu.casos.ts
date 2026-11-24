import { definirCasos } from "@/motor/calculo";
import calculadora from "./tinh-luong-huu";

export default definirCasos(calculadora, [
  {
    nombre: "Nữ 25 năm",
    origen: { tipo: "recalculado", url: "https://vanban.chinhphu.vn/?pageid=27160&docid=211199", detalle: "45% + 10 × 2% = 65%. 65% × 20.000.000 = 13.000.000." },
    fecha: "2026-11-01",
    entrada: { gioiTinh: "nu", namDong: 25, luong: 20000000 },
    esperado: { luongHuu: 13000000, tyLe: 65 },
  },
  {
    nombre: "Nam 30 năm",
    origen: { tipo: "recalculado", detalle: "45% + 10 × 2% = 65%." },
    fecha: "2026-11-01",
    entrada: { gioiTinh: "nam", namDong: 30, luong: 20000000 },
    esperado: { tyLe: 65 },
  },
  {
    nombre: "Nam 17 năm",
    origen: { tipo: "recalculado", detalle: "40% + 2 × 1% = 42%. 42% × 20.000.000 = 8.400.000." },
    fecha: "2026-11-01",
    entrada: { gioiTinh: "nam", namDong: 17, luong: 20000000 },
    esperado: { luongHuu: 8400000, tyLe: 42 },
  },
  {
    nombre: "Nữ 35 năm chạm mức tối đa và có trợ cấp một lần",
    origen: { tipo: "recalculado", detalle: "45% + 20 × 2% = 85%, giới hạn 75%. Vượt 30 năm là 5 năm: 5 × 0,5 × 20.000.000 = 50.000.000." },
    fecha: "2026-11-01",
    entrada: { gioiTinh: "nu", namDong: 35, luong: 20000000 },
    esperado: { luongHuu: 15000000, tyLe: 75, motLan: 50000000 },
  },
  {
    nombre: "Chưa đủ 15 năm",
    origen: { tipo: "recalculado", detalle: "Điều 64 yêu cầu từ đủ 15 năm." },
    fecha: "2026-11-01",
    entrada: { gioiTinh: "nam", namDong: 14, luong: 20000000 },
    esperaError: true,
  },
]);
