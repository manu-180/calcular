import { definirCasos } from "@/motor/calculo";
import aguinaldo from "./aguinaldo";

export default definirCasos(aguinaldo, [
  {
    nombre: "Año completo: un mes de salario",
    origen: {
      tipo: "recalculado",
      detalle: "Código del Trabajo art. 93: un mes de salario por año. Período 01/12/2025 a 30/11/2026: 365 días. 10000 × 1 × 365 / 365 = 10000.",
    },
    fecha: "2026-10-07",
    entrada: { salario: 10000, fechaIngreso: "2020-05-01", motivo: "diciembre", fechaSalida: null },
    esperado: { desde: "2025-12-01", hasta: "2026-11-30", dias: 365, aguinaldo: 10000 },
  },
  {
    nombre: "Entró en junio: proporcional",
    origen: { tipo: "recalculado", detalle: "Del 15/06 al 30/11/2026: 16 + 31 + 31 + 30 + 31 + 30 = 169 días. 9000 × 169 / 365 = 4167.12." },
    fecha: "2026-10-07",
    entrada: { salario: 9000, fechaIngreso: "2026-06-15", motivo: "diciembre", fechaSalida: null },
    esperado: { desde: "2026-06-15", dias: 169, aguinaldo: 4167.12 },
  },
  {
    nombre: "Salida el 31 de marzo",
    origen: { tipo: "recalculado", detalle: "Art. 42 y 95. Del 01/12/2025 al 31/03/2026: 31 + 31 + 28 + 31 = 121 días. 12000 × 121 / 365 = 3978.08." },
    fecha: "2026-04-01",
    entrada: { salario: 12000, fechaIngreso: "2018-01-10", motivo: "salida", fechaSalida: "2026-03-31" },
    esperado: { desde: "2025-12-01", hasta: "2026-03-31", dias: 121, aguinaldo: 3978.08 },
  },
  {
    nombre: "Salida el 1 de diciembre: empieza un período nuevo",
    origen: { tipo: "recalculado", detalle: "El período nuevo arranca el 01/12/2026: 1 día. 7300 × 1 / 365 = 20.00." },
    fecha: "2026-12-02",
    entrada: { salario: 7300, fechaIngreso: "2019-01-01", motivo: "salida", fechaSalida: "2026-12-01" },
    esperado: { desde: "2026-12-01", dias: 1, aguinaldo: 20 },
  },
  {
    nombre: "Ingreso posterior al cierre del período",
    origen: { tipo: "recalculado", detalle: "Quien entra el 01/12/2026 no tiene días en el período que cierra el 30/11/2026." },
    fecha: "2026-10-07",
    entrada: { salario: 9000, fechaIngreso: "2026-12-01", motivo: "diciembre", fechaSalida: null },
    esperaError: true,
  },
]);
