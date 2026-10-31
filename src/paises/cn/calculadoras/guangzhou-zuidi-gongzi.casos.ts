import { definirCasos } from "@/motor/calculo";
import calculadora from "./guangzhou-zuidi-gongzi";

const GZ = "https://www.gz.gov.cn/xw/tzgg/content/post_10981840.html";

export default definirCasos(calculadora, [
  {
    nombre: "月工资2500元，低于2680元",
    origen: { tipo: "oficial", url: GZ, detalle: "2026年9月1日起广州月最低工资2680元，差额180元。" },
    fecha: "2026-10-29",
    entrada: { leixing: "quanrizhi", gongzi: 2500, xiaoshi: null },
    esperado: { biaozhun: 2680, chae: 180, dabiao: "低于最低工资标准" },
  },
  {
    nombre: "非全日制每小时26元，工作80小时",
    origen: { tipo: "oficial", url: GZ, detalle: "小时最低工资25.4元，26元达标；80×25.4＝2032。" },
    fecha: "2026-10-29",
    entrada: { leixing: "feiquanrizhi", gongzi: 26, xiaoshi: 80 },
    esperado: { biaozhun: 25.4, chae: 0, dabiao: "达到最低工资标准", yuedi: 2032 },
  },
  {
    nombre: "新标准生效当天",
    origen: { tipo: "oficial", url: GZ, detalle: "调整后的最低工资标准从2026年9月1日起执行。" },
    fecha: "2026-09-01",
    entrada: { leixing: "quanrizhi", gongzi: 2680, xiaoshi: null },
    esperado: { biaozhun: 2680, dabiao: "达到最低工资标准" },
  },
]);
