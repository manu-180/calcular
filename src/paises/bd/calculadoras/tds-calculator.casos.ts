import { definirCasos } from "@/motor/calculo";
import calculadora from "./tds-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Servicio profesional de una persona física",
    origen: { tipo: "recalculado", detalle: "Regla 4, ítem 2: 15 % sobre 1,00,000 = 15,000; recibe 85,000." },
    fecha: "2026-10-24",
    entrada: { servicio: "professional-individual", monto: 100000, base: "bruto" },
    esperado: { impuesto: 15000, neto: 85000, tasa: 15 },
  },
  {
    nombre: "Consultoría de una empresa",
    origen: { tipo: "recalculado", detalle: "Regla 4, ítem 1: 7.5 % sobre 2,00,000 = 15,000." },
    fecha: "2026-10-24",
    entrada: { servicio: "consultancy-other", monto: 200000, base: "bruto" },
    esperado: { impuesto: 15000, neto: 185000 },
  },
  {
    nombre: "Honorario neto pactado",
    origen: { tipo: "recalculado", detalle: "Neto 8,000 con 20 %: bruto 8,000 / 0.80 = 10,000; retención 2,000." },
    fecha: "2026-10-24",
    entrada: { servicio: "meeting-honorarium", monto: 8000, base: "neto" },
    esperado: { bruto: 10000, impuesto: 2000, neto: 8000 },
  },
  {
    nombre: "Transporte",
    origen: { tipo: "recalculado", detalle: "Regla 4, ítem 14: 2 % de 50,000 = 1,000." },
    fecha: "2026-10-24",
    entrada: { servicio: "transport-repair", monto: 50000, base: "bruto" },
    esperado: { impuesto: 1000 },
  },
]);
