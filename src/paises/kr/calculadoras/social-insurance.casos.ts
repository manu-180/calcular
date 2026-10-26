import { definirCasos } from "@/motor/calculo";
import calculadora from "./social-insurance";

export default definirCasos(calculadora, [
  {
    nombre: "월 보수 300만원, 150명 미만 회사",
    origen: {
      tipo: "recalculado",
      detalle:
        "국민연금 3,000,000×4.75%=142,500. 건강 3,000,000×7.19%÷2=107,850. 장기요양 107,850×(0.9448÷7.19=0.1314)=14,170. 고용 3,000,000×0.9%=27,000. 근로자 291,520. 회사는 고용 3,000,000×(0.9%+0.25%)=34,500을 더해 299,020. 합계 590,540.",
    },
    fecha: "2026-10-24",
    entrada: { bosu: 3000000, gyumo: "u150", sanjae: 0 },
    esperado: { pension: 142500, salud: 107850, cuidado: 14170, empleo: 27000, trabajador: 291520, empleoEmpresa: 34500, empresa: 299020, total: 590540 },
  },
  {
    nombre: "월 보수 30만원은 국민연금 하한액 적용",
    origen: { tipo: "recalculado", detalle: "2026년 7월부터 하한액 410,000원. 410,000×4.75%=19,475, 10원 미만 절사 19,470." },
    fecha: "2026-10-24",
    entrada: { bosu: 300000, gyumo: "u150", sanjae: 0 },
    esperado: { basePension: 410000, pension: 19470 },
  },
  {
    nombre: "2026년 6월에는 이전 상한액 637만원",
    origen: { tipo: "recalculado", detalle: "2026년 6월분까지 상한 6,370,000원. 6,370,000×4.75%=302,575 → 302,570. 산재 1% 8,000,000×1%=80,000." },
    fecha: "2026-06-15",
    entrada: { bosu: 8000000, gyumo: "o1000", sanjae: 1 },
    esperado: { basePension: 6370000, pension: 302570, sanjae: 80000 },
  },
]);
