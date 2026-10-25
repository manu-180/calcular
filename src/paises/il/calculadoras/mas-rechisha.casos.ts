import { definirCasos } from "@/motor/calculo";
import calculadora from "./mas-rechisha";

export default definirCasos(calculadora, [
  {
    nombre: "Vivienda única de 2.500.000",
    origen: {
      tipo: "recalculado",
      detalle: "הוראת ביצוע 1/2025: 368.295 x 3,5 % = 12.890,325 + 152.960 x 5 % = 7.648. Total 20.538,33.",
    },
    fecha: "2026-10-24",
    entrada: { shovi: 2500000, sug: "yechida" },
    esperado: { mas: 20538.33 },
  },
  {
    nombre: "Vivienda única bajo el umbral",
    origen: { tipo: "recalculado", detalle: "1.500.000 < 1.978.745: sin impuesto." },
    fecha: "2026-10-24",
    entrada: { shovi: 1500000, sug: "yechida" },
    esperado: { mas: 0 },
  },
  {
    nombre: "Vivienda adicional de 2.500.000",
    origen: { tipo: "recalculado", detalle: "8 % desde el primer shekel: 200.000." },
    fecha: "2026-10-24",
    entrada: { shovi: 2500000, sug: "nosefet" },
    esperado: { mas: 200000, shiur: 8 },
  },
  {
    nombre: "Vivienda adicional de 7.000.000",
    origen: { tipo: "recalculado", detalle: "6.055.070 x 8 % = 484.405,6 + 944.930 x 10 % = 94.493. Total 578.898,6." },
    fecha: "2026-10-24",
    entrada: { shovi: 7000000, sug: "nosefet" },
    esperado: { mas: 578898.6 },
  },
  {
    nombre: "Sin precio",
    origen: { tipo: "recalculado", detalle: "Precio 0." },
    fecha: "2026-10-24",
    entrada: { shovi: 0, sug: "yechida" },
    esperaError: true,
  },
]);
