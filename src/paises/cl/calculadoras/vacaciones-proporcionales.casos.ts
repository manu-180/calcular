import { definirCasos } from "@/motor/calculo";
import vacaciones from "./vacaciones-proporcionales";

export default definirCasos(vacaciones, [
  {
    nombre: "Ejemplo de la Dirección del Trabajo",
    origen: {
      tipo: "oficial",
      url: "https://www.dt.gob.cl/portal/1628/w3-article-60200.html",
      detalle: "Ingreso 15/3/2021, término 17/11/2021: 8 meses y 2 días = 10,08 días hábiles más 4 inhábiles = 14,08 días corridos.",
    },
    fecha: "2026-10-07",
    entrada: { desde: "2021-03-15", termino: "2021-11-17", sueldo: 900000, diasPendientes: 0, zonaAustral: false },
    esperado: { proporcionales: 10.08, inhabiles: 4, corridos: 14.08, monto: 422500 },
    tolerancia: 0.01,
  },
  {
    nombre: "Zona austral, seis meses justos",
    origen: { tipo: "recalculado", detalle: "20 / 12 × 6 = 10 hábiles desde el jueves 2/7/2026; caen 2 fines de semana (4 días) hasta el 15/7 → 14 corridos × 20.000 = 280.000." },
    fecha: "2026-10-07",
    entrada: { desde: "2026-01-01", termino: "2026-07-01", sueldo: 600000, diasPendientes: 0, zonaAustral: true },
    esperado: { proporcionales: 10, inhabiles: 4, corridos: 14, monto: 280000 },
  },
  {
    nombre: "Con días pendientes del año anterior",
    origen: { tipo: "recalculado", detalle: "1/6/2026 al 7/10/2026: 4 meses y 6 días = 5 + 0,25 = 5,25 hábiles + 15 pendientes = 20,25 desde el 8/10: 8 días de fin de semana → 28,25 × 30.000 = 847.500." },
    fecha: "2026-10-07",
    entrada: { desde: "2026-06-01", termino: "2026-10-07", sueldo: 900000, diasPendientes: 15, zonaAustral: false },
    esperado: { habiles: 20.25, inhabiles: 8, corridos: 28.25, monto: 847500 },
  },
  {
    nombre: "Más de un año desde la fecha de inicio",
    origen: { tipo: "recalculado", detalle: "La función pide usar la fecha del último aniversario." },
    fecha: "2026-10-07",
    entrada: { desde: "2024-01-01", termino: "2026-10-07", sueldo: 900000, diasPendientes: 0, zonaAustral: false },
    esperaError: true,
  },
]);
