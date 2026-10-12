import { definirCasos } from "@/motor/calculo";
import depositoAPlazo from "./deposito-a-plazo";

export default definirCasos(depositoAPlazo, [
  {
    nombre: "C$50,000 al 5 % por 360 días",
    origen: { tipo: "recalculado", detalle: "50000 × 5 % × 360 / 360 = 2500. LCT art. 81 y 87 (Ley 987): IR 15 % sobre la renta bruta = 375. Neto 2125. Total 52125." },
    fecha: "2026-10-12",
    entrada: { monto: 50000, tasa: 5, dias: 360, base: "360" },
    esperado: { interes: 2500, ir: 375, neto: 2125, total: 52125 },
  },
  {
    nombre: "C$100,000 al 6 % por 180 días, año de 365",
    origen: { tipo: "recalculado", detalle: "100000 × 6 % × 180 / 365 = 2958.90. 15 % = 443.84. Neto 2515.06." },
    fecha: "2026-10-12",
    entrada: { monto: 100000, tasa: 6, dias: 180, base: "365" },
    esperado: { interes: 2958.9, ir: 443.84, neto: 2515.06, total: 102515.06 },
  },
]);
