import { definirCasos } from "@/motor/calculo";
import calculadora from "./gift-tax";

export default definirCasos(calculadora, [
  {
    nombre: "พ่อให้ลูก 22 ล้านบาท",
    origen: { tipo: "recalculado", detalle: "มาตรา 42 (27) ยกเว้น 20 ล้าน มาตรา 48 (6) ส่วนเกิน 2,000,000×5% = 100,000" },
    fecha: "2026-10-26",
    entrada: { monto: 22000000, relacion: "familia" },
    esperado: { excedente: 2000000, impuesto: 100000 },
  },
  {
    nombre: "ได้รับจากบุคคลอื่นในพิธี 12 ล้านบาท",
    origen: { tipo: "recalculado", detalle: "มาตรา 42 (28) ยกเว้น 10 ล้าน มาตรา 48 (7) ส่วนเกิน 2,000,000×5% = 100,000" },
    fecha: "2026-10-26",
    entrada: { monto: 12000000, relacion: "otro" },
    esperado: { excedente: 2000000, impuesto: 100000, neto: 11900000 },
  },
  {
    nombre: "แม่ให้ลูก 5 ล้านบาท ไม่มีภาษี",
    origen: { tipo: "recalculado", detalle: "ไม่เกิน 20 ล้านบาท ได้รับยกเว้น" },
    fecha: "2026-10-26",
    entrada: { monto: 5000000, relacion: "familia" },
    esperado: { impuesto: 0, exento: 5000000 },
  },
]);
