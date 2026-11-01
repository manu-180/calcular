import { definirCasos } from "@/motor/calculo";
import calculadora from "./yinhuashui";

export default definirCasos(calculadora, [
  {
    nombre: "办公楼转让书据300万元",
    origen: { tipo: "recalculado", detalle: "价款的万分之五：3000000×0.05%＝1500。" },
    fecha: "2026-10-29",
    entrada: { shuimu: "fangdichan", jine: 3000000 },
    esperado: { shui: 1500, wanfenlv: 5 },
  },
  {
    nombre: "银行借款合同100万元",
    origen: { tipo: "recalculado", detalle: "借款金额的万分之零点五：1000000×0.005%＝50。" },
    fecha: "2026-10-29",
    entrada: { shuimu: "jiekuan", jine: 1000000 },
    esperado: { shui: 50, wanfenlv: 0.5 },
  },
  {
    nombre: "买卖合同10万元",
    origen: { tipo: "recalculado", detalle: "价款的万分之三：100000×0.03%＝30。" },
    fecha: "2026-10-29",
    entrada: { shuimu: "maimai", jine: 100000 },
    esperado: { shui: 30 },
  },
  {
    nombre: "租赁合同年租金6万元",
    origen: { tipo: "recalculado", detalle: "租金的千分之一：60000×0.1%＝60。" },
    fecha: "2026-10-29",
    entrada: { shuimu: "zulin", jine: 60000 },
    esperado: { shui: 60, qianfenlv: 1 },
  },
  {
    nombre: "营业账簿实收资本100万元",
    origen: { tipo: "recalculado", detalle: "万分之二点五：1000000×0.025%＝250。" },
    fecha: "2026-10-29",
    entrada: { shuimu: "zhangbu", jine: 1000000 },
    esperado: { shui: 250 },
  },
]);
