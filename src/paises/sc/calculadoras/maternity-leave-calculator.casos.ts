import { definirCasos } from "@/motor/calculo";
import calculadora from "./maternity-leave-calculator";

const ORIGEN = "https://www.employment.gov.sc/e-library/acts-and-regulations/employment-acts-and-regulations/si-32-of-2018-employment-conditions-of-employment-amendment-regulations-2018-2/download";

export default definirCasos(calculadora, [
  {
    nombre: "Maternity leave from 2 November 2026",
    origen: { tipo: "oficial", url: ORIGEN, detalle: "S.I. 32 of 2018 sets 16 weeks of paid maternity leave. 16 × 7 = 112 days, so the last day is 21 February 2027." },
    fecha: "2026-10-29",
    entrada: { tipo: "maternity", inicio: "2026-11-02", nacimiento: null },
    esperado: { ultimo: "2027-02-21", regreso: "2027-02-22" },
  },
  {
    nombre: "Paternity leave from Monday 2 November 2026",
    origen: { tipo: "oficial", url: ORIGEN, detalle: "S.I. 32 of 2018 sets 10 consecutive working days. From Monday 2 November the tenth working day is Friday 13 November." },
    fecha: "2026-10-29",
    entrada: { tipo: "paternity", inicio: "2026-11-02", nacimiento: "2026-10-20" },
    esperado: { ultimo: "2026-11-13", regreso: "2026-11-14", limite: "2027-02-20" },
  },
  {
    nombre: "Paternity leave starting on a Thursday",
    origen: { tipo: "recalculado", detalle: "From Thursday 5 November: 5, 6, then 9 to 13 are 7 working days, then 16, 17, 18 are the 8th, 9th and 10th. Last day Wednesday 18 November." },
    fecha: "2026-10-29",
    entrada: { tipo: "paternity", inicio: "2026-11-05", nacimiento: null },
    esperado: { ultimo: "2026-11-18" },
  },
]);
