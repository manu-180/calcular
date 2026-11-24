import { definirCasos } from "@/motor/calculo";
import calculadora from "./tinh-tro-cap-mat-viec";

export default definirCasos(calculadora, [
  {
    nombre: "124 tháng, đã đóng BHTN 72 tháng",
    origen: { tipo: "recalculado", url: "https://vanban.chinhphu.vn/?pageid=27160&docid=198540", detalle: "Tính 4,5 năm × 1 tháng × 20.000.000 = 90.000.000." },
    fecha: "2026-11-01",
    entrada: { luong: 20000000, tongThang: 124, bhtnThang: 72 },
    esperado: { troCap: 90000000, thangLuong: 4.5 },
  },
  {
    nombre: "Mức tối thiểu 2 tháng lương",
    origen: { tipo: "recalculado", detalle: "Tính 1 năm, thấp hơn 2 tháng, nên trả 2 × 20.000.000 = 40.000.000." },
    fecha: "2026-11-01",
    entrada: { luong: 20000000, tongThang: 12, bhtnThang: 0 },
    esperado: { troCap: 40000000, thangLuong: 2 },
  },
  {
    nombre: "Đã đóng BHTN toàn bộ thời gian vẫn được tối thiểu",
    origen: { tipo: "recalculado", detalle: "Khoản 2 Điều 8 Nghị định 145/2020: thời gian tính dưới 24 tháng vẫn trả ít nhất 2 tháng lương." },
    fecha: "2026-11-01",
    entrada: { luong: 10000000, tongThang: 60, bhtnThang: 60 },
    esperado: { troCap: 20000000 },
  },
  {
    nombre: "Chưa đủ 12 tháng",
    origen: { tipo: "recalculado", detalle: "Khoản 1 Điều 47 yêu cầu từ đủ 12 tháng." },
    fecha: "2026-11-01",
    entrada: { luong: 10000000, tongThang: 6, bhtnThang: 0 },
    esperado: { troCap: 0 },
  },
]);
