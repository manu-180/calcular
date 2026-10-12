import { definirCasos } from "@/motor/calculo";
import asistenciaEconomica from "./asistencia-economica";

export default definirCasos(asistenciaEconomica, [
  {
    nombre: "Muerte del trabajador después de 5 años",
    origen: { tipo: "recalculado", detalle: "Del 1/3/2021 al 30/9/2026: 5 años completos. Art. 82: 15 días por año = 75 días. Diario 40,000 ÷ 23.83 = 1,678.56. Asistencia 125,892." },
    fecha: "2026-10-12",
    entrada: { inicio: "2021-03-01", termino: "2026-09-30", salario: 40000, causa: "muerte-trabajador" },
    esperado: { dias: 75, diario: 1678.56, asistencia: 125892 },
  },
  {
    nombre: "8 meses: 10 días",
    origen: { tipo: "recalculado", detalle: "Del 15/1 al 20/9/2026: entre 6 meses y un año, 10 días. Diario 25,000 ÷ 23.83 = 1,049.10. Asistencia 10,491." },
    fecha: "2026-10-12",
    entrada: { inicio: "2026-01-15", termino: "2026-09-20", salario: 25000, causa: "cierre" },
    esperado: { dias: 10, asistencia: 10491 },
  },
  {
    nombre: "4 meses: 5 días",
    origen: { tipo: "recalculado", detalle: "Del 15/5 al 20/9/2026: entre 3 y 6 meses, 5 días. Diario 1,258.92 × 5 = 6,294.60." },
    fecha: "2026-10-12",
    entrada: { inicio: "2026-05-15", termino: "2026-09-20", salario: 30000, causa: "enfermedad" },
    esperado: { dias: 5, asistencia: 6294.6 },
  },
]);
