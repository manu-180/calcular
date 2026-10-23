import type { TextosUi } from "../../tipos";
import type { UiHormigon } from "../definicion";

export const textosJa: TextosUi<UiHormigon> = {
  slug: "concrete-calculator",
  ui: () => ({
    largo: (u) => `長さ（${u}）`,
    ancho: (u) => `幅（${u}）`,
    espesor: (u) => `厚さ（${u}）`,
    espesorAyuda: "テラスや通路の土間なら10cmほど、駐車場なら12〜15cmが一般的です。",
    margen: "余裕分（%）",
    margenAyuda: "地面の凹凸やこぼれる分です。5〜10%が一般的です。",
    bolsa: (u) => `セメント1袋の重さ（${u}）`,
    volumen: (u) => `正味の体積（${u}）`,
    volumenTotal: (u) => `必要なコンクリート（${u}）`,
    volumenPies: "必要なコンクリート（立方フィート）",
    cemento: (u) => `セメント（${u}）`,
    bolsas: "セメントの袋数",
    arena: (u) => `砂（${u}）`,
    piedra: (u) => `砂利（${u}）`,
    agua: (u) => (u === "L" ? "水（リットル）" : "水（ガロン）"),
    errorMedida: "この寸法は0より大きい値を入れてください。",
    aviso: "材料の量は、汎用的な1：2：3の配合（1m³あたりセメント約350kg）を前提にした目安です。配合、工事の内容、地域の材料で変わるので、施工する人に確認してください。",
  }),
};
