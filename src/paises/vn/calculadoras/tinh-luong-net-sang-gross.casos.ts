import { definirCasos } from "@/motor/calculo";
import calculadora from "./tinh-luong-net-sang-gross";

export default definirCasos(calculadora, [
  {
    nombre: "Net 26.215.000 trở về gross 30 triệu",
    origen: { tipo: "recalculado", url: "https://vanban.chinhphu.vn/?pageid=27160&docid=216495", detalle: "Phép tính ngược của gross 30.000.000: bảo hiểm 3.150.000, thuế 635.000, net 26.215.000." },
    fecha: "2026-11-01",
    entrada: { net: 26215000, phuThuoc: 0, vung: "vung-1" },
    esperado: { gross: 30000000, tongBaoHiem: 3150000, thue: 635000 },
    tolerancia: 1,
  },
  {
    nombre: "Net 51.514.400 với một người phụ thuộc",
    origen: { tipo: "recalculado", detalle: "Phép tính ngược của gross 60.000.000: bảo hiểm 5.407.000, thuế 3.078.600." },
    fecha: "2026-11-01",
    entrada: { net: 51514400, phuThuoc: 1, vung: "vung-1" },
    esperado: { gross: 60000000, thue: 3078600 },
    tolerancia: 1,
  },
]);
