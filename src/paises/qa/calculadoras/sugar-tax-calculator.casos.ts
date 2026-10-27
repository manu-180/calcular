import { definirCasos } from "@/motor/calculo";
import calculadora from "./sugar-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "24 cans of 330 ml at 10.6 g",
    origen: { tipo: "recalculado", detalle: "GTA: 8 g or more is high sugar, QAR 1.06 per litre. 24 × 0.33 = 7.92 l × 1.06 = 8.3952. Per can 0.3498." },
    fecha: "2026-10-26",
    entrada: { azucar: 10.6, soloArtificial: false, ml: 330, unidades: 24 },
    esperado: { porLitro: 1.06, litros: 7.92, total: 8.4, porUnidad: 0.35, tramo: "High sugar" },
  },
  {
    nombre: "1.5 litre bottle at 6 g",
    origen: { tipo: "recalculado", detalle: "5 to 7.99 g: QAR 0.77 per litre. 1.5 × 0.77 = 1.155." },
    fecha: "2026-10-26",
    entrada: { azucar: 6, soloArtificial: false, ml: 1500, unidades: 1 },
    esperado: { porLitro: 0.77, total: 1.16, tramo: "Medium sugar" },
  },
  {
    nombre: "Border: exactly 5 g is medium",
    origen: { tipo: "recalculado", detalle: "Medium tier is 5 to 7.99 g: 1 litre × 0.77." },
    fecha: "2026-10-26",
    entrada: { azucar: 5, soloArtificial: false, ml: 1000, unidades: 1 },
    esperado: { total: 0.77 },
  },
  {
    nombre: "Below 5 g is exempt",
    origen: { tipo: "recalculado", detalle: "Less than 5 g per 100 ml: exempt." },
    fecha: "2026-10-26",
    entrada: { azucar: 4.9, soloArtificial: false, ml: 330, unidades: 24 },
    esperado: { total: 0, tramo: "Exempt: low sugar" },
  },
  {
    nombre: "Artificial sweeteners only",
    origen: { tipo: "recalculado", detalle: "No added sugar, artificial sweeteners only: exempt." },
    fecha: "2026-10-26",
    entrada: { azucar: 0, soloArtificial: true, ml: 330, unidades: 24 },
    esperado: { total: 0 },
  },
]);
