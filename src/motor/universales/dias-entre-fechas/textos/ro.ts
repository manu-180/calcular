import { formaRo, pluralRo } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiDiasEntreFechas } from "../definicion";

const anios = (n: number) => pluralRo(n, "an", "ani");
const meses = (n: number) => pluralRo(n, "lună", "luni");
const dias = (n: number) => pluralRo(n, "zi", "zile");

function enLista(partes: readonly string[]): string {
  return partes.length > 1 ? `${partes.slice(0, -1).join(", ")} și ${partes[partes.length - 1]}` : partes[0];
}

export function duracionRo(a: number, m: number, d: number): string {
  const partes: string[] = [];
  if (a) partes.push(anios(a));
  if (m) partes.push(meses(m));
  if (d || !partes.length) partes.push(dias(d));
  return enLista(partes);
}

export const textosRo: TextosUi<UiDiasEntreFechas> = {
  slug: "zile-intre-doua-date",
  ui: () => ({
    desde: "Data de început",
    hasta: "Data de sfârșit",
    incluir: "Includeți și ziua de sfârșit",
    incluirAyuda: "Bifați dacă ultima zi se numără și ea, ca la o călătorie sau un concediu.",
    dias: "Zile calendaristice",
    semanas: "În săptămâni",
    duracionFila: "În ani, luni și zile",
    habiles: "Zile lucrătoare",
    habilesAyuda: "De luni până vineri. Sărbătorile legale nu se scad.",
    duracion: duracionRo,
    semanasYDias: (semanas, n, d) => {
      const parteSemanas = `${semanas} ${formaRo(n, "săptămână", "săptămâni")}`;
      return d ? `${parteSemanas} și ${dias(d)}` : parteSemanas;
    },
    notaHabiles: "Zilele lucrătoare se numără de luni până vineri, fără să se scadă sărbătorile legale, care diferă de la o țară la alta.",
    notaInvertidas: "Data de sfârșit era înaintea datei de început, așa că le-am inversat.",
  }),
};
