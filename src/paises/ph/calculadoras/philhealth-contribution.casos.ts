import { definirCasos } from "@/motor/calculo";
import calculadora from "./philhealth-contribution";

const ADVISORY = "https://www.philhealth.gov.ph/advisories/2026/PA2026-0042.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "₱30,000 self-paying (Advisory 2026-0042)",
    origen: { tipo: "oficial", url: ADVISORY, detalle: "Illustration: P30,000.00 a month, premium P1,500.00, quarterly P4,500.00, annual P18,000.00." },
    fecha: "2026-10-16",
    entrada: { sueldo: 30000, tipo: "self-paying" },
    esperado: { tuParte: 1500, prima: 1500, trimestral: 4500, anual: 18000 },
  },
  {
    nombre: "Minimum premium (Advisory 2026-0042)",
    origen: { tipo: "oficial", url: ADVISORY, detalle: "The minimum monthly premium is P500.00, on an income of P10,000.00." },
    fecha: "2026-10-16",
    entrada: { sueldo: 8000, tipo: "self-paying" },
    esperado: { prima: 500, base: 10000 },
  },
  {
    nombre: "₱100,000 or more is capped at ₱5,000",
    origen: { tipo: "oficial", url: ADVISORY, detalle: "Illustration: P100,000.00 a month, premium P5,000.00. The schedule caps income at P100,000." },
    fecha: "2026-10-16",
    entrada: { sueldo: 150000, tipo: "employed" },
    esperado: { prima: 5000, tuParte: 2500, empleador: 2500 },
  },
  {
    nombre: "Employed at ₱25,000, shared equally",
    origen: { tipo: "recalculado", detalle: "25,000 × 5% = 1,250, half each: 625." },
    fecha: "2026-10-16",
    entrada: { sueldo: 25000, tipo: "employed" },
    esperado: { prima: 1250, tuParte: 625, empleador: 625 },
  },
  {
    nombre: "Zero income",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-16",
    entrada: { sueldo: 0, tipo: "employed" },
    esperaError: true,
  },
]);
