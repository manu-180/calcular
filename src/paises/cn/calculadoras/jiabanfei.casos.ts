import { definirCasos } from "@/motor/calculo";
import calculadora from "./jiabanfei";

export default definirCasos(calculadora, [
  {
    nombre: "月薪8700元，三种加班都有",
    origen: {
      tipo: "recalculado",
      detalle: "日工资8700÷21.75＝400，小时工资50。工作日10小时×50×150%＝750；休息日8小时×50×200%＝800；法定休假日8小时×50×300%＝1200；合计2750。",
    },
    fecha: "2026-10-29",
    entrada: { yuexin: 8700, gongzuori: 10, xiuxiri: 8, jiejiari: 8 },
    esperado: { rigongzi: 400, xiaoshi: 50, gongzuori: 750, xiuxiri: 800, jiejiari: 1200, heji: 2750 },
  },
  {
    nombre: "月薪6000元，工作日加班20小时",
    origen: { tipo: "recalculado", detalle: "小时工资6000÷21.75÷8＝34.4828；20×34.4828×150%＝1034.48。" },
    fecha: "2026-10-29",
    entrada: { yuexin: 6000, gongzuori: 20, xiuxiri: 0, jiejiari: 0 },
    esperado: { gongzuori: 1034.48, heji: 1034.48, rigongzi: 275.86 },
  },
  {
    nombre: "月薪为0",
    origen: { tipo: "recalculado", detalle: "没有工资无法计算。" },
    fecha: "2026-10-29",
    entrada: { yuexin: 0, gongzuori: 10, xiuxiri: 0, jiejiari: 0 },
    esperaError: true,
  },
]);
