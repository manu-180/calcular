import { formaIs, pluralIs } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiDiasEntreFechas } from "../definicion";

function iLista(hlutar: readonly string[]): string {
  return hlutar.length > 1 ? `${hlutar.slice(0, -1).join(", ")} og ${hlutar[hlutar.length - 1]}` : hlutar[0];
}

export function duracionIs(anios: number, meses: number, dias: number): string {
  const hlutar: string[] = [];
  if (anios) hlutar.push(pluralIs(anios, "ár", "ár"));
  if (meses) hlutar.push(pluralIs(meses, "mánuður", "mánuðir"));
  if (dias || !hlutar.length) hlutar.push(pluralIs(dias, "dagur", "dagar"));
  return iLista(hlutar);
}

export const textosIs: TextosUi<UiDiasEntreFechas> = {
  slug: "dagar-milli-dagsetninga",
  ui: () => ({
    desde: "Upphafsdagur",
    hasta: "Lokadagur",
    incluir: "Telja lokadaginn með",
    incluirAyuda: "Hakaðu við ef síðasti dagurinn á líka að teljast með, til dæmis í ferðalagi eða fríi.",
    dias: "Almanaksdagar",
    semanas: "Í vikum",
    duracionFila: "Í árum, mánuðum og dögum",
    habiles: "Virkir dagar",
    habilesAyuda: "Mánudagur til föstudagur. Frídagar eru ekki dregnir frá.",
    duracion: duracionIs,
    semanasYDias: (semanas, n, dias) => {
      const vikur = `${semanas} ${formaIs(n, "vika", "vikur")}`;
      return dias ? `${vikur} og ${pluralIs(dias, "dagur", "dagar")}` : vikur;
    },
    notaHabiles: "Virkir dagar eru taldir frá mánudegi til föstudags. Frídagar eru ekki dregnir frá, því þeir eru mismunandi eftir löndum og svæðum.",
    notaInvertidas: "Lokadagurinn var á undan upphafsdeginum, svo þeim var víxlað.",
  }),
};
