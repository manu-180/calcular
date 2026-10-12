import { definirCasos } from "@/motor/calculo";
import incapacidad from "./incapacidad-imss";

export default definirCasos(incapacidad, [
  {
    nombre: "Enfermedad general de 7 días",
    origen: { tipo: "recalculado", detalle: "LSS arts. 96 y 98: desde el cuarto día, 60 % del salario. 7 − 3 = 4 días × 300 = 1200." },
    fecha: "2026-10-15",
    entrada: { tipo: "enfermedad-general", sbc: 500, dias: 7 },
    esperado: { pagados: 4, diario: 300, total: 1200 },
  },
  {
    nombre: "Enfermedad general de 3 días: no paga",
    origen: { tipo: "recalculado", detalle: "Los tres primeros días no se pagan." },
    fecha: "2026-10-15",
    entrada: { tipo: "enfermedad-general", sbc: 500, dias: 3 },
    esperado: { pagados: 0, total: 0 },
  },
  {
    nombre: "Accidente de trabajo de 10 días",
    origen: { tipo: "recalculado", detalle: "LSS art. 58 fr. I: 100 % desde el primer día. 10 × 500 = 5000." },
    fecha: "2026-10-15",
    entrada: { tipo: "riesgo-trabajo", sbc: 500, dias: 10 },
    esperado: { pagados: 10, diario: 500, total: 5000 },
  },
  {
    nombre: "Maternidad con salario arriba del tope",
    origen: { tipo: "recalculado", detalle: "LSS art. 101: 84 días al 100 %. Tope 25 × 117.31 = 2932.75; × 84 = 246351." },
    fecha: "2026-10-15",
    entrada: { tipo: "maternidad", sbc: 3500, dias: 7 },
    esperado: { pagados: 84, diario: 2932.75, total: 246351 },
  },
]);
