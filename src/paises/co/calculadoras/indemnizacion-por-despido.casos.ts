import { definirCasos } from "@/motor/calculo";
import indemnizacion from "./indemnizacion-por-despido";

export default definirCasos(indemnizacion, [
  {
    nombre: "Indefinido, dos años, salario menor a 10 SMMLV",
    origen: { tipo: "recalculado", detalle: "CST art. 64: 720 días = 30 + 20 × 360 / 360 = 50 días × 100.000 = 5.000.000." },
    fecha: "2026-10-15",
    entrada: { contrato: "indefinido", salario: 3000000, fechaIngreso: "2024-10-16", fechaDespido: "2026-10-15", finContrato: null },
    esperado: { diasServicio: 720, diasIndemnizacion: 50, indemnizacion: 5000000 },
  },
  {
    nombre: "Indefinido, menos de un año: se pagan los 30 días completos",
    origen: { tipo: "recalculado", detalle: "225 días de servicio: 30 días × 2.000.000 / 30 = 2.000.000." },
    fecha: "2026-10-15",
    entrada: { contrato: "indefinido", salario: 2000000, fechaIngreso: "2026-03-01", fechaDespido: "2026-10-15", finContrato: null },
    esperado: { diasIndemnizacion: 30, indemnizacion: 2000000 },
  },
  {
    nombre: "Salario justo de 10 SMMLV: tabla de 20 y 15 días",
    origen: { tipo: "recalculado", detalle: "10 × 1.750.905 = 17.509.050. Un año: 20 días × 583.635 = 11.672.700." },
    fecha: "2026-10-15",
    entrada: { contrato: "indefinido", salario: 17509050, fechaIngreso: "2025-10-16", fechaDespido: "2026-10-15", finContrato: null },
    esperado: { diasServicio: 360, diasIndemnizacion: 20, indemnizacion: 11672700 },
  },
  {
    nombre: "Salario alto, tres años",
    origen: { tipo: "recalculado", detalle: "1.080 días: 20 + 15 × 720 / 360 = 50 días × 20.000.000 / 30 = 33.333.333,33." },
    fecha: "2026-10-15",
    entrada: { contrato: "indefinido", salario: 20000000, fechaIngreso: "2023-10-16", fechaDespido: "2026-10-15", finContrato: null },
    esperado: { diasIndemnizacion: 50, indemnizacion: 33333333 },
  },
  {
    nombre: "Término fijo: salarios hasta el fin del contrato",
    origen: { tipo: "recalculado", detalle: "16/10/2026 a 15/1/2027 = 90 días comerciales × 100.000 = 9.000.000." },
    fecha: "2026-10-15",
    entrada: { contrato: "fijo", salario: 3000000, fechaIngreso: "2026-01-16", fechaDespido: "2026-10-15", finContrato: "2027-01-15" },
    esperado: { diasIndemnizacion: 90, indemnizacion: 9000000 },
  },
  {
    nombre: "Término fijo sin fecha de fin",
    origen: { tipo: "recalculado", detalle: "Sin fecha de fin no se puede calcular: la función pide el dato." },
    fecha: "2026-10-15",
    entrada: { contrato: "fijo", salario: 3000000, fechaIngreso: "2026-01-16", fechaDespido: "2026-10-15", finContrato: null },
    esperaError: true,
  },
]);
