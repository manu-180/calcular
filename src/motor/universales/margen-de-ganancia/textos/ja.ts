import type { TextosUi } from "../../tipos";
import type { UiMargenDeGanancia } from "../definicion";

export const textosJa: TextosUi<UiMargenDeGanancia> = {
  slug: "profit-margin",
  ui: () => ({
    modo: "計算したい内容",
    modoPrecio: "原価と売価から利益率を出す",
    modoMargen: "目標の利益率から売価を出す",
    modoMarkup: "目標の値入率から売価を出す",
    costo: "1個あたりの原価",
    costoAyuda: "1個を仕入れる、または作るのにかかる金額です。お客さんに転嫁する消費税は含めません。",
    precio: "売価",
    precioAyuda: "利益率を計算する場合だけ入れます。税抜きの金額です。",
    objetivo: "目標の利益率または値入率（%）",
    objetivoAyuda: "売価を計算する場合だけ入れます。",
    precioResultado: "売価",
    margen: "利益率",
    margenAyuda: "売価に対する利益の割合です。",
    markup: "値入率（原価に対する上乗せ率）",
    markupAyuda: "原価に対する利益の割合です。",
    ganancia: "1個あたりの利益",
    errorCosto: "1個あたりの原価を入れてください。",
    errorFaltaPrecio: "利益率を計算するには売価を入れてください。",
    errorFaltaObjetivo: "目標の利益率または値入率を入れてください。",
    errorMargen100: "利益率は100%未満にしてください。100%だと原価ゼロで売価のすべてが利益という意味になります。",
    observacionPerdida: "その売価では原価割れです。売るたびに損をします。",
  }),
};
