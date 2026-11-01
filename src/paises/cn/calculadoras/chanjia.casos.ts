import { definirCasos } from "@/motor/calculo";
import calculadora from "./chanjia";

export default definirCasos(calculadora, [
  {
    nombre: "顺产一个婴儿",
    origen: { tipo: "recalculado", detalle: "女职工劳动保护特别规定第七条：生育享受98天产假，产前可休15天。" },
    fecha: "2026-10-29",
    entrada: { qingxing: "shengyu", nanchan: false, taishu: 1 },
    esperado: { tianshu: 98, chanqian: 15, zengjia: 0 },
  },
  {
    nombre: "难产且双胞胎",
    origen: { tipo: "recalculado", detalle: "98＋难产15＋多1个婴儿15＝128天。" },
    fecha: "2026-10-29",
    entrada: { qingxing: "shengyu", nanchan: true, taishu: 2 },
    esperado: { tianshu: 128, zengjia: 30 },
  },
  {
    nombre: "怀孕未满4个月流产",
    origen: { tipo: "recalculado", detalle: "享受15天产假。" },
    fecha: "2026-10-29",
    entrada: { qingxing: "liuchan-xiao", nanchan: null, taishu: null },
    esperado: { tianshu: 15, chanqian: 0 },
  },
  {
    nombre: "怀孕满4个月流产",
    origen: { tipo: "recalculado", detalle: "享受42天产假。" },
    fecha: "2026-10-29",
    entrada: { qingxing: "liuchan-da", nanchan: null, taishu: null },
    esperado: { tianshu: 42 },
  },
]);
