import { definirCasos } from "@/motor/calculo";
import cda from "./cda";

export default definirCasos(cda, [
  {
    nombre: "CDA de 100 millones a 360 días",
    origen: { tipo: "recalculado", detalle: "Interés simple: 100.000.000 × 7,32 % × 360 / 365 = 7.219.726,03 (7.219.726). Total 107.219.726. Por mes: 7.219.726 / 360 × 30 = 601.643,83 (601.644)." },
    fecha: "2026-10-12",
    entrada: { monto: 100000000, tasa: 7.32, dias: 360 },
    esperado: { interes: 7219726, total: 107219726, mensual: 601644 },
  },
  {
    nombre: "CDA a 30 días",
    origen: { tipo: "recalculado", detalle: "100.000.000 × 5,28 % × 30 / 365 = 433.972,60 (433.973)." },
    fecha: "2026-10-12",
    entrada: { monto: 100000000, tasa: 5.28, dias: 30 },
    esperado: { interes: 433973, total: 100433973 },
  },
]);
