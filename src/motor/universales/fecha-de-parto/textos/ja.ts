import type { TextosUi } from "../../tipos";
import type { UiFechaDeParto } from "../definicion";

export const textosJa: TextosUi<UiFechaDeParto> = {
  slug: "due-date",
  ui: () => ({
    metodo: "わかっている日付",
    fum: "最終月経の開始日",
    concepcion: "受精日",
    fecha: "日付",
    fechaAyuda: "最終月経を選んだ場合は、出血が始まった日を入れてください。",
    ciclo: "月経周期（日）",
    cicloAyuda: "最終月経から計算するときだけ使います。わからなければ28のままにしてください。",
    fpp: "出産予定日",
    edadGestacional: "今日の妊娠週数",
    trimestre: "妊娠時期",
    faltan: "予定日まであと",
    fechaConcepcion: "推定受精日",
    semanasYDias: (s, d) => (d ? `${s}週${d}日` : `${s}週0日`),
    trimestres: ["妊娠初期", "妊娠中期", "妊娠後期"],
    errorFutura: "日付は今日より後にできません。",
    errorCiclo: "月経周期は20日から45日のあいだで入れてください。",
    notaPasada: "その日付から42週以上たっているため、妊娠週数は表示していません。",
    aviso: "これは目安です。予定日ちょうどに生まれる赤ちゃんは多くありません。もっとも正確な日付は、超音波検査と妊婦健診で確認できます。",
  }),
};
