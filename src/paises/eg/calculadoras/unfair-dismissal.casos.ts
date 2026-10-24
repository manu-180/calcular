import { definirCasos } from "@/motor/calculo";
import calculadora from "./unfair-dismissal";

export default definirCasos(calculadora, [
  {
    nombre: "خمس سنوات دون إخطار",
    origen: { tipo: "recalculado", detalle: "تعويض: 10,000 × 2 × 5 = 100,000. مقابل الإخطار: 10,000 × 3 = 30,000. الإجمالي 130,000." },
    fecha: "2026-10-24",
    entrada: { salario: 10000, anios: 5, sinPreaviso: true, mesesPreaviso: null },
    esperado: { total: 130000, indemnizacion: 100000, preaviso: 30000 },
  },
  {
    nombre: "ست سنوات ونصف مع إخطار كامل",
    origen: { tipo: "recalculado", detalle: "تعويض: 8,000 × 2 × 6.5 = 104,000. لا مقابل للإخطار." },
    fecha: "2026-10-24",
    entrada: { salario: 8000, anios: 6.5, sinPreaviso: false, mesesPreaviso: null },
    esperado: { total: 104000, preaviso: 0 },
  },
  {
    nombre: "شهر إخطار ناقص",
    origen: { tipo: "recalculado", detalle: "تعويض 12,000 × 2 × 3 = 72,000، ومقابل شهر واحد من الإخطار 12,000. الإجمالي 84,000." },
    fecha: "2026-10-24",
    entrada: { salario: 12000, anios: 3, sinPreaviso: true, mesesPreaviso: 1 },
    esperado: { total: 84000 },
  },
]);
