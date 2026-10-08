import { definirCasos } from "@/motor/calculo";
import decimoCuartoMes from "./decimo-cuarto-mes";

export default definirCasos(decimoCuartoMes, [
  {
    nombre: "Año completo con el salario mínimo de comercio de 1 a 10 trabajadores",
    origen: {
      tipo: "recalculado",
      detalle: "Reglamento del décimo cuarto, art. 2: 100 % con el año cumplido al 30 de junio. En octubre de 2026 el próximo pago cierra el 30/06/2027; con ingreso en 2019 cuentan 365 días. 13292.06 × 365 / 365 = 13292.06.",
    },
    fecha: "2026-10-07",
    entrada: { salario: 13292.06, fechaIngreso: "2019-03-01", motivo: "junio", fechaSalida: null },
    esperado: { desde: "2026-07-01", hasta: "2027-06-30", dias: 365, monto: 13292.06 },
  },
  {
    nombre: "Ingreso el 1 de enero, pago de junio de 2026",
    origen: { tipo: "recalculado", detalle: "Art. 2: proporcional al tiempo trabajado. Del 01/01/2026 al 30/06/2026 son 181 días. 15000 × 181 / 365 = 7438.36." },
    fecha: "2026-06-15",
    entrada: { salario: 15000, fechaIngreso: "2026-01-01", motivo: "junio", fechaSalida: null },
    esperado: { desde: "2026-01-01", hasta: "2026-06-30", dias: 181, monto: 7438.36 },
  },
  {
    nombre: "Salida el 30 de septiembre",
    origen: { tipo: "recalculado", detalle: "Art. 9: si renuncia o lo despiden antes del año, se paga proporcional. Del 01/07 al 30/09/2026 son 92 días. 12000 × 92 / 365 = 3024.66." },
    fecha: "2026-10-07",
    entrada: { salario: 12000, fechaIngreso: "2024-02-10", motivo: "salida", fechaSalida: "2026-09-30" },
    esperado: { desde: "2026-07-01", dias: 92, monto: 3024.66 },
  },
  {
    nombre: "Salida el 1 de julio: un solo día del período nuevo",
    origen: { tipo: "recalculado", detalle: "El período empieza el 01/07/2026: 1 día. 3650 × 1 / 365 = 10.00." },
    fecha: "2026-07-01",
    entrada: { salario: 3650, fechaIngreso: "2020-02-01", motivo: "salida", fechaSalida: "2026-07-01" },
    esperado: { dias: 1, monto: 10 },
  },
  {
    nombre: "Salida sin fecha",
    origen: { tipo: "recalculado", detalle: "Sin último día de trabajo no se puede calcular la parte proporcional." },
    fecha: "2026-10-07",
    entrada: { salario: 12000, fechaIngreso: "2024-02-10", motivo: "salida", fechaSalida: null },
    esperaError: true,
  },
]);
