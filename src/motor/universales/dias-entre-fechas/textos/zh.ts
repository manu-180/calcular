import { esSimplificado, textosPorEscritura } from "../../comun/chino";
import type { TextosUi } from "../../tipos";
import type { UiDiasEntreFechas } from "../definicion";

export function duracionZh(locale: string): (anios: number, meses: number, dias: number) => string {
  const mes = esSimplificado(locale) ? "个月" : "個月";
  return (anios, meses, dias) => {
    const partes: string[] = [];
    if (anios) partes.push(`${anios} 年`);
    if (meses) partes.push(`${meses} ${mes}`);
    if (dias || !partes.length) partes.push(`${dias} 天`);
    return partes.join(" ");
  };
}

export const textosZh: TextosUi<UiDiasEntreFechas> = textosPorEscritura<UiDiasEntreFechas>(
  "days-between-dates",
  (locale) => ({
    desde: "開始日期",
    hasta: "結束日期",
    incluir: "包含結束日期",
    incluirAyuda: "像旅行或休假那樣最後一天也要算的話，請勾選。",
    dias: "日曆天數",
    semanas: "換算成週",
    duracionFila: "換算成年、月、日",
    habiles: "工作日",
    habilesAyuda: "週一到週五，未扣除國定假日。",
    duracion: duracionZh(locale),
    semanasYDias: (semanas, _n, dias) => (dias ? `${semanas} 週又 ${dias} 天` : `${semanas} 週`),
    notaHabiles: "工作日以週一到週五計算，未扣除國定假日，因為假日依國家和地區而不同。",
    notaInvertidas: "結束日期早於開始日期，已經對調後計算。",
  }),
  (locale) => ({
    desde: "开始日期",
    hasta: "结束日期",
    incluir: "包含结束日期",
    incluirAyuda: "像旅行或休假那样最后一天也要算的话，请勾选。",
    dias: "日历天数",
    semanas: "换算成周",
    duracionFila: "换算成年、月、日",
    habiles: "工作日",
    habilesAyuda: "周一到周五，未扣除法定节假日。",
    duracion: duracionZh(locale),
    semanasYDias: (semanas, _n, dias) => (dias ? `${semanas} 周零 ${dias} 天` : `${semanas} 周`),
    notaHabiles: "工作日按周一到周五计算，未扣除法定节假日，因为节假日因国家和地区而异。",
    notaInvertidas: "结束日期早于开始日期，已经对调后计算。",
  }),
);
