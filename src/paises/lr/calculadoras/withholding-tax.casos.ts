import { definirCasos } from "@/motor/calculo";
import calculadora from "./withholding-tax";

export default definirCasos(calculadora, [
  {
    nombre: "Payment for services of L$100,000",
    origen: { tipo: "recalculado", detalle: "LRA monthly withholding table: payment for services 6% = 6,000. Net 94,000." },
    fecha: "2026-10-27",
    entrada: { pago: "services", monto: 100000 },
    esperado: { retencion: 6000, neto: 94000, tasa: 6 },
  },
  {
    nombre: "Dividend of L$250,000",
    origen: { tipo: "recalculado", detalle: "Interest and dividends 15% = 37,500." },
    fecha: "2026-10-27",
    entrada: { pago: "interest-dividends", monto: 250000 },
    esperado: { retencion: 37500, neto: 212500 },
  },
  {
    nombre: "Board fees to a non-resident",
    origen: { tipo: "recalculado", detalle: "Board and management fees, non-resident 15% × 80,000 = 12,000." },
    fecha: "2026-10-27",
    entrada: { pago: "board-non-resident", monto: 80000 },
    esperado: { retencion: 12000 },
  },
  {
    nombre: "Gambling winnings",
    origen: { tipo: "recalculado", detalle: "Gambling 20% × 50,000 = 10,000." },
    fecha: "2026-10-27",
    entrada: { pago: "gambling", monto: 50000 },
    esperado: { retencion: 10000 },
  },
  {
    nombre: "No amount",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-27",
    entrada: { pago: "services", monto: 0 },
    esperaError: true,
  },
]);
