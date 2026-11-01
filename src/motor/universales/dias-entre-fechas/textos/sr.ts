import { formaSr, pluralSr } from "../../../i18n/plural";
import { fechaLarga } from "../../comun/fechas";
import type { TextosUi } from "../../tipos";
import type { UiDiasEntreFechas } from "../definicion";

const anios = (n: number) => pluralSr(n, "godina", "godine", "godina");
const meses = (n: number) => pluralSr(n, "mesec", "meseca", "meseci");
const dias = (n: number) => pluralSr(n, "dan", "dana", "dana");

// «36 godina, 4 meseca i 28 dana»: zarez između delova i «i» pre poslednjeg.
export function duracionSr(a: number, m: number, d: number): string {
  const partes: string[] = [];
  if (a) partes.push(anios(a));
  if (m) partes.push(meses(m));
  if (d || !partes.length) partes.push(dias(d));
  return partes.length > 1 ? `${partes.slice(0, -1).join(", ")} i ${partes[partes.length - 1]}` : partes[0];
}

// Intl daje mesec u nominativu («2. mart 2026.»); posle «od», «do» i «na dan» ide genitiv («od 2.
// marta 2026.»). Imena meseca su ista u Srbiji i Crnoj Gori.
const GENITIV: Readonly<Record<string, string>> = {
  januar: "januara",
  februar: "februara",
  mart: "marta",
  april: "aprila",
  maj: "maja",
  jun: "juna",
  jul: "jula",
  avgust: "avgusta",
  septembar: "septembra",
  oktobar: "oktobra",
  novembar: "novembra",
  decembar: "decembra",
};

export function fechaGenitivSr(locale: string, iso: string): string {
  return fechaLarga(locale, iso).replace(/\p{L}+/u, (mes) => GENITIV[mes] ?? mes);
}

export const textosSr: TextosUi<UiDiasEntreFechas> = {
  slug: "broj-dana-izmedju-datuma",
  ui: () => ({
    desde: "Početni datum",
    hasta: "Krajnji datum",
    incluir: "Računa se i poslednji dan",
    incluirAyuda: "Označite ako se računa i poslednji dan, na primer kod putovanja ili godišnjeg odmora.",
    dias: "Kalendarski dani",
    semanas: "U nedeljama",
    duracionFila: "U godinama, mesecima i danima",
    habiles: "Radni dani",
    habilesAyuda: "Od ponedeljka do petka. Praznici se ne oduzimaju.",
    duracion: duracionSr,
    semanasYDias: (semanas, n, d) => {
      const parteSemanas = `${semanas} ${formaSr(n, "nedelja", "nedelje", "nedelja")}`;
      return d ? `${parteSemanas} i ${dias(d)}` : parteSemanas;
    },
    notaHabiles: "Radni dani se računaju od ponedeljka do petka, bez oduzimanja praznika, koji se razlikuju od zemlje do zemlje i od regiona do regiona.",
    notaInvertidas: "Krajnji datum je bio pre početnog, pa smo zamenili mesta datumima.",
  }),
};
