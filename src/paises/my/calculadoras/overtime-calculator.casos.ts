import { definirCasos } from "@/motor/calculo";
import calculadora from "./overtime-calculator";

const CERO = { descansoCompleto: 0, descansoMedio: 0, descansoExtra: 0, feriados: 0, feriadoExtra: 0 };

export default definirCasos(calculadora, [
  {
    nombre: "RM3,000, 8 hours a day, 10 overtime hours",
    origen: { tipo: "recalculado", detalle: "Section 60I: ordinary rate 3,000 / 26 = 115.38; hourly 115.38 / 8 = 14.42. Section 60A(3): 10 × 14.42 × 1.5 = 216.30." },
    fecha: "2026-10-16",
    entrada: { ...CERO, sueldo: 3000, horasDia: 8, extra: 10 },
    esperado: { total: 216.3, diario: 115.38, hora: 14.42, pagoExtra: 216.3 },
  },
  {
    nombre: "RM2,600 with rest days and a public holiday",
    origen: {
      tipo: "recalculado",
      detalle: "Daily 100, hourly 12.50. Rest days (section 60): full day 100 + half day 50 + 2 h × 12.50 × 2 = 200. Public holiday (section 60D): 2 days' wages 200 + 2 h × 12.50 × 3 = 75, so 275. Total 475.",
    },
    fecha: "2026-10-16",
    entrada: { sueldo: 2600, horasDia: 8, extra: 0, descansoCompleto: 1, descansoMedio: 1, descansoExtra: 2, feriados: 1, feriadoExtra: 2 },
    esperado: { total: 475, pagoDescanso: 200, pagoFeriado: 275, pagoExtra: 0 },
  },
  {
    nombre: "More than 8 normal hours a day",
    origen: { tipo: "recalculado", detalle: "Section 60A(1)(b): normal hours cannot exceed 8 a day." },
    fecha: "2026-10-16",
    entrada: { ...CERO, sueldo: 3000, horasDia: 9, extra: 5 },
    esperaError: true,
  },
]);
