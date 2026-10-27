import { definirCasos } from "@/motor/calculo";
import calculadora from "./rental-income-tax-calculator";

const FOLLETO = "https://www.zra.org.zm/wp-content/uploads/2026/06/Rental-Income-Tax.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "ZRA example 1: K10,000 in January 2026",
    origen: { tipo: "oficial", url: FOLLETO, detalle: "First K2,500 at 0%, balance K7,500 at 4% = K300." },
    fecha: "2026-10-26",
    entrada: { renta: 10000, periodo: "mes" },
    esperado: { impuesto: 300, neto: 9700 },
  },
  {
    nombre: "ZRA example 2: K70,000 in January 2026",
    origen: { tipo: "oficial", url: FOLLETO, detalle: "K64,166.67 at 4% = K2,566.67 and K3,333.33 at 16% = K533.33. Total K3,100." },
    fecha: "2026-10-26",
    entrada: { renta: 70000, periodo: "mes" },
    esperado: { impuesto: 3100 },
  },
  {
    nombre: "ZRA annual illustration: K1,000,000",
    origen: { tipo: "oficial", url: FOLLETO, detalle: "First K30,000 at 0%, K770,000 at 4% = K30,800, K200,000 at 16% = K32,000. Total K62,800." },
    fecha: "2026-10-26",
    entrada: { renta: 1000000, periodo: "anio" },
    esperado: { impuesto: 62800 },
  },
]);
