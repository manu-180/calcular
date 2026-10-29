import { definirCasos } from "@/motor/calculo";
import calculadora from "./withholding-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Consultancy fee of N$50,000",
    origen: { tipo: "recalculado", detalle: "NamRA: 10% on management, consultancy and entertainment fees. 5,000 withheld, 45,000 paid." },
    fecha: "2026-10-27",
    entrada: { tipo: "services", monto: 50000 },
    esperado: { retencion: 5000, neto: 45000, tasa: 10 },
  },
  {
    nombre: "Dividend of N$200,000 to a minority shareholder",
    origen: { tipo: "recalculado", detalle: "NRST 20% when the shareholder holds less than 25%. 40,000." },
    fecha: "2026-10-27",
    entrada: { tipo: "dividends-other", monto: 200000 },
    esperado: { retencion: 40000, tasa: 20 },
  },
  {
    nombre: "Dividend to a parent company with 25% or more",
    origen: { tipo: "recalculado", detalle: "NRST 10%: 10% × 200,000 = 20,000." },
    fecha: "2026-10-27",
    entrada: { tipo: "dividends-25", monto: 200000 },
    esperado: { retencion: 20000 },
  },
]);
