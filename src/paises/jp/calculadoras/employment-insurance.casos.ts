import { definirCasos } from "@/motor/calculo";
import calculadora from "./employment-insurance";

export default definirCasos(calculadora, [
  {
    nombre: "一般の事業、賃金30万円",
    origen: { tipo: "recalculado", detalle: "300,000×5/1,000＝1,500（本人）、300,000×8.5/1,000＝2,550（事業主）、合計4,050。" },
    fecha: "2026-10-17",
    entrada: { chingin: 300000, jigyo: "general" },
    esperado: { honin: 1500, jigyo: 2550, total: 4050 },
  },
  {
    nombre: "建設の事業、賃金25万円",
    origen: { tipo: "recalculado", detalle: "250,000×6/1,000＝1,500（本人）、250,000×10.5/1,000＝2,625（事業主）、合計4,125。" },
    fecha: "2026-10-17",
    entrada: { chingin: 250000, jigyo: "construction" },
    esperado: { honin: 1500, jigyo: 2625, total: 4125 },
  },
  {
    nombre: "賃金0円",
    origen: { tipo: "recalculado", detalle: "0円は入力として無効です。" },
    fecha: "2026-10-17",
    entrada: { chingin: 0, jigyo: "general" },
    esperaError: true,
  },
]);
