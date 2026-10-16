import type { TextosUi } from "../../tipos";
import type { UiRitmo } from "../definicion";

export const textosJa: TextosUi<UiRitmo> = {
  slug: "running-pace",
  ui: () => ({
    calcular: "計算したい項目",
    calcRitmo: "ペース（距離とタイムから）",
    calcTiempo: "タイム（距離とペースから）",
    calcDistancia: "距離（タイムとペースから）",
    distancia: "距離",
    distanciaAyuda: "大会の種目を選ぶか、「その他」を選んで距離を入れてください。",
    otra: "その他の距離",
    cincoK: "5km",
    diezK: "10km",
    media: "ハーフマラソン",
    maraton: "フルマラソン",
    distanciaOtra: (u) => `その他の距離（${u}）`,
    horas: "タイム：時間",
    minutos: "タイム：分",
    segundos: "タイム：秒",
    ritmoMin: (u) => `ペース：1${u}あたりの分`,
    ritmoSeg: "ペース：秒",
    ritmo: (u) => `ペース（分／${u}）`,
    tiempo: "ゴールタイム",
    distanciaRes: (u) => `距離（${u}）`,
    velocidad: (u) => `平均速度（${u}）`,
    errorDistancia: "0より大きい距離を入れてください。",
    errorTiempo: "タイムを時間、分、秒のいずれかで入れてください。",
    errorRitmo: "ペースを、距離1単位あたりの分と秒で入れてください。",
  }),
};
