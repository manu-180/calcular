import { definirCasos } from "@/motor/calculo";
import calculadora from "./overtime-calculator";

const JIS = "https://jis.gov.jm/minimum-wage-moves-to-17000-up-from-16000/";

export default definirCasos(calculadora, [
  {
    nombre: "Minimum wage rates from July 2026",
    origen: { tipo: "oficial", url: JIS, detalle: "Standard J$425, overtime J$637.50 and double time J$850 per hour." },
    fecha: "2026-10-24",
    entrada: { tarifa: 425, horas: 40, horasDobles: 1 },
    esperado: { tarifaExtra: 637.5, tarifaDoble: 850, pagoNormal: 17000, total: 17850 },
  },
  {
    nombre: "45 hours at J$600 plus 8 hours on a public holiday",
    origen: { tipo: "recalculado", detalle: "40 × 600 = 24,000. 5 × 900 = 4,500. 8 × 1,200 = 9,600. Total 38,100." },
    fecha: "2026-10-24",
    entrada: { tarifa: 600, horas: 45, horasDobles: 8 },
    esperado: { total: 38100, pagoExtra: 4500, pagoDoble: 9600, horasExtra: 5 },
  },
  {
    nombre: "No hours",
    origen: { tipo: "recalculado", detalle: "Rejected." },
    fecha: "2026-10-24",
    entrada: { tarifa: 600, horas: 0, horasDobles: 0 },
    esperaError: true,
  },
]);
