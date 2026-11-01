import { definirCasos } from "@/motor/calculo";
import calculadora from "./probation-period";

export default definirCasos(calculadora, [
  {
    nombre: "Indefinite contract",
    origen: { tipo: "recalculado", detalle: "Art. 36(1): six months." },
    fecha: "2026-10-26",
    entrada: { contrato: "indefinite", duracion: null, gerencial: false, semanal: 600 },
    esperado: { meses: 6 },
  },
  {
    nombre: "Manager on €500 a week",
    origen: { tipo: "recalculado", detalle: "Art. 36(1b): twice the minimum wage is 2 × 229.44 = 458.88; 500 is above, so twelve months." },
    fecha: "2026-10-26",
    entrada: { contrato: "indefinite", duracion: null, gerencial: true, semanal: 500 },
    esperado: { meses: 12 },
  },
  {
    nombre: "Manager on €400 a week",
    origen: { tipo: "recalculado", detalle: "400 is under 458.88, so the standard six months." },
    fecha: "2026-10-26",
    entrada: { contrato: "indefinite", duracion: null, gerencial: true, semanal: 400 },
    esperado: { meses: 6 },
  },
  {
    nombre: "Twelve-month fixed-term contract",
    origen: { tipo: "recalculado", detalle: "Art. 36(1a): two months per six months of contract, 12 / 6 × 2 = 4 months." },
    fecha: "2026-10-26",
    entrada: { contrato: "fixed", duracion: 12, gerencial: null, semanal: null },
    esperado: { meses: 4 },
  },
  {
    nombre: "Three-month fixed-term contract",
    origen: { tipo: "recalculado", detalle: "Art. 36(1a): one third of the contract, 1 month." },
    fecha: "2026-10-26",
    entrada: { contrato: "fixed", duracion: 3, gerencial: null, semanal: null },
    esperado: { meses: 1 },
  },
  {
    nombre: "Two-year fixed-term contract",
    origen: { tipo: "recalculado", detalle: "Art. 36(1a): over fifteen months, six months." },
    fecha: "2026-10-26",
    entrada: { contrato: "fixed", duracion: 24, gerencial: null, semanal: null },
    esperado: { meses: 6 },
  },
]);
