import type { TextosUi } from "../../tipos";
import type { UiDiasEntreFechas } from "../definicion";

export function duracionKo(anios: number, meses: number, dias: number): string {
  const partes: string[] = [];
  if (anios) partes.push(`${anios}년`);
  if (meses) partes.push(`${meses}개월`);
  if (dias || !partes.length) partes.push(`${dias}일`);
  return partes.join(" ");
}

export const textosKo: TextosUi<UiDiasEntreFechas> = {
  slug: "days-between-dates",
  ui: () => ({
    desde: "시작일",
    hasta: "종료일",
    incluir: "종료일 포함",
    incluirAyuda: "여행이나 휴가처럼 마지막 날도 세야 한다면 체크하세요.",
    dias: "날짜 수(달력 기준)",
    semanas: "주 단위로",
    duracionFila: "년, 개월, 일로",
    habiles: "평일 수",
    habilesAyuda: "월요일부터 금요일까지예요. 공휴일은 빼지 않아요.",
    duracion: duracionKo,
    semanasYDias: (semanas, _n, dias) => (dias ? `${semanas}주 ${dias}일` : `${semanas}주`),
    notaHabiles: "평일은 월요일부터 금요일까지 세요. 공휴일은 나라와 지역마다 달라서 빼지 않았어요.",
    notaInvertidas: "종료일이 시작일보다 앞이라서 두 날짜를 바꿔서 계산했어요.",
  }),
};
