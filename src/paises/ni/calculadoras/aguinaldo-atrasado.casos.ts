import { definirCasos } from "@/motor/calculo";
import aguinaldoAtrasado from "./aguinaldo-atrasado";

export default definirCasos(aguinaldoAtrasado, [
  {
    nombre: "Aguinaldo de diciembre pagado el 20",
    origen: { tipo: "recalculado", detalle: "Código del Trabajo art. 95: plazo hasta el 10/12; un día de salario por día de retraso. Del 10/12 al 20/12/2026: 10 días. 9000 / 30 = 300. 300 × 10 = 3000." },
    fecha: "2026-10-12",
    entrada: { salario: 9000, motivo: "diciembre", fechaSalida: null, fechaPago: "2026-12-20" },
    esperado: { limite: "2026-12-10", dias: 10, diario: 300, indemnizacion: 3000 },
  },
  {
    nombre: "Aguinaldo de diciembre pagado en enero",
    origen: { tipo: "recalculado", detalle: "Del 10/12/2026 al 15/01/2027: 36 días. 300 × 36 = 10800." },
    fecha: "2026-10-12",
    entrada: { salario: 9000, motivo: "diciembre", fechaSalida: null, fechaPago: "2027-01-15" },
    esperado: { limite: "2026-12-10", dias: 36, indemnizacion: 10800 },
  },
  {
    nombre: "Aguinaldo proporcional pagado a tiempo al terminar el contrato",
    origen: { tipo: "recalculado", detalle: "Art. 95: diez días después de terminado el contrato. Salida 30/09/2026, plazo 10/10/2026, pago 08/10/2026: sin retraso." },
    fecha: "2026-10-12",
    entrada: { salario: 12000, motivo: "salida", fechaSalida: "2026-09-30", fechaPago: "2026-10-08" },
    esperado: { limite: "2026-10-10", dias: 0, indemnizacion: 0 },
  },
  {
    nombre: "Aguinaldo proporcional pagado diez días tarde",
    origen: { tipo: "recalculado", detalle: "Plazo 10/10/2026, pago 20/10/2026: 10 días. 12000 / 30 = 400. 400 × 10 = 4000." },
    fecha: "2026-10-12",
    entrada: { salario: 12000, motivo: "salida", fechaSalida: "2026-09-30", fechaPago: "2026-10-20" },
    esperado: { dias: 10, indemnizacion: 4000 },
  },
]);
