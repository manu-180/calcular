import type { TextosUi } from "../../tipos";
import type { UiDiasEntreFechas } from "../definicion";

const plural = (n: number, en: string, flere: string) => `${n} ${n === 1 ? en : flere}`;

function iListe(dele: readonly string[]): string {
  return dele.length > 1 ? `${dele.slice(0, -1).join(", ")} og ${dele[dele.length - 1]}` : dele[0];
}

export function duracionDa(anios: number, meses: number, dias: number): string {
  const dele: string[] = [];
  if (anios) dele.push(plural(anios, "år", "år"));
  if (meses) dele.push(plural(meses, "måned", "måneder"));
  if (dias || !dele.length) dele.push(plural(dias, "dag", "dage"));
  return iListe(dele);
}

export const textosDa: TextosUi<UiDiasEntreFechas> = {
  slug: "dage-mellem-datoer",
  ui: () => ({
    desde: "Startdato",
    hasta: "Slutdato",
    incluir: "Medregn slutdatoen",
    incluirAyuda: "Sæt flueben, hvis den sidste dag også skal tælle med, fx ved en rejse eller ferie.",
    dias: "Kalenderdage",
    semanas: "I uger",
    duracionFila: "I år, måneder og dage",
    habiles: "Hverdage",
    habilesAyuda: "Mandag til fredag. Helligdage trækkes ikke fra.",
    duracion: duracionDa,
    semanasYDias: (semanas, n, dias) => {
      const uger = `${semanas} ${n === 1 ? "uge" : "uger"}`;
      return dias ? `${uger} og ${plural(dias, "dag", "dage")}` : uger;
    },
    notaHabiles: "Hverdage tælles mandag til fredag. Helligdage trækkes ikke fra, fordi de er forskellige fra land til land og fra region til region.",
    notaInvertidas: "Slutdatoen lå før startdatoen, så de to er byttet om.",
  }),
};
