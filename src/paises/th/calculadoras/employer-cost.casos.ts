import { definirCasos } from "@/motor/calculo";
import calculadora from "./employer-cost";

export default definirCasos(calculadora, [
  {
    nombre: "เงินเดือน 25,000 บาท 1 คน",
    origen: { tipo: "recalculado", detalle: "ฐานประกันสังคม 17,500 นายจ้าง 5% = 875 ต้นทุน 25,875 ต่อเดือน 310,500 ต่อปี" },
    fecha: "2026-10-26",
    entrada: { sueldo: 25000, empleados: 1, bono: 0 },
    esperado: { ssoEmpleador: 875, mensual: 25875, anualPorPersona: 310500, total: 310500 },
  },
  {
    nombre: "เงินเดือน 12,000 บาท 10 คน โบนัส 12,000",
    origen: { tipo: "recalculado", detalle: "นายจ้าง 5% = 600 ต้นทุน 12,600×12+12,000 = 163,200 ต่อคน ×10 = 1,632,000" },
    fecha: "2026-10-26",
    entrada: { sueldo: 12000, empleados: 10, bono: 12000 },
    esperado: { ssoEmpleador: 600, anualPorPersona: 163200, total: 1632000, recargo: 5 },
  },
]);
