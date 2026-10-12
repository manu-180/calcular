import { definirCasos } from "@/motor/calculo";
import contratoAPlazoFijo from "./contrato-a-plazo-fijo";

export default definirCasos(contratoAPlazoFijo, [
  {
    nombre: "Contrato de un año terminado a los tres meses",
    origen: {
      tipo: "recalculado",
      detalle: "Art. 31: 90 días trabajados / 7 = 12,9, cuentan 13. Contrato de seis meses o más: mínimo 22 días. 22 × 20.000 = 440.000.",
    },
    fecha: "2026-10-12",
    entrada: { salario: 600000, fechaInicio: "2026-01-01", fechaFinPactada: "2026-12-31", fechaTerminacion: "2026-03-31" },
    esperado: { diasTrabajados: 90, dias: 22, indemnizacion: 440000 },
  },
  {
    nombre: "Contrato corto terminado a los diez días",
    origen: { tipo: "recalculado", detalle: "10 / 7 = 1,4, cuentan 2. Contrato de tres meses: mínimo 3 días. 3 × 15.000 = 45.000." },
    fecha: "2026-10-12",
    entrada: { salario: 450000, fechaInicio: "2026-01-01", fechaFinPactada: "2026-03-31", fechaTerminacion: "2026-01-10" },
    esperado: { dias: 3, indemnizacion: 45000 },
  },
  {
    nombre: "Terminado un mes antes del plazo",
    origen: { tipo: "recalculado", detalle: "Del 1/1 al 30/11/2026: 334 días; / 7 = 47,7, cuentan 48. 48 × 20.000 = 960.000." },
    fecha: "2026-10-12",
    entrada: { salario: 600000, fechaInicio: "2026-01-01", fechaFinPactada: "2026-12-31", fechaTerminacion: "2026-11-30" },
    esperado: { diasTrabajados: 334, dias: 48, indemnizacion: 960000 },
  },
  {
    nombre: "Trabajó hasta el final",
    origen: { tipo: "recalculado", detalle: "Si llegó a la fecha pactada no hay terminación anticipada." },
    fecha: "2026-10-12",
    entrada: { salario: 600000, fechaInicio: "2026-01-01", fechaFinPactada: "2026-06-30", fechaTerminacion: "2026-06-30" },
    esperaError: true,
  },
]);
