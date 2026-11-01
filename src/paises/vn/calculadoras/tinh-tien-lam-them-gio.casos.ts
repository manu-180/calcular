import { definirCasos } from "@/motor/calculo";
import calculadora from "./tinh-tien-lam-them-gio";

const NGHI = { gioNghi: 0, gioLe: 0, demThuong: 0, coThemBanNgay: false, demNghi: 0, demLe: 0 };

export default definirCasos(calculadora, [
  {
    nombre: "10 giờ ngày thường",
    origen: { tipo: "recalculado", url: "https://vanban.chinhphu.vn/?pageid=27160&docid=198540", detalle: "10.400.000 / 208 = 50.000. 50.000 × 150% × 10 = 750.000." },
    fecha: "2026-11-01",
    entrada: { luong: 10400000, gioChuan: 208, gioThuong: 10, ...NGHI },
    esperado: { tong: 750000, gio: 50000 },
  },
  {
    nombre: "Ngày nghỉ và ngày lễ ban ngày",
    origen: { tipo: "recalculado", detalle: "50.000 × 200% × 8 = 800.000; 50.000 × 300% × 8 = 1.200.000." },
    fecha: "2026-11-01",
    entrada: { luong: 10400000, gioChuan: 208, gioThuong: 0, ...NGHI, gioNghi: 8, gioLe: 8 },
    esperado: { tong: 2000000 },
  },
  {
    nombre: "Ban đêm ngày thường, không làm thêm ban ngày",
    origen: { tipo: "recalculado", url: "https://vanban.chinhphu.vn/?pageid=27160&docid=201967", detalle: "150% + 30% + 20% × 100% = 200%. 50.000 × 200% × 4 = 400.000." },
    fecha: "2026-11-01",
    entrada: { luong: 10400000, gioChuan: 208, gioThuong: 0, ...NGHI, demThuong: 4 },
    esperado: { tong: 400000, heDemThuong: 200 },
  },
  {
    nombre: "Ban đêm ngày thường, có làm thêm ban ngày",
    origen: { tipo: "recalculado", detalle: "150% + 30% + 20% × 150% = 210%. 50.000 × 210% × 4 = 420.000." },
    fecha: "2026-11-01",
    entrada: { luong: 10400000, gioChuan: 208, gioThuong: 0, ...NGHI, demThuong: 4, coThemBanNgay: true },
    esperado: { tong: 420000, heDemThuong: 210 },
  },
  {
    nombre: "Ban đêm ngày nghỉ và ngày lễ",
    origen: { tipo: "recalculado", detalle: "200% + 30% + 20% × 200% = 270%; 300% + 30% + 20% × 300% = 390%. 50.000 × 270% × 2 + 50.000 × 390% × 1 = 465.000." },
    fecha: "2026-11-01",
    entrada: { luong: 10400000, gioChuan: 208, gioThuong: 0, ...NGHI, demNghi: 2, demLe: 1 },
    esperado: { tong: 465000, heDemNghi: 270, heDemLe: 390 },
  },
]);
