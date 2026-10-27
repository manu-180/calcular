import { definirCasos } from "@/motor/calculo";
import calculadora from "./qar-usd-converter";

export default definirCasos(calculadora, [
  {
    nombre: "USD 1,000 to riyals",
    origen: { tipo: "recalculado", detalle: "Decree 34/2001: 3.64 riyals per dollar. 1,000 × 3.64 = 3,640." },
    fecha: "2026-10-26",
    entrada: { monto: 1000, direccion: "usd-qar" },
    esperado: { resultado: 3640, qar: 3640, usd: 1000 },
  },
  {
    nombre: "QAR 10,000 to dollars",
    origen: { tipo: "recalculado", detalle: "10,000 ÷ 3.64 = 2,747.25." },
    fecha: "2026-10-26",
    entrada: { monto: 10000, direccion: "qar-usd" },
    esperado: { resultado: 2747.25, usd: 2747.25 },
  },
]);
