import type { TextosUi } from "../../tipos";
import type { UiDiasEntreFechas } from "../definicion";

const plurale = (n: number, uno: string, piu: string) => `${n} ${n === 1 ? uno : piu}`;

function inLista(parti: readonly string[]): string {
  return parti.length > 1 ? `${parti.slice(0, -1).join(", ")} e ${parti[parti.length - 1]}` : parti[0];
}

export function durataIt(anni: number, mesi: number, giorni: number): string {
  const parti: string[] = [];
  if (anni) parti.push(plurale(anni, "anno", "anni"));
  if (mesi) parti.push(plurale(mesi, "mese", "mesi"));
  if (giorni || !parti.length) parti.push(plurale(giorni, "giorno", "giorni"));
  return inLista(parti);
}

export const textosIt: TextosUi<UiDiasEntreFechas> = {
  slug: "giorni-tra-due-date",
  ui: () => ({
    desde: "Data di inizio",
    hasta: "Data di fine",
    incluir: "Conta anche il giorno finale",
    incluirAyuda: "Selezionalo se conta anche l'ultimo giorno, come per un viaggio o un periodo di ferie.",
    dias: "Giorni di calendario",
    semanas: "In settimane",
    duracionFila: "In anni, mesi e giorni",
    habiles: "Giorni lavorativi",
    habilesAyuda: "Dal lunedì al venerdì. Le festività non vengono tolte.",
    duracion: durataIt,
    semanasYDias: (settimane, n, giorni) => {
      const parteSettimane = `${settimane} ${n === 1 ? "settimana" : "settimane"}`;
      return giorni ? `${parteSettimane} e ${plurale(giorni, "giorno", "giorni")}` : parteSettimane;
    },
    notaHabiles: "I giorni lavorativi vanno dal lunedì al venerdì e non tolgono le festività, che cambiano da paese a paese e da città a città.",
    notaInvertidas: "La data di fine era prima di quella di inizio, quindi sono state invertite.",
  }),
};
