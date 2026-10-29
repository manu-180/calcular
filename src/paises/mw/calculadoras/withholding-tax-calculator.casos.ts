import { definirCasos } from "@/motor/calculo";
import calculadora from "./withholding-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "MRA example: K500,000 for carriage and haulage",
    origen: {
      tipo: "oficial",
      url: "https://www.mra.mw/view/withholding-tax",
      detalle: "WHT rate for carriage and haulage 10%: 10% × K500,000 = K50,000. Amount due to the transporter K450,000.",
    },
    fecha: "2026-10-27",
    entrada: { pago: "haulage", monto: 500000 },
    esperado: { retencion: 50000, neto: 450000, tasa: 10 },
  },
  {
    nombre: "K200,000 of fees",
    origen: { tipo: "recalculado", detalle: "Fees 20%: 40,000 withheld, 160,000 paid." },
    fecha: "2026-10-27",
    entrada: { pago: "fees", monto: 200000 },
    esperado: { retencion: 40000, neto: 160000, tasa: 20 },
  },
  {
    nombre: "K1,000,000 of supplies",
    origen: { tipo: "recalculado", detalle: "Supplies to traders and institutions 3%: 30,000." },
    fecha: "2026-10-27",
    entrada: { pago: "supplies", monto: 1000000 },
    esperado: { retencion: 30000, neto: 970000 },
  },
  {
    nombre: "Zero is rejected",
    origen: { tipo: "recalculado", detalle: "The payment has to be above zero." },
    fecha: "2026-10-27",
    entrada: { pago: "services", monto: 0 },
    esperaError: true,
  },
]);
