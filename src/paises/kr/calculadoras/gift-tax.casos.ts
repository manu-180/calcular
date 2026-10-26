import { definirCasos } from "@/motor/calculo";
import calculadora from "./gift-tax";

export default definirCasos(calculadora, [
  {
    nombre: "성인 자녀가 부모에게 1억원",
    origen: { tipo: "recalculado", detalle: "상속세 및 증여세법 제53조 직계존속 5천만원 공제. 과세표준 5천만원 × 10% = 5,000,000. 신고세액공제 3% 150,000. 납부 4,850,000." },
    fecha: "2026-10-24",
    entrada: { gaek: 100000000, gwangye: "lineal", ijeon: 0, singo: true },
    esperado: { deduccion: 50000000, base: 50000000, calculado: 5000000, credito: 150000, impuesto: 4850000 },
  },
  {
    nombre: "배우자에게 10억원",
    origen: { tipo: "recalculado", detalle: "배우자 공제 6억원. 과세표준 4억원: 1천만원 + 3억원×20% = 70,000,000. 신고세액공제 2,100,000. 납부 67,900,000." },
    fecha: "2026-10-24",
    entrada: { gaek: 1000000000, gwangye: "spouse", ijeon: 0, singo: true },
    esperado: { base: 400000000, calculado: 70000000, impuesto: 67900000 },
  },
  {
    nombre: "미성년 자녀 3천만원, 신고하지 않음",
    origen: { tipo: "recalculado", detalle: "미성년자 공제 2천만원. 과세표준 1천만원 × 10% = 1,000,000. 신고세액공제 없음." },
    fecha: "2026-10-24",
    entrada: { gaek: 30000000, gwangye: "minor", ijeon: 0, singo: false },
    esperado: { base: 10000000, impuesto: 1000000 },
  },
  {
    nombre: "이미 공제를 다 쓴 경우",
    origen: { tipo: "recalculado", detalle: "10년 안에 5천만원을 이미 공제받아 남은 공제 0원. 과세표준 2천만원 × 10% = 2,000,000 − 60,000 = 1,940,000." },
    fecha: "2026-10-24",
    entrada: { gaek: 20000000, gwangye: "lineal", ijeon: 50000000, singo: true },
    esperado: { deduccion: 0, impuesto: 1940000 },
  },
]);
