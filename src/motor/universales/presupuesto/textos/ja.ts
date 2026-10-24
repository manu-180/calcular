import type { TextosUi } from "../../tipos";
import type { UiPresupuesto } from "../definicion";

export const textosJa: TextosUi<UiPresupuesto> = {
  slug: "budget",
  ui: () => ({
    ingreso: "毎月の手取り",
    ingresoAyuda: "税金や社会保険料が引かれたあと、毎月口座に入る金額です。",
    pctNecesidades: "生活に必要な支出（%）",
    pctNecesidadesAyuda: "住居費、食費、光熱費、交通費、医療費、ローンの最低返済などです。",
    pctGustos: "楽しみのための支出（%）",
    pctGustosAyuda: "外食、必需品以外の買い物、サブスクリプション、旅行などです。",
    pctAhorro: "貯蓄（%）",
    pctAhorroAyuda: "生活防衛資金、目標のための貯金、老後資金、ローンの繰り上げ返済などです。",
    necesidades: "生活に必要な支出",
    gustos: "楽しみのための支出",
    ahorro: "貯蓄",
    ahorroAnual: "1年間の貯蓄",
    errorIngreso: "毎月の手取りを入れてください。",
    errorSuma: (suma) => `3つの割合の合計が${suma}%です。合計が100%になるようにしてください。`,
    observacionAhorroBajo: "貯蓄が10%未満だと、急な出費に備える余裕がほとんどありません。できれば楽しみのための支出を少し減らしましょう。",
  }),
};
