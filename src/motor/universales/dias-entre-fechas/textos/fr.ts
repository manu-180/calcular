import type { TextosUi } from "../../tipos";
import type { UiDiasEntreFechas } from "../definicion";

const plural = (n: number, uno: string, varios: string) => `${n} ${n === 1 ? uno : varios}`;

function enLista(partes: readonly string[]): string {
  return partes.length > 1 ? `${partes.slice(0, -1).join(", ")} et ${partes[partes.length - 1]}` : partes[0];
}

export function duracionFr(anios: number, meses: number, dias: number): string {
  const partes: string[] = [];
  if (anios) partes.push(plural(anios, "an", "ans"));
  if (meses) partes.push(plural(meses, "mois", "mois"));
  if (dias || !partes.length) partes.push(plural(dias, "jour", "jours"));
  return enLista(partes);
}

export const textosFr: TextosUi<UiDiasEntreFechas> = {
  slug: "nombre-de-jours-entre-deux-dates",
  ui: () => ({
    desde: "Date de début",
    hasta: "Date de fin",
    incluir: "Compter aussi le dernier jour",
    incluirAyuda: "Cochez si le dernier jour compte, comme pour un séjour ou des congés.",
    dias: "Jours calendaires",
    semanas: "En semaines",
    duracionFila: "En années, mois et jours",
    habiles: "Jours ouvrés",
    habilesAyuda: "Du lundi au vendredi. Les jours fériés ne sont pas retirés.",
    duracion: duracionFr,
    semanasYDias: (semanas, n, dias) => {
      const parteSemanas = `${semanas} ${n === 1 ? "semaine" : "semaines"}`;
      return dias ? `${parteSemanas} et ${plural(dias, "jour", "jours")}` : parteSemanas;
    },
    notaHabiles: "Les jours ouvrés vont du lundi au vendredi. Les jours fériés, qui changent selon le pays et la région, ne sont pas retirés.",
    notaInvertidas: "La date de fin était avant la date de début : elles ont été inversées.",
  }),
};
