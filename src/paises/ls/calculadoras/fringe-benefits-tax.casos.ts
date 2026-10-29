import { definirCasos } from "@/motor/calculo";
import calculadora from "./fringe-benefits-tax";

export default definirCasos(calculadora, [
  {
    nombre: "Company car and housing (RSL public ruling example)",
    origen: {
      tipo: "recalculado",
      detalle:
        "RSL FBT ruling: car 15% × 520 000 × 365/365 = 78 000; housing rent 60 000 capped at 20% × 240 000 = 48 000. Total 126 000, grossed up 126 000 / (1 − 0.40) = 210 000, FBT 40% = 84 000.",
    },
    fecha: "2026-10-27",
    entrada: { remuneracion: 240000, auto: 520000, dias: 365, pagoAuto: 0, alquiler: 60000, pagoVivienda: 0, otros: 0 },
    esperado: { auto: 78000, vivienda: 48000, total: 126000, imponible: 210000, fbt: 84000 },
  },
  {
    nombre: "Car for half the year with a payment by the employee",
    origen: { tipo: "recalculado", detalle: "15% × 300 000 × 182/365 = 22 438.36, less 5 000 = 17 438.36. / 0.6 = 29 063.93. × 40% = 11 625.57." },
    fecha: "2026-10-27",
    entrada: { remuneracion: 300000, auto: 300000, dias: 182, pagoAuto: 5000, alquiler: 0, pagoVivienda: 0, otros: 0 },
    esperado: { auto: 17438.36, imponible: 29063.93, fbt: 11625.57 },
  },
  {
    nombre: "Utilities paid for the employee",
    origen: { tipo: "recalculado", detalle: "6 000 / 0.6 = 10 000. × 40% = 4 000." },
    fecha: "2026-10-27",
    entrada: { remuneracion: 200000, auto: 0, dias: 365, pagoAuto: 0, alquiler: 0, pagoVivienda: 0, otros: 6000 },
    esperado: { total: 6000, imponible: 10000, fbt: 4000 },
  },
  {
    nombre: "No benefits entered",
    origen: { tipo: "recalculado", detalle: "Nothing to tax." },
    fecha: "2026-10-27",
    entrada: { remuneracion: 200000, auto: 0, dias: 365, pagoAuto: 0, alquiler: 0, pagoVivienda: 0, otros: 0 },
    esperaError: true,
  },
]);
