import { definirCasos } from "@/motor/calculo";
import calculadora from "./notice-period-calculator";

const ORIGEN = "https://www.employment.gov.sc/e-library/acts-and-regulations/employment-acts-and-regulations/employment-act-1995-2010-edition/download";

export default definirCasos(calculadora, [
  {
    nombre: "One month of notice from 2 November 2026",
    origen: { tipo: "oficial", url: ORIGEN, detalle: "Employment Act sections 59(c) and 60(1)(c): one month's notice. From 2 November the notice runs to 1 December; pay in lieu is one month's wage, 20,000." },
    fecha: "2026-10-29",
    entrada: { tipo: "standard", inicio: "2026-11-02", salario: 20000, pagaDia: null },
    esperado: { duracion: "1 month", ultimo: "2026-12-01", pago: 20000 },
  },
  {
    nombre: "Probation, 7 days",
    origen: { tipo: "oficial", url: ORIGEN, detalle: "Sections 59(b) and 60(1)(b): seven days' notice on probation. 7 × 800 = 5,600. From 2 November the last day is 8 November." },
    fecha: "2026-10-29",
    entrada: { tipo: "probation", inicio: "2026-11-02", salario: null, pagaDia: 800 },
    esperado: { duracion: "7 days", ultimo: "2026-11-08", pago: 5600 },
  },
  {
    nombre: "Casual worker, one day",
    origen: { tipo: "oficial", url: ORIGEN, detalle: "Sections 59(a) and 60(1)(a): one day's notice for a casual worker. One day at 800 is 800." },
    fecha: "2026-10-29",
    entrada: { tipo: "casual", inicio: "2026-11-02", salario: null, pagaDia: 800 },
    esperado: { duracion: "1 day", ultimo: "2026-11-02", pago: 800 },
  },
  {
    nombre: "Month end clamp",
    origen: { tipo: "recalculado", detalle: "Notice given on 31 January 2027: one month later is 28 February 2027, so the last day is 27 February 2027." },
    fecha: "2026-10-29",
    entrada: { tipo: "standard", inicio: "2027-01-31", salario: 15000, pagaDia: null },
    esperado: { ultimo: "2027-02-27", pago: 15000 },
  },
]);
