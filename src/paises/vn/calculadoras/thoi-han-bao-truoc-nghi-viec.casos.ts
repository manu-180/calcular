import { definirCasos } from "@/motor/calculo";
import calculadora from "./thoi-han-bao-truoc-nghi-viec";

export default definirCasos(calculadora, [
  {
    nombre: "Không xác định thời hạn",
    origen: { tipo: "oficial", url: "https://vanban.chinhphu.vn/?pageid=27160&docid=198540", detalle: "Điểm a khoản 1 Điều 35: ít nhất 45 ngày." },
    fecha: "2026-11-01",
    entrada: { loai: "khong-thoi-han", dacThu: false, daBao: null, luong: 26000000, ngayCong: 26 },
    esperado: { ngay: 45 },
  },
  {
    nombre: "12 đến 36 tháng, mới báo 10 ngày",
    origen: { tipo: "recalculado", detalle: "Thiếu 20 ngày. Nửa tháng lương 13.000.000 cộng 20 × 1.000.000 = 33.000.000 theo khoản 2 Điều 40." },
    fecha: "2026-11-01",
    entrada: { loai: "tu-12-den-36", dacThu: false, daBao: 10, luong: 26000000, ngayCong: 26 },
    esperado: { ngay: 30, thieu: 20, boiThuong: 33000000 },
  },
  {
    nombre: "Dưới 12 tháng",
    origen: { tipo: "oficial", url: "https://vanban.chinhphu.vn/?pageid=27160&docid=198540", detalle: "Điểm c khoản 1 Điều 35: ít nhất 3 ngày làm việc." },
    fecha: "2026-11-01",
    entrada: { loai: "duoi-12", dacThu: false, daBao: 3, luong: 26000000, ngayCong: 26 },
    esperado: { ngay: 3, thieu: 0, boiThuong: 0 },
  },
  {
    nombre: "Ngành nghề đặc thù",
    origen: { tipo: "oficial", url: "https://vanban.chinhphu.vn/?pageid=27160&docid=201967", detalle: "Điểm a khoản 2 Điều 7 Nghị định 145/2020: ít nhất 120 ngày." },
    fecha: "2026-11-01",
    entrada: { loai: "khong-thoi-han", dacThu: true, daBao: null, luong: 26000000, ngayCong: 26 },
    esperado: { ngay: 120 },
  },
]);
