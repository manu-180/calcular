import { definirCasos } from "@/motor/calculo";
import calculadora from "./zengzhishui";

export default definirCasos(calculadora, [
  {
    nombre: "含税11300元，13%价税分离",
    origen: { tipo: "recalculado", detalle: "11300÷1.13＝10000，税额1300。" },
    fecha: "2026-10-29",
    entrada: { fangxiang: "han", jine: 11300, shuilv: "huowu" },
    esperado: { buhan: 10000, shui: 1300, hanshui: 11300, tasa: 13 },
  },
  {
    nombre: "不含税10000元，6%服务",
    origen: { tipo: "recalculado", detalle: "10000×6%＝600，价税合计10600。" },
    fecha: "2026-10-29",
    entrada: { fangxiang: "buhan", jine: 10000, shuilv: "fuwu" },
    esperado: { shui: 600, hanshui: 10600, tasa: 6 },
  },
  {
    nombre: "含税1090元，9%",
    origen: { tipo: "recalculado", detalle: "1090÷1.09＝1000，税额90。" },
    fecha: "2026-10-29",
    entrada: { fangxiang: "han", jine: 1090, shuilv: "dishui" },
    esperado: { buhan: 1000, shui: 90 },
  },
  {
    nombre: "小规模纳税人简易计税3%",
    origen: { tipo: "recalculado", detalle: "含税10300÷1.03＝10000，税额300。" },
    fecha: "2026-10-29",
    entrada: { fangxiang: "han", jine: 10300, shuilv: "jianyi" },
    esperado: { buhan: 10000, shui: 300, tasa: 3 },
  },
  {
    nombre: "增值税法施行当天",
    origen: { tipo: "recalculado", detalle: "增值税法自2026年1月1日起施行，当天13%：100×13%＝13。" },
    fecha: "2026-01-01",
    entrada: { fangxiang: "buhan", jine: 100, shuilv: "huowu" },
    esperado: { shui: 13 },
  },
]);
