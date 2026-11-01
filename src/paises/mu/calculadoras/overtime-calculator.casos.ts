import { definirCasos } from "@/motor/calculo";
import calculadora from "./overtime-calculator";

const WRA = "https://www.mra.mu/download/WorkersRightsAct2019.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "10 overtime hours on Rs 25,000",
    origen: { tipo: "recalculado", url: WRA, detalle: "Section 25: 25,000 / 195 = 128.205. Section 24(4): × 1.5 × 10 = 1,923.08." },
    fecha: "2026-10-24",
    entrada: { sueldo: 25000, horasExtra: 10, horasFeriado: 0, horasFeriadoExtra: 0 },
    esperado: { total: 1923.08, hora: 128.21, tasaExtra: 192.31 },
  },
  {
    nombre: "Public holiday work on Rs 39,000",
    origen: { tipo: "recalculado", url: WRA, detalle: "39,000 / 195 = 200. 9 hours × 2 × 200 = 3,600; 2 hours × 3 × 200 = 1,200; 5 hours × 1.5 × 200 = 1,500. Total 6,300." },
    fecha: "2026-10-24",
    entrada: { sueldo: 39000, horasExtra: 5, horasFeriado: 9, horasFeriadoExtra: 2 },
    esperado: { total: 6300, feriado: 3600, feriadoExtra: 1200, extra: 1500 },
  },
]);
