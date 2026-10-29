import { definirCasos } from "@/motor/calculo";
import calculadora from "./probation-period-calculator";

const ACT = "https://lpr.adb.org/sites/default/files/resource/%5Bnid%5D/bhutan-labour-and-employement-act-2007-english.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Full 180 days from 1 March 2026",
    origen: { tipo: "recalculado", url: ACT, detalle: "Section 72: up to 180 days. 1 March plus 179 days is 27 August 2026 (counting the first day)." },
    fecha: "2026-10-29",
    entrada: { inicio: "2026-03-01", meses: 24, dias: 180 },
    esperado: { fin: "2026-08-27", aplicados: 180, aviso: 7, maximo: 180 },
  },
  {
    nombre: "Contract promises 365 days of probation",
    origen: { tipo: "recalculado", url: ACT, detalle: "365 is above the maximum of 180, so 180 days count." },
    fecha: "2026-10-29",
    entrada: { inicio: "2026-03-01", meses: 24, dias: 365 },
    esperado: { fin: "2026-08-27", aplicados: 180 },
  },
  {
    nombre: "Six-month contract has no probation",
    origen: { tipo: "recalculado", url: ACT, detalle: "Section 72 needs a contract of one year or more." },
    fecha: "2026-10-29",
    entrada: { inicio: "2026-03-01", meses: 6, dias: 90 },
    esperado: { fin: null, aplicados: 0 },
  },
]);
