import { pluralPl } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiDiasEntreFechas } from "../definicion";

const lat = (n: number) => pluralPl(n, "rok", "lata", "lat");
const miesiecy = (n: number) => pluralPl(n, "miesiąc", "miesiące", "miesięcy");
const dni = (n: number) => pluralPl(n, "dzień", "dni", "dni");
// Solo la palabra: el número de semanas llega ya formateado con el separador del locale.
const tygodni = (n: number) => pluralPl(n, "tydzień", "tygodnie", "tygodni").slice(String(n).length + 1);

function wLiscie(partes: readonly string[]): string {
  return partes.length > 1 ? `${partes.slice(0, -1).join(", ")} i ${partes[partes.length - 1]}` : partes[0];
}

export function duracionPl(anios: number, meses: number, dias: number): string {
  const partes: string[] = [];
  if (anios) partes.push(lat(anios));
  if (meses) partes.push(miesiecy(meses));
  if (dias || !partes.length) partes.push(dni(dias));
  return wLiscie(partes);
}

export const textosPl: TextosUi<UiDiasEntreFechas> = {
  slug: "kalkulator-dni-miedzy-datami",
  ui: () => ({
    desde: "Data początkowa",
    hasta: "Data końcowa",
    incluir: "Licz też dzień końcowy",
    incluirAyuda: "Zaznacz, jeśli ostatni dzień też się liczy, jak przy urlopie albo wyjeździe.",
    dias: "Dni kalendarzowe",
    semanas: "W tygodniach",
    duracionFila: "W latach, miesiącach i dniach",
    habiles: "Dni robocze",
    habilesAyuda: "Od poniedziałku do piątku. Święta nie są odejmowane.",
    duracion: duracionPl,
    semanasYDias: (semanas, n, dias) => {
      const czescTygodni = `${semanas} ${tygodni(n)}`;
      return dias ? `${czescTygodni} i ${dni(dias)}` : czescTygodni;
    },
    notaHabiles: "Dni robocze to dni od poniedziałku do piątku. Nie odejmujemy świąt, bo zależą od kraju i regionu.",
    notaInvertidas: "Data końcowa była wcześniejsza niż początkowa, więc zamieniliśmy je miejscami.",
  }),
};
