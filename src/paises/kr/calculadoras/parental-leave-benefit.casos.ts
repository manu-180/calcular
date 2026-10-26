import { definirCasos } from "@/motor/calculo";
import calculadora from "./parental-leave-benefit";

export default definirCasos(calculadora, [
  {
    nombre: "통상임금 300만원, 12개월",
    origen: {
      tipo: "recalculado",
      detalle: "고용보험법 시행령 제95조. 1~3개월 상한 250만×3=750만. 4~6개월 상한 200만×3=600만. 7~12개월 300만×80%=240만은 상한 160만×6=960만. 합계 2,310만.",
    },
    fecha: "2026-10-24",
    entrada: { tongsang: 3000000, meses: 12 },
    esperado: { tramo1: 2500000, tramo2: 2000000, tramo3: 1600000, total: 23100000 },
  },
  {
    nombre: "통상임금 150만원, 6개월",
    origen: { tipo: "recalculado", detalle: "1~6개월 통상임금 100%. 150만×6=900만." },
    fecha: "2026-10-24",
    entrada: { tongsang: 1500000, meses: 6 },
    esperado: { tramo1: 1500000, tramo2: 1500000, total: 9000000 },
  },
  {
    nombre: "통상임금 80만원, 8개월은 하한 적용",
    origen: { tipo: "recalculado", detalle: "1~6개월 80만×6=480만. 7~8개월 80만×80%=64만은 하한 70만×2=140만. 합계 620만." },
    fecha: "2026-10-24",
    entrada: { tongsang: 800000, meses: 8 },
    esperado: { tramo3: 700000, total: 6200000 },
  },
]);
