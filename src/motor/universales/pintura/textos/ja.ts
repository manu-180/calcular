import type { TextosUi } from "../../tipos";
import type { UiPintura } from "../definicion";

const volumen = (u: string) => (u === "L" ? "リットル" : "ガロン");

export const textosJa: TextosUi<UiPintura> = {
  slug: "paint-calculator",
  ui: () => ({
    modo: "わかっている寸法",
    modoMedidas: "壁の長さと高さ",
    modoSuperficie: "塗る面積の合計",
    largo: (u) => `壁の長さの合計（${u}）`,
    largoAyuda: "塗るすべての壁の長さを足した値です。部屋全体なら周囲の長さです。",
    alto: (u) => `壁の高さ（${u}）`,
    superficie: (u) => `塗る面積（${u}）`,
    aberturas: (u) => `差し引くドアと窓の面積（${u}）`,
    aberturasAyuda: "ドア1枚でおよそ2m²、一般的な窓で1〜2m²です。",
    manos: "重ね塗りの回数",
    rendimiento: (u) => `塗料の塗布面積（${u}）`,
    rendimientoAyuda: "缶に書かれている、1回塗りで塗れる面積です。わからなければ表示されている値のままにしてください。",
    recomendado: (u) => `購入する塗料（${volumen(u)}）`,
    recomendadoAyuda: "塗り直しやローラーに残る分として、10%多めにしています。",
    necesario: (u) => `必要な量の目安（${volumen(u)}）`,
    neta: (u) => `塗る面積（${u}）`,
    errorMedidas: "壁の長さと高さを入れてください。",
    errorSuperficie: "塗る面積を入れてください。",
    errorAberturas: "ドアと窓の面積が壁全体を超えることはありません。",
    errorRendimiento: "塗布面積は0より大きい値を入れてください。",
  }),
};
