import { definirCasos } from "@/motor/calculo";
import calculadora from "./stamp-duty-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Home for €400,000",
    origen: { tipo: "recalculado", detalle: "1% of 400,000 = 4,000." },
    fecha: "2026-10-14",
    entrada: { precio: 400000, tipo: "residential" },
    esperado: { impuesto: 4000, total: 404000 },
  },
  {
    nombre: "Home for €1,200,000",
    origen: { tipo: "recalculado", detalle: "1% of 1,000,000 = 10,000 + 2% of 200,000 = 4,000. Total 14,000." },
    fecha: "2026-10-14",
    entrada: { precio: 1200000, tipo: "residential" },
    esperado: { impuesto: 14000 },
  },
  {
    nombre: "Home for €2,000,000",
    origen: { tipo: "recalculado", detalle: "10,000 + 2% of 500,000 = 10,000 + 6% of 500,000 = 30,000. Total 50,000." },
    fecha: "2026-10-14",
    entrada: { precio: 2000000, tipo: "residential" },
    esperado: { impuesto: 50000, efectiva: 2.5 },
  },
  {
    nombre: "Commercial property for €500,000",
    origen: { tipo: "recalculado", detalle: "7.5% of 500,000 = 37,500." },
    fecha: "2026-10-14",
    entrada: { precio: 500000, tipo: "non-residential" },
    esperado: { impuesto: 37500 },
  },
]);
