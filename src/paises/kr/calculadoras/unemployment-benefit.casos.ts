import { definirCasos } from "@/motor/calculo";
import calculadora from "./unemployment-benefit";

export default definirCasos(calculadora, [
  {
    nombre: "3개월 900만원, 45세, 가입 3년 이상",
    origen: {
      tipo: "recalculado",
      detalle: "산정 기간 7.24~10.23 = 92일. 9,000,000÷92=97,826 × 60% = 58,695로 하한액 10,320×8×80%=66,048보다 적어 하한 적용. 별표 1: 50세 미만 3~5년 180일. 66,048×180=11,888,640.",
    },
    fecha: "2026-10-24",
    entrada: { majimak: "2026-10-23", imgeum: 9000000, gigan: "3", osip: false, sigan: 8 },
    esperado: { promedio: 97826, diario: 66048, dias: 180, total: 11888640 },
  },
  {
    nombre: "3개월 1,500만원, 52세, 가입 10년 이상",
    origen: { tipo: "recalculado", detalle: "평균임금 163,043원은 상한 113,500원 적용. 113,500×60%=68,100. 50세 이상 10년 이상 270일. 68,100×270=18,387,000." },
    fecha: "2026-10-24",
    entrada: { majimak: "2026-10-23", imgeum: 15000000, gigan: "10", osip: true, sigan: 8 },
    esperado: { diario: 68100, dias: 270, total: 18387000 },
  },
  {
    nombre: "하루 4시간 근무, 3개월 600만원",
    origen: { tipo: "recalculado", detalle: "6,000,000÷92=65,217 × 60% = 39,130. 하한 10,320×4×80%=33,024. 50세 미만 1~3년 150일. 39,130×150=5,869,500." },
    fecha: "2026-10-24",
    entrada: { majimak: "2026-10-23", imgeum: 6000000, gigan: "1", osip: false, sigan: 4 },
    esperado: { diario: 39130, minimo: 33024, dias: 150, total: 5869500 },
  },
]);
