import { definirCasos } from "@/motor/calculo";
import calculadora from "./treasury-bill-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "₦1 million, 364 days at 18%",
    origen: {
      tipo: "recalculado",
      detalle: "Price = 1,000,000 × (1 − 0.18 × 364 / 365) = 820,493.15. Earnings 179,506.85. True yield 0.18 / (1 − 0.18 × 364 / 365) = 21.94%.",
    },
    fecha: "2026-10-16",
    entrada: { nominal: 1000000, descuento: 18, dias: "364" },
    esperado: { precio: 820493.15, descuento: 179506.85, rendimiento: 21.938 },
    tolerancia: 0.001,
  },
  {
    nombre: "₦500,000, 91 days at 16%",
    origen: { tipo: "recalculado", detalle: "500,000 × (1 − 0.16 × 91 / 365) = 480,054.79; yield 16.66%." },
    fecha: "2026-10-16",
    entrada: { nominal: 500000, descuento: 16, dias: "91" },
    esperado: { precio: 480054.79, descuento: 19945.21 },
  },
]);
