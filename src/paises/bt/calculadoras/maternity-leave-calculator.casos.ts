import { definirCasos } from "@/motor/calculo";
import calculadora from "./maternity-leave-calculator";

const RWC = "https://www.moice.gov.bt/wp-content/uploads/2022/06/Regulation-on-Working-Conditions-2022.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Leave from 1 February 2027",
    origen: { tipo: "recalculado", url: RWC, detalle: "Section 202: 2 months at last basic pay. 25,000 × 2 = 50,000. 1 February + 2 months - 1 day = 31 March." },
    fecha: "2026-10-31",
    entrada: { inicio: "2027-02-01", servicio: 24, basico: 25000 },
    esperado: { pago: 50000, fin: "2027-03-31", meses: 2, paternidad: 10, periodos: 3 },
  },
  {
    nombre: "Start on 31 December",
    origen: { tipo: "recalculado", detalle: "31 December + 2 months is 28 February, less one day is 27 February." },
    fecha: "2026-10-31",
    entrada: { inicio: "2026-12-31", servicio: 12, basico: 10000 },
    esperado: { pago: 20000, fin: "2027-02-27" },
  },
  {
    nombre: "Less than 12 months with the employer",
    origen: { tipo: "recalculado", url: RWC, detalle: "Section 202: 12 months or more of continuous work." },
    fecha: "2026-10-31",
    entrada: { inicio: "2027-02-01", servicio: 10, basico: 25000 },
    esperado: { pago: 0, fin: null, meses: 0 },
  },
]);
