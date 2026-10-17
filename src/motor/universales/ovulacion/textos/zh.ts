import { textosPorEscritura } from "../../comun/chino";
import type { TextosUi } from "../../tipos";
import type { UiOvulacion } from "../definicion";

export const textosZh: TextosUi<UiOvulacion> = textosPorEscritura<UiOvulacion>(
  "ovulation",
  () => ({
    fum: "最後一次月經的第一天",
    fumAyuda: "出血的第一天，不是最後一天。",
    ciclo: "月經週期（天）",
    cicloAyuda: "從這次月經第一天到下次月經前一天。如果每次不同，請填平均值。",
    ovulacion: "推估排卵日",
    fertilDesde: "易孕期開始",
    fertilHasta: "易孕期結束",
    proxima: "下次月經",
    tabla: "接下來的週期",
    colRegla: "月經",
    colDesde: "易孕期開始",
    colHasta: "易孕期結束",
    colOvulacion: "排卵日",
    errorCiclo: "月經週期必須在 21 到 45 天之間。",
    aviso: "這是給週期規律者的估計值。它不是避孕方法，也不能取代醫師等專業人員的建議。",
  }),
  () => ({
    fum: "末次月经的第一天",
    fumAyuda: "出血的第一天，不是最后一天。",
    ciclo: "月经周期（天）",
    cicloAyuda: "从这次月经第一天到下次月经前一天。如果每次不同，请填平均值。",
    ovulacion: "推算排卵日",
    fertilDesde: "易孕期开始",
    fertilHasta: "易孕期结束",
    proxima: "下次月经",
    tabla: "接下来的周期",
    colRegla: "月经",
    colDesde: "易孕期开始",
    colHasta: "易孕期结束",
    colOvulacion: "排卵日",
    errorCiclo: "月经周期必须在 21 到 45 天之间。",
    aviso: "这是给周期规律者的估计值。它不是避孕方法，也不能代替医生等专业人员的建议。",
  }),
);
