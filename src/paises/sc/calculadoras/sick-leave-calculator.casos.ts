import { definirCasos } from "@/motor/calculo";
import calculadora from "./sick-leave-calculator";

const ORIGEN = "https://www.employment.gov.sc/e-library/acts-and-regulations/employment-acts-and-regulations/official-gazette-si-34-of-2019/download";

export default definirCasos(calculadora, [
  {
    nombre: "Five days with the full allowance",
    origen: { tipo: "oficial", url: ORIGEN, detalle: "S.I. 34 of 2019 sets 21 days of paid sick leave: 21 − 5 = 16 left." },
    fecha: "2026-10-29",
    entrada: { motivo: "own", dias: 5, usados: 0 },
    esperado: { pagados: 5, sinPago: 0, quedan: 16 },
  },
  {
    nombre: "Fifteen days after ten were used",
    origen: { tipo: "recalculado", detalle: "11 paid days remain. 11 are paid and the other 4 are unpaid sick leave (up to 60)." },
    fecha: "2026-10-29",
    entrada: { motivo: "own", dias: 15, usados: 10 },
    esperado: { pagados: 11, sinPago: 4, sinCobertura: 0, quedan: 0 },
  },
  {
    nombre: "Sick child for 10 days",
    origen: { tipo: "oficial", url: ORIGEN, detalle: "Regulation 12A: up to 7 days independent of the worker's own sick leave. The other 3 days come from the 21 paid days." },
    fecha: "2026-10-29",
    entrada: { motivo: "child", dias: 10, usados: 0 },
    esperado: { bolsaHijo: 7, pagados: 3, quedan: 18 },
  },
  {
    nombre: "Beyond the unpaid allowance",
    origen: { tipo: "recalculado", detalle: "21 paid + 60 unpaid = 81 days covered. A request for 90 days leaves 9 uncovered." },
    fecha: "2026-10-29",
    entrada: { motivo: "own", dias: 90, usados: 0 },
    esperado: { pagados: 21, sinPago: 60, sinCobertura: 9 },
  },
]);
