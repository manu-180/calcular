import type { TextosUi } from "../../tipos";
import type { UiDiasEntreFechas } from "../definicion";

const plural = (n: number, eins: string, mehrere: string) => `${n} ${n === 1 ? eins : mehrere}`;

function aufzaehlen(teile: readonly string[]): string {
  return teile.length > 1 ? `${teile.slice(0, -1).join(", ")} und ${teile[teile.length - 1]}` : teile[0];
}

export function duracionDe(anios: number, meses: number, dias: number): string {
  const teile: string[] = [];
  if (anios) teile.push(plural(anios, "Jahr", "Jahre"));
  if (meses) teile.push(plural(meses, "Monat", "Monate"));
  if (dias || !teile.length) teile.push(plural(dias, "Tag", "Tage"));
  return aufzaehlen(teile);
}

export const textosDe: TextosUi<UiDiasEntreFechas> = {
  slug: "tagerechner",
  ui: () => ({
    desde: "Startdatum",
    hasta: "Enddatum",
    incluir: "Enddatum mitzählen",
    incluirAyuda: "Aktivieren Sie das, wenn der letzte Tag auch zählt, etwa bei einer Reise oder beim Urlaub.",
    dias: "Kalendertage",
    semanas: "In Wochen",
    duracionFila: "In Jahren, Monaten und Tagen",
    habiles: "Arbeitstage",
    habilesAyuda: "Montag bis Freitag. Feiertage werden nicht abgezogen.",
    duracion: duracionDe,
    semanasYDias: (semanas, n, dias) => {
      const wochen = `${semanas} ${n === 1 ? "Woche" : "Wochen"}`;
      return dias ? `${wochen} und ${plural(dias, "Tag", "Tage")}` : wochen;
    },
    notaHabiles: "Als Arbeitstage zählen Montag bis Freitag. Feiertage sind nicht abgezogen, weil sie je nach Land und Region verschieden sind.",
    notaInvertidas: "Das Enddatum lag vor dem Startdatum. Die beiden wurden deshalb getauscht.",
  }),
};
