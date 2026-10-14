import { definirCasos } from "@/motor/calculo";
import calculadora from "./redundancy-pay";

const URL = "https://www.gov.ie/en/department-of-social-protection/publications/redundancy-calculation-examples/";

export default definirCasos(calculadora, [
  {
    nombre: "Joe, 23 years and 40 days at €600",
    origen: { tipo: "oficial", url: URL, detalle: "27/01/1998 to 01/03/2021: 23.11 years, 47.22 weeks, 47.22 × €600 = €28,332." },
    fecha: "2026-10-14",
    entrada: { inicio: "1998-01-27", fin: "2021-03-01", semanal: 600, nacimiento: null, noComputables: 0 },
    esperado: { anios: 23.11, semanas: 47.22, total: 28332 },
  },
  {
    nombre: "John, started before 16",
    origen: { tipo: "oficial", url: URL, detalle: "Born 14/08/1999, started 14/08/2013, redundant 29/11/2021. Service from 14/08/2015: 6.3 years, 13.6 weeks × €450 = €6,120." },
    fecha: "2026-10-14",
    entrada: { inicio: "2013-08-14", fin: "2021-11-29", semanal: 450, nacimiento: "1999-08-14", noComputables: 0 },
    esperado: { anios: 6.3, semanas: 13.6, total: 6120 },
  },
  {
    nombre: "June, pay capped at €600",
    origen: { tipo: "oficial", url: URL, detalle: "29/01/2001 to 29/01/2021, weekly pay €761.92 capped at €600: 20.02 years, 41.04 weeks, €24,624." },
    fecha: "2026-10-14",
    entrada: { inicio: "2001-01-29", fin: "2021-01-29", semanal: 761.92, nacimiento: null, noComputables: 0 },
    esperado: { anios: 20.02, semanas: 41.04, pagaSemanal: 600, total: 24624 },
  },
  {
    nombre: "Vanessa, maternity leave counts",
    origen: { tipo: "oficial", url: URL, detalle: "09/12/2004 to 29/01/2021 with maternity leave included: 16.15 years, 33.3 weeks × €446.69 = €14,874.78." },
    fecha: "2026-10-14",
    entrada: { inicio: "2004-12-09", fin: "2021-01-29", semanal: 446.69, nacimiento: null, noComputables: 0 },
    esperado: { anios: 16.15, semanas: 33.3, total: 14874.78 },
  },
  {
    nombre: "Vanessa, 182 days of lay-off left out",
    origen: { tipo: "oficial", url: URL, detalle: "Same dates with 182 days of lay-off excluded: 32.3 weeks × €446.69 = €14,428.09." },
    fecha: "2026-10-14",
    entrada: { inicio: "2004-12-09", fin: "2021-01-29", semanal: 446.69, nacimiento: null, noComputables: 182 },
    esperado: { semanas: 32.3, total: 14428.09 },
  },
  {
    nombre: "Less than 104 weeks",
    origen: { tipo: "recalculado", detalle: "1 year of service: no statutory redundancy." },
    fecha: "2026-10-14",
    entrada: { inicio: "2025-10-14", fin: "2026-10-13", semanal: 700, nacimiento: null, noComputables: 0 },
    esperado: { total: 0 },
  },
  {
    nombre: "End date before start date",
    origen: { tipo: "recalculado", detalle: "The redundancy date cannot be before the start date." },
    fecha: "2026-10-14",
    entrada: { inicio: "2020-01-01", fin: "2019-01-01", semanal: 700, nacimiento: null, noComputables: 0 },
    esperaError: true,
  },
]);
