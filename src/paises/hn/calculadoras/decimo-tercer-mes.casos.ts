import { definirCasos } from "@/motor/calculo";
import decimoTercerMes from "./decimo-tercer-mes";

export default definirCasos(decimoTercerMes, [
  {
    nombre: "Año completo con el salario mínimo de comercio de 1 a 10 trabajadores",
    origen: {
      tipo: "recalculado",
      detalle: "Decreto 112-82 art. 9 y Decreto 178-86: 100 % con el año completo al 31 de diciembre. Ingreso en 2019: del 01/01 al 31/12/2026 son 365 días. 13292.06 × 365 / 365 = 13292.06.",
    },
    fecha: "2026-10-12",
    entrada: { salario: 13292.06, fechaIngreso: "2019-03-01", motivo: "diciembre", fechaSalida: null },
    esperado: { desde: "2026-01-01", hasta: "2026-12-31", dias: 365, monto: 13292.06 },
  },
  {
    nombre: "Ingreso el 1 de julio, aguinaldo de diciembre",
    origen: { tipo: "recalculado", detalle: "Art. 10: proporcional si al 31 de diciembre no cumple 12 meses. Del 01/07 al 31/12/2026 son 184 días. 15000 × 184 / 365 = 7561.64." },
    fecha: "2026-10-12",
    entrada: { salario: 15000, fechaIngreso: "2026-07-01", motivo: "diciembre", fechaSalida: null },
    esperado: { desde: "2026-07-01", dias: 184, monto: 7561.64 },
  },
  {
    nombre: "Salida el 30 de septiembre",
    origen: { tipo: "recalculado", detalle: "Art. 13: con renuncia o despido se paga proporcional. Del 01/01 al 30/09/2026 son 273 días. 12000 × 273 / 365 = 8975.34." },
    fecha: "2026-10-12",
    entrada: { salario: 12000, fechaIngreso: "2024-02-10", motivo: "salida", fechaSalida: "2026-09-30" },
    esperado: { desde: "2026-01-01", dias: 273, monto: 8975.34 },
  },
  {
    nombre: "Salida el 1 de enero: un solo día del año",
    origen: { tipo: "recalculado", detalle: "El período empieza el 01/01/2026: 1 día. 3650 × 1 / 365 = 10.00." },
    fecha: "2026-01-02",
    entrada: { salario: 3650, fechaIngreso: "2020-02-01", motivo: "salida", fechaSalida: "2026-01-01" },
    esperado: { dias: 1, monto: 10 },
  },
  {
    nombre: "Salida sin fecha",
    origen: { tipo: "recalculado", detalle: "Sin último día de trabajo no se puede calcular la parte proporcional." },
    fecha: "2026-10-12",
    entrada: { salario: 12000, fechaIngreso: "2024-02-10", motivo: "salida", fechaSalida: null },
    esperaError: true,
  },
]);
