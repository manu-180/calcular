import { definirCasos } from "@/motor/calculo";
import calculadora from "./property-transfer-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Rs. 20 million house",
    origen: { tipo: "recalculado", detalle: "Seller 2.75% × 20,000,000 = 550,000; buyer 1.25% = 250,000." },
    fecha: "2026-10-17",
    entrada: { precio: 20000000, valor: null },
    esperado: { vendedor: 550000, comprador: 250000, total: 800000 },
  },
  {
    nombre: "FBR value above the price",
    origen: { tipo: "recalculado", detalle: "Buyer 1.25% × 24,000,000 = 300,000; seller 2.75% × 20,000,000 = 550,000." },
    fecha: "2026-10-17",
    entrada: { precio: 20000000, valor: 24000000 },
    esperado: { comprador: 300000, total: 850000 },
  },
]);
