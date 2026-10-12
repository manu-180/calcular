import { definirCasos } from "@/motor/calculo";
import preaviso from "./preaviso";

export default definirCasos(preaviso, [
  {
    nombre: "Entre uno y cinco años: dos semanas",
    origen: { tipo: "recalculado", detalle: "CT art. 83 lit. c: ingreso 10/01/2025, aviso 12/10/2026: 14 días, hasta el 26/10/2026." },
    fecha: "2026-10-12",
    entrada: { fechaIngreso: "2025-01-10", fechaAviso: "2026-10-12" },
    esperado: { plazo: "14 días", desde: "2026-10-26" },
  },
  {
    nombre: "Más de cinco años: un mes",
    origen: { tipo: "recalculado", detalle: "Art. 83 lit. d: aviso 12/10/2026, un mes, hasta el 12/11/2026." },
    fecha: "2026-10-12",
    entrada: { fechaIngreso: "2020-01-01", fechaAviso: "2026-10-12" },
    esperado: { plazo: "1 mes", desde: "2026-11-12" },
  },
  {
    nombre: "Menos de seis meses: una semana",
    origen: { tipo: "recalculado", detalle: "Ingreso 01/02/2026, aviso 15/06/2026 (pasó la prueba el 01/04): 7 días." },
    fecha: "2026-10-12",
    entrada: { fechaIngreso: "2026-02-01", fechaAviso: "2026-06-15" },
    esperado: { plazo: "7 días", desde: "2026-06-22" },
  },
  {
    nombre: "Entre seis meses y un año: diez días",
    origen: { tipo: "recalculado", detalle: "Ingreso 01/12/2025, aviso 01/07/2026: 10 días." },
    fecha: "2026-10-12",
    entrada: { fechaIngreso: "2025-12-01", fechaAviso: "2026-07-01" },
    esperado: { plazo: "10 días", desde: "2026-07-11" },
  },
  {
    nombre: "En período de prueba",
    origen: { tipo: "recalculado", detalle: "CT art. 81: los dos primeros meses son de prueba." },
    fecha: "2026-10-12",
    entrada: { fechaIngreso: "2026-01-05", fechaAviso: "2026-03-01" },
    esperado: { plazo: "No necesita aviso", desde: "2026-03-01" },
  },
  {
    nombre: "Aviso antes del ingreso",
    origen: { tipo: "recalculado", detalle: "Entrada imposible." },
    fecha: "2026-10-12",
    entrada: { fechaIngreso: "2026-10-12", fechaAviso: "2026-01-01" },
    esperaError: true,
  },
]);
