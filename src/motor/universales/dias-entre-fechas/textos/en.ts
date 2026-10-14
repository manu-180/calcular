import type { TextosUi } from "../../tipos";
import type { UiDiasEntreFechas } from "../definicion";

const plural = (n: number, uno: string, varios: string) => `${n} ${n === 1 ? uno : varios}`;

function enLista(partes: readonly string[]): string {
  return partes.length > 1 ? `${partes.slice(0, -1).join(", ")} and ${partes[partes.length - 1]}` : partes[0];
}

export function duracionEn(anios: number, meses: number, dias: number): string {
  const partes: string[] = [];
  if (anios) partes.push(plural(anios, "year", "years"));
  if (meses) partes.push(plural(meses, "month", "months"));
  if (dias || !partes.length) partes.push(plural(dias, "day", "days"));
  return enLista(partes);
}

export const textosEn: TextosUi<UiDiasEntreFechas> = {
  slug: "days-between-dates",
  ui: () => ({
    desde: "Start date",
    hasta: "End date",
    incluir: "Include the end date",
    incluirAyuda: "Tick it if the last day counts too, as with a trip or time off.",
    dias: "Calendar days",
    semanas: "In weeks",
    duracionFila: "In years, months and days",
    habiles: "Business days",
    habilesAyuda: "Monday to Friday. Public holidays are not taken off.",
    duracion: duracionEn,
    semanasYDias: (semanas, n, dias) => {
      const parteSemanas = `${semanas} ${n === 1 ? "week" : "weeks"}`;
      return dias ? `${parteSemanas} and ${plural(dias, "day", "days")}` : parteSemanas;
    },
    notaHabiles: "Business days count Monday to Friday and don't take off public holidays, which vary by country and region.",
    notaInvertidas: "The end date was before the start date, so they were swapped.",
  }),
};
