import type { TextosUi } from "../../tipos";
import type { UiDiasEntreFechas } from "../definicion";

const plural = (n: number, en: string, flera: string) => `${n} ${n === 1 ? en : flera}`;

function iLista(delar: readonly string[]): string {
  return delar.length > 1 ? `${delar.slice(0, -1).join(", ")} och ${delar[delar.length - 1]}` : delar[0];
}

export function duracionSv(anios: number, meses: number, dias: number): string {
  const delar: string[] = [];
  if (anios) delar.push(plural(anios, "år", "år"));
  if (meses) delar.push(plural(meses, "månad", "månader"));
  if (dias || !delar.length) delar.push(plural(dias, "dag", "dagar"));
  return iLista(delar);
}

export const textosSv: TextosUi<UiDiasEntreFechas> = {
  slug: "dagar-mellan-datum",
  ui: () => ({
    desde: "Startdatum",
    hasta: "Slutdatum",
    incluir: "Räkna med slutdatumet",
    incluirAyuda: "Kryssa i om den sista dagen också ska räknas, till exempel vid en resa eller semester.",
    dias: "Kalenderdagar",
    semanas: "I veckor",
    duracionFila: "I år, månader och dagar",
    habiles: "Vardagar",
    habilesAyuda: "Måndag till fredag. Helgdagar dras inte av.",
    duracion: duracionSv,
    semanasYDias: (semanas, n, dias) => {
      const delVeckor = `${semanas} ${n === 1 ? "vecka" : "veckor"}`;
      return dias ? `${delVeckor} och ${plural(dias, "dag", "dagar")}` : delVeckor;
    },
    notaHabiles: "Vardagar räknas måndag till fredag. Helgdagar dras inte av, eftersom de skiljer sig mellan länder och regioner.",
    notaInvertidas: "Slutdatumet låg före startdatumet, så de har bytt plats.",
  }),
};
