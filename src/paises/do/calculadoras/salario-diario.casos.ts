import { definirCasos } from "@/motor/calculo";
import salarioDiario from "./salario-diario";

export default definirCasos(salarioDiario, [
  {
    nombre: "Salario mensual de RD$30,000",
    origen: { tipo: "recalculado", detalle: "Reglamento 258-93, art. 32 d: 30,000 ÷ 23.83 = 1,258.92. Hora con 8 horas: 30,000 ÷ 23.83 ÷ 8 = 157.36." },
    fecha: "2026-10-12",
    entrada: { salario: 30000, periodo: "mensual", jornada: 8 },
    esperado: { divisor: 23.83, diario: 1258.92, hora: 157.36 },
  },
  {
    nombre: "Quincena de RD$15,000",
    origen: { tipo: "recalculado", detalle: "Art. 32 c: 15,000 ÷ 11.91 = 1,259.45. Hora: 1,259.4458 ÷ 8 = 157.43." },
    fecha: "2026-10-12",
    entrada: { salario: 15000, periodo: "quincenal", jornada: 8 },
    esperado: { divisor: 11.91, diario: 1259.45, hora: 157.43 },
  },
  {
    nombre: "Semana de RD$7,000",
    origen: { tipo: "recalculado", detalle: "Art. 32 b: 7,000 ÷ 5.5 = 1,272.73. Hora: 1,272.727 ÷ 8 = 159.09." },
    fecha: "2026-10-12",
    entrada: { salario: 7000, periodo: "semanal", jornada: 8 },
    esperado: { divisor: 5.5, diario: 1272.73, hora: 159.09 },
  },
  {
    nombre: "Jornada de 6 horas",
    origen: { tipo: "recalculado", detalle: "30,000 ÷ 23.83 ÷ 6 = 209.82." },
    fecha: "2026-10-12",
    entrada: { salario: 30000, periodo: "mensual", jornada: 6 },
    esperado: { hora: 209.82 },
  },
  {
    nombre: "Jornada de más de 8 horas",
    origen: { tipo: "recalculado", detalle: "Art. 147: la jornada no pasa de 8 horas diarias." },
    fecha: "2026-10-12",
    entrada: { salario: 30000, periodo: "mensual", jornada: 10 },
    esperaError: true,
  },
]);
