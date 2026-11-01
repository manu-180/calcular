import { definirCasos } from "@/motor/calculo";
import calculadora from "./indian-rupee-to-npr";

export default definirCasos(calculadora, [
  {
    nombre: "INR 1,000 at NPR 160 per 100",
    origen: { tipo: "recalculado", url: "https://www.nrb.org.np/forex/", detalle: "1,000 × 160 / 100 = 1,600." },
    fecha: "2026-10-29",
    entrada: { monto: 1000, sentido: "inr" },
    esperado: { nepali: 1600, tasa: 1.6, fecha: "2026-10-29" },
  },
  {
    nombre: "NPR 8,000 to Indian rupees",
    origen: { tipo: "recalculado", detalle: "8,000 / 1.6 = 5,000." },
    fecha: "2026-10-29",
    entrada: { monto: 8000, sentido: "npr" },
    esperado: { indian: 5000 },
  },
  {
    nombre: "Negative amount",
    origen: { tipo: "recalculado", detalle: "The amount cannot be negative." },
    fecha: "2026-10-29",
    entrada: { monto: -5, sentido: "inr" },
    esperaError: true,
  },
]);
