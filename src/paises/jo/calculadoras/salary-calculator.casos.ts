import { definirCasos } from "@/motor/calculo";
import calculadora from "./salary-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "800 al mes, soltero",
    origen: { tipo: "recalculado", detalle: "Seguro social 7,5 % de 800 = 60. Anual 9.600 − 9.000 = 600 imponible: 5 % = 30 al año, 2,5 al mes. Neto 800 − 60 − 2,5 = 737,5." },
    fecha: "2026-10-24",
    entrada: { salario: 800, dependientes: false, ssc: true },
    esperado: { ssc: 60, impuesto: 2.5, neto: 737.5, netoAnual: 8850 },
  },
  {
    nombre: "2.000 al mes con familia",
    origen: { tipo: "recalculado", detalle: "Seguro 150. Anual 24.000 − 18.000 = 6.000: 250 + 100 = 350; por mes 29,167. Neto 2.000 − 150 − 29,167 = 1.820,833." },
    fecha: "2026-10-24",
    entrada: { salario: 2000, dependientes: true, ssc: true },
    esperado: { ssc: 150, impuesto: 29.167, neto: 1820.833 },
  },
  {
    nombre: "5.000 al mes con tope del seguro de 2026",
    origen: {
      tipo: "recalculado",
      detalle: "Seguro 7,5 % de 3.733 = 279,975. Anual 60.000 − 9.000 = 51.000: 2.500 + 25 % de 31.000 = 7.750 → 10.250; por mes 854,167. Neto 5.000 − 279,975 − 854,167 = 3.865,858.",
    },
    fecha: "2026-10-24",
    entrada: { salario: 5000, dependientes: false, ssc: true },
    esperado: { ssc: 279.975, impuesto: 854.167, neto: 3865.858 },
  },
  {
    nombre: "5.000 al mes con el tope de 2025",
    origen: { tipo: "recalculado", detalle: "Tope 2025: 3.668. Seguro 7,5 % = 275,1. Impuesto igual, 854,167. Neto 3.870,733." },
    fecha: "2025-06-30",
    entrada: { salario: 5000, dependientes: false, ssc: true },
    esperado: { ssc: 275.1, neto: 3870.733 },
  },
  {
    nombre: "Sin seguro social",
    origen: { tipo: "recalculado", detalle: "Sin aporte. Neto 800 − 2,5 = 797,5." },
    fecha: "2026-10-24",
    entrada: { salario: 800, dependientes: false, ssc: false },
    esperado: { ssc: 0, neto: 797.5 },
  },
  {
    nombre: "Sin salario",
    origen: { tipo: "recalculado", detalle: "Salario 0." },
    fecha: "2026-10-24",
    entrada: { salario: 0, dependientes: false, ssc: true },
    esperaError: true,
  },
]);
