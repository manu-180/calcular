import { definirCasos } from "@/motor/calculo";
import calculadora from "./working-hours-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Nueve horas cinco días",
    origen: { tipo: "recalculado", detalle: "45 h; exceso diario 1 × 5 = 5; exceso semanal 45 - 40 = 5. Extra 5." },
    fecha: "2026-10-26",
    entrada: { horasDia: 9, diasSemana: 5, ramadan: false },
    esperado: { semana: 45, extra: 5, limiteDia: 8, limiteSemana: 40 },
  },
  {
    nombre: "Ramadán con 8 horas",
    origen: { tipo: "recalculado", detalle: "Límite 6 y 30. 40 h; exceso diario 2 × 5 = 10; semanal 10. Extra 10." },
    fecha: "2026-10-26",
    entrada: { horasDia: 8, diasSemana: 5, ramadan: true },
    esperado: { extra: 10, limiteDia: 6, limiteSemana: 30 },
  },
  {
    nombre: "Seis días de 7 horas",
    origen: { tipo: "recalculado", detalle: "42 h; sin exceso diario; semanal 2. Extra 2." },
    fecha: "2026-10-26",
    entrada: { horasDia: 7, diasSemana: 6, ramadan: false },
    esperado: { extra: 2, semana: 42 },
  },
]);
