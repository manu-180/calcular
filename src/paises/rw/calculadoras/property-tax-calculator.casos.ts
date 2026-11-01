import { definirCasos } from "@/motor/calculo";
import calculadora from "./property-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Rented-out house worth RWF 50,000,000",
    origen: { tipo: "recalculado", detalle: "Residential: 0.5% × 50,000,000 = 250,000." },
    fecha: "2026-10-26",
    entrada: { bien: "residential", valor: 50000000, vivienda: false, superficie: null, tasaTierra: null },
    esperado: { impuesto: 250000, tasa: 0.5 },
  },
  {
    nombre: "Commercial building worth RWF 100,000,000",
    origen: { tipo: "recalculado", detalle: "Commercial: 0.3% × 100,000,000 = 300,000." },
    fecha: "2026-10-26",
    entrada: { bien: "commercial", valor: 100000000, vivienda: null, superficie: null, tasaTierra: null },
    esperado: { impuesto: 300000 },
  },
  {
    nombre: "Three-floor apartment building worth RWF 200,000,000",
    origen: { tipo: "recalculado", detalle: "0.25% × 200,000,000 = 500,000." },
    fecha: "2026-10-26",
    entrada: { bien: "residential-3", valor: 200000000, vivienda: false, superficie: null, tasaTierra: null },
    esperado: { impuesto: 500000 },
  },
  {
    nombre: "Own home",
    origen: { tipo: "recalculado", detalle: "The owner's dwelling is exempt." },
    fecha: "2026-10-26",
    entrada: { bien: "residential", valor: 80000000, vivienda: true, superficie: null, tasaTierra: null },
    esperado: { impuesto: 0 },
  },
  {
    nombre: "Plot of 600 square metres at RWF 80",
    origen: { tipo: "recalculado", detalle: "600 × 80 = 48,000." },
    fecha: "2026-10-26",
    entrada: { bien: "land", valor: null, vivienda: null, superficie: 600, tasaTierra: 80 },
    esperado: { impuesto: 48000 },
  },
  {
    nombre: "Land rate above the legal maximum",
    origen: { tipo: "recalculado", detalle: "The district rate goes up to RWF 80 per square metre." },
    fecha: "2026-10-26",
    entrada: { bien: "land", valor: null, vivienda: null, superficie: 600, tasaTierra: 100 },
    esperaError: true,
  },
]);
