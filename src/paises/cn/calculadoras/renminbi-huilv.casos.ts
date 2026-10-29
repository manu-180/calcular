import { definirCasos } from "@/motor/calculo";
import calculadora from "./renminbi-huilv";

const CFETS = "https://www.chinamoney.com.cn/chinese/bkccpr/";

export default definirCasos(calculadora, [
  {
    nombre: "100美元按2026年10月29日中间价",
    origen: { tipo: "oficial", url: CFETS, detalle: "2026-10-29 美元/人民币中间价6.7147：100×6.7147＝671.47。" },
    fecha: "2026-10-29",
    entrada: { bizhong: "usd", fangxiang: "dao-rmb", jine: 100 },
    esperado: { jieguo: 671.47, zhongjianjia: 6.7147, fecha: "2026-10-29" },
  },
  {
    nombre: "10000日元换人民币",
    origen: { tipo: "oficial", url: CFETS, detalle: "2026-10-29 100日元/人民币中间价4.2453：10000÷100×4.2453＝424.53。" },
    fecha: "2026-10-29",
    entrada: { bizhong: "jpy100", fangxiang: "dao-rmb", jine: 10000 },
    esperado: { jieguo: 424.53 },
  },
  {
    nombre: "1000元人民币换港元",
    origen: { tipo: "oficial", url: CFETS, detalle: "2026-10-28 港元/人民币中间价0.85621：1000÷0.85621＝1167.94。" },
    fecha: "2026-10-28",
    entrada: { bizhong: "hkd", fangxiang: "cong-rmb", jine: 1000 },
    esperado: { jieguo: 1167.94, fecha: "2026-10-28" },
  },
  {
    nombre: "金额为0",
    origen: { tipo: "oficial", url: CFETS, detalle: "金额必须大于0。" },
    fecha: "2026-10-29",
    entrada: { bizhong: "eur", fangxiang: "dao-rmb", jine: 0 },
    esperaError: true,
  },
]);
