import { definirCasos } from "@/motor/calculo";
import calculadora from "./tinh-luong-gross-net";

export default definirCasos(calculadora, [
  {
    nombre: "30 triệu, vùng I, không người phụ thuộc",
    origen: {
      tipo: "recalculado",
      url: "https://vanban.chinhphu.vn/?pageid=27160&docid=216495",
      detalle: "Bảo hiểm 10,5% = 3.150.000. Tính thuế 30.000.000 - 3.150.000 - 15.500.000 = 11.350.000. Thuế 500.000 + 135.000 = 635.000. Net 26.215.000.",
    },
    fecha: "2026-11-01",
    entrada: { luong: 30000000, phuThuoc: 0, vung: "vung-1", luongDong: null },
    esperado: { net: 26215000, tongBaoHiem: 3150000, thue: 635000 },
  },
  {
    nombre: "60 triệu vượt trần BHXH, một người phụ thuộc",
    origen: {
      tipo: "recalculado",
      detalle: "Trần BHXH 20 × 2.530.000 = 50.600.000: BHXH 4.048.000, BHYT 759.000. BHTN 1% × 60.000.000 = 600.000. Tính thuế 60.000.000 - 5.407.000 - 21.700.000 = 32.893.000. Thuế 500.000 + 2.000.000 + 578.600 = 3.078.600. Net 51.514.400.",
    },
    fecha: "2026-11-01",
    entrada: { luong: 60000000, phuThuoc: 1, vung: "vung-1", luongDong: null },
    esperado: { net: 51514400, bhxh: 4048000, bhtn: 600000, thue: 3078600 },
  },
  {
    nombre: "Lương đóng bảo hiểm thấp hơn lương gross",
    origen: { tipo: "recalculado", detalle: "Bảo hiểm 10,5% × 10.000.000 = 1.050.000. Tính thuế 20.000.000 - 1.050.000 - 15.500.000 = 3.450.000. Thuế 172.500. Net 18.777.500." },
    fecha: "2026-11-01",
    entrada: { luong: 20000000, phuThuoc: 0, vung: "vung-2", luongDong: 10000000 },
    esperado: { net: 18777500, thue: 172500 },
  },
  {
    nombre: "Lương đóng bảo hiểm lớn hơn gross là lỗi",
    origen: { tipo: "recalculado", detalle: "Dữ liệu vô lý." },
    fecha: "2026-11-01",
    entrada: { luong: 10000000, phuThuoc: 0, vung: "vung-1", luongDong: 20000000 },
    esperaError: true,
  },
]);
