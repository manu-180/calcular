import { definirCasos } from "@/motor/calculo";
import calculadora from "./overtime-pay";

export default definirCasos(calculadora, [
  {
    nombre: "시급 15,000원, 연장 10시간, 야간 4시간, 휴일 10시간",
    origen: {
      tipo: "recalculado",
      detalle: "근로기준법 제56조. 연장 10×15,000×1.5=225,000. 휴일 8×15,000×1.5=180,000, 초과 2×15,000×2=60,000. 야간 가산 4×15,000×0.5=30,000. 합계 495,000, 가산분 495,000−300,000=195,000.",
    },
    fecha: "2026-10-24",
    entrada: { sigeup: 15000, yeonjang: 10, yagan: 4, hyuil: 8, hyuilChogwa: 2, ojin: true },
    esperado: { yeonjang: 225000, hyuil: 180000, hyuilChogwa: 60000, yagan: 30000, total: 495000, gasan: 195000 },
  },
  {
    nombre: "4명 이하 사업장은 가산 없음",
    origen: { tipo: "recalculado", detalle: "근로기준법 시행령 별표 1: 제56조 미적용. 10×15,000=150,000." },
    fecha: "2026-10-24",
    entrada: { sigeup: 15000, yeonjang: 10, yagan: 4, hyuil: 0, hyuilChogwa: 0, ojin: false },
    esperado: { total: 150000, yagan: 0, gasan: 0 },
  },
]);
