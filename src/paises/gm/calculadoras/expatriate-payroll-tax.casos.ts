import { definirCasos } from "@/motor/calculo";
import calculadora from "./expatriate-payroll-tax";

const AVISO = "https://www.gra.gm/download-file/221f7a81-6596-11f1-b086-029254d29bb1";

export default definirCasos(calculadora, [
  {
    nombre: "One ECOWAS citizen",
    origen: { tipo: "oficial", url: AVISO, detalle: "Notice 2026, paragraph 2(1): D30,000 a year." },
    fecha: "2026-10-27",
    entrada: { ecowas: 1, otros: 0 },
    esperado: { total: 30000, mensual: 2500 },
  },
  {
    nombre: "Two ECOWAS citizens and one other expatriate",
    origen: { tipo: "recalculado", detalle: "2 × 30,000 + 1 × 100,000 = 160,000 a year." },
    fecha: "2026-10-27",
    entrada: { ecowas: 2, otros: 1 },
    esperado: { total: 160000, ecowas: 60000, otros: 100000 },
  },
  {
    nombre: "No expatriates",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-27",
    entrada: { ecowas: 0, otros: 0 },
    esperaError: true,
  },
]);
