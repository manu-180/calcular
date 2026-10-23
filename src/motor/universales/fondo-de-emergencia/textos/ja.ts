import type { TextosUi } from "../../tipos";
import type { UiFondoDeEmergencia } from "../definicion";

export const textosJa: TextosUi<UiFondoDeEmergencia> = {
  slug: "emergency-fund",
  ui: () => ({
    gastos: "毎月の必要生活費",
    gastosAyuda: "止められない支払いです。住居費、食費、光熱費、交通費、医療費、ローンの返済など。",
    meses: "備える月数",
    mesesAyuda: "収入が安定していれば3〜6か月。収入に波がある、または世帯の稼ぎ手が1人ならそれ以上が目安です。",
    actual: "すでに用意している金額（任意）",
    aporte: "毎月貯められる金額（任意）",
    meta: "目安の生活防衛資金",
    falta: "あと必要な金額",
    mesesParaLlegar: "貯め終わるまでの月数",
    cobertura: "今の貯金で何か月分まかなえるか",
    errorGastos: "1か月の必要生活費を入れてください。",
    yaCubierto: "生活防衛資金はそろっています。これから貯める分は、ほかの目標に回せます。",
    sinAporte: "毎月貯められる金額を入れると、何か月かかるかがわかります。",
    observacionDonde: "その日のうちに引き出せて元本が減らない、普通預金などの別口座に置いておきましょう。",
  }),
};
