import { definirCasos } from "@/motor/calculo";
import vacaciones from "./vacaciones";

export default definirCasos(vacaciones, [
  {
    nombre: "Año completo",
    origen: { tipo: "recalculado", detalle: "CT art. 130: 15 días hábiles. Salario diario 6000 / 30 = 200. 15 × 200 = 3000." },
    fecha: "2026-10-07",
    entrada: { salario: 6000, situacion: "anio-completo", diasTrabajados: null },
    esperado: { dias: 15, diario: 200, monto: 3000 },
  },
  {
    nombre: "Proporcional por 200 días",
    origen: { tipo: "recalculado", detalle: "CT art. 133: 15 × 200 / 365 = 8.22 días. 4500 / 30 = 150. 8.22 × 150 = 1233." },
    fecha: "2026-10-07",
    entrada: { salario: 4500, situacion: "proporcional", diasTrabajados: 200 },
    esperado: { dias: 8.22, diario: 150, monto: 1233 },
  },
  {
    nombre: "Proporcional sin días",
    origen: { tipo: "recalculado", detalle: "Falta el dato para calcular la parte proporcional." },
    fecha: "2026-10-07",
    entrada: { salario: 4500, situacion: "proporcional", diasTrabajados: null },
    esperaError: true,
  },
]);
