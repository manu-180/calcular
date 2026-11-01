import { definirCasos } from "@/motor/calculo";
import calculadora from "./public-holiday-pay-calculator";

const BASE = { salario: 10000, horasSemana: 45 };

export default definirCasos(calculadora, [
  {
    nombre: "Public holiday on a normal work day, 9 hours",
    origen: {
      tipo: "recalculado",
      detalle: "Hourly 10,000 / (4.333 × 45) = 51.29. Daily 10,000 / (4.333 × 5) = 461.57. Section 22(5)(a)(ii): 461.57 + 9 × 51.29 = 461.57 + 461.61 = 923.18.",
    },
    fecha: "2026-10-27",
    entrada: { ...BASE, dias: "5", dia: "holiday-normal", horas: 9 },
    esperado: { hora: 51.29, diaria: 461.57, extra: 461.61, total: 923.18 },
  },
  {
    nombre: "Public holiday on a day off, 9 hours",
    origen: { tipo: "recalculado", detalle: "Section 22(7): 9 × 51.29 × 2 = 923.22." },
    fecha: "2026-10-27",
    entrada: { ...BASE, dias: "5", dia: "holiday-off", horas: 9 },
    esperado: { extra: 923.22, total: 923.22 },
  },
  {
    nombre: "Sunday not normally worked, 6 hours",
    origen: { tipo: "recalculado", detalle: "Section 21(5): 6 × 51.29 × 2 = 615.48." },
    fecha: "2026-10-27",
    entrada: { ...BASE, dias: "5", dia: "sunday-off", horas: 6 },
    esperado: { extra: 615.48 },
  },
  {
    nombre: "Sunday as a normal work day on a six-day week, 8 hours",
    origen: {
      tipo: "recalculado",
      detalle: "Daily 10,000 / (4.333 × 6) = 384.64. Section 21(7): 384.64 + 8 × 51.29 = 384.64 + 410.32 = 794.96.",
    },
    fecha: "2026-10-27",
    entrada: { ...BASE, dias: "6", dia: "sunday-normal", horas: 8 },
    esperado: { diaria: 384.64, extra: 410.32, total: 794.96 },
  },
]);
