import { definirCasos } from "@/motor/calculo";
import contratoAPlazoFijo from "./contrato-a-plazo-fijo";

export default definirCasos(contratoAPlazoFijo, [
  {
    nombre: "Despido un mes antes del vencimiento",
    origen: {
      tipo: "recalculado",
      detalle:
        "CT art. 121: el salario que faltaba, sin pasar de la cesantía del art. 120. Del 01/12 al 31/12/2026 faltan 30 días: 500 × 30 = 15000. Cesantía con 1 año, 2 meses y 1 día: 1 + 61/360 = 1.1694 × 15000 = 17541.67. Se paga 15000.",
    },
    fecha: "2026-12-01",
    entrada: { salario: 15000, fechaIngreso: "2025-10-01", fechaDespido: "2026-12-01", fechaFin: "2026-12-31", microempresa: false },
    esperado: { diasRestantes: 30, salariosRestantes: 15000, limite: 17541.67, indemnizacion: 15000 },
  },
  {
    nombre: "Despido a mitad de un contrato de un año: rige el límite",
    origen: {
      tipo: "recalculado",
      detalle: "Faltan 184 días (del 30/06 al 31/12/2026): 500 × 184 = 92000. Con 6 meses justos la cesantía es de 10 días (art. 120 a): 5000. Se paga 5000.",
    },
    fecha: "2026-10-12",
    entrada: { salario: 15000, fechaIngreso: "2026-01-01", fechaDespido: "2026-06-30", fechaFin: "2026-12-31", microempresa: false },
    esperado: { diasRestantes: 184, salariosRestantes: 92000, limite: 5000, indemnizacion: 5000 },
  },
  {
    nombre: "Contrato que vence antes del despido",
    origen: { tipo: "recalculado", detalle: "La fecha de vencimiento no puede ser anterior al último día de trabajo." },
    fecha: "2026-10-12",
    entrada: { salario: 15000, fechaIngreso: "2026-01-01", fechaDespido: "2026-06-30", fechaFin: "2026-05-31", microempresa: false },
    esperaError: true,
  },
]);
