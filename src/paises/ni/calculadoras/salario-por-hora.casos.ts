import { definirCasos } from "@/motor/calculo";
import salarioPorHora from "./salario-por-hora";

export default definirCasos(salarioPorHora, [
  {
    nombre: "Jornada diurna con C$9,000",
    origen: { tipo: "recalculado", detalle: "Código del Trabajo art. 51: 8 horas diarias y 48 semanales. 9000 / 30 = 300 diarios; 300 × 7 = 2100 por semana; 300 / 8 = 37.50 por hora." },
    fecha: "2026-10-12",
    entrada: { salario: 9000, jornada: "diurna" },
    esperado: { horas: 8, horasSemana: 48, diario: 300, semanal: 2100, porHora: 37.5 },
  },
  {
    nombre: "Jornada nocturna con C$12,000",
    origen: { tipo: "recalculado", detalle: "Art. 51: 7 horas diarias y 42 semanales. 12000 / 30 = 400; 400 / 7 = 57.14." },
    fecha: "2026-10-12",
    entrada: { salario: 12000, jornada: "nocturna" },
    esperado: { horas: 7, horasSemana: 42, diario: 400, porHora: 57.14 },
  },
  {
    nombre: "Jornada mixta",
    origen: { tipo: "recalculado", detalle: "Art. 51: 7.5 horas diarias y 45 semanales. 9000 / 30 / 7.5 = 40." },
    fecha: "2026-10-12",
    entrada: { salario: 9000, jornada: "mixta" },
    esperado: { horasSemana: 45, porHora: 40 },
  },
]);
