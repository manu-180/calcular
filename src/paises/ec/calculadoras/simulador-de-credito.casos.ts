import { definirCasos } from "@/motor/calculo";
import simulador from "./simulador-de-credito";

export default definirCasos(simulador, [
  {
    nombre: "10.000 a 12 meses al 12 % con cuota fija",
    origen: {
      tipo: "recalculado",
      detalle: "Tasa mensual 1 %. Cuota = 10.000 × 0,01 / (1 − 1,01^−12) = 888,49. Total 888,4879 × 12 = 10.661,85. Intereses 661,85.",
    },
    fecha: "2026-10-07",
    entrada: { monto: 10000, tasa: 12, meses: 12, sistema: "frances" },
    esperado: { primera: 888.49, ultima: 888.49, intereses: 661.85, total: 10661.85 },
  },
  {
    nombre: "12.000 a 12 meses al 12 % con cuota decreciente",
    origen: {
      tipo: "recalculado",
      detalle: "Capital 1.000 por mes. Primera: 1.000 + 1 % de 12.000 = 1.120. Última: 1.000 + 1 % de 1.000 = 1.010. Intereses 0,01 × 12.000 × 13 / 2 = 780.",
    },
    fecha: "2026-10-07",
    entrada: { monto: 12000, tasa: 12, meses: 12, sistema: "aleman" },
    esperado: { primera: 1120, ultima: 1010, intereses: 780, total: 12780 },
  },
  {
    nombre: "Sin interés",
    origen: { tipo: "recalculado", detalle: "1.200 / 12 = 100 por mes, sin intereses." },
    fecha: "2026-10-07",
    entrada: { monto: 1200, tasa: 0, meses: 12, sistema: "frances" },
    esperado: { primera: 100, intereses: 0, total: 1200 },
  },
]);
