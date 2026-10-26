import { definirCasos } from "@/motor/calculo";
import calculadora from "./working-days-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Noviembre de 2026 con descanso el viernes",
    origen: { tipo: "recalculado", detalle: "1 al 30/11/2026: 30 días, 4 viernes (6, 13, 20 y 27). 26 laborables." },
    fecha: "2026-10-24",
    entrada: { desde: "2026-11-01", hasta: "2026-11-30", incluir: true, finde: "fri", feriados: null },
    esperado: { dias: 30, habiles: 26, descanso: 4 },
  },
  {
    nombre: "Noviembre de 2026 en una oficina pública",
    origen: { tipo: "recalculado", detalle: "Viernes y sábado: 4 + 4 días de descanso. 22 laborables; con 1 feriado, 21." },
    fecha: "2026-10-24",
    entrada: { desde: "2026-11-01", hasta: "2026-11-30", incluir: true, finde: "fri-sat", feriados: 1 },
    esperado: { dias: 30, habiles: 21, descanso: 8, feriados: 1 },
  },
  {
    nombre: "Fechas invertidas",
    origen: { tipo: "recalculado", detalle: "Se intercambian y se cuenta igual que el primer caso." },
    fecha: "2026-10-24",
    entrada: { desde: "2026-11-30", hasta: "2026-11-01", incluir: true, finde: "fri", feriados: null },
    esperado: { habiles: 26 },
  },
]);
