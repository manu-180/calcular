import { definirCasos } from "@/motor/calculo";
import decimoTercerMesProporcional from "./decimo-tercer-mes-proporcional";

export default definirCasos(decimoTercerMesProporcional, [
  {
    nombre: "Salida el 12 de octubre",
    origen: {
      tipo: "recalculado",
      detalle: "Período desde el 16/8: 1 mes y 27 días = 1.9 meses. 1,300 × 1.9 ÷ 12 = 205.83. Seguro Social 7.25% = 14.92. Neto 190.91.",
    },
    fecha: "2026-10-12",
    entrada: { salario: 1300, fechaIngreso: "2018-10-13", fechaSalida: "2026-10-12" },
    esperado: { desde: "2026-08-16", meses: 1.9, bruto: 205.83, css: 14.92, neto: 190.91 },
  },
  {
    nombre: "Ingreso dentro del período",
    origen: { tipo: "recalculado", detalle: "Desde el 1/2/2026 hasta el 31/3/2026: 2 meses. 900 × 2 ÷ 12 = 150. Seguro Social 10.88. Neto 139.12." },
    fecha: "2026-10-12",
    entrada: { salario: 900, fechaIngreso: "2026-02-01", fechaSalida: "2026-03-31" },
    esperado: { desde: "2026-02-01", meses: 2, bruto: 150, css: 10.88, neto: 139.12 },
  },
]);
