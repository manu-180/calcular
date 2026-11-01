import { definirCasos } from "@/motor/calculo";
import calculadora from "./severance-pay";

export default definirCasos(calculadora, [
  {
    nombre: "เงินเดือน 30,000 บาท อายุงาน 5 ปี",
    origen: { tipo: "recalculado", detalle: "มาตรา 118 (3): ครบ 3 ปี ไม่ครบ 6 ปี ได้ 180 วัน ค่าจ้างวันละ 30,000÷30 = 1,000 รวม 180,000" },
    fecha: "2026-10-26",
    entrada: { salario: 30000, periodo: "mes", inicio: "2021-07-01", fin: "2026-09-30" },
    esperado: { anios: 5, diasPago: 180, compensacion: 180000 },
  },
  {
    nombre: "ครบ 20 ปีพอดี",
    origen: { tipo: "recalculado", detalle: "มาตรา 118 (6): 2006-11-01 ถึง 2026-10-31 ครบ 20 ปี ได้ 400 วัน 45,000÷30×400 = 600,000" },
    fecha: "2026-10-26",
    entrada: { salario: 45000, periodo: "mes", inicio: "2006-11-01", fin: "2026-10-31" },
    esperado: { anios: 20, diasPago: 400, compensacion: 600000 },
  },
  {
    nombre: "ขาดอีกหนึ่งวันไม่ครบ 20 ปี",
    origen: { tipo: "recalculado", detalle: "2006-11-01 ถึง 2026-10-30 ยังไม่ครบ 20 ปี ได้ 300 วัน" },
    fecha: "2026-10-26",
    entrada: { salario: 45000, periodo: "mes", inicio: "2006-11-01", fin: "2026-10-30" },
    esperado: { anios: 19, diasPago: 300, compensacion: 450000 },
  },
  {
    nombre: "ค่าจ้างรายวัน 400 บาท ทำงาน 200 วัน",
    origen: { tipo: "recalculado", detalle: "มาตรา 118 (1): ครบ 120 วัน ไม่ครบ 1 ปี ได้ 30 วัน 400×30 = 12,000" },
    fecha: "2026-10-26",
    entrada: { salario: 400, periodo: "dia", inicio: "2026-03-01", fin: "2026-09-16" },
    esperado: { dias: 200, diasPago: 30, compensacion: 12000 },
  },
  {
    nombre: "ทำงาน 100 วัน ไม่ได้ค่าชดเชย",
    origen: { tipo: "recalculado", detalle: "ไม่ครบ 120 วัน" },
    fecha: "2026-10-26",
    entrada: { salario: 20000, periodo: "mes", inicio: "2026-06-01", fin: "2026-09-08" },
    esperado: { dias: 100, compensacion: 0 },
  },
]);
