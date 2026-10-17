import { definirCasos } from "@/motor/calculo";
import calculadora from "./dollar-to-naira";

export default definirCasos(calculadora, [
  {
    nombre: "US$100 at the NFEM rate of 15 October 2026",
    origen: { tipo: "recalculado", detalle: "CBN NFEM weighted average 1,331.6139: 100 × 1,331.6139 = 133,161.39." },
    fecha: "2026-10-15",
    entrada: { monto: 100, sentido: "usd" },
    esperado: { resultado: 133161.39, dolares: null, tasa: 1331.6139, fecha: "2026-10-15" },
  },
  {
    nombre: "₦1 million to dollars",
    origen: { tipo: "recalculado", detalle: "1,000,000 / 1,331.6139 = 750.97." },
    fecha: "2026-10-15",
    entrada: { monto: 1000000, sentido: "ngn" },
    esperado: { dolares: 750.97, resultado: null },
  },
  {
    nombre: "Weekend day uses the last published rate",
    origen: { tipo: "recalculado", detalle: "No NFEM rate on 11 October 2026 (Sunday); the 9 October rate of 1,331.1860 applies." },
    fecha: "2026-10-11",
    entrada: { monto: 1, sentido: "usd" },
    esperado: { tasa: 1331.186, fecha: "2026-10-09" },
  },
]);
