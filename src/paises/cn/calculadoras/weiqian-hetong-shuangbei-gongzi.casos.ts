import { definirCasos } from "@/motor/calculo";
import calculadora from "./weiqian-hetong-shuangbei-gongzi";

export default definirCasos(calculadora, [
  {
    nombre: "入职6个月没签合同，月薪8000元",
    origen: { tipo: "recalculado", detalle: "第一个月不计，计算5个月：8000×(2−1)×5＝40000。" },
    fecha: "2026-10-29",
    entrada: { yuegongzi: 8000, yueshu: 6 },
    esperado: { yueshu: 5, ewai: 40000 },
  },
  {
    nombre: "满一年以上没签合同",
    origen: { tipo: "recalculado", detalle: "实施条例第七条：自满一个月的次日至满一年的前一日，最多11个月：10000×11＝110000。" },
    fecha: "2026-10-29",
    entrada: { yuegongzi: 10000, yueshu: 18 },
    esperado: { yueshu: 11, ewai: 110000 },
  },
  {
    nombre: "一个月内签了合同",
    origen: { tipo: "recalculado", detalle: "用工不超过一个月，不支付二倍工资。" },
    fecha: "2026-10-29",
    entrada: { yuegongzi: 10000, yueshu: 1 },
    esperado: { yueshu: 0, ewai: 0 },
  },
]);
