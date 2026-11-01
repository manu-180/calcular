import { definirCasos } from "@/motor/calculo";
import calculadora from "./stamp-duty";

export default definirCasos(calculadora, [
  {
    nombre: "สัญญาเช่า 1 ปี เดือนละ 10,000 บาท",
    origen: { tipo: "recalculado", detalle: "ลักษณะแห่งตราสาร 1: ค่าเช่ารวม 120,000 ทุก 1,000 บาท เสีย 1 บาท = 120" },
    fecha: "2026-10-26",
    entrada: { tipo: "lease", monto: 120000 },
    esperado: { impuesto: 120 },
  },
  {
    nombre: "สัญญากู้ 1,500,500 บาท",
    origen: { tipo: "recalculado", detalle: "ลักษณะแห่งตราสาร 5: ทุก 2,000 บาทหรือเศษ เสีย 1 บาท 1,500,500÷2,000 = 750.25 ปัดขึ้นเป็น 751" },
    fecha: "2026-10-26",
    entrada: { tipo: "loan", monto: 1500500 },
    esperado: { impuesto: 751 },
  },
  {
    nombre: "สัญญากู้ 50 ล้านบาท ถึงเพดาน",
    origen: { tipo: "recalculado", detalle: "50,000,000÷2,000 = 25,000 เกิน 10,000 จึงเสีย 10,000" },
    fecha: "2026-10-26",
    entrada: { tipo: "loan", monto: 50000000 },
    esperado: { impuesto: 10000 },
  },
  {
    nombre: "สัญญาจ้างทำของ 350,200 บาท",
    origen: { tipo: "recalculado", detalle: "ลักษณะแห่งตราสาร 4: 350,200÷1,000 = 350.2 ปัดขึ้นเป็น 351" },
    fecha: "2026-10-26",
    entrada: { tipo: "work", monto: 350200 },
    esperado: { impuesto: 351 },
  },
]);
