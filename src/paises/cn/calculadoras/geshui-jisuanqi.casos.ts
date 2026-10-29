import { definirCasos } from "@/motor/calculo";
import calculadora from "./geshui-jisuanqi";

export default definirCasos(calculadora, [
  {
    nombre: "年薪18万元，专项扣除21600元，子女教育24000元",
    origen: {
      tipo: "recalculado",
      detalle: "应纳税所得额 180000−60000−21600−24000＝74400。36000×3%＋38400×10%＝1080＋3840＝4920（即74400×10%−2520）。",
    },
    fecha: "2026-10-29",
    entrada: { gongzi: 180000, laowu: 0, gaochou: 0, texu: 0, zhuanxiang: 21600, fujia: 24000, qita: 0, yijiao: 4920 },
    esperado: { suode: 74400, yingna: 4920, tasa: 10, kouchu: 2520, yingbu: 0, yingtui: 0 },
  },
  {
    nombre: "工资18万元加劳务报酬5万元和稿酬1万元",
    origen: {
      tipo: "recalculado",
      detalle:
        "收入额 180000＋50000×80%＋10000×80%×70%＝225600。应纳税所得额 225600−60000＝165600，165600×20%−16920＝16200。已预缴15000，应补1200。",
    },
    fecha: "2026-10-29",
    entrada: { gongzi: 180000, laowu: 50000, gaochou: 10000, texu: 0, zhuanxiang: 0, fujia: 0, qita: 0, yijiao: 15000 },
    esperado: { shouru: 225600, suode: 165600, yingna: 16200, tasa: 20, kouchu: 16920, yingbu: 1200 },
  },
  {
    nombre: "年收入5万元不超过减除费用，已预缴300元全退",
    origen: { tipo: "recalculado", detalle: "50000低于60000元减除费用，应纳税所得额为0，应纳税额0，应退300。" },
    fecha: "2026-10-29",
    entrada: { gongzi: 50000, laowu: 0, gaochou: 0, texu: 0, zhuanxiang: 0, fujia: 0, qita: 0, yijiao: 300 },
    esperado: { suode: 0, yingna: 0, yingtui: 300 },
  },
  {
    nombre: "最高一档：应纳税所得额100万元",
    origen: { tipo: "recalculado", detalle: "收入1060000−60000＝1000000，1000000×45%−181920＝268080。" },
    fecha: "2026-10-29",
    entrada: { gongzi: 1060000, laowu: 0, gaochou: 0, texu: 0, zhuanxiang: 0, fujia: 0, qita: 0, yijiao: 0 },
    esperado: { suode: 1000000, yingna: 268080, tasa: 45, kouchu: 181920 },
  },
  {
    nombre: "没有任何收入",
    origen: { tipo: "recalculado", detalle: "收入全部为0时无法计算。" },
    fecha: "2026-10-29",
    entrada: { gongzi: 0, laowu: 0, gaochou: 0, texu: 0, zhuanxiang: 0, fujia: 0, qita: 0, yijiao: 0 },
    esperaError: true,
  },
]);
