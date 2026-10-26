import { definirCasos } from "@/motor/calculo";
import calculadora from "./acquisition-tax";

export default definirCasos(calculadora, [
  {
    nombre: "5억원, 전용 85제곱미터 이하",
    origen: { tipo: "recalculado", detalle: "지방세법 제11조 제1항 제8호 가목 1%: 5,000,000. 지방교육세 1%×50%×20%: 500,000. 농어촌특별세 비과세." },
    fecha: "2026-10-24",
    entrada: { gaek: 500000000, gwangpyeong: false },
    esperado: { tasa: 1, impuesto: 5000000, educacion: 500000, especial: 0, total: 5500000 },
  },
  {
    nombre: "7억원, 전용 85제곱미터 초과",
    origen: {
      tipo: "recalculado",
      detalle: "나목: (7억×2/3억 − 3)×1/100 = 0.016667 → 0.0167. 취득세 11,690,000. 지방교육세 700,000,000×0.835%×20% = 1,169,000. 농어촌특별세 2%×10% = 1,400,000.",
    },
    fecha: "2026-10-24",
    entrada: { gaek: 700000000, gwangpyeong: true },
    esperado: { tasa: 1.67, impuesto: 11690000, educacion: 1169000, especial: 1400000, total: 14259000 },
  },
  {
    nombre: "10억원, 전용 85제곱미터 초과",
    origen: { tipo: "recalculado", detalle: "다목 3%: 30,000,000. 지방교육세 3,000,000. 농어촌특별세 2,000,000." },
    fecha: "2026-10-24",
    entrada: { gaek: 1000000000, gwangpyeong: true },
    esperado: { tasa: 3, total: 35000000 },
  },
]);
