import { definirCasos } from "@/motor/calculo";
import calculadora from "./contractor-tax";

export default definirCasos(calculadora, [
  {
    nombre: "Contract of L$100,000",
    origen: { tipo: "recalculado", detalle: "LRA: contracts on services rendered 10% = 10,000. Contractor receives 90,000." },
    fecha: "2026-10-27",
    entrada: { monto: 100000, tipo: "contracts" },
    esperado: { impuesto: 10000, neto: 90000, tasa: 10 },
  },
  {
    nombre: "Invoice for services of L$45,500",
    origen: { tipo: "recalculado", detalle: "Payment for services 6% = 2,730. Receives 42,770." },
    fecha: "2026-10-27",
    entrada: { monto: 45500, tipo: "services" },
    esperado: { impuesto: 2730, neto: 42770, tasa: 6 },
  },
  {
    nombre: "No amount",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-27",
    entrada: { monto: 0, tipo: "contracts" },
    esperaError: true,
  },
]);
