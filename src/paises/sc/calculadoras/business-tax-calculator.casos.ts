import { definirCasos } from "@/motor/calculo";
import calculadora from "./business-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Sole trader with SCR 500,000",
    origen: { tipo: "recalculado", detalle: "0 % on 102,666, then 15 % × (500,000 − 102,666) = 59,600.10." },
    fecha: "2026-10-29",
    entrada: { estructura: "individual", ingreso: 500000 },
    esperado: { impuesto: 59600.1, marginal: 15 },
  },
  {
    nombre: "Company with SCR 500,000",
    origen: { tipo: "recalculado", detalle: "15 % of 500,000 = 75,000." },
    fecha: "2026-10-29",
    entrada: { estructura: "company", ingreso: 500000 },
    esperado: { impuesto: 75000, marginal: 15 },
  },
  {
    nombre: "Sole trader above SCR 1 million",
    origen: { tipo: "recalculado", detalle: "15 % × (1,000,000 − 102,666) = 134,600.10, plus 25 % × 500,000 = 125,000. Total 259,600.10." },
    fecha: "2026-10-29",
    entrada: { estructura: "individual", ingreso: 1500000 },
    esperado: { impuesto: 259600.1, marginal: 25 },
  },
  {
    nombre: "Company with SCR 2 million",
    origen: { tipo: "recalculado", detalle: "15 % of 1,000,000 = 150,000, plus 25 % of 1,000,000 = 250,000. Total 400,000." },
    fecha: "2026-10-29",
    entrada: { estructura: "company", ingreso: 2000000 },
    esperado: { impuesto: 400000 },
  },
  {
    nombre: "Sole trader inside the tax free slice",
    origen: { tipo: "recalculado", detalle: "100,000 is below the 102,666 tax free slice." },
    fecha: "2026-10-29",
    entrada: { estructura: "individual", ingreso: 100000 },
    esperado: { impuesto: 0 },
  },
]);
