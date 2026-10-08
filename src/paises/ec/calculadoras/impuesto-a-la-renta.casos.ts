import { definirCasos } from "@/motor/calculo";
import impuestoRenta from "./impuesto-a-la-renta";

export default definirCasos(impuestoRenta, [
  {
    nombre: "$24.000 al año en relación de dependencia, sin gastos personales",
    origen: {
      tipo: "recalculado",
      detalle: "Tabla SRI 2026. Aporte 9,45 % = 2.268. Base 21.732. Fracción 20.188: 631 + (21.732 − 20.188) × 12 % = 816,28. Retención 816,28 / 11 = 74,21.",
    },
    fecha: "2026-10-07",
    entrada: { ingresos: 24000, dependencia: true, gastos: 0, cargas: "0", catastrofica: false },
    esperado: { aporte: 2268, base: 21732, causado: 816.28, rebaja: 0, impuesto: 816.28, mensual: 74.21 },
  },
  {
    nombre: "La rebaja cubre todo el impuesto",
    origen: {
      tipo: "recalculado",
      detalle: "Tope sin cargas: 7 × 821,80 = 5.752,60. Rebaja 18 % × 5.752,60 = 1.035,47, mayor que el causado de 816,28: impuesto 0.",
    },
    fecha: "2026-10-07",
    entrada: { ingresos: 24000, dependencia: true, gastos: 6000, cargas: "0", catastrofica: false },
    esperado: { tope: 5752.6, rebaja: 816.28, impuesto: 0 },
  },
  {
    nombre: "$60.000 con 2 cargas y $10.000 de gastos",
    origen: {
      tipo: "recalculado",
      detalle: "Aporte 5.670; base 54.330. Fracción 46.575: 4.965 + 7.755 × 25 % = 6.903,75. Tope 11 × 821,80 = 9.039,80; rebaja 18 % = 1.627,16. Impuesto 5.276,59; retención 479,69.",
    },
    fecha: "2026-10-07",
    entrada: { ingresos: 60000, dependencia: true, gastos: 10000, cargas: "2", catastrofica: false },
    esperado: { base: 54330, causado: 6903.75, tope: 9039.8, rebaja: 1627.16, impuesto: 5276.59, mensual: 479.69 },
  },
  {
    nombre: "Justo en la fracción exenta, sin relación de dependencia",
    origen: { tipo: "recalculado", detalle: "Base 12.208 = límite de la fracción exenta 2026: impuesto 0." },
    fecha: "2026-10-07",
    entrada: { ingresos: 12208, dependencia: false, gastos: 0, cargas: "0", catastrofica: false },
    esperado: { aporte: 0, causado: 0, impuesto: 0, mensual: null },
  },
  {
    nombre: "Enfermedad catastrófica: tope de 100 canastas",
    origen: {
      tipo: "recalculado",
      detalle: "Tope 100 × 821,80 = 82.180. Rebaja 18 % de 82.180 = 14.792,40, mayor que el causado (6.903,75): impuesto 0.",
    },
    fecha: "2026-10-07",
    entrada: { ingresos: 60000, dependencia: true, gastos: 90000, cargas: "0", catastrofica: true },
    esperado: { tope: 82180, rebaja: 6903.75, impuesto: 0 },
  },
]);
