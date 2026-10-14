import { definirCasos } from "@/motor/calculo";
import calculadora from "./notice-period";

const MOM = "https://www.mom.gov.sg/employment-practices/termination-of-employment/termination-with-notice";

export default definirCasos(calculadora, [
  {
    nombre: "Under 26 weeks: 1 day, ending the same day",
    origen: { tipo: "oficial", url: MOM, detalle: "Less than 26 weeks: 1 day. MOM scenario 1: the last day is the day notice is given." },
    fecha: "2026-10-14",
    entrada: { inicio: "2026-06-01", aviso: "2026-10-14" },
    esperado: { preaviso: 1, ultimoDia: "2026-10-14" },
  },
  {
    nombre: "1 year of service: 1 week",
    origen: { tipo: "recalculado", url: MOM, detalle: "26 weeks to less than 2 years: 1 week. 14 Oct + 6 days = 20 Oct." },
    fecha: "2026-10-14",
    entrada: { inicio: "2025-01-01", aviso: "2026-10-14" },
    esperado: { preaviso: 7, ultimoDia: "2026-10-20" },
  },
  {
    nombre: "3 years of service: 2 weeks",
    origen: { tipo: "recalculado", url: MOM, detalle: "2 years to less than 5 years: 2 weeks. 14 Oct + 13 days = 27 Oct." },
    fecha: "2026-10-14",
    entrada: { inicio: "2023-01-09", aviso: "2026-10-14" },
    esperado: { preaviso: 14, ultimoDia: "2026-10-27", antiguedad: 3 },
  },
  {
    nombre: "6 years of service: 4 weeks",
    origen: { tipo: "recalculado", url: MOM, detalle: "5 years or more: 4 weeks. 14 Oct + 27 days = 10 Nov." },
    fecha: "2026-10-14",
    entrada: { inicio: "2020-01-01", aviso: "2026-10-14" },
    esperado: { preaviso: 28, ultimoDia: "2026-11-10" },
  },
  {
    nombre: "Day before the second anniversary",
    origen: { tipo: "recalculado", url: MOM, detalle: "1 year and 364 days is still less than 2 years: 1 week." },
    fecha: "2026-10-14",
    entrada: { inicio: "2024-10-15", aviso: "2026-10-14" },
    esperado: { preaviso: 7 },
  },
]);
