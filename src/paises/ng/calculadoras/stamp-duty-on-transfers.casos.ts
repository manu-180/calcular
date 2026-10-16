import { definirCasos } from "@/motor/calculo";
import calculadora from "./stamp-duty-on-transfers";

export default definirCasos(calculadora, [
  {
    nombre: "20 transfers of ₦50,000",
    origen: { tipo: "recalculado", detalle: "₦50 fixed duty on each transfer of ₦10,000 or more: 20 × 50 = 1,000 a month, 12,000 a year." },
    fecha: "2026-10-16",
    entrada: { monto: 50000, cantidad: 20, tipo: "regular" },
    esperado: { mensual: 1000, anual: 12000, porTransferencia: 50, estado: "Stamp duty applies" },
  },
  {
    nombre: "Transfers below ₦10,000",
    origen: { tipo: "recalculado", detalle: "Transfers below 10,000 are exempt." },
    fecha: "2026-10-16",
    entrada: { monto: 9999, cantidad: 30, tipo: "regular" },
    esperado: { mensual: 0, estado: "Exempt" },
  },
  {
    nombre: "Salary payment",
    origen: { tipo: "recalculado", detalle: "Transfers for salary payment are exempt." },
    fecha: "2026-10-16",
    entrada: { monto: 500000, cantidad: 1, tipo: "salary" },
    esperado: { mensual: 0 },
  },
]);
