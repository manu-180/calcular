import { definirCasos } from "@/motor/calculo";
import calculadora from "./jingji-buchangjin";

export default definirCasos(calculadora, [
  {
    nombre: "工作5年3个月，月工资1万元",
    origen: { tipo: "recalculado", detalle: "不满六个月按半个月：N＝5.5，10000×5.5＝55000。" },
    fecha: "2026-10-29",
    entrada: { nian: 5, yue: 3, yuegongzi: 10000, pingjun: null, weifa: false, daitongzhi: false, shangyue: null },
    esperado: { n: 5.5, buchang: 55000, zonge: 55000, ewai: 0 },
  },
  {
    nombre: "同上，违法解除按2N赔偿金",
    origen: { tipo: "recalculado", detalle: "劳动合同法第八十七条：55000×2＝110000。" },
    fecha: "2026-10-29",
    entrada: { nian: 5, yue: 3, yuegongzi: 10000, pingjun: null, weifa: true, daitongzhi: false, shangyue: null },
    esperado: { buchang: 55000, zonge: 110000 },
  },
  {
    nombre: "工作3年8个月，未提前通知N＋1",
    origen: { tipo: "recalculado", detalle: "六个月以上按一年：N＝4，8000×4＝32000，加上一个月工资8500，共40500。" },
    fecha: "2026-10-29",
    entrada: { nian: 3, yue: 8, yuegongzi: 8000, pingjun: null, weifa: false, daitongzhi: true, shangyue: 8500 },
    esperado: { n: 4, buchang: 32000, ewai: 8500, zonge: 40500 },
  },
  {
    nombre: "高收入封顶：月工资4万元，当地月平均工资1万元，工作15年8个月",
    origen: { tipo: "recalculado", detalle: "40000超过10000×3，基数按30000；N＝16，封顶12年；30000×12＝360000。" },
    fecha: "2026-10-29",
    entrada: { nian: 15, yue: 8, yuegongzi: 40000, pingjun: 10000, weifa: false, daitongzhi: false, shangyue: null },
    esperado: { jishu: 30000, n: 12, zonge: 360000 },
  },
  {
    nombre: "没有工作年限",
    origen: { tipo: "recalculado", detalle: "年限为0无法计算。" },
    fecha: "2026-10-29",
    entrada: { nian: 0, yue: 0, yuegongzi: 8000, pingjun: null, weifa: false, daitongzhi: false, shangyue: null },
    esperaError: true,
  },
]);
