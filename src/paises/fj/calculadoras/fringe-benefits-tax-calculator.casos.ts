import { definirCasos } from "@/motor/calculo";
import calculadora from "./fringe-benefits-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "FRCS worked example: benefits of FJ$80,000 in a quarter",
    origen: {
      tipo: "oficial",
      url: "https://frcs.org.fj/files/2026/08/Employer-Guide-2026.pdf",
      detalle: "The Employer Guide 2026: taxable amount 80,000 / (1 − 0.20) = 100,000. FBT payable 20% × 100,000 = 20,000.",
    },
    fecha: "2026-10-29",
    entrada: { valor: 80000 },
    esperado: { gravable: 100000, fbt: 20000, costoTotal: 100000, recargoTardio: 5000 },
  },
  {
    nombre: "Benefits of FJ$1,500",
    origen: { tipo: "recalculado", detalle: "1,500 / 0.8 = 1,875. FBT 20% × 1,875 = 375." },
    fecha: "2026-10-29",
    entrada: { valor: 1500 },
    esperado: { gravable: 1875, fbt: 375, costoTotal: 1875 },
  },
  { nombre: "Zero value is rejected", origen: { tipo: "recalculado", detalle: "Value must be above zero." }, fecha: "2026-10-29", entrada: { valor: 0 }, esperaError: true },
]);
