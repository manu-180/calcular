import { definirCasos } from "@/motor/calculo";
import canastaBasica from "./canasta-basica";

export default definirCasos(canastaBasica, [
  {
    nombre: "Salario mínimo de la industria contra la canasta de julio 2026",
    origen: {
      tipo: "oficial",
      url: "https://www.inide.gob.ni/docs/CanastaB/canastab/CB2026/CBJul2026.xlsx",
      detalle: "INIDE, canasta básica de julio 2026: C$21,474.94. Salario mínimo de la industria manufacturera (Acuerdo 02-2026): C$8,320.48. Cubre 38.75 %; faltan 13154.46; la canasta cuesta 2.58 salarios mínimos.",
    },
    fecha: "2026-10-12",
    entrada: { ingreso: null, sector: "industria-manufacturera" },
    esperado: { canasta: 21474.94, ingreso: 8320.48, cobertura: 38.75, falta: 13154.46, sobra: 0, salariosMinimos: 2.58 },
  },
  {
    nombre: "Hogar con C$25,000 en julio",
    origen: { tipo: "recalculado", detalle: "25000 / 21474.94 = 116.41 %; sobran 3525.06." },
    fecha: "2026-08-20",
    entrada: { ingreso: 25000, sector: "industria-manufacturera" },
    esperado: { cobertura: 116.41, falta: 0, sobra: 3525.06 },
  },
  {
    nombre: "Canasta de marzo 2026 con el salario de comercio",
    origen: {
      tipo: "oficial",
      url: "https://www.inide.gob.ni/docs/CanastaB/canastab/CB2026/CBMar26.xlsx",
      detalle: "INIDE, marzo 2026: C$21,120.18. Comercio y servicios desde el 1/3/2026: C$11,350.08. Cubre 53.74 %; faltan 9770.10.",
    },
    fecha: "2026-03-15",
    entrada: { ingreso: null, sector: "comercio-servicios-basicos" },
    esperado: { canasta: 21120.18, cobertura: 53.74, falta: 9770.1, salariosMinimos: 1.86 },
  },
]);
