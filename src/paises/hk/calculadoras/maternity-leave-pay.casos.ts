import { definirCasos } from "@/motor/calculo";
import calculadora from "./maternity-leave-pay";

const GUIA = "https://www.labour.gov.hk/eng/public/wcp/ConciseGuide/EO_guide_full.pdf";
const PROMEDIO = { diasPeriodo: 365, diasExcluidos: 0, salariosExcluidos: 0 };

export default definirCasos(calculadora, [
  {
    nombre: "$600 a day: 14 weeks at four-fifths",
    origen: {
      tipo: "recalculado",
      detalle: "219,000 / 365 = 600 x 4/5 = 480 a day. First 10 weeks 480 x 70 = 33,600; weeks 11 to 14: 480 x 28 = 13,440 (under the 80,000 cap). Total 47,040.",
    },
    fecha: "2026-10-16",
    entrada: { salarios12: 219000, ...PROMEDIO, cuarentaSemanas: true },
    esperado: { porDia: 480, primeras: 33600, ultimas: 13440, total: 47040, semanas: 14 },
  },
  {
    nombre: "High earner: weeks 11 to 14 capped at $80,000",
    origen: {
      tipo: "oficial",
      url: GUIA,
      detalle: "The 4-week pay for the 11th to 14th week is capped at $80,000. 1,460,000 / 365 = 4,000 x 4/5 = 3,200 a day; 28 days = 89,600, capped at 80,000. First 10 weeks 224,000.",
    },
    fecha: "2026-10-16",
    entrada: { salarios12: 1460000, ...PROMEDIO, cuarentaSemanas: true },
    esperado: { primeras: 224000, ultimas: 80000, total: 304000 },
  },
  {
    nombre: "Less than 40 weeks: leave without pay",
    origen: { tipo: "oficial", url: GUIA, detalle: "Maternity leave pay needs at least 40 weeks on a continuous contract." },
    fecha: "2026-10-16",
    entrada: { salarios12: 120000, diasPeriodo: 200, diasExcluidos: 0, salariosExcluidos: 0, cuarentaSemanas: false },
    esperado: { total: 0 },
  },
]);
