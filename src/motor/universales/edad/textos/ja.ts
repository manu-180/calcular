import { duracionJa } from "../../dias-entre-fechas/textos/ja";
import type { TextosUi } from "../../tipos";
import type { UiEdad } from "../definicion";

export const textosJa: TextosUi<UiEdad> = {
  slug: "age",
  ui: () => ({
    nacimiento: "生年月日",
    referencia: "基準日",
    referenciaAyuda: "初期設定は今日です。別の日付に変えると、その日の年齢がわかります。",
    edad: "年齢",
    anios: "満年齢",
    totalMeses: "月数で表すと",
    totalSemanas: "週数で表すと",
    totalDias: "日数で表すと",
    proximo: "次の誕生日",
    faltan: "誕生日まであと",
    cumplira: "次の誕生日で",
    duracion: duracionJa,
    errorFutura: "生年月日は基準日より後にできません。",
    cumpleHoy: (anios) => `今日が誕生日です。${anios}歳になりました。`,
    nota29: "2月29日生まれの場合、うるう年以外の年は2月28日を誕生日として計算します。",
  }),
};
