import { definirCasos } from "@/motor/calculo";
import cuotaSeguroSocial from "./cuota-seguro-social";

export default definirCasos(cuotaSeguroSocial, [
  {
    nombre: "Salario de B/. 1,000 en octubre de 2026",
    origen: {
      tipo: "recalculado",
      detalle: "Empleado: 9.75% = 97.50 y 1.25% = 12.50. Empleador: 13.25% = 132.50 y 1.50% = 15. Total 257.50.",
    },
    fecha: "2026-10-12",
    entrada: { salario: 1000, decimo: null },
    esperado: { cssTrabajador: 97.5, seTrabajador: 12.5, trabajador: 110, cssEmpleador: 132.5, seEmpleador: 15, empleador: 147.5, total: 257.5 },
  },
  {
    nombre: "Marzo de 2027, con partida del décimo",
    origen: {
      tipo: "recalculado",
      detalle: "Desde el 1/3/2027 la cuota patronal es 14.25% = 142.50. Décimo de 1,000: 7.25% del empleado = 72.50 y 10.75% del empleador = 107.50.",
    },
    fecha: "2027-03-01",
    entrada: { salario: 1000, decimo: 1000 },
    esperado: { decimoTrabajador: 72.5, trabajador: 182.5, cssEmpleador: 142.5, decimoEmpleador: 107.5, empleador: 265, total: 447.5 },
  },
  {
    nombre: "Último día con la cuota patronal de 13.25%",
    origen: { tipo: "recalculado", detalle: "El 28/2/2027 rige todavía el 13.25%: 132.50." },
    fecha: "2027-02-28",
    entrada: { salario: 1000, decimo: null },
    esperado: { cssEmpleador: 132.5 },
  },
]);
