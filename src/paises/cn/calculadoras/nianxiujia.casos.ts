import { definirCasos } from "@/motor/calculo";
import calculadora from "./nianxiujia";

export default definirCasos(calculadora, [
  {
    nombre: "工作3年，月薪8700元，未休2天",
    origen: { tipo: "recalculado", detalle: "已满1年不满10年，年休假5天。日工资8700÷21.75＝400，2天×400×300%＝2400。" },
    fecha: "2026-10-29",
    entrada: { nianxian: 3, yuexin: 8700, weixiu: 2 },
    esperado: { tianshu: 5, rigongzi: 400, baochou: 2400 },
  },
  {
    nombre: "累计工作12年",
    origen: { tipo: "recalculado", detalle: "已满10年不满20年，年休假10天。" },
    fecha: "2026-10-29",
    entrada: { nianxian: 12, yuexin: 10000, weixiu: 0 },
    esperado: { tianshu: 10, baochou: 0 },
  },
  {
    nombre: "累计工作20年整",
    origen: { tipo: "recalculado", detalle: "已满20年，年休假15天。" },
    fecha: "2026-10-29",
    entrada: { nianxian: 20, yuexin: 10000, weixiu: 0 },
    esperado: { tianshu: 15 },
  },
  {
    nombre: "工作不满1年",
    origen: { tipo: "recalculado", detalle: "不满1年不享受年休假。" },
    fecha: "2026-10-29",
    entrada: { nianxian: 0.5, yuexin: 6000, weixiu: 0 },
    esperado: { tianshu: 0 },
  },
  {
    nombre: "未休天数超过应休天数",
    origen: { tipo: "recalculado", detalle: "5天年休假不可能未休6天。" },
    fecha: "2026-10-29",
    entrada: { nianxian: 3, yuexin: 6000, weixiu: 6 },
    esperaError: true,
  },
]);
