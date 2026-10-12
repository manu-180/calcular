import { definirCasos } from "@/motor/calculo";
import depositoAPlazo from "./deposito-a-plazo";

export default definirCasos(depositoAPlazo, [
  {
    nombre: "L100,000 al 7 % por 360 días",
    origen: { tipo: "recalculado", detalle: "Interés simple: 100000 × 7 % × 360 / 360 = 7000. Total 107000." },
    fecha: "2026-10-12",
    entrada: { monto: 100000, tasa: 7, dias: 360, base: "360", retencion: null },
    esperado: { interes: 7000, retenido: 0, neto: 7000, total: 107000 },
  },
  {
    nombre: "L250,000 al 6.5 % por 180 días con 10 % de retención",
    origen: { tipo: "recalculado", detalle: "250000 × 6.5 % × 180 / 360 = 8125. Retención 10 %: 812.50. Neto 7312.50; total 257312.50." },
    fecha: "2026-10-12",
    entrada: { monto: 250000, tasa: 6.5, dias: 180, base: "360", retencion: 10 },
    esperado: { interes: 8125, retenido: 812.5, neto: 7312.5, total: 257312.5 },
  },
  {
    nombre: "Base de 365 días",
    origen: { tipo: "recalculado", detalle: "100000 × 7 % × 90 / 365 = 1726.03." },
    fecha: "2026-10-12",
    entrada: { monto: 100000, tasa: 7, dias: 90, base: "365", retencion: null },
    esperado: { interes: 1726.03 },
  },
]);
