import { definirCasos } from "@/motor/calculo";
import calculadora from "./capital-gains-tax";

export default definirCasos(calculadora, [
  {
    nombre: "토지 10년 보유, 차익 1억9천만원",
    origen: {
      tipo: "recalculado",
      detalle: "소득세법 제95조 표 1: 10년 20%. 차익 190,000,000 − 공제 38,000,000 − 기본공제 2,500,000 = 149,500,000. 15,360,000 + 61,500,000×35% = 36,885,000. 지방소득세 3,688,500.",
    },
    fecha: "2026-10-24",
    entrada: { jongnyu: "other", yangdo: 500000000, chwideuk: 300000000, gyeongbi: 10000000, boyu: 10, geoju: null, ilju: null },
    esperado: { ganancia: 190000000, tasaDeduccion: 20, deduccionLarga: 38000000, base: 149500000, impuesto: 36885000, local: 3688500, total: 40573500 },
  },
  {
    nombre: "1세대 1주택 10억원 양도는 비과세",
    origen: { tipo: "recalculado", detalle: "소득세법 시행령 제156조: 12억원 이하 1세대 1주택은 고가주택이 아니라서 비과세." },
    fecha: "2026-10-24",
    entrada: { jongnyu: "house", yangdo: 1000000000, chwideuk: 600000000, gyeongbi: 0, boyu: 5, geoju: 5, ilju: true },
    esperado: { total: 0 },
  },
  {
    nombre: "1세대 1주택 고가주택 15억원, 10년 보유·거주",
    origen: {
      tipo: "recalculado",
      detalle: "시행령 제160조: 과세 비율 (15억−12억)÷15억 = 0.2. 과세 차익 800,000,000×0.2 = 160,000,000. 표 2: 보유 40% + 거주 40% = 80%, 공제 128,000,000. 과세표준 29,500,000. 840,000 + 15,500,000×15% = 3,165,000.",
    },
    fecha: "2026-10-24",
    entrada: { jongnyu: "house", yangdo: 1500000000, chwideuk: 700000000, gyeongbi: 0, boyu: 10, geoju: 10, ilju: true },
    esperado: { gravada: 160000000, tasaDeduccion: 80, deduccionLarga: 128000000, base: 29500000, impuesto: 3165000, local: 316500 },
  },
  {
    nombre: "주택 1년 보유 후 양도",
    origen: { tipo: "recalculado", detalle: "소득세법 제104조 제1항 제2호: 주택 1년 이상 2년 미만 60%. 과세표준 97,500,000 × 60% = 58,500,000." },
    fecha: "2026-10-24",
    entrada: { jongnyu: "house", yangdo: 600000000, chwideuk: 500000000, gyeongbi: 0, boyu: 1, geoju: 1, ilju: false },
    esperado: { base: 97500000, impuesto: 58500000, local: 5850000 },
  },
]);
