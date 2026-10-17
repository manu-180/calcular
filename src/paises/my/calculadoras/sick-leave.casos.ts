import { definirCasos } from "@/motor/calculo";
import calculadora from "./sick-leave";

export default definirCasos(calculadora, [
  {
    nombre: "1 year of service, 3 days taken",
    origen: { tipo: "recalculado", detalle: "Section 60F(1)(aa)(i): 14 days for less than 2 years. 14 − 3 = 11. Daily 2,600 / 26 = 100, so 1,100." },
    fecha: "2026-10-16",
    entrada: { sueldo: 2600, anios: 1, tomados: 3 },
    esperado: { dias: 14, pendientes: 11, hospital: 60, valor: 1100 },
  },
  {
    nombre: "4 years of service",
    origen: { tipo: "recalculado", detalle: "Section 60F(1)(aa)(ii): 18 days for 2 to less than 5 years." },
    fecha: "2026-10-16",
    entrada: { sueldo: 3000, anios: 4, tomados: 0 },
    esperado: { dias: 18, pendientes: 18, diario: 115.38 },
  },
  {
    nombre: "10 years of service",
    origen: { tipo: "recalculado", detalle: "Section 60F(1)(aa)(iii): 22 days for 5 years or more." },
    fecha: "2026-10-16",
    entrada: { sueldo: 5200, anios: 10, tomados: 25 },
    esperado: { dias: 22, pendientes: 0, valor: 0 },
  },
]);
