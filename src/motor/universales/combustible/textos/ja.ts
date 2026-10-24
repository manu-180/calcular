import type { TextosUi } from "../../tipos";
import type { UiCombustible } from "../definicion";

export const textosJa: TextosUi<UiCombustible> = {
  slug: "fuel-cost",
  ui: () => ({
    distancia: (u) => `走行距離（${u}）`,
    idaYVuelta: "往復",
    tipoConsumo: "燃費の表し方",
    l100: "100kmあたりのリットル数",
    kml: "1リットルあたりのkm数（km/L）",
    consumo: "燃費",
    consumoMpg: "燃費（マイル／ガロン）",
    consumoAyuda: "取扱説明書や車の燃費計で確認できます。一般的に、高速道路のほうが市街地より燃費がよくなります。",
    precio: (u) => (u === "L" ? "1リットルあたりの価格" : "1ガロンあたりの価格"),
    personas: "費用を分ける人数",
    costo: "燃料代",
    porPersona: "1人あたり",
    combustible: (u) => (u === "L" ? "必要な燃料（リットル）" : "必要な燃料（ガロン）"),
    distanciaTotal: (u) => `合計距離（${u}）`,
    costoPorDistancia: (u) => `1${u}あたりの費用`,
    errorConsumo: "燃費は0より大きい値を入れてください。",
    errorPersonas: "人数は1人以上にしてください。",
  }),
};
