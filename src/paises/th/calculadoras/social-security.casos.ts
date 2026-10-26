import { definirCasos } from "@/motor/calculo";
import calculadora from "./social-security";

export default definirCasos(calculadora, [
  {
    nombre: "ค่าจ้าง 20,000 บาท ปี พ.ศ. 2569 เพดาน 17,500",
    origen: { tipo: "recalculado", detalle: "ฐาน 17,500 ลูกจ้าง 5% = 875 นายจ้าง 875 รัฐบาล 2.75% = 481.25" },
    fecha: "2026-10-26",
    entrada: { sueldo: 20000 },
    esperado: { base: 17500, persona: 875, empleador: 875, gobierno: 481.25, total: 2231.25, anual: 10500 },
  },
  {
    nombre: "ค่าจ้าง 12,000 บาท ต่ำกว่าเพดาน",
    origen: { tipo: "recalculado", detalle: "ฐาน 12,000 ลูกจ้าง 5% = 600" },
    fecha: "2026-10-26",
    entrada: { sueldo: 12000 },
    esperado: { base: 12000, persona: 600, empleador: 600, gobierno: 330 },
  },
  {
    nombre: "ค่าจ้าง 1,000 บาท ใช้ค่าจ้างขั้นต่ำ 1,650",
    origen: { tipo: "recalculado", detalle: "ฐาน 1,650 ลูกจ้าง 5% = 82.50" },
    fecha: "2026-10-26",
    entrada: { sueldo: 1000 },
    esperado: { base: 1650, persona: 82.5 },
  },
  {
    nombre: "ค่าจ้าง 30,000 บาท ปี พ.ศ. 2572 เพดาน 20,000",
    origen: { tipo: "recalculado", detalle: "กฎกระทรวง พ.ศ. 2568 ข้อ 3 (2): เพดาน 20,000 ตั้งแต่ 1 ม.ค. 2572 ลูกจ้าง 5% = 1,000" },
    fecha: "2029-01-15",
    entrada: { sueldo: 30000 },
    esperado: { base: 20000, persona: 1000 },
  },
]);
