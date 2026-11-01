import { definirCasos } from "@/motor/calculo";
import calculadora from "./gongzi-geshui-yukou";

export default definirCasos(calculadora, [
  {
    nombre: "月薪2万元，专项扣除4000元，第3个月",
    origen: {
      tipo: "recalculado",
      detalle: "每月20000−5000−4000＝11000。前3个月累计33000×3%＝990，前2个月22000×3%＝660，3月预扣330。",
    },
    fecha: "2026-10-29",
    entrada: { yuexin: 20000, zhuanxiang: 4000, fujia: 0, yuefen: 3 },
    esperado: { leijiSuode: 33000, leijiShui: 990, yijiao: 660, benyue: 330, tasa: 3, kouchu: 0 },
  },
  {
    nombre: "同上，第4个月跨入10%档",
    origen: {
      tipo: "recalculado",
      detalle: "累计44000×10%−2520＝1880，减去前3个月990，4月预扣890。",
    },
    fecha: "2026-10-29",
    entrada: { yuexin: 20000, zhuanxiang: 4000, fujia: 0, yuefen: 4 },
    esperado: { leijiSuode: 44000, leijiShui: 1880, benyue: 890, tasa: 10, kouchu: 2520 },
  },
  {
    nombre: "月薪2万元，子女教育2000元，第12个月",
    origen: {
      tipo: "recalculado",
      detalle: "每月20000−5000−4000−2000＝9000，累计108000×10%−2520＝8280；前11个月99000×10%−2520＝7380，12月预扣900。",
    },
    fecha: "2026-10-29",
    entrada: { yuexin: 20000, zhuanxiang: 4000, fujia: 2000, yuefen: 12 },
    esperado: { leijiSuode: 108000, leijiShui: 8280, yijiao: 7380, benyue: 900 },
  },
  {
    nombre: "月份为13",
    origen: { tipo: "recalculado", detalle: "一年只有12个月。" },
    fecha: "2026-10-29",
    entrada: { yuexin: 20000, zhuanxiang: 0, fujia: 0, yuefen: 13 },
    esperaError: true,
  },
]);
