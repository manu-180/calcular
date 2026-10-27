import { definirCasos } from "@/motor/calculo";
import calculadora from "./withholding-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Invoice of QAR 100,000",
    origen: { tipo: "recalculado", detalle: "Income Tax Law art. 9(2): 5% × 100,000 = 5,000. Paid 95,000." },
    fecha: "2026-10-26",
    entrada: { monto: 100000, modo: "bruto" },
    esperado: { retencion: 5000, neto: 95000 },
  },
  {
    nombre: "Net of QAR 95,000 grossed up",
    origen: { tipo: "recalculado", detalle: "95,000 ÷ 0.95 = 100,000. Tax 5,000." },
    fecha: "2026-10-26",
    entrada: { monto: 95000, modo: "neto" },
    esperado: { bruto: 100000, retencion: 5000, neto: 95000 },
  },
]);
