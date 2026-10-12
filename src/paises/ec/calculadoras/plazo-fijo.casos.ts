import { definirCasos } from "@/motor/calculo";
import plazoFijo from "./plazo-fijo";

export default definirCasos(plazoFijo, [
  {
    nombre: "10.000 a 180 días al 6 %: exento",
    origen: {
      tipo: "recalculado",
      detalle: "10.000 × 6 % × 180 / 360 = 300. LRTI art. 9 num. 15.1: a 180 días o más y sin deuda con el banco, exento. Recibe 10.300.",
    },
    fecha: "2026-10-07",
    entrada: { capital: 10000, tasa: 6, dias: 180, base: "360", deudor: false },
    esperado: { interes: 300, retencion: 0, neto: 300, final: 10300 },
  },
  {
    nombre: "90 días: retención del 3 %",
    origen: { tipo: "recalculado", detalle: "5.000 × 5 % × 90 / 360 = 62,50. Retención 3 % = 1,88. Neto 60,62." },
    fecha: "2026-10-07",
    entrada: { capital: 5000, tasa: 5, dias: 90, base: "360", deudor: false },
    esperado: { interes: 62.5, retencion: 1.88, neto: 60.62, final: 5060.62 },
  },
  {
    nombre: "Plazo largo pero con préstamo en el banco",
    origen: { tipo: "recalculado", detalle: "10.000 × 7 % × 365 / 365 = 700. Deudor: retención 3 % = 21. Neto 679." },
    fecha: "2026-10-07",
    entrada: { capital: 10000, tasa: 7, dias: 365, base: "365", deudor: true },
    esperado: { interes: 700, retencion: 21, neto: 679 },
  },
]);
