import { definirCasos } from "@/motor/calculo";
import calculadora from "./dollar-to-shilling";

export default definirCasos(calculadora, [
  {
    nombre: "US$100 at the CBK rate of 15 October 2026",
    origen: { tipo: "recalculado", url: "https://www.centralbank.go.ke/", detalle: "100 × 129.81 = 12,981." },
    fecha: "2026-10-17",
    entrada: { monto: 100, sentido: "usd" },
    esperado: { chelines: 12981, tasa: 129.81, fecha: "2026-10-15" },
  },
  {
    nombre: "KSh 50,000 to dollars",
    origen: { tipo: "recalculado", detalle: "50,000 / 129.81 = 385.18." },
    fecha: "2026-10-17",
    entrada: { monto: 50000, sentido: "kes" },
    esperado: { dolares: 385.18 },
  },
]);
