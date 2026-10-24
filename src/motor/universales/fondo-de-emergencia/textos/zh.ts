import { textosPorEscritura } from "../../comun/chino";
import type { TextosUi } from "../../tipos";
import type { UiFondoDeEmergencia } from "../definicion";

export const textosZh: TextosUi<UiFondoDeEmergencia> = textosPorEscritura<UiFondoDeEmergencia>(
  "emergency-fund",
  () => ({
    gastos: "每月必要開銷",
    gastosAyuda: "不能停付的支出：住、吃、水電瓦斯、交通、醫療和還款。",
    meses: "要準備幾個月",
    mesesAyuda: "收入穩定的話 3 到 6 個月；收入不固定或家裡只有一份收入，就要更多。",
    actual: "已經準備的金額（選填）",
    aporte: "每月能存多少（選填）",
    meta: "建議的緊急預備金",
    falta: "還要存",
    mesesParaLlegar: "存滿所需月數",
    cobertura: "現有存款能撐幾個月",
    errorGastos: "請輸入每月的必要開銷。",
    yaCubierto: "您的緊急預備金已經存滿，之後存的錢可以用在其他目標。",
    sinAporte: "輸入每月能存多少，就能知道要花多久。",
    observacionDonde: "放在當天就能提領、不會虧損的獨立帳戶，例如活期儲蓄帳戶。",
  }),
  () => ({
    gastos: "每月必要开销",
    gastosAyuda: "不能停付的支出：住、吃、水电燃气、交通、医疗和还款。",
    meses: "要准备几个月",
    mesesAyuda: "收入稳定的话 3 到 6 个月；收入不固定或家里只有一份收入，就要更多。",
    actual: "已经准备的金额（选填）",
    aporte: "每月能存多少（选填）",
    meta: "建议的应急资金",
    falta: "还要存",
    mesesParaLlegar: "存满所需月数",
    cobertura: "现有存款能撑几个月",
    errorGastos: "请输入每月的必要开销。",
    yaCubierto: "您的应急资金已经存满，之后存的钱可以用在其他目标上。",
    sinAporte: "输入每月能存多少，就能知道要花多久。",
    observacionDonde: "放在当天就能取出、不会亏损的独立账户，比如活期存款或货币基金。",
  }),
);
