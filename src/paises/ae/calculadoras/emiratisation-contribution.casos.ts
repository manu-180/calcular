import { definirCasos } from "@/motor/calculo";
import calculadora from "./emiratisation-contribution";

const URL = "https://u.ae/en/information-and-services/jobs/Sector-of-employment/employment-in-the-private-sector/emiratis-employment-in-private-sector";

export default definirCasos(calculadora, [
  {
    nombre: "Two Emiratis missing, charged in 2026",
    origen: { tipo: "oficial", url: URL, detalle: "AED 108,000 in January 2026 for each Emirati not hired in 2025: 2 x 108,000 = 216,000." },
    fecha: "2026-10-18",
    entrada: { objetivo: 2, empleados: 0 },
    esperado: { total: 216000, porPersona: 108000, mensual: 9000 },
  },
  {
    nombre: "One missing, charged in 2025",
    origen: { tipo: "oficial", url: URL, detalle: "AED 96,000 in January 2025 for failing to hire one Emirati in 2024." },
    fecha: "2025-06-01",
    entrada: { objetivo: 1, empleados: 0 },
    esperado: { total: 96000 },
  },
  {
    nombre: "Target met",
    origen: { tipo: "recalculado", detalle: "3 employed against a target of 2." },
    fecha: "2026-10-18",
    entrada: { objetivo: 2, empleados: 3 },
    esperado: { total: 0, faltan: 0 },
  },
]);
