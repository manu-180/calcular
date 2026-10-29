import { definirCasos } from "@/motor/calculo";
import calculadora from "./night-duty-pay-calculator";

const ACT = "https://lpr.adb.org/sites/default/files/resource/%5Bnid%5D/bhutan-labour-and-employement-act-2007-english.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "16 night hours on Nu. 25,000",
    origen: { tipo: "recalculado", url: ACT, detalle: "Section 125: 50% of the normal rate. 25,000 / 208 = 120.1923. Extra per hour 60.0962. × 16 = 961.54." },
    fecha: "2026-10-29",
    entrada: { mensual: 25000, horasMes: 208, horasNoche: 16 },
    esperado: { extra: 961.54, hora: 120.19, extraPorHora: 60.1, inicio: 22, fin: 8 },
  },
  {
    nombre: "Hourly rate of exactly 100",
    origen: { tipo: "recalculado", detalle: "20,000 / 200 = 100. 50% is 50 an hour. 8 hours = 400." },
    fecha: "2026-10-29",
    entrada: { mensual: 20000, horasMes: 200, horasNoche: 8 },
    esperado: { extra: 400, hora: 100, extraPorHora: 50 },
  },
]);
