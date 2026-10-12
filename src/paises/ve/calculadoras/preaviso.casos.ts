import { definirCasos } from "@/motor/calculo";
import preaviso from "./preaviso";

export default definirCasos(preaviso, [
  {
    nombre: "Más de un año: un mes",
    origen: { tipo: "recalculado", detalle: "LOTTT art. 81 c: después de un año, un mes (30 días). Aviso el 01/10/2026: hasta el 31/10/2026." },
    fecha: "2026-10-12",
    entrada: { fechaIngreso: "2024-03-01", fechaAviso: "2026-10-01" },
    esperado: { dias: 30, ultimoDia: "2026-10-31" },
  },
  {
    nombre: "Ocho meses: una quincena",
    origen: { tipo: "recalculado", detalle: "Art. 81 b: después de seis meses, 15 días. Aviso el 01/10/2026: hasta el 16/10/2026." },
    fecha: "2026-10-12",
    entrada: { fechaIngreso: "2026-02-01", fechaAviso: "2026-10-01" },
    esperado: { dias: 15, ultimoDia: "2026-10-16" },
  },
  {
    nombre: "Tres meses: una semana",
    origen: { tipo: "recalculado", detalle: "Art. 81 a: después de un mes, una semana (7 días). Del 15/06 al 01/10 hay 3 meses completos." },
    fecha: "2026-10-12",
    entrada: { fechaIngreso: "2026-06-15", fechaAviso: "2026-10-01" },
    esperado: { dias: 7, ultimoDia: "2026-10-08" },
  },
  {
    nombre: "Menos de un mes: sin preaviso",
    origen: { tipo: "recalculado", detalle: "El art. 81 empieza a contar después de un mes de trabajo." },
    fecha: "2026-10-12",
    entrada: { fechaIngreso: "2026-09-15", fechaAviso: "2026-10-01" },
    esperado: { dias: 0, ultimoDia: "2026-10-01" },
  },
  {
    nombre: "Renuncia anterior al ingreso",
    origen: { tipo: "recalculado", detalle: "Entrada imposible." },
    fecha: "2026-10-12",
    entrada: { fechaIngreso: "2026-09-15", fechaAviso: "2026-09-01" },
    esperaError: true,
  },
]);
