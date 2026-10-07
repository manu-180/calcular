import { definirCasos } from "@/motor/calculo";
import aguinaldo from "./aguinaldo";

export default definirCasos(aguinaldo, [
  {
    nombre: "Año completo, pagado mitad en diciembre y mitad en enero",
    origen: {
      tipo: "recalculado",
      detalle: "Decreto 76-78 arts. 1 y 2: 100 % del salario por año, 50 % en diciembre y 50 % en enero. Período 01/12/2025 a 30/11/2026: 365 días. 3000; 1500 y 1500.",
    },
    fecha: "2026-10-07",
    entrada: { salario: 3000, fechaIngreso: "2024-05-01", motivo: "diciembre", fechaSalida: null },
    esperado: { desde: "2025-12-01", hasta: "2026-11-30", dias: 365, aguinaldo: 3000, enDiciembre: 1500, enEnero: 1500 },
  },
  {
    nombre: "En enero se calcula el período que cerró en noviembre",
    origen: { tipo: "recalculado", detalle: "Ingreso 01/09/2026: del 01/09 al 30/11/2026 son 91 días. 3650 × 91 / 365 = 910; 455 y 455." },
    fecha: "2027-01-10",
    entrada: { salario: 3650, fechaIngreso: "2026-09-01", motivo: "diciembre", fechaSalida: null },
    esperado: { desde: "2026-09-01", dias: 91, aguinaldo: 910, enDiciembre: 455, enEnero: 455 },
  },
  {
    nombre: "Salida el 30 de junio",
    origen: { tipo: "recalculado", detalle: "Decreto 76-78 art. 5. Del 01/02 al 30/06/2026 son 150 días. 4500 × 150 / 365 = 1849.32, se paga de una vez." },
    fecha: "2026-07-01",
    entrada: { salario: 4500, fechaIngreso: "2026-02-01", motivo: "salida", fechaSalida: "2026-06-30" },
    esperado: { dias: 150, aguinaldo: 1849.32, enDiciembre: null, enEnero: null },
  },
  {
    nombre: "Salida el 1 de diciembre: empieza un período nuevo",
    origen: { tipo: "recalculado", detalle: "El período empieza el 01/12/2026: 1 día. 3650 × 1 / 365 = 10.00." },
    fecha: "2026-12-02",
    entrada: { salario: 3650, fechaIngreso: "2019-01-01", motivo: "salida", fechaSalida: "2026-12-01" },
    esperado: { dias: 1, aguinaldo: 10 },
  },
]);
