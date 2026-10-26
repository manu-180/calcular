import { definirCasos } from "@/motor/calculo";
import calculadora from "./inheritance-tax";

export default definirCasos(calculadora, [
  {
    nombre: "상속재산 20억원, 배우자와 자녀 2명",
    origen: {
      tipo: "recalculado",
      detalle: "상속세 및 증여세법 제21조 일괄공제 5억원, 제19조 제4항 배우자공제 최소 5억원. 과세표준 10억원: 9천만원 + 5억원×30% = 240,000,000. 신고세액공제 7,200,000. 납부 232,800,000.",
    },
    fecha: "2026-10-24",
    entrada: { jaesan: 2000000000, chaemu: 0, baeuja: true, baeujaGaek: 0, janyeo: 2, singo: true },
    esperado: { general: 500000000, conyuge: 500000000, base: 1000000000, calculado: 240000000, impuesto: 232800000 },
  },
  {
    nombre: "상속재산 10억원, 배우자 없음, 자녀 1명",
    origen: { tipo: "recalculado", detalle: "일괄공제 5억원. 과세표준 5억원: 1천만원 + 4억원×20% = 90,000,000. 신고세액공제 2,700,000. 납부 87,300,000." },
    fecha: "2026-10-24",
    entrada: { jaesan: 1000000000, chaemu: 0, baeuja: false, baeujaGaek: null, janyeo: 1, singo: true },
    esperado: { base: 500000000, impuesto: 87300000 },
  },
  {
    nombre: "상속재산 40억원, 배우자가 15억원 상속",
    origen: {
      tipo: "recalculado",
      detalle: "배우자 법정상속분 한도 40억원×1.5/3.5 = 17억1,428만원. 실제 15억원 공제. 일괄 5억원. 과세표준 20억원: 2억4천만원 + 10억원×40% = 640,000,000. 신고세액공제 19,200,000. 납부 620,800,000.",
    },
    fecha: "2026-10-24",
    entrada: { jaesan: 4000000000, chaemu: 0, baeuja: true, baeujaGaek: 1500000000, janyeo: 2, singo: true },
    esperado: { conyuge: 1500000000, base: 2000000000, impuesto: 620800000 },
  },
  {
    nombre: "상속재산 8억원, 배우자와 자녀 1명은 상속세 없음",
    origen: { tipo: "recalculado", detalle: "일괄공제 5억원 + 배우자공제 5억원 = 10억원 > 8억원." },
    fecha: "2026-10-24",
    entrada: { jaesan: 800000000, chaemu: 0, baeuja: true, baeujaGaek: 0, janyeo: 1, singo: true },
    esperado: { base: 0, impuesto: 0 },
  },
]);
