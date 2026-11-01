import { definirCasos } from "@/motor/calculo";
import calculadora from "./secondary-employment-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "FJ$1,000 from a second job",
    origen: { tipo: "recalculado", url: "https://frcs.org.fj/files/2026/08/Employer-Guide-2026.pdf", detalle: "The Employer Guide 2026 sets the secondary rate at 20% of gross payment. 20% × 1,000 = 200." },
    fecha: "2026-10-29",
    entrada: { pago: 1000, codigo: "s" },
    esperado: { impuesto: 200, neto: 800, tasa: 20, umbral: 30000 },
  },
  {
    nombre: "No tax code declaration",
    origen: { tipo: "recalculado", url: "https://frcs.org.fj/files/2026/08/Employer-Guide-2026.pdf", detalle: "The guide sets the no-declaration rate at 20% of gross employment income. 20% × 2,500.50 = 500.10." },
    fecha: "2026-10-29",
    entrada: { pago: 2500.5, codigo: "none" },
    esperado: { impuesto: 500.1, neto: 2000.4 },
  },
  { nombre: "Zero pay is rejected", origen: { tipo: "recalculado", detalle: "Pay must be above zero." }, fecha: "2026-10-29", entrada: { pago: 0, codigo: "s" }, esperaError: true },
]);
