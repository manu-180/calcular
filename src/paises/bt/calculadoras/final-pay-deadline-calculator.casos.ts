import { definirCasos } from "@/motor/calculo";
import calculadora from "./final-pay-deadline-calculator";

const ACT = "https://lpr.adb.org/sites/default/files/resource/%5Bnid%5D/bhutan-labour-and-employement-act-2007-english.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Contract ends on 31 December 2026",
    origen: { tipo: "recalculado", url: ACT, detalle: "Section 127: within 7 calendar days. 31 December + 7 = 7 January 2027." },
    fecha: "2026-10-29",
    entrada: { aviso: null, fin: "2026-12-31" },
    esperado: { limite: "2027-01-07", dias: 7, ultimoDia: null, meses: 3 },
  },
  {
    nombre: "Notice given on 1 November 2026",
    origen: { tipo: "recalculado", url: ACT, detalle: "Section 68: 30 days. 1 November + 30 = 1 December." },
    fecha: "2026-10-29",
    entrada: { aviso: "2026-11-01", fin: "2026-12-01" },
    esperado: { limite: "2026-12-08", ultimoDia: "2026-12-01" },
  },
]);
