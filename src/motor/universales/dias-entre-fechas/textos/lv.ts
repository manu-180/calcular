import { formaLv, pluralLv } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiDiasEntreFechas } from "../definicion";

const gadi = (n: number) => pluralLv(n, "gads", "gadi", "gadu");
const menesi = (n: number) => pluralLv(n, "mēnesis", "mēneši", "mēnešu");
const dienas = (n: number) => pluralLv(n, "diena", "dienas", "dienu");

// Coma entre las partes y «un» antes de la última: „36 gadi, 4 mēneši un 28 dienas“.
export function duracionLv(a: number, m: number, d: number): string {
  const partes: string[] = [];
  if (a) partes.push(gadi(a));
  if (m) partes.push(menesi(m));
  if (d || !partes.length) partes.push(dienas(d));
  return partes.length > 1 ? `${partes.slice(0, -1).join(", ")} un ${partes[partes.length - 1]}` : partes[0];
}

export const textosLv: TextosUi<UiDiasEntreFechas> = {
  slug: "dienu-skaits-starp-datumiem",
  ui: () => ({
    desde: "Sākuma datums",
    hasta: "Beigu datums",
    incluir: "Ieskaitīt arī pēdējo dienu",
    incluirAyuda: "Atzīmējiet, ja jāskaita arī pēdējā diena, piemēram, ceļojumam vai atvaļinājumam.",
    dias: "Kalendārās dienas",
    semanas: "Nedēļās",
    duracionFila: "Gados, mēnešos un dienās",
    habiles: "Darba dienas",
    habilesAyuda: "No pirmdienas līdz piektdienai. Svētku dienas netiek atskaitītas.",
    duracion: duracionLv,
    semanasYDias: (semanas, n, d) => {
      const dalaNedelas = `${semanas} ${formaLv(n, "nedēļa", "nedēļas", "nedēļu")}`;
      return d ? `${dalaNedelas} un ${dienas(d)}` : dalaNedelas;
    },
    notaHabiles: "Darba dienas skaita no pirmdienas līdz piektdienai, neatskaitot svētku dienas, jo tās atšķiras pēc valsts un reģiona.",
    notaInvertidas: "Beigu datums bija agrāks par sākuma datumu, tāpēc datumus samainījām vietām.",
  }),
};
