import { definirCasos } from "@/motor/calculo";
import periodoDePrueba from "./periodo-de-prueba";

export default definirCasos(periodoDePrueba, [
  {
    nombre: "Ingreso el 12 de octubre de 2026",
    origen: { tipo: "recalculado", detalle: "Arts. 28 y 29: preaviso y cesantía después de tres meses continuos. Del 12/10/2026 al 11/1/2027." },
    fecha: "2026-10-12",
    entrada: { fechaIngreso: "2026-10-12" },
    esperado: { fin: "2027-01-11", desde: "2027-01-12" },
  },
  {
    nombre: "Ingreso el 30 de noviembre",
    origen: { tipo: "recalculado", detalle: "Tres meses desde el 30/11/2026 llegan al 28/2/2027 (febrero no tiene 30): el período termina el 27/2/2027." },
    fecha: "2026-10-12",
    entrada: { fechaIngreso: "2026-11-30" },
    esperado: { fin: "2027-02-27", desde: "2027-02-28" },
  },
]);
