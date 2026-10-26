import type { TextosUi } from "../../tipos";
import type { UiDiasEntreFechas } from "../definicion";

const plural = (n: number, en: string, flere: string) => `${n} ${n === 1 ? en : flere}`;

function iListe(deler: readonly string[]): string {
  return deler.length > 1 ? `${deler.slice(0, -1).join(", ")} og ${deler[deler.length - 1]}` : deler[0];
}

export function duracionNb(anios: number, meses: number, dias: number): string {
  const deler: string[] = [];
  if (anios) deler.push(plural(anios, "år", "år"));
  if (meses) deler.push(plural(meses, "måned", "måneder"));
  if (dias || !deler.length) deler.push(plural(dias, "dag", "dager"));
  return iListe(deler);
}

export const textosNb: TextosUi<UiDiasEntreFechas> = {
  slug: "dager-mellom-datoer",
  ui: () => ({
    desde: "Startdato",
    hasta: "Sluttdato",
    incluir: "Ta med sluttdatoen",
    incluirAyuda: "Huk av hvis også den siste dagen skal telles, for eksempel på en reise eller ferie.",
    dias: "Kalenderdager",
    semanas: "I uker",
    duracionFila: "I år, måneder og dager",
    habiles: "Virkedager",
    habilesAyuda: "Mandag til fredag. Helligdager trekkes ikke fra.",
    duracion: duracionNb,
    semanasYDias: (semanas, n, dias) => {
      const delUker = `${semanas} ${n === 1 ? "uke" : "uker"}`;
      return dias ? `${delUker} og ${plural(dias, "dag", "dager")}` : delUker;
    },
    notaHabiles: "Virkedager telles mandag til fredag. Helligdager trekkes ikke fra, fordi de varierer mellom land og regioner.",
    notaInvertidas: "Sluttdatoen var før startdatoen, så de har byttet plass.",
  }),
};
