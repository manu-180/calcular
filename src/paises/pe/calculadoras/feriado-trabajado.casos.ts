import { definirCasos } from "@/motor/calculo";
import feriadoTrabajado from "./feriado-trabajado";

export default definirCasos(feriadoTrabajado, [
  {
    nombre: "Un feriado trabajado con sueldo de S/ 3,000",
    origen: {
      tipo: "recalculado",
      detalle: "DL 713, arts. 3 y 9: jornada trabajada (3,000 / 30 = 100) más sobretasa del 100 % (100) = 200 adicionales al sueldo.",
    },
    fecha: "2026-12-08",
    entrada: { sueldo: 3000, asignacionFamiliar: false, dias: 1 },
    esperado: { valorDia: 100, sobretasa: 100, pagoPorDia: 200, total: 200 },
  },
  {
    nombre: "Dos días con la RMV y asignación familiar",
    origen: { tipo: "recalculado", detalle: "(1,230 + 123) / 30 = 45.10; con 100 % = 90.20 por día; dos días = 180.40." },
    fecha: "2026-11-01",
    entrada: { sueldo: 1230, asignacionFamiliar: true, dias: 2 },
    esperado: { valorDia: 45.1, pagoPorDia: 90.2, total: 180.4 },
  },
  {
    nombre: "Sin días trabajados",
    origen: { tipo: "recalculado", detalle: "Cero días: no hay pago adicional." },
    fecha: "2026-11-01",
    entrada: { sueldo: 2000, asignacionFamiliar: false, dias: 0 },
    esperado: { total: 0 },
  },
]);
