import type { TextosUi } from "../../tipos";
import type { UiDiasEntreFechas } from "../definicion";

// Eesti keeles nõuab 1 ainsuse nimetavat („1 päev“) ja muud arvud ainsuse osastavat („3 päeva“).
const hulk = (n: number, uks: string, mitu: string) => `${n} ${n === 1 ? uks : mitu}`;

function loetelu(osad: readonly string[]): string {
  return osad.length > 1 ? `${osad.slice(0, -1).join(", ")} ja ${osad[osad.length - 1]}` : osad[0];
}

export function duracionEt(anios: number, meses: number, dias: number): string {
  const osad: string[] = [];
  if (anios) osad.push(hulk(anios, "aasta", "aastat"));
  if (meses) osad.push(hulk(meses, "kuu", "kuud"));
  if (dias || !osad.length) osad.push(hulk(dias, "päev", "päeva"));
  return loetelu(osad);
}

export const textosEt: TextosUi<UiDiasEntreFechas> = {
  slug: "paevade-kalkulaator",
  ui: () => ({
    desde: "Alguskuupäev",
    hasta: "Lõppkuupäev",
    incluir: "Arvesta ka lõppkuupäev",
    incluirAyuda: "Vali see, kui ka viimane päev läheb arvesse, näiteks reisi või puhkuse pikkuse puhul.",
    dias: "Kalendripäevad",
    semanas: "Nädalates",
    duracionFila: "Aastates, kuudes ja päevades",
    habiles: "Tööpäevad",
    habilesAyuda: "Esmaspäevast reedeni. Riigipühi maha ei arvata.",
    duracion: duracionEt,
    semanasYDias: (semanas, n, dias) => {
      const nadalad = `${semanas} ${n === 1 ? "nädal" : "nädalat"}`;
      return dias ? `${nadalad} ja ${hulk(dias, "päev", "päeva")}` : nadalad;
    },
    notaHabiles: "Tööpäevadeks loetakse päevad esmaspäevast reedeni. Riigipühi maha ei arvata, sest need erinevad riigiti ja piirkonniti.",
    notaInvertidas: "Lõppkuupäev oli enne alguskuupäeva, seega vahetati kuupäevad omavahel.",
  }),
};
