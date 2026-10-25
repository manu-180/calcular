import { definirCasos } from "@/motor/calculo";
import calculadora from "./minimum-wage-calculator";

const JIS = "https://jis.gov.jm/minimum-wage-moves-to-17000-up-from-16000/";

export default definirCasos(calculadora, [
  {
    nombre: "40-hour week from July 2026",
    origen: { tipo: "oficial", url: JIS, detalle: "J$17,000 per 40-hour week, J$425 an hour, overtime J$637.50 an hour." },
    fecha: "2026-10-24",
    entrada: { horas: 40, pagoHora: null },
    esperado: { semana: 17000, minimoSemanal: 17000, hora: 425, horaExtra: 637.5, quincena: 34000, anio: 884000, mes: 73666.67 },
  },
  {
    nombre: "45 hours in a week",
    origen: { tipo: "recalculado", detalle: "40 × 425 + 5 × 637.50 = 17,000 + 3,187.50 = 20,187.50." },
    fecha: "2026-10-24",
    entrada: { horas: 45, pagoHora: null },
    esperado: { semana: 20187.5 },
  },
  {
    nombre: "40-hour week in June 2026, old rate",
    origen: { tipo: "oficial", url: JIS, detalle: "Until June 30, 2026 the minimum was J$16,000 a week, or J$400 an hour." },
    fecha: "2026-06-30",
    entrada: { horas: 40, pagoHora: null },
    esperado: { semana: 16000, hora: 400 },
  },
  {
    nombre: "Part-time 20 hours",
    origen: { tipo: "recalculado", detalle: "20 × 425 = 8,500." },
    fecha: "2026-10-24",
    entrada: { horas: 20, pagoHora: 400 },
    esperado: { semana: 8500 },
  },
]);
