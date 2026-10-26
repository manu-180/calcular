import { definirCasos } from "@/motor/calculo";
import calculadora from "./property-transfer-tax";

export default definirCasos(calculadora, [
  {
    nombre: "Normal rate on €350,000",
    origen: { tipo: "recalculado", detalle: "Income Tax Act, art. 5A(5)(a): 8% of 350,000 = 28,000." },
    fecha: "2026-10-26",
    entrada: { precio: 350000, caso: "standard", valorHerencia: null },
    esperado: { impuesto: 28000, tasa: 8, neto: 322000 },
  },
  {
    nombre: "Sold within five years",
    origen: { tipo: "recalculado", detalle: "Art. 5A(5)(e): 5% of 300,000 = 15,000." },
    fecha: "2026-10-26",
    entrada: { precio: 300000, caso: "within-5-years", valorHerencia: null },
    esperado: { impuesto: 15000 },
  },
  {
    nombre: "Bought before 2004",
    origen: { tipo: "recalculado", detalle: "Art. 5A(5)(f): 10% of 400,000 = 40,000." },
    fecha: "2026-10-26",
    entrada: { precio: 400000, caso: "before-2004", valorHerencia: null },
    esperado: { impuesto: 40000 },
  },
  {
    nombre: "Inherited in 2010, taxed on the gain",
    origen: { tipo: "recalculado", detalle: "Art. 5A(5)(b): 12% of (350,000 − 150,000) = 24,000." },
    fecha: "2026-10-26",
    entrada: { precio: 350000, caso: "inherited-gain", valorHerencia: 150000 },
    esperado: { impuesto: 24000, base: 200000 },
  },
  {
    nombre: "Inherited before 1992",
    origen: { tipo: "recalculado", detalle: "Art. 5A(5)(c): 7% of 200,000 = 14,000." },
    fecha: "2026-10-26",
    entrada: { precio: 200000, caso: "inherited-before-1992", valorHerencia: null },
    esperado: { impuesto: 14000 },
  },
  {
    nombre: "Own home for three years",
    origen: { tipo: "recalculado", detalle: "Art. 5A(4)(c): exempt." },
    fecha: "2026-10-26",
    entrada: { precio: 300000, caso: "residence", valorHerencia: null },
    esperado: { impuesto: 0 },
  },
]);
