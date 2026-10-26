import { definirCasos } from "@/motor/calculo";
import calculadora from "./severance-pay";

export default definirCasos(calculadora, [
  {
    nombre: "재직 2,496일, 3개월 임금 900만원, 상여금 연 600만원",
    origen: {
      tipo: "recalculado",
      detalle: "산정 기간 2026.8.1~10.31 = 92일. 평균임금 (9,000,000 + 6,000,000×3/12) ÷ 92 = 114,130.43. 퇴직금 114,130.43 × 30 × 2,496 ÷ 365 = 23,413,937.",
    },
    fecha: "2026-10-31",
    entrada: { ipsa: "2020-01-01", majimak: "2026-10-31", imgeum: 9000000, sangyeo: 6000000, yeoncha: 0 },
    esperado: { dias: 2496, diasPeriodo: 92, promedio: 114130, pago: 23413937 },
  },
  {
    nombre: "재직 2년, 3개월 임금 600만원",
    origen: { tipo: "recalculado", detalle: "2024.10.25~2026.10.24 = 730일. 산정 기간 7.25~10.24 = 92일. 6,000,000÷92×30×730÷365 = 3,913,043." },
    fecha: "2026-10-24",
    entrada: { ipsa: "2024-10-25", majimak: "2026-10-24", imgeum: 6000000, sangyeo: 0, yeoncha: 0 },
    esperado: { dias: 730, pago: 3913043 },
  },
  {
    nombre: "1년 미만은 퇴직금 없음",
    origen: { tipo: "recalculado", detalle: "근로자퇴직급여 보장법 제4조 제1항: 계속근로기간 1년 미만은 제외." },
    fecha: "2026-10-24",
    entrada: { ipsa: "2026-01-01", majimak: "2026-10-24", imgeum: 9000000, sangyeo: 0, yeoncha: 0 },
    esperado: { pago: 0 },
  },
]);
