import { definirCasos } from "@/motor/calculo";
import bono14 from "./bono-14";

export default definirCasos(bono14, [
  {
    nombre: "Año completo con el salario mínimo no agrícola de la circunscripción 1",
    origen: {
      tipo: "recalculado",
      detalle: "Decreto 42-92 art. 2: 100 % del salario por un año. En octubre de 2026 el próximo pago cierra el 30/06/2027; con ingreso en 2020 cuentan 365 días. 4002.28 × 365 / 365 = 4002.28.",
    },
    fecha: "2026-10-07",
    entrada: { salario: 4002.28, fechaIngreso: "2020-01-15", motivo: "julio", fechaSalida: null },
    esperado: { desde: "2026-07-01", hasta: "2027-06-30", dias: 365, bono: 4002.28 },
  },
  {
    nombre: "Ingreso en enero, pago de julio de 2026",
    origen: { tipo: "recalculado", detalle: "Período del 01/07/2025 al 30/06/2026; ingreso 01/01/2026: 181 días. 3600 × 181 / 365 = 1785.21." },
    fecha: "2026-07-10",
    entrada: { salario: 3600, fechaIngreso: "2026-01-01", motivo: "julio", fechaSalida: null },
    esperado: { desde: "2026-01-01", hasta: "2026-06-30", dias: 181, bono: 1785.21 },
  },
  {
    nombre: "Salida el 15 de septiembre",
    origen: { tipo: "recalculado", detalle: "Decreto 42-92 art. 3: proporcional desde el 1 de julio anterior. Del 01/07 al 15/09/2026 son 77 días. 5000 × 77 / 365 = 1054.79." },
    fecha: "2026-10-07",
    entrada: { salario: 5000, fechaIngreso: "2026-03-16", motivo: "salida", fechaSalida: "2026-09-15" },
    esperado: { desde: "2026-07-01", dias: 77, bono: 1054.79 },
  },
  {
    nombre: "Salida el 1 de julio: un solo día del período nuevo",
    origen: { tipo: "recalculado", detalle: "El período empieza el 01/07/2026: 1 día. 3650 × 1 / 365 = 10.00." },
    fecha: "2026-07-01",
    entrada: { salario: 3650, fechaIngreso: "2020-02-01", motivo: "salida", fechaSalida: "2026-07-01" },
    esperado: { dias: 1, bono: 10 },
  },
  {
    nombre: "Salida sin fecha",
    origen: { tipo: "recalculado", detalle: "Sin último día de trabajo no se puede calcular la parte proporcional." },
    fecha: "2026-10-07",
    entrada: { salario: 5000, fechaIngreso: "2026-03-16", motivo: "salida", fechaSalida: null },
    esperaError: true,
  },
]);
