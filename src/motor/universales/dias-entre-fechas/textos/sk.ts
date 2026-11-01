import { formaSk, pluralSk } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiDiasEntreFechas } from "../definicion";

const anios = (n: number) => pluralSk(n, "rok", "roky", "rokov");
const meses = (n: number) => pluralSk(n, "mesiac", "mesiace", "mesiacov");
const dias = (n: number) => pluralSk(n, "deň", "dni", "dní");

// «36 rokov, 4 mesiace a 28 dní»: coma entre las partes y «a» antes de la última.
export function duracionSk(a: number, m: number, d: number): string {
  const partes: string[] = [];
  if (a) partes.push(anios(a));
  if (m) partes.push(meses(m));
  if (d || !partes.length) partes.push(dias(d));
  return partes.length > 1 ? `${partes.slice(0, -1).join(", ")} a ${partes[partes.length - 1]}` : partes[0];
}

export const textosSk: TextosUi<UiDiasEntreFechas> = {
  slug: "pocet-dni-medzi-datumami",
  ui: () => ({
    desde: "Počiatočný dátum",
    hasta: "Koncový dátum",
    incluir: "Započítať aj posledný deň",
    incluirAyuda: "Začiarknite, ak sa počíta aj posledný deň, napríklad pri ceste alebo dovolenke.",
    dias: "Kalendárne dni",
    semanas: "V týždňoch",
    duracionFila: "V rokoch, mesiacoch a dňoch",
    habiles: "Pracovné dni",
    habilesAyuda: "Od pondelka do piatka. Štátne sviatky sa neodpočítavajú.",
    duracion: duracionSk,
    semanasYDias: (semanas, n, d) => {
      const parteSemanas = `${semanas} ${formaSk(n, "týždeň", "týždne", "týždňov", "týždňa")}`;
      return d ? `${parteSemanas} a ${dias(d)}` : parteSemanas;
    },
    notaHabiles: "Pracovné dni sa počítajú od pondelka do piatka bez odpočítania štátnych sviatkov, ktoré sa líšia podľa krajiny a regiónu.",
    notaInvertidas: "Koncový dátum bol skorší ako počiatočný, preto sme dátumy vymenili.",
  }),
};
