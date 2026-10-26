import { definirCasos } from "@/motor/calculo";
import calculadora from "./minimum-wage";

export default definirCasos(calculadora, [
  {
    nombre: "2026년 주 40시간",
    origen: {
      tipo: "oficial",
      url: "https://www.law.go.kr/admRulLsInfoP.do?admRulSeq=2100000262710",
      detalle: "2026년 적용 최저임금 고시: 시간급 10,320원, 월 환산액 2,156,880원(209시간).",
    },
    fecha: "2026-10-24",
    entrada: { horas: 40 },
    esperado: { hora: 10320, mensual: 2156880, semana: 495360, dia: 82560, anual: 25882560 },
  },
  {
    nombre: "2027년 주 40시간",
    origen: {
      tipo: "oficial",
      url: "https://www.law.go.kr/admRulLsInfoP.do?admRulSeq=2100000283564",
      detalle: "2027년 적용 최저임금 고시: 시간급 10,700원, 월 환산액 2,236,300원(209시간).",
    },
    fecha: "2027-01-04",
    entrada: { horas: 40 },
    esperado: { hora: 10700, mensual: 2236300 },
  },
  {
    nombre: "2026년 주 20시간 단시간 근로",
    origen: { tipo: "recalculado", detalle: "209×20÷40=104.5시간. 10,320×104.5=1,078,440. 주급 (20+4)×10,320=247,680." },
    fecha: "2026-10-24",
    entrada: { horas: 20 },
    esperado: { mensual: 1078440, semana: 247680 },
  },
  {
    nombre: "2026년 주 10시간은 주휴 없음",
    origen: { tipo: "recalculado", detalle: "15시간 미만이라 주휴 없음. 10×365÷7÷12=43.452시간, 10,320×43.452=448,429." },
    fecha: "2026-10-24",
    entrada: { horas: 10 },
    esperado: { mensual: 448429, semana: 103200 },
  },
]);
