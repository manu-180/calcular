import { definirCasos } from "@/motor/calculo";
import calculadora from "./annual-leave";

export default definirCasos(calculadora, [
  {
    nombre: "ถูกเลิกจ้างหลังทำงาน 6 เดือนของปี สะสม 2 วัน",
    origen: { tipo: "recalculado", detalle: "มาตรา 67: 6×6÷12 = 3 วัน บวกสะสม 2 วัน = 5 วัน × (30,000÷30) = 5,000" },
    fecha: "2026-10-26",
    entrada: { salario: 30000, diasAnuales: 6, meses: 6, usados: 0, acumulados: 2, motivo: "despido" },
    esperado: { proporcional: 3, dias: 5, pago: 5000 },
  },
  {
    nombre: "ลาออกเอง ได้เฉพาะวันสะสม",
    origen: { tipo: "recalculado", detalle: "มาตรา 67 วรรคสอง: ลาออกได้เฉพาะวันสะสม 4 วัน × 1,000 = 4,000" },
    fecha: "2026-10-26",
    entrada: { salario: 30000, diasAnuales: 10, meses: 9, usados: 2, acumulados: 4, motivo: "renuncia" },
    esperado: { proporcional: 0, dias: 4, pago: 4000 },
  },
  {
    nombre: "ถูกเลิกจ้าง ใช้วันหยุดไปบางส่วน",
    origen: { tipo: "recalculado", detalle: "10×9÷12 = 7.5 วัน ลบที่ใช้ 2 วัน = 5.5 วัน × 600 = 3,300" },
    fecha: "2026-10-26",
    entrada: { salario: 18000, diasAnuales: 10, meses: 9, usados: 2, acumulados: 0, motivo: "despido" },
    esperado: { proporcional: 5.5, pago: 3300 },
  },
]);
