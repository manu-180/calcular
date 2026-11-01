import { definirCasos } from "@/motor/calculo";
import calculadora from "./deposit-interest";

export default definirCasos(calculadora, [
  {
    nombre: "정기예금 1천만원, 연 3.5%, 12개월 단리",
    origen: { tipo: "recalculado", detalle: "이자 10,000,000×3.5% = 350,000. 소득세법 제129조 14%: 49,000, 지방소득세 4,900. 세후 이자 296,100." },
    fecha: "2026-10-24",
    entrada: { sangpum: "yegeum", geumaek: 10000000, iyul: 3.5, gigan: 12, bangsik: "danri", gwase: "ilban" },
    esperado: { interes: 350000, impuesto: 53900, neto: 296100, total: 10296100 },
  },
  {
    nombre: "정기적금 월 50만원, 연 4%, 12개월 단리",
    origen: { tipo: "recalculado", detalle: "500,000×4%÷12×(12×13÷2=78) = 130,000. 세금 18,200+1,820. 만기 6,000,000+109,980." },
    fecha: "2026-10-24",
    entrada: { sangpum: "jeokgeum", geumaek: 500000, iyul: 4, gigan: 12, bangsik: "danri", gwase: "ilban" },
    esperado: { interes: 130000, impuesto: 20020, total: 6109980 },
  },
  {
    nombre: "정기예금 1천만원, 연 3%, 24개월 월복리",
    origen: { tipo: "recalculado", detalle: "10,000,000×((1+0.0025)^24−1) = 617,570. 세금 86,450+8,640. 세후 이자 522,480." },
    fecha: "2026-10-24",
    entrada: { sangpum: "yegeum", geumaek: 10000000, iyul: 3, gigan: 24, bangsik: "bokri", gwase: "ilban" },
    esperado: { interes: 617570, neto: 522480 },
  },
  {
    nombre: "비과세 적금 월 30만원, 연 5%, 24개월 월복리",
    origen: { tipo: "recalculado", detalle: "Σ 300,000×((1+0.05/12)^k−1), k=1..24 = 387,259. 비과세라 세금 0." },
    fecha: "2026-10-24",
    entrada: { sangpum: "jeokgeum", geumaek: 300000, iyul: 5, gigan: 24, bangsik: "bokri", gwase: "bigwase" },
    esperado: { interes: 387259, impuesto: 0, total: 7587259 },
  },
]);
