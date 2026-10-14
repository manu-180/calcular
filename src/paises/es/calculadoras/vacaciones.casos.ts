import { definirCasos } from "@/motor/calculo";
import vacaciones from "./vacaciones";

const ET = "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430";

export default definirCasos(vacaciones, [
  {
    nombre: "Primer semestre de 2026 con 5 días disfrutados",
    origen: { tipo: "recalculado", url: ET, detalle: "181 días: 30 × 181 / 365 = 14,88. Pendientes 9,88. Día: 25.000 / 14 / 30 = 59,52. Importe 588,06." },
    fecha: "2026-10-14",
    entrada: { inicio: "2026-01-01", fin: "2026-06-30", disfrutados: 5, diasConvenio: null, bruto: 25000, pagas: "14" },
    esperado: { trabajados: 181, generados: 14.88, pendientes: 9.88, valorDia: 59.52, importe: 588.06 },
  },
  {
    nombre: "Año completo con 31 días de convenio y pagas prorrateadas",
    origen: { tipo: "recalculado", detalle: "31 días generados. Día: 24.000 / 12 / 30 = 66,67. Importe 2.066,77." },
    fecha: "2026-10-14",
    entrada: { inicio: "2026-01-01", fin: "2026-12-31", disfrutados: 0, diasConvenio: 31, bruto: 24000, pagas: "12" },
    esperado: { generados: 31, pendientes: 31, importe: 2066.77 },
  },
  {
    nombre: "Convenio por debajo del mínimo legal",
    origen: { tipo: "recalculado", url: ET, detalle: "Un convenio de 22 días naturales se sube a 30. Año completo: 30 días." },
    fecha: "2026-10-14",
    entrada: { inicio: "2026-01-01", fin: "2026-12-31", disfrutados: 0, diasConvenio: 22, bruto: 24000, pagas: "12" },
    esperado: { generados: 30 },
  },
  {
    nombre: "Fechas de años distintos",
    origen: { tipo: "recalculado", detalle: "Entrada no válida." },
    fecha: "2026-10-14",
    entrada: { inicio: "2025-10-01", fin: "2026-03-31", disfrutados: 0, diasConvenio: null, bruto: 24000, pagas: "12" },
    esperaError: true,
  },
]);
