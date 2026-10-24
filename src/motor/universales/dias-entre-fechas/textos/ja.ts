import type { TextosUi } from "../../tipos";
import type { UiDiasEntreFechas } from "../definicion";

export function duracionJa(anios: number, meses: number, dias: number): string {
  const partes: string[] = [];
  if (anios) partes.push(`${anios}年`);
  if (meses) partes.push(`${meses}か月`);
  if (dias || !partes.length) partes.push(`${dias}日`);
  return partes.join("");
}

export const textosJa: TextosUi<UiDiasEntreFechas> = {
  slug: "days-between-dates",
  ui: () => ({
    desde: "開始日",
    hasta: "終了日",
    incluir: "終了日も数える",
    incluirAyuda: "旅行や休暇のように、最終日も日数に入る場合はチェックしてください。",
    dias: "日数（暦日）",
    semanas: "週で表すと",
    duracionFila: "年・月・日で表すと",
    habiles: "営業日",
    habilesAyuda: "月曜から金曜までです。祝日は除いていません。",
    duracion: duracionJa,
    semanasYDias: (semanas, _n, dias) => (dias ? `${semanas}週間と${dias}日` : `${semanas}週間`),
    notaHabiles: "営業日は月曜から金曜で数えています。祝日は国や地域で違うため、差し引いていません。",
    notaInvertidas: "終了日が開始日より前だったので、入れ替えて計算しました。",
  }),
};
