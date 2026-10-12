import { definirCasos } from "@/motor/calculo";
import tasas from "./tasa-efectiva-anual";

export default definirCasos(tasas, [
  {
    nombre: "12 % E.A. a mensual",
    origen: { tipo: "recalculado", detalle: "1,12^(1/12) − 1 = 0,948879 % mensual; × 12 = 11,386552 % N.M.V." },
    fecha: "2026-10-15",
    entrada: { tasa: 12, tipo: "ea" },
    esperado: { ea: 12, mensual: 0.948879, nominal: 11.386552 },
    tolerancia: 0.000005,
  },
  {
    nombre: "1 % mensual a efectiva anual",
    origen: { tipo: "recalculado", detalle: "1,01^12 − 1 = 12,682503 % E.A." },
    fecha: "2026-10-15",
    entrada: { tasa: 1, tipo: "mv" },
    esperado: { ea: 12.682503, nominal: 12 },
    tolerancia: 0.000005,
  },
  {
    nombre: "18 % N.M.V. a efectiva anual",
    origen: { tipo: "recalculado", detalle: "18 / 12 = 1,5 % mensual; 1,015^12 − 1 = 19,561817 % E.A." },
    fecha: "2026-10-15",
    entrada: { tasa: 18, tipo: "nmv" },
    esperado: { ea: 19.561817, mensual: 1.5 },
    tolerancia: 0.000005,
  },
]);
