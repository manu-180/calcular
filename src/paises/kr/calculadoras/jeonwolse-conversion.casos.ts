import { definirCasos } from "@/motor/calculo";
import calculadora from "./jeonwolse-conversion";

export default definirCasos(calculadora, [
  {
    nombre: "보증금 1억원을 월세로",
    origen: { tipo: "recalculado", detalle: "주택임대차보호법 제7조의2와 시행령 제9조: min(10%, 기준금리 3% + 2%) = 5%. 100,000,000×5%÷12 = 416,667." },
    fecha: "2026-10-24",
    entrada: { banghyang: "a-wolse", geumaek: 100000000, wolse: null },
    esperado: { tasa: 5, base: 3, resultado: 416667 },
  },
  {
    nombre: "월세 50만원을 보증금으로",
    origen: { tipo: "recalculado", detalle: "500,000×12÷5% = 120,000,000." },
    fecha: "2026-10-24",
    entrada: { banghyang: "a-bojeung", geumaek: null, wolse: 500000 },
    esperado: { resultado: 120000000 },
  },
  {
    nombre: "기준금리가 높아도 10%까지",
    origen: { tipo: "recalculado", detalle: "기준금리 9%를 가정하면 9+2=11%지만 상한 10%. 1억원×10%÷12 = 833,333." },
    fecha: "2026-10-24",
    entrada: { banghyang: "a-wolse", geumaek: 100000000, wolse: null },
    valores: { "kr.base-rate": { fecha: "2026-10-22", valor: 9 } },
    esperado: { tasa: 10, resultado: 833333 },
  },
]);
