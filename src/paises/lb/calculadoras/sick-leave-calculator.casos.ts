import { definirCasos } from "@/motor/calculo";
import calculadora from "./sick-leave-calculator";

const s = { salario: 30000000 };
export default definirCasos(calculadora, [
  { nombre: "Menos de 3 meses", origen: { tipo: "recalculado", detalle: "Art. 40: desde 3 meses." }, fecha: "2026-11-01", entrada: { ...s, meses: 2 }, esperado: { completo: 0, total: 0 } },
  { nombre: "Dos años", origen: { tipo: "recalculado", detalle: "Medio mes completo + medio a mitad: 15 M + 7,5 M." }, fecha: "2026-11-01", entrada: { ...s, meses: 24 }, esperado: { completo: 0.5, total: 22500000 } },
  { nombre: "Tres años", origen: { tipo: "recalculado", detalle: "1 mes + 1 mes a mitad: 45 M." }, fecha: "2026-11-01", entrada: { ...s, meses: 36 }, esperado: { completo: 1, total: 45000000 } },
  { nombre: "Cinco años", origen: { tipo: "recalculado", detalle: "1,5 + 1,5 a mitad: 67,5 M." }, fecha: "2026-11-01", entrada: { ...s, meses: 60 }, esperado: { completo: 1.5, total: 67500000 } },
  { nombre: "Ocho años", origen: { tipo: "recalculado", detalle: "2 + 2 a mitad: 90 M." }, fecha: "2026-11-01", entrada: { ...s, meses: 96 }, esperado: { completo: 2, total: 90000000 } },
  { nombre: "Doce años", origen: { tipo: "recalculado", detalle: "2,5 + 2,5 a mitad: 112,5 M." }, fecha: "2026-11-01", entrada: { ...s, meses: 144 }, esperado: { completo: 2.5, total: 112500000 } },
]);
