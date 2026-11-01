import { definirCasos } from "@/motor/calculo";
import calculadora from "./income-tax";

export default definirCasos(calculadora, [
  {
    nombre: "소득금액 5천만원, 공제 300만원, 기납부 100만원",
    origen: { tipo: "recalculado", detalle: "소득세법 제55조. 과세표준 4,700만원. 84만원 + 3,300만원×15% = 5,790,000. 지방소득세 579,000. 추가 납부 4,790,000." },
    fecha: "2026-10-24",
    entrada: { sodeuk: 50000000, gongje: 3000000, seaekGongje: 0, ginabbu: 1000000 },
    esperado: { base: 47000000, calculado: 5790000, determinado: 5790000, local: 579000, pagar: 4790000, marginal: 15 },
  },
  {
    nombre: "과세표준 2억원",
    origen: { tipo: "recalculado", detalle: "3,706만원 + 5,000만원×38% = 56,060,000 (누진공제 방식과 같아요)." },
    fecha: "2026-10-24",
    entrada: { sodeuk: 201500000, gongje: 1500000, seaekGongje: 70000, ginabbu: 0 },
    esperado: { base: 200000000, calculado: 56060000, determinado: 55990000, marginal: 38 },
  },
  {
    nombre: "소득금액 0원",
    origen: { tipo: "recalculado", detalle: "입력 오류." },
    fecha: "2026-10-24",
    entrada: { sodeuk: 0, gongje: 0, seaekGongje: 0, ginabbu: 0 },
    esperaError: true,
  },
]);
