import { textosPorEscritura } from "../../comun/chino";
import type { TextosUi } from "../../tipos";
import type { UiPromedio } from "../definicion";

export const textosZh: TextosUi<UiPromedio> = textosPorEscritura<UiPromedio>(
  "weighted-average",
  () => ({
    nota: (n) => `成績 ${n}`,
    notaAyuda: "填入每個成績或數值及其權重，沒用到的欄位留空即可。",
    peso: (n) => `權重 ${n}`,
    pesoAyuda: "可以是百分比、學分或計入次數。不填權重時，每個數值的份量都一樣。",
    ponderado: "加權平均",
    simple: "簡單平均",
    cantidad: "數值個數",
    sumaPesos: "權重總和",
    errorSinNotas: "請至少填入一個數值。",
    errorFaltaPeso: "這個數值沒有權重。如果要用權重，每個數值都要填。",
    errorFaltaNota: "這個權重沒有對應的數值。請填入數值，或清除權重。",
    errorPesosCero: "權重總和為 0：至少要有一個大於 0。",
    sinPesos: "沒有權重時，加權平均和簡單平均相同。",
  }),
  () => ({
    nota: (n) => `成绩 ${n}`,
    notaAyuda: "填入每个成绩或数值及其权重，没用到的栏目留空即可。",
    peso: (n) => `权重 ${n}`,
    pesoAyuda: "可以是百分比、学分或计入次数。不填权重时，每个数值的分量都一样。",
    ponderado: "加权平均",
    simple: "简单平均",
    cantidad: "数值个数",
    sumaPesos: "权重总和",
    errorSinNotas: "请至少填入一个数值。",
    errorFaltaPeso: "这个数值没有权重。如果要用权重，每个数值都要填。",
    errorFaltaNota: "这个权重没有对应的数值。请填入数值，或清除权重。",
    errorPesosCero: "权重总和为 0：至少要有一个大于 0。",
    sinPesos: "没有权重时，加权平均和简单平均相同。",
  }),
);
