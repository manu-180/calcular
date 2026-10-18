import { textosPorEscritura } from "../../comun/chino";
import { duracionZh } from "../../dias-entre-fechas/textos/zh";
import type { TextosUi } from "../../tipos";
import type { UiEdad } from "../definicion";

export const textosZh: TextosUi<UiEdad> = textosPorEscritura<UiEdad>(
  "age",
  (locale) => ({
    nacimiento: "出生日期",
    referencia: "計算到哪一天",
    referenciaAyuda: "預設是今天。改成其他日期，就能看到那一天的年齡。",
    edad: "年齡",
    anios: "足歲",
    totalMeses: "換算成月",
    totalSemanas: "換算成週",
    totalDias: "換算成天",
    proximo: "下次生日",
    faltan: "距離生日還有",
    cumplira: "下次生日滿",
    duracion: duracionZh(locale),
    errorFutura: "出生日期不能晚於要計算的日期。",
    cumpleHoy: (anios) => `今天生日：滿 ${anios} 歲。`,
    nota29: "2 月 29 日出生的人，在非閏年以 2 月 28 日作為生日計算。",
  }),
  (locale) => ({
    nacimiento: "出生日期",
    referencia: "计算到哪一天",
    referenciaAyuda: "默认是今天。改成其他日期，就能看到那一天的年龄。",
    edad: "年龄",
    anios: "周岁",
    totalMeses: "换算成月",
    totalSemanas: "换算成周",
    totalDias: "换算成天",
    proximo: "下次生日",
    faltan: "距离生日还有",
    cumplira: "下次生日满",
    duracion: duracionZh(locale),
    errorFutura: "出生日期不能晚于要计算的日期。",
    cumpleHoy: (anios) => `今天生日：满 ${anios} 周岁。`,
    nota29: "2 月 29 日出生的人，在非闰年以 2 月 28 日作为生日计算。",
  }),
);
