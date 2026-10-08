import { definirCasos } from "@/motor/calculo";
import salarioNeto from "./salario-neto";

export default definirCasos(salarioNeto, [
  {
    nombre: "RD$60,000 brutos",
    origen: {
      tipo: "recalculado",
      detalle:
        "SFS 3.04 % = 1,824; AFP 2.87 % = 1,722. Base 56,454 × 12 = 677,448. ISR anual 31,216 + 20 % × (677,448 − 624,329.01) = 41,839.80; ÷ 12 = 3,486.65. Neto 52,967.35.",
    },
    fecha: "2026-10-07",
    entrada: { salario: 60000 },
    esperado: { sfs: 1824, afp: 1722, base: 56454, isr: 3486.65, descuentos: 7032.65, neto: 52967.35 },
  },
  {
    nombre: "Salario sobre los topes del SFS y la AFP",
    origen: {
      tipo: "recalculado",
      detalle:
        "SFS 3.04 % × 232,230 = 7,059.79; AFP 2.87 % × 464,460 = 13,330. Base 479,610.21 × 12 = 5,755,322.52. ISR 79,776 + 25 % × (5,755,322.52 − 867,123.01) = 1,301,825.88; ÷ 12 = 108,485.49. Neto 371,124.72.",
    },
    fecha: "2026-10-07",
    entrada: { salario: 500000 },
    esperado: { sfs: 7059.79, afp: 13330, base: 479610.21, isr: 108485.49, neto: 371124.72 },
  },
  {
    nombre: "Salario exento de ISR",
    origen: { tipo: "recalculado", detalle: "SFS 1,064; AFP 1,004.50. Base 32,931.50 × 12 = 395,178, menor que 416,220: sin ISR." },
    fecha: "2026-10-07",
    entrada: { salario: 35000 },
    esperado: { sfs: 1064, afp: 1004.5, isr: 0, neto: 32931.5 },
  },
]);
