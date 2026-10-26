import { definirCasos } from "@/motor/calculo";
import calculadora from "./inflation-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "2015년 1월의 100만원을 2026년 9월로",
    origen: { tipo: "recalculado", detalle: "소비자물가지수(2020=100) 94.643과 120.43(한국은행 ECOS 901Y009). 1,000,000×120.43÷94.643 = 1,272,466." },
    fecha: "2026-10-24",
    entrada: { geumaek: 1000000, desde: "2015-01-01", hasta: "2026-09-01" },
    esperado: { actualizado: 1272466, indiceInicial: 94.643, indiceFinal: 120.43, mesFinal: "2026년 9월" },
  },
  {
    nombre: "아직 발표되지 않은 달까지",
    origen: { tipo: "recalculado", detalle: "2026년 10월 24일에는 9월 지수가 가장 최근이라 9월까지 계산해요." },
    fecha: "2026-10-24",
    entrada: { geumaek: 100000, desde: "2025-09-01", hasta: "2026-12-01" },
    esperado: { mesFinal: "2026년 9월" },
  },
  {
    nombre: "2000년 이전은 오류",
    origen: { tipo: "recalculado", detalle: "series.json의 지수는 2000년 1월부터예요." },
    fecha: "2026-10-24",
    entrada: { geumaek: 100000, desde: "1999-01-01", hasta: "2026-09-01" },
    esperaError: true,
  },
]);
