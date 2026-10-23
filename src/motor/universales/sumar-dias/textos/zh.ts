import { textosPorEscritura } from "../../comun/chino";
import type { TextosUi } from "../../tipos";
import type { UiSumarDias } from "../definicion";

export const textosZh: TextosUi<UiSumarDias> = textosPorEscritura<UiSumarDias>(
  "add-days-to-date",
  () => ({
    fecha: "起始日期",
    operacion: "計算方式",
    sumar: "往後加天數",
    restar: "往前減天數",
    dias: "天數",
    tipo: "天數類型",
    corridos: "日曆天",
    habiles: "工作日（週一到週五）",
    resultado: "計算後的日期",
    diaSemana: "星期",
    diasCorridos: "合計日曆天數",
    nombresDias: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
    errorDias: "天數必須是整數，最多 100 年。",
    notaHabiles: "工作日會跳過週六和週日，但不會跳過國定假日。中間如果有假日，請另外加上。",
  }),
  () => ({
    fecha: "起始日期",
    operacion: "计算方式",
    sumar: "往后加天数",
    restar: "往前减天数",
    dias: "天数",
    tipo: "天数类型",
    corridos: "日历天",
    habiles: "工作日（周一到周五）",
    resultado: "计算后的日期",
    diaSemana: "星期",
    diasCorridos: "合计日历天数",
    nombresDias: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
    errorDias: "天数必须是整数，最多 100 年。",
    notaHabiles: "工作日会跳过周六和周日，但不会跳过法定节假日。中间如果有节假日，请另外加上。",
  }),
);
