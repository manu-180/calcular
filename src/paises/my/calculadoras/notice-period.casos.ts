import { definirCasos } from "@/motor/calculo";
import calculadora from "./notice-period";

export default definirCasos(calculadora, [
  {
    nombre: "1 year of service, RM2,600",
    origen: { tipo: "recalculado", detalle: "Section 12(2)(a): 4 weeks. Weekly wages 2,600 × 12 / 52 = 600; pay in lieu (section 13) 4 × 600 = 2,400." },
    fecha: "2026-10-16",
    entrada: { sueldo: 2600, anios: 1 },
    esperado: { semanas: 4, dias: 28, semanal: 600, indemnizacion: 2400 },
  },
  {
    nombre: "3 years of service",
    origen: { tipo: "recalculado", detalle: "Section 12(2)(b): 6 weeks. 2,600 × 12 / 52 = 600; 6 × 600 = 3,600." },
    fecha: "2026-10-16",
    entrada: { sueldo: 2600, anios: 3 },
    esperado: { semanas: 6, indemnizacion: 3600 },
  },
  {
    nombre: "8 years of service, RM5,000",
    origen: { tipo: "recalculado", detalle: "Section 12(2)(c): 8 weeks. 5,000 × 12 / 52 = 1,153.85; 8 × 1,153.85 = 9,230.80." },
    fecha: "2026-10-16",
    entrada: { sueldo: 5000, anios: 8 },
    esperado: { semanas: 8, semanal: 1153.85, indemnizacion: 9230.8 },
  },
]);
