import { formaHr, pluralHr } from "../../../i18n/plural";
import { fechaLarga } from "../../comun/fechas";
import type { TextosUi } from "../../tipos";
import type { UiDiasEntreFechas } from "../definicion";

const anios = (n: number) => pluralHr(n, "godina", "godine", "godina");
const meses = (n: number) => pluralHr(n, "mjesec", "mjeseca", "mjeseci");
const dias = (n: number) => pluralHr(n, "dan", "dana", "dana");

// «36 godina, 4 mjeseca i 28 dana»: zarez između dijelova i «i» prije posljednjeg.
export function duracionHr(a: number, m: number, d: number): string {
  const partes: string[] = [];
  if (a) partes.push(anios(a));
  if (m) partes.push(meses(m));
  if (d || !partes.length) partes.push(dias(d));
  return partes.length > 1 ? `${partes.slice(0, -1).join(", ")} i ${partes[partes.length - 1]}` : partes[0];
}

// Nakon «od», «do» i «na dan» ide genitiv («od 2. ožujka 2026.»). Intl na hrvatskom već daje genitiv;
// tablica pokriva slučaj da okruženje vrati nominativ («2. ožujak 2026.»).
const GENITIV: Readonly<Record<string, string>> = {
  siječanj: "siječnja",
  veljača: "veljače",
  ožujak: "ožujka",
  travanj: "travnja",
  svibanj: "svibnja",
  lipanj: "lipnja",
  srpanj: "srpnja",
  kolovoz: "kolovoza",
  rujan: "rujna",
  listopad: "listopada",
  studeni: "studenoga",
  prosinac: "prosinca",
};

export function fechaGenitivHr(locale: string, iso: string): string {
  return fechaLarga(locale, iso).replace(/\p{L}+/u, (mes) => GENITIV[mes] ?? mes);
}

export const textosHr: TextosUi<UiDiasEntreFechas> = {
  slug: "broj-dana-izmedju-datuma",
  ui: () => ({
    desde: "Početni datum",
    hasta: "Završni datum",
    incluir: "Računa se i posljednji dan",
    incluirAyuda: "Označite ako se računa i posljednji dan, na primjer kod putovanja ili godišnjeg odmora.",
    dias: "Kalendarski dani",
    semanas: "U tjednima",
    duracionFila: "U godinama, mjesecima i danima",
    habiles: "Radni dani",
    habilesAyuda: "Od ponedjeljka do petka. Blagdani se ne oduzimaju.",
    duracion: duracionHr,
    semanasYDias: (semanas, n, d) => {
      const parteSemanas = `${semanas} ${formaHr(n, "tjedan", "tjedna", "tjedana")}`;
      return d ? `${parteSemanas} i ${dias(d)}` : parteSemanas;
    },
    notaHabiles: "Radni dani računaju se od ponedjeljka do petka, bez oduzimanja blagdana, koji se razlikuju od države do države i od regije do regije.",
    notaInvertidas: "Završni datum bio je prije početnog, pa smo datume zamijenili.",
  }),
};
