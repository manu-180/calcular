import { definirCasos } from "@/motor/calculo";
import calculadora from "./tinh-lam-phat";

export default definirCasos(calculadora, [
  {
    nombre: "10 triệu, một năm, CPI mới nhất",
    origen: { tipo: "recalculado", url: "https://www.nso.gov.vn/tin-tuc-thong-ke/2026/10/thong-cao-bao-chi-ve-tinh-hinh-gia-thang-chin-quy-iii-va-9-thang-nam-2026/", detalle: "10.000.000 × 1,0508 = 10.508.000. Sức mua 10.000.000 / 1,0508 = 9.516.559." },
    fecha: "2026-11-01",
    entrada: { soTien: 10000000, soNam: 1, tyLe: null },
    esperado: { tuongDuong: 10508000, sucMua: 9516559, cpiNam: 5.08, cpiThang: 0.62, cpiBinhQuan: 4.52 },
    tolerancia: 1,
  },
  {
    nombre: "Lạm phát giả định 5% trong 5 năm",
    origen: { tipo: "recalculado", detalle: "1,05^5 = 1,2762815625. 10.000.000 × hệ số = 12.762.816; sức mua 7.835.262." },
    fecha: "2026-11-01",
    entrada: { soTien: 10000000, soNam: 5, tyLe: 5 },
    esperado: { tuongDuong: 12762816, sucMua: 7835262 },
    tolerancia: 1,
  },
]);
