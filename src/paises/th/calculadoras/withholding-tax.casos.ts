import { definirCasos } from "@/motor/calculo";
import calculadora from "./withholding-tax";

export default definirCasos(calculadora, [
  {
    nombre: "ค่าบริการ 10,000 บาท",
    origen: { tipo: "recalculado", detalle: "ท.ป.4/2528 ข้อ 12/1 ค่าบริการ 3% ของ 10,000 = 300" },
    fecha: "2026-10-26",
    entrada: { monto: 10000, tipo: "service" },
    esperado: { retencion: 300, neto: 9700, tasa: 3 },
  },
  {
    nombre: "ค่าเช่า 25,000 บาท",
    origen: { tipo: "recalculado", detalle: "ท.ป.4/2528 ข้อ 6 ค่าเช่า 5% ของ 25,000 = 1,250" },
    fecha: "2026-10-26",
    entrada: { monto: 25000, tipo: "rent" },
    esperado: { retencion: 1250, neto: 23750 },
  },
  {
    nombre: "ค่าโฆษณา 12,345.67 บาท",
    origen: { tipo: "recalculado", detalle: "ท.ป.4/2528 ข้อ 10 ค่าโฆษณา 2% ของ 12,345.67 = 246.91" },
    fecha: "2026-10-26",
    entrada: { monto: 12345.67, tipo: "advertising" },
    esperado: { retencion: 246.91 },
  },
  {
    nombre: "ค่าขนส่ง 50,000 บาท",
    origen: { tipo: "recalculado", detalle: "ท.ป.4/2528 ข้อ 12/4 ค่าขนส่ง 1% ของ 50,000 = 500" },
    fecha: "2026-10-26",
    entrada: { monto: 50000, tipo: "transport" },
    esperado: { retencion: 500 },
  },
  {
    nombre: "ค่าบริการ 800 บาท ต่ำกว่าเกณฑ์",
    origen: { tipo: "recalculado", detalle: "ท.ป.4/2528 ข้อ 12/7: ยอดตามสัญญาต่ำกว่า 1,000 บาทไม่ต้องหัก" },
    fecha: "2026-10-26",
    entrada: { monto: 800, tipo: "service" },
    esperado: { retencion: 0, neto: 800 },
  },
]);
