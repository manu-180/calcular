import { definirCasos } from "@/motor/calculo";
import calculadora from "./maternity-leave-calculator";

const WRA = "https://www.mra.mu/download/WorkersRightsAct2019.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "Birth on 1 December 2026, 2 weeks before",
    origen: { tipo: "recalculado", url: WRA, detalle: "Section 52(1): 16 weeks. Start 17 November 2026; last day 16 November + 112 days = 8 March 2027. Allowance Rs 3,000 after 12 months." },
    fecha: "2026-10-24",
    entrada: { parto: "2026-12-01", semanasAntes: 2, multiple: false, meses: 24 },
    esperado: { total: 16, inicio: "2026-11-17", ultimo: "2027-03-08", regreso: "2027-03-09", semanasDespues: 14, subsidio: 3000, paternidad: 4 },
  },
  {
    nombre: "Twins, all leave after the birth",
    origen: { tipo: "recalculado", url: WRA, detalle: "Section 52(1A): 16 + 2 = 18 weeks from 1 December 2026, last day 5 April 2027. Less than 12 months: no allowance." },
    fecha: "2026-10-24",
    entrada: { parto: "2026-12-01", semanasAntes: 0, multiple: true, meses: 8 },
    esperado: { total: 18, inicio: "2026-12-01", ultimo: "2027-04-05", subsidio: 0 },
  },
  {
    nombre: "More than 8 weeks before the birth",
    origen: { tipo: "recalculado", url: WRA, detalle: "At least 8 weeks must follow the birth." },
    fecha: "2026-10-24",
    entrada: { parto: "2026-12-01", semanasAntes: 9, multiple: false, meses: 24 },
    esperaError: true,
  },
]);
