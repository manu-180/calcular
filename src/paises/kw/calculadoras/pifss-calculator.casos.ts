import { definirCasos } from "@/motor/calculo";
import calculadora from "./pifss-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "KD 1,000 a month, 5 years contributed",
    origen: { tipo: "recalculado", detalle: "PIFSS guide: basic 5% = 50, pension increase 2.5% = 25, remuneration 2.5% = 25, unemployment 0.5% = 5. You 105. Employer: basic 10% = 100, increase 1% = 10, so 110." },
    fecha: "2026-10-18",
    entrada: { sueldo: 1000, anios: 5 },
    esperado: { empleado: 105, empleador: 110, total: 215, complementario: 0 },
  },
  {
    nombre: "KD 2,000: part of the salary goes to the Supplementary Fund",
    origen: { tipo: "recalculado", detalle: "Basic 1,500, supplementary 500. You: 75 + 25 + 50 (2.5% of 2,000) + 37.5 + 10 = 197.5. Employer: 150 + 50 + 20 = 220." },
    fecha: "2026-10-18",
    entrada: { sueldo: 2000, anios: 5 },
    esperado: { empleado: 197.5, empleador: 220, basico: 1500, complementario: 500 },
  },
  {
    nombre: "KD 3,500 after 20 years: ceilings and no Remuneration Fund",
    origen: { tipo: "recalculado", detalle: "Basic 1,500, supplementary capped at 1,250, base 2,750. You: 75 + 62.5 + 68.75 + 0 (18 years reached) + 13.75 = 220. Employer: 150 + 125 + 27.5 = 302.5." },
    fecha: "2026-10-18",
    entrada: { sueldo: 3500, anios: 20 },
    esperado: { empleado: 220, empleador: 302.5, empleadoRemuneracion: 0 },
  },
  {
    nombre: "KD 200: contributions on the KD 230 minimum",
    origen: { tipo: "recalculado", detalle: "Contribution salary raised to 230. You: 11.5 + 5.75 + 5.75 + 1.15 = 24.15. Employer: 23 + 2.3 = 25.3." },
    fecha: "2026-10-18",
    entrada: { sueldo: 200, anios: 0 },
    esperado: { empleado: 24.15, empleador: 25.3, basico: 230 },
  },
]);
