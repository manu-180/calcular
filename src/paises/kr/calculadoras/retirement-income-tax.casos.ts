import { definirCasos } from "@/motor/calculo";
import calculadora from "./retirement-income-tax";

export default definirCasos(calculadora, [
  {
    nombre: "퇴직금 5천만원, 근속 10년",
    origen: {
      tipo: "recalculado",
      detalle: "소득세법 제48조, 제55조 제2항. 근속연수공제 500만+200만×5=1,500만. 환산급여 3,500만×12÷10=4,200만. 환산급여공제 800만+3,400만×60%=2,840만. 과세표준 1,360만, 환산산출세액 816,000. 산출세액 816,000÷12×10=680,000. 지방소득세 68,000.",
    },
    fecha: "2026-10-24",
    entrada: { toejik: 50000000, geunsok: 10 },
    esperado: { porAnios: 15000000, convertido: 42000000, deduccionConvertida: 28400000, base: 13600000, impuesto: 680000, local: 68000, total: 748000, neto: 49252000 },
  },
  {
    nombre: "퇴직금 3억원, 근속 25년",
    origen: {
      tipo: "recalculado",
      detalle: "근속연수공제 4,000만+300만×5=5,500만. 환산급여 2억4,500만×12÷25=1억1,760만. 공제 6,170만+1,760만×45%=6,962만. 과세표준 4,798만, 환산산출세액 84만+3,398만×15%=5,937,000. 산출세액 5,937,000÷12×25=12,368,750. 지방소득세 1,236,870.",
    },
    fecha: "2026-10-24",
    entrada: { toejik: 300000000, geunsok: 25 },
    esperado: { porAnios: 55000000, convertido: 117600000, base: 47980000, impuestoConvertido: 5937000, impuesto: 12368750, local: 1236870 },
  },
  {
    nombre: "퇴직금이 근속연수공제보다 적으면 세금 0원",
    origen: { tipo: "recalculado", detalle: "제48조 제2항: 퇴직소득금액이 근속연수공제에 미달하면 그 금액을 공제액으로 해요. 300만원, 근속 5년(공제 500만원)." },
    fecha: "2026-10-24",
    entrada: { toejik: 3000000, geunsok: 5 },
    esperado: { porAnios: 3000000, total: 0 },
  },
]);
