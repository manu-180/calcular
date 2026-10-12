import { definirCasos } from "@/motor/calculo";
import salarioPorHora from "./salario-por-hora";

export default definirCasos(salarioPorHora, [
  {
    nombre: "Salario de B/. 1,000 en jornada diurna",
    origen: {
      tipo: "recalculado",
      detalle: "48 horas por semana (art. 31) × 52 ÷ 12 = 208 horas al mes. 1,000 ÷ 208 = 4.8077 por hora. Día de 8 horas: 38.46. Semana: 1,000 × 12 ÷ 52 = 230.77.",
    },
    fecha: "2026-10-12",
    entrada: { salario: 1000, jornada: "diurna", horasSemana: null },
    esperado: { hora: 4.81, horasMes: 208, diario: 38.46, semanal: 230.77, quincenal: 500 },
  },
  {
    nombre: "Jornada nocturna de 42 horas",
    origen: { tipo: "recalculado", detalle: "42 × 52 ÷ 12 = 182 horas. 1,000 ÷ 182 = 5.4945. Día de 7 horas: 38.46." },
    fecha: "2026-10-12",
    entrada: { salario: 1000, jornada: "nocturna", horasSemana: null },
    esperado: { hora: 5.49, horasMes: 182, diario: 38.46 },
  },
  {
    nombre: "Medio tiempo de 24 horas",
    origen: { tipo: "recalculado", detalle: "24 × 52 ÷ 12 = 104 horas. 600 ÷ 104 = 5.7692." },
    fecha: "2026-10-12",
    entrada: { salario: 600, jornada: "diurna", horasSemana: 24 },
    esperado: { hora: 5.77, horasMes: 104 },
  },
  {
    nombre: "Más horas que la semana diurna",
    origen: { tipo: "recalculado", detalle: "La semana diurna es de 48 horas como máximo." },
    fecha: "2026-10-12",
    entrada: { salario: 1000, jornada: "diurna", horasSemana: 50 },
    esperaError: true,
  },
]);
