import type { TextosUi } from "../../tipos";
import type { UiAhorroRetiro } from "../definicion";

export const textosJa: TextosUi<UiAhorroRetiro> = {
  slug: "retirement-savings",
  ui: () => ({
    edadActual: "現在の年齢",
    edadRetiro: "引退したい年齢",
    actual: "すでに貯めている金額",
    aporte: "毎月の積立額",
    rendimiento: "実質年利回り（%）",
    rendimientoAyuda: "インフレ率を差し引いた運用の利回りです。長期では2〜5%が控えめな想定です。",
    aniosRenta: "取り崩す年数",
    aniosRentaAyuda: "この老後資金を何年かけて使うかです。",
    capital: "引退時の資金",
    renta: "その資金から毎月使える金額",
    aportado: "積み立てた元本の合計",
    intereses: "運用で増えた額",
    tabla: "年齢ごとの資金",
    colEdad: "年齢",
    colAportado: "それまでの積立額",
    colSaldo: "資金",
    errorEdades: "引退したい年齢は、現在の年齢より上にしてください。",
    errorSinAhorro: "今ある貯金か毎月の積立額を入れてください。",
    observacionDineroDeHoy: "利回りからインフレ分を差し引いているので、金額は今のお金の価値で表しています。",
    observacionPublica: "自分で貯める資金だけを計算しています。公的年金などの給付は含まれていません。",
  }),
};
