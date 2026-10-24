import { definirCasos } from "@/motor/calculo";
import calculadora from "./child-allowance";

export default definirCasos(calculadora, [
  {
    nombre: "3歳未満1人、小学生1人",
    origen: { tipo: "recalculado", detalle: "上の子10,000円＋下の子15,000円＝月25,000円。2か月分50,000円、年300,000円。" },
    fecha: "2026-10-17",
    entrada: { menores3: 1, hasta18: 1, mayores: 0 },
    esperado: { mensual: 25000, porPago: 50000, anual: 300000, terceros: 0 },
  },
  {
    nombre: "大学生1人、高校生1人、2歳1人",
    origen: { tipo: "recalculado", detalle: "大学生は手当なしだが数に入る。高校生は2人目で10,000円、2歳は3人目で30,000円。月40,000円。" },
    fecha: "2026-10-17",
    entrada: { menores3: 1, hasta18: 1, mayores: 1 },
    esperado: { mensual: 40000, terceros: 1 },
  },
  {
    nombre: "3歳以上の子が4人",
    origen: { tipo: "recalculado", detalle: "1人目・2人目10,000円、3人目・4人目30,000円。月80,000円。" },
    fecha: "2026-10-17",
    entrada: { menores3: 0, hasta18: 4, mayores: 0 },
    esperado: { mensual: 80000, terceros: 2 },
  },
  {
    nombre: "対象の子がいない",
    origen: { tipo: "recalculado", detalle: "高校生年代までの子がいないので計算できません。" },
    fecha: "2026-10-17",
    entrada: { menores3: 0, hasta18: 0, mayores: 1 },
    esperaError: true,
  },
]);
