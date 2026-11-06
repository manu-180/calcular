import { definirCasos } from "@/motor/calculo";
import calculadora from "./tinh-phep-nam";

export default definirCasos(calculadora, [
  {
    nombre: "6 năm, điều kiện bình thường, đã nghỉ 8 ngày",
    origen: { tipo: "recalculado", url: "https://vanban.chinhphu.vn/?pageid=27160&docid=198540", detalle: "12 + 1 = 13 ngày. Còn 5 ngày. 10.400.000 / 26 = 400.000; × 5 = 2.000.000." },
    fecha: "2026-11-01",
    entrada: { loai: "binh-thuong", thang: 72, daNghi: 8, luong: 10400000, ngayCong: 26 },
    esperado: { soNgay: 13, conLai: 5, tienChuaNghi: 2000000 },
  },
  {
    nombre: "Chưa đủ 12 tháng",
    origen: { tipo: "recalculado", detalle: "16 × 6 / 12 = 8 ngày." },
    fecha: "2026-11-01",
    entrada: { loai: "dac-biet", thang: 6, daNghi: 0, luong: 10400000, ngayCong: 26 },
    esperado: { soNgay: 8 },
  },
  {
    nombre: "Nghề nặng nhọc, đủ 10 năm",
    origen: { tipo: "recalculado", detalle: "14 + 2 = 16 ngày." },
    fecha: "2026-11-01",
    entrada: { loai: "nang-nhoc", thang: 120, daNghi: 0, luong: 10400000, ngayCong: 26 },
    esperado: { soNgay: 16, tangThem: 2 },
  },
]);
