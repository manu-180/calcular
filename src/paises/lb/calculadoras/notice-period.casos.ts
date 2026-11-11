import { definirCasos } from "@/motor/calculo";
import calculadora from "./notice-period";

const base = { salario: 30000000, prueba: false };
export default definirCasos(calculadora, [
  { nombre: "3 años: un mes", origen: { tipo: "recalculado", detalle: "Art. 50 c: tres años o menos." }, fecha: "2026-11-01", entrada: { ...base, anios: 3 }, esperado: { meses: 1, compensacion: 30000000 } },
  { nombre: "5 años: dos meses", origen: { tipo: "recalculado", detalle: "Más de 3 y menos de 6." }, fecha: "2026-11-01", entrada: { ...base, anios: 5 }, esperado: { meses: 2, compensacion: 60000000 } },
  { nombre: "6 años: tres meses", origen: { tipo: "recalculado", detalle: "Hasta menos de 12; la versión francesa dice de 6 a 12." }, fecha: "2026-11-01", entrada: { ...base, anios: 6 }, esperado: { meses: 3 } },
  { nombre: "12 años: cuatro meses", origen: { tipo: "recalculado", detalle: "12 años o más." }, fecha: "2026-11-01", entrada: { ...base, anios: 12 }, esperado: { meses: 4, compensacion: 120000000 } },
  { nombre: "En prueba: sin aviso", origen: { tipo: "recalculado", detalle: "Art. 50 c, último párrafo." }, fecha: "2026-11-01", entrada: { salario: 30000000, anios: 0, prueba: true }, esperado: { meses: 0, compensacion: 0, ausencia: "لا تنطبق" } },
]);
