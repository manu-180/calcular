import type { TextosUi } from "../../tipos";
import type { UiInteresCompuesto } from "../definicion";

export const textosJa: TextosUi<UiInteresCompuesto> = {
  slug: "compound-interest",
  ui: () => ({
    capital: "元本（最初の金額）",
    aporte: "毎月の積立額（任意）",
    aporteAyuda: "毎月追加する金額です。各月の末に加えます。",
    tasa: "年利（%）",
    anios: "運用期間（年）",
    capitalizacion: "複利の計算期間",
    anual: "毎年",
    semestral: "半年ごと",
    trimestral: "四半期ごと",
    mensual: "毎月",
    diaria: "毎日",
    saldo: "最終的な残高",
    aportado: "積み立てた元本の合計",
    intereses: "得られた利息",
    tabla: "年ごとの増え方",
    colAnio: "年",
    colAportado: "元本",
    colIntereses: "利息",
    colSaldo: "年末の残高",
    errorSinDinero: "元本か毎月の積立額を入れてください。",
    observacionIntereses: (porcentaje) => `最終的な残高の${porcentaje}%が利息です。`,
  }),
};
