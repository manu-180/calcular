import { definirCasos } from "@/motor/calculo";
import calculadora from "./notice-pay";

export default definirCasos(calculadora, [
  {
    nombre: "บอกเลิกจ้าง 10 ต.ค. ให้ออกทันที จ่ายสิ้นเดือน",
    origen: {
      tipo: "recalculado",
      detalle: "มาตรา 17 และ 17/1: บอกก่อนวันจ่าย 31 ต.ค. มีผลวันจ่ายถัดไป 30 พ.ย. ต้องจ่ายค่าจ้าง 10 ต.ค. ถึง 30 พ.ย. = 52 วัน × 1,000 = 52,000",
    },
    fecha: "2026-10-26",
    entrada: { salario: 30000, ciclo: "mes", aviso: "2026-10-10", salida: "2026-10-10" },
    esperado: { dias: 52, pago: 52000, efecto: "2026-11-30" },
  },
  {
    nombre: "บอกล่วงหน้าถูกต้อง ทำงานจนถึงวันที่มีผล",
    origen: { tipo: "recalculado", detalle: "บอก 31 ต.ค. มีผล 30 พ.ย. ทำงานถึงวันนั้น ไม่ต้องจ่ายเพิ่ม" },
    fecha: "2026-10-26",
    entrada: { salario: 30000, ciclo: "mes", aviso: "2026-10-31", salida: "2026-12-01" },
    esperado: { dias: 0, pago: 0 },
  },
  {
    nombre: "จ่ายเดือนละสองครั้ง บอก 3 ต.ค.",
    origen: { tipo: "recalculado", detalle: "วันจ่ายแรก 15 ต.ค. มีผล 31 ต.ค. ให้ออก 3 ต.ค. จ่าย 29 วัน × 600 = 17,400" },
    fecha: "2026-10-26",
    entrada: { salario: 18000, ciclo: "quincena", aviso: "2026-10-03", salida: "2026-10-03" },
    esperado: { dias: 29, pago: 17400, efecto: "2026-10-31" },
  },
]);
