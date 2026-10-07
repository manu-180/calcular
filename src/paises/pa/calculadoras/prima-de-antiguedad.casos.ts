import { definirCasos } from "@/motor/calculo";
import primaDeAntiguedad from "./prima-de-antiguedad";

export default definirCasos(primaDeAntiguedad, [
  {
    nombre: "Ocho años justos con promedio de B/. 1,300",
    origen: { tipo: "recalculado", detalle: "Art. 224: una semana por año. Semanal 1,300 × 12 ÷ 52 = 300. Del 1/10/2018 al 30/9/2026 son 8 años: 8 × 300 = 2,400." },
    fecha: "2026-10-07",
    entrada: { salarioPromedio: 1300, fechaIngreso: "2018-10-01", fechaSalida: "2026-09-30" },
    esperado: { salarioSemanal: 300, semanas: 8, prima: 2400 },
  },
  {
    nombre: "Dos años y medio: parte proporcional del año incompleto",
    origen: { tipo: "recalculado", detalle: "Del 1/4/2024 al 30/9/2026: 2 años y 6 meses = 2.5 años. 2.5 × 300 = 750." },
    fecha: "2026-10-07",
    entrada: { salarioPromedio: 1300, fechaIngreso: "2024-04-01", fechaSalida: "2026-09-30" },
    esperado: { semanas: 2.5, prima: 750 },
  },
  {
    nombre: "Un solo día de trabajo",
    origen: { tipo: "recalculado", detalle: "1 día = 1/30 de mes = 1/360 de año. 300 ÷ 360 = 0.83." },
    fecha: "2026-10-07",
    entrada: { salarioPromedio: 1300, fechaIngreso: "2026-10-01", fechaSalida: "2026-10-01" },
    esperado: { prima: 0.83 },
  },
  {
    nombre: "Salida antes del ingreso",
    origen: { tipo: "recalculado", detalle: "La función rechaza una salida anterior al ingreso." },
    fecha: "2026-10-07",
    entrada: { salarioPromedio: 1300, fechaIngreso: "2026-05-01", fechaSalida: "2026-04-01" },
    esperaError: true,
  },
]);
