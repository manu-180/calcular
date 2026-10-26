import { definirCasos } from "@/motor/calculo";
import calculadora from "./weekly-holiday-pay";

export default definirCasos(calculadora, [
  {
    nombre: "최저임금, 주 20시간",
    origen: { tipo: "recalculado", detalle: "주휴시간 20÷5=4시간. 10,320×4=41,280. 한 달 41,280×365÷7÷12=179,371. 주급 24×10,320=247,680." },
    fecha: "2026-10-24",
    entrada: { sigeup: null, horas: 20 },
    esperado: { horasJuhyu: 4, semanal: 41280, mensual: 179371, semanaTotal: 247680, sigeup: 10320 },
  },
  {
    nombre: "시급 12,000원, 주 40시간",
    origen: { tipo: "recalculado", detalle: "주휴시간 8시간. 12,000×8=96,000. 한 달 96,000×365÷7÷12=417,143." },
    fecha: "2026-10-24",
    entrada: { sigeup: 12000, horas: 40 },
    esperado: { horasJuhyu: 8, semanal: 96000, mensual: 417143 },
  },
  {
    nombre: "주 48시간도 주휴는 8시간",
    origen: { tipo: "recalculado", detalle: "1일 소정근로시간 상한 8시간. 10,320×8=82,560." },
    fecha: "2026-10-24",
    entrada: { sigeup: null, horas: 48 },
    esperado: { horasJuhyu: 8, semanal: 82560 },
  },
  {
    nombre: "주 14시간은 주휴수당 없음",
    origen: { tipo: "recalculado", detalle: "근로기준법 제18조 제3항: 15시간 미만은 제55조 미적용." },
    fecha: "2026-10-24",
    entrada: { sigeup: 11000, horas: 14 },
    esperado: { semanal: 0, horasJuhyu: 0 },
  },
]);
