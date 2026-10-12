import { definirCasos } from "@/motor/calculo";
import periodoDePrueba from "./periodo-de-prueba";

export default definirCasos(periodoDePrueba, [
  {
    nombre: "Ingreso el 15/8/2026 en un puesto común",
    origen: { tipo: "recalculado", detalle: "DS 003-97-TR, art. 10: tres meses. Del 15/8/2026 al 14/11/2026. Del 12/10 al 14/11/2026 hay 33 días." },
    fecha: "2026-10-12",
    entrada: { fechaIngreso: "2026-08-15", tipo: "general" },
    esperado: { meses: 3, fechaFin: "2026-11-14", estado: "Estás en periodo de prueba: faltan 33 días para que termine" },
  },
  {
    nombre: "Personal de dirección: hasta un año",
    origen: { tipo: "recalculado", detalle: "Hasta 12 meses si se pactó por escrito: del 1/3/2026 al 28/2/2027." },
    fecha: "2026-10-12",
    entrada: { fechaIngreso: "2026-03-01", tipo: "direccion" },
    esperado: { meses: 12, fechaFin: "2027-02-28" },
  },
  {
    nombre: "Periodo ya cumplido",
    origen: { tipo: "recalculado", detalle: "Ingreso 1/1/2026, puesto de confianza (6 meses): termina el 30/6/2026. Al 12/10/2026 ya pasó." },
    fecha: "2026-10-12",
    entrada: { fechaIngreso: "2026-01-01", tipo: "calificado" },
    esperado: { fechaFin: "2026-06-30", estado: "Ya pasaste el periodo de prueba: tienes protección contra el despido arbitrario" },
  },
  {
    nombre: "Ingreso futuro",
    origen: { tipo: "recalculado", detalle: "Ingreso 2/11/2026: tres meses hasta el 1/2/2027. Al 12/10/2026 todavía no empezó." },
    fecha: "2026-10-12",
    entrada: { fechaIngreso: "2026-11-02", tipo: "general" },
    esperado: { fechaFin: "2027-02-01", estado: "Todavía no empezaste a trabajar" },
  },
]);
