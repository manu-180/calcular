import type { TextosUi } from "../../tipos";
import type { UiVariacion } from "../definicion";

export const textosJa: TextosUi<UiVariacion> = {
  slug: "percentage-change",
  ui: () => ({
    inicial: "変化前の値",
    final: "変化後の値",
    variacion: "増減率",
    diferencia: "差",
    vuelta: "元に戻るのに必要な変化",
    vueltaAyuda: "変化後の値が元の値に戻るには、何%変わる必要があるかを示します。",
    errorInicialCero: "変化前の値に0は入れられません。0からの増減率は計算できないためです。",
    subio: (p) => `${p}%増えました。`,
    bajo: (p) => `${p}%減りました。`,
    igual: "変化はありません。2つの値は同じです。",
  }),
};
