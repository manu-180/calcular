import { definirCasos } from "@/motor/calculo";
import calculadora from "./dollar-to-kwacha";

export default definirCasos(calculadora, [
  {
    nombre: "US$100 on 27 October 2026",
    origen: { tipo: "oficial", url: "https://www.rbm.mw/Statistics/MajorRates/", detalle: "RBM middle rate on 27-October-2026: 1734.0118. 100 × 1734.0118 = 173,401.18." },
    fecha: "2026-10-27",
    entrada: { monto: 100, sentido: "usd" },
    esperado: { kwacha: 173401.18, tasa: 1734.0118, fecha: "2026-10-27" },
  },
  {
    nombre: "K1,000,000 to dollars",
    origen: { tipo: "recalculado", detalle: "1,000,000 / 1734.0118 = 576.70." },
    fecha: "2026-10-27",
    entrada: { monto: 1000000, sentido: "mwk" },
    esperado: { dolares: 576.7 },
  },
  {
    nombre: "Negative amount is rejected",
    origen: { tipo: "recalculado", detalle: "The amount cannot be negative." },
    fecha: "2026-10-27",
    entrada: { monto: -5, sentido: "usd" },
    esperaError: true,
  },
]);
