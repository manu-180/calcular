import { definirCasos } from "@/motor/calculo";
import calculadora from "./income-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Soltero con 18.000 al año",
    origen: { tipo: "recalculado", detalle: "Exención personal 9.000. Imponible 9.000: 5 % de 5.000 = 250 + 10 % de 4.000 = 400. Total 650; por mes 54,167." },
    fecha: "2026-10-24",
    entrada: { ingreso: 18000, dependientes: false, conyuge: null, hijos: null, facturas: 0 },
    esperado: { total: 650, mensual: 54.167, exenciones: 9000, imponible: 9000, marginal: 10 },
  },
  {
    nombre: "Familia con cónyuge, 2 hijos y facturas",
    origen: { tipo: "recalculado", detalle: "Facturas topadas en 1.000 + 1.000 + 2 × 1.000 = 4.000. Exenciones 9.000 + 9.000 + 4.000 = 22.000. Imponible 30.000 − 22.000 = 8.000: 250 + 300 = 550." },
    fecha: "2026-10-24",
    entrada: { ingreso: 30000, dependientes: true, conyuge: true, hijos: 2, facturas: 5000 },
    esperado: { total: 550, exenciones: 22000, imponible: 8000 },
  },
  {
    nombre: "Hijos por encima del tope de 3.000",
    origen: { tipo: "recalculado", detalle: "Facturas 1.000 + 1.000 + min(5 × 1.000; 3.000) = 5.000. Exenciones 23.000 (el tope). Imponible 40.000 − 23.000 = 17.000: 250 + 500 + 750 + 20 % de 2.000 = 400 → 1.900." },
    fecha: "2026-10-24",
    entrada: { ingreso: 40000, dependientes: true, conyuge: true, hijos: 5, facturas: 8000 },
    esperado: { exenciones: 23000, imponible: 17000, total: 1900, marginal: 20 },
  },
  {
    nombre: "Ingreso por debajo de la exención",
    origen: { tipo: "recalculado", detalle: "8.000 − 9.000 < 0: imponible 0, impuesto 0." },
    fecha: "2026-10-24",
    entrada: { ingreso: 8000, dependientes: false, conyuge: null, hijos: null, facturas: 0 },
    esperado: { total: 0, imponible: 0, marginal: 0 },
  },
  {
    nombre: "Más de un millón con contribución nacional",
    origen: {
      tipo: "recalculado",
      detalle: "Imponible 1.300.000 − 9.000 = 1.291.000. Escala: 250 + 500 + 750 + 1.000 + 25 % de 980.000 = 245.000 + 30 % de 291.000 = 87.300 → 334.800. Contribución 1 % de 1.091.000 = 10.910. Total 345.710.",
    },
    fecha: "2026-10-24",
    entrada: { ingreso: 1300000, dependientes: false, conyuge: null, hijos: null, facturas: 0 },
    esperado: { impuesto: 334800, contribucion: 10910, total: 345710, marginal: 30 },
  },
  {
    nombre: "Redondeo al dinar inferior",
    origen: { tipo: "recalculado", detalle: "Imponible 9.009,9 baja a 9.009: 250 + 10 % de 4.009 = 400,9 → 650,9 baja a 650." },
    fecha: "2026-10-24",
    entrada: { ingreso: 18009.9, dependientes: false, conyuge: null, hijos: null, facturas: 0 },
    esperado: { imponible: 9009, total: 650 },
  },
  {
    nombre: "Sin ingreso",
    origen: { tipo: "recalculado", detalle: "Ingreso 0." },
    fecha: "2026-10-24",
    entrada: { ingreso: 0, dependientes: false, conyuge: null, hijos: null, facturas: 0 },
    esperaError: true,
  },
]);
