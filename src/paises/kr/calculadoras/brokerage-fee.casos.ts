import { definirCasos } from "@/motor/calculo";
import calculadora from "./brokerage-fee";

export default definirCasos(calculadora, [
  {
    nombre: "아파트 매매 5억원",
    origen: { tipo: "oficial", url: "https://www.law.go.kr/법령/공인중개사법시행규칙/제20조", detalle: "별표 1: 2억원 이상 9억원 미만 1천분의 4. 500,000,000×0.4% = 2,000,000, 부가세 포함 2,200,000." },
    fecha: "2026-10-24",
    entrada: { georae: "sale", mulgeon: "house", geumaek: 500000000, wolse: null },
    esperado: { tasa: 0.4, honorario: 2000000, conIva: 2200000 },
  },
  {
    nombre: "매매 3천만원은 한도 25만원 이내",
    origen: { tipo: "recalculado", detalle: "5천만원 미만 0.6%, 한도 25만원. 30,000,000×0.6% = 180,000." },
    fecha: "2026-10-24",
    entrada: { georae: "sale", mulgeon: "house", geumaek: 30000000, wolse: null },
    esperado: { honorario: 180000, tope: 250000 },
  },
  {
    nombre: "매매 20억원",
    origen: { tipo: "recalculado", detalle: "15억원 이상 0.7%. 2,000,000,000×0.7% = 14,000,000." },
    fecha: "2026-10-24",
    entrada: { georae: "sale", mulgeon: "house", geumaek: 2000000000, wolse: null },
    esperado: { tasa: 0.7, honorario: 14000000 },
  },
  {
    nombre: "전세 3억원",
    origen: { tipo: "recalculado", detalle: "임대차 1억원 이상 6억원 미만 0.3%. 900,000." },
    fecha: "2026-10-24",
    entrada: { georae: "lease", mulgeon: "house", geumaek: 300000000, wolse: 0 },
    esperado: { tasa: 0.3, honorario: 900000 },
  },
  {
    nombre: "보증금 1천만원, 월세 50만원",
    origen: { tipo: "recalculado", detalle: "제20조 제5항: 10,000,000 + 500,000×100 = 60,000,000. 0.4%, 한도 30만원. 240,000." },
    fecha: "2026-10-24",
    entrada: { georae: "lease", mulgeon: "house", geumaek: 10000000, wolse: 500000 },
    esperado: { monto: 60000000, honorario: 240000 },
  },
  {
    nombre: "보증금 500만원, 월세 30만원",
    origen: { tipo: "recalculado", detalle: "5,000,000 + 300,000×100 = 35,000,000 < 5천만원이라 ×70: 26,000,000. 0.5% = 130,000." },
    fecha: "2026-10-24",
    entrada: { georae: "lease", mulgeon: "house", geumaek: 5000000, wolse: 300000 },
    esperado: { monto: 26000000, honorario: 130000 },
  },
  {
    nombre: "오피스텔 매매 3억원",
    origen: { tipo: "recalculado", detalle: "별표 2: 매매 1천분의 5. 1,500,000." },
    fecha: "2026-10-24",
    entrada: { georae: "sale", mulgeon: "officetel", geumaek: 300000000, wolse: null },
    esperado: { tasa: 0.5, honorario: 1500000 },
  },
]);
