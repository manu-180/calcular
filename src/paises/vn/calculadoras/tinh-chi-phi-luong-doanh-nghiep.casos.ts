import { definirCasos } from "@/motor/calculo";
import calculadora from "./tinh-chi-phi-luong-doanh-nghiep";

export default definirCasos(calculadora, [
  {
    nombre: "30 triệu, vùng I, một nhân viên",
    origen: {
      tipo: "recalculado",
      url: "https://vanban.chinhphu.vn/?pageid=27160&docid=211199",
      detalle: "BHXH 17% = 5.100.000; TNLĐ 0,5% = 150.000; BHYT 3% = 900.000; BHTN 1% = 300.000; công đoàn 2% = 600.000. Đóng thêm 7.050.000. Tổng 37.050.000.",
    },
    fecha: "2026-11-01",
    entrada: { luong: 30000000, vung: "vung-1", soNguoi: 1 },
    esperado: { tongChiPhi: 37050000, dongThem: 7050000, bhxh: 5100000 },
  },
  {
    nombre: "60 triệu vượt trần, ba nhân viên",
    origen: { tipo: "recalculado", detalle: "Căn cứ BHXH 50.600.000: BHXH 8.602.000; TNLĐ 253.000; BHYT 1.518.000; công đoàn 1.012.000. BHTN 1% × 60.000.000 = 600.000. Đóng thêm 11.985.000. Mỗi người 71.985.000, ba người 215.955.000." },
    fecha: "2026-11-01",
    entrada: { luong: 60000000, vung: "vung-1", soNguoi: 3 },
    esperado: { tongChiPhi: 215955000, moiNguoi: 71985000 },
  },
]);
