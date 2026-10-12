import { definirCasos } from "@/motor/calculo";
import plazoFijo from "./plazo-fijo";

export default definirCasos(plazoFijo, [
  {
    nombre: "$ 100.000 a 180 días al 5 %",
    origen: {
      tipo: "recalculado",
      url: "https://www.impo.com.uy/bases/todgi2023/101-2024/37_T7",
      detalle: "Interés 100.000 × 5 % × 180 / 365 = 2.465,75. TO 2023, T7, art. 37: pesos a un año o menos, 5,5 % = 135,62. Neto 2.330,13.",
    },
    fecha: "2026-10-12",
    entrada: { capital: 100000, moneda: "uyu", tasa: 5, dias: 180 },
    esperado: { interes: 2465.75, tasaIrpf: 5.5, irpf: 135.62, neto: 2330.13, total: 102330.13 },
  },
  {
    nombre: "U$S 10.000 a un año al 4 %",
    origen: { tipo: "recalculado", detalle: "Interés 400. Moneda extranjera a un año o menos: 12 % = 48. Neto 352." },
    fecha: "2026-10-12",
    entrada: { capital: 10000, moneda: "usd", tasa: 4, dias: 365 },
    esperado: { interes: 400, tasaIrpf: 12, irpf: 48, neto: 352 },
  },
  {
    nombre: "UI a dos años",
    origen: { tipo: "recalculado", detalle: "100.000 × 3 % × 730 / 365 = 6.000. UI de uno a tres años: 7 % = 420. Neto 5.580." },
    fecha: "2026-10-12",
    entrada: { capital: 100000, moneda: "ui", tasa: 3, dias: 730 },
    esperado: { tasaIrpf: 7, irpf: 420, neto: 5580 },
  },
  {
    nombre: "Pesos a más de tres años",
    origen: { tipo: "recalculado", detalle: "Más de tres años en pesos con tasa fija: 0,5 %." },
    fecha: "2026-10-12",
    entrada: { capital: 100000, moneda: "uyu", tasa: 6, dias: 1460 },
    esperado: { tasaIrpf: 0.5 },
  },
]);
