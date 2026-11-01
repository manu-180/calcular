import { definirCasos } from "@/motor/calculo";
import calculadora from "./dismissal-compensation";

export default definirCasos(calculadora, [
  {
    nombre: "Despido abusivo sin aviso, 5 años",
    origen: { tipo: "recalculado", detalle: "Art. 50: 2 a 12 meses de 30 M = 60 M a 360 M. Aviso 2 meses = 60 M. Total 120 M a 420 M." },
    fecha: "2026-11-01",
    entrada: { quien: "employer", salario: 30000000, anios: 5, avisoCumplido: false },
    esperado: { minimo: 60000000, maximo: 360000000, aviso: 60000000, totalMin: 120000000, totalMax: 420000000, paga: "يدفعه صاحب العمل للعامل" },
  },
  {
    nombre: "Renuncia sin causa con aviso cumplido",
    origen: { tipo: "recalculado", detalle: "Art. 50: 1 a 4 meses de 30 M." },
    fecha: "2026-11-01",
    entrada: { quien: "worker", salario: 30000000, anios: 2, avisoCumplido: true },
    esperado: { minimo: 30000000, maximo: 120000000, aviso: 0, totalMax: 120000000, paga: "يدفعه العامل لصاحب العمل" },
  },
]);
