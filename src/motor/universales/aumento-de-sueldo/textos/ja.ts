import type { TextosUi } from "../../tipos";
import type { UiAumentoDeSueldo } from "../definicion";

export const textosJa: TextosUi<UiAumentoDeSueldo> = {
  slug: "pay-raise",
  ui: () => ({
    sueldo: "今の月給",
    sueldoAyuda: "額面でも手取りでもかまいません。結果も同じ基準で表示します。",
    aumentoPorcentaje: "昇給率（%）",
    aumentoMonto: "昇給額（任意）",
    aumentoMontoAyuda: "昇給が決まった金額なら、ここに入れてください。割合のかわりにこの金額を使います。",
    inflacion: "期間中の物価上昇率（%、任意）",
    inflacionAyuda: "前回の昇給からの物価上昇率です。給料で買えるものが増えたか減ったかがわかります。",
    sueldosAnio: "1年の給与支給回数",
    sueldosAnioAyuda: "月給なら12です。賞与を月数で数える場合は、その分を足してください。",
    nuevo: "昇給後の月給",
    diferenciaMensual: "1か月の差",
    diferenciaAnual: "1年の差",
    porcentaje: "昇給率",
    real: "実質の昇給率（物価上昇を差し引いた値）",
    realAyuda: "新しい給料で、前の給料よりどれだけ多く買えるかを表します。",
    errorSueldo: "今の月給を入れてください。",
    errorSinAumento: "昇給を割合か金額で入れてください。",
    observacionGana: (puntos) => `物価上昇を上回りました。給料で買えるものが${puntos}%増えています。`,
    observacionPierde: (puntos) => `昇給が物価上昇に追いついていません。給料で買えるものが${puntos}%減っています。`,
    observacionIgual: "昇給は物価上昇と同じです。給料で買えるものは前と変わりません。",
  }),
};
