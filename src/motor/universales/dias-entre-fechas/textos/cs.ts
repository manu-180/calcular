import { formaCs, pluralCs } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiDiasEntreFechas } from "../definicion";

const anios = (n: number) => pluralCs(n, "rok", "roky", "let");
const meses = (n: number) => pluralCs(n, "měsíc", "měsíce", "měsíců");
const dias = (n: number) => pluralCs(n, "den", "dny", "dní");

// «36 let, 4 měsíce a 28 dní»: čárka mezi částmi a «a» před poslední.
export function duracionCs(a: number, m: number, d: number): string {
  const partes: string[] = [];
  if (a) partes.push(anios(a));
  if (m) partes.push(meses(m));
  if (d || !partes.length) partes.push(dias(d));
  return partes.length > 1 ? `${partes.slice(0, -1).join(", ")} a ${partes[partes.length - 1]}` : partes[0];
}

export const textosCs: TextosUi<UiDiasEntreFechas> = {
  slug: "pocet-dni-mezi-daty",
  ui: () => ({
    desde: "Počáteční datum",
    hasta: "Koncové datum",
    incluir: "Započítat i poslední den",
    incluirAyuda: "Zaškrtněte, pokud se počítá i poslední den, například u cesty nebo dovolené.",
    dias: "Kalendářní dny",
    semanas: "V týdnech",
    duracionFila: "V letech, měsících a dnech",
    habiles: "Pracovní dny",
    habilesAyuda: "Od pondělí do pátku. Státní svátky se neodečítají.",
    duracion: duracionCs,
    semanasYDias: (semanas, n, d) => {
      const parteSemanas = `${semanas} ${formaCs(n, "týden", "týdny", "týdnů", "týdne")}`;
      return d ? `${parteSemanas} a ${dias(d)}` : parteSemanas;
    },
    notaHabiles: "Pracovní dny se počítají od pondělí do pátku bez odečtení státních svátků, které se liší podle země a regionu.",
    notaInvertidas: "Koncové datum bylo dřív než počáteční, proto jsme data prohodili.",
  }),
};
