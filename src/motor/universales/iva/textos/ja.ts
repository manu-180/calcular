import type { TextosUi } from "../../tipos";
import type { UiIva } from "../definicion";

export const textosJa: TextosUi<UiIva> = {
  slug: "vat",
  ui: () => ({
    operacion: "計算の種類",
    agregar: "税抜き価格に消費税を足す",
    quitar: "税込み価格から消費税を抜く",
    monto: "価格",
    montoAyuda: "税を足すなら税抜き価格、抜くなら税込み価格を入れてください。",
    otraTasa: "別の税率（%）",
    otraTasaAyuda: "任意です。軽減税率などが適用される場合はここに入れてください。空欄なら標準税率を使います。",
    neto: "税抜き価格",
    impuesto: "消費税額",
    total: "税込み価格",
    tasaUsada: "適用した税率",
    errorTasa: "税率が正しくありません。",
  }),
};
