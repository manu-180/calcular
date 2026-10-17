import { definirCasos } from "@/motor/calculo";
import calculadora from "./minimum-wage";

export default definirCasos(calculadora, [
  {
    nombre: "208 hours in a month at $9,000",
    origen: {
      tipo: "oficial",
      url: "https://www.labour.gov.hk/eng/faq/smw_keeping_record.htm",
      detalle: "Minimum wages = hours worked in the wage period x SMW rate = 208 x 43.1 = 8,964.80. 9,000 meets it.",
    },
    fecha: "2026-10-16",
    entrada: { salario: 9000, horas: 208, mensual: true },
    esperado: { minimo: 8964.8, faltante: 0, porHora: 43.27 },
  },
  {
    nombre: "240 hours at $10,000 falls short",
    origen: { tipo: "recalculado", detalle: "240 x 43.1 = 10,344. Shortfall 344." },
    fecha: "2026-10-16",
    entrada: { salario: 10000, horas: 240, mensual: true },
    esperado: { minimo: 10344, faltante: 344 },
  },
  {
    nombre: "Weekly wage period",
    origen: { tipo: "recalculado", detalle: "48 x 43.1 = 2,068.80, against 2,000: 68.80 short." },
    fecha: "2026-10-16",
    entrada: { salario: 2000, horas: 48, mensual: false },
    esperado: { minimo: 2068.8, faltante: 68.8 },
  },
  {
    nombre: "No hours is not valid",
    origen: { tipo: "recalculado", detalle: "Hours 0." },
    fecha: "2026-10-16",
    entrada: { salario: 9000, horas: 0, mensual: true },
    esperaError: true,
  },
]);
