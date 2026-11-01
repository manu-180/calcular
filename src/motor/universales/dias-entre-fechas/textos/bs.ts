import { formaBs, pluralBs } from "../../../i18n/plural";
import { fechaLarga } from "../../comun/fechas";
import type { TextosUi } from "../../tipos";
import type { UiDiasEntreFechas } from "../definicion";

const anios = (n: number) => pluralBs(n, "godina", "godine", "godina");
const meses = (n: number) => pluralBs(n, "mjesec", "mjeseca", "mjeseci");
const dias = (n: number) => pluralBs(n, "dan", "dana", "dana");

// «36 godina, 4 mjeseca i 28 dana»: zarez između dijelova i «i» prije posljednjeg.
export function duracionBs(a: number, m: number, d: number): string {
  const partes: string[] = [];
  if (a) partes.push(anios(a));
  if (m) partes.push(meses(m));
  if (d || !partes.length) partes.push(dias(d));
  return partes.length > 1 ? `${partes.slice(0, -1).join(", ")} i ${partes[partes.length - 1]}` : partes[0];
}

// Nakon «od», «do» i «na dan» ide genitiv («od 2. marta 2026.»). Intl na bosanskom daje nominativ;
// tabela pokriva slučaj da okruženje vrati nominativ («2. mart 2026.»).
const GENITIV: Readonly<Record<string, string>> = {
  januar: "januara",
  februar: "februara",
  mart: "marta",
  april: "aprila",
  maj: "maja",
  juni: "juna",
  juli: "jula",
  august: "augusta",
  septembar: "septembra",
  oktobar: "oktobra",
  novembar: "novembra",
  decembar: "decembra",
};

export function fechaGenitivBs(locale: string, iso: string): string {
  return fechaLarga(locale, iso).replace(/\p{L}+/u, (mes) => GENITIV[mes] ?? mes);
}

export const textosBs: TextosUi<UiDiasEntreFechas> = {
  slug: "broj-dana-izmedju-datuma",
  ui: () => ({
    desde: "Početni datum",
    hasta: "Završni datum",
    incluir: "Računa se i posljednji dan",
    incluirAyuda: "Označite ako se računa i posljednji dan, na primjer kod putovanja ili godišnjeg odmora.",
    dias: "Kalendarski dani",
    semanas: "U sedmicama",
    duracionFila: "U godinama, mjesecima i danima",
    habiles: "Radni dani",
    habilesAyuda: "Od ponedjeljka do petka. Praznici se ne oduzimaju.",
    duracion: duracionBs,
    semanasYDias: (semanas, n, d) => {
      const parteSemanas = `${semanas} ${formaBs(n, "sedmica", "sedmice", "sedmica")}`;
      return d ? `${parteSemanas} i ${dias(d)}` : parteSemanas;
    },
    notaHabiles: "Radni dani računaju se od ponedjeljka do petka, bez oduzimanja praznika, koji se razlikuju od države do države i od regije do regije.",
    notaInvertidas: "Završni datum bio je prije početnog, pa smo datume zamijenili.",
  }),
};
