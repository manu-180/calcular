import { definirCasos } from "@/motor/calculo";
import calculadora from "./annual-leave";

const MOM = "https://www.mom.gov.sg/employment-practices/leave/annual-leave/eligibility-and-entitlement";

export default definirCasos(calculadora, [
  {
    nombre: "MOM example: 4 completed months with 10 days a year",
    origen: { tipo: "oficial", url: MOM, detalle: "(4 ÷ 12) × 10 = 3.33 days, rounded down to 3. 10 days is the 4th year of service." },
    fecha: "2026-10-14",
    entrada: { anio: 4, meses: 4 },
    esperado: { dias: 3, derecho: 10 },
  },
  {
    nombre: "MOM example: 3 completed months with 12 days a year",
    origen: { tipo: "oficial", url: MOM, detalle: "(3 ÷ 12) × 12 = 3 days. 12 days is the 6th year of service." },
    fecha: "2026-10-14",
    entrada: { anio: 6, meses: 3 },
    esperado: { dias: 3, derecho: 12 },
  },
  {
    nombre: "Full first year",
    origen: { tipo: "oficial", url: MOM, detalle: "1st year of service: 7 days." },
    fecha: "2026-10-14",
    entrada: { anio: 1, meses: 12 },
    esperado: { dias: 7 },
  },
  {
    nombre: "Tenth year stays at 14 days",
    origen: { tipo: "oficial", url: MOM, detalle: "8th year and thereafter: 14 days." },
    fecha: "2026-10-14",
    entrada: { anio: 10, meses: 12 },
    esperado: { dias: 14, derecho: 14 },
  },
  {
    nombre: "Half a day rounds up",
    origen: { tipo: "recalculado", url: MOM, detalle: "(9 ÷ 12) × 14 = 10.5 days. Half or more rounds up to 11." },
    fecha: "2026-10-14",
    entrada: { anio: 9, meses: 9 },
    esperado: { dias: 11 },
  },
  {
    nombre: "Two months in the first year",
    origen: { tipo: "oficial", url: MOM, detalle: "Annual leave starts after 3 months of service." },
    fecha: "2026-10-14",
    entrada: { anio: 1, meses: 2 },
    esperado: { dias: 0 },
  },
]);
