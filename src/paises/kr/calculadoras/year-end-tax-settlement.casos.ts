import { definirCasos } from "@/motor/calculo";
import calculadora from "./year-end-tax-settlement";

export default definirCasos(calculadora, [
  {
    nombre: "총급여 5천만원, 기납부 200만원, 공제 없음",
    origen: {
      tipo: "recalculado",
      detalle:
        "보험료 추정: 월 4,166,667원 기준 국민연금 197,910, 건강 149,790, 장기요양 19,680, 고용 37,500 → 연 2,374,920과 2,483,640. 근로소득공제 1,200만+500만×5%=1,225만. 과세표준 37,750,000−1,500,000−2,374,920−2,483,640=31,391,440. 산출세액 840,000+17,391,440×15%=3,448,716. 근로소득세액공제 한도 660,000, 표준 130,000. 결정세액 2,658,710, 지방 265,870. 차감 658,710 + (265,870−200,000) = 724,580.",
    },
    fecha: "2026-10-24",
    entrada: { chonggeup: 50000000, ginabbu: 2000000, gajok: 1, janyeo: 0, boheom: null, chugaGongje: 0, chugaSeaek: 0 },
    esperado: { deduccion: 12250000, base: 31391440, calculado: 3448716, creditoTrabajo: 660000, determinado: 2658710, diferencia: 658710, resultado: 724580 },
  },
  {
    nombre: "카드 소득공제 300만원, 특별세액공제 50만원이면 환급",
    origen: {
      tipo: "recalculado",
      detalle: "과세표준 28,391,440. 산출세액 840,000+14,391,440×15%=2,998,716. 근로소득세액공제 660,000, 특별세액공제 500,000(표준세액공제보다 커요). 결정세액 1,838,710, 지방 183,870. 차감 −161,290 −16,130 = −177,420.",
    },
    fecha: "2026-10-24",
    entrada: { chonggeup: 50000000, ginabbu: 2000000, gajok: 1, janyeo: 0, boheom: null, chugaGongje: 3000000, chugaSeaek: 500000 },
    esperado: { base: 28391440, determinado: 1838710, resultado: -177420 },
  },
  {
    nombre: "보험료를 직접 입력",
    origen: { tipo: "recalculado", detalle: "보험료 4,000,000. 과세표준 37,750,000−1,500,000−4,000,000=32,250,000. 산출세액 840,000+18,250,000×15%=3,577,500. 결정세액 3,577,500−660,000−130,000=2,787,500. 차감 787,500+78,750=866,250." },
    fecha: "2026-10-24",
    entrada: { chonggeup: 50000000, ginabbu: 2000000, gajok: 1, janyeo: 0, boheom: 4000000, chugaGongje: 0, chugaSeaek: 0 },
    esperado: { base: 32250000, determinado: 2787500, resultado: 866250 },
  },
]);
