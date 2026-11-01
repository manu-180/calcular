import { definirCasos } from "@/motor/calculo";
import calculadora from "./tinh-tro-cap-thoi-viec";

export default definirCasos(calculadora, [
  {
    nombre: "124 tháng, đã đóng BHTN 72 tháng",
    origen: { tipo: "recalculado", url: "https://vanban.chinhphu.vn/?pageid=27160&docid=201967", detalle: "Còn 52 tháng = 4 năm 4 tháng, tính 4,5 năm. 4,5 × 0,5 × 20.000.000 = 45.000.000." },
    fecha: "2026-11-01",
    entrada: { luong: 20000000, tongThang: 124, bhtnThang: 72 },
    esperado: { troCap: 45000000, nam: 4.5 },
  },
  {
    nombre: "Tháng lẻ trên 6 được tính một năm",
    origen: { tipo: "recalculado", detalle: "19 tháng = 1 năm 7 tháng, tính 2 năm. 2 × 0,5 × 10.000.000 = 10.000.000." },
    fecha: "2026-11-01",
    entrada: { luong: 10000000, tongThang: 19, bhtnThang: 0 },
    esperado: { troCap: 10000000, nam: 2 },
  },
  {
    nombre: "Toàn bộ thời gian đã đóng BHTN",
    origen: { tipo: "recalculado", detalle: "Không còn tháng nào để tính." },
    fecha: "2026-11-01",
    entrada: { luong: 10000000, tongThang: 60, bhtnThang: 60 },
    esperado: { troCap: 0 },
  },
  {
    nombre: "Chưa đủ 12 tháng",
    origen: { tipo: "recalculado", detalle: "Khoản 1 Điều 46 yêu cầu từ đủ 12 tháng." },
    fecha: "2026-11-01",
    entrada: { luong: 10000000, tongThang: 8, bhtnThang: 0 },
    esperado: { troCap: 0 },
  },
]);
