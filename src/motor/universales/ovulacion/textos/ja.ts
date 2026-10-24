import type { TextosUi } from "../../tipos";
import type { UiOvulacion } from "../definicion";

export const textosJa: TextosUi<UiOvulacion> = {
  slug: "ovulation",
  ui: () => ({
    fum: "最終月経の開始日",
    fumAyuda: "出血が始まった日です。終わった日ではありません。",
    ciclo: "月経周期（日）",
    cicloAyuda: "月経の初日から次の月経の前日までです。毎回違う場合は平均を入れてください。",
    ovulacion: "排卵予定日",
    fertilDesde: "妊娠しやすい期間（開始）",
    fertilHasta: "妊娠しやすい期間（終了）",
    proxima: "次の月経予定日",
    tabla: "この先の周期",
    colRegla: "月経",
    colDesde: "妊娠しやすい期間の開始",
    colHasta: "妊娠しやすい期間の終了",
    colOvulacion: "排卵日",
    errorCiclo: "月経周期は21日から45日のあいだで入れてください。",
    aviso: "周期が規則的な方向けの目安です。避妊の方法ではなく、医師などの専門家への相談に代わるものでもありません。",
  }),
};
