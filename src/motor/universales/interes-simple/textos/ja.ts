import type { TextosUi } from "../../tipos";
import type { UiInteresSimple } from "../definicion";

export const textosJa: TextosUi<UiInteresSimple> = {
  slug: "simple-interest",
  ui: () => ({
    capital: "元本",
    tasa: "年利（%）",
    tiempo: "期間",
    unidad: "期間の単位",
    dias: "日",
    meses: "か月",
    anios: "年",
    base: "1年の日数（日数で計算する場合）",
    baseAyuda: "1年を360日で数える金融機関もあります。わからなければ365のままにしてください。",
    base365: "365日",
    base360: "360日",
    interes: "利息",
    montoFinal: "元本と利息の合計",
    tasaPeriodo: "期間あたりの利率",
    errorCapital: "0より大きい元本を入れてください。",
  }),
};
