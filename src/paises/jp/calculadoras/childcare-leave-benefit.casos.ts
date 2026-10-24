import { definirCasos } from "@/motor/calculo";
import calculadora from "./childcare-leave-benefit";

export default definirCasos(calculadora, [
  {
    nombre: "月30万円、12か月",
    origen: { tipo: "recalculado", detalle: "300,000×67%＝201,000円を6か月、300,000×50%＝150,000円を6か月。合計2,106,000円。" },
    fecha: "2026-10-17",
    entrada: { salario: 300000, meses: 12 },
    esperado: { primero: 201000, despues: 150000, total: 2106000 },
  },
  {
    nombre: "上限額を超える賃金",
    origen: { tipo: "oficial", url: "https://www.mhlw.go.jp/content/001728499.pdf", detalle: "令和8年8月1日から休業開始時賃金月額の上限496,200円、支給上限額は67％で332,454円、50％で248,100円。" },
    fecha: "2026-10-17",
    entrada: { salario: 700000, meses: 8 },
    esperado: { base: 496200, primero: 332454, despues: 248100, total: 2490924 },
  },
  {
    nombre: "下限額を下回る賃金",
    origen: { tipo: "recalculado", detalle: "下限96,090円で計算。96,090×67%＝64,380.3→64,380円。" },
    fecha: "2026-10-17",
    entrada: { salario: 80000, meses: 3 },
    esperado: { base: 96090, primero: 64380, total: 193140 },
  },
]);
