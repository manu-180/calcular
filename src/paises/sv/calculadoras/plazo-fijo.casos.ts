import { definirCasos } from "@/motor/calculo";
import plazoFijo from "./plazo-fijo";

export default definirCasos(plazoFijo, [
  {
    nombre: "$10,000 al 5 % por 180 días, persona con saldo bajo",
    origen: { tipo: "recalculado", detalle: "10.000 × 5 % × 180 / 365 = 246,575 → 246,58. Saldo 10.000 < 25.000: exento (LISR 4 num. 5)." },
    fecha: "2026-10-12",
    entrada: { monto: 10000, tasa: 5, dias: 180, titular: "persona", otrosDepositos: 0, base: "365" },
    esperado: { interes: 246.58, retencion: 0, neto: 246.58, total: 10246.58 },
  },
  {
    nombre: "$30,000 al 4 % por 360 días, base 360",
    origen: { tipo: "recalculado", detalle: "30.000 × 4 % × 360 / 360 = 1.200. Saldo 30.000: retiene 10 % (CT 159) = 120. Neto 1.080." },
    fecha: "2026-10-12",
    entrada: { monto: 30000, tasa: 4, dias: 360, titular: "persona", otrosDepositos: 0, base: "360" },
    esperado: { interes: 1200, retencion: 120, neto: 1080, total: 31080 },
  },
  {
    nombre: "Saldo total justo en el límite: retiene",
    origen: { tipo: "recalculado", detalle: "20.000 + 5.000 = 25.000, no es inferior a 25.000. 20.000 × 5 % × 365 / 365 = 1.000; 10 % = 100." },
    fecha: "2026-10-12",
    entrada: { monto: 20000, tasa: 5, dias: 365, titular: "persona", otrosDepositos: 5000, base: "365" },
    esperado: { interes: 1000, retencion: 100, neto: 900 },
  },
  {
    nombre: "Empresa con depósito chico: retiene igual",
    origen: { tipo: "recalculado", detalle: "10.000 × 5 % × 90 / 360 = 125. La exención es solo para personas: 10 % = 12,50." },
    fecha: "2026-10-12",
    entrada: { monto: 10000, tasa: 5, dias: 90, titular: "empresa", otrosDepositos: 0, base: "360" },
    esperado: { interes: 125, retencion: 12.5, neto: 112.5 },
  },
]);
