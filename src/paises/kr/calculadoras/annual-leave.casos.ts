import { definirCasos } from "@/motor/calculo";
import calculadora from "./annual-leave";

export default definirCasos(calculadora, [
  {
    nombre: "근속 6년, 미사용 5일",
    origen: { tipo: "recalculado", detalle: "근로기준법 제60조: 15 + (6−1)÷2의 정수 2 = 17일. 1일 통상임금 3,000,000÷209×8=114,833. 수당 114,832.5×5=574,163." },
    fecha: "2026-10-24",
    entrada: { ipsa: "2020-03-02", gijun: "2026-10-24", wolgeup: 3000000, misayong: 5, ojin: true },
    esperado: { anios: 6, dias: 17, diario: 114833, pago: 574163 },
  },
  {
    nombre: "입사 7개월",
    origen: { tipo: "recalculado", detalle: "제60조 제2항: 1개월 개근마다 1일. 3월 2일부터 10월 24일까지 7개월." },
    fecha: "2026-10-24",
    entrada: { ipsa: "2026-03-02", gijun: "2026-10-24", wolgeup: 2500000, misayong: 0, ojin: true },
    esperado: { meses: 7, dias: 7, pago: 0 },
  },
  {
    nombre: "근속 26년은 25일 한도",
    origen: { tipo: "recalculado", detalle: "15 + (26−1)÷2의 정수 12 = 27일이지만 한도 25일." },
    fecha: "2026-10-24",
    entrada: { ipsa: "2000-01-01", gijun: "2026-10-24", wolgeup: 5000000, misayong: 0, ojin: true },
    esperado: { anios: 26, dias: 25 },
  },
  {
    nombre: "5명 미만 사업장",
    origen: { tipo: "recalculado", detalle: "근로기준법 시행령 별표 1: 상시 4명 이하 사업장에는 제60조가 적용되지 않아요." },
    fecha: "2026-10-24",
    entrada: { ipsa: "2020-03-02", gijun: "2026-10-24", wolgeup: 3000000, misayong: 5, ojin: false },
    esperado: { dias: 0, pago: 0 },
  },
]);
